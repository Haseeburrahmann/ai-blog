'use client';

import { useState } from 'react';
import { BookOpen, BarChart3 } from 'lucide-react';

function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

function analyze(text: string) {
  if (!text.trim()) return null;

  const words = text.trim().split(/\s+/).filter((w) => w.length > 0);
  const wordCount = words.length;
  if (wordCount === 0) return null;

  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const sentenceCount = Math.max(sentences.length, 1);
  const syllableCount = words.reduce((sum, w) => sum + countSyllables(w), 0);
  const complexWords = words.filter((w) => countSyllables(w) >= 3).length;
  const avgWordsPerSentence = wordCount / sentenceCount;
  const avgSyllablesPerWord = syllableCount / wordCount;

  const fleschEase = 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;
  const fleschKincaid = 0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59;
  const gunningFog = 0.4 * (avgWordsPerSentence + 100 * (complexWords / wordCount));
  const avgLettersPer100 = (text.replace(/[^a-zA-Z]/g, '').length / wordCount) * 100;
  const avgSentencesPer100 = (sentenceCount / wordCount) * 100;
  const colemanLiau = 0.0588 * avgLettersPer100 - 0.296 * avgSentencesPer100 - 15.8;

  return {
    wordCount,
    sentenceCount,
    syllableCount,
    complexWords,
    avgWordsPerSentence: avgWordsPerSentence.toFixed(1),
    fleschEase: Math.min(100, Math.max(0, fleschEase)).toFixed(1),
    fleschKincaid: Math.max(0, fleschKincaid).toFixed(1),
    gunningFog: Math.max(0, gunningFog).toFixed(1),
    colemanLiau: Math.max(0, colemanLiau).toFixed(1),
  };
}

function getReadabilityLevel(score: number): { label: string; color: string } {
  if (score >= 80) return { label: 'Very Easy', color: 'text-emerald-500' };
  if (score >= 60) return { label: 'Easy', color: 'text-green-500' };
  if (score >= 40) return { label: 'Moderate', color: 'text-amber-500' };
  if (score >= 20) return { label: 'Difficult', color: 'text-orange-500' };
  return { label: 'Very Difficult', color: 'text-red-500' };
}

function getGradeAudience(grade: number): string {
  if (grade <= 6) return 'General public, easy to read';
  if (grade <= 8) return '13-15 year olds, conversational';
  if (grade <= 10) return 'High school students';
  if (grade <= 12) return 'College entry level';
  if (grade <= 16) return 'College graduate level';
  return 'Professional / academic';
}

export default function ReadabilityChecker() {
  const [text, setText] = useState('');
  const result = analyze(text);

  return (
    <div className="space-y-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here to check its readability..."
        className="w-full h-48 p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y text-base"
      />

      {result && (
        <>
          <div className="card p-6 text-center">
            <BookOpen size={24} className="mx-auto mb-2 text-indigo-500" />
            <p className="text-4xl font-bold text-gray-900 dark:text-white">{result.fleschEase}</p>
            <p className={`text-lg font-medium ${getReadabilityLevel(Number(result.fleschEase)).color}`}>
              {getReadabilityLevel(Number(result.fleschEase)).label}
            </p>
            <p className="text-sm text-gray-500 mt-1">Flesch Reading Ease Score</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="card p-4 text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{result.wordCount}</p>
              <p className="text-xs text-gray-500 mt-1">Words</p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{result.sentenceCount}</p>
              <p className="text-xs text-gray-500 mt-1">Sentences</p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{result.avgWordsPerSentence}</p>
              <p className="text-xs text-gray-500 mt-1">Words/Sentence</p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{result.complexWords}</p>
              <p className="text-xs text-gray-500 mt-1">Complex Words</p>
            </div>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              <BarChart3 size={16} /> Readability Scores
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Flesch-Kincaid Grade', value: result.fleschKincaid },
                { name: 'Gunning Fog Index', value: result.gunningFog },
                { name: 'Coleman-Liau Index', value: result.colemanLiau },
              ].map((s) => (
                <div key={s.name} className="card p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{s.name}</p>
                    <p className="text-xs text-gray-500">{getGradeAudience(Number(s.value))}</p>
                  </div>
                  <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

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
