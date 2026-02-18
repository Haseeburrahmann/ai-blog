'use client';

import { useState } from 'react';
import { Hash } from 'lucide-react';

export default function TokenCounter() {
  const [text, setText] = useState('');

  // Rough token estimation: ~4 chars per token for English
  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const gpt35Tokens = Math.ceil(charCount / 4);
  const gpt4Tokens = Math.ceil(charCount / 4);
  const claudeTokens = Math.ceil(charCount / 3.5);

  const models = [
    { name: 'GPT-3.5 Turbo', tokens: gpt35Tokens, costPer1k: 0.0005 },
    { name: 'GPT-4o', tokens: gpt4Tokens, costPer1k: 0.0025 },
    { name: 'Claude Sonnet', tokens: claudeTokens, costPer1k: 0.003 },
  ];

  return (
    <div className="space-y-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here to estimate token count..."
        className="w-full h-48 p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y text-base"
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{charCount}</p>
          <p className="text-xs text-gray-500 mt-1">Characters</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{wordCount}</p>
          <p className="text-xs text-gray-500 mt-1">Words</p>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <Hash size={16} /> Estimated Token Count by Model
        </h3>
        {models.map((m) => (
          <div key={m.name} className="card p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{m.name}</p>
              <p className="text-xs text-gray-500">~${(m.tokens / 1000 * m.costPer1k).toFixed(6)} input cost</p>
            </div>
            <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              ~{m.tokens.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 italic">
        Token counts are estimates. Actual counts vary by model tokenizer.
      </p>
    </div>
  );
}
