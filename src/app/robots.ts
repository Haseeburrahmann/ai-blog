import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/*',
          '/api/*',
          '/_next/*',
          '/static/*'
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/*',
          '/api/*'
        ],
      },
    ],
    sitemap: 'https://mindfulblogai.com/sitemap.xml', // Replace with your actual domain
    host: 'https://mindfulblogai.com' // Replace with your actual domain
  }
}