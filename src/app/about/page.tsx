import Link from 'next/link'
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import SimpleAdSenseAd from '@/components/SimpleAdSenseAd'

export const metadata: Metadata = {
  title: 'About Us | World News Network',
  description: 'Learn about World News Network - Your trusted source for breaking news, latest updates, and comprehensive coverage from around the world.',
  keywords: 'about world news, news network, global news coverage, breaking news team',
}

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">About</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-16 sm:py-20 border-b-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">About World News Network</h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Delivering breaking news, verified information, and comprehensive coverage from around the globe.
            Your trusted source for staying informed 24/7.
          </p>
        </div>
      </section>

      {/* AdSense Ad */}
      <div className="bg-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SimpleAdSenseAd width={728} height={90} format="leaderboard" className="mx-auto" />
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  At World News Network, we believe in the power of informed citizens. Our mission is to provide
                  accurate, timely, and comprehensive news coverage that helps people understand the world around them.
                </p>
                <p>
                  We&apos;re committed to journalistic integrity, fact-checking, and presenting diverse perspectives on
                  global events. Whether it&apos;s politics, business, technology, sports, or entertainment, we deliver news
                  you can trust.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 sm:p-8 rounded-2xl">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Verified Sources</h3>
                    <p className="text-gray-600 text-sm">All news verified from trusted sources</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">24/7 Coverage</h3>
                    <p className="text-gray-600 text-sm">Breaking news updated every hour</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Global Reach</h3>
                    <p className="text-gray-600 text-sm">Coverage from every corner of the world</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Areas */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">News Coverage</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive reporting across all major news categories
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">World News</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Global events, international relations, and major world developments.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Business</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Markets, finance, corporate news, and economic updates.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Technology</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Tech innovations, gadgets, digital trends, and industry news.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚽</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sports</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Live scores, highlights, player news, and tournament coverage.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎬</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Entertainment</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Movies, music, celebrities, and pop culture updates.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🏥</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Health</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Medical breakthroughs, wellness, and public health news.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔬</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Science</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Research, discoveries, space exploration, and scientific advances.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🏛️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Politics</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Government, elections, policy changes, and political analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AdSense Ad */}
      <div className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SimpleAdSenseAd width={336} height={280} format="rectangle" className="mx-auto" />
        </div>
      </div>

      {/* Statistics */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-red-600 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Trusted Worldwide</h2>
            <p className="text-lg sm:text-xl text-red-100">Our reach and commitment to quality journalism</p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-red-100 text-sm sm:text-base">News Updates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">1000+</div>
              <div className="text-red-100 text-sm sm:text-base">Articles Daily</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">Global</div>
              <div className="text-red-100 text-sm sm:text-base">Coverage</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-red-100 text-sm sm:text-base">Verified</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our journalism every day
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Accuracy First</h3>
              <p className="text-gray-600 leading-relaxed">
                Every story is verified through multiple sources before publication.
                We prioritize accuracy over speed to ensure you get the facts right.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Unbiased Reporting</h3>
              <p className="text-gray-600 leading-relaxed">
                We present news objectively, allowing you to form your own opinions.
                Multiple perspectives are represented in our coverage.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Transparency</h3>
              <p className="text-gray-600 leading-relaxed">
                We clearly cite our sources and are transparent about our editorial process.
                Corrections are promptly made when needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Stay Informed</h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8">
            Get the latest news delivered straight to you
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/news"
              className="bg-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-red-700 transition-colors font-semibold text-center"
            >
              Read Latest News
            </Link>
            <Link
              href="/contact"
              className="border-2 border-red-600 text-red-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-red-600 hover:text-white transition-colors font-semibold text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
