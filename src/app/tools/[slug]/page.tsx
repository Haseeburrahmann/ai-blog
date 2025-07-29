/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from 'next/navigation'
import Link from 'next/link'
import connectDB from '@/lib/mongodb'
import AITool from '@/models/AITool'

interface ToolPageProps {
  params: {
    slug: string
  }
}

async function getTool(slug: string) {
  try {
    await connectDB()
    
    const tool = await AITool.findOne({ 
      slug, 
      isActive: true 
    })
    
    if (!tool) {
      return null
    }
    
    return {
      name: tool.name,
      description: tool.description,
      longDescription: tool.longDescription,
      category: tool.category,
      website: tool.website,
      pricing: tool.pricing,
      rating: tool.rating,
      features: tool.features,
      pros: tool.pros,
      cons: tool.cons,
      useCases: tool.useCases,
      targetAudience: tool.targetAudience,
      isFeatured: tool.isFeatured
    }
  } catch (error) {
    console.error('Error fetching tool:', error)
    return null
  }
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

const formatPrice = (pricing: any) => {
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
      className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ))
}

// Generate page metadata
export async function generateMetadata({ params }: ToolPageProps) {
  const tool = await getTool(params.slug)
  
  if (!tool) {
    return {
      title: 'Tool Not Found'
    }
  }
  
  return {
    title: `${tool.name} - AI Tool Review | AI Insights`,
    description: tool.description,
    keywords: `${tool.name}, ${tool.category}, AI tool, review`
  }
}

export default async function ToolPage({ params }: ToolPageProps) {
  const tool = await getTool(params.slug)
  
  if (!tool) {
    notFound()
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/tools" className="hover:text-gray-900">AI Tools</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{tool.name}</span>
        </nav>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tool Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <h1 className="text-3xl font-bold text-gray-900 mr-4">{tool.name}</h1>
                  {tool.isFeatured && (
                    <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-xl text-gray-600 mb-4">{tool.description}</p>
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800`}>
                    {tool.category}
                  </span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPricingColor(tool.pricing.type)}`}>
                    {formatPrice(tool.pricing)}
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center mb-4">
                  {renderStars(tool.rating.overall)}
                  <span className="ml-2 text-lg font-semibold text-gray-900">
                    {tool.rating.overall.toFixed(1)}
                  </span>
                </div>
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
                >
                  Visit Tool
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About {tool.name}</h2>
              <div className="prose max-w-none">
                {tool.longDescription.split('\n').map((paragraph: string, index: number) => (
                  paragraph.trim() && (
                    <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  )
                ))}
              </div>
            </div>

            {/* Features */}
            {tool.features.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
                <ul className="grid md:grid-cols-2 gap-3">
                  {tool.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pros and Cons */}
            {(tool.pros.length > 0 || tool.cons.length > 0) && (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Pros */}
                {tool.pros.length > 0 && (
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-xl font-bold text-green-700 mb-4">Pros</h3>
                    <ul className="space-y-3">
                      {tool.pros.map((pro: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Cons */}
                {tool.cons.length > 0 && (
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-xl font-bold text-red-700 mb-4">Cons</h3>
                    <ul className="space-y-3">
                      {tool.cons.map((con: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Use Cases */}
            {tool.useCases.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Use Cases</h3>
                <ul className="space-y-2">
                  {tool.useCases.map((useCase: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-4 h-4 text-blue-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 text-sm">{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Target Audience */}
            {tool.targetAudience.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Best For</h3>
                <div className="space-y-2">
                  {tool.targetAudience.map((audience: string, index: number) => (
                    <span
                      key={index}
                      className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mr-2 mb-2"
                    >
                      {audience}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Pricing Details */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Pricing</h3>
              <div className="text-center">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-medium ${getPricingColor(tool.pricing.type)} mb-4`}>
                  {formatPrice(tool.pricing)}
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {tool.pricing.type === 'Free' && 'Completely free to use'}
                  {tool.pricing.type === 'Freemium' && 'Free tier available with paid upgrades'}
                  {tool.pricing.type === 'Paid' && 'Paid subscription required'}
                  {tool.pricing.type === 'Enterprise' && 'Custom enterprise pricing'}
                </p>
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
                >
                  Get Started
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Rating</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Overall</span>
                  <div className="flex items-center">
                    {renderStars(tool.rating.overall)}
                    <span className="ml-2 text-sm font-medium">{tool.rating.overall.toFixed(1)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Usability</span>
                  <div className="flex items-center">
                    {renderStars(tool.rating.usability)}
                    <span className="ml-2 text-sm font-medium">{tool.rating.usability.toFixed(1)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Features</span>
                  <div className="flex items-center">
                    {renderStars(tool.rating.features)}
                    <span className="ml-2 text-sm font-medium">{tool.rating.features.toFixed(1)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Value</span>
                  <div className="flex items-center">
                    {renderStars(tool.rating.value)}
                    <span className="ml-2 text-sm font-medium">{tool.rating.value.toFixed(1)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Support</span>
                  <div className="flex items-center">
                    {renderStars(tool.rating.support)}
                    <span className="ml-2 text-sm font-medium">{tool.rating.support.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Tools */}
        <div className="mt-12 text-center">
          <Link
            href="/tools"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to AI Tools Directory
          </Link>
        </div>
      </main>
    </div>
  )
}