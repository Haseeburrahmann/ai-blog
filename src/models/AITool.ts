import mongoose, { Document, Schema } from 'mongoose'

export interface IAITool extends Document {
  name: string
  slug: string
  description: string
  longDescription: string
  category: string
  subcategory?: string
  website: string
  logo?: string
  screenshots: string[]
  pricing: {
    type: 'Free' | 'Freemium' | 'Paid' | 'Enterprise'
    startingPrice?: number
    currency: string
    billingCycle?: 'monthly' | 'yearly' | 'one-time'
  }
  rating: {
    overall: number
    usability: number
    features: number
    value: number
    support: number
  }
  features: string[]
  pros: string[]
  cons: string[]
  useCases: string[]
  targetAudience: string[]
  alternatives: string[]
  lastUpdated: Date
  isActive: boolean
  isFeatured: boolean
  reviewCount: number
  affiliateLink?: string
}

const AIToolSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Tool name is required'],
    trim: true,
    maxLength: [100, 'Name cannot exceed 100 characters']
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxLength: [200, 'Description cannot exceed 200 characters']
  },
  longDescription: {
    type: String,
    required: [true, 'Long description is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Writing & Content',
      'Image Generation',
      'Video & Audio',
      'Code & Development',
      'Business & Productivity',
      'Data Analysis',
      'Marketing & SEO',
      'Design & Creative',
      'Research & Education',
      'Customer Service',
      'Other'
    ]
  },
  subcategory: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    required: [true, 'Website URL is required'],
    validate: {
      validator: function(v: string) {
        return /^https?:\/\/.+/.test(v)
      },
      message: 'Website must be a valid URL'
    }
  },
  logo: {
    type: String,
    default: null
  },
  screenshots: [{
    type: String
  }],
  pricing: {
    type: {
      type: String,
      enum: ['Free', 'Freemium', 'Paid', 'Enterprise'],
      required: true
    },
    startingPrice: {
      type: Number,
      min: 0
    },
    currency: {
      type: String,
      default: 'USD'
    },
    billingCycle: {
      type: String,
      enum: ['monthly', 'yearly', 'one-time']
    }
  },
  rating: {
    overall: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0
    },
    usability: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    features: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    value: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    support: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    }
  },
  features: [{
    type: String,
    trim: true
  }],
  pros: [{
    type: String,
    trim: true
  }],
  cons: [{
    type: String,
    trim: true
  }],
  useCases: [{
    type: String,
    trim: true
  }],
  targetAudience: [{
    type: String,
    trim: true
  }],
  alternatives: [{
    type: String,
    trim: true
  }],
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  reviewCount: {
    type: Number,
    default: 0,
    min: 0
  },
  affiliateLink: {
    type: String,
    default: null
  }
}, {
  timestamps: true
})

// Create slug from name before saving
AIToolSchema.pre('save', function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }
  next()
})

export default mongoose.models.AITool || mongoose.model<IAITool>('AITool', AIToolSchema)