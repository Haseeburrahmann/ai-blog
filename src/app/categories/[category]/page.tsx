'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Star, Filter, Grid3X3, List } from 'lucide-react';
import AdSenseAd from '@/components/AdSenseAd';

interface AITool {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string;
  logo: string;
  category: string;
  pricing: {
    model: string;
    hasFreeTier: boolean;
    startingPrice?: number;
  };
  rating: {
    overall: number;
  };
  tags: string[];
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

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  const categoryName = categorySlug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  const [tools, setTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceFilter, setPriceFilter] = useState<string>('all');

  useEffect(() => {
    fetchTools();
  }, [categoryName]);

  const fetchTools = async () => {
    try {
      const response = await fetch(`/api/tools?category=${encodeURIComponent(categoryName)}&limit=50`);
      const data = await response.json();
      if (data.success) {
        setTools(data.tools);
      }
    } catch (error) {
      console.error('Error fetching tools:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTools = tools.filter(tool => {
    if (priceFilter === 'free') return tool.pricing.model === 'free' || tool.pricing.hasFreeTier;
    if (priceFilter === 'paid') return tool.pricing.model === 'paid' || tool.pricing.model === 'enterprise';
    return true;
  });

  const getPricingBadge = (pricing: { model: string; hasFreeTier: boolean }) => {
    if (pricing.model === 'free') return { text: 'Free', class: 'bg-green-100 text-green-800' };
    if (pricing.hasFreeTier) return { text: 'Freemium', class: 'bg-blue-100 text-blue-800' };
    return { text: 'Paid', class: 'bg-purple-100 text-purple-800' };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            href="/categories" 
            className="inline-flex items-center text-gray-500 hover:text-indigo-600 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            All Categories
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{categoryIcons[categoryName] || '🤖'}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{categoryName} AI Tools</h1>
              <p className="text-gray-600 mt-1">
                {tools.length} {tools.length === 1 ? 'tool' : 'tools'} found
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & View Toggle */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">All Prices</option>
                <option value="free">Free / Freemium</option>
                <option value="paid">Paid Only</option>
              </select>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid/List */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`card animate-pulse bg-gray-200 ${viewMode === 'list' ? 'h-32' : 'h-64'}`} />
              ))}
            </div>
          ) : filteredTools.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No tools found matching your criteria.</p>
              <button
                onClick={() => setPriceFilter('all')}
                className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredTools.map((tool) => (
                  <Link
                    key={tool._id}
                    href={`/tools/${tool.slug}`}
                    className={`card card-hover group ${viewMode === 'list' ? 'flex items-center p-4 gap-4' : ''}`}
                  >
                    <img
                      src={tool.logo}
                      alt={tool.name}
                      className={`object-cover rounded-lg ${viewMode === 'list' ? 'w-16 h-16' : 'w-full h-48 mb-4'}`}
                    />
                    <div className={viewMode === 'list' ? 'flex-1' : 'p-6'}>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`font-bold text-gray-900 group-hover:text-indigo-600 transition-colors ${viewMode === 'list' ? 'text-lg' : 'text-xl'}`}>
                          {tool.name}
                        </h3>
                        <span className={`badge ${getPricingBadge(tool.pricing).class} text-xs whitespace-nowrap ml-2`}>
                          {getPricingBadge(tool.pricing).text}
                        </span>
                      </div>
                      <p className={`text-gray-600 mb-4 ${viewMode === 'list' ? 'line-clamp-1 text-sm' : 'line-clamp-2'}`}>
                        {tool.shortDescription}
                      </p>
                      {viewMode === 'grid' && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {tool.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="font-medium">{tool.rating.overall.toFixed(1)}</span>
                        </div>
                        {tool.pricing.startingPrice && (
                          <span className="text-sm text-gray-500">
                            From ${tool.pricing.startingPrice}/mo
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Ad Banner */}
              <div className="mt-12 flex justify-center">
                <AdSenseAd format="leaderboard" className="w-full max-w-[728px]" />
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
