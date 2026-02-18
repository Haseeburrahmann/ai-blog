import mongoose, { Schema, Document } from 'mongoose';

export interface ITool extends Document {
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
  faqs: {
    question: string;
    answer: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const ToolSchema = new Schema<ITool>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true, maxlength: 200 },
    category: { type: String, required: true },
    componentName: { type: String, required: true },
    icon: { type: String, default: 'Wrench' },
    published: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    usageCount: { type: Number, default: 0 },
    metaTitle: { type: String },
    metaDescription: { type: String },
    relatedBlogSlugs: [String],
    faqs: [
      {
        question: String,
        answer: String,
      },
    ],
  },
  { timestamps: true }
);

// slug index already created by `unique: true`
ToolSchema.index({ category: 1, published: 1 });
ToolSchema.index({ published: 1, featured: -1 });

export default mongoose.models.Tool ||
  mongoose.model<ITool>('Tool', ToolSchema);
