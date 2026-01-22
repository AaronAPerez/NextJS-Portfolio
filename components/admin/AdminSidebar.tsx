'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
  { name: 'Messages', href: '/admin/messages', icon: '💬' },
  // { name: 'Waitlist', href: '/admin/waitlist', icon: '📋' },
  // { name: 'Blog', href: '/admin/blog', icon: '📝' },
  { name: 'Images', href: '/admin/images', icon: '🖼️' },
  // { name: 'Analytics', href: '/admin/analytics', icon: '📈' },
  { name: 'Exports', href: '/admin/exports', icon: '📤' },
  { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gradient-to-b from-[#0a0a0a] via-gray-900 to-[#0a0a0a] px-6 pb-4 border-r border-white/10">
          <div className="flex h-16 shrink-0 items-center">
            <Link href="/admin" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-[#d4af37] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AP</span>
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">Aaron Perez</h1>
                <p className="text-gray-400 text-xs">Admin Portal</p>
              </div>
            </Link>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href ||
                      (item.href !== '/admin' && pathname.startsWith(item.href))

                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={clsx(
                            'group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold transition-all',
                            isActive
                              ? 'bg-gradient-to-r from-blue-600/20 to-[#d4af37]/20 text-white border border-blue-600/30'
                              : 'text-gray-300 hover:text-white hover:bg-white/5'
                          )}
                        >
                          <span className="text-xl">{item.icon}</span>
                          {item.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile menu button will be added in header */}
    </>
  )
}
