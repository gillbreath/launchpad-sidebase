export default eventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const post = await event.context.prisma.blog.findUnique({ where: { id } })
  if (!post) throw createError({ statusCode: 404, message: 'Post not found' })
  return post
})
