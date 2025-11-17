import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import NewsArticle from '@/models/NewsArticle'

export async function GET() {
  try {
    await connectDB()

    // Get counts for news articles
    const totalArticles = await NewsArticle.countDocuments()
    const publishedArticles = await NewsArticle.countDocuments({ published: true })
    const draftArticles = await NewsArticle.countDocuments({ published: false })
    const featuredArticles = await NewsArticle.countDocuments({ featured: true })
    const totalViews = await NewsArticle.aggregate([
      { $group: { _id: null, total: { $sum: '$views' } } }
    ])

    return NextResponse.json({
      blogPosts: totalArticles, // Keep for backward compatibility
      publishedPosts: publishedArticles,
      draftPosts: draftArticles,
      newsArticles: totalArticles,
      publishedArticles,
      draftArticles,
      featuredArticles,
      totalViews: totalViews[0]?.total || 0
    })
  } catch (error: any) {
    console.error('Error fetching admin stats:', error)

    return NextResponse.json({
      error: 'Failed to fetch stats'
    }, { status: 500 })
  }
}