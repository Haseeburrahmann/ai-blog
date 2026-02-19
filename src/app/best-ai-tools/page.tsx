import type { Metadata } from 'next';
import Link from 'next/link';
import { Star, ArrowRight, ExternalLink } from 'lucide-react';
import ComparisonTable from '@/components/affiliate/ComparisonTable';
import NewsletterForm from '@/components/ui/NewsletterForm';
import AdBanner from '@/components/ads/AdBanner';
import { AFFILIATE_PARTNERS, getAffiliatesByCategory } from '@/lib/affiliates';

export const metadata: Metadata = {
  title: 'Best AI Tools 2026 - Compare Top AI Writing, Marketing & Video Tools',
  description:
    'Compare the best AI tools side by side. In-depth comparison of Copy.ai, Jasper, Notion AI, Writesonic, Pictory, and Synthesia with features, pricing, and recommendations.',
  alternates: { canonical: 'https://mindfulblogai.com/best-ai-tools' },
};

const writingFeatures = [
  { name: 'Blog Post Generation', values: { 'copy-ai': true, 'jasper': true, 'writesonic': true } },
  { name: 'Ad & Social Copy', values: { 'copy-ai': true, 'jasper': true, 'writesonic': true } },
  { name: 'Email Sequences', values: { 'copy-ai': true, 'jasper': true, 'writesonic': false } },
  { name: 'Free Plan Available', values: { 'copy-ai': true, 'jasper': false, 'writesonic': 'Limited' } },
  { name: 'Team Collaboration', values: { 'copy-ai': true, 'jasper': true, 'writesonic': false } },
  { name: 'API Access', values: { 'copy-ai': true, 'jasper': true, 'writesonic': true } },
  { name: 'Brand Voice Training', values: { 'copy-ai': true, 'jasper': true, 'writesonic': false } },
  { name: 'SEO Optimization', values: { 'copy-ai': false, 'jasper': true, 'writesonic': true } },
  { name: 'Starting Price', values: { 'copy-ai': '$49/mo', 'jasper': '$49/mo', 'writesonic': '$19/mo' } },
];

const videoFeatures = [
  { name: 'Text-to-Video', values: { 'pictory': true, 'synthesia': true } },
  { name: 'AI Avatars', values: { 'pictory': false, 'synthesia': true } },
  { name: 'Auto Captions', values: { 'pictory': true, 'synthesia': true } },
  { name: 'Stock Media Library', values: { 'pictory': true, 'synthesia': true } },
  { name: 'Blog-to-Video', values: { 'pictory': true, 'synthesia': false } },
  { name: 'Custom Branding', values: { 'pictory': true, 'synthesia': true } },
  { name: 'Free Trial', values: { 'pictory': true, 'synthesia': true } },
  { name: 'Starting Price', values: { 'pictory': '$19/mo', 'synthesia': '$22/mo' } },
];

export default function BestAiToolsPage() {
  const writingTools = getAffiliatesByCategory('Writing');
  const videoTools = getAffiliatesByCategory('Video');
  const notionAi = AFFILIATE_PARTNERS.find((p) => p.slug === 'notion-ai')!;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-indigo-50 to-white dark:from-gray-950 dark:to-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center gap-2 mb-4">
            <Star size={20} className="text-amber-500" />
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Expert Picks
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
            Best AI Tools in 2026
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            We&apos;ve tested and compared the top AI tools for writing, marketing, video creation,
            and productivity. Here are our honest recommendations.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Writing Tools */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Best AI Writing Tools
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              AI writing assistants that can generate blog posts, ad copy, emails, and social media content.
              These tools save hours of writing time while maintaining quality.
            </p>
          </div>
          <ComparisonTable
            partners={writingTools}
            features={writingFeatures}
            title="Writing Tools Comparison"
          />
        </section>

        <AdBanner />

        {/* Video Tools */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Best AI Video Tools
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Create professional videos from text, scripts, or blog posts using AI.
              No video editing experience required.
            </p>
          </div>
          <ComparisonTable
            partners={videoTools}
            features={videoFeatures}
            title="Video Tools Comparison"
          />
        </section>

        {/* Productivity Highlight — Notion AI */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Best AI Productivity Tool
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              For an all-in-one AI-powered workspace, Notion AI stands out with the highest
              recurring commission and an incredibly versatile platform.
            </p>
          </div>
          <div className="card p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-2xl shrink-0">
                N
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {notionAi.name}
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                  {notionAi.description}. Notion AI integrates directly into your notes, docs, wikis,
                  and project management — giving you AI assistance right where you work. Generate
                  summaries, translate content, brainstorm ideas, and automate repetitive tasks.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                    <Star size={14} /> {notionAi.commission} commission
                  </span>
                  <a
                    href={notionAi.affiliateUrl}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                  >
                    Try Notion AI Free <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How We Review */}
        <section className="card p-6 sm:p-8 bg-gray-50 dark:bg-gray-900/50">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            How We Choose & Review AI Tools
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Hands-On Testing</h3>
              <p>Every tool is tested by our team with real-world use cases before recommending it.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Output Quality</h3>
              <p>We evaluate the quality, accuracy, and usefulness of AI-generated content.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Value for Money</h3>
              <p>We compare pricing, free tiers, and the overall value each tool provides.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Transparency</h3>
              <p>We disclose affiliate relationships and never let commissions bias our ratings.</p>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Related Articles
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/blog/best-ai-writing-tools-compared"
              className="card p-5 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors group"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-2">
                Best AI Writing Tools Compared <ArrowRight size={16} />
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                In-depth comparison of Copy.ai, Jasper, and Notion AI
              </p>
            </Link>
            <Link
              href="/blog/top-10-free-ai-tools-professionals"
              className="card p-5 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors group"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-2">
                Top 10 Free AI Tools <ArrowRight size={16} />
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                The best free AI tools every professional should know
              </p>
            </Link>
          </div>
        </section>

        {/* Newsletter */}
        <section className="card p-8 text-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-200 dark:border-indigo-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Get AI Tool Reviews in Your Inbox
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
            Weekly roundup of the latest AI tools, tips, and exclusive deals.
          </p>
          <div className="max-w-md mx-auto">
            <NewsletterForm source="best-ai-tools" />
          </div>
        </section>
      </div>
    </>
  );
}
