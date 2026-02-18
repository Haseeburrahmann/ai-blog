import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import BlogCard from '@/components/blog/BlogCard';
import Pagination from '@/components/ui/Pagination';
import Badge from '@/components/ui/Badge';
import { BLOG_CATEGORIES, POSTS_PER_PAGE, SITE_URL } from '@/lib/constants';
import { serializeDoc } from '@/lib/utils';
import type { BlogPostData } from '@/types';

export const revalidate = 3600;

interface Props {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = BLOG_CATEGORIES.find((c) => c.slug === category);
  const name = cat?.name || category;

  return {
    title: `${name} Articles`,
    description: `Read our latest articles about ${name}. Expert insights, tutorials, and reviews.`,
    alternates: { canonical: `${SITE_URL}/blog/category/${category}` },
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params;
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam || '1'));
  const cat = BLOG_CATEGORIES.find((c) => c.slug === category);

  let serializedPosts: BlogPostData[] = [];
  let total = 0;
  let totalPages = 0;

  try {
    await connectDB();

    const filter = { published: true, category };
    const [posts, count] = await Promise.all([
      BlogPost.find(filter)
        .sort({ publishedAt: -1 })
        .skip((page - 1) * POSTS_PER_PAGE)
        .limit(POSTS_PER_PAGE)
        .select('title slug excerpt category featuredImage publishedAt readingTime tags')
        .lean(),
      BlogPost.countDocuments(filter),
    ]);

    total = count;
    totalPages = Math.ceil(total / POSTS_PER_PAGE);
    serializedPosts = serializeDoc<BlogPostData[]>(posts);
  } catch {
    // DB unavailable
  }

  return (
    <>
      <section className="bg-gradient-to-b from-indigo-50 to-white dark:from-gray-950 dark:to-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-6">
            <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
            <ChevronRight size={14} />
            <Link href="/blog" className="hover:text-indigo-600 dark:hover:text-indigo-400">Blog</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 dark:text-white">{cat?.name || category}</span>
          </nav>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {cat?.name || category}
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
            {total} article{total !== 1 ? 's' : ''} in this category
          </p>

          {/* Category Filters */}
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge label="All" href="/blog" color="gray" size="md" />
            {BLOG_CATEGORIES.map((c) => (
              <Badge
                key={c.slug}
                label={c.name}
                href={`/blog/category/${c.slug}`}
                color={c.slug === category ? c.color : 'gray'}
                size="md"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-wide">
          {serializedPosts.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {serializedPosts.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>
              <div className="mt-12">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  basePath={`/blog/category/${category}`}
                />
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500 dark:text-gray-400 mb-4">
                No articles in this category yet.
              </p>
              <Link href="/blog" className="btn-primary">
                Browse All Articles
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
