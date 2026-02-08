import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = await cookies()

  // Clear the auth cookie
  cookieStore.set('admin-auth', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 0, // Expire immediately
  })

  return NextResponse.json({ success: true })
}

export async function GET() {
  const cookieStore = await cookies()

  // Clear the auth cookie
  cookieStore.set('admin-auth', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  })

  // Redirect to login page
  return NextResponse.redirect(new URL('/admin/login', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'))
}
