export interface AffiliatePartner {
  name: string;
  slug: string;
  commission: string;
  affiliateUrl: string;
  description: string;
  category: string;
}

export const AFFILIATE_PARTNERS: AffiliatePartner[] = [
  {
    name: 'Copy.ai',
    slug: 'copy-ai',
    commission: '45% recurring',
    affiliateUrl: 'https://www.copy.ai?via=mindfulblogai',
    description: 'AI copywriting and content generation platform',
    category: 'Writing',
  },
  {
    name: 'Notion AI',
    slug: 'notion-ai',
    commission: '50% recurring',
    affiliateUrl: 'https://affiliate.notion.so/mindfulblogai',
    description: 'AI-powered workspace for notes, docs, and projects',
    category: 'Productivity',
  },
  {
    name: 'Jasper',
    slug: 'jasper',
    commission: '25-30% recurring',
    affiliateUrl: 'https://jasper.ai?fpr=mindfulblogai',
    description: 'Enterprise AI content creation platform',
    category: 'Marketing',
  },
  {
    name: 'Pictory',
    slug: 'pictory',
    commission: '50% lifetime',
    affiliateUrl: 'https://pictory.ai?ref=mindfulblogai',
    description: 'AI video creation from text and scripts',
    category: 'Video',
  },
  {
    name: 'Writesonic',
    slug: 'writesonic',
    commission: '30% recurring',
    affiliateUrl: 'https://writesonic.com?via=mindfulblogai',
    description: 'AI writing assistant for blogs, ads, and copy',
    category: 'Writing',
  },
  {
    name: 'Synthesia',
    slug: 'synthesia',
    commission: '20% recurring',
    affiliateUrl: 'https://synthesia.io?via=mindfulblogai',
    description: 'AI video generation with virtual avatars',
    category: 'Video',
  },
];

export function getAffiliatesByCategory(category: string): AffiliatePartner[] {
  return AFFILIATE_PARTNERS.filter(
    (a) => a.category.toLowerCase() === category.toLowerCase()
  );
}

export function getAffiliateBySlug(slug: string): AffiliatePartner | undefined {
  return AFFILIATE_PARTNERS.find((a) => a.slug === slug);
}
