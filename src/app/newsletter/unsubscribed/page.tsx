import Link from 'next/link';
import { SITE_NAME } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Unsubscribed - ${SITE_NAME}`,
  robots: { index: false, follow: false },
};

export default async function UnsubscribedPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const isError = status === 'error';

  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-3xl">
          {isError ? '⚠️' : '👋'}
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {isError ? 'Something went wrong' : 'You\'ve been unsubscribed'}
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          {isError
            ? 'We couldn\'t process your unsubscribe request. The link may be invalid or expired. Please try again or contact us for help.'
            : 'You\'ve been successfully removed from our mailing list. We\'re sorry to see you go! You can always resubscribe from our newsletter page.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
          >
            Back to Home
          </Link>
          {!isError && (
            <Link
              href="/newsletter"
              className="px-6 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Resubscribe
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
