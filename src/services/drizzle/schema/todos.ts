import { relations } from "drizzle-orm"

import { createTable } from "@/services/drizzle/lib/table-builder"
import { user } from "@/services/drizzle/schema/auth"

export const todos = createTable("todos", t => ({
	id: t.uuid("id").primaryKey().defaultRandom(),
	userId: t
		.text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	text: t.text("text").notNull(),
	done: t.boolean("done").notNull().default(false),
	createdAt: t.timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}))

export const todoRelations = relations(todos, ({ one }) => ({
	user: one(user, {
		fields: [todos.userId],
		references: [user.id],
	}),
}))
