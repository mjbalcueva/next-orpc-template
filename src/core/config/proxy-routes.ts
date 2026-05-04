/**
 * Edit these route lists to control which URLs require auth in `src/proxy.ts`.
 *
 * - exact: requires an exact pathname match
 * - prefixes: protects that subtree (e.g. "/settings" protects "/settings" and "/settings/*")
 */
export const PROXY_PROTECTED_EXACT_PATHS = [] as const

export const PROXY_PROTECTED_PREFIXES = ["/todos", "/settings"] as const

export function isProtectedProxyPath(pathname: string): boolean {
	const exactPaths: readonly string[] = PROXY_PROTECTED_EXACT_PATHS
	if (exactPaths.includes(pathname)) {
		return true
	}

	const prefixes: readonly string[] = PROXY_PROTECTED_PREFIXES
	return prefixes.some(prefix => pathname === prefix || pathname.startsWith(`${prefix}/`))
}
