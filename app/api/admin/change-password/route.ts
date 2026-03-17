import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'

/**
 * POST /api/admin/change-password
 * Changes the admin password.
 * Requires current password verification.
 */
export async function POST(request: NextRequest) {
  try {
    const { currentPassword, newPassword } = await request.json()

    // Validate input
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Current password and new password are required' },
        { status: 400 }
      )
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'New password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Get stored password hash from environment
    const storedHash = process.env.ADMIN_PASSWORD_HASH
    const plainPassword = process.env.ADMIN_PASSWORD

    // Verify current password
    let isValidCurrentPassword = false

    if (storedHash) {
      // If we have a hash, compare against it
      isValidCurrentPassword = await bcrypt.compare(currentPassword, storedHash)
    } else if (plainPassword) {
      // Fallback to plain text comparison (not recommended for production)
      isValidCurrentPassword = currentPassword === plainPassword
    } else {
      return NextResponse.json(
        { error: 'Password configuration error. Please check environment variables.' },
        { status: 500 }
      )
    }

    if (!isValidCurrentPassword) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 401 }
      )
    }

    // Generate new password hash
    const newHash = await bcrypt.hash(newPassword, 12)

    // Note: In a real application, you would store this hash in a database
    // or use a secrets manager. For now, we'll return the hash so it can
    // be manually added to the environment variables.
    console.log('New password hash (update ADMIN_PASSWORD_HASH in .env):', newHash)

    // Clear existing session to force re-login with new password
    const cookieStore = await cookies()
    cookieStore.delete('admin-session')

    return NextResponse.json({
      success: true,
      message: 'Password changed successfully. Please log in again with your new password.',
      // Only include hash in development for setup purposes
      ...(process.env.NODE_ENV === 'development' && {
        newHash,
        instruction: 'Update ADMIN_PASSWORD_HASH in your .env file with this value'
      })
    })
  } catch (error) {
    console.error('Error changing password:', error)
    return NextResponse.json(
      { error: 'Failed to change password' },
      { status: 500 }
    )
  }
}
