/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface BlogPostForm {
  title: string
  content: string
  excerpt: string
  category: string
  tags: string
  published: boolean
}

export default function NewBlogPost() {
  const router = useRouter()
  const [formData, setFormData] = useState<BlogPostForm>({
    title: '',
    content: '',
    excerpt: '',
    category: 'AI News',
    tags: '',
    published: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  const categories = [
    'AI News',
    'Tool Reviews', 
    'Tutorials',
    'Industry Analysis',
    'Opinion'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      const response = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags: tagsArray,
          readTime: Math.ceil(formData.content.split(' ').length / 200) // Estimate reading time
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create post')
      }

      const result = await response.json()
      console.log('Post created successfully:', result)
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
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const insertImagePlaceholder = () => {
    const imageUrl = prompt('Enter image URL (or use Unsplash URL):')
    if (imageUrl) {
      const imageMarkdown = `![Image description](${imageUrl})\n\n`
      setFormData(prev => ({
        ...prev,
        content: prev.content + imageMarkdown
      }))
    }
  }

  const insertFormatting = (format: string) => {
    const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = formData.content.substring(start, end)

    let replacement = ''
    switch (format) {
      case 'bold':
        replacement = `**${selectedText || 'bold text'}**`
        break
      case 'italic':
        replacement = `*${selectedText || 'italic text'}*`
        break
      case 'h2':
        replacement = `## ${selectedText || 'Heading'}\n\n`
        break
      case 'h3':
        replacement = `### ${selectedText || 'Subheading'}\n\n`
        break
      case 'quote':
        replacement = `> ${selectedText || 'Quote text'}\n\n`
        break
      case 'list':
        replacement = `- ${selectedText || 'List item'}\n`
        break
      case 'link':
        const url = prompt('Enter URL:')
        replacement = `[${selectedText || 'Link text'}](${url || 'https://example.com'})`
        break
    }

    const newContent = formData.content.substring(0, start) + replacement + formData.content.substring(end)
    setFormData(prev => ({ ...prev, content: newContent }))
  }

  // Function to format content for preview - ES2017 compatible
  const formatContent = (content: string) => {
    let formattedContent = content

    // Convert images
    formattedContent = formattedContent.replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      '<img src="$2" alt="$1" class="w-full h-auto rounded-lg my-6 shadow-lg" />'
    )

    // Convert links
    formattedContent = formattedContent.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-blue-600 hover:text-blue-800 underline font-medium">$1</a>'
    )

    // Convert headers
    formattedContent = formattedContent.replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">$1</h3>')
    formattedContent = formattedContent.replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">$1</h2>')

    // Convert bold and italic
    formattedContent = formattedContent.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
    formattedContent = formattedContent.replace(/\*(.*?)\*/g, '<em class="italic text-gray-800 font-medium">$1</em>')

    // Convert blockquotes
    formattedContent = formattedContent.replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-blue-500 bg-blue-50 p-4 my-4 italic text-gray-900 font-medium">$1</blockquote>')

    // Convert lists - ES2017 compatible approach
    formattedContent = formattedContent.replace(/^- (.*$)/gm, '<li class="mb-1 text-gray-900 font-medium">$1</li>')
    
    // Group consecutive list items - ES2017 compatible
    const listItemRegex = /(<li class="mb-1 text-gray-900 font-medium">.*?<\/li>(\s*<li class="mb-1 text-gray-900 font-medium">.*?<\/li>)*)/g
    formattedContent = formattedContent.replace(listItemRegex, '<ul class="list-disc list-inside my-4 text-gray-900 font-medium">$1</ul>')

    // Convert paragraphs
    const lines = formattedContent.split('\n')
    const processedLines = lines.map(line => {
      const trimmedLine = line.trim()
      if (trimmedLine === '') return ''
      if (trimmedLine.startsWith('<')) return line
      if (trimmedLine.startsWith('#') || trimmedLine.startsWith('-') || trimmedLine.startsWith('>')) return line
      return `<p class="mb-4 text-gray-900 font-medium">${line}</p>`
    })

    return processedLines.join('\n')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Blog Post</h1>
              <p className="text-gray-600">Write and publish your AI insights</p>
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors"
              >
                {showPreview ? 'Edit' : 'Preview'}
              </button>
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
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Side */}
          <div className={showPreview ? 'hidden lg:block' : ''}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                {/* Title */}
                <div className="mb-6">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder="Enter your blog post title..."
                  />
                </div>

                {/* Excerpt */}
                <div className="mb-6">
                  <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                    Excerpt *
                  </label>
                  <textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    required
                    rows={3}
                    maxLength={300}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder="Brief description of your post (max 300 characters)..."
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.excerpt.length}/300 characters
                  </p>
                </div>

                {/* Category and Tags Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
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
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      placeholder="ai, machine learning, chatgpt (comma separated)"
                    />
                  </div>
                </div>

                {/* Formatting Toolbar */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content Formatting
                  </label>
                  <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-md border">
                    <button
                      type="button"
                      onClick={() => insertFormatting('bold')}
                      className="px-3 py-1 bg-white border rounded text-sm hover:bg-gray-100"
                      title="Bold"
                    >
                      <strong>B</strong>
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('italic')}
                      className="px-3 py-1 bg-white border rounded text-sm hover:bg-gray-100"
                      title="Italic"
                    >
                      <em>I</em>
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('h2')}
                      className="px-3 py-1 bg-white border rounded text-sm hover:bg-gray-100"
                      title="Heading"
                    >
                      H2
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('h3')}
                      className="px-3 py-1 bg-white border rounded text-sm hover:bg-gray-100"
                      title="Subheading"
                    >
                      H3
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('quote')}
                      className="px-3 py-1 bg-white border rounded text-sm hover:bg-gray-100"
                      title="Quote"
                    >
                      &quot;
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('list')}
                      className="px-3 py-1 bg-white border rounded text-sm hover:bg-gray-100"
                      title="List"
                    >
                      •
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('link')}
                      className="px-3 py-1 bg-white border rounded text-sm hover:bg-gray-100"
                      title="Link"
                    >
                      🔗
                    </button>
                    <button
                      type="button"
                      onClick={insertImagePlaceholder}
                      className="px-3 py-1 bg-blue-100 text-blue-700 border rounded text-sm hover:bg-blue-200"
                      title="Insert Image"
                    >
                      📷 Image
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="mb-6">
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                    Content * (Markdown supported)
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    rows={20}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-gray-900"
                    placeholder="Write your blog post content here...

