import { publicProcedure, router } from '../trpc'

export const blogRouter = router({
  list: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.blog.findMany({
      orderBy: { createdAt: 'desc' },
    })
  }),
})
