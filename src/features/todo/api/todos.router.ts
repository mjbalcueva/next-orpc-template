import { ORPCError } from "@orpc/server"
import { and, desc, eq } from "drizzle-orm"

import { db } from "@/services/drizzle/db"
import { todos } from "@/services/drizzle/schema/todos"
import { protectedProcedure } from "@/services/orpc/procedures"

import { createTodoSchema, removeTodoSchema, todoIdSchema, toggleTodoSchema } from "./todos.schema"

export const todosRouter = {
	list: protectedProcedure.handler(({ context }) =>
		db.select().from(todos).where(eq(todos.userId, context.user.id)).orderBy(desc(todos.createdAt))
	),

	getById: protectedProcedure.input(todoIdSchema).handler(async ({ input, context }) => {
		const [row] = await db
			.select()
			.from(todos)
			.where(and(eq(todos.id, input.id), eq(todos.userId, context.user.id)))
			.limit(1)
		return row ?? null
	}),

	create: protectedProcedure.input(createTodoSchema).handler(async ({ input, context }) => {
		const [row] = await db
			.insert(todos)
			.values({ ...input, userId: context.user.id })
			.returning()
		return row
	}),

	toggle: protectedProcedure.input(toggleTodoSchema).handler(async ({ input, context }) => {
		const [row] = await db
			.update(todos)
			.set({ done: input.done })
			.where(and(eq(todos.id, input.id), eq(todos.userId, context.user.id)))
			.returning({ id: todos.id })
		if (!row) throw new ORPCError("NOT_FOUND")
	}),

	remove: protectedProcedure.input(removeTodoSchema).handler(async ({ input, context }) => {
		const [row] = await db
			.delete(todos)
			.where(and(eq(todos.id, input.id), eq(todos.userId, context.user.id)))
			.returning({ id: todos.id })
		if (!row) throw new ORPCError("NOT_FOUND")
	}),
}
