import fs from 'node:fs'
import path from 'node:path'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './client/client.ts'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL, ssl: false })
const prisma = new PrismaClient({ adapter })

interface BlogEntry {
  title: string
  body: string
  author: string
  createdAt: string
}

async function main() {
  console.info('Seeding blog table…')

  await prisma.blog.deleteMany()

  const dataPath = path.join(import.meta.dirname, 'blog-data.json')
  const blogs: BlogEntry[] = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))

  await prisma.blog.createMany({ data: blogs.map(b => ({ ...b, createdAt: new Date(b.createdAt) })) })
  console.info(`Created ${blogs.length} blog entries.`)

  console.info('Seeding complete.')
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
