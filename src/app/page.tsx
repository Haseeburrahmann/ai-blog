'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Star, TrendingUp, Zap } from 'lucide-react';
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
  };
  rating: {
    overall: number;
  };
}

const categories = [
  { name: 'Writing', icon: '✍️', count: 45 },
  { name: 'Coding', icon: '💻', count: 32 },
  { name: 'Image', icon: '🎨', count: 28 },
  { name: 'Video', icon: '🎬', count: 24 },
  { name: 'Audio', icon: '🎵', count: 18 },
  { name: 'Chatbot', icon: '💬', count: 15 },
  { name: 'Automation', icon: '⚡', count: 22 },
  { name: 'Productivity', icon: '📊', count: 35 },
  { name: 'Design', icon: '🎭', count: 20 },
  { name: 'Marketing', icon: '📈', count: 26 },
  { name: 'Research', icon: '🔍', count: 14 },
  { name: 'Customer Support', icon: '🎧', count: 16 },
];

export default function HomePage() {
  const [featuredTools, setFeaturedTools] = useState<AITool[]>([]);
  const [trendingTools, setTrendingTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const [featuredRes, trendingRes] = await Promise.all([
        fetch('/api/tools?featured=true&limit=4'),
        fetch('/api/tools?trending=true&limit=4'),
      ]);

      const featuredData = await featuredRes.json();
      const trendingData = await trendingRes.json();

      if (featuredData.success) setFeaturedTools(featuredData.tools);
      if (trendingData.success) setTrendingTools(trendingData.tools);
    } catch (error) {
      console.error('Error fetching tools:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Writing': 'bg-blue-100 text-blue-800',
      'Coding': 'bg-purple-100 text-purple-800',
      'Image': 'bg-pink-100 text-pink-800',
      'Video': 'bg-red-100 text-red-800',
      'Audio': 'bg-yellow-100 text-yellow-800',
      'Chatbot': 'bg-green-100 text-green-800',
      'Automation': 'bg-orange-100 text-orange-800',
      'Productivity': 'bg-teal-100 text-teal-800',
      'Design': 'bg-indigo-100 text-indigo-800',
      'Marketing': 'bg-cyan-100 text-cyan-800',
      'Research': 'bg-gray-100 text-gray-800',
      'Customer Support': 'bg-lime-100 text-lime-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getPricingBadge = (pricing: { model: string; hasFreeTier: boolean }) => {
    if (pricing.model === 'free') return { text: 'Free', class: 'bg-green-100 text-green-800' };
    if (pricing.hasFreeTier) return { text: 'Freemium', class: 'bg-blue-100 text-blue-800' };
    return { text: 'Paid', class: 'bg-purple-100 text-purple-800' };
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium">Discover 300+ AI Tools</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Find the Perfect{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                AI Tool
              </span>{' '}
              for Your Needs
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
              Compare AI tools for writing, coding, image generation, video creation, and more. 
              Expert reviews, side-by-side comparisons, and exclusive deals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/categories" className="btn-primary bg-white text-indigo-900 hover:bg-gray-100 w-full sm:w-auto">
                Browse All Tools
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link href="/comparisons" className="btn-secondary bg-white/10 text-white border-white/20 hover:bg-white/20 w-full sm:w-auto">
                Compare Tools
              </Link>
            </div>
          </div>
        </div>
        
        {/* Stats Bar */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '300+', label: 'AI Tools' },
              { value: '12', label: 'Categories' },
              { value: '50+', label: 'Comparisons' },
              { value: '10K+', label: 'Monthly Users' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-indigo-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore AI tools organized by use case. Find exactly what you need.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group p-6 rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all bg-white"
              >
                <div className="text-3xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">{category.count} tools</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Star className="w-7 h-7 text-yellow-500" />
                Featured Tools
              </h2>
              <p className="text-gray-600 mt-2">Hand-picked best AI tools in each category</p>
            </div>
            <Link href="/categories" className="hidden md:flex items-center text-indigo-600 hover:text-indigo-700 font-medium">
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="card h-64 animate-pulse bg-gray-200" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredTools.map((tool) => (
                <Link key={tool._id} href={`/tools/${tool.slug}`} className="card card-hover group">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <img src={tool.logo} alt={tool.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div className={`badge ${getCategoryColor(tool.category)}`}>
                        {tool.category}
                      </div>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{tool.shortDescription}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-medium">{tool.rating.overall.toFixed(1)}</span>
                      </div>
                      <span className={`badge ${getPricingBadge(tool.pricing).class} text-xs`}>
                        {getPricingBadge(tool.pricing).text}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Ad Banner */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <AdSenseAd format="leaderboard" className="w-full max-w-[728px]" />
          </div>
        </div>
      </section>

      {/* Trending Tools */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-7 h-7 text-red-500" />
                Trending Now
              </h2>
              <p className="text-gray-600 mt-2">Most popular AI tools this month</p>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="card h-64 animate-pulse bg-gray-200" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingTools.map((tool) => (
                <Link key={tool._id} href={`/tools/${tool.slug}`} className="card card-hover group">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <img src={tool.logo} alt={tool.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div className={`badge ${getCategoryColor(tool.category)}`}>
                        {tool.category}
                      </div>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{tool.shortDescription}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-medium">{tool.rating.overall.toFixed(1)}</span>
                      </div>
                      <span className={`badge ${getPricingBadge(tool.pricing).class} text-xs`}>
                        {getPricingBadge(tool.pricing).text}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose MindfulBlogAI?</h2>
            <p className="text-indigo-200 max-w-2xl mx-auto">
              We help you find the right AI tools without the guesswork.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Expert Reviews',
                description: 'In-depth analysis of features, pricing, and real-world performance.',
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: 'Side-by-Side Comparisons',
                description: 'Compare multiple tools easily to find your perfect match.',
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: 'Exclusive Deals',
                description: 'Get special discounts and extended trials through our partnerships.',
              },
            ].map((feature, i) => (
              <div key={i} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-indigo-200">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-8">
            Get weekly AI tool recommendations, exclusive deals, and industry insights.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
}
