import mongoose, { Schema, Document } from 'mongoose';

export interface IComparison extends Document {
  title: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  description: string;
  tools: [{
    tool: mongoose.Types.ObjectId;
    highlights: string[];
    pros: string[];
    cons: string[];
  }];
  verdict: string;
  winner?: mongoose.Types.ObjectId;
  category: string;
  published: boolean;
  publishedAt: Date;
  views: number;
}

const ComparisonSchema = new Schema<IComparison>({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  metaTitle: String,
  metaDescription: String,
  description: {
    type: String,
    required: true,
  },
  tools: [{
    tool: {
      type: Schema.Types.ObjectId,
      ref: 'AITool',
      required: true,
    },
    highlights: [String],
    pros: [String],
    cons: [String],
  }],
  verdict: {
    type: String,
    required: true,
  },
  winner: {
    type: Schema.Types.ObjectId,
    ref: 'AITool',
  },
  category: {
    type: String,
    required: true,
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
}, {
  timestamps: true,
});

ComparisonSchema.index({ category: 1, published: 1 });
ComparisonSchema.index({ slug: 1 });

export default mongoose.models.Comparison || mongoose.model<IComparison>('Comparison', ComparisonSchema);
