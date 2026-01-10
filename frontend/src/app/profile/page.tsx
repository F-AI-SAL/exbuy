'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  MapPinIcon,
  PencilSquareIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';
import DashboardSidebar from '@/components/dashboard/Sidebar';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('info');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState('en');

  const user = {
    name: 'Md Faisal Al Islam',
    email: 'islammdfaisalal@gmail.com',
    phone: '+8801676286325',
    gender: 'Male',
    dob: '6 February 1996',
    joined: '12 November 2024',
    country: 'Bangladesh',
    tag: 'Business',
    avatar: '/exbuy-logo.png',
  };

  const address = {
    name: 'Md Faisal Al Islam',
    phone: '+8801676286325',
    address: '1st floor, 322, south paik para, Mirpur, 1216, Mirpur 1, Dhaka, Bangladesh',
    status: 'Default Shipping & Billing Address',
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 rounded-2xl shadow-xl">
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <DashboardSidebar />
        <div>
      {/* Header */}
      <div className="flex items-center gap-6 mb-10 border-b pb-6 dark:border-zinc-700">
        <Image
          src={user.avatar}
          alt={user.name}
          width={70}
          height={70}
          className="h-16 w-16 rounded-full object-cover shadow-md ring-2 ring-blue-500"
        />
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">{user.name}</h1>
          <span className="inline-block mt-2 text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full shadow">
            {user.tag}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b dark:border-zinc-700 mb-8">
        {[
          { key: 'info', label: 'Personal Info' },
          { key: 'address', label: 'Address' },
          { key: 'preferences', label: 'Preferences' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2 text-sm font-medium rounded-t-md transition-all ${
              activeTab === tab.key
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'info' && (
        <section className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Personal Information
            </h2>
            <Link
              href="/profile/edit"
              className="flex items-center gap-1 text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              <PencilSquareIcon className="h-4 w-4" />
              Edit
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="flex items-center gap-2">
              <UserCircleIcon className="h-5 w-5 text-blue-500" />
              <span>{user.gender}</span>
            </div>
            <div className="flex items-center gap-2">
              <EnvelopeIcon className="h-5 w-5 text-blue-500" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneIcon className="h-5 w-5 text-blue-500" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-blue-500" />
              <span>Date of Birth: {user.dob}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-blue-500" />
              <span>Joined: {user.joined}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-blue-500" />
              <span>{user.country}</span>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'address' && (
        <section className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Address</h2>
            <Link
              href="/profile/address/add"
              className="flex items-center gap-1 text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              <PlusCircleIcon className="h-4 w-4" />
              Add New
            </Link>
          </div>
          <div className="rounded-lg border bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700 p-4 shadow-sm">
            <div className="text-sm font-medium text-gray-800 dark:text-white">{address.name}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{address.phone}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">{address.address}</div>
            <div className="mt-2 text-xs text-green-600 dark:text-green-400 font-semibold">
              {address.status}
            </div>
          </div>
        </section>
      )}

      {activeTab === 'preferences' && (
        <section className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Preferences</h2>
          <div className="space-y-6">
            {/* Notifications Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">Enable Notifications</span>
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  notificationsEnabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-zinc-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Language Select */}
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full rounded-md border bg-white dark:bg-zinc-900 dark:border-zinc-700 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">English</option>
                <option value="bn">বাংলা</option>
                <option value="ar">Arabic</option>
              </select>
            </div>
          </div>
        </section>
      )}
        </div>
      </div>
    </main>
  );
}
