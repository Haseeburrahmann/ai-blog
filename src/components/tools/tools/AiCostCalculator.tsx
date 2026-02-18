'use client';

import { useState } from 'react';
import { DollarSign, Calculator } from 'lucide-react';

interface Model {
  name: string;
  provider: string;
  inputPer1M: number;
  outputPer1M: number;
}

const MODELS: Model[] = [
  { name: 'GPT-4o', provider: 'OpenAI', inputPer1M: 2.50, outputPer1M: 10.00 },
  { name: 'GPT-4o mini', provider: 'OpenAI', inputPer1M: 0.15, outputPer1M: 0.60 },
  { name: 'GPT-4 Turbo', provider: 'OpenAI', inputPer1M: 10.00, outputPer1M: 30.00 },
  { name: 'Claude Opus 4', provider: 'Anthropic', inputPer1M: 15.00, outputPer1M: 75.00 },
  { name: 'Claude Sonnet 4', provider: 'Anthropic', inputPer1M: 3.00, outputPer1M: 15.00 },
  { name: 'Claude Haiku 3.5', provider: 'Anthropic', inputPer1M: 0.80, outputPer1M: 4.00 },
  { name: 'Gemini 2.0 Flash', provider: 'Google', inputPer1M: 0.10, outputPer1M: 0.40 },
  { name: 'Gemini 1.5 Pro', provider: 'Google', inputPer1M: 1.25, outputPer1M: 5.00 },
];

export default function AiCostCalculator() {
  const [inputTokens, setInputTokens] = useState(1000);
  const [outputTokens, setOutputTokens] = useState(500);
  const [requestsPerDay, setRequestsPerDay] = useState(100);

  const calculate = (model: Model) => {
    const inputCost = (inputTokens / 1_000_000) * model.inputPer1M;
    const outputCost = (outputTokens / 1_000_000) * model.outputPer1M;
    const perRequest = inputCost + outputCost;
    const daily = perRequest * requestsPerDay;
    const monthly = daily * 30;
    return { perRequest, daily, monthly };
  };

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Input Tokens / Request
          </label>
          <input
            type="number"
            value={inputTokens}
            onChange={(e) => setInputTokens(Math.max(0, Number(e.target.value)))}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Output Tokens / Request
          </label>
          <input
            type="number"
            value={outputTokens}
            onChange={(e) => setOutputTokens(Math.max(0, Number(e.target.value)))}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Requests / Day
          </label>
          <input
            type="number"
            value={requestsPerDay}
            onChange={(e) => setRequestsPerDay(Math.max(0, Number(e.target.value)))}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Model</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Provider</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Per Request</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Daily</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Monthly</th>
            </tr>
          </thead>
          <tbody>
            {MODELS.map((model) => {
              const costs = calculate(model);
              return (
                <tr key={model.name} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                  <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{model.name}</td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{model.provider}</td>
                  <td className="py-3 px-4 text-right text-gray-700 dark:text-gray-300">
                    ${costs.perRequest < 0.01 ? costs.perRequest.toFixed(6) : costs.perRequest.toFixed(4)}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-700 dark:text-gray-300">
                    ${costs.daily.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-900 dark:text-white">
                    <span className="inline-flex items-center gap-1">
                      <DollarSign size={14} className="text-indigo-500" />
                      {costs.monthly.toFixed(2)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calculator size={16} className="text-emerald-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Cheapest Option</span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {MODELS.reduce((min, m) => calculate(m).monthly < calculate(min).monthly ? m : min, MODELS[0]).name}
          </p>
          <p className="text-xs text-gray-500">
            ${calculate(MODELS.reduce((min, m) => calculate(m).monthly < calculate(min).monthly ? m : min, MODELS[0])).monthly.toFixed(2)}/month
          </p>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={16} className="text-amber-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Most Expensive</span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {MODELS.reduce((max, m) => calculate(m).monthly > calculate(max).monthly ? m : max, MODELS[0]).name}
          </p>
          <p className="text-xs text-gray-500">
            ${calculate(MODELS.reduce((max, m) => calculate(m).monthly > calculate(max).monthly ? m : max, MODELS[0])).monthly.toFixed(2)}/month
          </p>
        </div>
      </div>

      <p className="text-xs text-gray-400 italic">
        Prices based on publicly available API pricing as of 2025. Actual costs may vary.
      </p>
    </div>
  );
}
