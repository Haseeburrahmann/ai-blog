import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import connectDB from '@/lib/mongodb';
import Tool from '@/models/Tool';
import { serializeDoc } from '@/lib/utils';
import { generateToolJsonLd, generateBreadcrumbJsonLd, generateFaqJsonLd } from '@/lib/seo';
import { SITE_URL } from '@/lib/constants';
import ToolRunner from '@/components/tools/ToolRunner';
import AdSenseUnit from '@/components/ads/AdSenseUnit';
import NewsletterForm from '@/components/ui/NewsletterForm';
import type { ToolData } from '@/types';

export const revalidate = 86400;

// Fallback data for tools that can work without DB
const FALLBACK_TOOLS: Record<string, Omit<ToolData, '_id'>> = {
  'word-counter': {
    name: 'Word Counter',
    slug: 'word-counter',
    description: 'Count words, characters, sentences, paragraphs, and estimate reading time. Perfect for writers, students, and content creators who need to track their text length.',
    shortDescription: 'Count words, characters, sentences, and estimate reading time.',
    category: 'Writing',
    componentName: 'WordCounter',
    icon: 'FileText',
    published: true,
    featured: true,
    usageCount: 0,
    metaTitle: 'Free Word Counter Tool - Count Words, Characters & More',
    metaDescription: 'Free online word counter. Count words, characters, sentences, paragraphs, and reading time instantly. No signup required.',
    relatedBlogSlugs: [],
  },
  'json-formatter': {
    name: 'JSON Formatter',
    slug: 'json-formatter',
    description: 'Format, beautify, and validate your JSON data instantly. Supports custom indentation, minification, and syntax highlighting. Essential for developers working with APIs and data.',
    shortDescription: 'Format, validate, and beautify your JSON data.',
    category: 'Developer',
    componentName: 'JsonFormatter',
    icon: 'Braces',
    published: true,
    featured: true,
    usageCount: 0,
    metaTitle: 'Free JSON Formatter & Validator - Beautify JSON Online',
    metaDescription: 'Free online JSON formatter and validator. Beautify, minify, and validate JSON data with syntax highlighting. No signup required.',
    relatedBlogSlugs: [],
  },
  'password-generator': {
    name: 'Password Generator',
    slug: 'password-generator',
    description: 'Generate strong, secure passwords with customizable length and character options. Uses cryptographic randomness for maximum security. Includes a strength indicator.',
    shortDescription: 'Generate strong passwords with custom options.',
    category: 'Utility',
    componentName: 'PasswordGenerator',
    icon: 'Lock',
    published: true,
    featured: true,
    usageCount: 0,
    metaTitle: 'Free Password Generator - Strong & Secure Passwords',
    metaDescription: 'Generate strong, secure passwords instantly. Customize length, characters, and see strength ratings. Uses cryptographic randomness. Free, no signup.',
    relatedBlogSlugs: [],
  },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  let tool = await Tool.findOne({ slug, published: true }).lean();
  const t = tool ? serializeDoc(tool) as ToolData : FALLBACK_TOOLS[slug];
  if (!t) return { title: 'Tool Not Found' };

  return {
    title: t.metaTitle || t.name,
    description: t.metaDescription || t.shortDescription,
    alternates: { canonical: `${SITE_URL}/tools/${slug}` },
    openGraph: {
      title: t.metaTitle || t.name,
      description: t.metaDescription || t.shortDescription,
      type: 'website',
      url: `${SITE_URL}/tools/${slug}`,
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  await connectDB();
  let tool = await Tool.findOne({ slug, published: true }).lean();
  const t = tool ? serializeDoc(tool) as ToolData : FALLBACK_TOOLS[slug];
  if (!t) notFound();

  const toolJsonLd = generateToolJsonLd({
    name: t.name,
    description: t.description,
    slug: t.slug,
    category: t.category,
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: t.name, url: `${SITE_URL}/tools/${t.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Header */}
      <section className="bg-gradient-to-b from-indigo-50 to-white dark:from-gray-950 dark:to-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <nav className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
            <ChevronRight size={14} />
            <Link href="/tools" className="hover:text-indigo-600 dark:hover:text-indigo-400">Tools</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 dark:text-white">{t.name}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            {t.name}
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            {t.shortDescription}
          </p>
        </div>
      </section>

      {/* Tool + Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-10">
          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Top Ad */}
            <div className="mb-6 text-center">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider">Advertisement</span>
              <AdSenseUnit format="auto" className="mt-1" />
            </div>

            {/* Tool */}
            <div className="card p-6 sm:p-8">
              <ToolRunner componentName={t.componentName} />
            </div>

            {/* Bottom Ad */}
            <div className="mt-6 text-center">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider">Advertisement</span>
              <AdSenseUnit format="auto" className="mt-1" />
            </div>

            {/* Description / SEO content */}
            <div className="mt-8 card p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                About {t.name}
              </h2>
              <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
                <p>{t.description}</p>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-8 p-6 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Get More AI Tools & Tips
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Subscribe for weekly updates on new tools and AI insights.
              </p>
              <NewsletterForm source="tool-page" compact />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 space-y-6">
              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">Advertisement</span>
                <AdSenseUnit format="rectangle" className="mt-1" />
              </div>

              {/* More Tools */}
              <div className="card p-5">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
                  More Tools
                </h3>
                <div className="space-y-2">
                  {Object.entries(FALLBACK_TOOLS)
                    .filter(([s]) => s !== slug)
                    .slice(0, 5)
                    .map(([s, ft]) => (
                      <Link
                        key={s}
                        href={`/tools/${s}`}
                        className="block px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                      >
                        {ft.name}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
