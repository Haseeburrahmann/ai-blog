import Link from 'next/link';
import { ArrowRight, Wrench } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import type { ToolData } from '@/types';

interface ToolCardProps {
  tool: ToolData;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link href={`/tools/${tool.slug}`} className="card card-hover p-6 group flex flex-col">
      <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
        <Wrench size={24} />
      </div>
      <Badge label={tool.category} color="gray" size="sm" />
      <h3 className="mt-3 text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        {tool.name}
      </h3>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex-1">
        {tool.shortDescription}
      </p>
      <span className="inline-flex items-center gap-1 mt-4 text-sm text-indigo-600 dark:text-indigo-400 font-medium group-hover:gap-2 transition-all">
        Use tool <ArrowRight size={14} />
      </span>
    </Link>
  );
}
