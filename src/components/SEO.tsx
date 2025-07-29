import Head from 'next/head'

interface SEOProps {
  title: string
  description: string
  keywords?: string
  canonical?: string
  ogImage?: string
  ogType?: string
  author?: string
  publishedTime?: string
  modifiedTime?: string
  noindex?: boolean
  article?: {
    author: string
    section: string
    publishedTime: string
    modifiedTime?: string
    tags: string[]
  }
}

export default function SEO({
  title,
  description,
  keywords = '',
  canonical,
  ogImage = '/images/og-default.jpg',
  ogType = 'website',
  author = 'AI Insights Team',
  publishedTime,
  modifiedTime,
  noindex = false,
  article
}: SEOProps) {
  const baseUrl = 'https://mindfulblogai.com' // Replace with your actual domain
  const fullTitle = title.includes('AI Insights') ? title : `${title} | AI Insights`
  const fullCanonical = canonical || baseUrl
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': article ? 'Article' : 'WebSite',
    ...(article ? {
      headline: title,
      description,
      author: {
        '@type': 'Organization',
        name: 'AI Insights',
        url: baseUrl
      },
      publisher: {
        '@type': 'Organization',
        name: 'AI Insights',
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/images/logo.png`
        }
      },
      datePublished: article.publishedTime,
      dateModified: article.modifiedTime || article.publishedTime,
      image: fullOgImage,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': fullCanonical
      },
      articleSection: article.section,
      keywords: article.tags.join(', ')
    } : {
      name: 'AI Insights',
      url: baseUrl,
      description: 'Your trusted source for AI news, tool reviews, and industry analysis',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${baseUrl}/blog?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    })
  }

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      <link rel="canonical" href={fullCanonical} />

      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:site_name" content="AI Insights" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:site" content="@aiinsights" />
      <meta name="twitter:creator" content="@aiinsights" />

      {/* Article specific meta tags */}
      {article && (
        <>
          <meta property="article:author" content={article.author} />
          <meta property="article:section" content={article.section} />
          <meta property="article:published_time" content={article.publishedTime} />
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Time-based meta tags */}
      {publishedTime && <meta name="date" content={publishedTime} />}
      {modifiedTime && <meta name="last-modified" content={modifiedTime} />}

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Additional SEO Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />

      {/* Favicons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    </Head>
  )
}