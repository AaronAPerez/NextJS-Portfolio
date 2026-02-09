'use client'

import { Card } from '@/components/ui/Card'
import HostingOptionsForm from '@/components/admin/HostingOptionsForm'

export default function HostingOptionsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-earth-900">Web Hosting Options</h1>
          <p className="mt-1 text-sm text-earth-500">
            Edit and print professional hosting options documentation for your clients.
          </p>
        </div>
      </div>

      {/* Info Card */}
      <Card className="bg-gradient-to-r from-cyan-900/20 to-indigo-900/20 border-cyan-600/30">
        <div className="flex items-start">
          <div className="shrink-0">
            <span className="text-3xl">🌐</span>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-earth-900">How to Use</h3>
            <ul className="mt-2 space-y-1 text-sm text-earth-700">
              <li>1. Edit any text by clicking on it in Editing Mode</li>
              <li>2. Add or remove list items using the + and ✕ buttons</li>
              <li>3. Customize pricing, providers, and descriptions</li>
              <li>4. Toggle to Preview Mode to see the final document</li>
              <li>5. Click Print or Download PDF to save</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Pro Tips */}
      <Card className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border-indigo-600/30">
        <div className="flex items-start">
          <div className="shrink-0">
            <span className="text-3xl">💡</span>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-earth-900">Pro Tips</h3>
            <ul className="mt-2 space-y-1 text-sm text-earth-700">
              <li>• Customize the pricing to match your current rates</li>
              <li>• Add your preferred hosting providers to the recommendations</li>
              <li>• Update the auto-reply example with your actual business name</li>
              <li>• Use "Save as PDF" in the print dialog for best results</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Hosting Options Form */}
      <HostingOptionsForm />
    </div>
  )
}
