export const SITE_NAME = 'MindfulBlogAI';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mindfulblogai.com';
export const SITE_DESCRIPTION = 'AI insights, free tools, and expert resources to boost your productivity. In-depth reviews, comparisons, and guides on the best AI tools for business and creativity.';
export const SITE_EMAIL = 'hello@mindfulblogai.com';
export const ADSENSE_PUB_ID = 'ca-pub-6867328086411956';

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/tools', label: 'Tools' },
  { href: '/about', label: 'About' },
  { href: '/newsletter', label: 'Newsletter' },
] as const;

export const BLOG_CATEGORIES = [
  { name: 'AI & Finance', slug: 'ai-finance', icon: 'TrendingUp', color: 'emerald' },
  { name: 'AI & Legal', slug: 'ai-legal', icon: 'Scale', color: 'blue' },
  { name: 'AI & Marketing', slug: 'ai-marketing', icon: 'Megaphone', color: 'purple' },
  { name: 'AI Writing', slug: 'ai-writing', icon: 'PenTool', color: 'indigo' },
  { name: 'AI Development', slug: 'ai-development', icon: 'Code', color: 'orange' },
  { name: 'AI Productivity', slug: 'ai-productivity', icon: 'Zap', color: 'teal' },
  { name: 'Tutorials', slug: 'tutorials', icon: 'BookOpen', color: 'cyan' },
  { name: 'Tool Reviews', slug: 'tool-reviews', icon: 'Star', color: 'pink' },
] as const;

export const TOOL_CATEGORIES = [
  { name: 'AI Development', slug: 'ai-development' },
  { name: 'Writing', slug: 'writing' },
  { name: 'Developer', slug: 'developer' },
  { name: 'SEO', slug: 'seo' },
  { name: 'Utility', slug: 'utility' },
] as const;

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/mindfulblogai',
  github: 'https://github.com/mindfulblogai',
  email: `mailto:${SITE_EMAIL}`,
} as const;

export const POSTS_PER_PAGE = 9;
