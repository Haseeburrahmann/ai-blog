import mongoose, { Schema, Document } from 'mongoose';

export interface INewsletterSubscriber extends Document {
  email: string;
  subscribedAt: Date;
  active: boolean;
  source: string;
}

const NewsletterSubscriberSchema = new Schema<INewsletterSubscriber>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    subscribedAt: { type: Date, default: Date.now },
    active: { type: Boolean, default: true },
    source: { type: String, default: 'homepage' },
  },
  { timestamps: true }
);

// email index already created by `unique: true`
NewsletterSubscriberSchema.index({ active: 1 });

export default mongoose.models.NewsletterSubscriber ||
  mongoose.model<INewsletterSubscriber>(
    'NewsletterSubscriber',
    NewsletterSubscriberSchema
  );
