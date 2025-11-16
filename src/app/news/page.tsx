'use client'

import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Navigation from '@/components/Navigation'
import SimpleAdSenseAd from '@/components/SimpleAdSenseAd'

interface NewsArticle {
  _id: string
  title: string
  slug: string
  description: string
  imageUrl?: string
  category: string
  source: string
  tags: string[]
  publishedAt: string
  readTime: number
}

function NewsContent() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 12

  const searchParams = useSearchParams()

  const categories = ['All', 'World', 'Business', 'Technology', 'Sports', 'Entertainment', 'Health', 'Science', 'Politics']

  useEffect(() => {
    fetchArticles()

    const categoryParam = searchParams?.get('category')
    if (categoryParam) {
      setSelectedCategory(categoryParam.replace('+', ' '))
    }
  }, [searchParams])

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/news/articles?limit=100')
      const data = await response.json()

      if (data.success) {
        setArticles(data.articles)
      }
    } catch (error) {
      console.error('Error fetching articles:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredArticles = articles.filter(article => {
    const categoryMatch = selectedCategory === 'All' || article.category === selectedCategory
    const searchMatch = searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    return categoryMatch && searchMatch
  })

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage)
  const startIndex = (currentPage - 1) * articlesPerPage
  const currentArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
      return `${diffInMinutes} min ago`
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      'World': 'bg-blue-100 text-blue-800 border-blue-200',
      'Business': 'bg-green-100 text-green-800 border-green-200',
      'Technology': 'bg-purple-100 text-purple-800 border-purple-200',
      'Sports': 'bg-orange-100 text-orange-800 border-orange-200',
      'Entertainment': 'bg-pink-100 text-pink-800 border-pink-200',
      'Health': 'bg-teal-100 text-teal-800 border-teal-200',
      'Science': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Politics': 'bg-red-100 text-red-800 border-red-200'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const getCategoryIcon = (category: string) => {
    const icons = {
      'World': '🌍',
      'Business': '💼',
      'Technology': '💻',
      'Sports': '⚽',
      'Entertainment': '🎬',
      'Health': '🏥',
      'Science': '🔬',
      'Politics': '🏛️'
    }
    return icons[category as keyof typeof icons] || '📰'
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading latest news...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-12 border-b-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Latest World News
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Breaking news, updates, and in-depth coverage from around the globe.
            Stay informed with verified news from trusted sources.
          </p>
        </div>
      </section>

      {/* Top Ad */}
      <div className="bg-white py-4 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SimpleAdSenseAd
            width={728}
            height={90}
            format="leaderboard"
            className="mx-auto"
          />
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="bg-white border-b sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto py-4 gap-2 no-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white border-red-600 shadow-md'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-red-600 hover:text-red-600'
                }`}
              >
                {category !== 'All' && getCategoryIcon(category)} {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search news articles..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
          />
          <svg className="absolute left-4 top-4 h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <p className="text-gray-600">
          Showing <span className="font-semibold">{filteredArticles.length}</span> articles
          {selectedCategory !== 'All' && <span> in <span className="font-semibold">{selectedCategory}</span></span>}
        </p>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {currentArticles.length > 0 ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {currentArticles.map((article, index) => (
                <div key={article._id}>
                  {index === 8 && (
                    <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4 mb-6">
                      <div className="text-center text-gray-500 text-sm mb-2">Advertisement</div>
                      <SimpleAdSenseAd
                        width={300}
                        height={250}
                        format="rectangle"
                        className="mx-auto"
                      />
                    </div>
                  )}

                  <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden h-full flex flex-col">
                    {article.imageUrl && (
                      <Link href={`/news/${article.slug}`}>
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </Link>
                    )}
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold border ${getCategoryColor(article.category)}`}>
                          {getCategoryIcon(article.category)} {article.category}
                        </span>
                        <span className="text-xs text-gray-500">{article.readTime} min</span>
                      </div>

                      <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                        <Link href={`/news/${article.slug}`} className="hover:text-red-600 transition-colors">
                          {article.title}
                        </Link>
                      </h3>

                      <p className="text-gray-600 mb-3 line-clamp-2 text-sm flex-1">
                        {article.description}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">{formatDate(article.publishedAt)}</span>
                          <span className="text-xs text-gray-400 truncate max-w-[120px]">{article.source}</span>
                        </div>
                        <Link
                          href={`/news/${article.slug}`}
                          className="text-red-600 hover:text-red-800 font-medium text-xs inline-flex items-center"
                        >
                          Read
                          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                {generatePageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-red-600 text-white border-red-600'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Articles Found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery ? `No results for "${searchQuery}"` : 'No articles available in this category'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All')
              }}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Bottom Ad */}
      <div className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SimpleAdSenseAd
            width={728}
            height={90}
            format="leaderboard"
            className="mx-auto"
          />
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

export default function NewsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <NewsContent />
    </Suspense>
  )
}
