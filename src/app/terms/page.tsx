import type { Metadata } from 'next';
import { SITE_NAME, SITE_EMAIL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms of service for ${SITE_NAME}.`,
};

export default function TermsPage() {
  return (
    <div className="section-padding bg-white dark:bg-gray-950">
      <div className="container-narrow">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Terms of Service</h1>
        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
          <p><strong>Last updated:</strong> February 2026</p>

          <h2>Acceptance of Terms</h2>
          <p>
            By accessing and using {SITE_NAME}, you agree to these terms. If you do not agree,
            please do not use our website.
          </p>

          <h2>Use of Content</h2>
          <p>
            All content on {SITE_NAME} is provided for informational purposes. You may not
            reproduce, distribute, or modify our content without written permission.
          </p>

          <h2>Free Tools</h2>
          <p>
            Our free tools are provided &quot;as is&quot; without warranty. While we strive for accuracy,
            we are not liable for any errors or losses resulting from tool usage.
          </p>

          <h2>Affiliate Links</h2>
          <p>
            Some links on our website are affiliate links. We may earn a commission when you make
            a purchase through these links, at no additional cost to you. This does not influence
            our editorial content or reviews.
          </p>

          <h2>User Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use our services for unlawful purposes</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Scrape or harvest content without permission</li>
            <li>Interfere with the proper operation of the website</li>
          </ul>

          <h2>Limitation of Liability</h2>
          <p>
            {SITE_NAME} shall not be liable for any indirect, incidental, or consequential damages
            arising from the use of our website or tools.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms? Contact us at{' '}
            <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
