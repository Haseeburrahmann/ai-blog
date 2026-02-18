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
import RecommendedTools from '@/components/affiliate/RecommendedTools';
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
    published: true, featured: true, usageCount: 0,
    metaTitle: 'Free Password Generator - Strong & Secure Passwords',
    metaDescription: 'Generate strong, secure passwords instantly. Customize length, characters, and see strength ratings. Uses cryptographic randomness. Free, no signup.',
    relatedBlogSlugs: [],
  },
  'token-counter': {
    name: 'AI Token Counter',
    slug: 'token-counter',
    description: 'Estimate token counts and costs for popular AI models including GPT-4, Claude, and Gemini. Essential for developers budgeting API usage and optimizing prompt length.',
    shortDescription: 'Estimate token counts and API costs for GPT-4, Claude, and Gemini.',
    category: 'AI',
    componentName: 'TokenCounter',
    icon: 'Hash',
    published: true, featured: true, usageCount: 0,
    metaTitle: 'Free AI Token Counter - Estimate Tokens & API Costs',
    metaDescription: 'Free online AI token counter. Estimate token counts and costs for GPT-4, Claude, and Gemini models instantly. No signup required.',
    relatedBlogSlugs: [],
  },
  'prompt-optimizer': {
    name: 'AI Prompt Optimizer',
    slug: 'prompt-optimizer',
    description: 'Build structured, effective AI prompts using the Role-Task-Context-Format framework. Includes quick templates for common use cases and one-click copy for ChatGPT, Claude, and other AI assistants.',
    shortDescription: 'Build structured, effective prompts using role, task, context, and format framework.',
    category: 'AI',
    componentName: 'PromptOptimizer',
    icon: 'Sparkles',
    published: true, featured: true, usageCount: 0,
    metaTitle: 'Free AI Prompt Optimizer - Build Better ChatGPT Prompts',
    metaDescription: 'Free AI prompt builder and optimizer. Create structured prompts for ChatGPT, Claude, and other AI tools. Templates included. No signup required.',
    relatedBlogSlugs: [],
  },
  'ai-cost-calculator': {
    name: 'AI Cost Calculator',
    slug: 'ai-cost-calculator',
    description: 'Compare API costs across OpenAI, Anthropic, and Google AI models. Calculate per-request, daily, and monthly costs based on your token usage and request volume.',
    shortDescription: 'Compare API costs across OpenAI, Anthropic, and Google models.',
    category: 'AI',
    componentName: 'AiCostCalculator',
    icon: 'Calculator',
    published: true, featured: true, usageCount: 0,
    metaTitle: 'Free AI API Cost Calculator - Compare GPT-4, Claude & Gemini Pricing',
    metaDescription: 'Free AI cost calculator. Compare API pricing for GPT-4, Claude, Gemini and more. Calculate daily and monthly costs. No signup required.',
    relatedBlogSlugs: [],
  },
  'meta-tag-generator': {
    name: 'Meta Tag Generator',
    slug: 'meta-tag-generator',
    description: 'Generate SEO-optimized meta tags for your website including title, description, Open Graph, and Twitter Card tags. Includes a live Google search preview to see exactly how your page will appear in search results.',
    shortDescription: 'Generate SEO meta tags with Google preview, Open Graph, and Twitter cards.',
    category: 'SEO',
    componentName: 'MetaTagGenerator',
    icon: 'Globe',
    published: true, featured: false, usageCount: 0,
    metaTitle: 'Free Meta Tag Generator - SEO Tags, Open Graph & Twitter Cards',
    metaDescription: 'Free meta tag generator for SEO. Create title, description, Open Graph, and Twitter Card tags with live Google preview. No signup required.',
    relatedBlogSlugs: [],
  },
  'readability-checker': {
    name: 'Readability Checker',
    slug: 'readability-checker',
    description: 'Analyze your text readability using industry-standard formulas including Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog Index, and Coleman-Liau Index. Get actionable insights on audience level and content complexity.',
    shortDescription: 'Analyze text readability with Flesch, Gunning Fog, and Coleman-Liau scores.',
    category: 'Writing',
    componentName: 'ReadabilityChecker',
    icon: 'BookOpen',
    published: true, featured: false, usageCount: 0,
    metaTitle: 'Free Readability Checker - Flesch Score & Grade Level Analysis',
    metaDescription: 'Free readability checker. Analyze text with Flesch Reading Ease, Gunning Fog, and Coleman-Liau scores. Know your audience level. No signup required.',
    relatedBlogSlugs: [],
  },
  'markdown-to-html': {
    name: 'Markdown to HTML',
    slug: 'markdown-to-html',
    description: 'Convert Markdown to clean HTML instantly. Supports headings, bold, italic, links, images, code blocks, lists, and more. Switch between HTML code view and rendered preview.',
    shortDescription: 'Convert Markdown to clean HTML with live preview and copy.',
    category: 'Developer',
    componentName: 'MarkdownToHtml',
    icon: 'Code',
    published: true, featured: false, usageCount: 0,
    metaTitle: 'Free Markdown to HTML Converter - Live Preview & Copy',
    metaDescription: 'Free Markdown to HTML converter. Convert Markdown to clean HTML with live preview, syntax support, and one-click copy. No signup required.',
    relatedBlogSlugs: [],
  },
  'regex-tester': {
    name: 'Regex Tester',
    slug: 'regex-tester',
    description: 'Test regular expressions with real-time match highlighting, group capture display, and string replacement. Includes common pattern presets for emails, URLs, phone numbers, and more.',
    shortDescription: 'Test regex patterns with match highlighting, group capture, and replacement.',
    category: 'Developer',
    componentName: 'RegexTester',
    icon: 'Terminal',
    published: true, featured: false, usageCount: 0,
    metaTitle: 'Free Regex Tester - Test Regular Expressions Online',
    metaDescription: 'Free online regex tester. Test patterns with real-time highlighting, group capture, and replacement. Common presets included. No signup required.',
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

              {/* Affiliate Recommendations */}
              <RecommendedTools limit={3} />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
