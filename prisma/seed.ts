import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './client/client.ts'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL, ssl: false })
const prisma = new PrismaClient({ adapter })

const examples = [
  { details: 'First example — demonstrates basic record creation.' },
  { details: 'Second example — shows that multiple records can coexist.' },
  { details: 'Third example — useful for testing list and pagination views.' },
]

async function main() {
  console.info('Seeding examples table…')

  for (const data of examples) {
    const example = await prisma.example.create({ data })
    console.info(`Created example ${example.id}`)
  }

  console.info('Seeding complete.')
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
