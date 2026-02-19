import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, User, ChevronRight } from 'lucide-react';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import { serializeDoc, formatDate, extractHeadings } from '@/lib/utils';
import { generateArticleJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { SITE_URL, SITE_NAME, BLOG_CATEGORIES } from '@/lib/constants';
import BlogContent from '@/components/blog/BlogContent';
import RelatedPosts from '@/components/blog/RelatedPosts';
import ReadingProgress from '@/components/blog/ReadingProgress';
import ViewCounter from '@/components/blog/ViewCounter';
import TableOfContents from '@/components/ui/TableOfContents';
import ShareButtons from '@/components/ui/ShareButtons';
import InlineAffiliateCTA from '@/components/affiliate/InlineAffiliateCTA';
import NewsletterForm from '@/components/ui/NewsletterForm';
import Badge from '@/components/ui/Badge';
import AdSenseUnit from '@/components/ads/AdSenseUnit';
import RecommendedTools from '@/components/affiliate/RecommendedTools';
import type { BlogPostData } from '@/types';

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const post = await BlogPost.findOne({ slug, published: true })
    .select('title excerpt metaTitle metaDescription slug featuredImage')
    .lean();

  if (!post) return { title: 'Post Not Found' };

  const p = serializeDoc(post) as BlogPostData;
  return {
    title: p.metaTitle || p.title,
    description: p.metaDescription || p.excerpt,
    openGraph: {
      title: p.metaTitle || p.title,
      description: p.metaDescription || p.excerpt,
      type: 'article',
      url: `${SITE_URL}/blog/${p.slug}`,
      images: p.featuredImage ? [{ url: p.featuredImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: p.metaTitle || p.title,
      description: p.metaDescription || p.excerpt,
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${p.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  await connectDB();

  const post = await BlogPost.findOne({ slug, published: true }).lean();
  if (!post) notFound();

  const p = serializeDoc(post) as BlogPostData;
  const headings = extractHeadings(p.content);
  const cat = BLOG_CATEGORIES.find((c) => c.slug === p.category);

  // Fetch related posts
  const relatedPosts = await BlogPost.find({
    published: true,
    slug: { $ne: p.slug },
    $or: [
      { category: p.category },
      ...(p.relatedSlugs?.length ? [{ slug: { $in: p.relatedSlugs } }] : []),
    ],
  })
    .sort({ publishedAt: -1 })
    .limit(3)
    .select('title slug excerpt category featuredImage publishedAt readingTime')
    .lean();

  const relatedSerialized = serializeDoc(relatedPosts) as BlogPostData[];

  const articleJsonLd = generateArticleJsonLd({
    title: p.title,
    excerpt: p.excerpt,
    slug: p.slug,
    publishedAt: p.publishedAt,
    updatedAt: p.updatedAt,
    author: p.author,
    featuredImage: p.featuredImage,
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
    { name: cat?.name || p.category, url: `${SITE_URL}/blog/category/${p.category}` },
    { name: p.title, url: `${SITE_URL}/blog/${p.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ReadingProgress />
      <ViewCounter slug={p.slug} />

      <article>
        {/* Header */}
        <header className="bg-gradient-to-b from-indigo-50 to-white dark:from-gray-950 dark:to-gray-950 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-6">
              <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
              <ChevronRight size={14} />
              <Link href="/blog" className="hover:text-indigo-600 dark:hover:text-indigo-400">Blog</Link>
              <ChevronRight size={14} />
              <Link href={`/blog/category/${p.category}`} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                {cat?.name || p.category}
              </Link>
            </nav>

            <Badge
              label={cat?.name || p.category}
              href={`/blog/category/${p.category}`}
              color={cat?.color || 'gray'}
              size="md"
            />

            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              {p.title}
            </h1>

            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              {p.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <User size={16} /> {p.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={16} /> {formatDate(p.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={16} /> {p.readingTime} min read
              </span>
            </div>

            {/* Tags */}
            {p.tags?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <Badge key={tag} label={tag} color="gray" size="sm" />
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Affiliate Disclosure */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <p className="text-xs text-gray-400 dark:text-gray-600 italic">
            This article may contain affiliate links. We may earn a commission at no extra cost to you.
          </p>
        </div>

        {/* Content + Sidebar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-12">
            {/* Main Content */}
            <div className="flex-1 min-w-0 max-w-4xl">
              {/* Top Ad */}
              <div className="mb-8 text-center">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">Advertisement</span>
                <AdSenseUnit format="auto" className="mt-1" />
              </div>

              <BlogContent content={p.content} />

              {/* Inline Affiliate CTA */}
              {(() => {
                const ctaMap: Record<string, string> = {
                  'ai-writing': 'copy-ai',
                  'tool-reviews': 'copy-ai',
                  'ai-marketing': 'jasper',
                  'tutorials': 'notion-ai',
                  'ai-productivity': 'notion-ai',
                  'ai-finance': 'notion-ai',
                  'ai-legal': 'writesonic',
                  'ai-development': 'notion-ai',
                };
                const affiliateSlug = ctaMap[p.category];
                return affiliateSlug ? <InlineAffiliateCTA slug={affiliateSlug} /> : null;
              })()}

              {/* Bottom Ad */}
              <div className="mt-8 text-center">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">Advertisement</span>
                <AdSenseUnit format="auto" className="mt-1" />
              </div>

              {/* Share */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                <ShareButtons title={p.title} slug={p.slug} />
              </div>

              {/* Newsletter CTA */}
              <div className="mt-8 p-6 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Enjoyed this article?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Get more AI insights delivered to your inbox weekly.
                </p>
                <NewsletterForm source="blog-post" compact />
              </div>

              {/* Related Posts */}
              <RelatedPosts posts={relatedSerialized} />
            </div>

            {/* Sidebar - desktop only */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-24 space-y-8">
                {headings.length > 0 && <TableOfContents items={headings} />}

                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider">Advertisement</span>
                  <AdSenseUnit format="rectangle" className="mt-1" />
                </div>

                <RecommendedTools limit={3} category={p.category} />
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
