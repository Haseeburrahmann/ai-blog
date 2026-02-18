import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import AITool from '@/models/AITool';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const categories = await AITool.distinct('category', { published: true });
    
    const categoryStats = await Promise.all(
      categories.map(async (category) => {
        const count = await AITool.countDocuments({ category, published: true });
        const topTools = await AITool.find({ category, published: true })
          .select('name slug logo rating pricing')
          .sort({ 'rating.overall': -1 })
          .limit(4);
        
        return {
          name: category,
          count,
          topTools,
        };
      })
    );

    return NextResponse.json({
      success: true,
      categories: categoryStats,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
