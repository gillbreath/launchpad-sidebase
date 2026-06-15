export default eventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const prisma = event.context.prisma

  const post = await prisma.blog.findUnique({ where: { id } })
  if (!post) throw createError({ statusCode: 404, message: 'Post not found' })

  const adjacent = prisma.$transaction([
    prisma.blog.findFirst({
      where: { createdAt: { lt: post.createdAt } },
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true },
    }),
    prisma.blog.findFirst({
      where: { createdAt: { gt: post.createdAt } },
      orderBy: { createdAt: 'asc' },
      select: { id: true, title: true },
    }),
  ])

  const [prev, next] = await adjacent

  return { post, prev, next }
})
