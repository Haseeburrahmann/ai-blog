'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavigationProps {
  className?: string
}

export default function Navigation({ className = '' }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  // Close mobile menu when clicking outside or pressing escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/news', label: 'All News' },
    { href: '/news?category=World', label: 'World' },
    { href: '/news?category=Business', label: 'Business' },
    { href: '/news?category=Technology', label: 'Technology' },
    { href: '/news?category=Sports', label: 'Sports' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <header className={`bg-white shadow-sm border-b sticky top-0 z-50 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:py-6">
            {/* Logo */}
            <Link href="/" className="flex items-center" onClick={closeMobileMenu}>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">WN</span>
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">World News</h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6 lg:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors text-sm lg:text-base ${
                    isActive(item.href)
                      ? 'text-blue-600 font-medium'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">Open main menu</span>
              <div className="relative w-6 h-6">
                <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-45 top-3' : 'top-1'
                }`} />
                <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 top-3 ${
                  mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`} />
                <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                  mobileMenuOpen ? '-rotate-45 top-3' : 'top-5'
                }`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu - Slide in from right */}
      <div className={`md:hidden fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Mobile menu header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">WN</span>
              </div>
              <span className="text-lg font-bold text-gray-900">World News</span>
            </div>
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <span className="sr-only">Close menu</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation links */}
          <div className="flex-1 px-4 py-6 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu footer */}
          <div className="px-4 py-6 border-t border-gray-200">
            <Link
              href="/admin"
              onClick={closeMobileMenu}
              className="block px-4 py-3 rounded-lg text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              Admin Panel
            </Link>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                © 2025 World News Network
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu backdrop */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </>
  )
}