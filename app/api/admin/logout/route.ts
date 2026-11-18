import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { ADMIN_SESSION_COOKIE } from '@/lib/admin-session'

async function clearSessionCookies() {
  const cookieStore = await cookies()
  const expired = { httpOnly: true, secure: true, sameSite: 'strict' as const, path: '/', maxAge: 0 }

  cookieStore.set(ADMIN_SESSION_COOKIE, '', expired)
  // Remove the old unsigned cookie from browsers that still hold it.
  cookieStore.set('admin-auth', '', expired)
}

export async function POST() {
  await clearSessionCookies()
  return NextResponse.json({ success: true })
}

export async function GET() {
  await clearSessionCookies()
  return NextResponse.redirect(new URL('/admin/login', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'))
}
