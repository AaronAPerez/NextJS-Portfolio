import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Admin auth gate.
 *
 * /admin/* pages are protected by default (deny-by-default, rather than an
 * allowlist of routes) so a newly added admin page can't slip through
 * unauthenticated the way /admin/clients, /admin/exports, /admin/gbp, and
 * /admin/[site] previously did here.
 *
 * A few admin-prefixed API routes are intentionally public: they back
 * client-facing pages reached via a shared link (e.g. /invoice/[id],
 * /hosting-options/[id]) rather than the logged-in admin UI, so only the
 * read (GET) of a single record is exempted — list/create/update/delete
 * stay gated.
 */

// Routes that should redirect to the dashboard if already logged in
const authRoutes = ['/admin/login']

const PUBLIC_API_EXCEPTIONS: { method: string; pattern: RegExp }[] = [
  { method: 'GET', pattern: /^\/api\/invoices\/[^/]+$/ },        // single invoice view (shared link)
  { method: 'GET', pattern: /^\/api\/hosting-options\/[^/]+$/ }, // single hosting-options doc (shared link)
  { method: 'GET', pattern: /^\/api\/projects$/ },               // public projects list (homepage)
]

const ADMIN_API_PREFIX = /^\/api\/(clients|invoices|hosting-options|projects|gbp|settings)(\/|$)/
const ADMIN_API_EXTRA = /^\/api\/admin\/(analytics|change-password)$/

function isPublicApiException(pathname: string, method: string): boolean {
  return PUBLIC_API_EXCEPTIONS.some((r) => r.method === method && r.pattern.test(pathname))
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAuthenticated = request.cookies.get('admin-auth')?.value === 'true'

  // Gate every /admin/* page except the login page itself
  const isProtectedPage = pathname.startsWith('/admin') && pathname !== '/admin/login'

  if (isProtectedPage && !isAuthenticated) {
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect to dashboard if already logged in and trying to access login
  if (authRoutes.includes(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  // Redirect /admin to /admin/dashboard or /admin/login
  if (pathname === '/admin') {
    return NextResponse.redirect(
      new URL(isAuthenticated ? '/admin/dashboard' : '/admin/login', request.url)
    )
  }

  // Gate the API routes those admin pages call
  const isAdminApiRoute = ADMIN_API_PREFIX.test(pathname) || ADMIN_API_EXTRA.test(pathname)
  if (isAdminApiRoute && !isPublicApiException(pathname, request.method) && !isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
}
