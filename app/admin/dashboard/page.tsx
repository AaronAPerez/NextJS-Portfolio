'use client'

import { useQuery } from '@tanstack/react-query'
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import DashboardTour from '@/components/admin/DashboardTour'
import Tooltip from '@/components/admin/Tooltip'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function DashboardPage() {
  const [showSpinner, setShowSpinner] = useState(true)

  const { data: analytics, isLoading, isError } = useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      const response = await fetch('/api/admin/analytics?days=30')
      if (!response.ok) throw new Error('Failed to fetch analytics')
      return response.json()
    },
  })

  // Auto-hide spinner after 2 seconds regardless of loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Memoize stats array to prevent recreation on every render
  const stats = useMemo(() => [
    {
      name: 'Total Messages',
      value: analytics?.overview.totalMessages || 0,
      new: analytics?.overview.newMessages || 0,
      icon: '💬',
      href: '/admin/messages',
      color: 'from-primary-600 to-primary-700',
      tour: 'messages',
      tooltip: 'Contact form submissions from departments',
    },
    {
      name: 'Waitlist Entries',
      value: analytics?.overview.totalWaitlist || 0,
      new: analytics?.overview.activeWaitlist || 0,
      icon: '📋',
      href: '/admin/waitlist',
      color: 'from-warrior-gold to-warrior-amber',
      tour: 'waitlist',
      tooltip: 'Hacienda Consuelo retreat signups',
    },
    {
      name: 'Blog Posts',
      value: analytics?.overview.totalBlogPosts || 0,
      new: analytics?.overview.publishedPosts || 0,
      icon: '📝',
      href: '/admin/blog',
      color: 'from-purple-500 to-purple-600',
      tour: 'blog',
      tooltip: 'Published wellness articles',
    },
    {
      name: 'Page Views',
      value: analytics?.recent.pageViews || 0,
      new: 0,
      icon: '👁️',
      href: '/admin/analytics',
      color: 'from-orange-500 to-orange-600',
      tour: 'analytics',
      tooltip: 'Website traffic in last 30 days',
    },
  ], [analytics])

  // Show spinner only for first 2 seconds OR while actually loading (whichever is shorter)
  if (isLoading && showSpinner) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <div className="text-earth-500">Signing in...</div>
        </div>
      </div>
    )
  }

  // Show error state
  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-500 mb-2">⚠️ Failed to load analytics</div>
          <div className="text-earth-500 text-sm">Dashboard will load with default values</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <DashboardTour />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-earth-900">Dashboard</h1>
          <p className="mt-1 text-sm text-earth-500">
            Welcome back! Here's what's happening with your website.
          </p>
        </div>
        <Tooltip content="Restart the guided tour">
          <Button
            onClick={() => {
              localStorage.removeItem('admin-tour-completed')
              window.location.reload()
            }}
            variant="outline"
            size="sm"
          >
            📚 Tour
          </Button>
        </Tooltip>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.name} href={stat.href} data-tour={stat.tour}>
            <Tooltip content={stat.tooltip}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-earth-500">{stat.name}</p>
                    <div className="mt-2 flex items-baseline">
                      <p className="text-3xl font-bold text-earth-900">{stat.value}</p>
                      {stat.new > 0 && (
                        <span className="ml-2 text-sm font-medium text-green-600">
                          +{stat.new} new
                        </span>
                      )}
                    </div>
                  </div>
                  <div
                    className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg`}
                  >
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                </div>
              </Card>
            </Tooltip>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-earth-900">Quick Actions</h2>
            <Tooltip content="Common tasks you can perform">
              <span className="text-sm text-earth-400">ℹ️</span>
            </Tooltip>
          </div>
          <div className="space-y-2">
            <Link href="/admin/messages?status=new">
              <Button variant="outline" className="w-full justify-start">
                <span className="mr-2">📬</span>
                View New Messages ({analytics?.overview.newMessages || 0})
              </Button>
            </Link>
            <Link href="/admin/exports">
              <Button variant="outline" className="w-full justify-start">
                <span className="mr-2">📤</span>
                Export Data
              </Button>
            </Link>
            <Link href="/admin/blog/new">
              <Button variant="outline" className="w-full justify-start">
                <span className="mr-2">✍️</span>
                Write New Blog Post
              </Button>
            </Link>
            <Link href="/admin/images" data-tour="images">
              <Button variant="outline" className="w-full justify-start">
                <span className="mr-2">📸</span>
                Upload Images
              </Button>
            </Link>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-earth-900">Recent Activity</h2>
            <Tooltip content="Latest form submissions">
              <span className="text-sm text-earth-400">ℹ️</span>
            </Tooltip>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-earth-100">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary-600 rounded-full mr-3" />
                <span className="text-sm text-earth-700">Messages (30 days)</span>
              </div>
              <span className="text-sm font-semibold text-earth-900">
                {analytics?.recent.messages || 0}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-earth-100">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-warrior-gold rounded-full mr-3" />
                <span className="text-sm text-earth-700">Waitlist (30 days)</span>
              </div>
              <span className="text-sm font-semibold text-earth-900">
                {analytics?.recent.waitlist || 0}
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-earth-600 rounded-full mr-3" />
                <span className="text-sm text-earth-700">Page Views (30 days)</span>
              </div>
              <span className="text-sm font-semibold text-earth-900">
                {analytics?.recent.pageViews || 0}
              </span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-blue-600/10 to-yellow-600/10 border-blue-600/20">
        <div className="flex items-start">
          <div className="shrink-0">
            <span className="text-3xl">💡</span>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-earth-900">Pro Tips</h3>
            <ul className="mt-2 space-y-1 text-sm text-earth-700">
              <li>• Use bulk actions to update multiple messages at once</li>
              <li>• Export data to Google Sheets for easy CRM integration</li>
              <li>• Use the Exports page to download CSV or sync with Google Sheets</li>
              <li>• Schedule blog posts by setting a future publish date</li>
              <li>• Add alt text to images for better SEO and accessibility</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}