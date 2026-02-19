import { ExternalLink, Star, ArrowRight } from 'lucide-react';
import { getAffiliateBySlug } from '@/lib/affiliates';

interface InlineAffiliateCTAProps {
  slug: string;
  headline?: string;
}

export default function InlineAffiliateCTA({ slug, headline }: InlineAffiliateCTAProps) {
  const partner = getAffiliateBySlug(slug);
  if (!partner) return null;

  return (
    <div className="my-8 p-6 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-800">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-300 font-bold text-lg shrink-0">
          {partner.name.charAt(0)}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Star size={16} className="text-amber-500" />
            {headline || `Try ${partner.name}`}
          </h4>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {partner.description}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <a
              href={partner.affiliateUrl}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Get Started Free <ArrowRight size={14} />
            </a>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              {partner.commission} commission
            </span>
          </div>
        </div>
      </div>
      <p className="mt-3 text-[10px] text-gray-400 italic">
        Affiliate link &mdash; we may earn a commission at no extra cost to you.
      </p>
    </div>
  );
}
