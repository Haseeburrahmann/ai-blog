import { NextRequest, NextResponse } from 'next/server';
import { createElement } from 'react';
import connectDB from '@/lib/mongodb';
import NewsletterSubscriber from '@/models/NewsletterSubscriber';
import { getResend } from '@/lib/resend';
import WelcomeEmail from '@/emails/WelcomeEmail';
import { SITE_NAME, SITE_URL, SITE_EMAIL } from '@/lib/constants';

async function sendWelcomeEmail(email: string) {
  const resend = getResend();
  if (!resend) return; // Skip if RESEND_API_KEY not configured

  const token = Buffer.from(email).toString('base64url');
  const unsubscribeUrl = `${SITE_URL}/api/newsletter/unsubscribe?token=${token}`;

  try {
    await resend.emails.send({
      from: `${SITE_NAME} <${SITE_EMAIL}>`,
      to: email,
      subject: `Welcome to ${SITE_NAME}!`,
      react: createElement(WelcomeEmail, { unsubscribeUrl }),
    });
  } catch (err) {
    // Log but don't fail the subscription if email fails
    console.error('Failed to send welcome email:', err);
  }
}

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

    const normalizedEmail = email.toLowerCase();
    const existing = await NewsletterSubscriber.findOne({ email: normalizedEmail });

    if (existing) {
      if (!existing.active) {
        existing.active = true;
        await existing.save();
        await sendWelcomeEmail(normalizedEmail);
        return NextResponse.json({ message: 'Welcome back! You have been re-subscribed.' });
      }
      return NextResponse.json({ message: 'You are already subscribed!' });
    }

    await NewsletterSubscriber.create({
      email: normalizedEmail,
      source: source || 'homepage',
    });

    await sendWelcomeEmail(normalizedEmail);

    return NextResponse.json({ message: 'Successfully subscribed! Welcome aboard.' });
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
