// News API Service for fetching latest world news
// Supports multiple news sources and categories

export interface NewsAPIArticle {
  source: {
    id: string | null
    name: string
  }
  author: string | null
  title: string
  description: string
  url: string
  urlToImage: string | null
  publishedAt: string
  content: string
}

export interface NewsAPIResponse {
  status: string
  totalResults: number
  articles: NewsAPIArticle[]
}

const NEWS_API_KEY = process.env.NEWS_API_KEY || ''
const NEWS_API_BASE_URL = 'https://newsapi.org/v2'

export const newsCategories = [
  'World',
  'Business',
  'Technology',
  'Sports',
  'Entertainment',
  'Health',
  'Science',
  'Politics'
] as const

export type NewsCategory = typeof newsCategories[number]

// Map our categories to NewsAPI categories
const categoryMapping: Record<string, string> = {
  'World': 'general',
  'Business': 'business',
  'Technology': 'technology',
  'Sports': 'sports',
  'Entertainment': 'entertainment',
  'Health': 'health',
  'Science': 'science',
  'Politics': 'general'
}

/**
 * Fetch top headlines from NewsAPI
 * @param category - News category (World, Business, Technology, etc.)
 * @param country - Country code (us, gb, etc.)
 * @param pageSize - Number of articles to fetch (max 100)
 */
export async function fetchTopHeadlines(
  category: string = 'general',
  country: string = 'us',
  pageSize: number = 20
): Promise<NewsAPIResponse> {
  try {
    if (!NEWS_API_KEY) {
      console.warn('NEWS_API_KEY not found, returning mock data')
      return getMockNews(category, pageSize)
    }

    const mappedCategory = categoryMapping[category] || category.toLowerCase()
    const url = `${NEWS_API_BASE_URL}/top-headlines?country=${country}&category=${mappedCategory}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`

    const response = await fetch(url, {
      next: { revalidate: 300 } // Cache for 5 minutes
    })

    if (!response.ok) {
      throw new Error(`NewsAPI error: ${response.statusText}`)
    }

    const data: NewsAPIResponse = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching news:', error)
    return getMockNews(category, pageSize)
  }
}

/**
 * Search for news articles
 * @param query - Search query
 * @param pageSize - Number of articles to fetch
 */
export async function searchNews(
  query: string,
  pageSize: number = 20
): Promise<NewsAPIResponse> {
  try {
    if (!NEWS_API_KEY) {
      console.warn('NEWS_API_KEY not found, returning mock data')
      return getMockNews('general', pageSize)
    }

    const url = `${NEWS_API_BASE_URL}/everything?q=${encodeURIComponent(query)}&pageSize=${pageSize}&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`

    const response = await fetch(url, {
      next: { revalidate: 300 }
    })

    if (!response.ok) {
      throw new Error(`NewsAPI error: ${response.statusText}`)
    }

    const data: NewsAPIResponse = await response.json()
    return data
  } catch (error) {
    console.error('Error searching news:', error)
    return getMockNews('general', pageSize)
  }
}

/**
 * Get mock news data for development/fallback
 */
function getMockNews(category: string, count: number): NewsAPIResponse {
  const mockArticles: NewsAPIArticle[] = Array.from({ length: Math.min(count, 20) }, (_, i) => ({
    source: {
      id: 'mock-source',
      name: 'World News Network'
    },
    author: 'Editorial Team',
    title: `${category} News: Breaking Story ${i + 1} - Latest Updates from Around the World`,
    description: `Comprehensive coverage of the latest ${category.toLowerCase()} news. Stay informed with up-to-date information on current events, breaking stories, and in-depth analysis from our expert journalists.`,
    url: `https://example.com/news/${i + 1}`,
    urlToImage: `https://images.unsplash.com/photo-${1557992280 + i}?w=1200&h=630&fit=crop`,
    publishedAt: new Date(Date.now() - i * 3600000).toISOString(),
    content: `This is a detailed ${category.toLowerCase()} news article providing comprehensive coverage of recent events. Our reporters have gathered information from multiple sources to bring you the most accurate and up-to-date news. This story continues to develop, and we will provide updates as more information becomes available.\n\nExperts in the field have weighed in on these developments, offering insights into what this means for the future. The implications of these events are far-reaching and could impact various sectors.\n\nStay tuned for more updates on this developing story. Our team is working around the clock to bring you the latest information as it becomes available.`
  }))

  return {
    status: 'ok',
    totalResults: mockArticles.length,
    articles: mockArticles
  }
}

/**
 * Convert NewsAPI article to our NewsArticle format
 */
export function convertToNewsArticle(article: NewsAPIArticle, category: string) {
  // Calculate read time based on content length
  const wordsPerMinute = 200
  const wordCount = article.content?.split(' ').length || 500
  const readTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute))

  return {
    title: article.title,
    content: article.content || article.description,
    description: article.description || article.title,
    imageUrl: article.urlToImage,
    source: article.source.name || 'Unknown Source',
    sourceUrl: article.url,
    author: article.author || 'Editorial Team',
    category: category,
    tags: extractTags(article.title + ' ' + article.description),
    published: true,
    publishedAt: new Date(article.publishedAt),
    readTime: readTime,
    featured: false,
    views: 0,
    country: 'us',
    language: 'en'
  }
}

/**
 * Extract tags from title and description
 */
function extractTags(text: string): string[] {
  // Simple tag extraction - can be enhanced with NLP
  const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been', 'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should']

  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3 && !commonWords.includes(word))

  // Get unique words and return top 5
  const uniqueWords = [...new Set(words)]
  return uniqueWords.slice(0, 5)
}
