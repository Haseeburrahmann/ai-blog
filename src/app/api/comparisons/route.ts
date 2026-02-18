import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Comparison from '@/models/Comparison';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '20');

    const query: any = { published: true };

    if (category) {
      query.category = category;
    }

    const comparisons = await Comparison.find(query)
      .populate('tools.tool', 'name slug logo rating pricing websiteUrl affiliateUrl description')
      .populate('winner', 'name slug logo')
      .sort({ createdAt: -1 })
      .limit(limit);

    return NextResponse.json({
      success: true,
      comparisons,
    });
  } catch (error) {
    console.error('Error fetching comparisons:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch comparisons' },
      { status: 500 }
    );
  }
}
