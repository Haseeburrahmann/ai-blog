import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import BlogPost from '@/models/BlogPost'

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

    // Create new blog post
    const blogPost = new BlogPost({
      title,
      slug,
      content,
      excerpt,
      category,
      tags,
      published,
      readTime: readTime || 5,
      publishedAt: published ? new Date() : null
    })

    await blogPost.save()

    return NextResponse.json({
      success: true,
      message: published ? 'Blog post published successfully!' : 'Blog post saved as draft!',
      post: {
        id: blogPost._id,
        title: blogPost.title,
        slug: blogPost.slug,
        published: blogPost.published
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
    
    const posts = await BlogPost.find()
      .sort({ createdAt: -1 })
      .select('title slug excerpt category tags published publishedAt createdAt readTime')
      .limit(50)

    return NextResponse.json({
      success: true,
      posts
    })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error fetching blog posts:', error)
    
    return NextResponse.json({
      error: 'Failed to fetch blog posts'
    }, { status: 500 })
  }
}