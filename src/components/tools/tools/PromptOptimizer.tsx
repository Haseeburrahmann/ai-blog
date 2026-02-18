'use client';

import { useState } from 'react';
import { Sparkles, Copy, Check, RotateCcw } from 'lucide-react';

const FRAMEWORKS = [
  { id: 'role', label: 'Role', placeholder: 'e.g., expert copywriter, senior developer, marketing strategist' },
  { id: 'task', label: 'Task', placeholder: 'e.g., write a blog post, refactor this code, create a marketing plan' },
  { id: 'context', label: 'Context', placeholder: 'e.g., for a SaaS startup, targeting Gen Z audience, using React' },
  { id: 'format', label: 'Format', placeholder: 'e.g., bullet points, step-by-step guide, markdown table' },
  { id: 'tone', label: 'Tone', placeholder: 'e.g., professional, casual, persuasive, technical' },
  { id: 'constraints', label: 'Constraints', placeholder: 'e.g., under 500 words, avoid jargon, include examples' },
];

const TEMPLATES = [
  { name: 'Blog Writer', fields: { role: 'Expert blog writer and SEO specialist', task: 'Write a comprehensive blog post', context: '', format: 'Use headings (H2, H3), short paragraphs, bullet points where appropriate', tone: 'Informative yet engaging and conversational', constraints: 'Between 1500-2000 words, include an introduction and conclusion' } },
  { name: 'Code Reviewer', fields: { role: 'Senior software engineer with 10+ years experience', task: 'Review the following code and suggest improvements', context: '', format: 'List issues with severity (critical/warning/info), then provide corrected code', tone: 'Technical and constructive', constraints: 'Focus on performance, readability, and best practices' } },
  { name: 'Email Drafter', fields: { role: 'Professional communication specialist', task: 'Draft a business email', context: '', format: 'Standard email format with subject line, greeting, body, and sign-off', tone: 'Professional and concise', constraints: 'Keep under 200 words, clear call-to-action' } },
];

export default function PromptOptimizer() {
  const [fields, setFields] = useState<Record<string, string>>({
    role: '', task: '', context: '', format: '', tone: '', constraints: '',
  });
  const [copied, setCopied] = useState(false);

  const updateField = (id: string, value: string) => {
    setFields((prev) => ({ ...prev, [id]: value }));
  };

  const applyTemplate = (template: typeof TEMPLATES[0]) => {
    setFields(template.fields);
  };

  const reset = () => {
    setFields({ role: '', task: '', context: '', format: '', tone: '', constraints: '' });
  };

  const generatePrompt = () => {
    const parts: string[] = [];
    if (fields.role) parts.push(`You are a ${fields.role}.`);
    if (fields.task) parts.push(`Your task is to ${fields.task}.`);
    if (fields.context) parts.push(`Context: ${fields.context}.`);
    if (fields.format) parts.push(`Format your response as follows: ${fields.format}.`);
    if (fields.tone) parts.push(`Use a ${fields.tone} tone.`);
    if (fields.constraints) parts.push(`Constraints: ${fields.constraints}.`);
    return parts.join('\n\n');
  };

  const prompt = generatePrompt();
  const hasContent = Object.values(fields).some((v) => v.trim());

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Templates */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Quick Templates
        </label>
        <div className="flex flex-wrap gap-2">
          {TEMPLATES.map((t) => (
            <button
              key={t.name}
              onClick={() => applyTemplate(t)}
              className="px-3 py-1.5 rounded-lg text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Fields */}
      <div className="grid gap-4">
        {FRAMEWORKS.map(({ id, label, placeholder }) => (
          <div key={id}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {label} {id === 'task' && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              value={fields[id]}
              onChange={(e) => updateField(id, e.target.value)}
              placeholder={placeholder}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            />
          </div>
        ))}
      </div>

      {/* Generated Prompt */}
      {hasContent && (
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Sparkles size={14} className="inline mr-1" /> Generated Prompt
          </label>
          <pre className="w-full p-4 rounded-xl bg-gray-900 dark:bg-gray-950 text-green-400 text-sm whitespace-pre-wrap border border-gray-800 min-h-[120px]">
            {prompt}
          </pre>
          <button
            onClick={copyPrompt}
            className="absolute top-9 right-3 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
            aria-label="Copy"
          >
            {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
          </button>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        {hasContent && (
          <>
            <button onClick={copyPrompt} className="btn-primary py-2 px-4 text-sm">
              <Copy size={16} className="mr-1.5" /> Copy Prompt
            </button>
            <button onClick={reset} className="btn-secondary py-2 px-4 text-sm">
              <RotateCcw size={16} className="mr-1.5" /> Reset
            </button>
          </>
        )}
      </div>
    </div>
  );
}
