import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-7xl font-bold gradient-text mb-4">404</p>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Page Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/" className="btn-primary">
            <Home size={18} className="mr-2" />
            Go Home
          </Link>
          <Link href="/blog" className="btn-secondary">
            <ArrowLeft size={18} className="mr-2" />
            Read Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
