import { protectedProcedure } from "@/services/orpc/procedures"

export const meProcedure = protectedProcedure.handler(({ context }) => context.user)
