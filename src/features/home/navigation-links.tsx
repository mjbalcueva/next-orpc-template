"use client"

import type { Route } from "next"
import Link from "next/link"

import { buttonVariants } from "@/core/components/ui/button"
import { Separator } from "@/core/components/ui/separator"
import { cn, getApiUrl } from "@/core/lib/utils"

const LINKS = [
	{ href: `${getApiUrl()}/api/auth/get-session`, label: "API Docs", external: true },
	{ href: "/todos", label: "Dashboard" },
	{ href: "/todos", label: "Todos" },
	{ href: "/session", label: "Session" },
] as const

export function NavigationLinks() {
	return (
		<nav aria-label="Quick links" className="flex flex-wrap items-center justify-center gap-1">
			{LINKS.map((link, index) => (
				<div key={`${link.label}-${index}`} className="flex items-center gap-1">
					{index > 0 ? (
						<Separator orientation="vertical" className="mx-1 hidden h-5 sm:block" />
					) : null}
					<Link
						href={link.href as Route}
						target={link.external ? "_blank" : undefined}
						rel={link.external ? "noreferrer" : undefined}
						className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "rounded-full")}
					>
						{link.label}
					</Link>
				</div>
			))}
		</nav>
	)
}
