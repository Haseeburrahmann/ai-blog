import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import NewsletterSubscriber from '@/models/NewsletterSubscriber';

export async function POST(request: NextRequest) {
  try {
    const { email, source } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    await connectDB();

    const existing = await NewsletterSubscriber.findOne({ email: email.toLowerCase() });
    if (existing) {
      if (!existing.active) {
        existing.active = true;
        await existing.save();
        return NextResponse.json({ message: 'Welcome back! You have been re-subscribed.' });
      }
      return NextResponse.json({ message: 'You are already subscribed!' });
    }

    await NewsletterSubscriber.create({
      email: email.toLowerCase(),
      source: source || 'homepage',
    });

    return NextResponse.json({ message: 'Successfully subscribed! Welcome aboard.' });
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
