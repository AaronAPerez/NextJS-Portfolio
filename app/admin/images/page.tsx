'use client'

import { useState, useMemo, useCallback } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Tooltip from '@/components/admin/Tooltip'

type ImageType = 'HERO' | 'ABOUT' | 'HACIENDA' | 'BLOG' | 'LOGO' | 'FAVICON' | 'OG_IMAGE' | 'GENERAL'

// Static filter types array to prevent recreation
const IMAGE_FILTER_TYPES = ['all', 'HERO', 'ABOUT', 'HACIENDA', 'BLOG', 'LOGO', 'FAVICON', 'OG_IMAGE', 'GENERAL'] as const

export default function ImagesPage() {
  const [selectedType, setSelectedType] = useState<ImageType | 'all'>('all')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  // Mock data - replace with actual API call
  const images: any[] = []

  // Memoize typeCounts to prevent recreation on every render
  const typeCounts = useMemo(() => ({
    all: images.length,
    HERO: 0,
    ABOUT: 0,
    HACIENDA: 0,
    BLOG: 0,
    LOGO: 0,
    FAVICON: 0,
    OG_IMAGE: 0,
    GENERAL: 0,
  }), [images.length])

  // Memoize upload handler to prevent recreation
  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    setIsUploading(true)
    setUploadProgress(0)

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const formData = new FormData()
        formData.append('file', file)
        formData.append('type', selectedType === 'all' ? 'GENERAL' : selectedType)

        // Simulate upload progress
        for (let p = 0; p <= 100; p += 10) {
          setUploadProgress(p)
          await new Promise(resolve => setTimeout(resolve, 100))
        }

        // TODO: Replace with actual API call
        // await fetch('/api/admin/images/upload', {
        //   method: 'POST',
        //   body: formData,
        // })
      }
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }, [selectedType])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-earth-900">Image Management</h1>
          <p className="mt-1 text-sm text-earth-500">
            Upload and manage website images via Cloudinary CDN
          </p>
        </div>
        <div className="flex gap-2">
          <label htmlFor="file-upload" className="cursor-pointer">
            <Button variant="primary" size="md" disabled={isUploading}>
              {isUploading ? '⏳ Uploading...' : '📤 Upload Images'}
            </Button>
            <input
              id="file-upload"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Upload Progress */}
      {isUploading && (
        <Card className="p-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-earth-700">Uploading...</span>
              <span className="text-earth-600">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-earth-200 rounded-full h-2">
              <div
                className="bg-warrior-gold h-2 rounded-full transition-all"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        </Card>
      )}

      {/* Image Type Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-2">
          {IMAGE_FILTER_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedType === type
                  ? 'bg-warrior-gold text-warrior-black'
                  : 'bg-earth-100 text-earth-700 hover:bg-earth-200'
              }`}
            >
              {type === 'all' ? 'All Images' : type} ({typeCounts[type]})
            </button>
          ))}
        </div>
      </Card>

      {/* Cloudinary Integration Info */}
      <Card className="p-6 bg-gradient-to-r from-earth-50 to-earth-100 border-earth-200">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <span className="text-3xl">☁️</span>
          </div>
          <div className="ml-4 flex-1">
            <h3 className="text-lg font-semibold text-earth-900 mb-2">
              Cloudinary CDN Integration
            </h3>
            <p className="text-sm text-earth-700 mb-3">
              Images are automatically uploaded to Cloudinary for fast, optimized delivery with automatic
              resizing, compression, and global CDN distribution.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-white p-3 rounded-lg">
                <div className="text-2xl font-bold text-warrior-gold">{images.length}</div>
                <div className="text-xs text-earth-600">Total Images</div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="text-2xl font-bold text-primary-700">
                  {(images.reduce((sum: number, img: any) => sum + (img.size || 0), 0) / 1024 / 1024).toFixed(2)} MB
                </div>
                <div className="text-xs text-earth-600">Storage Used</div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="text-2xl font-bold text-earth-700">FREE</div>
                <div className="text-xs text-earth-600">25GB/month</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Images Grid */}
      {images.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="space-y-4">
            <div className="text-6xl">🖼️</div>
            <h3 className="text-xl font-semibold text-earth-900">No images yet</h3>
            <p className="text-earth-600 max-w-md mx-auto">
              Upload your first images to get started. All images are automatically optimized and delivered via Cloudinary CDN.
            </p>
            <label htmlFor="file-upload-empty" className="inline-block cursor-pointer">
              <Button variant="primary" size="lg">
                📤 Upload Your First Images
              </Button>
              <input
                id="file-upload-empty"
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image: any) => (
            <Card key={image.id} className="overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="aspect-square bg-earth-100 overflow-hidden">
                <img
                  src={image.url}
                  alt={image.alt || image.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-earth-700 truncate flex-1">
                    {image.name}
                  </span>
                  <span className="text-xs text-earth-500 bg-warrior-gold/10 px-2 py-1 rounded">
                    {image.type}
                  </span>
                </div>
                <div className="text-xs text-earth-500 mb-2">
                  {image.width} × {image.height} • {(image.size / 1024).toFixed(1)} KB
                </div>
                <div className="flex gap-1">
                  <Tooltip content="Copy URL">
                    <Button variant="ghost" size="sm" className="flex-1 text-xs">
                      📋
                    </Button>
                  </Tooltip>
                  <Tooltip content="View">
                    <Button variant="ghost" size="sm" className="flex-1 text-xs">
                      👁️
                    </Button>
                  </Tooltip>
                  <Tooltip content="Delete">
                    <Button variant="ghost" size="sm" className="flex-1 text-xs">
                      🗑️
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <Card className="p-6 bg-gradient-to-r from-primary-700/10 to-warrior-gold/10 border-primary-700/20">
        <h3 className="text-lg font-semibold text-earth-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow text-left">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔄</span>
              <div>
                <div className="font-semibold text-earth-900">Bulk Replace</div>
                <div className="text-sm text-earth-600">Replace multiple images at once</div>
              </div>
            </div>
          </button>
          <button className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow text-left">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🗂️</span>
              <div>
                <div className="font-semibold text-earth-900">Organize Folders</div>
                <div className="text-sm text-earth-600">Manage Cloudinary folders</div>
              </div>
            </div>
          </button>
        </div>
      </Card>
    </div>
  )
}
