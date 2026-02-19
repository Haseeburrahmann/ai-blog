import { ImageResponse } from 'next/og';

export const alt = 'MindfulBlogAI - AI Blog, Free Tools & Resources';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #312E81 0%, #4F46E5 40%, #7C3AED 70%, #6D28D9 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-120px',
            left: '-60px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.03)',
            display: 'flex',
          }}
        />

        {/* Brain icon */}
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9.5 2A5.5 5.5 0 0 0 4 7.5c0 1.58.67 3 1.74 4.01" />
            <path d="M14.5 2A5.5 5.5 0 0 1 20 7.5c0 1.58-.67 3-1.74 4.01" />
            <path d="M8.5 7a3.5 3.5 0 0 0-1 7" />
            <path d="M15.5 7a3.5 3.5 0 0 1 1 7" />
            <path d="M6 13a5 5 0 0 0 6 5" />
            <path d="M18 13a5 5 0 0 1-6 5" />
            <path d="M12 2v20" />
          </svg>
        </div>

        {/* Site name */}
        <div
          style={{
            fontSize: '56px',
            fontWeight: 800,
            color: 'white',
            letterSpacing: '-1px',
            display: 'flex',
          }}
        >
          MindfulBlogAI
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '24px',
            fontWeight: 400,
            color: 'rgba(255, 255, 255, 0.8)',
            marginTop: '12px',
            display: 'flex',
          }}
        >
          AI Insights, Free Tools & Expert Resources
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '4px',
            background: 'linear-gradient(90deg, #818CF8, #C084FC, #818CF8)',
            display: 'flex',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
