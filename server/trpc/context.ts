import type { inferAsyncReturnType } from '@trpc/server'
import type { H3Event } from 'h3'

export function createContext(event: H3Event) {
  return { prisma: event.context.prisma }
}

export type Context = inferAsyncReturnType<typeof createContext>
