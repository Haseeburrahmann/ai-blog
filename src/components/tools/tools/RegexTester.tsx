'use client';

import { useState, useMemo } from 'react';
import { AlertCircle, Copy, Check } from 'lucide-react';

const PRESETS = [
  { name: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', flags: 'g' },
  { name: 'URL', pattern: 'https?://[\\w\\-._~:/?#\\[\\]@!$&\'()*+,;=%]+', flags: 'g' },
  { name: 'Phone', pattern: '\\+?[\\d\\s\\-()]{7,15}', flags: 'g' },
  { name: 'IPv4', pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b', flags: 'g' },
  { name: 'Hex Color', pattern: '#(?:[0-9a-fA-F]{3}){1,2}\\b', flags: 'g' },
];

export default function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [replacement, setReplacement] = useState('');
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!pattern || !testString) return null;

    try {
      const regex = new RegExp(pattern, flags);
      const matches: { match: string; index: number; groups?: string[] }[] = [];

      if (flags.includes('g')) {
        let match: RegExpExecArray | null;
        while ((match = regex.exec(testString)) !== null) {
          matches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1).length > 0 ? match.slice(1) : undefined,
          });
          if (!match[0]) break;
        }
      } else {
        const match = regex.exec(testString);
        if (match) {
          matches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1).length > 0 ? match.slice(1) : undefined,
          });
        }
      }

      const replaced = replacement ? testString.replace(regex, replacement) : null;
      return { matches, error: null, replaced };
    } catch (e) {
      return { matches: [], error: e instanceof Error ? e.message : 'Invalid regex', replaced: null };
    }
  }, [pattern, flags, testString, replacement]);

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setPattern(preset.pattern);
    setFlags(preset.flags);
  };

  const highlightedText = useMemo(() => {
    if (!result || result.error || result.matches.length === 0) return null;
    const parts: { text: string; highlighted: boolean }[] = [];
    let lastIndex = 0;

    for (const m of result.matches) {
      if (m.index > lastIndex) {
        parts.push({ text: testString.slice(lastIndex, m.index), highlighted: false });
      }
      parts.push({ text: m.match, highlighted: true });
      lastIndex = m.index + m.match.length;
    }
    if (lastIndex < testString.length) {
      parts.push({ text: testString.slice(lastIndex), highlighted: false });
    }
    return parts;
  }, [result, testString]);

  const copyPattern = () => {
    navigator.clipboard.writeText(`/${pattern}/${flags}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Common Patterns
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => applyPreset(p)}
              className="px-3 py-1.5 rounded-lg text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Regular Expression
        </label>
        <div className="flex items-center">
          <span className="px-3 py-2.5 bg-gray-100 dark:bg-gray-700 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-xl text-gray-500 text-sm">/</span>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="your regex pattern"
            className="flex-1 px-3 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
          />
          <span className="px-3 py-2.5 bg-gray-100 dark:bg-gray-700 border border-l-0 border-gray-300 dark:border-gray-600 text-gray-500 text-sm">/</span>
          <input
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            className="w-16 px-3 py-2.5 border border-l-0 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm rounded-r-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="gim"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Test String
        </label>
        <textarea
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          placeholder="Enter text to test your regex against..."
          className="w-full h-32 p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Replacement (optional)
        </label>
        <input
          type="text"
          value={replacement}
          onChange={(e) => setReplacement(e.target.value)}
          placeholder="Replacement string (use $1, $2 for groups)"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm font-mono"
        />
      </div>

      {result?.error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
          <AlertCircle size={16} />
          {result.error}
        </div>
      )}

      {highlightedText && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Highlighted Matches ({result?.matches.length || 0} found)
          </label>
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-mono whitespace-pre-wrap break-all">
            {highlightedText.map((part, i) =>
              part.highlighted ? (
                <mark key={i} className="bg-amber-200 dark:bg-amber-800 text-gray-900 dark:text-white rounded px-0.5">
                  {part.text}
                </mark>
              ) : (
                <span key={i} className="text-gray-700 dark:text-gray-300">{part.text}</span>
              )
            )}
          </div>
        </div>
      )}

      {result && !result.error && result.matches.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Match Details
          </label>
          <div className="space-y-2 max-h-48 overflow-auto">
            {result.matches.map((m, i) => (
              <div key={i} className="card p-3 flex items-center justify-between text-sm">
                <div>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400">{m.match}</span>
                  <span className="text-gray-400 ml-2">at index {m.index}</span>
                  {m.groups && (
                    <span className="text-gray-500 ml-2">groups: [{m.groups.join(', ')}]</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {result?.replaced !== null && result?.replaced !== undefined && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Replacement Result
          </label>
          <pre className="w-full p-4 rounded-xl bg-gray-900 dark:bg-gray-950 text-green-400 text-sm overflow-auto max-h-48 border border-gray-800 whitespace-pre-wrap">
            {result.replaced}
          </pre>
        </div>
      )}

      {pattern && (
        <button onClick={copyPattern} className="btn-secondary py-2 px-4 text-sm">
          {copied ? <Check size={16} className="mr-1.5 text-emerald-400" /> : <Copy size={16} className="mr-1.5" />}
          Copy Regex
        </button>
      )}
    </div>
  );
}
