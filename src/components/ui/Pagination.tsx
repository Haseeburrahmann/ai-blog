import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | '...')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push('...');
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  function getHref(page: number) {
    return page === 1 ? basePath : `${basePath}?page=${page}`;
  }

  return (
    <nav className="flex items-center justify-center gap-2" aria-label="Pagination">
      {currentPage > 1 ? (
        <Link
          href={getHref(currentPage - 1)}
          className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft size={20} />
        </Link>
      ) : (
        <span className="p-2 text-gray-300 dark:text-gray-700">
          <ChevronLeft size={20} />
        </span>
      )}

      {pages.map((page, i) =>
        page === '...' ? (
          <span key={`dots-${i}`} className="px-2 text-gray-400">...</span>
        ) : (
          <Link
            key={page}
            href={getHref(page)}
            className={cn(
              'w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors',
              page === currentPage
                ? 'bg-indigo-600 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            )}
          >
            {page}
          </Link>
        )
      )}

      {currentPage < totalPages ? (
        <Link
          href={getHref(currentPage + 1)}
          className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Next page"
        >
          <ChevronRight size={20} />
        </Link>
      ) : (
        <span className="p-2 text-gray-300 dark:text-gray-700">
          <ChevronRight size={20} />
        </span>
      )}
    </nav>
  );
}
