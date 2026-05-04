import type { Metadata } from "next"
import { Figtree, Geist, Geist_Mono } from "next/font/google"
import { NuqsAdapter } from "nuqs/adapters/next/app"

import { ModeToggleLazy } from "@/core/components/mode-toggle-lazy"
import { ThemeProvider } from "@/core/components/providers/theme-provider"
import { TooltipProvider } from "@/core/components/ui/tooltip"
import { cn } from "@/core/lib/utils"
import { QueryProvider } from "@/services/orpc/provider"

import "@/services/orpc/server"
import "@/core/styles/globals.css"

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" })

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "Next Template",
	description: "A modern full-stack Next.js template with auth, data, and type-safe APIs.",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={cn(
				"h-full",
				"antialiased",
				geistSans.variable,
				geistMono.variable,
				"font-sans",
				figtree.variable
			)}
		>
			<body suppressHydrationWarning className="flex min-h-full flex-col">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<NuqsAdapter>
						<QueryProvider>
							<TooltipProvider>
								{children}
								<ModeToggleLazy />
							</TooltipProvider>
						</QueryProvider>
					</NuqsAdapter>
				</ThemeProvider>
			</body>
		</html>
	)
}
