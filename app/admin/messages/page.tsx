'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Tooltip from '@/components/admin/Tooltip'
import { useMessages } from '@/lib/hooks/useMessages'

type MessageStatus = 'NEW' | 'IN_PROGRESS' | 'REPLIED' | 'ARCHIVED' | 'SPAM'

export default function MessagesPage() {
  const [selectedStatus, setSelectedStatus] = useState<MessageStatus | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const { data: messages, isLoading } = useMessages()

  const filteredMessages = messages?.filter(msg => {
    const matchesStatus = selectedStatus === 'all' || msg.status === selectedStatus
    const matchesSearch = searchQuery === '' ||
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const statusCounts = {
    all: messages?.length || 0,
    NEW: messages?.filter(m => m.status === 'NEW').length || 0,
    IN_PROGRESS: messages?.filter(m => m.status === 'IN_PROGRESS').length || 0,
    REPLIED: messages?.filter(m => m.status === 'REPLIED').length || 0,
    ARCHIVED: messages?.filter(m => m.status === 'ARCHIVED').length || 0,
    SPAM: messages?.filter(m => m.status === 'SPAM').length || 0,
  }

  const statusColors: Record<MessageStatus, string> = {
    NEW: 'bg-primary-100 text-primary-700 border-primary-200',
    IN_PROGRESS: 'bg-warrior-gold/20 text-earth-900 border-warrior-gold/30',
    REPLIED: 'bg-earth-100 text-earth-700 border-earth-300',
    ARCHIVED: 'bg-earth-50 text-earth-600 border-earth-200',
    SPAM: 'bg-primary-50 text-primary-600 border-primary-100',
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-earth-900">Contact Messages</h1>
          <p className="mt-1 text-sm text-earth-500">
            Manage inquiries from departments and visitors
          </p>
        </div>
        <Tooltip content="Export all messages">
          <Button variant="outline" size="sm">
            📥 Export
          </Button>
        </Tooltip>
      </div>

      {/* Status Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-2">
          {(['all', 'NEW', 'IN_PROGRESS', 'REPLIED', 'ARCHIVED', 'SPAM'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedStatus === status
                  ? 'bg-primary-700 text-white'
                  : 'bg-earth-100 text-earth-700 hover:bg-earth-200'
              }`}
            >
              {status === 'all' ? 'All' : status.replace('_', ' ')} ({statusCounts[status]})
            </button>
          ))}
        </div>
      </Card>

      {/* Search */}
      <Card className="p-4">
        <input
          type="text"
          placeholder="Search by name, email, or message..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </Card>

      {/* Messages List */}
      {isLoading ? (
        <Card className="p-8 text-center">
          <p className="text-earth-500">Loading messages...</p>
        </Card>
      ) : filteredMessages?.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-earth-500">No messages found</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredMessages?.map((message) => (
            <Card key={message.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-earth-900">{message.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[message.status as MessageStatus]}`}>
                      {message.status.replace('_', ' ')}
                    </span>
                    {message.priority !== 'NORMAL' && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                        {message.priority}
                      </span>
                    )}
                  </div>
                  <div className="space-y-1 text-sm text-earth-600 mb-3">
                    <p>📧 {message.email}</p>
                    {message.phone && <p>📱 {message.phone}</p>}
                    {message.department && <p>🏢 {message.department}</p>}
                    <p>📅 {new Date(message.createdAt).toLocaleString()}</p>
                  </div>
                  <p className="text-earth-800 whitespace-pre-wrap">{message.message}</p>
                  {(message as any).notes && (
                    <div className="mt-3 p-3 bg-earth-50 rounded-lg">
                      <p className="text-sm text-earth-700"><strong>Notes:</strong> {(message as any).notes}</p>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <Tooltip content="View details">
                    <Button variant="ghost" size="sm">
                      👁️
                    </Button>
                  </Tooltip>
                  <Tooltip content="Reply">
                    <Button variant="primary" size="sm">
                      ✉️
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
