import { ExternalLink } from 'lucide-react';
import type { AffiliatePartner } from '@/lib/affiliates';

interface AffiliateCardProps {
  partner: AffiliatePartner;
}

export default function AffiliateCard({ partner }: AffiliateCardProps) {
  return (
    <div className="card p-5 flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">{partner.name}</h3>
          <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
            {partner.commission} commission
          </span>
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
          {partner.category}
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 flex-1 mb-4">
        {partner.description}
      </p>
      <a
        href={partner.affiliateUrl}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="btn-primary py-2 px-4 text-sm w-full text-center"
      >
        Try {partner.name} <ExternalLink size={14} className="ml-1.5 inline" />
      </a>
    </div>
  );
}
