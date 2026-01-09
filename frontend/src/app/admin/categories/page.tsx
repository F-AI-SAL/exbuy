'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';

type Category = {
  id: number;
  name: string;
  slug: string;
  image?: string | null;
};

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Search state
  const [search, setSearch] = useState('');

  // ✅ Fetch categories inside effect
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        const data: Category[] = await res.json();
        setCategories(data);
      } catch (err) {
        console.error('Failed to fetch categories', err);
      }
    };
    loadCategories();
  }, []);

  // ✅ Derive filtered list using useMemo
  const filtered = useMemo(() => {
    if (categories.length === 0) return [];
    const q = search.toLowerCase();
    return categories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(q) ||
        cat.slug.toLowerCase().includes(q)
    );
  }, [search, categories]);

  // ✅ Reset page when search changes (in handler, not effect)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name,
        slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
        image: image ? image.name : null,
      };

      const url = editingId ? `/api/categories/${editingId}` : '/api/categories';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage({
          type: 'success',
          text: editingId ? '✏️ Category updated successfully!' : '✅ Category added successfully!',
        });
        setName('');
        setSlug('');
        setImage(null);
        setEditingId(null);
        // reload categories
        const reload = async () => {
          const res = await fetch('/api/categories');
          const data: Category[] = await res.json();
          setCategories(data);
        };
        reload();
      } else {
        setMessage({ type: 'error', text: '❌ Failed to save category.' });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: '❌ Error occurred while saving category.' });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessage({ type: 'success', text: '🗑️ Category deleted successfully!' });
        const reload = async () => {
          const res = await fetch('/api/categories');
          const data: Category[] = await res.json();
          setCategories(data);
        };
        reload();
      } else {
        setMessage({ type: 'error', text: '❌ Failed to delete category.' });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: '❌ Error occurred while deleting category.' });
    }
  };

  const handleEdit = (cat: Category) => {
    setEditingId(cat.id);
    setName(cat.name);
    setSlug(cat.slug);
    setImage(null);
  };

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <main className="px-6 py-16 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">⚙️ Admin Panel — Manage Categories</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search categories..."
          value={search}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Add / Edit Category Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 mb-10 bg-white dark:bg-zinc-900 shadow rounded-lg p-6"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? '✏️ Edit Category' : '➕ Add Category'}
        </h2>
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          placeholder="Slug (optional)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full px-6 py-3 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          {editingId ? 'Update Category' : 'Add Category'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setName('');
              setSlug('');
              setImage(null);
            }}
            className="w-full px-6 py-3 rounded bg-gray-300 text-black font-semibold hover:bg-gray-400 transition mt-2"
          >
            Cancel Edit
          </button>
        )}
      </form>

      {/* Feedback Message */}
      {message && (
        <div
          className={`mb-6 px-4 py-3 rounded ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Category List */}
      <h2 className="text-2xl font-bold mb-6">📂 Existing Categories</h2>
      {currentItems.length === 0 ? (
        <p className="text-gray-600">No categories found.</p>
      ) : (
        <ul className="space-y-4">
          {currentItems.map((cat) => (
            <li
              key={cat.id}
              className="flex items-center justify-between border rounded-lg p-4 bg-white dark:bg-zinc-900 shadow hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                {cat.image && cat.image.trim() !== '' ? (
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded object-cover border"
                  />
                ) : (
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                    {cat.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-lg">{cat.name}</h3>
                  <p className="text-gray-600">/{cat.slug}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(cat)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  🗑️ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ◀ Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next ▶
          </button>
        </div>
      )}
    </main>
  );
}
