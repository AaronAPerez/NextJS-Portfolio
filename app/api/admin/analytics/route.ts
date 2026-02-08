import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const days = parseInt(searchParams.get('days') || '30', 10)

    // Calculate date range
    const dateThreshold = new Date()
    dateThreshold.setDate(dateThreshold.getDate() - days)
    const dateString = dateThreshold.toISOString()

    // Query ContactMessage stats
    const messageStats = await sql`
      SELECT
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE "read" = false) as unread,
        COUNT(*) FILTER (WHERE "createdAt" >= ${dateString}::timestamp) as recent
      FROM "ContactMessage"
    `

    // Query PageView stats
    const pageViewStats = await sql`
      SELECT
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE "createdAt" >= ${dateString}::timestamp) as recent
      FROM "PageView"
    `

    const totalMessages = Number(messageStats[0]?.total || 0)
    const newMessages = Number(messageStats[0]?.unread || 0)
    const recentMessages = Number(messageStats[0]?.recent || 0)
    const recentPageViews = Number(pageViewStats[0]?.recent || 0)

    return NextResponse.json({
      overview: {
        totalMessages,
        newMessages,
        totalWaitlist: 0,
        activeWaitlist: 0,
        totalBlogPosts: 0,
        publishedPosts: 0,
      },
      recent: {
        messages: recentMessages,
        waitlist: 0,
        pageViews: recentPageViews,
      },
    })
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
