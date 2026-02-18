export interface BlogPostData {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  author: string;
  published: boolean;
  publishedAt: string;
  updatedAt: string;
  views: number;
  readingTime: number;
  metaTitle?: string;
  metaDescription?: string;
  affiliateLinks: {
    name: string;
    url: string;
    commission: string;
    description: string;
  }[];
  tableOfContents: {
    id: string;
    text: string;
    level: number;
  }[];
  relatedSlugs: string[];
  featured: boolean;
}

export interface ToolData {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  componentName: string;
  icon: string;
  published: boolean;
  featured: boolean;
  usageCount: number;
  metaTitle?: string;
  metaDescription?: string;
  relatedBlogSlugs: string[];
}

export interface CategoryData {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  postCount: number;
  featured: boolean;
}

export interface NewsletterSubscriberData {
  _id: string;
  email: string;
  subscribedAt: string;
  active: boolean;
  source: string;
}
