import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import AITool from '@/models/AITool';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const trending = searchParams.get('trending');
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    const search = searchParams.get('search');

    const query: any = { published: true };

    if (category) {
      query.category = category;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (trending === 'true') {
      query.trending = true;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    const tools = await AITool.find(query)
      .select('name slug shortDescription logo category pricing rating featured trending')
      .sort({ featured: -1, 'rating.overall': -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await AITool.countDocuments(query);

    return NextResponse.json({
      success: true,
      tools,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching tools:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tools' },
      { status: 500 }
    );
  }
}
