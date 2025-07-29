/* eslint-disable react/jsx-no-undef */
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import AdSenseAd from '@/components/AdSenseAd'

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

  useEffect(() => {
    fetchHomeData()
  }, [])

  const fetchHomeData = async () => {
    try {
      // Fetch latest blog posts
      const postsResponse = await fetch('/api/blog/posts')
      const postsData = await postsResponse.json()
      
      // Fetch featured AI tools
      const toolsResponse = await fetch('/api/tools')
      const toolsData = await toolsResponse.json()

      if (postsData.success) {
        setLatestPosts(postsData.posts.slice(0, 6)) // Get latest 6 posts for better layout
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
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">AI Insights</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-blue-600 font-medium">Home</Link>
              <Link href="/blog" className="text-gray-500 hover:text-gray-900 transition-colors">Blog</Link>
              <Link href="/tools" className="text-gray-500 hover:text-gray-900 transition-colors">AI Tools</Link>
              <Link href="/about" className="text-gray-500 hover:text-gray-900 transition-colors">About</Link>
              <Link href="/contact" className="text-gray-500 hover:text-gray-900 transition-colors">Contact</Link>
            </nav>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-gray-500 hover:text-gray-900">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Master the Future with
              <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent block">
                AI Insights
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 leading-relaxed max-w-4xl mx-auto">
              Discover cutting-edge AI tools, stay ahead of industry trends, and transform your workflow 
              with our comprehensive reviews and expert analysis. Your gateway to the AI revolution starts here.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
              <Link 
                href="/blog"
                className="bg-white text-blue-900 px-10 py-5 rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 font-bold text-lg shadow-2xl"
              >
                Explore Latest Insights
              </Link>
              <Link 
                href="/tools"
                className="border-2 border-white text-white px-10 py-5 rounded-xl hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:scale-105 font-bold text-lg backdrop-blur-sm"
              >
                Discover AI Tools
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-blue-200 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                500+ Tools Reviewed
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                50K+ Monthly Readers
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Expert Analysis
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AdSense Ad Space - Leaderboard */}
      <div className="bg-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            {/* AdSense Leaderboard Ad (728x90) will go here */}
            <div className="h-24 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm">
            <AdSenseAd
  adSlot="1885886529" // ← Your actual ad slot ID
  className="mx-auto"
  width={728}
  height={90}
/>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Blog Posts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">
              Latest AI Insights & Analysis
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Stay informed with our latest articles covering AI breakthroughs, industry trends, 
              and comprehensive tool reviews from our expert team.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : latestPosts.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {latestPosts.map((post, index) => (
                  <article
                    key={post._id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
                  >
                    {/* AdSense Medium Rectangle for every 3rd article */}
                    {index === 2 && (
                      <div className="bg-gray-50 p-4 border-b">
                        <div className="h-64 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm">
                          Advertisement Space (300x250)
                        </div>
                      </div>
                    )}
                    
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}>
                          {post.category}
                        </span>
                        <span className="text-sm text-gray-500">{post.readTime} min read</span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 leading-tight">
                        <Link 
                          href={`/blog/${post.slug}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h3>

                      <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <span className="text-sm text-gray-500">
                          {formatDate(post.publishedAt)}
                        </span>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-blue-600 hover:text-blue-800 font-medium transition-colors inline-flex items-center"
                        >
                          Read More 
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No blog posts available yet. Check back soon!</p>
            </div>
          )}

          <div className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg"
            >
              View All Articles
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* AdSense Ad Space - Large Rectangle */}
      <div className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg p-6 shadow-sm text-center">
            {/* AdSense Large Rectangle Ad (336x280) will go here */}
            <div className="h-72 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm mx-auto max-w-sm">
              Advertisement Space (336x280)
            </div>
          </div>
        </div>
      </div>

      {/* Featured AI Tools */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">
              Top-Rated AI Tools & Platforms
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Handpicked AI tools that are transforming industries. Discover powerful solutions 
              that can revolutionize your productivity, creativity, and business operations.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : featuredTools.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {featuredTools.map((tool, index) => (
                  <div
                    key={tool._id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
                  >
                    {/* AdSense Medium Rectangle for every 4th tool */}
                    {index === 3 && (
                      <div className="bg-gray-50 p-4 border-b">
                        <div className="h-64 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm">
                          Advertisement Space (300x250)
                        </div>
                      </div>
                    )}
                    
                    <div className="p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-900 mb-3">
                            <Link 
                              href={`/tools/${tool.slug}`}
                              className="hover:text-blue-600 transition-colors"
                            >
                              {tool.name}
                            </Link>
                          </h4>
                          <p className="text-gray-600 mb-4 leading-relaxed">{tool.description}</p>
                        </div>
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1 rounded-full ml-4">
                          Featured
                        </span>
                      </div>

                      <div className="flex items-center mb-4">
                        <div className="flex items-center">
                          {renderStars(tool.rating.overall)}
                          <span className="ml-2 text-sm text-gray-600 font-medium">
                            {tool.rating.overall.toFixed(1)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPricingColor(tool.pricing.type)}`}>
                          {tool.pricing.type}
                        </span>
                        <Link
                          href={`/tools/${tool.slug}`}
                          className="text-blue-600 hover:text-blue-800 font-medium transition-colors inline-flex items-center"
                        >
                          Learn More 
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No featured tools available yet. Check back soon!</p>
            </div>
          )}

          <div className="text-center">
            <Link
              href="/tools"
              className="inline-flex items-center bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition-colors font-semibold text-lg shadow-lg"
            >
              Explore All Tools
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">
              Why Choose AI Insights?
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We&apos;re more than just another tech blog. We&apos;re your strategic partner in navigating the AI landscape.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="text-blue-600 mb-6">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd"/>
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Expert Reviews</h4>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our team of AI specialists thoroughly tests every tool, providing honest, unbiased reviews 
                based on real-world usage and performance metrics.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Hands-on testing
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Unbiased analysis
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Real-world scenarios
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="text-green-600 mb-6">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Always Current</h4>
              <p className="text-gray-700 leading-relaxed mb-4">
                The AI landscape changes rapidly. We continuously update our content to reflect the latest 
                developments, new tools, and industry shifts.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Daily updates
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Breaking news
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Fresh perspectives
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="text-purple-600 mb-6">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Community Driven</h4>
              <p className="text-gray-700 leading-relaxed mb-4">
                Join thousands of AI enthusiasts, developers, and business leaders who rely on our insights 
                to make informed decisions about AI adoption.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Active community
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Expert discussions
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Shared experiences
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-bold text-white mb-6">
            Stay Ahead of the AI Curve
          </h3>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Get weekly insights, tool recommendations, and industry analysis delivered to your inbox. 
            Join 50,000+ professionals who trust our expertise.
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex gap-4 mb-6">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
                Subscribe
              </button>
            </div>
            <p className="text-blue-200 text-sm">
              No spam, unsubscribe anytime. Read our <Link href="/privacy" className="underline hover:text-white">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h4 className="text-2xl font-bold mb-4">AI Insights</h4>
              <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
                Your trusted source for AI news, tool reviews, and industry analysis. 
                We help professionals and businesses navigate the rapidly evolving world of artificial intelligence.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.22.083.343-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.754-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2">
                <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/tools" className="text-gray-400 hover:text-white transition-colors">AI Tools</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-lg font-semibold mb-4">Categories</h5>
              <ul className="space-y-2">
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
                © 2024 AI Insights. All rights reserved.
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
    </main>
  )
}