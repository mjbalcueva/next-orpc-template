import { publicProcedure } from "@/services/orpc/procedures"

export const healthProcedure = publicProcedure.handler(() => ({ ok: true as const }))
