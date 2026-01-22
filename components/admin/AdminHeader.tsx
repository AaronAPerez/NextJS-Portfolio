'use client'

interface AdminHeaderProps {
  user?: {
    name?: string | null
    email?: string | null
    role?: string
  } | null
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  const displayName = user?.name || 'Admin'
  const displayRole = user?.role || 'User'

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-earth-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1 items-center">
          <h2 className="text-lg font-semibold text-earth-900">
            Welcome back, {displayName}
          </h2>
        </div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-earth-200" />
          <div className="flex items-center gap-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-earth-900">{displayName}</p>
              <p className="text-xs text-earth-500">{displayRole}</p>
            </div>
            {/* <Button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              variant="outline"
              size="sm"
            >
              Sign out
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  )
}
