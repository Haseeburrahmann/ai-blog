import { SITE_NAME, SITE_URL, SITE_EMAIL } from '@/lib/constants';

interface WelcomeEmailProps {
  unsubscribeUrl: string;
}

export default function WelcomeEmail({ unsubscribeUrl }: WelcomeEmailProps) {
  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
          padding: '40px 32px',
          textAlign: 'center' as const,
          borderRadius: '8px 8px 0 0',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            width: '48px',
            height: '48px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: '12px',
            lineHeight: '48px',
            fontSize: '24px',
            marginBottom: '16px',
          }}
        >
          🧠
        </div>
        <h1
          style={{
            color: '#ffffff',
            fontSize: '24px',
            fontWeight: 700,
            margin: '0',
            lineHeight: '1.3',
          }}
        >
          Welcome to {SITE_NAME}!
        </h1>
      </div>

      {/* Body */}
      <div style={{ padding: '32px' }}>
        <p
          style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.6',
            margin: '0 0 20px',
          }}
        >
          Thanks for subscribing! You&apos;re now part of a community that stays
          ahead of the AI curve.
        </p>

        <p
          style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.6',
            margin: '0 0 24px',
          }}
        >
          Here&apos;s what you can expect:
        </p>

        {/* Benefits */}
        <div style={{ marginBottom: '24px' }}>
          {[
            {
              icon: '📰',
              title: 'Weekly AI Insights',
              desc: 'Curated articles on AI trends, tools, and strategies',
            },
            {
              icon: '🛠️',
              title: 'Free Tool Updates',
              desc: 'Be the first to know about new tools and features',
            },
            {
              icon: '💡',
              title: 'Exclusive Tips',
              desc: 'Actionable advice to boost your productivity with AI',
            },
            {
              icon: '🏷️',
              title: 'Special Deals',
              desc: 'Exclusive discounts on the best AI tools',
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: '16px',
              }}
            >
              <span style={{ fontSize: '20px', marginRight: '12px', lineHeight: '1.4' }}>
                {item.icon}
              </span>
              <div>
                <strong
                  style={{
                    fontSize: '14px',
                    color: '#111827',
                    display: 'block',
                    marginBottom: '2px',
                  }}
                >
                  {item.title}
                </strong>
                <span style={{ fontSize: '14px', color: '#6B7280' }}>
                  {item.desc}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' as const, margin: '32px 0' }}>
          <a
            href={`${SITE_URL}/blog`}
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              backgroundColor: '#4F46E5',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: 600,
              textDecoration: 'none',
              borderRadius: '8px',
            }}
          >
            Explore Our Latest Articles
          </a>
        </div>

        <div
          style={{
            backgroundColor: '#F3F4F6',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px',
          }}
        >
          <p
            style={{
              fontSize: '14px',
              color: '#374151',
              margin: '0',
              lineHeight: '1.6',
            }}
          >
            <strong>Quick links to get started:</strong>
          </p>
          <ul
            style={{
              margin: '8px 0 0',
              padding: '0 0 0 20px',
              fontSize: '14px',
              color: '#4F46E5',
              lineHeight: '2',
            }}
          >
            <li>
              <a href={`${SITE_URL}/tools`} style={{ color: '#4F46E5' }}>
                Free AI Tools
              </a>
            </li>
            <li>
              <a href={`${SITE_URL}/best-ai-tools`} style={{ color: '#4F46E5' }}>
                Best AI Tools Compared
              </a>
            </li>
            <li>
              <a href={`${SITE_URL}/blog`} style={{ color: '#4F46E5' }}>
                Latest Blog Posts
              </a>
            </li>
          </ul>
        </div>

        <p
          style={{
            fontSize: '14px',
            color: '#6B7280',
            lineHeight: '1.6',
            margin: '0',
          }}
        >
          If you have any questions or feedback, just reply to this email. We
          read every message!
        </p>
      </div>

      {/* Footer */}
      <div
        style={{
          borderTop: '1px solid #E5E7EB',
          padding: '24px 32px',
          textAlign: 'center' as const,
        }}
      >
        <p
          style={{
            fontSize: '12px',
            color: '#9CA3AF',
            margin: '0 0 8px',
            lineHeight: '1.5',
          }}
        >
          You received this email because you subscribed to {SITE_NAME}.
          <br />
          <a
            href={unsubscribeUrl}
            style={{ color: '#9CA3AF', textDecoration: 'underline' }}
          >
            Unsubscribe
          </a>
          {' | '}
          <a
            href={`mailto:${SITE_EMAIL}`}
            style={{ color: '#9CA3AF', textDecoration: 'underline' }}
          >
            Contact Us
          </a>
        </p>
        <p style={{ fontSize: '12px', color: '#D1D5DB', margin: '0' }}>
          &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </div>
  );
}
