'use client'

import { useState, useEffect } from 'react'

export default function DashboardTour() {
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('admin-tour-completed')
    if (!hasSeenTour) {
      const timer = setTimeout(() => setShowWelcome(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    localStorage.setItem('admin-tour-completed', 'true')
    setShowWelcome(false)
  }

  if (!showWelcome) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl mx-4 p-8 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-earth-400 hover:text-earth-900"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <span className="text-6xl mb-4 block">🎉</span>
          <h2 className="text-3xl font-bold text-earth-900 mb-2">
            Welcome to Your Admin Dashboard!
          </h2>
          <p className="text-earth-600">
            Manage your Portfolio website with powerful tools
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">💬</span>
            <div>
              <h3 className="font-semibold text-earth-900">Messages</h3>
              <p className="text-sm text-earth-600">View and respond to department inquiries</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-2xl">📋</span>
            <div>
              <h3 className="font-semibold text-earth-900">Waitlist</h3>
              <p className="text-sm text-earth-600">Manage Hacienda Consuelo retreat signups</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-2xl">📝</span>
            <div>
              <h3 className="font-semibold text-earth-900">Blog</h3>
              <p className="text-sm text-earth-600">Create and publish wellness articles</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-2xl">🖼️</span>
            <div>
              <h3 className="font-semibold text-earth-900">Images</h3>
              <p className="text-sm text-earth-600">Upload and manage website images</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-2xl">📊</span>
            <div>
              <h3 className="font-semibold text-earth-900">Analytics</h3>
              <p className="text-sm text-earth-600">Track performance and engagement</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleClose}
          className="w-full bg-gradient-to-r from-blue-600 to-yellow-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-500 hover:to-yellow-500 transition-all"
        >
          Get Started
        </button>

        <p className="text-xs text-earth-400 text-center mt-4">
          Hover over elements for helpful tooltips throughout the dashboard
        </p>
      </div>
    </div>
  )
}
