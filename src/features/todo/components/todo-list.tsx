"use client";

import { useTodos } from "../lib/queries";
import { TodoForm } from "./todo-form";
import { TodoItem } from "./todo-item";

export function TodoList() {
  const todos = useTodos();

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-6 py-16">
      <h1 className="text-2xl font-semibold">Todos</h1>

      <TodoForm />

      {todos.isLoading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : todos.data?.length === 0 ? (
        <p className="text-sm text-muted-foreground">No todos yet.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {todos.data?.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </main>
  );
}
