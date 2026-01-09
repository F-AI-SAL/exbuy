'use client';
import { useRef, useState, useEffect } from 'react';
import { FaSearch, FaCamera, FaClock } from 'react-icons/fa';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

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
      <div className="flex items-center overflow-hidden rounded-full border border-zinc-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-emerald-500">
        <select
          className="bg-zinc-50 px-3 py-2 text-sm focus:outline-none"
          defaultValue="all"
        >
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="toys">Toys</option>
          <option value="grocery">Grocery</option>
        </select>

        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products"
          className="flex-1 bg-transparent px-3 py-2 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />

        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="border-l border-zinc-200 px-3 py-2 text-zinc-500 hover:text-emerald-600"
          title="Search by camera"
        >
          <FaCamera className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={() => handleSearch()}
          className="bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
        >
          <FaSearch className="h-5 w-5" />
        </button>

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

      {suggestions.length > 0 && (
        <ul
          className="absolute left-0 right-0 z-30 mt-2 max-h-60 overflow-auto rounded-lg border border-zinc-200 bg-white shadow-lg"
          role="listbox"
        >
          {loading && <li className="px-3 py-2 text-sm text-zinc-500">Loading...</li>}
          {suggestions.map((s) => (
            <li key={s}>
              <button
                type="button"
                onClick={() => handleSearch(s)}
                className="w-full px-3 py-2 text-left text-sm hover:bg-zinc-100"
                role="option"
                aria-selected={false}
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
      )}

      {history.length > 0 && !q && (
        <ul
          className="absolute left-0 right-0 z-20 mt-2 max-h-40 overflow-auto rounded-lg border border-zinc-200 bg-white shadow-lg"
          role="listbox"
        >
          {history.map((h) => (
            <li key={h}>
              <button
                type="button"
                onClick={() => handleSearch(h)}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-zinc-100"
                role="option"
                aria-selected={false}
              >
                <FaClock className="h-4 w-4 text-zinc-400" />
                {h}
              </button>
            </li>
          ))}
        </ul>
      )}

      {img && (
        <div className="absolute left-0 right-0 mt-2 rounded-lg border border-zinc-200 bg-white p-3 shadow-lg">
          <div className="flex items-center gap-3">
            <Image
              src={img.url}
              alt="Selected image"
              width={48}
              height={48}
              className="rounded object-cover"
            />
            <div className="flex-1 text-sm text-zinc-600">
              Image selected. You can clear it or use it for search.
            </div>
            <div className="flex items-center gap-2">
              <button
                className="rounded border border-zinc-200 px-2 py-1 hover:bg-zinc-50"
                onClick={handleImageClear}
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
              <button
                className="rounded bg-emerald-600 px-3 py-1 text-sm font-medium text-white hover:bg-emerald-700"
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