import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import NewsArticle from '@/models/NewsArticle'

export async function POST(request: Request) {
  try {
    await connectDB()

    const body = await request.json()
    const {
      title,
      content,
      description,
      imageUrl,
      source,
      sourceUrl,
      author,
      category,
      tags,
      published,
      readTime,
      featured
    } = body

    // Create slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')

    // Create new news article
    const newsArticle = new NewsArticle({
      title,
      slug,
      content,
      description,
      imageUrl,
      source: source || 'World News Network',
      sourceUrl,
      author: author || 'Editorial Team',
      category,
      tags: tags || [],
      published,
      readTime: readTime || 5,
      featured: featured || false,
      publishedAt: published ? new Date() : null
    })

    await newsArticle.save()

    return NextResponse.json({
      success: true,
      message: published ? 'News article published successfully!' : 'News article saved as draft!',
      article: {
        id: newsArticle._id,
        title: newsArticle.title,
        slug: newsArticle.slug,
        published: newsArticle.published
      }
    })
  } catch (error: any) {
    console.error('Error creating news article:', error)

    if (error.code === 11000) {
      return NextResponse.json({
        error: 'An article with this title already exists. Please choose a different title.'
      }, { status: 400 })
    }

    return NextResponse.json({
      error: 'Failed to create news article'
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    await connectDB()

    const articles = await NewsArticle.find()
      .sort({ createdAt: -1 })
      .select('title slug description category source tags published publishedAt createdAt readTime featured views')
      .limit(100)

    return NextResponse.json({
      success: true,
      articles
    })
  } catch (error: any) {
    console.error('Error fetching news articles:', error)

    return NextResponse.json({
      error: 'Failed to fetch news articles'
    }, { status: 500 })
  }
}
