import { todosRouter } from "@/features/todo/api/todos.router";
import { authorized, pub } from "@/services/orpc/procedures";

export const router = {
  health: pub.handler(() => ({ ok: true as const })),
  me: authorized.handler(({ context }) => context.user),

  todos: todosRouter,
};

export type Router = typeof router;
