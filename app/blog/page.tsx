'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Tooltip from '@/components/admin/Tooltip'
import { useBlog } from '@/lib/hooks/useBlog'

type PostStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'

export default function BlogPage() {
  const [selectedStatus, setSelectedStatus] = useState<PostStatus | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const { data: posts, isLoading } = useBlog()

  const filteredPosts = posts?.filter(post => {
    const matchesStatus = selectedStatus === 'all' || post.status === selectedStatus
    const matchesSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const statusCounts = {
    all: posts?.length || 0,
    DRAFT: posts?.filter(p => p.status === 'DRAFT').length || 0,
    PUBLISHED: posts?.filter(p => p.status === 'PUBLISHED').length || 0,
    ARCHIVED: posts?.filter(p => p.status === 'ARCHIVED').length || 0,
  }

  const statusColors = {
    DRAFT: 'bg-earth-100 text-earth-700 border-earth-300',
    PUBLISHED: 'bg-primary-100 text-primary-700 border-primary-200',
    ARCHIVED: 'bg-earth-50 text-earth-500 border-earth-200',
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-earth-900">Blog Posts</h1>
          <p className="mt-1 text-sm text-earth-500">
            Create and manage wellness articles
          </p>
        </div>
        <Link href="/admin/blog/new">
          <Button variant="primary" size="md">
            ➕ New Post
          </Button>
        </Link>
      </div>

      {/* Status Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-2">
          {(['all', 'DRAFT', 'PUBLISHED', 'ARCHIVED'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedStatus === status
                  ? 'bg-primary-700 text-white'
                  : 'bg-earth-100 text-earth-700 hover:bg-earth-200'
              }`}
            >
              {status === 'all' ? 'All' : status} ({statusCounts[status]})
            </button>
          ))}
        </div>
      </Card>

      {/* Search */}
      <Card className="p-4">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-linear-to-br from-primary-50 to-primary-100/50">
          <div className="text-2xl font-bold text-primary-700">{statusCounts.PUBLISHED}</div>
          <div className="text-sm text-primary-600">Published</div>
        </Card>
        <Card className="p-4 bg-linear-to-br from-earth-100 to-earth-50">
          <div className="text-2xl font-bold text-earth-900">{statusCounts.DRAFT}</div>
          <div className="text-sm text-earth-600">Drafts</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-earth-900">
            {posts?.reduce((sum, p) => sum + (p.views || 0), 0) || 0}
          </div>
          <div className="text-sm text-earth-600">Total Views</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-earth-900">{posts?.length || 0}</div>
          <div className="text-sm text-earth-600">Total Posts</div>
        </Card>
      </div>

      {/* Blog Posts List */}
      {isLoading ? (
        <Card className="p-8 text-center">
          <p className="text-earth-500">Loading posts...</p>
        </Card>
      ) : filteredPosts?.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="space-y-4">
            <p className="text-earth-500">No blog posts found</p>
            <Link href="/admin/blog/new">
              <Button variant="primary">Create Your First Post</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts?.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-shadow">
              {post.coverImage && (
                <div className="h-48 bg-earth-200 overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[post.status]}`}>
                    {post.status}
                  </span>
                  {post.featured && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-warrior-gold/20 text-earth-900">
                      ⭐ Featured
                    </span>
                  )}
                  {post.category && (
                    <span className="px-2 py-1 bg-earth-100 text-earth-700 rounded text-xs">
                      {post.category}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-earth-900 mb-2 line-clamp-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-sm text-earth-600 mb-3 line-clamp-2">{post.excerpt}</p>
                )}
                <div className="flex items-center gap-4 text-xs text-earth-500 mb-4">
                  <span>👤 {post.author}</span>
                  {post.publishedAt && (
                    <span>📅 {new Date(post.publishedAt).toLocaleDateString()}</span>
                  )}
                  <span>👁️ {post.views || 0} views</span>
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-warrior-gold/10 text-earth-700 rounded text-xs">
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <Link href={`/admin/blog/${post.id}/edit`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      ✏️ Edit
                    </Button>
                  </Link>
                  <Tooltip content="Preview post">
                    <Button variant="ghost" size="sm">
                      👁️
                    </Button>
                  </Tooltip>
                  <Tooltip content="Delete post">
                    <Button variant="ghost" size="sm">
                      🗑️
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
