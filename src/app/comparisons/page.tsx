'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Scale, ArrowRight, Swords } from 'lucide-react';

interface Comparison {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  tools: { tool: { name: string; logo: string } }[];
}

export default function ComparisonsPage() {
  const [comparisons, setComparisons] = useState<Comparison[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComparisons();
  }, []);

  const fetchComparisons = async () => {
    try {
      const response = await fetch('/api/comparisons');
      const data = await response.json();
      if (data.success) {
        setComparisons(data.comparisons);
      }
    } catch (error) {
      console.error('Error fetching comparisons:', error);
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
            <Scale className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">AI Tool Comparisons</h1>
          </div>
          <p className="text-gray-600 max-w-2xl">
            Side-by-side comparisons of popular AI tools. We break down features, pricing, 
            and use cases to help you choose the right tool for your needs.
          </p>
        </div>
      </section>

      {/* Comparisons Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card h-64 animate-pulse bg-gray-200" />
              ))}
            </div>
          ) : comparisons.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                <Swords className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">No Comparisons Yet</h2>
              <p className="text-gray-600 mb-4">We're working on detailed comparisons for you.</p>
              <Link href="/categories" className="btn-primary">
                Browse Tools
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comparisons.map((comparison) => (
                <Link
                  key={comparison._id}
                  href={`/comparisons/${comparison.slug}`}
                  className="card card-hover group"
                >
                  <div className="p-6">
                    {/* Tool Logos */}
                    <div className="flex items-center justify-center gap-4 mb-6">
                      {comparison.tools.map((t, i) => (
                        <div key={i} className="flex items-center">
                          <img
                            src={t.tool.logo}
                            alt={t.tool.name}
                            className="w-14 h-14 rounded-xl object-cover shadow-md"
                          />
                          {i === 0 && comparison.tools.length > 1 && (
                            <div className="mx-3 px-3 py-1 bg-gray-100 rounded-full text-sm font-bold text-gray-600">
                              VS
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 text-center mb-2 group-hover:text-indigo-600 transition-colors">
                      {comparison.title}
                    </h2>
                    <p className="text-gray-600 text-sm text-center mb-4 line-clamp-2">
                      {comparison.description}
                    </p>
                    
                    <div className="flex items-center justify-center text-indigo-600 font-medium">
                      Read Comparison
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
