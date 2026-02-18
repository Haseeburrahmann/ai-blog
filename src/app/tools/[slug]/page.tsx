'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Star, ExternalLink, Check, X, Zap, Users, DollarSign, Award, Sparkles } from 'lucide-react';
import AdSenseAd from '@/components/AdSenseAd';

interface AITool {
  _id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  websiteUrl: string;
  affiliateUrl?: string;
  category: string;
  pricing: {
    model: string;
    startingPrice?: number;
    priceUnit?: string;
    hasFreeTier: boolean;
    hasTrial: boolean;
  };
  rating: {
    overall: number;
    easeOfUse: number;
    features: number;
    value: number;
    support: number;
    reviewCount: number;
  };
  features: string[];
  useCases: string[];
  integrations: string[];
  tags: string[];
}

export default function ToolDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [tool, setTool] = useState<AITool | null>(null);
  const [loading, setLoading] = useState(true);
  const [alternatives, setAlternatives] = useState<AITool[]>([]);

  useEffect(() => {
    if (slug) {
      fetchTool();
    }
  }, [slug]);

  const fetchTool = async () => {
    try {
      const response = await fetch(`/api/tools/${slug}`);
      const data = await response.json();
      if (data.success) {
        setTool(data.tool);
        // Fetch alternatives from the same category
        const altResponse = await fetch(`/api/tools?category=${encodeURIComponent(data.tool.category)}&limit=4`);
        const altData = await altResponse.json();
        if (altData.success) {
          setAlternatives(altData.tools.filter((t: AITool) => t.slug !== slug).slice(0, 3));
        }
      }
    } catch (error) {
      console.error('Error fetching tool:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPricingBadge = (pricing: { model: string; hasFreeTier: boolean }) => {
    if (pricing.model === 'free') return { text: 'Free', class: 'bg-green-100 text-green-800' };
    if (pricing.hasFreeTier) return { text: 'Freemium', class: 'bg-blue-100 text-blue-800' };
    return { text: 'Paid', class: 'bg-purple-100 text-purple-800' };
  };

  const getRatingLabel = (rating: number) => {
    if (rating >= 4.5) return 'Excellent';
    if (rating >= 4.0) return 'Very Good';
    if (rating >= 3.5) return 'Good';
    if (rating >= 3.0) return 'Average';
    return 'Below Average';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 w-32 bg-gray-200 rounded mb-8" />
            <div className="flex items-center gap-4 mb-8">
              <div className="w-24 h-24 bg-gray-200 rounded-xl" />
              <div>
                <div className="h-8 w-64 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-48 bg-gray-200 rounded" />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-32 bg-gray-200 rounded-xl" />
                <div className="h-64 bg-gray-200 rounded-xl" />
              </div>
              <div className="h-96 bg-gray-200 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Tool Not Found</h1>
          <p className="text-gray-600 mb-4">The AI tool you're looking for doesn't exist.</p>
          <Link href="/categories" className="btn-primary">
            Browse All Tools
          </Link>
        </div>
      </div>
    );
  }

  const pricingBadge = getPricingBadge(tool.pricing);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            href={`/categories/${tool.category.toLowerCase().replace(/\s+/g, '-')}`}
            className="inline-flex items-center text-gray-500 hover:text-indigo-600 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            {tool.category}
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <img
              src={tool.logo}
              alt={tool.name}
              className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover shadow-lg"
            />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className={`badge ${pricingBadge.class}`}>{pricingBadge.text}</span>
                {tool.pricing.hasTrial && (
                  <span className="badge bg-amber-100 text-amber-800 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Free Trial
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{tool.name}</h1>
              <p className="text-gray-600 text-lg max-w-2xl">{tool.description}</p>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <a
                href={tool.affiliateUrl || tool.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-center"
              >
                Visit Website
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
              {tool.pricing.hasFreeTier && (
                <p className="text-sm text-green-600 text-center font-medium">
                  Free plan available
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Rating Card */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Star className="w-6 h-6 text-yellow-500" />
                    Our Rating
                  </h2>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900">{tool.rating.overall.toFixed(1)}<span className="text-lg text-gray-400">/5</span></div>
                    <div className="text-sm text-gray-500">{getRatingLabel(tool.rating.overall)}</div>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Ease of Use', value: tool.rating.easeOfUse },
                    { label: 'Features', value: tool.rating.features },
                    { label: 'Value for Money', value: tool.rating.value },
                    { label: 'Support', value: tool.rating.support },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">{item.label}</span>
                        <span className="font-medium">{item.value.toFixed(1)}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                          style={{ width: `${(item.value / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="card p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-indigo-500" />
                  Key Features
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tool.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Use Cases */}
              <div className="card p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-6 h-6 text-purple-500" />
                  Best For
                </h2>
                <ul className="space-y-3">
                  {tool.useCases.map((useCase, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium">
                        {i + 1}
                      </div>
                      <span className="text-gray-700">{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ad Banner */}
              <div className="flex justify-center py-4">
                <AdSenseAd format="rectangle" className="w-full max-w-[336px]" />
              </div>

              {/* Integrations */}
              {tool.integrations.length > 0 && (
                <div className="card p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Integrations</h2>
                  <div className="flex flex-wrap gap-2">
                    {tool.integrations.map((integration, i) => (
                      <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {integration}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <div className="card p-6">
                <h3 className="font-bold text-gray-900 mb-4">Quick Info</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Category</span>
                    <Link 
                      href={`/categories/${tool.category.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      {tool.category}
                    </Link>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Pricing</span>
                    <span className="capitalize font-medium">{tool.pricing.model}</span>
                  </div>
                  {tool.pricing.startingPrice && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Starting Price</span>
                      <span className="font-medium">${tool.pricing.startingPrice}/{tool.pricing.priceUnit || 'mo'}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Free Trial</span>
                    <span className={tool.pricing.hasTrial ? 'text-green-600' : 'text-red-500'}>
                      {tool.pricing.hasTrial ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Free Plan</span>
                    <span className={tool.pricing.hasFreeTier ? 'text-green-600' : 'text-red-500'}>
                      {tool.pricing.hasFreeTier ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="card p-6">
                <h3 className="font-bold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag, i) => (
                    <span key={i} className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="card p-6 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
                <h3 className="font-bold text-lg mb-2">Try {tool.name} Free</h3>
                <p className="text-indigo-100 text-sm mb-4">
                  {tool.pricing.hasFreeTier 
                    ? 'Start using the free plan today, no credit card required.'
                    : tool.pricing.hasTrial 
                      ? 'Start your free trial and test all features.'
                      : 'Visit the website to learn more and get started.'}
                </p>
                <a
                  href={tool.affiliateUrl || tool.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-white text-indigo-600 text-center py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Get Started
                </a>
              </div>

              {/* Ad */}
              <AdSenseAd format="rectangle" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Alternatives */}
      {alternatives.length > 0 && (
        <section className="py-8 bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Best Alternatives</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {alternatives.map((alt) => (
                <Link
                  key={alt._id}
                  href={`/tools/${alt.slug}`}
                  className="card card-hover p-6"
                >
                  <img src={alt.logo} alt={alt.name} className="w-12 h-12 rounded-lg mb-4" />
                  <h3 className="font-bold text-gray-900 mb-1">{alt.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{alt.description}</p>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium">{alt.rating.overall.toFixed(1)}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-500 capitalize">{alt.pricing.model}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
