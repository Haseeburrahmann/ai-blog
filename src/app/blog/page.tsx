import type { Metadata } from 'next';
import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import BlogCard from '@/components/blog/BlogCard';
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
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam || '1'));

  let serializedPosts: BlogPostData[] = [];
  let totalPages = 0;

  try {
    await connectDB();

    const [posts, total] = await Promise.all([
      BlogPost.find({ published: true })
        .sort({ publishedAt: -1 })
        .skip((page - 1) * POSTS_PER_PAGE)
        .limit(POSTS_PER_PAGE)
        .select('title slug excerpt category featuredImage publishedAt readingTime tags')
        .lean(),
      BlogPost.countDocuments({ published: true }),
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

          {/* Category Filters */}
          <div className="mt-6 flex flex-wrap gap-2">
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
          {serializedPosts.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {serializedPosts.map((post, i) => (
                  <div key={post._id}>
                    <BlogCard post={post} />
                    {/* Ad after 3rd post */}
                    {i === 2 && serializedPosts.length > 4 && (
                      <AdBanner className="mt-8 sm:col-span-2 lg:col-span-3" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-12">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  basePath="/blog"
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
