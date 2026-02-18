import Link from 'next/link';
import {
  ArrowRight, BookOpen, Wrench, Sparkles, Users, Newspaper,
  TrendingUp, Zap, Shield,
} from 'lucide-react';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import Tool from '@/models/Tool';
import { serializeDoc, formatDate } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import NewsletterForm from '@/components/ui/NewsletterForm';
import AdBanner from '@/components/ads/AdBanner';
import { BLOG_CATEGORIES } from '@/lib/constants';
import type { BlogPostData, ToolData } from '@/types';

export const revalidate = 3600;

async function getData() {
  try {
    await connectDB();

    const [featuredPosts, latestPosts, featuredTools] = await Promise.all([
      BlogPost.find({ published: true, featured: true })
        .sort({ publishedAt: -1 })
        .limit(3)
        .select('title slug excerpt category featuredImage publishedAt readingTime')
        .lean(),
      BlogPost.find({ published: true })
        .sort({ publishedAt: -1 })
        .limit(6)
        .select('title slug excerpt category featuredImage publishedAt readingTime tags')
        .lean(),
      Tool.find({ published: true, featured: true })
        .limit(6)
        .select('name slug shortDescription category icon')
        .lean(),
    ]);

    return {
      featuredPosts: serializeDoc<BlogPostData[]>(featuredPosts),
      latestPosts: serializeDoc<BlogPostData[]>(latestPosts),
      featuredTools: serializeDoc<ToolData[]>(featuredTools),
    };
  } catch {
    return { featuredPosts: [], latestPosts: [], featuredTools: [] };
  }
}

export default async function HomePage() {
  const { featuredPosts, latestPosts, featuredTools } = await getData();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-950 dark:to-indigo-950/30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM2MzY2ZjEiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6">
              <Sparkles size={16} />
              AI Insights & Free Tools
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight">
              Your AI Knowledge Hub{' '}
              <span className="gradient-text">& Toolkit</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              In-depth articles, expert reviews, and free browser-based tools to help you
              navigate the AI landscape and boost your productivity.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/blog" className="btn-primary text-lg px-8 py-4">
                <BookOpen size={20} className="mr-2" />
                Read the Blog
              </Link>
              <Link href="/tools" className="btn-secondary text-lg px-8 py-4">
                <Wrench size={20} className="mr-2" />
                Try Free Tools
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Newspaper, label: 'Expert Articles', value: 'In-Depth' },
              { icon: Wrench, label: 'Free AI Tools', value: '10+' },
              { icon: Zap, label: 'Weekly Insights', value: 'Fresh' },
              { icon: Shield, label: 'Honest Reviews', value: 'Unbiased' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 mb-3">
                  <Icon size={24} />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      {featuredPosts.length > 0 && (
        <section className="section-padding bg-white dark:bg-gray-950">
          <div className="container-wide">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Featured Articles
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Our most impactful insights on AI
                </p>
              </div>
              <Link href="/blog" className="hidden sm:flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-medium hover:gap-2 transition-all">
                View all <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <Link key={post._id} href={`/blog/${post.slug}`} className="card card-hover group">
                  <div className="h-48 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20" />
                  <div className="p-6">
                    <CategoryBadge category={post.category} />
                    <h3 className="mt-3 text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span>&middot;</span>
                      <span>{post.readingTime} min read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <Link href="/blog" className="sm:hidden flex items-center justify-center gap-1 mt-6 text-indigo-600 dark:text-indigo-400 font-medium">
              View all articles <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      )}

      {/* Ad Banner */}
      <AdBanner className="py-6 bg-gray-50 dark:bg-gray-900" />

      {/* Free Tools */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-wide">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Free AI Tools
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Powerful browser-based tools, no signup required
              </p>
            </div>
            <Link href="/tools" className="hidden sm:flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-medium hover:gap-2 transition-all">
              All tools <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.length > 0
              ? featuredTools.map((tool) => (
                  <Link key={tool._id} href={`/tools/${tool.slug}`} className="card card-hover p-6 group">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                      <Wrench size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {tool.shortDescription}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-4 text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                      Try it free <ArrowRight size={14} />
                    </span>
                  </Link>
                ))
              : /* Placeholder tools when DB is empty */
                [
                  { name: 'Word Counter', desc: 'Count words, characters, sentences and estimate reading time', slug: 'word-counter' },
                  { name: 'JSON Formatter', desc: 'Format, validate and beautify your JSON data instantly', slug: 'json-formatter' },
                  { name: 'Password Generator', desc: 'Generate strong, secure passwords with custom options', slug: 'password-generator' },
                ].map((tool) => (
                  <Link key={tool.slug} href={`/tools/${tool.slug}`} className="card card-hover p-6 group">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                      <Wrench size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{tool.desc}</p>
                    <span className="inline-flex items-center gap-1 mt-4 text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                      Try it free <ArrowRight size={14} />
                    </span>
                  </Link>
                ))
            }
          </div>
          <Link href="/tools" className="sm:hidden flex items-center justify-center gap-1 mt-6 text-indigo-600 dark:text-indigo-400 font-medium">
            View all tools <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-60" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Stay Ahead with AI Insights
          </h2>
          <p className="text-lg text-indigo-100 mb-8">
            Get weekly AI news, tool reviews, and productivity tips delivered to your inbox. Join our growing community.
          </p>
          <div className="max-w-md mx-auto">
            <NewsletterForm source="homepage-cta" />
          </div>
          <p className="mt-4 text-sm text-indigo-200">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </section>

      {/* Latest Posts */}
      {latestPosts.length > 0 && (
        <section className="section-padding bg-white dark:bg-gray-950">
          <div className="container-wide">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Latest Articles
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Fresh perspectives on AI and technology
                </p>
              </div>
              <Link href="/blog" className="hidden sm:flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-medium hover:gap-2 transition-all">
                View all <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <Link key={post._id} href={`/blog/${post.slug}`} className="card card-hover group">
                  <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700" />
                  <div className="p-5">
                    <CategoryBadge category={post.category} />
                    <h3 className="mt-2 font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span>&middot;</span>
                      <span>{post.readingTime} min read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Browse Categories */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-wide">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Explore by Topic
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Find articles that match your interests
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BLOG_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog/category/${cat.slug}`}
                className="card card-hover p-5 text-center group"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-3">
                  <TrendingUp size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {cat.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function CategoryBadge({ category }: { category: string }) {
  const cat = BLOG_CATEGORIES.find((c) => c.slug === category);
  return (
    <Badge
      label={cat?.name || category}
      color={cat?.color || 'gray'}
      size="sm"
    />
  );
}
