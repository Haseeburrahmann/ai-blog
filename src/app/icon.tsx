import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#4F46E5',
          borderRadius: '8px',
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Brain icon - matching lucide Brain used in Navigation */}
          <path d="M9.5 2A5.5 5.5 0 0 0 4 7.5c0 1.58.67 3 1.74 4.01" />
          <path d="M14.5 2A5.5 5.5 0 0 1 20 7.5c0 1.58-.67 3-1.74 4.01" />
          <path d="M8.5 7a3.5 3.5 0 0 0-1 7" />
          <path d="M15.5 7a3.5 3.5 0 0 1 1 7" />
          <path d="M6 13a5 5 0 0 0 6 5" />
          <path d="M18 13a5 5 0 0 1-6 5" />
          <path d="M12 2v20" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
