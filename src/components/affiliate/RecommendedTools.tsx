import { ExternalLink, Star } from 'lucide-react';
import { AFFILIATE_PARTNERS, getAffiliatesByCategory } from '@/lib/affiliates';
import type { AffiliatePartner } from '@/lib/affiliates';

interface RecommendedToolsProps {
  category?: string;
  limit?: number;
  title?: string;
}

export default function RecommendedTools({ category, limit = 3, title = 'Recommended AI Tools' }: RecommendedToolsProps) {
  const partners: AffiliatePartner[] = category
    ? getAffiliatesByCategory(category).slice(0, limit)
    : AFFILIATE_PARTNERS.slice(0, limit);

  if (partners.length === 0) return null;

  return (
    <div className="card p-5">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
        <Star size={14} className="text-amber-500" /> {title}
      </h3>
      <div className="space-y-4">
        {partners.map((p) => (
          <a
            key={p.slug}
            href={p.affiliateUrl}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="block group"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 text-sm font-bold">
                {p.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-1">
                  {p.name} <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                  {p.description}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
      <p className="mt-4 text-[10px] text-gray-400 italic">
        Contains affiliate links
      </p>
    </div>
  );
}
