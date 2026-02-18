import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  author: string;
  published: boolean;
  publishedAt: Date;
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
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: { type: String, required: true, maxlength: 300 },
    content: { type: String, required: true },
    featuredImage: { type: String, default: '' },
    category: { type: String, required: true },
    tags: [{ type: String, trim: true, lowercase: true }],
    author: { type: String, default: 'MindfulBlogAI Team' },
    published: { type: Boolean, default: false },
    publishedAt: { type: Date },
    views: { type: Number, default: 0 },
    readingTime: { type: Number, default: 0 },
    metaTitle: { type: String, maxlength: 60 },
    metaDescription: { type: String, maxlength: 160 },
    affiliateLinks: [
      {
        name: String,
        url: String,
        commission: String,
        description: String,
      },
    ],
    tableOfContents: [
      {
        id: String,
        text: String,
        level: Number,
      },
    ],
    relatedSlugs: [String],
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// slug index already created by `unique: true`
BlogPostSchema.index({ category: 1, published: 1, publishedAt: -1 });
BlogPostSchema.index({ tags: 1 });
BlogPostSchema.index({ published: 1, featured: -1, publishedAt: -1 });
BlogPostSchema.index({ title: 'text', excerpt: 'text', tags: 'text' });

export default mongoose.models.BlogPost ||
  mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
