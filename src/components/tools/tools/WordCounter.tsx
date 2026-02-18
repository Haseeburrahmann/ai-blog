'use client';

import { useState } from 'react';
import { FileText, Hash, AlignLeft, Clock, Type } from 'lucide-react';

export default function WordCounter() {
  const [text, setText] = useState('');

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const sentences = text.trim() ? text.split(/[.!?]+/).filter((s) => s.trim()).length : 0;
  const paragraphs = text.trim() ? text.split(/\n\n+/).filter((p) => p.trim()).length : 0;
  const readingTime = Math.ceil(words / 200);

  const stats = [
    { label: 'Words', value: words, icon: FileText },
    { label: 'Characters', value: characters, icon: Hash },
    { label: 'No Spaces', value: charactersNoSpaces, icon: Type },
    { label: 'Sentences', value: sentences, icon: AlignLeft },
    { label: 'Paragraphs', value: paragraphs, icon: AlignLeft },
    { label: 'Reading Time', value: `${readingTime} min`, icon: Clock },
  ];

  return (
    <div className="space-y-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your text here..."
        className="w-full h-48 p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y text-base"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="card p-4 text-center">
            <Icon size={20} className="mx-auto mb-2 text-indigo-500" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {text && (
        <button
          onClick={() => setText('')}
          className="text-sm text-gray-500 hover:text-red-500 transition-colors"
        >
          Clear text
        </button>
      )}
    </div>
  );
}
