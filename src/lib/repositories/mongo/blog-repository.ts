import type { Filter } from 'mongodb'
import { collections, getDb, stripId } from '@/lib/db/mongo'
import type { BlogPost, BlogQuery, Paginated } from '@/types'
import type { BlogRepository } from '../contracts'

const DEFAULT_PER_PAGE = 9

function escapeRegex(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function toFilter(query: BlogQuery): Filter<BlogPost> {
  const filter: Filter<BlogPost> = {}

  if (query.category) filter.category = query.category
  if (query.tag) filter.tags = query.tag
  if (query.excludeSlugs?.length) filter.slug = { $nin: query.excludeSlugs }

  const search = query.search?.trim()
  if (search) {
    const pattern = new RegExp(escapeRegex(search), 'i')
    filter.$or = [{ title: pattern }, { excerpt: pattern }] as Filter<BlogPost>[]
  }

  return filter
}

async function collection() {
  return (await getDb()).collection<BlogPost>(collections.blogPosts)
}

async function select(query: BlogQuery = {}): Promise<BlogPost[]> {
  const cursor = (await collection())
    .find(toFilter(query))
    // ISO date strings sort lexicographically, which is why the model stores
    // them as strings rather than as Date objects.
    .sort({ publishedAt: -1 })

  if (query.limit) cursor.limit(query.limit)

  return (await cursor.toArray()).map(stripId)
}

/** MongoDB implementation of `BlogRepository`. */
export const mongoBlogRepository: BlogRepository = {
  async getPosts(query) {
    return select(query)
  },

  async getPostsPage(query = {}): Promise<Paginated<BlogPost>> {
    const posts = await collection()
    const filter = toFilter(query)
    const perPage = query.perPage ?? DEFAULT_PER_PAGE

    const total = await posts.countDocuments(filter)
    const totalPages = Math.max(1, Math.ceil(total / perPage))
    const page = Math.min(Math.max(1, query.page ?? 1), totalPages)

    const items = await posts
      .find(filter)
      .sort({ publishedAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .toArray()

    return { items: items.map(stripId), page, perPage, total, totalPages }
  },

  async getPostBySlug(slug) {
    const doc = await (await collection()).findOne({ slug })
    return doc ? stripId(doc) : null
  },

  async getLatestPosts(limit = 3) {
    return select({ limit })
  },

  async getRelatedPosts(slug, limit = 3) {
    const post = await (await collection()).findOne({ slug })
    if (!post) return []
    return select({ category: post.category, excludeSlugs: [slug], limit })
  },

  async getPostCategories() {
    const values = await (await collection()).distinct('category')
    return values.sort()
  },

  async getAllPostSlugs() {
    const docs = await (await collection())
      .find({}, { projection: { slug: 1, _id: 0 } })
      .toArray()
    return docs.map((doc) => doc.slug)
  },
}
