import { getSession } from "@/services/better-auth/server"

export default async function SessionPage() {
	const session = await getSession()

	return (
		<main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 px-6 py-16">
			<h1 className="text-2xl font-semibold tracking-tight">Session</h1>
			<p className="text-muted-foreground text-sm">
				Quick debug view for auth session state in this template.
			</p>
			<pre className="bg-muted max-h-[60vh] overflow-auto rounded-2xl border p-4 text-xs leading-6">
				{JSON.stringify(session ?? { session: null }, null, 2)}
			</pre>
		</main>
	)
}
