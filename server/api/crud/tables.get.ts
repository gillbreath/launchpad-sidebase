export default defineEventHandler(async (event) => {
  const result = await event.context.prisma.$queryRaw<{ table_name: string }[]>`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    ORDER BY table_name
  `
  return result.map(row => row.table_name)
})
