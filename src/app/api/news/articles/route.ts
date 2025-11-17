import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import NewsArticle from '@/models/NewsArticle'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const limit = parseInt(searchParams.get('limit') || '20')

    const query: Record<string, unknown> = { published: true }

    if (category && category !== 'all') {
      query.category = category
    }

    if (featured === 'true') {
      query.featured = true
    }

    const articles = await NewsArticle
      .find(query)
      .select('title slug description imageUrl category source tags publishedAt readTime featured views author')
      .sort({ featured: -1, publishedAt: -1 })
      .limit(limit)
      .lean()

    return NextResponse.json({
      success: true,
      articles,
      count: articles.length
    })
  } catch (error: unknown) {
    console.error('Error fetching news articles:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch news articles' },
      { status: 500 }
    )
  }
}
