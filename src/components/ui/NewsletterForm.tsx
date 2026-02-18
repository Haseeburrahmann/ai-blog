'use client';

import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

interface NewsletterFormProps {
  source?: string;
  compact?: boolean;
}

export default function NewsletterForm({ source = 'homepage', compact = false }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'Successfully subscribed!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
        <CheckCircle size={20} />
        <span className="text-sm font-medium">{message}</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? 'flex gap-2' : 'flex flex-col sm:flex-row gap-3'}>
      <input
        type="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
        placeholder="Enter your email"
        required
        className={`flex-1 px-4 ${compact ? 'py-2 text-sm' : 'py-3'} rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors`}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className={`btn-primary ${compact ? 'px-4 py-2 text-sm' : ''} disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {status === 'loading' ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            {!compact && 'Subscribing...'}
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Send size={compact ? 16 : 18} />
            {!compact && 'Subscribe'}
          </span>
        )}
      </button>
      {status === 'error' && (
        <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
          <AlertCircle size={14} />
          <span>{message}</span>
        </div>
      )}
    </form>
  );
}
