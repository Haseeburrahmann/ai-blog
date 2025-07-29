import { MetadataRoute } from 'next'
import connectDB from '@/lib/mongodb'
import BlogPost from '@/models/BlogPost'
import AITool from '@/models/AITool'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://aiinsights.com' // Replace with your actual domain

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  try {
    await connectDB()

    // Get published blog posts
    const blogPosts = await BlogPost.find({ published: true })
      .select('slug updatedAt')
      .lean()

    const blogPages = blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    // Get active AI tools
    const aiTools = await AITool.find({ isActive: true })
      .select('slug lastUpdated')
      .lean()

    const toolPages = aiTools.map((tool) => ({
      url: `${baseUrl}/tools/${tool.slug}`,
      lastModified: new Date(tool.lastUpdated),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    return [...staticPages, ...blogPages, ...toolPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return static pages only if database connection fails
    return staticPages
  }
}