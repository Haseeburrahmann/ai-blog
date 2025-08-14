'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import SimpleAdSenseAd from '@/components/SimpleAdSenseAd'

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

interface AITool {
  _id: string
  name: string
  slug: string
  description: string
  category: string
  pricing: {
    type: string
  }
  rating: {
    overall: number
  }
  isFeatured: boolean
}

export default function Home() {
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([])
  const [featuredTools, setFeaturedTools] = useState<AITool[]>([])
  const [loading, setLoading] = useState(true)
  const [emailSubscription, setEmailSubscription] = useState('')
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    fetchHomeData()
  }, [])

  const fetchHomeData = async () => {
    try {
      const [postsResponse, toolsResponse] = await Promise.all([
        fetch('/api/blog/posts'),
        fetch('/api/tools')
      ])
      
      const [postsData, toolsData] = await Promise.all([
        postsResponse.json(),
        toolsResponse.json()
      ])

      if (postsData.success) {
        setLatestPosts(postsData.posts.slice(0, 9))
      }

      if (toolsData.success) {
        setFeaturedTools(toolsData.tools.filter((tool: AITool) => tool.isFeatured).slice(0, 6))
      }
    } catch (error) {
      console.error('Error fetching home data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailSubscription.trim()) return

    setSubscriptionStatus('loading')
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubscriptionStatus('success')
      setEmailSubscription('')
      setTimeout(() => setSubscriptionStatus('idle'), 3000)
    } catch {
      setSubscriptionStatus('error')
      setTimeout(() => setSubscriptionStatus('idle'), 3000)
    }
  }

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

  const getPricingColor = (type: string) => {
    const colors = {
      'Free': 'bg-green-100 text-green-800',
      'Freemium': 'bg-blue-100 text-blue-800',
      'Paid': 'bg-orange-100 text-orange-800',
      'Enterprise': 'bg-purple-100 text-purple-800'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section - More Compact for Better Above-Fold Experience */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Master the Future with
              <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent block mt-1 sm:mt-2">
                AI Insights
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto px-4">
              Discover cutting-edge AI tools, stay ahead of industry trends, and transform your workflow 
              with our comprehensive reviews and expert analysis.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-4">
              <Link 
                href="/blog"
                className="bg-white text-blue-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 font-bold text-sm sm:text-base shadow-2xl text-center"
              >
                Latest AI Insights
              </Link>
              <Link 
                href="/tools"
                className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:scale-105 font-bold text-sm sm:text-base backdrop-blur-sm text-center"
              >
                Explore AI Tools
              </Link>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-blue-200 text-xs sm:text-sm px-4">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                500+ Tools Reviewed
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Daily Updates
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Expert Analysis
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Ad - Above the Fold */}
      <div className="bg-white py-3 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block">
            <SimpleAdSenseAd
              width={728}
              height={90}
              format="leaderboard"
              className="mx-auto"
            />
          </div>
        </div>
      </div>

      {/* Content Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Content Area - 3 columns */}
          <div className="lg:col-span-3 space-y-12">
            
            {/* Latest Blog Posts */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Latest AI Insights
                </h2>
                <Link
                  href="/blog"
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
                >
                  View All →
                </Link>
              </div>

              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : latestPosts.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {latestPosts.slice(0, 6).map((post, index) => (
                    <div key={post._id}>
                      {/* Inline Ad every 3rd post */}
                      {index === 2 && (
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
                      
                      <article className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden">
                        <div className="p-5">
                          <div className="flex items-center justify-between mb-3">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                              {post.category}
                            </span>
                            <span className="text-xs text-gray-500">{post.readTime} min</span>
                          </div>

                          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                            <Link 
                              href={`/blog/${post.slug}`}
                              className="hover:text-blue-600 transition-colors"
                            >
                              {post.title}
                            </Link>
                          </h3>

                          <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
                            {post.excerpt}
                          </p>

                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <span className="text-xs text-gray-500">
                              {formatDate(post.publishedAt)}
                            </span>
                            <Link
                              href={`/blog/${post.slug}`}
                              className="text-blue-600 hover:text-blue-800 font-medium text-xs inline-flex items-center"
                            >
                              Read More 
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
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No articles yet</h3>
                  <p className="text-gray-600 mb-4">Get started by creating your first article.</p>
                  <Link
                    href="/admin"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Create Article →
                  </Link>
                </div>
              )}
            </section>

            {/* Featured AI Tools */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Featured AI Tools
                </h2>
                <Link
                  href="/tools"
                  className="text-green-600 hover:text-green-800 font-medium text-sm sm:text-base"
                >
                  View All →
                </Link>
              </div>

              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                </div>
              ) : featuredTools.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {featuredTools.slice(0, 6).map((tool, index) => (
                    <div key={tool._id}>
                      {/* Inline Ad every 3rd tool */}
                      {index === 2 && (
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
                      
                      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden">
                        <div className="p-5">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-gray-900 mb-2">
                                <Link 
                                  href={`/tools/${tool.slug}`}
                                  className="hover:text-blue-600 transition-colors"
                                >
                                  {tool.name}
                                </Link>
                              </h3>
                              <p className="text-gray-600 mb-3 line-clamp-2 text-sm">{tool.description}</p>
                            </div>
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full ml-2 flex-shrink-0">
                              Featured
                            </span>
                          </div>

                          <div className="flex items-center mb-3">
                            <div className="flex items-center">
                              {renderStars(tool.rating.overall)}
                              <span className="ml-2 text-sm text-gray-600 font-medium">
                                {tool.rating.overall.toFixed(1)}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPricingColor(tool.pricing.type)}`}>
                              {tool.pricing.type}
                            </span>
                            <Link
                              href={`/tools/${tool.slug}`}
                              className="text-blue-600 hover:text-blue-800 font-medium text-xs inline-flex items-center"
                            >
                              Learn More 
                              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No tools yet</h3>
                  <p className="text-gray-600 mb-4">Add your first AI tool review.</p>
                  <Link
                    href="/admin"
                    className="text-green-600 hover:text-green-800 font-medium"
                  >
                    Add Tool →
                  </Link>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar - 1 column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              
              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-3">Stay Updated</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Get daily AI insights delivered to your inbox.
                </p>
                
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={emailSubscription}
                    onChange={(e) => setEmailSubscription(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg text-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <button 
                    type="submit"
                    disabled={subscriptionStatus === 'loading'}
                    className="w-full bg-white text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-sm disabled:opacity-50"
                  >
                    {subscriptionStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
                
                {subscriptionStatus === 'success' && (
                  <p className="text-green-200 text-sm mt-2">✅ Successfully subscribed!</p>
                )}
                {subscriptionStatus === 'error' && (
                  <p className="text-red-200 text-sm mt-2">❌ Failed. Please try again.</p>
                )}
              </div>

              {/* Sidebar Ad */}
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4">
                <div className="text-center text-gray-500 text-sm mb-2">Advertisement</div>
                <SimpleAdSenseAd
                  width={300}
                  height={250}
                  format="rectangle"
                  className="mx-auto"
                />
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Tools Reviewed</span>
                    <span className="font-bold text-blue-600">500+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Articles Published</span>
                    <span className="font-bold text-green-600">200+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Monthly Readers</span>
                    <span className="font-bold text-purple-600">50K+</span>
                  </div>
                </div>
              </div>

              {/* Popular Categories */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Categories</h3>
                <div className="space-y-2">
                  <Link href="/blog?category=AI+News" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    📰 AI News
                  </Link>
                  <Link href="/blog?category=Tool+Reviews" className="block text-sm text-gray-600 hover:text-green-600 transition-colors">
                    ⭐ Tool Reviews
                  </Link>
                  <Link href="/blog?category=Tutorials" className="block text-sm text-gray-600 hover:text-purple-600 transition-colors">
                    📚 Tutorials
                  </Link>
                  <Link href="/blog?category=Industry+Analysis" className="block text-sm text-gray-600 hover:text-orange-600 transition-colors">
                    📊 Industry Analysis
                  </Link>
                </div>
              </div>

              {/* Another Sidebar Ad */}
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4">
                <div className="text-center text-gray-500 text-sm mb-2">Advertisement</div>
                <SimpleAdSenseAd
                  width={300}
                  height={600}
                  format="auto"
                  className="mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Large Bottom Ad */}
          <div className="text-center mb-12">
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 inline-block">
              <div className="text-gray-500 text-sm mb-2">Advertisement</div>
              <SimpleAdSenseAd
                width={728}
                height={90}
                format="leaderboard"
                className="mx-auto"
              />
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to Explore AI?</h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who rely on AI Insights for the latest tools and industry knowledge.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/tools"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
              >
                Browse AI Tools
              </Link>
              <Link
                href="/blog"
                className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold"
              >
                Read Latest Articles
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AI</span>
                </div>
                <h4 className="text-xl font-bold">AI Insights</h4>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed max-w-md text-sm">
                Your trusted source for AI news, tool reviews, and industry analysis. 
                We help professionals navigate the rapidly evolving world of artificial intelligence.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/tools" className="text-gray-400 hover:text-white transition-colors">AI Tools</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-lg font-semibold mb-4">Categories</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="/blog?category=AI+News" className="text-gray-400 hover:text-white transition-colors">AI News</Link></li>
                <li><Link href="/blog?category=Tool+Reviews" className="text-gray-400 hover:text-white transition-colors">Tool Reviews</Link></li>
                <li><Link href="/blog?category=Tutorials" className="text-gray-400 hover:text-white transition-colors">Tutorials</Link></li>
                <li><Link href="/blog?category=Industry+Analysis" className="text-gray-400 hover:text-white transition-colors">Industry Analysis</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2025 AI Insights. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
                <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}