import { healthProcedure } from "@/features/system/api/health.procedure"
import { meProcedure } from "@/features/system/api/me.procedure"

export const systemRouter = {
	health: healthProcedure,
	me: meProcedure,
}
