import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import BlogPost from '@/models/BlogPost'
import AITool from '@/models/AITool'

export async function GET() {
  try {
    // Connect to database
    await connectDB()
    
    // Test database operations
    const blogPostCount = await BlogPost.countDocuments()
    const aiToolCount = await AITool.countDocuments()
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful!',
      data: {
        blogPosts: blogPostCount,
        aiTools: aiToolCount,
        timestamp: new Date().toISOString()
      }
    })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Database connection error:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Database connection failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    }, { status: 500 })
  }
}