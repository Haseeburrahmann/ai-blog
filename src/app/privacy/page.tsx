import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | AI Insights',
  description: 'Privacy Policy for AI Insights - Learn how we collect, use, and protect your personal information.',
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">AI Insights</h1>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-500 hover:text-gray-900">Home</Link>
              <Link href="/blog" className="text-gray-500 hover:text-gray-900">Blog</Link>
              <Link href="/tools" className="text-gray-500 hover:text-gray-900">AI Tools</Link>
              <Link href="/about" className="text-gray-500 hover:text-gray-900">About</Link>
              <Link href="/contact" className="text-gray-500 hover:text-gray-900">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Privacy Policy</span>
        </nav>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            <p className="text-gray-600 mb-8">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">1.1 Information You Provide</h3>
                  <p>We may collect information you provide directly to us, such as when you:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Subscribe to our newsletter or updates</li>
                    <li>Contact us through our contact forms</li>
                    <li>Leave comments on our blog posts</li>
                    <li>Participate in surveys or feedback forms</li>
                    <li>Create an account or profile</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 mt-6">1.2 Automatically Collected Information</h3>
                  <p>When you visit our website, we automatically collect certain information, including:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>IP address and general location data</li>
                    <li>Browser type and version</li>
                    <li>Operating system and device information</li>
                    <li>Pages visited and time spent on pages</li>
                    <li>Referring websites and search terms</li>
                    <li>Click-through and navigation patterns</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
                <div className="space-y-4">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide, maintain, and improve our website and services</li>
                    <li>Send you newsletters and updates (if subscribed)</li>
                    <li>Respond to your comments, questions, and requests</li>
                    <li>Analyze website usage and trends</li>
                    <li>Personalize content and improve user experience</li>
                    <li>Detect, prevent, and address technical issues</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cookies and Tracking Technologies</h2>
                <div className="space-y-4">
                  <p>We use cookies and similar tracking technologies to collect and track information about your use of our website. Types of cookies we use include:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                    <li><strong>Advertising Cookies:</strong> Used to show relevant advertisements</li>
                    <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                  </ul>
                  <p>You can control cookie settings through your browser preferences.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third-Party Services</h2>
                <div className="space-y-4">
                  <p>We may use third-party services that collect, monitor, and analyze data:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Google Analytics:</strong> Website analytics and user behavior tracking</li>
                    <li><strong>Google AdSense:</strong> Advertising services and personalized ads</li>
                    <li><strong>Social Media Platforms:</strong> Social sharing and engagement features</li>
                    <li><strong>Email Services:</strong> Newsletter delivery and communication</li>
                  </ul>
                  <p>These services have their own privacy policies governing their use of information.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Information Sharing</h2>
                <div className="space-y-4">
                  <p>We do not sell, trade, or rent your personal information. We may share information in these situations:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>With your explicit consent</li>
                    <li>To comply with legal obligations</li>
                    <li>To protect our rights and safety</li>
                    <li>With service providers who assist in website operations</li>
                    <li>In case of business transfers or mergers</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Security</h2>
                <div className="space-y-4">
                  <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is 100% secure.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights</h2>
                <div className="space-y-4">
                  <p>Depending on your location, you may have the following rights:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access to your personal information</li>
                    <li>Correction of inaccurate information</li>
                    <li>Deletion of your personal information</li>
                    <li>Restriction of processing</li>
                    <li>Data portability</li>
                    <li>Objection to processing</li>
                    <li>Withdrawal of consent</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children&apos;s Privacy</h2>
                <div className="space-y-4">
                  <p>Our website is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Policy</h2>
                <div className="space-y-4">
                  <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last Updated&quot; date.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
                <div className="space-y-4">
                  <p>If you have any questions about this Privacy Policy, please contact us:</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Email:</strong> privacy@aiinsights.com</p>
                    <p><strong>Website:</strong> <Link href="/contact" className="text-blue-600 hover:text-blue-800">Contact Form</Link></p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}