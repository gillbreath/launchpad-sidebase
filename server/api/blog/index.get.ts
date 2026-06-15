export default eventHandler(async (event) => {
  return event.context.prisma.blog.findMany({
    select: { id: true, title: true, author: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
  })
})
