import type { Metadata } from 'next';
import Link from 'next/link';
import { Brain, BookOpen, Wrench, Mail, Target, Users, Lightbulb } from 'lucide-react';
import { SITE_NAME, SITE_EMAIL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Us',
  description: `${SITE_NAME} is your trusted source for AI insights, honest reviews, free tools, and practical guides to navigate the AI landscape.`,
};

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-b from-indigo-50 to-white dark:from-gray-950 dark:to-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 text-white mb-6">
            <Brain size={32} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
            About {SITE_NAME}
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Helping you navigate the AI revolution with honest insights, practical tools, and expert guidance.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-narrow">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-400">
              AI is transforming every industry, but the landscape is overwhelming. New tools launch daily,
              marketing claims are exaggerated, and it&apos;s hard to know what actually works.
              We cut through the noise.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {SITE_NAME} exists to be your trusted guide in the AI ecosystem. We provide
              in-depth, honest reviews of AI tools, write practical guides that help you actually use AI
              effectively, and build free tools that solve real problems.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: 'Expert Blog',
                description: 'In-depth articles covering AI tools, strategies, and trends across industries like finance, legal, marketing, and development.',
              },
              {
                icon: Wrench,
                title: 'Free AI Tools',
                description: 'Powerful browser-based tools that run locally. No signup, no data collection, no limits. From word counters to AI cost calculators.',
              },
              {
                icon: Mail,
                title: 'Weekly Newsletter',
                description: 'Curated AI news, new tool discoveries, and actionable tips delivered to your inbox every week. Join our growing community.',
              },
            ].map(({ icon: Icon, title, description }) => (
              <div key={title} className="card p-8 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 mb-4">
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: 'Honesty First', desc: 'We tell you what works and what doesn\'t. No hype, no sponsored rankings, no hidden agendas.' },
              { icon: Users, title: 'Community Driven', desc: 'We build for our readers. Your feedback shapes our content, tools, and priorities.' },
              { icon: Lightbulb, title: 'Practical Focus', desc: 'Everything we create is designed to be actionable. Theory is great, but results matter more.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-narrow text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Have a question, suggestion, or want to collaborate? We&apos;d love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={`mailto:${SITE_EMAIL}`} className="btn-primary">
              <Mail size={18} className="mr-2" />
              Contact Us
            </a>
            <Link href="/newsletter" className="btn-secondary">
              Join Newsletter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
