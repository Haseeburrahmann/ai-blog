import mongoose, { Schema, Document } from 'mongoose';

export interface IAITool extends Document {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  logo: string;
  websiteUrl: string;
  affiliateUrl?: string;
  category: string;
  subcategory?: string;
  tags: string[];
  pricing: {
    model: 'free' | 'freemium' | 'paid' | 'enterprise';
    startingPrice?: number;
    priceUnit?: string;
    hasFreeTier: boolean;
    hasTrial: boolean;
  };
  rating: {
    overall: number;
    easeOfUse: number;
    features: number;
    value: number;
    support: number;
    reviewCount: number;
  };
  features: string[];
  useCases: string[];
  integrations: string[];
  alternatives: string[];
  featured: boolean;
  trending: boolean;
  published: boolean;
  publishedAt: Date;
  updatedAt: Date;
  metaTitle?: string;
  metaDescription?: string;
}

const AIToolSchema = new Schema<IAITool>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
    maxlength: 200,
  },
  logo: {
    type: String,
    required: true,
  },
  websiteUrl: {
    type: String,
    required: true,
  },
  affiliateUrl: {
    type: String,
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Writing',
      'Coding',
      'Image',
      'Video',
      'Audio',
      'Chatbot',
      'Automation',
      'Productivity',
      'Design',
      'Marketing',
      'Research',
      'Customer Support',
    ],
  },
  subcategory: {
    type: String,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  pricing: {
    model: {
      type: String,
      enum: ['free', 'freemium', 'paid', 'enterprise'],
      required: true,
    },
    startingPrice: Number,
    priceUnit: String,
    hasFreeTier: {
      type: Boolean,
      default: false,
    },
    hasTrial: {
      type: Boolean,
      default: false,
    },
  },
  rating: {
    overall: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    easeOfUse: {
      type: Number,
      min: 0,
      max: 5,
    },
    features: {
      type: Number,
      min: 0,
      max: 5,
    },
    value: {
      type: Number,
      min: 0,
      max: 5,
    },
    support: {
      type: Number,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
  },
  features: [String],
  useCases: [String],
  integrations: [String],
  alternatives: [String],
  featured: {
    type: Boolean,
    default: false,
  },
  trending: {
    type: Boolean,
    default: false,
  },
  published: {
    type: Boolean,
    default: false,
  },
  publishedAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  metaTitle: String,
  metaDescription: String,
}, {
  timestamps: true,
});

// Indexes for search performance
AIToolSchema.index({ name: 'text', description: 'text', tags: 'text' });
AIToolSchema.index({ category: 1, published: 1 });
AIToolSchema.index({ featured: 1, published: 1 });
AIToolSchema.index({ trending: 1, published: 1 });
AIToolSchema.index({ 'rating.overall': -1 });

export default mongoose.models.AITool || mongoose.model<IAITool>('AITool', AIToolSchema);
