import dns from 'node:dns'
import { MongoClient, type Db } from 'mongodb'

/**
 * MONGODB CONNECTION
 * ----------------------------------------------------------------------------
 * SERVER ONLY. `MONGODB_URI` carries the database password, and it is
 * deliberately NOT prefixed `NEXT_PUBLIC_` — Next inlines every such variable
 * into the client bundle, which would publish the credential to every visitor.
 * Nothing in this file may ever be imported from a `'use client'` component;
 * the repository layer that uses it runs exclusively on the server.
 */

const URI = process.env.MONGODB_URI
const DB_NAME = process.env.MONGODB_DB ?? 'art_of_healing_cancer'

/**
 * Optional DNS escape hatch for the `mongodb+srv://` lookup.
 *
 * `mongodb+srv://` asks the driver to run a DNS SRV query to discover the
 * cluster's shards. Some environments run a DNS proxy on 127.0.0.1 that
 * refuses SRV queries, and the driver then fails with `querySrv ECONNREFUSED`
 * — a message that reads like a network outage or a bad password, and is
 * neither.
 *
 * This resolves the SRV and TXT records through an explicit `Resolver` and
 * hands the driver a plain `mongodb://` URI with the shards already in it,
 * rather than calling `dns.setServers()` and hoping the driver observes the
 * mutated global state — inside Next's server runtime it does not.
 *
 * Set `MONGODB_DNS_SERVERS` only where SRV lookups are actually broken.
 */
const DNS_SERVERS = (process.env.MONGODB_DNS_SERVERS ?? '')
  .split(',')
  .map((entry) => entry.trim())
  .filter(Boolean)

/** Expands `mongodb+srv://host/db` into `mongodb://shard1,shard2,shard3/db`. */
async function expandSrvUri(uri: string, servers: string[]): Promise<string> {
  const url = new URL(uri)
  const resolver = new dns.promises.Resolver()
  resolver.setServers(servers)

  const host = url.hostname

  const [srvRecords, txtRecords] = await Promise.all([
    resolver.resolveSrv(`_mongodb._tcp.${host}`),
    // A cluster without a TXT record is legal; its options are simply absent.
    resolver.resolveTxt(host).catch(() => [] as string[][]),
  ])

  if (srvRecords.length === 0) {
    throw new Error(`No SRV records found for ${host}`)
  }

  const hosts = srvRecords.map((record) => `${record.name}:${record.port}`).join(',')

  const params = new URLSearchParams(url.search)
  for (const chunks of txtRecords) {
    // A TXT value arrives split into 255-byte chunks that must be rejoined.
    for (const [key, value] of new URLSearchParams(chunks.join(''))) {
      // Options written into the URI win over the cluster's defaults.
      if (!params.has(key)) params.set(key, value)
    }
  }

  if (!params.has('tls') && !params.has('ssl')) params.set('tls', 'true')

  // `url.username` / `url.password` stay percent-encoded exactly as supplied,
  // so a password containing `@` or `/` survives the round trip.
  const credentials = url.username
    ? `${url.username}${url.password ? `:${url.password}` : ''}@`
    : ''
  const database = url.pathname && url.pathname !== '/' ? url.pathname : ''

  return `mongodb://${credentials}${hosts}${database}?${params.toString()}`
}

/**
 * Cached across hot reloads.
 *
 * Every HMR cycle re-evaluates this module. Without the global cache each edit
 * would open a brand-new connection pool and leave the previous one dangling,
 * and Atlas would drop the app on connection limits after an afternoon's work.
 * `globalThis` survives module re-evaluation; a module-level `let` does not.
 */
declare global {
  var __mongoClientPromise: Promise<MongoClient> | undefined
}

async function createClient(): Promise<MongoClient> {
  if (!URI) {
    throw new Error(
      'MONGODB_URI is not set. Add it to .env.local, or set DATA_SOURCE=demo to run without a database.',
    )
  }

  // Only when an override is configured AND the URI actually uses SRV.
  const uri =
    DNS_SERVERS.length > 0 && URI.startsWith('mongodb+srv://')
      ? await expandSrvUri(URI, DNS_SERVERS)
      : URI

  const client = new MongoClient(uri, {
    // A page render must not hang waiting for a cluster that is not answering.
    serverSelectionTimeoutMS: 10_000,
    maxPoolSize: 10,
    minPoolSize: 0,
    retryWrites: true,
  })

  return client.connect()
}

function clientPromise(): Promise<MongoClient> {
  // Cached in production too, because a serverless container may evaluate
  // this module once and then handle many invocations from the same process.
  globalThis.__mongoClientPromise ??= createClient()
  return globalThis.__mongoClientPromise
}

/** The application database. Every repository goes through this. */
export async function getDb(): Promise<Db> {
  const client = await clientPromise()
  return client.db(DB_NAME)
}

/**
 * Collection names in one place.
 *
 * A typo in a collection name does not throw in MongoDB — it silently creates
 * or reads an empty collection, and the page renders as "no treatments found".
 * Naming them once, as a const, turns that class of bug into a type error.
 */
export const collections = {
  treatments: 'treatments',
  doctors: 'doctors',
  webinars: 'webinars',
  stories: 'patientStories',
  blogPosts: 'blogPosts',
  enquiries: 'enquiries',
  registrations: 'webinarRegistrations',
  adminSessions: 'adminSessions',
  rateLimits: 'rateLimits',
} as const

/**
 * Strips MongoDB's `_id` from a document.
 *
 * The seed stores the domain's own identifier as `_id`, so `_id` is always a
 * duplicate of `slug` or `id` and carries nothing extra. Removing it matters
 * beyond tidiness: an `ObjectId` is not serialisable across the server/client
 * boundary, and leaving one on an object handed to a client component throws
 * at runtime. Doing it here means no repository has to remember.
 */
export function stripId<T>(doc: T): Omit<T, '_id'> {
  const { _id, ...rest } = doc as T & { _id?: unknown }
  void _id
  /**
   * `Omit<T, '_id'>` rather than `T`, so the RETURN TYPE loses `_id` too.
   *
   * The driver types a find result as `WithId<Treatment>`. Returning plain `T`
   * would hand back a type that still claims to carry an `ObjectId`, and every
   * caller would then need a cast.
   */
  return rest as Omit<T, '_id'>
}

/** True when the app is configured to use MongoDB at all. */
export function isDatabaseConfigured(): boolean {
  return process.env.DATA_SOURCE === 'mongodb' && Boolean(URI)
}
