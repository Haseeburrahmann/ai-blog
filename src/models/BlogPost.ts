import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  author: string;
  published: boolean;
  publishedAt: Date;
  views: number;
  metaTitle?: string;
  metaDescription?: string;
}

const BlogPostSchema = new Schema<IBlogPost>({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  featuredImage: String,
  category: {
    type: String,
    required: true,
  },
  tags: [String],
  author: {
    type: String,
    default: 'MindfulBlogAI Team',
  },
  published: {
    type: Boolean,
    default: false,
  },
  publishedAt: Date,
  views: {
    type: Number,
    default: 0,
  },
  metaTitle: String,
  metaDescription: String,
}, {
  timestamps: true,
});

BlogPostSchema.index({ category: 1, published: 1 });
BlogPostSchema.index({ slug: 1 });

export default mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
