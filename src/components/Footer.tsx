'use client';

import Link from 'next/link';
import { Sparkles, Mail, Twitter, Github } from 'lucide-react';

const footerLinks = {
  discover: [
    { href: '/categories', label: 'AI Categories' },
    { href: '/comparisons', label: 'Tool Comparisons' },
    { href: '/deals', label: 'Exclusive Deals' },
    { href: '/top-rated', label: 'Top Rated Tools' },
  ],
  resources: [
    { href: '/blog', label: 'Blog' },
    { href: '/guides', label: 'Buying Guides' },
    { href: '/newsletter', label: 'Newsletter' },
    { href: '/about', label: 'About Us' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/disclaimer', label: 'Affiliate Disclaimer' },
  ],
};

const socialLinks = [
  { href: 'https://twitter.com/mindfulblogai', icon: Twitter, label: 'Twitter' },
  { href: 'https://github.com/mindfulblogai', icon: Github, label: 'GitHub' },
  { href: 'mailto:hello@mindfulblogai.com', icon: Mail, label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Mindful<span className="text-indigo-400">Blog</span>AI
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              Discover and compare the best AI tools for productivity, creativity, and business. 
              Making AI accessible for everyone.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Discover */}
          <div>
            <h3 className="text-white font-semibold mb-4">Discover</h3>
            <ul className="space-y-2">
              {footerLinks.discover.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} MindfulBlogAI. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Some links are affiliate links. We may earn a commission at no extra cost to you.
          </p>
        </div>
      </div>
    </footer>
  );
}
