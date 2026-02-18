import { ExternalLink, Check, X } from 'lucide-react';
import type { AffiliatePartner } from '@/lib/affiliates';

interface Feature {
  name: string;
  values: Record<string, boolean | string>;
}

interface ComparisonTableProps {
  partners: AffiliatePartner[];
  features: Feature[];
  title?: string;
}

export default function ComparisonTable({ partners, features, title }: ComparisonTableProps) {
  return (
    <div className="card overflow-hidden">
      {title && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Feature</th>
              {partners.map((p) => (
                <th key={p.slug} className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  {p.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature) => (
              <tr key={feature.name} className="border-b border-gray-100 dark:border-gray-800">
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{feature.name}</td>
                {partners.map((p) => {
                  const val = feature.values[p.slug];
                  return (
                    <td key={p.slug} className="py-3 px-4 text-center">
                      {typeof val === 'boolean' ? (
                        val ? (
                          <Check size={18} className="mx-auto text-emerald-500" />
                        ) : (
                          <X size={18} className="mx-auto text-gray-300 dark:text-gray-600" />
                        )
                      ) : (
                        <span className="text-gray-700 dark:text-gray-300">{val}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr>
              <td className="py-4 px-4 font-semibold text-gray-900 dark:text-white">Commission</td>
              {partners.map((p) => (
                <td key={p.slug} className="py-4 px-4 text-center text-indigo-600 dark:text-indigo-400 font-medium text-xs">
                  {p.commission}
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-4 px-4"></td>
              {partners.map((p) => (
                <td key={p.slug} className="py-4 px-4 text-center">
                  <a
                    href={p.affiliateUrl}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                  >
                    Try it <ExternalLink size={12} />
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="px-6 py-3 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800">
        <p className="text-xs text-gray-400 italic">
          This table contains affiliate links. We may earn a commission at no extra cost to you.
        </p>
      </div>
    </div>
  );
}
