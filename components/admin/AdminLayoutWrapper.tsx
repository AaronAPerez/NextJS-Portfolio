'use client'

import { usePathname } from 'next/navigation'
import AdminSidebar from './AdminSidebar'

interface AdminLayoutWrapperProps {
  children: React.ReactNode
}

export default function AdminLayoutWrapper({ children }: AdminLayoutWrapperProps) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  // Login page gets a clean layout without sidebar
  if (isLoginPage) {
    return <>{children}</>
  }

  // All other admin pages get the sidebar layout
  return (
    <div className="min-h-screen bg-earth-50">
      <AdminSidebar />
      <div className="lg:pl-64">
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  )
}
