import { blogPosts } from '@/data/blogs'
import type { BlogPost, BlogQuery, Paginated } from '@/types'
import type { BlogRepository } from '../contracts'

const DEFAULT_PER_PAGE = 9

const byNewest = (a: BlogPost, b: BlogPost) =>
  b.publishedAt.localeCompare(a.publishedAt)

function matches(post: BlogPost, query: BlogQuery): boolean {
  if (query.category && post.category !== query.category) return false
  if (query.tag && !(post.tags ?? []).includes(query.tag)) return false
  if (query.excludeSlugs?.includes(post.slug)) return false

  if (query.search) {
    const needle = query.search.trim().toLowerCase()
    const haystack = `${post.title} ${post.excerpt}`.toLowerCase()
    if (!haystack.includes(needle)) return false
  }

  return true
}

function select(query: BlogQuery = {}): BlogPost[] {
  const filtered = blogPosts.filter((post) => matches(post, query))
  const sorted = [...filtered].sort(byNewest)
  return query.limit ? sorted.slice(0, query.limit) : sorted
}

/** Demo implementation backed by `src/data/blogs.ts`. */
export const demoBlogRepository: BlogRepository = {
  async getPosts(query) {
    return select(query)
  },

  async getPostsPage(query = {}): Promise<Paginated<BlogPost>> {
    const all = select({ ...query, limit: undefined })
    const perPage = query.perPage ?? DEFAULT_PER_PAGE
    const totalPages = Math.max(1, Math.ceil(all.length / perPage))
    const page = Math.min(Math.max(1, query.page ?? 1), totalPages)
    const start = (page - 1) * perPage

    return {
      items: all.slice(start, start + perPage),
      page,
      perPage,
      total: all.length,
      totalPages,
    }
  },

  async getPostBySlug(slug) {
    return blogPosts.find((post) => post.slug === slug) ?? null
  },

  async getLatestPosts(limit = 3) {
    return select({ limit })
  },

  async getRelatedPosts(slug, limit = 3) {
    const post = blogPosts.find((candidate) => candidate.slug === slug)
    if (!post) return []
    return select({ category: post.category, excludeSlugs: [slug], limit })
  },

  async getPostCategories() {
    return [...new Set(blogPosts.map((post) => post.category))].sort()
  },

  async getAllPostSlugs() {
    return blogPosts.map((post) => post.slug)
  },
}
