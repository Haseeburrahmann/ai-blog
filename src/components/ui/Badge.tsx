import Link from 'next/link';
import { cn } from '@/lib/utils';

interface BadgeProps {
  label: string;
  href?: string;
  color?: string;
  size?: 'sm' | 'md';
}

const colorMap: Record<string, string> = {
  emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  indigo: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
  orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  teal: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
  cyan: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
  pink: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  gray: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
};

export default function Badge({ label, href, color = 'indigo', size = 'sm' }: BadgeProps) {
  const classes = cn(
    'inline-flex items-center rounded-full font-medium',
    size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm',
    colorMap[color] || colorMap.indigo
  );

  if (href) {
    return (
      <Link href={href} className={cn(classes, 'hover:opacity-80 transition-opacity')}>
        {label}
      </Link>
    );
  }

  return <span className={classes}>{label}</span>;
}
