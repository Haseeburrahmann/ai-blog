'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import AdSenseUnit from '@/components/ads/AdSenseUnit';

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  // Split content into paragraphs for ad insertion
  const paragraphs = content.split(/\n\n+/);
  const adInsertIndex = Math.min(3, Math.floor(paragraphs.length / 3));

  const firstPart = paragraphs.slice(0, adInsertIndex).join('\n\n');
  const secondPart = paragraphs.slice(adInsertIndex).join('\n\n');

  return (
    <div className="blog-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          rehypeHighlight,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        ]}
      >
        {firstPart}
      </ReactMarkdown>

      {/* In-article ad after ~3 paragraphs */}
      {paragraphs.length > 4 && (
        <div className="my-8 text-center">
          <span className="text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-wider">
            Advertisement
          </span>
          <AdSenseUnit format="fluid" className="mt-1" />
        </div>
      )}

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          rehypeHighlight,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        ]}
      >
        {secondPart}
      </ReactMarkdown>
    </div>
  );
}
