'use client';
import Link from 'next/link';
import {
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  QuestionMarkCircleIcon,
  PhoneIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import DashboardSidebar from '@/components/dashboard/Sidebar';

export default function SupportPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12 bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 rounded-2xl shadow-xl">
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <DashboardSidebar />
        <div>
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
          Connect with Us – We Value Your Feedback
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Chat with our friendly team for quick help with any questions or issues you may have.
        </p>
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {[
          {
            icon: <EnvelopeIcon className="h-8 w-8 text-blue-600" />,
            title: 'Email Us',
            desc: 'Our friendly team is always ready to assist you with any inquiries or issues.',
            link: 'support@exbuy.com.bd',
          },
          {
            icon: <ChatBubbleLeftRightIcon className="h-8 w-8 text-blue-600" />,
            title: 'Chat to Social Media',
            desc: 'Connect with us on social media for updates, support, and exclusive content.',
            link: 'Let’s Chat',
          },
          {
            icon: <QuestionMarkCircleIcon className="h-8 w-8 text-blue-600" />,
            title: 'Help Center',
            desc: 'Explore our help center for FAQs, guides, and detailed support articles.',
            link: 'Explore Help Center',
          },
          {
            icon: <PhoneIcon className="h-8 w-8 text-blue-600" />,
            title: 'Call Us',
            desc: "Call now for friendly support. We're open Saturday–Friday, 10 am – 08 pm.",
            link: '+8809666786000',
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl border bg-white dark:bg-zinc-900 dark:border-zinc-700 p-8 shadow-md hover:shadow-lg transition hover:scale-105"
          >
            {item.icon}
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mt-3">
              {item.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{item.desc}</p>
            <p className="text-sm font-medium text-blue-600 mt-3">{item.link}</p>
          </div>
        ))}
      </div>

      {/* Location */}
      <div className="rounded-xl border bg-white dark:bg-zinc-900 dark:border-zinc-700 p-8 shadow-md mb-16 hover:shadow-lg transition">
        <MapPinIcon className="h-8 w-8 text-blue-600 mb-2" />
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Our Location</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Meet our friendly team at this location for personalized assistance and a warm welcome.
        </p>
        <p className="text-sm font-medium text-blue-600 mt-3">
          Plot 1020, Road 9, Avenue 9, Mirpur DOHS, Dhaka-1216, Bangladesh
        </p>
        <Link
          href="#"
          className="inline-block mt-3 text-sm font-medium text-blue-600 hover:underline"
        >
          Find on Map
        </Link>
      </div>

      {/* FAQ Section */}
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6 mb-16">
        {[
          {
            q: 'What are your customer service contact details?',
            a: (
              <>
                Phone Number: +8809666786000 <br />
                Email Address: support@exbuy.com.bd <br />
                Live Chat: Available 24/7 on our website.
              </>
            ),
          },
          {
            q: 'What are your business hours for customer service?',
            a: 'Our support team is available from Saturday to Friday, 10:00 AM to 10:00 PM (Dhaka/Asia). For assistance outside these hours, please email us, and we will respond within 24 hours.',
          },
          {
            q: 'Can I track my order?',
            a: 'Yes, you can track your order through the tracking link provided in your shipping confirmation email. If you have any issues, please contact our support team at support@exbuy.com.bd',
          },
          {
            q: 'What languages do you support for customer service?',
            a: 'We currently support English and Bangla for customer service. For assistance outside these hours, please email us, and we will respond within 24 hours.',
          },
        ].map((faq, idx) => (
          <div
            key={idx}
            className="rounded-xl border bg-white dark:bg-zinc-900 dark:border-zinc-700 p-6 shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{faq.q}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{faq.a}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="rounded-xl border bg-white dark:bg-zinc-900 dark:border-zinc-700 p-8 shadow-md text-center">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Still Have Questions?
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Can’t find the answer you’re looking for? Please chat to our friendly team.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="#"
            className="px-5 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Talk to The Experts
          </Link>
          <Link
            href="#"
            className="px-5 py-2 text-sm rounded-md border bg-gray-100 dark:bg-zinc-800 dark:border-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-700 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-10">
        <p>© 2019-2025 ExBuy Technologies Ltd. All rights Reserved.</p>
        <div className="flex justify-center gap-6 mt-2">
          <Link href="#" className="hover:underline">
            Terms & Conditions
          </Link>
          <Link href="#" className="hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
        </div>
      </div>
    </main>
  );
}
