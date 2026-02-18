'use client';

import dynamic from 'next/dynamic';

const toolComponents: Record<string, React.ComponentType> = {
  WordCounter: dynamic(() => import('./tools/WordCounter')),
  JsonFormatter: dynamic(() => import('./tools/JsonFormatter')),
  PasswordGenerator: dynamic(() => import('./tools/PasswordGenerator')),
  TokenCounter: dynamic(() => import('./tools/TokenCounter')),
  PromptOptimizer: dynamic(() => import('./tools/PromptOptimizer')),
  AiCostCalculator: dynamic(() => import('./tools/AiCostCalculator')),
  MetaTagGenerator: dynamic(() => import('./tools/MetaTagGenerator')),
  ReadabilityChecker: dynamic(() => import('./tools/ReadabilityChecker')),
  MarkdownToHtml: dynamic(() => import('./tools/MarkdownToHtml')),
  RegexTester: dynamic(() => import('./tools/RegexTester')),
};

interface ToolRunnerProps {
  componentName: string;
}

export default function ToolRunner({ componentName }: ToolRunnerProps) {
  const Component = toolComponents[componentName];

  if (!Component) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        Tool not available. Please try again later.
      </div>
    );
  }

  return <Component />;
}
