'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import SimpleAdSenseAd from '@/components/SimpleAdSenseAd'

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
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'newest'>('rating')
  const [currentPage, setCurrentPage] = useState(1)
  const toolsPerPage = 12

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

  const filteredAndSortedTools = () => {
    const filtered = tools.filter(tool => {
      const categoryMatch = selectedCategory === 'All' || tool.category === selectedCategory
      const pricingMatch = selectedPricing === 'All' || tool.pricing.type === selectedPricing
      const searchMatch = searchQuery === '' || 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase())
      
      return categoryMatch && pricingMatch && searchMatch
    })

    // Sort tools
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'rating':
          return b.rating.overall - a.rating.overall
        case 'newest':
          return b.isFeatured ? 1 : -1 // Featured first, then by order
        default:
          return 0
      }
    })

    return filtered
  }

  const allFilteredTools = filteredAndSortedTools()
  const featuredTools = allFilteredTools.filter(tool => tool.isFeatured)

  // Pagination
  const totalPages = Math.ceil(allFilteredTools.length / toolsPerPage)
  const startIndex = (currentPage - 1) * toolsPerPage
  const currentTools = allFilteredTools.slice(startIndex, startIndex + toolsPerPage)

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

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handlePricingChange = (pricing: string) => {
    setSelectedPricing(pricing)
    setCurrentPage(1)
  }

  const handleSortChange = (sort: 'name' | 'rating' | 'newest') => {
    setSortBy(sort)
    setCurrentPage(1)
  }

  const generatePageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    return pages
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
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
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-blue-900 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            AI Tools Directory
          </h1>
          <p className="text-lg sm:text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            Discover the best AI tools to boost your productivity, creativity, and workflow. 
            Curated reviews and recommendations from our experts.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-green-200 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              {tools.length}+ Tools Reviewed
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Expert Ratings
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Updated Daily
            </div>
          </div>
        </div>
      </section>

      {/* AdSense Ad - Leaderboard */}
      <div className="bg-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SimpleAdSenseAd
            width={728}
            height={90}
            format="leaderboard"
            className="mx-auto"
          />
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-6">
            {/* Search and Sort Row */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Tools</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by name, description, or category..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Sort */}
              <div className="lg:w-48">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value as 'name' | 'rating' | 'newest')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name (A-Z)</option>
                  <option value="newest">Featured First</option>
                </select>
              </div>
            </div>

            {/* Filter Row */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
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
                      onClick={() => handlePricingChange(pricing)}
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

            {/* Results Summary */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                <p>Showing {currentTools.length} of {allFilteredTools.length} tools</p>
                {searchQuery && (
                  <p className="text-blue-600">Results for: &quot;{searchQuery}&quot;</p>
                )}
              </div>
              
              {(searchQuery || selectedCategory !== 'All' || selectedPricing !== 'All') && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('All')
                    setSelectedPricing('All')
                    setCurrentPage(1)
                  }}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Featured Tools */}
        {featuredTools.length > 0 && currentPage === 1 && !searchQuery && selectedCategory === 'All' && selectedPricing === 'All' && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full mr-3">
                Featured
              </span>
              Top Picks
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredTools.slice(0, 6).map((tool, index) => (
                <div key={tool._id}>
                  {index === 3 && (
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 hidden lg:block">
                      <SimpleAdSenseAd
                        width={300}
                        height={250}
                        format="rectangle"
                        className="mx-auto"
                      />
                    </div>
                  )}
                  
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-2 border-yellow-200">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-2">
                            <Link 
                              href={`/tools/${tool.slug}`}
                              className="hover:text-blue-600 transition-colors"
                            >
                              {tool.name}
                            </Link>
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{tool.description}</p>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mb-3">
                            {tool.category}
                          </span>
                        </div>
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full ml-2 flex-shrink-0">
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
                        <div className="flex gap-2">
                          <Link
                            href={`/tools/${tool.slug}`}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Review →
                          </Link>
                          <a
                            href={tool.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-800 text-sm font-medium"
                          >
                            Visit →
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All Tools */}
        {allFilteredTools.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery 
                ? `No tools found for "${searchQuery}"` 
                : 'No tools found with current filters'
              }
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filters, or check back soon for new AI tools.
            </p>
            {(searchQuery || selectedCategory !== 'All' || selectedPricing !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('All')
                  setSelectedPricing('All')
                  setCurrentPage(1)
                }}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {searchQuery ? 'Search Results' : selectedCategory !== 'All' ? `${selectedCategory} Tools` : 'All AI Tools'} 
                <span className="text-lg font-normal text-gray-600 ml-2">
                  ({allFilteredTools.length})
                </span>
              </h2>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {currentTools.map((tool, index) => (
                <div key={tool._id}>
                  {/* AdSense Medium Rectangle for every 9th tool */}
                  {index > 0 && index % 9 === 0 && (
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 col-span-full">
                      <SimpleAdSenseAd
                        width={300}
                        height={250}
                        format="rectangle"
                        className="mx-auto"
                      />
                    </div>
                  )}
                  
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    <div className="p-6">
                      <div className="mb-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-bold text-gray-900 flex-1">
                            <Link 
                              href={`/tools/${tool.slug}`}
                              className="hover:text-blue-600 transition-colors"
                            >
                              {tool.name}
                            </Link>
                          </h3>
                          {tool.isFeatured && (
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full ml-2 flex-shrink-0">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{tool.description}</p>
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
                        <div className="flex gap-2">
                          <Link
                            href={`/tools/${tool.slug}`}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Review →
                          </Link>
                          <a
                            href={tool.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-800 text-sm font-medium"
                          >
                            Visit →
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* AdSense Ad - Large Rectangle */}
            {currentTools.length > 9 && (
              <div className="bg-gray-100 py-8 mt-12 rounded-lg">
                <div className="text-center">
                  <SimpleAdSenseAd
                    width={336}
                    height={280}
                    format="rectangle"
                    className="mx-auto"
                  />
                </div>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center space-x-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>

                  {/* Page Numbers */}
                  {generatePageNumbers().map(pageNum => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        currentPage === pageNum
                          ? 'text-white bg-blue-600 border border-blue-600'
                          : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  {/* Next Button */}
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </section>
        )}

        {/* Categories Overview */}
        <section className="mt-20 bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Browse by Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.slice(1).map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 text-left group"
              >
                <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-2 text-sm">
                  {category}
                </h4>
                <p className="text-xs text-gray-600">
                  {tools.filter(tool => tool.category === category).length} tools
                </p>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}