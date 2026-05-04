import { ORPCError, os } from "@orpc/server"

import { auth } from "@/services/better-auth"
import { env } from "@/env"

type ORPCContext = {
	headers: Headers
}

const base = os.$context<ORPCContext>()

const timingMiddleware = base.middleware(async ({ next }) => {
	const start = Date.now()
	const result = await next()

	if (env.NODE_ENV === "development") {
		console.log(`[orpc] request completed in ${Date.now() - start}ms`)
	}

	return result
})

export const baseProcedure = base.use(timingMiddleware)

export const publicProcedure = baseProcedure

const authMiddleware = base.middleware(async ({ context, next }) => {
	const sessionData = await auth.api.getSession({
		headers: context.headers,
	})

	if (!sessionData?.session || !sessionData?.user) {
		throw new ORPCError("UNAUTHORIZED")
	}

	return next({
		context: {
			session: sessionData.session,
			user: sessionData.user,
		},
	})
})

export const protectedProcedure = baseProcedure.use(authMiddleware)
