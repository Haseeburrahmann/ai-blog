'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
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
  featured: boolean
}

export default function Home() {
  const [featuredArticles, setFeaturedArticles] = useState<NewsArticle[]>([])
  const [latestNews, setLatestNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [emailSubscription, setEmailSubscription] = useState('')
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news/articles')
      const data = await response.json()

      if (data.success) {
        setFeaturedArticles(data.articles.filter((article: NewsArticle) => article.featured).slice(0, 3))
        setLatestNews(data.articles.slice(0, 12))
      }
    } catch (error) {
      console.error('Error fetching news:', error)
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
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
      return `${diffInMinutes} minutes ago`
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation />

      {/* Breaking News Ticker */}
      <div className="bg-red-600 text-white py-2 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <span className="bg-white text-red-600 px-3 py-1 rounded font-bold text-xs mr-4 flex-shrink-0">
              BREAKING
            </span>
            <div className="overflow-hidden flex-1">
              <div className="animate-scroll whitespace-nowrap">
                <span className="inline-block px-4">
                  Stay informed with the latest world news and breaking stories from around the globe
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero/Header Section */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-8 border-b-4 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 tracking-tight">
              World News Network
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-4">
              Breaking News, Latest Updates & In-Depth Coverage
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-400">
              <span>📍 Updated Every Hour</span>
              <span>•</span>
              <span>🌐 Global Coverage</span>
              <span>•</span>
              <span>✓ Verified Sources</span>
            </div>
          </div>
        </div>
      </section>

      {/* Top Ad */}
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Main Content Area - 3 columns */}
          <div className="lg:col-span-3 space-y-8">

            {/* Featured Stories */}
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : featuredArticles.length > 0 ? (
              <section>
                <div className="flex items-center mb-4">
                  <div className="w-1 h-8 bg-red-600 mr-3"></div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Featured Stories
                  </h2>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Main Featured Story */}
                  {featuredArticles[0] && (
                    <div className="md:col-span-2 bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      <Link href={`/news/${featuredArticles[0].slug}`}>
                        <div className="relative h-96">
                          <img
                            src={featuredArticles[0].imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=630&fit=crop'}
                            alt={featuredArticles[0].title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <div className="flex items-center gap-3 mb-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getCategoryColor(featuredArticles[0].category)}`}>
                                {getCategoryIcon(featuredArticles[0].category)} {featuredArticles[0].category}
                              </span>
                              <span className="text-xs text-gray-200">{formatDate(featuredArticles[0].publishedAt)}</span>
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight">
                              {featuredArticles[0].title}
                            </h3>
                            <p className="text-gray-200 line-clamp-2">{featuredArticles[0].description}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )}

                  {/* Secondary Featured Stories */}
                  {featuredArticles.slice(1, 3).map((article) => (
                    <div key={article._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      <Link href={`/news/${article.slug}`}>
                        <div className="relative h-48">
                          <img
                            src={article.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=400&fit=crop'}
                            alt={article.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getCategoryColor(article.category)}`}>
                                {getCategoryIcon(article.category)} {article.category}
                              </span>
                            </div>
                            <h3 className="text-lg font-bold line-clamp-2 leading-tight">
                              {article.title}
                            </h3>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {/* Ad Placement */}
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4">
              <div className="text-center text-gray-500 text-sm mb-2">Advertisement</div>
              <SimpleAdSenseAd
                width={728}
                height={90}
                format="leaderboard"
                className="mx-auto"
              />
            </div>

            {/* Latest News Grid */}
            <section>
              <div className="flex items-center mb-4">
                <div className="w-1 h-8 bg-blue-600 mr-3"></div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Latest News
                </h2>
              </div>

              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : latestNews.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {latestNews.map((article, index) => (
                    <div key={article._id}>
                      {/* Inline Ad every 6th article */}
                      {index === 5 && (
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

                      <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden h-full flex flex-col">
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

                          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight hover:text-blue-600 transition-colors">
                            <Link href={`/news/${article.slug}`}>
                              {article.title}
                            </Link>
                          </h3>

                          <p className="text-gray-600 mb-3 line-clamp-2 text-sm flex-1">
                            {article.description}
                          </p>

                          <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-500">{formatDate(article.publishedAt)}</span>
                              <span className="text-xs text-gray-400">{article.source}</span>
                            </div>
                            <Link
                              href={`/news/${article.slug}`}
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
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No News Articles Yet</h3>
                  <p className="text-gray-600 mb-4">Check back soon for the latest breaking news and updates.</p>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar - 1 column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-lg p-6 text-white shadow-lg">
                <h3 className="text-xl font-bold mb-3">📬 Daily News Digest</h3>
                <p className="text-red-100 text-sm mb-4">
                  Get breaking news delivered to your inbox every morning.
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
                    className="w-full bg-white text-red-600 py-2 px-4 rounded-lg hover:bg-red-50 transition-colors font-semibold text-sm disabled:opacity-50"
                  >
                    {subscriptionStatus === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
                  </button>
                </form>

                {subscriptionStatus === 'success' && (
                  <p className="text-green-200 text-sm mt-2">✅ Successfully subscribed!</p>
                )}
                {subscriptionStatus === 'error' && (
                  <p className="text-red-200 text-sm mt-2">❌ Failed. Please try again.</p>
                )}
              </div>

              {/* News Categories */}
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">📰 Categories</h3>
                <div className="space-y-2">
                  {['World', 'Business', 'Technology', 'Sports', 'Entertainment', 'Health', 'Science', 'Politics'].map((category) => (
                    <Link
                      key={category}
                      href={`/news?category=${category}`}
                      className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${getCategoryColor(category)} hover:opacity-80`}
                    >
                      {getCategoryIcon(category)} {category}
                    </Link>
                  ))}
                </div>
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

              {/* Trending Topics */}
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">🔥 Trending Now</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded">1</span>
                    <span className="text-sm text-gray-700">Climate Summit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-orange-100 text-orange-800 text-xs font-bold px-2 py-1 rounded">2</span>
                    <span className="text-sm text-gray-700">Tech Innovation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded">3</span>
                    <span className="text-sm text-gray-700">Global Markets</span>
                  </div>
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

      {/* Bottom Ad */}
      <section className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
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
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">WN</span>
                </div>
                <h4 className="text-xl font-bold">World News Network</h4>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed max-w-md text-sm">
                Your trusted source for breaking news, latest updates, and in-depth coverage from around the world.
                Stay informed 24/7 with verified news from reliable sources.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="/news" className="text-gray-400 hover:text-white transition-colors">All News</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="text-lg font-semibold mb-4">Categories</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="/news?category=World" className="text-gray-400 hover:text-white transition-colors">World</Link></li>
                <li><Link href="/news?category=Business" className="text-gray-400 hover:text-white transition-colors">Business</Link></li>
                <li><Link href="/news?category=Technology" className="text-gray-400 hover:text-white transition-colors">Technology</Link></li>
                <li><Link href="/news?category=Sports" className="text-gray-400 hover:text-white transition-colors">Sports</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2025 World News Network. All rights reserved.
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

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  )
}
