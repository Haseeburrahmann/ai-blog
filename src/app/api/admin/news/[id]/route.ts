import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import NewsArticle from '@/models/NewsArticle'

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    await connectDB()
    const { id } = await params
    const body = await request.json()

    const article = await NewsArticle.findById(id)

    if (!article) {
      return NextResponse.json(
        { error: 'News article not found' },
        { status: 404 }
      )
    }

    // Update fields
    if (body.title) article.title = body.title
    if (body.content) article.content = body.content
    if (body.description) article.description = body.description
    if (body.imageUrl !== undefined) article.imageUrl = body.imageUrl
    if (body.source) article.source = body.source
    if (body.sourceUrl !== undefined) article.sourceUrl = body.sourceUrl
    if (body.author) article.author = body.author
    if (body.category) article.category = body.category
    if (body.tags) article.tags = body.tags
    if (body.readTime) article.readTime = body.readTime
    if (body.featured !== undefined) article.featured = body.featured

    // Handle publishing status
    if (body.published !== undefined && body.published !== article.published) {
      article.published = body.published
      if (body.published && !article.publishedAt) {
        article.publishedAt = new Date()
      }
    }

    // Update slug if title changed
    if (body.title) {
      article.slug = body.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
    }

    await article.save()

    return NextResponse.json({
      success: true,
      message: 'News article updated successfully!',
      article: {
        id: article._id,
        title: article.title,
        slug: article.slug,
        published: article.published
      }
    })
  } catch (error: any) {
    console.error('Error updating news article:', error)

    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'An article with this title already exists. Please choose a different title.' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update news article' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    await connectDB()
    const { id } = await params

    const article = await NewsArticle.findByIdAndDelete(id)

    if (!article) {
      return NextResponse.json(
        { error: 'News article not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'News article deleted successfully!'
    })
  } catch (error: any) {
    console.error('Error deleting news article:', error)

    return NextResponse.json(
      { error: 'Failed to delete news article' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    await connectDB()
    const { id } = await params

    const article = await NewsArticle.findById(id)

    if (!article) {
      return NextResponse.json(
        { error: 'News article not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      article
    })
  } catch (error: any) {
    console.error('Error fetching news article:', error)

    return NextResponse.json(
      { error: 'Failed to fetch news article' },
      { status: 500 }
    )
  }
}
