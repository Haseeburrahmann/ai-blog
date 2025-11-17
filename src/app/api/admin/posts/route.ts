import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import NewsArticle from '@/models/NewsArticle'

export async function POST(request: Request) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { title, content, excerpt, category, tags, published, readTime } = body

    // Create slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')

    // Create new news article (backward compatibility endpoint)
    const newsArticle = new NewsArticle({
      title,
      slug,
      content,
      description: excerpt, // Map excerpt to description
      category,
      tags,
      published,
      readTime: readTime || 5,
      publishedAt: published ? new Date() : null
    })

    await newsArticle.save()

    return NextResponse.json({
      success: true,
      message: published ? 'Article published successfully!' : 'Article saved as draft!',
      post: {
        id: newsArticle._id,
        title: newsArticle.title,
        slug: newsArticle.slug,
        published: newsArticle.published
      }
    })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error creating blog post:', error)
    
    // Handle duplicate slug error
    if (error.code === 11000) {
      return NextResponse.json({
        error: 'A post with this title already exists. Please choose a different title.'
      }, { status: 400 })
    }
    
    return NextResponse.json({
      error: 'Failed to create blog post'
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    await connectDB()

    const articles = await NewsArticle.find()
      .sort({ createdAt: -1 })
      .select('title slug description category tags published publishedAt createdAt readTime')
      .limit(50)

    return NextResponse.json({
      success: true,
      posts: articles // Keep 'posts' for backward compatibility
    })
  } catch (error: unknown) {
    console.error('Error fetching articles:', error)

    return NextResponse.json({
      error: 'Failed to fetch articles'
    }, { status: 500 })
  }
}