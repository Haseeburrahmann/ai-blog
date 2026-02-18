import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Comparison from '@/models/Comparison';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();
    
    const { slug } = params;

    const comparison = await Comparison.findOne({ slug, published: true })
      .populate('tools.tool')
      .populate('winner');

    if (!comparison) {
      return NextResponse.json(
        { success: false, error: 'Comparison not found' },
        { status: 404 }
      );
    }

    // Increment views
    comparison.views = (comparison.views || 0) + 1;
    await comparison.save();

    return NextResponse.json({
      success: true,
      comparison,
    });
  } catch (error) {
    console.error('Error fetching comparison:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch comparison' },
      { status: 500 }
    );
  }
}
