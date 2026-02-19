import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import BlogCard from '@/components/blog/BlogCard';
import BlogSearch from '@/components/blog/BlogSearch';
import Pagination from '@/components/ui/Pagination';
import Badge from '@/components/ui/Badge';
import AdBanner from '@/components/ads/AdBanner';
import { BLOG_CATEGORIES, POSTS_PER_PAGE } from '@/lib/constants';
import { serializeDoc } from '@/lib/utils';
import type { BlogPostData } from '@/types';

export const metadata: Metadata = {
  title: 'Blog - AI Insights, Reviews & Tutorials',
  description: 'Expert articles on AI tools, productivity, writing, development, and more. In-depth reviews, comparisons, and practical tutorials.',
};

export const revalidate = 3600;

interface Props {
  searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const { page: pageParam, search } = await searchParams;
  const page = Math.max(1, parseInt(pageParam || '1'));

  let serializedPosts: BlogPostData[] = [];
  let totalPages = 0;
  const searchQuery = search?.trim() || '';

  try {
    await connectDB();

    // Build query filter
    const filter: Record<string, unknown> = { published: true };
    if (searchQuery) {
      filter.$text = { $search: searchQuery };
    }

    const [posts, total] = await Promise.all([
      BlogPost.find(filter)
        .sort(searchQuery ? { score: { $meta: 'textScore' } } : { publishedAt: -1 })
        .skip((page - 1) * POSTS_PER_PAGE)
        .limit(POSTS_PER_PAGE)
        .select('title slug excerpt category featuredImage publishedAt readingTime tags')
        .lean(),
      BlogPost.countDocuments(filter),
    ]);

    totalPages = Math.ceil(total / POSTS_PER_PAGE);
    serializedPosts = serializeDoc<BlogPostData[]>(posts);
  } catch {
    // DB unavailable
  }

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-b from-indigo-50 to-white dark:from-gray-950 dark:to-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Blog
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
            Expert insights on AI tools, productivity, and technology
          </p>

          {/* Search */}
          <div className="mt-6">
            <Suspense fallback={null}>
              <BlogSearch />
            </Suspense>
          </div>

          {/* Category Filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge label="All" href="/blog" color="indigo" size="md" />
            {BLOG_CATEGORIES.map((cat) => (
              <Badge
                key={cat.slug}
                label={cat.name}
                href={`/blog/category/${cat.slug}`}
                color={cat.color}
                size="md"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-wide">
          {/* Search results indicator */}
          {searchQuery && (
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {serializedPosts.length > 0
                  ? `Showing results for "${searchQuery}"`
                  : `No results found for "${searchQuery}"`}
              </p>
              <Link
                href="/blog"
                className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Clear search
              </Link>
            </div>
          )}

          {serializedPosts.length > 0 ? (
            <>
              {/* First row of posts */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {serializedPosts.slice(0, 3).map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>

              {/* Full-width ad between rows */}
              {serializedPosts.length > 3 && (
                <AdBanner className="my-8" />
              )}

              {/* Remaining posts */}
              {serializedPosts.length > 3 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {serializedPosts.slice(3).map((post) => (
                    <BlogCard key={post._id} post={post} />
                  ))}
                </div>
              )}
              <div className="mt-12">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  basePath="/blog"
                  extraParams={searchQuery ? { search: searchQuery } : undefined}
                />
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500 dark:text-gray-400 mb-4">
                No articles yet. Check back soon!
              </p>
              <Link href="/" className="btn-primary">
                Go Home
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
