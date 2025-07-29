'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  category: string
  tags: string[]
  publishedAt: string
  readTime: number
}

export default function BlogListing() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 12

  const categories = ['All', 'AI News', 'Tool Reviews', 'Tutorials', 'Industry Analysis', 'Opinion']

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog/posts')
      const data = await response.json()
      
      if (data.success) {
        setPosts(data.posts)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory)

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      'AI News': 'bg-blue-100 text-blue-800',
      'Tool Reviews': 'bg-green-100 text-green-800',
      'Tutorials': 'bg-purple-100 text-purple-800',
      'Industry Analysis': 'bg-orange-100 text-orange-800',
      'Opinion': 'bg-pink-100 text-pink-800'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1) // Reset to first page when category changes
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading articles...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">AI Insights</h1>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-500 hover:text-gray-900 transition-colors">Home</Link>
              <Link href="/blog" className="text-blue-600 font-medium">Blog</Link>
              <Link href="/tools" className="text-gray-500 hover:text-gray-900 transition-colors">AI Tools</Link>
              <Link href="/about" className="text-gray-500 hover:text-gray-900 transition-colors">About</Link>
              <Link href="/contact" className="text-gray-500 hover:text-gray-900 transition-colors">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            AI Insights Blog
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Stay informed with the latest developments in artificial intelligence, 
            machine learning, and emerging technologies. Expert analysis you can trust.
          </p>
        </div>
      </section>

      {/* AdSense Ad Space - Leaderboard */}
      <div className="bg-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            {/* AdSense Leaderboard Ad (728x90) will go here */}
            <div className="h-24 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm">
              Advertisement Space (728x90)
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Filter by Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
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
            <div className="text-sm text-gray-600">
              Showing {currentPosts.length} of {filteredPosts.length} articles
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {selectedCategory === 'All' ? 'No posts published yet' : `No posts in ${selectedCategory}`}
            </h3>
            <p className="text-gray-600">
              {selectedCategory === 'All' 
                ? 'Check back soon for the latest AI insights!' 
                : 'Try selecting a different category.'}
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {currentPosts.map((post, index) => (
                <div key={post._id}>
                  {/* AdSense Medium Rectangle for every 6th article */}
                  {index === 5 && (
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                      <div className="h-64 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm">
                        Advertisement Space (300x250)
                      </div>
                    </div>
                  )}
                  
                  <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <div className="p-6">
                      {/* Category Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                          {post.category}
                        </span>
                        <span className="text-sm text-gray-500">{post.readTime} min read</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                        <Link 
                          href={`/blog/${post.slug}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                            >
                              #{tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{post.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <span className="text-sm text-gray-500">
                          {formatDate(post.publishedAt)}
                        </span>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center transition-colors"
                        >
                          Read more 
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>

            {/* AdSense Ad Space - Large Rectangle */}
            {currentPosts.length > 6 && (
              <div className="bg-gray-100 py-8 mt-12 rounded-lg">
                <div className="text-center">
                  <div className="bg-white rounded-lg p-6 shadow-sm inline-block">
                    {/* AdSense Large Rectangle Ad (336x280) will go here */}
                    <div className="h-72 w-80 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm">
                      Advertisement Space (336x280)
                    </div>
                  </div>
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
          </>
        )}

        {/* Related Categories */}
        <section className="mt-20 bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Explore More Topics</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.slice(1).map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 text-left group"
              >
                <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
                  {category}
                </h4>
                <p className="text-sm text-gray-600">
                  {posts.filter(post => post.category === category).length} articles
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Never Miss an Update</h3>
          <p className="text-xl text-blue-100 mb-8">
            Get the latest AI insights and tool recommendations delivered to your inbox
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}