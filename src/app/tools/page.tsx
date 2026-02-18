import type { Metadata } from 'next';
import connectDB from '@/lib/mongodb';
import Tool from '@/models/Tool';
import ToolCard from '@/components/tools/ToolCard';
import { serializeDoc } from '@/lib/utils';
import type { ToolData } from '@/types';

export const metadata: Metadata = {
  title: 'Free AI Tools - Browser-Based, No Signup Required',
  description: 'Powerful free AI and developer tools that run entirely in your browser. Word counter, JSON formatter, password generator, token counter, and more.',
};

export const revalidate = 86400;

// Fallback tool data when DB is empty
const FALLBACK_TOOLS: Partial<ToolData>[] = [
  { _id: '1', name: 'Word Counter', slug: 'word-counter', shortDescription: 'Count words, characters, sentences, and estimate reading time instantly.', category: 'Writing', componentName: 'WordCounter', icon: 'FileText', published: true, featured: true },
  { _id: '2', name: 'JSON Formatter', slug: 'json-formatter', shortDescription: 'Format, validate, and beautify your JSON data with syntax highlighting.', category: 'Developer', componentName: 'JsonFormatter', icon: 'Braces', published: true, featured: true },
  { _id: '3', name: 'Password Generator', slug: 'password-generator', shortDescription: 'Generate strong, secure passwords with customizable options and strength indicator.', category: 'Utility', componentName: 'PasswordGenerator', icon: 'Lock', published: true, featured: true },
];

export default async function ToolsPage() {
  let serializedTools: ToolData[] = FALLBACK_TOOLS as ToolData[];
  try {
    await connectDB();
    const tools = await Tool.find({ published: true }).sort({ featured: -1 }).lean();
    if (tools.length > 0) {
      serializedTools = serializeDoc<ToolData[]>(tools);
    }
  } catch {
    // DB unavailable, use fallback tools
  }

  return (
    <>
      <section className="bg-gradient-to-b from-indigo-50 to-white dark:from-gray-950 dark:to-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Free AI Tools
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
            Powerful browser-based tools. No signup, no installation, completely free.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-wide">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serializedTools.map((tool) => (
              <ToolCard key={tool._id} tool={tool} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
