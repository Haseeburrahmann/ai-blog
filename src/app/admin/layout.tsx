'use client'

import ProtectedRoute from '@/components/ProtectedRoute'
import { usePathname } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  // Don't protect the login page
  const isLoginPage = pathname === '/admin/login'

  return isLoginPage ? (
    children
  ) : (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  )
}