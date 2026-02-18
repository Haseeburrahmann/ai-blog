'use client';

import { useState, useCallback } from 'react';
import { Copy, Check, RefreshCw, Shield, ShieldAlert, ShieldCheck } from 'lucide-react';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    let chars = '';
    if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) chars += '0123456789';
    if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) {
      setPassword('Select at least one option');
      return;
    }

    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    const result = Array.from(array, (n) => chars[n % chars.length]).join('');
    setPassword(result);
    setCopied(false);
  }, [length, uppercase, lowercase, numbers, symbols]);

  function copyPassword() {
    if (!password || password === 'Select at least one option') return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const strength = getStrength(length, [uppercase, lowercase, numbers, symbols].filter(Boolean).length);

  return (
    <div className="space-y-6">
      {/* Password Display */}
      <div className="relative">
        <div className="flex items-center gap-2 p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
          <code className="flex-1 text-lg font-mono text-gray-900 dark:text-white break-all">
            {password || 'Click generate to create a password'}
          </code>
          <button
            onClick={copyPassword}
            className="p-2 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors shrink-0"
            aria-label="Copy"
          >
            {copied ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
          </button>
        </div>

        {/* Strength Bar */}
        {password && password !== 'Select at least one option' && (
          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  strength.level === 'weak' ? 'bg-red-500 w-1/3' :
                  strength.level === 'medium' ? 'bg-yellow-500 w-2/3' :
                  'bg-emerald-500 w-full'
                }`}
              />
            </div>
            <span className="flex items-center gap-1 text-sm font-medium">
              {strength.level === 'weak' && <ShieldAlert size={16} className="text-red-500" />}
              {strength.level === 'medium' && <Shield size={16} className="text-yellow-500" />}
              {strength.level === 'strong' && <ShieldCheck size={16} className="text-emerald-500" />}
              <span className={
                strength.level === 'weak' ? 'text-red-500' :
                strength.level === 'medium' ? 'text-yellow-500' :
                'text-emerald-500'
              }>
                {strength.label}
              </span>
            </span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="card p-6 space-y-5">
        {/* Length */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Length
            </label>
            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{length}</span>
          </div>
          <input
            type="range"
            min={6}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-indigo-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>6</span><span>64</span>
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Uppercase (A-Z)', checked: uppercase, onChange: setUppercase },
            { label: 'Lowercase (a-z)', checked: lowercase, onChange: setLowercase },
            { label: 'Numbers (0-9)', checked: numbers, onChange: setNumbers },
            { label: 'Symbols (!@#$)', checked: symbols, onChange: setSymbols },
          ].map(({ label, checked, onChange }) => (
            <label key={label} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
            </label>
          ))}
        </div>

        <button onClick={generate} className="btn-primary w-full">
          <RefreshCw size={18} className="mr-2" />
          Generate Password
        </button>
      </div>
    </div>
  );
}

function getStrength(length: number, optionCount: number): { level: string; label: string } {
  const score = (length >= 16 ? 2 : length >= 10 ? 1 : 0) + (optionCount >= 3 ? 2 : optionCount >= 2 ? 1 : 0);
  if (score >= 3) return { level: 'strong', label: 'Strong' };
  if (score >= 2) return { level: 'medium', label: 'Medium' };
  return { level: 'weak', label: 'Weak' };
}
