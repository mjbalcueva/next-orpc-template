"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
import { signUp } from "@/services/better-auth/client"

const signUpSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters").max(50),
	email: z.email(),
	password: z.string().min(8, "Password must be at least 8 characters").max(100),
})

export default function SignUpPage() {
	const router = useRouter()
	const [authError, setAuthError] = useState<string | null>(null)

	const form = useForm({
		defaultValues: { name: "", email: "", password: "" },
		validators: { onSubmit: signUpSchema },
		onSubmit: async ({ value }) => {
			setAuthError(null)
			const { error } = await signUp.email({
				name: value.name,
				email: value.email,
				password: value.password,
			})
			if (error) {
				setAuthError(error.message ?? "Failed to create account. Please try again.")
			} else {
				router.push("/todos")
				router.refresh()
			}
		},
	})

	return (
		<main className="flex min-h-screen items-center justify-center px-6 py-16">
			<div className="w-full max-w-sm">
				<Card>
					<CardHeader>
						<CardTitle>Create an account</CardTitle>
						<CardDescription>Get started by creating your free account</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-4">
						<form
							onSubmit={e => {
								e.preventDefault()
								e.stopPropagation()
								void form.handleSubmit()
							}}
							className="flex flex-col gap-4"
						>
							<form.Field name="name">
								{field => {
									const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>Name</FieldLabel>
											<Input
												id={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={e => field.handleChange(e.target.value)}
												placeholder="Your name"
												autoComplete="name"
											/>
											{isInvalid && <FieldError errors={field.state.meta.errors} />}
										</Field>
									)
								}}
							</form.Field>

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
												placeholder="At least 8 characters"
												autoComplete="new-password"
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
										{isSubmitting ? "Creating account…" : "Create account"}
									</Button>
								)}
							</form.Subscribe>
						</form>

						<p className="text-muted-foreground text-center text-sm">
							Already have an account?{" "}
							<Link href="/sign-in" className="text-foreground underline underline-offset-4">
								Sign in
							</Link>
						</p>
					</CardContent>
				</Card>
			</div>
		</main>
	)
}
