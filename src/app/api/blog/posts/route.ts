import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import BlogPost from '@/models/BlogPost'

export async function GET() {
  try {
    await connectDB()
    
    // Only fetch published posts for public view
    const posts = await BlogPost.find({ published: true })
      .sort({ publishedAt: -1 })
      .select('title slug excerpt category tags publishedAt readTime')
      .limit(50)

    return NextResponse.json({
      success: true,
      posts
    })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error fetching public blog posts:', error)
    
    return NextResponse.json({
      error: 'Failed to fetch blog posts'
    }, { status: 500 })
  }
}