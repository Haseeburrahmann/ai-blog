import Link from 'next/link';
import {
  Clock, TrendingUp, Scale, Megaphone, PenTool,
  Code, Zap, BookOpen, Star, FileText,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import { BLOG_CATEGORIES } from '@/lib/constants';
import type { BlogPostData } from '@/types';

const CATEGORY_STYLES: Record<string, { gradient: string; darkGradient: string; iconColor: string }> = {
  'ai-finance':      { gradient: 'from-emerald-100 to-teal-100',   darkGradient: 'dark:from-emerald-900/30 dark:to-teal-900/20',   iconColor: 'text-emerald-500 dark:text-emerald-400' },
  'ai-legal':        { gradient: 'from-blue-100 to-sky-100',       darkGradient: 'dark:from-blue-900/30 dark:to-sky-900/20',       iconColor: 'text-blue-500 dark:text-blue-400' },
  'ai-marketing':    { gradient: 'from-purple-100 to-fuchsia-100', darkGradient: 'dark:from-purple-900/30 dark:to-fuchsia-900/20', iconColor: 'text-purple-500 dark:text-purple-400' },
  'ai-writing':      { gradient: 'from-indigo-100 to-violet-100',  darkGradient: 'dark:from-indigo-900/30 dark:to-violet-900/20',  iconColor: 'text-indigo-500 dark:text-indigo-400' },
  'ai-development':  { gradient: 'from-orange-100 to-amber-100',   darkGradient: 'dark:from-orange-900/30 dark:to-amber-900/20',   iconColor: 'text-orange-500 dark:text-orange-400' },
  'ai-productivity': { gradient: 'from-teal-100 to-cyan-100',      darkGradient: 'dark:from-teal-900/30 dark:to-cyan-900/20',      iconColor: 'text-teal-500 dark:text-teal-400' },
  'tutorials':       { gradient: 'from-cyan-100 to-blue-100',      darkGradient: 'dark:from-cyan-900/30 dark:to-blue-900/20',      iconColor: 'text-cyan-500 dark:text-cyan-400' },
  'tool-reviews':    { gradient: 'from-pink-100 to-rose-100',      darkGradient: 'dark:from-pink-900/30 dark:to-rose-900/20',      iconColor: 'text-pink-500 dark:text-pink-400' },
};

const CATEGORY_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'ai-finance': TrendingUp,
  'ai-legal': Scale,
  'ai-marketing': Megaphone,
  'ai-writing': PenTool,
  'ai-development': Code,
  'ai-productivity': Zap,
  'tutorials': BookOpen,
  'tool-reviews': Star,
};

interface BlogCardProps {
  post: BlogPostData;
}

export default function BlogCard({ post }: BlogCardProps) {
  const cat = BLOG_CATEGORIES.find((c) => c.slug === post.category);
  const style = CATEGORY_STYLES[post.category] || { gradient: 'from-indigo-100 to-purple-100', darkGradient: 'dark:from-indigo-900/30 dark:to-purple-900/20', iconColor: 'text-indigo-500 dark:text-indigo-400' };
  const IconComponent = CATEGORY_ICONS[post.category] || FileText;

  return (
    <Link href={`/blog/${post.slug}`} className="card card-hover group flex flex-col">
      <div className={`h-48 bg-gradient-to-br ${style.gradient} ${style.darkGradient} relative flex items-center justify-center overflow-hidden`}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        <IconComponent size={64} className={`${style.iconColor} opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-300`} />
      </div>
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
