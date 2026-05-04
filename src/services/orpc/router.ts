import { systemRouter } from "@/features/system/api/system.router"
import { todosRouter } from "@/features/todo/api/todos.router"

export const router = {
	system: systemRouter,

	todos: todosRouter,
}

export type Router = typeof router