Examples:
## Heading
### Subheading
**Bold text**
*Italic text*
> Quote text
- List item
[Link text](https://example.com)
![Image alt text](https://images.unsplash.com/photo-example)"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Word count: {formData.content.split(' ').filter(word => word.length > 0).length} | 
                    Estimated read time: {Math.ceil(formData.content.split(' ').length / 200)} min
                  </p>
                </div>

                {/* Publish Toggle */}
                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="published"
                      checked={formData.published}
                      onChange={handleChange}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Publish immediately (uncheck to save as draft)
                    </span>
                  </label>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
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
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Saving...' : formData.published ? 'Publish Post' : 'Save Draft'}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Preview Side */}
          <div className={showPreview ? '' : 'hidden lg:block'}>
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Preview</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                    {formData.category}
                  </span>
                  {formData.published ? (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                      Published
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">
                      Draft
                    </span>
                  )}
                </div>
              </div>

              <div className="prose prose-sm max-w-none">
                {/* Title Preview */}
                {formData.title && (
                  <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                    {formData.title}
                  </h1>
                )}

                {/* Excerpt Preview */}
                {formData.excerpt && (
                  <div className="text-gray-600 italic mb-6 p-3 bg-gray-50 rounded border-l-4 border-blue-500">
                    {formData.excerpt}
                  </div>
                )}

                {/* Tags Preview */}
                {formData.tags && (
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.split(',').map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                        >
                          #{tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Content Preview */}
                {formData.content ? (
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: formatContent(formData.content) }}
                  />
                ) : (
                  <p className="text-gray-400 italic">Start writing to see your preview...</p>
                )}

                {/* Reading Time */}
                {formData.content && (
                  <div className="mt-6 pt-4 border-t border-gray-200 text-sm text-gray-500">
                    📖 {Math.ceil(formData.content.split(' ').length / 200)} min read
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}