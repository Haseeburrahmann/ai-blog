import Link from 'next/link';
import { Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import { BLOG_CATEGORIES } from '@/lib/constants';
import type { BlogPostData } from '@/types';

interface BlogCardProps {
  post: BlogPostData;
}

export default function BlogCard({ post }: BlogCardProps) {
  const cat = BLOG_CATEGORIES.find((c) => c.slug === post.category);

  return (
    <Link href={`/blog/${post.slug}`} className="card card-hover group flex flex-col">
      <div className="h-48 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20" />
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <Badge
            label={cat?.name || post.category}
            color={cat?.color || 'gray'}
            size="sm"
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-3 flex-1">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
          <span>{formatDate(post.publishedAt)}</span>
          <span>&middot;</span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {post.readingTime} min read
          </span>
        </div>
      </div>
    </Link>
  );
}
