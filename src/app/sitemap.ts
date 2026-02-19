import { MetadataRoute } from 'next';
import { SITE_URL, BLOG_CATEGORIES } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/tools`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${SITE_URL}/newsletter`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/best-ai-tools`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/disclaimer`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    // Blog category pages
    ...BLOG_CATEGORIES.map((cat) => ({
      url: `${SITE_URL}/blog/category/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
    // Tool pages (static fallback, overridden by DB below)
    ...['word-counter', 'json-formatter', 'password-generator', 'token-counter', 'prompt-optimizer', 'ai-cost-calculator', 'meta-tag-generator', 'readability-checker', 'markdown-to-html', 'regex-tester'].map((slug) => ({
      url: `${SITE_URL}/tools/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
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

    // DB tool URLs override static fallbacks
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dbToolSlugs = new Set(tools.map((t: any) => t.slug));
    const toolUrls = tools.map((tool: any) => ({
      url: `${SITE_URL}/tools/${tool.slug}`,
      lastModified: tool.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    // Filter out static tool URLs that are now in DB
    const filteredStatic = staticRoutes.filter((r) => {
      const match = r.url.match(/\/tools\/(.+)$/);
      return !match || !dbToolSlugs.has(match[1]);
    });

    return [...filteredStatic, ...blogUrls, ...toolUrls];
  } catch {
    // DB not available during build; return static routes only
    return staticRoutes;
  }
}
