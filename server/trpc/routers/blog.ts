import { publicProcedure, router } from '../trpc'

export const blogRouter = router({
  list: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.blog.findMany({
      where: { OR: [{ publishedAt: null }, { publishedAt: { lte: new Date() } }] },
      orderBy: { createdAt: 'desc' },
    })
  }),
})
