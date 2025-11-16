import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import SimpleAdSenseAd from '@/components/SimpleAdSenseAd'
import connectDB from '@/lib/mongodb'
import NewsArticle from '@/models/NewsArticle'

interface NewsArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

async function getNewsArticle(slug: string) {
  try {
    await connectDB()

    const article = await NewsArticle.findOne({
      slug,
      published: true
    }).select('title content description imageUrl category source sourceUrl tags publishedAt readTime author views')

    if (!article) {
      return null
    }

    // Increment view count
    article.views += 1
    await article.save()

    return {
      title: article.title,
      content: article.content,
      description: article.description,
      imageUrl: article.imageUrl,
      category: article.category,
      source: article.source,
      sourceUrl: article.sourceUrl,
      tags: article.tags,
      publishedAt: article.publishedAt?.toISOString(),
      readTime: article.readTime,
      author: article.author,
      views: article.views
    }
  } catch (error) {
    console.error('Error fetching news article:', error)
    return null
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
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
}

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
    '<a href="$2" class="text-red-600 hover:text-red-800 underline font-medium" target="_blank" rel="noopener noreferrer">$1</a>'
  )

  // Convert headers
  formattedContent = formattedContent.replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">$1</h3>')
  formattedContent = formattedContent.replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-6">$1</h2>')
  formattedContent = formattedContent.replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-gray-900 mt-12 mb-8">$1</h1>')

  // Convert bold and italic
  formattedContent = formattedContent.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
  formattedContent = formattedContent.replace(/\*(.*?)\*/g, '<em class="italic text-gray-800">$1</em>')

  // Convert blockquotes
  formattedContent = formattedContent.replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-red-500 bg-red-50 p-4 my-6 italic text-gray-900">$1</blockquote>')

  // Convert lists
  formattedContent = formattedContent.replace(/^- (.*$)/gm, '<li class="mb-2 text-gray-900">$1</li>')
  const listItemRegex = /(<li class="mb-2 text-gray-900">.*?<\/li>(\s*<li class="mb-2 text-gray-900">.*?<\/li>)*)/g
  formattedContent = formattedContent.replace(listItemRegex, '<ul class="list-disc list-inside my-6 space-y-2">$1</ul>')

  formattedContent = formattedContent.replace(/^\d+\. (.*$)/gm, '<li class="mb-2 text-gray-900">$1</li>')
  formattedContent = formattedContent.replace(/^---$/gm, '<hr class="my-8 border-t-2 border-gray-200" />')

  // Convert paragraphs
  const lines = formattedContent.split('\n')
  const processedLines = lines.map(line => {
    const trimmedLine = line.trim()
    if (trimmedLine === '') return ''
    if (trimmedLine.startsWith('<')) return line
    if (trimmedLine.startsWith('-') || /^\d+\./.test(trimmedLine)) return line
    if (trimmedLine.startsWith('#')) return line
    if (trimmedLine.startsWith('>')) return line
    return `<p class="text-gray-900 mb-6 leading-relaxed text-lg">${line}</p>`
  })

  return processedLines.join('\n')
}

export async function generateMetadata({ params }: NewsArticlePageProps) {
  const article = await getNewsArticle((await params).slug)

  if (!article) {
    return {
      title: 'Article Not Found | World News Network'
    }
  }

  return {
    title: `${article.title} | World News Network`,
    description: article.description,
    keywords: article.tags.join(', '),
    openGraph: {
      title: article.title,
      description: article.description,
      images: article.imageUrl ? [article.imageUrl] : [],
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author],
      tags: article.tags
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: article.imageUrl ? [article.imageUrl] : []
    }
  }
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const article = await getNewsArticle((await params).slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/news" className="hover:text-gray-900 transition-colors">News</Link>
            <span className="mx-2">/</span>
            <Link href={`/news?category=${article.category}`} className="hover:text-gray-900 transition-colors">
              {article.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 truncate">Article</span>
          </nav>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Badge */}
        <div className="mb-4">
          <Link href={`/news?category=${article.category}`}>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold border ${getCategoryColor(article.category)} hover:opacity-80 transition-opacity`}>
              {getCategoryIcon(article.category)} {article.category}
            </span>
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {article.title}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{article.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span>{formatDate(article.publishedAt!)}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            <span>{article.readTime} min read</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            <span>{article.views.toLocaleString()} views</span>
          </div>
          {article.source && (
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>Source: {article.source}</span>
            </div>
          )}
        </div>

        {/* Featured Image */}
        {article.imageUrl && (
          <div className="mb-8">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>
        )}

        {/* Ad */}
        <div className="my-8">
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4">
            <div className="text-center text-gray-500 text-sm mb-2">Advertisement</div>
            <SimpleAdSenseAd
              width={728}
              height={90}
              format="leaderboard"
              className="mx-auto"
            />
          </div>
        </div>

        {/* Article Description */}
        <div className="text-xl text-gray-700 mb-8 font-semibold leading-relaxed border-l-4 border-red-600 pl-4 py-2 bg-red-50">
          {article.description}
        </div>

        {/* Article Content */}
        <div
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: formatContent(article.content) }}
        />

        {/* Source Link */}
        {article.sourceUrl && (
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-gray-600 mb-2">Original Source:</p>
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-800 font-medium underline break-all"
            >
              {article.sourceUrl}
            </a>
          </div>
        )}

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Ad */}
        <div className="my-8">
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4">
            <div className="text-center text-gray-500 text-sm mb-2">Advertisement</div>
            <SimpleAdSenseAd
              width={728}
              height={90}
              format="leaderboard"
              className="mx-auto"
            />
          </div>
        </div>

        {/* Share & Back */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-gray-200">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to News
          </Link>

          <Link
            href={`/news?category=${article.category}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
          >
            More {article.category} News
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </article>
    </div>
  )
}
