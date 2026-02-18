'use client';

import { useState } from 'react';
import { Copy, Check, Globe, Eye } from 'lucide-react';

export default function MetaTagGenerator() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [url, setUrl] = useState('');
  const [siteName, setSiteName] = useState('');
  const [ogType, setOgType] = useState('website');
  const [copied, setCopied] = useState(false);

  const titleLength = title.length;
  const descLength = description.length;

  const getTitleColor = () => {
    if (titleLength === 0) return 'text-gray-400';
    if (titleLength < 30 || titleLength > 60) return 'text-amber-500';
    return 'text-emerald-500';
  };

  const getDescColor = () => {
    if (descLength === 0) return 'text-gray-400';
    if (descLength < 120 || descLength > 160) return 'text-amber-500';
    return 'text-emerald-500';
  };

  const generateCode = () => {
    const lines: string[] = ['<!-- Primary Meta Tags -->'];
    if (title) lines.push(`<title>${title}</title>`, `<meta name="title" content="${title}" />`);
    if (description) lines.push(`<meta name="description" content="${description}" />`);
    if (keywords) lines.push(`<meta name="keywords" content="${keywords}" />`);

    lines.push('', '<!-- Open Graph / Facebook -->');
    lines.push(`<meta property="og:type" content="${ogType}" />`);
    if (url) lines.push(`<meta property="og:url" content="${url}" />`);
    if (title) lines.push(`<meta property="og:title" content="${title}" />`);
    if (description) lines.push(`<meta property="og:description" content="${description}" />`);
    if (siteName) lines.push(`<meta property="og:site_name" content="${siteName}" />`);

    lines.push('', '<!-- Twitter -->');
    lines.push('<meta property="twitter:card" content="summary_large_image" />');
    if (url) lines.push(`<meta property="twitter:url" content="${url}" />`);
    if (title) lines.push(`<meta property="twitter:title" content="${title}" />`);
    if (description) lines.push(`<meta property="twitter:description" content="${description}" />`);

    return lines.join('\n');
  };

  const code = generateCode();
  const hasContent = title || description;

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Page Title <span className="text-red-500">*</span>
            </label>
            <span className={`text-xs ${getTitleColor()}`}>{titleLength}/60</span>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Your Awesome Page Title"
            maxLength={80}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Meta Description <span className="text-red-500">*</span>
            </label>
            <span className={`text-xs ${getDescColor()}`}>{descLength}/160</span>
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A compelling description of your page (120-160 characters recommended)"
            maxLength={200}
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y text-sm"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Keywords</label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="keyword1, keyword2, keyword3"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Page URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/page"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Site Name</label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              placeholder="My Website"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">OG Type</label>
            <select
              value={ogType}
              onChange={(e) => setOgType(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            >
              <option value="website">website</option>
              <option value="article">article</option>
              <option value="product">product</option>
              <option value="profile">profile</option>
            </select>
          </div>
        </div>
      </div>

      {hasContent && (
        <div>
          <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Eye size={14} /> Google Search Preview
          </label>
          <div className="card p-4 max-w-xl">
            <p className="text-sm text-emerald-700 dark:text-emerald-400 truncate">
              {url || 'https://example.com'} <Globe size={12} className="inline" />
            </p>
            <p className="text-lg text-blue-700 dark:text-blue-400 font-medium truncate hover:underline">
              {title || 'Page Title'}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {description || 'Your meta description will appear here...'}
            </p>
          </div>
        </div>
      )}

      {hasContent && (
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Generated Meta Tags
          </label>
          <pre className="w-full p-4 rounded-xl bg-gray-900 dark:bg-gray-950 text-green-400 text-xs overflow-auto max-h-72 border border-gray-800">
            {code}
          </pre>
          <button
            onClick={copyCode}
            className="absolute top-9 right-3 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
            aria-label="Copy"
          >
            {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
          </button>
        </div>
      )}
    </div>
  );
}
