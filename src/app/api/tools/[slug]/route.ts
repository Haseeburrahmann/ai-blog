import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import AITool from '@/models/AITool';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();
    
    const { slug } = params;

    const tool = await AITool.findOne({ slug, published: true })
      .populate('alternatives', 'name slug logo rating category pricing');

    if (!tool) {
      return NextResponse.json(
        { success: false, error: 'Tool not found' },
        { status: 404 }
      );
    }

    // Increment views
    tool.views = (tool.views || 0) + 1;
    await tool.save();

    return NextResponse.json({
      success: true,
      tool,
    });
  } catch (error) {
    console.error('Error fetching tool:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tool' },
      { status: 500 }
    );
  }
}
