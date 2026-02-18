import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import type { BlogPostData } from '@/types';

interface RelatedPostsProps {
  posts: BlogPostData[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-12 pt-12 border-t border-gray-200 dark:border-gray-800">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Related Articles
      </h2>
      <div className="grid sm:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post._id} href={`/blog/${post.slug}`} className="card card-hover group">
            <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700" />
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 text-sm">
                {post.title}
              </h3>
              <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                <span>{formatDate(post.publishedAt)}</span>
                <ArrowRight size={14} className="text-indigo-500" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
