import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import AITool from '@/models/AITool'

export async function GET() {
  try {
    await connectDB()
    
    // Only fetch active tools for public view
    const tools = await AITool.find({ isActive: true })
      .sort({ isFeatured: -1, createdAt: -1 }) // Featured first, then by newest
      .select('name slug description category website pricing rating isFeatured')
      .limit(100)

    return NextResponse.json({
      success: true,
      tools
    })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error fetching public AI tools:', error)
    
    return NextResponse.json({
      error: 'Failed to fetch AI tools'
    }, { status: 500 })
  }
}