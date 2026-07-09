export default eventHandler(async (event) => {
  return event.context.prisma.blog.findMany({
    where: { OR: [{ publishedAt: null }, { publishedAt: { lte: new Date() } }] },
    select: { id: true, title: true, author: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
  })
})
