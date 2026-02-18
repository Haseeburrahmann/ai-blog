import type { Metadata } from 'next';
import { Mail, Zap, BookOpen, Wrench, Gift } from 'lucide-react';
import NewsletterForm from '@/components/ui/NewsletterForm';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Newsletter - Weekly AI Insights & Tools',
  description: `Subscribe to the ${SITE_NAME} newsletter for weekly AI news, tool reviews, productivity tips, and exclusive content delivered to your inbox.`,
};

export default function NewsletterPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 dark:from-indigo-700 dark:via-purple-700 dark:to-indigo-800">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-60" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm text-white mb-6">
            <Mail size={32} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            Stay Ahead with AI
          </h1>
          <p className="mt-4 text-lg text-indigo-100 max-w-xl mx-auto">
            Get the latest AI insights, tool reviews, and productivity tips delivered to your inbox every week. Join our growing community.
          </p>
          <div className="mt-8 max-w-md mx-auto">
            <NewsletterForm source="newsletter-page" />
          </div>
          <p className="mt-4 text-sm text-indigo-200">
            Free forever. No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* What You Get */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            What You&apos;ll Get
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Zap,
                title: 'AI News Roundup',
                desc: 'The most important AI developments of the week, distilled into what actually matters for you.',
              },
              {
                icon: BookOpen,
                title: 'Tool Reviews',
                desc: 'Honest, in-depth reviews of the latest AI tools. We test them so you don\'t have to.',
              },
              {
                icon: Wrench,
                title: 'Productivity Tips',
                desc: 'Practical workflows and strategies for using AI to get more done in less time.',
              },
              {
                icon: Gift,
                title: 'Exclusive Content',
                desc: 'Subscriber-only guides, templates, and early access to new tools and features.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 mb-4">
                  <Icon size={28} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-narrow text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Level Up?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Join thousands of professionals who rely on {SITE_NAME} for their weekly AI intelligence.
          </p>
          <div className="max-w-md mx-auto">
            <NewsletterForm source="newsletter-page-bottom" />
          </div>
        </div>
      </section>
    </>
  );
}
