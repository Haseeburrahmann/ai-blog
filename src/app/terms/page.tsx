import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | AI Insights',
  description: 'Terms of Service for AI Insights - Rules and guidelines for using our website and services.',
}

export default function TermsOfService() {
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
          <span className="text-gray-900">Terms of Service</span>
        </nav>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <div className="space-y-4">
                  <p>By accessing and using AI Insights website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
                <div className="space-y-4">
                  <p>AI Insights provides:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Educational content about artificial intelligence and technology</li>
                    <li>Reviews and recommendations of AI tools and software</li>
                    <li>News and analysis of AI industry developments</li>
                    <li>Tutorials and guides for AI implementation</li>
                    <li>Community discussion and engagement features</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Use License</h2>
                <div className="space-y-4">
                  <p>Permission is granted to temporarily download one copy of the materials on AI Insights for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose or for any public display</li>
                    <li>Attempt to reverse engineer any software contained on the website</li>
                    <li>Remove any copyright or other proprietary notations from the materials</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Content</h2>
                <div className="space-y-4">
                  <p>Users may post comments, reviews, and other content. By posting content, you grant us a non-exclusive, royalty-free license to use, reproduce, and display such content. You are responsible for:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>The accuracy and legality of your content</li>
                    <li>Ensuring your content doesn&apos;t violate any laws or third-party rights</li>
                    <li>Not posting spam, offensive, or inappropriate content</li>
                    <li>Not impersonating others or providing false information</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Prohibited Uses</h2>
                <div className="space-y-4">
                  <p>You may not use our service:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                    <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                    <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                    <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                    <li>To submit false or misleading information</li>
                    <li>To upload or transmit viruses or any other type of malicious code</li>
                    <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                    <li>For any obscene or immoral purpose</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Disclaimer</h2>
                <div className="space-y-4">
                  <p>The information on this website is provided on an &quot;as is&quot; basis. To the fullest extent permitted by law, we exclude:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>All representations, warranties, and conditions relating to this website</li>
                    <li>All liability for any direct, indirect, or consequential loss or damage</li>
                  </ul>
                  <p>AI tool recommendations are based on our analysis and testing. Results may vary based on individual use cases and requirements.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Affiliate Links</h2>
                <div className="space-y-4">
                  <p>This website may contain affiliate links to AI tools and services. We may receive a commission if you purchase through these links. This does not affect the price you pay or our editorial independence in reviewing tools.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Privacy Policy</h2>
                <div className="space-y-4">
                  <p>Your privacy is important to us. Please review our <Link href="/privacy" className="text-blue-600 hover:text-blue-800">Privacy Policy</Link>, which also governs your use of the website.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
                <div className="space-y-4">
                  <p>In no event shall AI Insights or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on AI Insights&apos; website.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Accuracy of Materials</h2>
                <div className="space-y-4">
                  <p>The materials appearing on AI Insights could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete, or current.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Modifications</h2>
                <div className="space-y-4">
                  <p>AI Insights may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
                <div className="space-y-4">
                  <p>These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
                <div className="space-y-4">
                  <p>If you have any questions about these Terms of Service, please contact us:</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Email:</strong> legal@aiinsights.com</p>
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