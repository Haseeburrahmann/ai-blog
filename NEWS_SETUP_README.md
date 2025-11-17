# News Website Setup Guide

## 📰 How News Fetching Works

### Current Architecture

Your news website has a flexible architecture that supports **two modes** of operation:

#### Mode 1: Database-Driven News (Current Default)
- News articles are stored in **MongoDB** using the `NewsArticle` model
- Articles are created through the **Admin Panel** (`/admin`)
- The homepage and `/news` page fetch articles from `/api/news/articles`
- **This is why you're seeing no news** - the database is currently empty!

#### Mode 2: Live News API Integration (Optional)
- Supports integration with **NewsAPI.org** for real-time world news
- Located in `src/lib/newsApi.ts`
- Requires a `NEWS_API_KEY` environment variable
- When configured, can automatically fetch latest news from external sources

### Why You're Seeing No News

The website is currently fetching from your **empty MongoDB database**. You need to either:

1. **Add news manually** through the admin panel, OR
2. **Run the sample data script** (see below), OR
3. **Configure live news API** (optional)

---

## 🚀 Quick Start: Add Sample News

### Option 1: Run the Sample News Script

We've created a script that populates your database with sample news articles across all categories.

```bash
npm run seed-news
```

This will create:
- 20 sample news articles
- Coverage across all 8 categories (World, Business, Technology, Sports, etc.)
- Mix of featured and regular articles
- Realistic timestamps and content

### Option 2: Use the Admin Panel

1. Go to `/admin`
2. Log in with credentials:
   - **Username**: `Admin`
   - **Password**: `admin123`
3. Click "Create New Article"
4. Fill in the form:
   - Title
   - Description (short summary)
   - Content (full article)
   - Category (World, Business, Technology, etc.)
   - Tags (optional)
   - Image URL (optional - use Unsplash for free images)
   - Mark as "Featured" for homepage display
5. Click "Publish"

---

## 🔌 Optional: Configure Live News API

If you want to fetch real news from NewsAPI.org:

### Step 1: Get an API Key

1. Go to [newsapi.org](https://newsapi.org/)
2. Sign up for a free account
3. Copy your API key

### Step 2: Add to Environment Variables

Create/update `.env.local`:

```env
MONGODB_URI=your_mongodb_connection_string
NEWS_API_KEY=your_newsapi_key_here
```

### Step 3: The API Will Work Automatically

The news service (`src/lib/newsApi.ts`) will:
- Automatically use NewsAPI when `NEWS_API_KEY` is present
- Fall back to mock data when the key is missing
- Cache results for 5 minutes to avoid rate limits

### Step 4: Create an Admin Function to Import News

You can create a simple admin page to fetch and import news:

```typescript
// Example: /app/admin/import-news/page.tsx
import { fetchTopHeadlines } from '@/lib/newsApi'

// Fetch and save to database
const news = await fetchTopHeadlines('Technology', 'us', 10)
// Then save to MongoDB...
```

---

## 📊 Database Structure

### NewsArticle Model Fields

```typescript
{
  title: string              // Required: Article headline
  slug: string               // Auto-generated from title
  content: string            // Required: Full article content
  description: string        // Required: Short summary (max 500 chars)
  imageUrl?: string          // Optional: Featured image URL
  source: string             // Default: "World News Network"
  sourceUrl?: string         // Optional: Original article URL
  author: string             // Default: "Editorial Team"
  category: string           // Required: World | Business | Technology | Sports | Entertainment | Health | Science | Politics
  tags: string[]             // Optional: Array of tags
  published: boolean         // true = visible to public
  publishedAt: Date          // Auto-set when published
  readTime: number           // Auto-calculated or manual
  featured: boolean          // true = shows on homepage
  views: number              // Auto-incremented on read
  country: string            // Default: "us"
  language: string           // Default: "en"
}
```

---

## 🎨 Customization Tips

### Change Website Name

Update in these files:
- `src/app/layout.tsx` - SEO metadata
- `src/components/Navigation.tsx` - Logo and name
- `src/app/page.tsx` - Homepage title
- `src/app/about/page.tsx` - About page content

### Change Colors

The website uses Tailwind CSS. Main colors:
- **Primary**: Red (`red-600`, `red-700`)
- **Secondary**: Orange (`orange-600`)
- **Accent**: Blue, Green, Purple for categories

Update in component files or create a custom Tailwind theme.

### Add Your Domain

Update `baseUrl` in:
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/app/layout.tsx`

---

## 🔧 API Endpoints

### Public Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/news/articles` | GET | Get published articles |
| `/api/news/articles?category=World` | GET | Filter by category |
| `/api/news/articles?limit=20` | GET | Limit results |

### Admin Endpoints (Require Authentication)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/admin/news` | POST | Create new article |
| `/api/admin/news` | GET | Get all articles (including drafts) |
| `/api/admin/news/[id]` | GET | Get single article |
| `/api/admin/news/[id]` | PUT | Update article |
| `/api/admin/news/[id]` | DELETE | Delete article |

---

## 🐛 Troubleshooting

### "No News Articles Yet" on Homepage

**Cause**: Database is empty
**Fix**: Run `npm run seed-news` or create articles via admin panel

### "Database connection failed"

**Cause**: MongoDB not connected
**Fix**: Check your `MONGODB_URI` in `.env.local`

### Images Not Showing

**Cause**: Image URLs not configured in `next.config.js`
**Fix**: Add image domains to `remotePatterns` in `next.config.js`

### Build Errors

If you get import errors, make sure all files are using `NewsArticle` not `BlogPost`

---

## 📝 Content Guidelines

When creating news articles:

1. **Use descriptive titles** (60-100 characters)
2. **Write compelling descriptions** (150-300 characters)
3. **Add relevant tags** for better discovery
4. **Use high-quality images** (1200x630px recommended)
5. **Mark important stories as featured** (max 3 at a time)
6. **Choose appropriate categories**
7. **Verify your sources** before publishing

---

## 🚦 Next Steps

1. ✅ Run the sample news script: `npm run seed-news`
2. ✅ Visit your homepage to see news articles
3. ✅ Test the admin panel at `/admin`
4. ✅ Customize branding and colors
5. ⚠️ Change default admin password (see below)
6. ✅ Update domain in config files
7. ✅ (Optional) Set up NewsAPI integration

---

## 🔐 Security Notes

### Change Admin Password

The default credentials are:
- Username: `Admin`
- Password: `admin123`

**⚠️ IMPORTANT**: Change this in `src/contexts/AuthContext.tsx` before deploying to production!

Better yet, implement proper authentication with:
- NextAuth.js
- JWT tokens
- Database-backed user management

---

## 📞 Need Help?

If you encounter issues:

1. Check the browser console for errors
2. Check the server logs (`npm run dev`)
3. Verify your `.env.local` file
4. Make sure MongoDB is connected
5. Try running `npm install` again

---

**Happy News Publishing! 📰**
