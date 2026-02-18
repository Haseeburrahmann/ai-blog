'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles, Search } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/categories', label: 'Categories' },
  { href: '/comparisons', label: 'Comparisons' },
  { href: '/deals', label: 'Deals' },
  { href: '/blog', label: 'Blog' },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm' 
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Mindful<span className="text-indigo-600">Blog</span>AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/search"
              className="p-2 text-gray-500 hover:text-indigo-600 transition-colors rounded-lg hover:bg-gray-100"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Link>
            <Link href="/submit" className="btn-primary text-sm">
              Submit Tool
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-indigo-600 rounded-lg hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-gray-100 mt-2 pt-2">
                <Link
                  href="/submit"
                  onClick={() => setIsMenuOpen(false)}
                  className="mx-4 btn-primary text-sm text-center"
                >
                  Submit Tool
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
