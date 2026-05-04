"use client"

import { useState } from "react"
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
import { Separator } from "@/core/components/ui/separator"
import { changePassword, deleteUser, updateUser, useSession } from "@/services/better-auth/client"

// ─── Profile Section ─────────────────────────────────────────────────────────

const profileSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters").max(50),
})

function ProfileSection() {
	const { data: session, refetch } = useSession()
	const [status, setStatus] = useState<string | null>(null)

	const form = useForm({
		defaultValues: { name: session?.user.name ?? "" },
		validators: { onSubmit: profileSchema },
		onSubmit: async ({ value }) => {
			setStatus(null)
			const { error } = await updateUser({ name: value.name })
			if (error) {
				setStatus(error.message ?? "Failed to update profile.")
			} else {
				await refetch()
				setStatus("Profile updated.")
			}
		},
	})

	return (
		<Card>
			<CardHeader>
				<CardTitle>Profile</CardTitle>
				<CardDescription>Update your display name</CardDescription>
			</CardHeader>
			<CardContent>
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
										autoComplete="name"
									/>
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							)
						}}
					</form.Field>

					<div className="flex items-center justify-between">
						{status && (
							<p
								className={
									status.includes("updated")
										? "text-sm text-green-600 dark:text-green-400"
										: "text-destructive text-sm"
								}
							>
								{status}
							</p>
						)}
						<form.Subscribe selector={s => s.isSubmitting}>
							{isSubmitting => (
								<Button type="submit" disabled={isSubmitting} size="sm" className="ml-auto">
									{isSubmitting ? "Saving…" : "Save changes"}
								</Button>
							)}
						</form.Subscribe>
					</div>
				</form>
			</CardContent>
		</Card>
	)
}

// ─── Password Section ─────────────────────────────────────────────────────────

const passwordSchema = z
	.object({
		currentPassword: z.string().min(1, "Current password is required"),
		newPassword: z.string().min(8, "New password must be at least 8 characters"),
		confirmPassword: z.string().min(1, "Please confirm your new password"),
	})
	.refine(data => data.newPassword === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	})

function PasswordSection() {
	const [status, setStatus] = useState<string | null>(null)

	const form = useForm({
		defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
		validators: { onSubmit: passwordSchema },
		onSubmit: async ({ value }) => {
			setStatus(null)
			const { error } = await changePassword({
				currentPassword: value.currentPassword,
				newPassword: value.newPassword,
				revokeOtherSessions: false,
			})
			if (error) {
				setStatus(error.message ?? "Failed to change password.")
			} else {
				form.reset()
				setStatus("Password changed successfully.")
			}
		},
	})

	return (
		<Card>
			<CardHeader>
				<CardTitle>Password</CardTitle>
				<CardDescription>Change your account password</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={e => {
						e.preventDefault()
						e.stopPropagation()
						void form.handleSubmit()
					}}
					className="flex flex-col gap-4"
				>
					<form.Field name="currentPassword">
						{field => {
							const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>Current password</FieldLabel>
									<Input
										id={field.name}
										type="password"
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={e => field.handleChange(e.target.value)}
										autoComplete="current-password"
									/>
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							)
						}}
					</form.Field>

					<form.Field name="newPassword">
						{field => {
							const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>New password</FieldLabel>
									<Input
										id={field.name}
										type="password"
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={e => field.handleChange(e.target.value)}
										autoComplete="new-password"
									/>
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							)
						}}
					</form.Field>

					<form.Field name="confirmPassword">
						{field => {
							const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>Confirm new password</FieldLabel>
									<Input
										id={field.name}
										type="password"
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={e => field.handleChange(e.target.value)}
										autoComplete="new-password"
									/>
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							)
						}}
					</form.Field>

					<div className="flex items-center justify-between">
						{status && (
							<p
								className={
									status.includes("successfully")
										? "text-sm text-green-600 dark:text-green-400"
										: "text-destructive text-sm"
								}
							>
								{status}
							</p>
						)}
						<form.Subscribe selector={s => s.isSubmitting}>
							{isSubmitting => (
								<Button type="submit" disabled={isSubmitting} size="sm" className="ml-auto">
									{isSubmitting ? "Saving…" : "Change password"}
								</Button>
							)}
						</form.Subscribe>
					</div>
				</form>
			</CardContent>
		</Card>
	)
}

// ─── Danger Zone ──────────────────────────────────────────────────────────────

function DangerZone() {
	const router = useRouter()
	const [confirming, setConfirming] = useState(false)
	const [password, setPassword] = useState("")
	const [error, setError] = useState<string | null>(null)
	const [isPending, setIsPending] = useState(false)

	const handleDelete = async () => {
		if (!password) {
			setError("Password is required to delete your account.")
			return
		}
		setError(null)
		setIsPending(true)
		const { error: deleteError } = await deleteUser({ password })
		setIsPending(false)
		if (deleteError) {
			setError(deleteError.message ?? "Failed to delete account.")
		} else {
			router.push("/sign-in")
		}
	}

	return (
		<Card className="border-destructive/40">
			<CardHeader>
				<CardTitle className="text-destructive">Danger zone</CardTitle>
				<CardDescription>
					Permanently delete your account and all your todos. This cannot be undone.
				</CardDescription>
			</CardHeader>
			<CardContent>
				{!confirming ? (
					<Button variant="destructive" size="sm" onClick={() => setConfirming(true)}>
						Delete account
					</Button>
				) : (
					<div className="flex flex-col gap-3">
						<p className="text-sm font-medium">Enter your password to confirm account deletion:</p>
						<Input
							type="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							placeholder="Your password"
							autoComplete="current-password"
						/>
						{error && <p className="text-destructive text-sm">{error}</p>}
						<div className="flex gap-2">
							<Button variant="destructive" size="sm" onClick={handleDelete} disabled={isPending}>
								{isPending ? "Deleting…" : "Yes, delete my account"}
							</Button>
							<Button
								variant="ghost"
								size="sm"
								onClick={() => {
									setConfirming(false)
									setPassword("")
									setError(null)
								}}
							>
								Cancel
							</Button>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	)
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
	return (
		<main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-6 pt-8 pb-16">
			<div>
				<h1 className="text-2xl font-semibold">Settings</h1>
				<p className="text-muted-foreground mt-1 text-sm">Manage your account preferences</p>
			</div>

			<Separator />

			<ProfileSection />
			<PasswordSection />
			<DangerZone />
		</main>
	)
}
