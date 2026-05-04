import { redirect } from "next/navigation"

import { getSession } from "@/services/better-auth/server"
import { SiteHeader } from "@/features/site/components/site-header"

export default async function AppLayout({ children }: { children: React.ReactNode }) {
	const session = await getSession()

	if (!session) {
		redirect("/sign-in")
	}

	return (
		<>
			<SiteHeader user={session.user} />
			{children}
		</>
	)
}
