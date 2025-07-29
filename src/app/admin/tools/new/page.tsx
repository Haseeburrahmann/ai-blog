/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface AIToolForm {
  name: string
  description: string
  longDescription: string
  category: string
  website: string
  pricingType: 'Free' | 'Freemium' | 'Paid' | 'Enterprise'
  startingPrice: string
  currency: string
  billingCycle: string
  overallRating: number
  features: string
  pros: string
  cons: string
  useCases: string
  targetAudience: string
  isFeatured: boolean
}

export default function NewAITool() {
  const router = useRouter()
  const [formData, setFormData] = useState<AIToolForm>({
    name: '',
    description: '',
    longDescription: '',
    category: 'Writing & Content',
    website: '',
    pricingType: 'Freemium',
    startingPrice: '',
    currency: 'USD',
    billingCycle: 'monthly',
    overallRating: 4,
    features: '',
    pros: '',
    cons: '',
    useCases: '',
    targetAudience: '',
    isFeatured: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const categories = [
    'Writing & Content',
    'Image Generation',
    'Video & Audio',
    'Code & Development',
    'Business & Productivity',
    'Data Analysis',
    'Marketing & SEO',
    'Design & Creative',
    'Research & Education',
    'Customer Service',
    'Other'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Convert comma-separated strings to arrays
      const processedData = {
        ...formData,
        features: formData.features.split(',').map(item => item.trim()).filter(item => item.length > 0),
        pros: formData.pros.split(',').map(item => item.trim()).filter(item => item.length > 0),
        cons: formData.cons.split(',').map(item => item.trim()).filter(item => item.length > 0),
        useCases: formData.useCases.split(',').map(item => item.trim()).filter(item => item.length > 0),
        targetAudience: formData.targetAudience.split(',').map(item => item.trim()).filter(item => item.length > 0),
        startingPrice: formData.startingPrice ? parseFloat(formData.startingPrice) : undefined
      }

      const response = await fetch('/api/admin/tools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create AI tool')
      }

      const result = await response.json()
      console.log('Tool created successfully:', result)
      router.push('/admin')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? parseFloat(value) || 0 : value
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add New AI Tool</h1>
              <p className="text-gray-600">Create a comprehensive AI tool review</p>
            </div>
            <Link 
              href="/admin"
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
            
            {/* Tool Name */}
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Tool Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="e.g., ChatGPT, Midjourney, Claude..."
              />
            </div>

            {/* Short Description */}
            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Short Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                maxLength={200}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="Brief description of what this tool does (max 200 characters)..."
              />
              <p className="text-sm text-gray-500 mt-1">{formData.description.length}/200 characters</p>
            </div>

            {/* Category and Website Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                  Website URL *
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            {/* Long Description */}
            <div className="mb-6">
              <label htmlFor="longDescription" className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Description *
              </label>
              <textarea
                id="longDescription"
                name="longDescription"
                value={formData.longDescription}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="Detailed explanation of the tool's capabilities, use cases, and unique features..."
              />
            </div>
          </div>

          {/* Pricing Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Pricing Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label htmlFor="pricingType" className="block text-sm font-medium text-gray-700 mb-2">
                  Pricing Model *
                </label>
                <select
                  id="pricingType"
                  name="pricingType"
                  value={formData.pricingType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                >
                  <option value="Free">Free</option>
                  <option value="Freemium">Freemium</option>
                  <option value="Paid">Paid</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>

              {(formData.pricingType === 'Paid' || formData.pricingType === 'Freemium' || formData.pricingType === 'Enterprise') && (
                <>
                  <div>
                    <label htmlFor="startingPrice" className="block text-sm font-medium text-gray-700 mb-2">
                      Starting Price
                    </label>
                    <input
                      type="number"
                      id="startingPrice"
                      name="startingPrice"
                      value={formData.startingPrice}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      placeholder="9.99"
                    />
                  </div>

                  <div>
                    <label htmlFor="billingCycle" className="block text-sm font-medium text-gray-700 mb-2">
                      Billing Cycle
                    </label>
                    <select
                      id="billingCycle"
                      name="billingCycle"
                      value={formData.billingCycle}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                      <option value="one-time">One-time</option>
                    </select>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Review Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Review & Rating</h2>
            
            {/* Overall Rating */}
            <div className="mb-6">
              <label htmlFor="overallRating" className="block text-sm font-medium text-gray-700 mb-2">
                Overall Rating (1-5) *
              </label>
              <select
                id="overallRating"
                name="overallRating"
                value={formData.overallRating}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                <option value={1}>1 - Poor</option>
                <option value={2}>2 - Fair</option>
                <option value={3}>3 - Good</option>
                <option value={4}>4 - Very Good</option>
                <option value={5}>5 - Excellent</option>
              </select>
            </div>

            {/* Features */}
            <div className="mb-6">
              <label htmlFor="features" className="block text-sm font-medium text-gray-700 mb-2">
                Key Features
              </label>
              <textarea
                id="features"
                name="features"
                value={formData.features}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="Natural language processing, Real-time collaboration, API access (comma separated)"
              />
            </div>

            {/* Pros and Cons Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="pros" className="block text-sm font-medium text-gray-700 mb-2">
                  Pros
                </label>
                <textarea
                  id="pros"
                  name="pros"
                  value={formData.pros}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="Easy to use, Fast responses, Great accuracy (comma separated)"
                />
              </div>

              <div>
                <label htmlFor="cons" className="block text-sm font-medium text-gray-700 mb-2">
                  Cons
                </label>
                <textarea
                  id="cons"
                  name="cons"
                  value={formData.cons}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="Limited free tier, Requires internet connection (comma separated)"
                />
              </div>
            </div>

            {/* Use Cases and Target Audience Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="useCases" className="block text-sm font-medium text-gray-700 mb-2">
                  Use Cases
                </label>
                <textarea
                  id="useCases"
                  name="useCases"
                  value={formData.useCases}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="Content writing, Customer support, Research (comma separated)"
                />
              </div>

              <div>
                <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 mb-2">
                  Target Audience
                </label>
                <textarea
                  id="targetAudience"
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="Content creators, Developers, Students (comma separated)"
                />
              </div>
            </div>

            {/* Featured Toggle */}
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Feature this tool (show prominently on homepage)
                </span>
              </label>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <Link
              href="/admin"
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Adding Tool...' : 'Add AI Tool'}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}