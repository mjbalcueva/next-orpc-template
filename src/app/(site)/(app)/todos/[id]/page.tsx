import { notFound } from "next/navigation"
import { z } from "zod"

import { TodoDetails } from "@/features/todo/components/todo-details"

const paramsSchema = z.object({
	id: z.uuid(),
})

export default async function TodoPage(props: PageProps<"/todos/[id]">) {
	const rawParams = await props.params
	const parsedParams = paramsSchema.safeParse(rawParams)

	if (!parsedParams.success) {
		notFound()
	}

	return <TodoDetails id={parsedParams.data.id} />
}
