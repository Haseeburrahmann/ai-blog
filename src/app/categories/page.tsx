'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Layers, Star } from 'lucide-react';

interface Category {
  name: string;
  count: number;
  topTools: {
    _id: string;
    name: string;
    slug: string;
    logo: string;
    rating: { overall: number };
    pricing: { model: string };
  }[];
}

const categoryIcons: Record<string, string> = {
  'Writing': '✍️',
  'Coding': '💻',
  'Image': '🎨',
  'Video': '🎬',
  'Audio': '🎵',
  'Chatbot': '💬',
  'Automation': '⚡',
  'Productivity': '📊',
  'Design': '🎭',
  'Marketing': '📈',
  'Research': '🔍',
  'Customer Support': '🎧',
};

const categoryDescriptions: Record<string, string> = {
  'Writing': 'AI writing assistants, content generators, and copywriting tools',
  'Coding': 'AI code completion, debugging, and development assistants',
  'Image': 'AI image generators, editors, and design tools',
  'Video': 'AI video creation, editing, and generation platforms',
  'Audio': 'AI voice synthesis, music generation, and audio editing',
  'Chatbot': 'AI chatbots and conversational AI platforms',
  'Automation': 'AI workflow automation and process optimization',
  'Productivity': 'AI tools for task management and productivity enhancement',
  'Design': 'AI-powered design and creative tools',
  'Marketing': 'AI marketing tools for campaigns and analytics',
  'Research': 'AI research assistants and data analysis tools',
  'Customer Support': 'AI customer service and support solutions',
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-4">
            <Layers className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">AI Tool Categories</h1>
          </div>
          <p className="text-gray-600 max-w-2xl">
            Browse AI tools by category. Find the perfect solution for your specific needs, 
            from writing and coding to video creation and automation.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card h-80 animate-pulse bg-gray-200" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div key={category.name} className="card card-hover">
                  <div className="p-6">
                    {/* Category Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">{categoryIcons[category.name] || '🤖'}</span>
                        <div>
                          <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
                          <p className="text-sm text-gray-500">{category.count} tools</p>
                        </div>
                      </div>
                      <Link
                        href={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center gap-1"
                      >
                        View All
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-6">
                      {categoryDescriptions[category.name] || `AI tools for ${category.name.toLowerCase()}`}
                    </p>

                    {/* Top Tools */}
                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                        Top Rated
                      </p>
                      {category.topTools.map((tool) => (
                        <Link
                          key={tool._id}
                          href={`/tools/${tool.slug}`}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                        >
                          <img
                            src={tool.logo}
                            alt={tool.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
                              {tool.name}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                {tool.rating.overall.toFixed(1)}
                              </span>
                              <span>•</span>
                              <span className="capitalize">{tool.pricing.model}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
