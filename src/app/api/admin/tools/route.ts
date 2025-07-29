import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import AITool from '@/models/AITool'

export async function POST(request: Request) {
  try {
    await connectDB()
    
    const body = await request.json()
    const {
      name,
      description,
      longDescription,
      category,
      website,
      pricingType,
      startingPrice,
      currency = 'USD',
      billingCycle,
      overallRating,
      features,
      pros,
      cons,
      useCases,
      targetAudience,
      isFeatured
    } = body

    // Create slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')

    // Prepare pricing object
    const pricing = {
      type: pricingType,
      currency,
      ...(startingPrice && { startingPrice }),
      ...(billingCycle && { billingCycle })
    }

    // Prepare rating object with overall rating
    const rating = {
      overall: overallRating,
      usability: overallRating, // Default to overall rating
      features: overallRating,
      value: overallRating,
      support: overallRating
    }

    // Create new AI tool
    const aiTool = new AITool({
      name,
      slug,
      description,
      longDescription,
      category,
      website,
      pricing,
      rating,
      features: features || [],
      pros: pros || [],
      cons: cons || [],
      useCases: useCases || [],
      targetAudience: targetAudience || [],
      isFeatured: isFeatured || false,
      isActive: true,
      alternatives: [], // Empty for now
      screenshots: [], // Empty for now
      lastUpdated: new Date()
    })

    await aiTool.save()

    return NextResponse.json({
      success: true,
      message: 'AI tool added successfully!',
      tool: {
        id: aiTool._id,
        name: aiTool.name,
        slug: aiTool.slug,
        category: aiTool.category
      }
    })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error creating AI tool:', error)
    
    // Handle duplicate slug error
    if (error.code === 11000) {
      return NextResponse.json({
        error: 'An AI tool with this name already exists. Please choose a different name.'
      }, { status: 400 })
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const messages = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json({
        error: `Validation error: ${messages.join(', ')}`
      }, { status: 400 })
    }
    
    return NextResponse.json({
      error: 'Failed to create AI tool'
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    await connectDB()
    
    const tools = await AITool.find()
      .sort({ createdAt: -1 })
      .select('name slug description category pricing rating isFeatured isActive createdAt')
      .limit(50)

    return NextResponse.json({
      success: true,
      tools
    })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error fetching AI tools:', error)
    
    return NextResponse.json({
      error: 'Failed to fetch AI tools'
    }, { status: 500 })
  }
}