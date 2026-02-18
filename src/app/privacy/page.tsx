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

          <h2>Google AdSense & Advertising</h2>
          <p>
            We use Google AdSense to display advertisements. Google and its partners may use cookies
            and similar technologies to serve ads based on your prior visits to this or other websites.
            You may opt out of personalized advertising by visiting{' '}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
          </p>

          <h2>Your Rights (GDPR)</h2>
          <p>If you are in the European Economic Area (EEA), you have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate personal data</li>
            <li>Request deletion of your personal data</li>
            <li>Object to processing of your personal data</li>
            <li>Request data portability</li>
            <li>Withdraw consent at any time</li>
          </ul>

          <h2>California Residents (CCPA)</h2>
          <p>
            If you are a California resident, you have the right to know what personal information we
            collect, request deletion of your data, and opt out of the sale of personal information.
            We do not sell personal information. To exercise your rights, contact us at{' '}
            <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>.
          </p>

          <h2>Data Retention</h2>
          <p>
            We retain newsletter subscriber data for as long as you remain subscribed. Analytics data
            is retained according to Google Analytics default retention policies. You can request
            deletion of your data at any time.
          </p>

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
