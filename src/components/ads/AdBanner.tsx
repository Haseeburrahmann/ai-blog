import AdSenseUnit from './AdSenseUnit';

interface AdBannerProps {
  className?: string;
}

export default function AdBanner({ className = '' }: AdBannerProps) {
  return (
    <div className={`text-center ${className}`}>
      <span className="text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-wider">
        Advertisement
      </span>
      <AdSenseUnit format="auto" className="mt-1" />
    </div>
  );
}
