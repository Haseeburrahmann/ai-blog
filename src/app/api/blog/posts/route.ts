import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import NewsArticle from '@/models/NewsArticle'

export async function GET() {
  try {
    await connectDB()

    // Redirect to news API - keeping this for backward compatibility
    const articles = await NewsArticle.find({ published: true })
      .sort({ publishedAt: -1 })
      .select('title slug description category tags publishedAt readTime')
      .limit(50)

    return NextResponse.json({
      success: true,
      posts: articles // Keep 'posts' key for backward compatibility
    })
  } catch (error: any) {
    console.error('Error fetching articles:', error)

    return NextResponse.json({
      error: 'Failed to fetch articles'
    }, { status: 500 })
  }
}