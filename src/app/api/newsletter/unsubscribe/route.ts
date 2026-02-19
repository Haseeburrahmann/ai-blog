import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import NewsletterSubscriber from '@/models/NewsletterSubscriber';
import { SITE_URL } from '@/lib/constants';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.redirect(`${SITE_URL}/newsletter/unsubscribed?status=error`);
  }

  try {
    // Decode the base64url-encoded email
    const email = Buffer.from(token, 'base64url').toString('utf-8');

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.redirect(`${SITE_URL}/newsletter/unsubscribed?status=error`);
    }

    await connectDB();

    const subscriber = await NewsletterSubscriber.findOne({
      email: email.toLowerCase(),
    });

    if (subscriber && subscriber.active) {
      subscriber.active = false;
      await subscriber.save();
    }

    // Redirect to confirmation page regardless (don't leak whether email exists)
    return NextResponse.redirect(`${SITE_URL}/newsletter/unsubscribed?status=success`);
  } catch {
    return NextResponse.redirect(`${SITE_URL}/newsletter/unsubscribed?status=error`);
  }
}
