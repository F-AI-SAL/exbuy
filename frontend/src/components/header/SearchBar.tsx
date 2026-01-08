'use client';
import { useRef, useState, useEffect } from 'react';
import { FaSearch, FaCamera, FaClock } from 'react-icons/fa';
import { XMarkIcon } from '@heroicons/react/24/outline';

type ImagePreview = {
  file: File;
  url: string;
};

export default function SearchBar() {
  const [q, setQ] = useState('');
  const [img, setImg] = useState<ImagePreview | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced fetch suggestions
  useEffect(() => {
    if (!q.trim()) {
      setSuggestions([]);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/suggestions?q=${encodeURIComponent(q)}`);
        if (!res.ok) {
          setSuggestions([]);
          return;
        }
        const data = await res.json();
        setSuggestions(data.suggestions || []);
      } catch {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 400);
  }, [q]);

  const handleSearch = (query?: string) => {
    const finalQuery = query ?? q;
    if (finalQuery.trim()) {
      // Save to history (max 5 items)
      setHistory((prev) => {
        const updated = [finalQuery, ...prev.filter((h) => h !== finalQuery)];
        return updated.slice(0, 5);
      });
      window.location.href = `/search?q=${encodeURIComponent(finalQuery)}`;
    }
  };

  const handleImagePick = (file: File) => {
    const url = URL.createObjectURL(file);
    setImg({ file, url });
  };

  const handleImageClear = () => {
    if (img?.url) URL.revokeObjectURL(img.url);
    setImg(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="group relative w-full max-w-2xl">
      <div className="flex items-center border rounded-full overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition">
        {/* Dropdown for category */}
        <select
          className="px-3 py-2 bg-gray-50 dark:bg-zinc-800 border-r text-sm focus:outline-none rounded-l-full"
          defaultValue="all"
        >
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="toys">Toys</option>
          <option value="grocery">Grocery</option>
        </select>

        {/* Text input */}
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products…"
          className="flex-1 px-3 py-2 bg-transparent focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />

        {/* Camera button */}
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="px-3 py-2 border-l bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
          title="Search by camera"
        >
          <FaCamera className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>

        {/* Search button */}
        <button
          type="button"
          onClick={() => handleSearch()}
          className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium hover:from-green-700 hover:to-emerald-700 transition"
        >
          <FaSearch className="h-5 w-5" />
        </button>

        {/* Hidden file input */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImagePick(file);
          }}
        />
      </div>

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <ul
          className="absolute left-0 right-0 mt-2 rounded-lg border bg-white dark:bg-zinc-900 shadow-lg max-h-60 overflow-auto z-30"
          role="listbox"
        >
          {loading && <li className="px-3 py-2 text-sm text-gray-500">Loading…</li>}
          {suggestions.map((s) => (
            <li key={s}>
              <button
                type="button"
                onClick={() => handleSearch(s)}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800 focus:bg-gray-100 dark:focus:bg-zinc-800 focus:outline-none transition"
                role="option"
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Recent search history dropdown */}
      {history.length > 0 && !q && (
        <ul
          className="absolute left-0 right-0 mt-2 rounded-lg border bg-white dark:bg-zinc-900 shadow-lg max-h-40 overflow-auto z-20"
          role="listbox"
        >
          {history.map((h) => (
            <li key={h}>
              <button
                type="button"
                onClick={() => handleSearch(h)}
                className="w-full flex items-center gap-2 text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
              >
                <FaClock className="h-4 w-4 text-gray-400" />
                {h}
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Image preview */}
      {img && (
        <div className="absolute left-0 right-0 mt-2 rounded-lg border bg-white dark:bg-zinc-900 p-3 shadow-lg">
          <div className="flex items-center gap-3">
            <img src={img.url} alt="Selected image" className="h-12 w-12 rounded object-cover" />
            <div className="flex-1 text-sm text-gray-700 dark:text-gray-300">
              Image selected. You can clear or use it for search.
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-2 py-1 rounded border hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
                onClick={handleImageClear}
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
              <button
                className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 transition text-sm font-medium"
                onClick={async () => {
                  const form = new FormData();
                  form.append('image', img.file);
                  const res = await fetch('/api/lens', {
                    method: 'POST',
                    body: form,
                  });
                  if (!res.ok) {
                    console.error('Lens API error', res.status);
                    return;
                  }
                  const data = await res.json();
                  window.location.href = `/lens/results?id=${data?.id ?? ''}`;
                }}
              >
                Use image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
