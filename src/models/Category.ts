import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  postCount: number;
  featured: boolean;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    icon: { type: String, default: 'Folder' },
    color: { type: String, default: 'indigo' },
    postCount: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// slug index already created by `unique: true`

export default mongoose.models.Category ||
  mongoose.model<ICategory>('Category', CategorySchema);
