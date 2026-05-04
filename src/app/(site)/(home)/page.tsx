import { getSession } from "@/services/better-auth/server"
import { HomeCtaButton } from "@/features/home/home-cta-button"
import { NavigationLinks } from "@/features/home/navigation-links"

export default async function HomePage() {
	const session = await getSession()
	const isLoggedIn = !!session

	return (
		<main className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl flex-col items-center justify-center gap-6 px-6 py-16 text-center">
			<p className="text-muted-foreground text-base md:text-lg">
				{isLoggedIn ? (
					<>
						Hello <span className="text-foreground font-semibold">{session.user.name}</span>
					</>
				) : (
					<>
						Welcome <span className="text-foreground font-semibold">Everyone!</span>
					</>
				)}
			</p>

			<h1 className="text-4xl font-bold tracking-tight text-balance md:text-6xl">NEXT TEMPLATE.</h1>

			<p className="text-muted-foreground max-w-2xl text-base leading-7 md:text-xl">
				A clean, fast, full-stack starter built with Next.js, Better Auth, Drizzle, and oRPC. Ship
				features quickly with modern defaults and type-safe workflows.
			</p>

			<NavigationLinks />

			<HomeCtaButton href={isLoggedIn ? "/todos" : "/sign-in"} isLoggedIn={isLoggedIn} />
		</main>
	)
}
