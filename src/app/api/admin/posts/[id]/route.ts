/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import NewsArticle from '@/models/NewsArticle'

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    await connectDB()
    
    const { id } = await params

    // Find and delete the post
    const deletedPost = await NewsArticle.findByIdAndDelete(id)

    if (!deletedPost) {
      return NextResponse.json({
        error: 'Post not found'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: 'Post deleted successfully',
      post: {
        id: deletedPost._id,
        title: deletedPost.title
      }
    })
  } catch (error: any) {
    console.error('Error deleting blog post:', error)
    
    return NextResponse.json({
      error: 'Failed to delete blog post'
    }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    await connectDB()
    
    const { id } = await params
    const body = await request.json()

    // Find and update the post
    const updatedPost = await NewsArticle.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    )

    if (!updatedPost) {
      return NextResponse.json({
        error: 'Post not found'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: 'Post updated successfully',
      post: {
        id: updatedPost._id,
        title: updatedPost.title,
        published: updatedPost.published,
        publishedAt: updatedPost.publishedAt
      }
    })
  } catch (error: any) {
    console.error('Error updating blog post:', error)
    
    return NextResponse.json({
      error: 'Failed to update blog post'
    }, { status: 500 })
  }
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    await connectDB()
    
    const { id } = await params

    // Find the post by ID
    const post = await NewsArticle.findById(id)

    if (!post) {
      return NextResponse.json({
        error: 'Post not found'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      post
    })
  } catch (error: any) {
    console.error('Error fetching blog post:', error)
    
    return NextResponse.json({
      error: 'Failed to fetch blog post'
    }, { status: 500 })
  }
}