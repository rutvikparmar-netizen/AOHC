#!/usr/bin/env node
/**
 * DATABASE TOOL
 * ----------------------------------------------------------------------------
 *   npm run db:check     connect, list collections and counts
 *   npm run db:seed      load src/data content into MongoDB
 *   npm run db:drop      delete CONTENT collections (never enquiries)
 *   npm run db:leads     print recent enquiries to the terminal
 *
 * `db:drop` DOES NOT TOUCH `enquiries` OR `webinarRegistrations`, and that is
 * not an oversight. Those collections hold patient data that exists nowhere
 * else — there is no source file to re-seed them from. A content reset during
 * development must not be able to destroy them, so the command refuses and
 * tells you to do it by hand if you really mean it.
 */

import { readFile } from 'node:fs/promises'
import { MongoClient } from 'mongodb'

/* ---------------------------------------------------------------------------
   Environment. Read from .env.local by hand — this script runs outside Next,
   so nothing has loaded it.
   ------------------------------------------------------------------------- */
async function loadEnv() {
  for (const file of ['.env.local', '.env']) {
    try {
      const contents = await readFile(new URL(`../${file}`, import.meta.url), 'utf8')
      for (const line of contents.split('\n')) {
        const match = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line)
        if (!match) continue
        const [, key, rawValue] = match
        if (process.env[key] !== undefined) continue
        // Strip matching surrounding quotes, if present.
        process.env[key] = rawValue.replace(/^(['"])(.*)\1$/, '$2')
      }
    } catch {
      // Absent file is fine; the variables may come from the real environment.
    }
  }
}

const CONTENT_COLLECTIONS = {
  treatments: 'treatments',
  doctors: 'doctors',
  webinars: 'webinars',
  stories: 'patientStories',
  blogPosts: 'blogPosts',
}

const PATIENT_COLLECTIONS = ['enquiries', 'webinarRegistrations']

function fail(message) {
  console.error(`\n  ✗ ${message}\n`)
  process.exit(1)
}

async function connect() {
  const uri = process.env.MONGODB_URI
  if (!uri) fail('MONGODB_URI is not set. Add it to .env.local.')

  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10_000 })
  await client.connect()
  return { client, db: client.db(process.env.MONGODB_DB ?? 'art_of_healing_cancer') }
}

/**
 * Reads the content straight out of `src/data/*.ts`.
 *
 * NO BUILD STEP AND NO SECOND COPY OF THE DATA. Node 22.6+ strips TypeScript
 * types at load time (on by default from Node 23), so these modules import
 * directly — and crucially, every one of them uses only `import type`, which
 * is erased entirely. That means the `@/` path alias inside them never has to
 * resolve, which it could not here: the alias is a tsconfig/bundler concept
 * and this script runs outside both.
 *
 * Add a VALUE import to any of these files and this stops working. If that
 * happens, the error will name the unresolved `@/…` specifier.
 */
async function loadContent() {
  const [treatments, doctors, webinars, stories, blogs] = await Promise.all([
    import('../src/data/treatments.ts'),
    import('../src/data/doctors.ts'),
    import('../src/data/webinars.ts'),
    import('../src/data/stories.ts'),
    import('../src/data/blogs.ts'),
  ])

  return {
    treatments: treatments.treatments,
    doctors: doctors.doctors,
    webinars: webinars.webinars,
    /**
     * Seeded as they are, including `consent.obtained: false`.
     *
     * The template story is NOT filtered out here. It must reach the database
     * unchanged so the consent gate in the repository layer is what keeps it
     * off the site — testing that gate against real data is the point. Were
     * this script to drop it, the only thing protecting an unconsented story
     * would be untested.
     */
    stories: stories.patientStories,
    blogPosts: blogs.blogPosts,
  }
}

async function check() {
  const { client, db } = await connect()

  try {
    console.log(`\n  Connected to ${db.databaseName}\n`)

    const collections = await db.listCollections().toArray()
    if (collections.length === 0) {
      console.log('  (no collections yet — run npm run db:seed)\n')
      return
    }

    for (const info of collections.sort((a, b) => a.name.localeCompare(b.name))) {
      const count = await db.collection(info.name).countDocuments()
      const marker = PATIENT_COLLECTIONS.includes(info.name) ? ' ← patient data' : ''
      console.log(`  ${info.name.padEnd(24)} ${String(count).padStart(6)}${marker}`)
    }
    console.log('')
  } finally {
    await client.close()
  }
}

async function seed() {
  const content = await loadContent()
  const { client, db } = await connect()

  try {
    for (const [key, collectionName] of Object.entries(CONTENT_COLLECTIONS)) {
      const records = content[key] ?? []
      if (records.length === 0) continue

      const collection = db.collection(collectionName)

      /**
       * Upsert per record rather than drop-and-insert.
       *
       * A drop would discard anything edited through the console since the
       * last seed. Keying on `slug` means re-seeding updates the shipped
       * records and leaves anything else alone.
       */
      for (const record of records) {
        await collection.replaceOne(
          { slug: record.slug },
          { _id: record.id, ...record },
          { upsert: true },
        )
      }

      await collection.createIndex({ slug: 1 }, { unique: true })
      console.log(`  ✓ ${collectionName.padEnd(24)} ${records.length} records`)
    }
    console.log('')
  } finally {
    await client.close()
  }
}

async function drop() {
  const { client, db } = await connect()

  try {
    for (const name of Object.values(CONTENT_COLLECTIONS)) {
      await db.collection(name).drop().catch(() => {})
      console.log(`  ✓ dropped ${name}`)
    }

    console.log(
      [
        '',
        `  Left alone: ${PATIENT_COLLECTIONS.join(', ')}`,
        '  Those hold patient data with no source file to restore them from.',
        '  Delete them by hand if you genuinely mean to.',
        '',
      ].join('\n'),
    )
  } finally {
    await client.close()
  }
}

async function leads() {
  const { client, db } = await connect()

  try {
    const rows = await db
      .collection('enquiries')
      .find({}, { projection: { _id: 0 } })
      .sort({ createdAt: -1 })
      .limit(20)
      .toArray()

    if (rows.length === 0) {
      console.log('\n  No enquiries stored.\n')
      return
    }

    console.log(`\n  ${rows.length} most recent enquiries:\n`)
    for (const row of rows) {
      console.log(`  ${row.reference}  ${row.createdAt}  ${row.status}`)
      console.log(`    ${row.name} · ${row.email} · ${row.phone}`)
      console.log(`    ${(row.message ?? '').slice(0, 120).replace(/\s+/g, ' ')}`)
      console.log('')
    }
  } finally {
    await client.close()
  }
}

await loadEnv()

const command = process.argv[2]

switch (command) {
  case 'check':
    await check()
    break
  case 'seed':
    await seed()
    break
  case 'drop':
    await drop()
    break
  case 'leads':
    await leads()
    break
  default:
    console.log(
      [
        '',
        '  Usage: node scripts/db.mjs <command>',
        '',
        '    check   connect and report collection counts',
        '    seed    load src/data content into MongoDB',
        '    drop    delete content collections (patient data is never touched)',
        '    leads   print the 20 most recent enquiries',
        '',
      ].join('\n'),
    )
    process.exit(1)
}
