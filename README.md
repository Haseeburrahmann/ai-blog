# World News Network

A modern, SEO-optimized news website built with Next.js 15.4.4 that displays latest world news across multiple categories.

## Features

- 📰 Modern news layout with breaking news ticker
- 🎯 8 news categories: World, Business, Technology, Sports, Entertainment, Health, Science, Politics
- 🔍 SEO-optimized with dynamic metadata and sitemaps
- 📱 Responsive design with Tailwind CSS 4
- 🗄️ MongoDB database with Mongoose ODM
- ⚡ Server-side rendering for optimal performance
- 🎨 Beautiful UI with gradient themes

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
MONGODB_URI=your_mongodb_connection_string
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
NEWS_API_KEY=your_newsapi_key (optional)
```

### 3. Seed Sample News Data

```bash
npm run seed-news
```

This will populate your database with 20 sample news articles across all categories.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the news website.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run seed-news` - Populate database with sample news articles

## Documentation

See [NEWS_SETUP_README.md](./NEWS_SETUP_README.md) for detailed information about:
- How news fetching works
- Database architecture
- API endpoints
- NewsAPI integration (optional)
- Troubleshooting guide

## Tech Stack

- **Framework**: Next.js 15.4.4 (App Router)
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS 4
- **Database**: MongoDB with Mongoose 8.16.5
- **Language**: TypeScript 5

## Project Structure

```
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── news/         # News pages
│   │   ├── admin/        # Admin panel
│   │   └── api/          # API routes
│   ├── components/       # React components
│   ├── lib/              # Utilities and services
│   └── models/           # Mongoose models
├── scripts/              # Utility scripts
│   └── seed-news.js      # News seeding script
└── public/               # Static assets
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Make sure to add your environment variables in the Vercel dashboard before deploying.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
