import { notFound } from 'next/navigation'
import Link from 'next/link'
import connectDB from '@/lib/mongodb'
import NewsArticle from '@/models/NewsArticle'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

async function getBlogPost(slug: string) {
  try {
    await connectDB()

    const article = await NewsArticle.findOne({
      slug,
      published: true
    }).select('title content description category tags publishedAt readTime author')

    if (!article) {
      return null
    }

    return {
      title: article.title,
      content: article.content,
      excerpt: article.description, // Map description to excerpt for compatibility
      category: article.category,
      tags: article.tags,
      publishedAt: article.publishedAt?.toISOString(),
      readTime: article.readTime,
      author: article.author
    }
  } catch (error) {
    console.error('Error fetching article:', error)
    return null
  }
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

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Function to convert content to HTML with proper formatting
const formatContent = (content: string) => {
  let formattedContent = content

  // Convert images ![alt](url) to img tags
  formattedContent = formattedContent.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" class="w-full h-auto rounded-lg my-6 shadow-lg" />'
  )

  // Convert links [text](url) to anchor tags
  formattedContent = formattedContent.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-blue-600 hover:text-blue-800 underline font-medium" target="_blank" rel="noopener noreferrer">$1</a>'
  )

  // Convert headers
  formattedContent = formattedContent.replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">$1</h3>')
  formattedContent = formattedContent.replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-6">$1</h2>')
  formattedContent = formattedContent.replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-gray-900 mt-12 mb-8">$1</h1>')

  // Convert bold text **text** to <strong>
  formattedContent = formattedContent.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')

  // Convert italic text *text* to <em>
  formattedContent = formattedContent.replace(/\*(.*?)\*/g, '<em class="italic text-gray-800 font-medium">$1</em>')

  // Convert blockquotes
  formattedContent = formattedContent.replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-blue-500 bg-blue-50 p-4 my-6 italic text-gray-900 font-medium">$1</blockquote>')

  // Convert unordered lists - ES2017 compatible approach
  formattedContent = formattedContent.replace(/^- (.*$)/gm, '<li class="mb-2 text-gray-900 font-medium">$1</li>')
  
  // Group consecutive list items into ul tags - ES2017 compatible
  const listItemRegex = /(<li class="mb-2 text-gray-900 font-medium">.*?<\/li>(\s*<li class="mb-2 text-gray-900 font-medium">.*?<\/li>)*)/g
  formattedContent = formattedContent.replace(listItemRegex, '<ul class="list-disc list-inside my-6 space-y-2 text-gray-900 font-medium">$1</ul>')

  // Convert numbered lists
  formattedContent = formattedContent.replace(/^\d+\. (.*$)/gm, '<li class="mb-2 text-gray-900 font-medium">$1</li>')

  // Convert horizontal rules
  formattedContent = formattedContent.replace(/^---$/gm, '<hr class="my-8 border-t-2 border-gray-200" />')

  // Convert paragraphs (any line that's not already formatted)
  const lines = formattedContent.split('\n')
  const processedLines = lines.map(line => {
    const trimmedLine = line.trim()
    if (trimmedLine === '') return ''
    
    // Skip if already formatted as HTML
    if (trimmedLine.startsWith('<')) return line
    
    // Skip if it's a list item indicator
    if (trimmedLine.startsWith('-') || /^\d+\./.test(trimmedLine)) return line
    
    // Skip if it's a header
    if (trimmedLine.startsWith('#')) return line
    
    // Skip if it's a blockquote
    if (trimmedLine.startsWith('>')) return line
    
    // Convert to paragraph with strong text color
    return `<p class="text-gray-900 mb-6 leading-relaxed font-medium">${line}</p>`
  })

  return processedLines.join('\n')
}

// This function will generate the page metadata
export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await getBlogPost((await params).slug)
  
  if (!post) {
    return {
      title: 'Post Not Found'
    }
  }
  
  return {
    title: `${post.title} | AI Insights`,
    description: post.excerpt,
    keywords: post.tags.join(', ')
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost((await params).slug)
  
  if (!post) {
    notFound()
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">AI Insights</h1>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-500 hover:text-gray-900">Home</Link>
              <Link href="/blog" className="text-blue-600 font-medium">Blog</Link>
              <Link href="/tools" className="text-gray-500 hover:text-gray-900">AI Tools</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-gray-900">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{post.title}</span>
        </nav>
      </div>

      {/* Article */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Article Header */}
          <div className="px-8 py-8 border-b border-gray-200">
            <div className="flex items-center space-x-4 mb-6">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}>
                {post.category}
              </span>
              <span className="text-gray-500 text-sm">{post.readTime} min read</span>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <span>By {post.author}</span>
                <span>•</span>
                <span>{formatDate(post.publishedAt!)}</span>
              </div>
              
              {post.tags.length > 0 && (
                <div className="flex space-x-2">
                  {post.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Article Content */}
          <div className="px-8 py-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
            />
          </div>

          {/* Article Footer */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <Link
                href="/blog"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Blog
              </Link>
              
              <div className="flex space-x-4">
                <button className="text-gray-600 hover:text-gray-900 transition-colors">
                  Share on Twitter
                </button>
                <button className="text-gray-600 hover:text-gray-900 transition-colors">
                  Share on LinkedIn
                </button>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}