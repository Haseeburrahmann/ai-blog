'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface AITool {
  _id: string
  name: string
  slug: string
  description: string
  category: string
  website: string
  pricing: {
    type: 'Free' | 'Freemium' | 'Paid' | 'Enterprise'
    startingPrice?: number
    currency: string
    billingCycle?: string
  }
  rating: {
    overall: number
  }
  isFeatured: boolean
}

export default function ToolsListing() {
  const [tools, setTools] = useState<AITool[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedPricing, setSelectedPricing] = useState<string>('All')

  const categories = [
    'All', 'Writing & Content', 'Image Generation', 'Video & Audio', 
    'Code & Development', 'Business & Productivity', 'Data Analysis',
    'Marketing & SEO', 'Design & Creative', 'Research & Education', 
    'Customer Service', 'Other'
  ]

  const pricingTypes = ['All', 'Free', 'Freemium', 'Paid', 'Enterprise']

  useEffect(() => {
    fetchTools()
  }, [])

  const fetchTools = async () => {
    try {
      const response = await fetch('/api/tools')
      const data = await response.json()
      
      if (data.success) {
        setTools(data.tools)
      }
    } catch (error) {
      console.error('Error fetching tools:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredTools = tools.filter(tool => {
    const categoryMatch = selectedCategory === 'All' || tool.category === selectedCategory
    const pricingMatch = selectedPricing === 'All' || tool.pricing.type === selectedPricing
    return categoryMatch && pricingMatch
  })

  const featuredTools = filteredTools.filter(tool => tool.isFeatured)
  const regularTools = filteredTools.filter(tool => !tool.isFeatured)

  const getPricingColor = (type: string) => {
    const colors = {
      'Free': 'bg-green-100 text-green-800',
      'Freemium': 'bg-blue-100 text-blue-800',
      'Paid': 'bg-orange-100 text-orange-800',
      'Enterprise': 'bg-purple-100 text-purple-800'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const formatPrice = (pricing: AITool['pricing']) => {
    if (pricing.type === 'Free') return 'Free'
    if (pricing.type === 'Enterprise') return 'Enterprise'
    if (pricing.startingPrice) {
      const cycle = pricing.billingCycle === 'yearly' ? '/year' : pricing.billingCycle === 'monthly' ? '/month' : ''
      return `$${pricing.startingPrice}${cycle}`
    }
    return pricing.type
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading AI tools...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">AI Insights</h1>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-500 hover:text-gray-900">Home</Link>
              <Link href="/blog" className="text-gray-500 hover:text-gray-900">Blog</Link>
              <Link href="/tools" className="text-blue-600 font-medium">AI Tools</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            AI Tools Directory
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the best AI tools to boost your productivity, creativity, and workflow. 
            Curated reviews and recommendations from our experts.
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Pricing Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Pricing</label>
              <div className="flex flex-wrap gap-2">
                {pricingTypes.map((pricing) => (
                  <button
                    key={pricing}
                    onClick={() => setSelectedPricing(pricing)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedPricing === pricing
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {pricing}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Featured Tools */}
        {featuredTools.length > 0 && (
          <section className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Featured Tools</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredTools.map((tool) => (
                <div
                  key={tool._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border-2 border-yellow-200"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 mb-2">
                          <Link 
                            href={`/tools/${tool.slug}`}
                            className="hover:text-blue-600 transition-colors"
                          >
                            {tool.name}
                          </Link>
                        </h4>
                        <p className="text-gray-600 text-sm mb-3">{tool.description}</p>
                      </div>
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                        Featured
                      </span>
                    </div>

                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {renderStars(tool.rating.overall)}
                        <span className="ml-2 text-sm text-gray-600">
                          {tool.rating.overall.toFixed(1)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPricingColor(tool.pricing.type)}`}>
                        {formatPrice(tool.pricing)}
                      </span>
                      <a
                        href={tool.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Visit Tool →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All Tools */}
        {filteredTools.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tools found</h3>
            <p className="text-gray-600">
              Try adjusting your filters or check back soon for new AI tools.
            </p>
          </div>
        ) : (
          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              All Tools ({filteredTools.length})
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {regularTools.map((tool) => (
                <div
                  key={tool._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="mb-4">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">
                        <Link 
                          href={`/tools/${tool.slug}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {tool.name}
                        </Link>
                      </h4>
                      <p className="text-gray-600 text-sm mb-3">{tool.description}</p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {tool.category}
                      </span>
                    </div>

                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {renderStars(tool.rating.overall)}
                        <span className="ml-2 text-sm text-gray-600">
                          {tool.rating.overall.toFixed(1)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPricingColor(tool.pricing.type)}`}>
                        {formatPrice(tool.pricing)}
                      </span>
                      <a
                        href={tool.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Visit Tool →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}