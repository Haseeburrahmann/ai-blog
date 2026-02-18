import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/tools`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${SITE_URL}/newsletter`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  try {
    const connectDB = (await import('@/lib/mongodb')).default;
    const BlogPost = (await import('@/models/BlogPost')).default;
    const Tool = (await import('@/models/Tool')).default;

    await connectDB();

    const [posts, tools] = await Promise.all([
      BlogPost.find({ published: true }).select('slug updatedAt').lean(),
      Tool.find({ published: true }).select('slug updatedAt').lean(),
    ]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const blogUrls = posts.map((post: any) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const toolUrls = tools.map((tool: any) => ({
      url: `${SITE_URL}/tools/${tool.slug}`,
      lastModified: tool.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    return [...staticRoutes, ...blogUrls, ...toolUrls];
  } catch {
    // DB not available during build; return static routes only
    return staticRoutes;
  }
}
