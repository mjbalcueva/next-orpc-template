"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "@tanstack/react-form"
import { z } from "zod"

import { Button } from "@/core/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/core/components/ui/card"
import { Field, FieldError, FieldLabel } from "@/core/components/ui/field"
import { Input } from "@/core/components/ui/input"
import { signIn } from "@/services/better-auth/client"

const signInSchema = z.object({
	email: z.email(),
	password: z.string().min(1, "Password is required"),
})

function SignInForm() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const [authError, setAuthError] = useState<string | null>(null)

	const redirectUrl = searchParams.get("redirect") ?? "/todos"

	const form = useForm({
		defaultValues: { email: "", password: "" },
		validators: { onSubmit: signInSchema },
		onSubmit: async ({ value }) => {
			setAuthError(null)
			const { error } = await signIn.email({ email: value.email, password: value.password })
			if (error) {
				setAuthError(error.message ?? "Failed to sign in. Please try again.")
			} else {
				router.push(redirectUrl)
				router.refresh()
			}
		},
	})

	return (
		<form
			onSubmit={e => {
				e.preventDefault()
				e.stopPropagation()
				void form.handleSubmit()
			}}
			className="flex flex-col gap-4"
		>
			<form.Field name="email">
				{field => {
					const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
					return (
						<Field data-invalid={isInvalid}>
							<FieldLabel htmlFor={field.name}>Email</FieldLabel>
							<Input
								id={field.name}
								type="email"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={e => field.handleChange(e.target.value)}
								placeholder="you@example.com"
								autoComplete="email"
							/>
							{isInvalid && <FieldError errors={field.state.meta.errors} />}
						</Field>
					)
				}}
			</form.Field>

			<form.Field name="password">
				{field => {
					const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
					return (
						<Field data-invalid={isInvalid}>
							<FieldLabel htmlFor={field.name}>Password</FieldLabel>
							<Input
								id={field.name}
								type="password"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={e => field.handleChange(e.target.value)}
								placeholder="••••••••"
								autoComplete="current-password"
							/>
							{isInvalid && <FieldError errors={field.state.meta.errors} />}
						</Field>
					)
				}}
			</form.Field>

			{authError && <p className="text-destructive text-sm">{authError}</p>}

			<form.Subscribe selector={s => s.isSubmitting}>
				{isSubmitting => (
					<Button type="submit" disabled={isSubmitting} className="w-full">
						{isSubmitting ? "Signing in…" : "Sign in"}
					</Button>
				)}
			</form.Subscribe>
		</form>
	)
}

export default function SignInPage() {
	return (
		<main className="flex min-h-screen items-center justify-center px-6 py-16">
			<div className="w-full max-w-sm">
				<Card>
					<CardHeader>
						<CardTitle>Welcome back</CardTitle>
						<CardDescription>Sign in to your account to continue</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-4">
						<Suspense>
							<SignInForm />
						</Suspense>
						<p className="text-muted-foreground text-center text-sm">
							Don&apos;t have an account?{" "}
							<Link href="/sign-up" className="text-foreground underline underline-offset-4">
								Sign up
							</Link>
						</p>
					</CardContent>
				</Card>
			</div>
		</main>
	)
}
