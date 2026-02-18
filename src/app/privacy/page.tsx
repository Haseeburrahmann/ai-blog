import type { Metadata } from 'next';
import { SITE_NAME, SITE_EMAIL, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy policy for ${SITE_NAME}. Learn how we handle your data.`,
};

export default function PrivacyPage() {
  return (
    <div className="section-padding bg-white dark:bg-gray-950">
      <div className="container-narrow">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
          <p><strong>Last updated:</strong> February 2026</p>

          <h2>Information We Collect</h2>
          <p>
            At {SITE_NAME} ({SITE_URL}), we collect minimal information necessary to provide our services:
          </p>
          <ul>
            <li><strong>Email address</strong> - Only when you voluntarily subscribe to our newsletter.</li>
            <li><strong>Usage data</strong> - Anonymous analytics data such as page views and browser type via Google Analytics.</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <ul>
            <li>To send our newsletter (if subscribed)</li>
            <li>To improve our website content and user experience</li>
            <li>To understand which content resonates with our audience</li>
          </ul>

          <h2>Third-Party Services</h2>
          <p>We use the following third-party services:</p>
          <ul>
            <li><strong>Google AdSense</strong> - For displaying advertisements. Google may use cookies to personalize ads.</li>
            <li><strong>Google Analytics</strong> - For website analytics. We use anonymized IP tracking.</li>
            <li><strong>MongoDB Atlas</strong> - For storing subscriber data securely.</li>
          </ul>

          <h2>Cookies</h2>
          <p>
            Our website uses cookies for functionality (theme preferences) and third-party advertising
            (Google AdSense). You can control cookie preferences in your browser settings.
          </p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Request access to your personal data</li>
            <li>Request deletion of your data</li>
            <li>Unsubscribe from our newsletter at any time</li>
            <li>Opt out of personalized advertising</li>
          </ul>

          <h2>Free Tools</h2>
          <p>
            All our browser-based tools run entirely in your browser. We do not send, store, or process
            any data you enter into our tools on our servers.
          </p>

          <h2>Contact</h2>
          <p>
            For privacy-related inquiries, contact us at{' '}
            <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
