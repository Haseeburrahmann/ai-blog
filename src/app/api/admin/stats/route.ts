import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import BlogPost from '@/models/BlogPost'
import AITool from '@/models/AITool'

export async function GET() {
  try {
    await connectDB()
    
    // Get counts
    const totalPosts = await BlogPost.countDocuments()
    const publishedPosts = await BlogPost.countDocuments({ published: true })
    const draftPosts = await BlogPost.countDocuments({ published: false })
    const aiTools = await AITool.countDocuments()
    
    return NextResponse.json({
      blogPosts: totalPosts,
      publishedPosts,
      draftPosts,
      aiTools
    })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error fetching admin stats:', error)
    
    return NextResponse.json({
      error: 'Failed to fetch stats'
    }, { status: 500 })
  }
}