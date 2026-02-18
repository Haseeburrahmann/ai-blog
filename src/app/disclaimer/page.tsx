import type { Metadata } from 'next';
import { SITE_NAME, SITE_EMAIL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Affiliate Disclaimer',
  description: `Affiliate disclosure for ${SITE_NAME}. Transparency about how we earn revenue.`,
};

export default function DisclaimerPage() {
  return (
    <div className="section-padding bg-white dark:bg-gray-950">
      <div className="container-narrow">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Affiliate Disclaimer</h1>
        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
          <p><strong>Last updated:</strong> February 2026</p>

          <h2>Disclosure</h2>
          <p>
            {SITE_NAME} is a participant in various affiliate programs. This means we may earn
            a commission when you click on certain links on our website and make a purchase or
            sign up for a service.
          </p>

          <h2>How Affiliate Links Work</h2>
          <p>
            When we recommend a product or service, we sometimes include an affiliate link. If
            you click this link and make a purchase, we earn a small commission. This comes at
            <strong> no additional cost to you</strong>.
          </p>

          <h2>Our Commitment to Honesty</h2>
          <p>
            Affiliate partnerships <strong>never</strong> influence our editorial content. Our reviews
            and recommendations are based on our genuine assessment of each product. We only recommend
            tools and services that we believe provide real value to our readers.
          </p>
          <p>
            We will always disclose when content contains affiliate links, and we strive to be
            transparent about our business relationships.
          </p>

          <h2>Affiliate Programs We Participate In</h2>
          <p>We participate in affiliate programs from various AI and technology companies, including but not limited to:</p>
          <ul>
            <li>AI writing and content tools</li>
            <li>Productivity and workspace software</li>
            <li>Video and design platforms</li>
            <li>Development and hosting services</li>
          </ul>

          <h2>FTC Compliance</h2>
          <p>
            In accordance with the FTC guidelines, we disclose that some of the links on our
            website are affiliate links and we may receive compensation for recommendations made
            in our articles and reviews.
          </p>

          <h2>Questions?</h2>
          <p>
            If you have questions about our affiliate relationships, please contact us at{' '}
            <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
