import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import NewsArticle from '@/models/NewsArticle'

export async function GET() {
  try {
    // Connect to database
    await connectDB()

    // Test database operations
    const newsArticleCount = await NewsArticle.countDocuments()
    const publishedCount = await NewsArticle.countDocuments({ published: true })

    return NextResponse.json({
      success: true,
      message: 'Database connection successful!',
      data: {
        newsArticles: newsArticleCount,
        publishedArticles: publishedCount,
        timestamp: new Date().toISOString()
      }
    })
  } catch (error: any) {
    console.error('Database connection error:', error)

    return NextResponse.json({
      success: false,
      message: 'Database connection failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    }, { status: 500 })
  }
}