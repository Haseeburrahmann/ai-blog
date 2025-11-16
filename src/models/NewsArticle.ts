import mongoose, { Document, Schema } from 'mongoose'

export interface INewsArticle extends Document {
  title: string
  slug: string
  content: string
  description: string
  imageUrl?: string
  source: string
  sourceUrl?: string
  author: string
  category: string
  country: string
  language: string
  tags: string[]
  published: boolean
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
  readTime: number
  featured: boolean
  views: number
}

const NewsArticleSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxLength: [300, 'Title cannot exceed 300 characters']
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
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxLength: [500, 'Description cannot exceed 500 characters']
  },
  imageUrl: {
    type: String,
    default: null
  },
  source: {
    type: String,
    required: [true, 'Source is required'],
    default: 'World News Network'
  },
  sourceUrl: {
    type: String,
    default: null
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    default: 'Editorial Team'
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['World', 'Business', 'Technology', 'Sports', 'Entertainment', 'Health', 'Science', 'Politics'],
    default: 'World'
  },
  country: {
    type: String,
    default: 'us',
    lowercase: true
  },
  language: {
    type: String,
    default: 'en',
    lowercase: true
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  published: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date,
    default: null
  },
  readTime: {
    type: Number,
    default: 5 // minutes
  },
  featured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

// Create slug from title before saving
NewsArticleSchema.pre('save', function(this: INewsArticle, next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
  }

  // Set publishedAt when article is published
  if (this.isModified('published') && this.published && !this.publishedAt) {
    this.publishedAt = new Date()
  }

  next()
})

// Add index for better query performance
NewsArticleSchema.index({ category: 1, publishedAt: -1 })
NewsArticleSchema.index({ featured: 1, publishedAt: -1 })
NewsArticleSchema.index({ published: 1, publishedAt: -1 })

export default mongoose.models.NewsArticle || mongoose.model<INewsArticle>('NewsArticle', NewsArticleSchema)