import mongoose, { Document, Schema } from 'mongoose'

export interface IBlogPost extends Document {
  title: string
  slug: string
  content: string
  excerpt: string
  featuredImage?: string
  tags: string[]
  category: string
  published: boolean
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
  author: string
  readTime: number
}

const BlogPostSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxLength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    maxLength: [300, 'Excerpt cannot exceed 300 characters']
  },
  featuredImage: {
    type: String,
    default: null
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['AI News', 'Tool Reviews', 'Tutorials', 'Industry Analysis', 'Opinion'],
    default: 'AI News'
  },
  published: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date,
    default: null
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    default: 'AI Insights Team'
  },
  readTime: {
    type: Number,
    default: 5 // minutes
  }
}, {
  timestamps: true
})

// Create slug from title before saving
BlogPostSchema.pre('save', function(this: IBlogPost, next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
  }
  
  // Set publishedAt when post is published
  if (this.isModified('published') && this.published && !this.publishedAt) {
    this.publishedAt = new Date()
  }
  
  next()
})

export default mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema)