'use client';
import { useRef, useState } from 'react';
import { FaCamera, FaSearch } from 'react-icons/fa';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function LensSearch() {
  const [q, setQ] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const cameraRef = useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleSearch = () => {
    if (q.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(q)}`;
    }
  };

  const handleImagePick = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleClearPreview = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = '';
    if (cameraRef.current) cameraRef.current.value = '';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleImagePick(file);
  };

  return (
    <div
      className={`group relative w-full max-w-lg border-2 rounded-lg p-2 transition 
                  ${dragActive ? 'border-blue-500 bg-blue-50 dark:bg-zinc-800' : 'border-transparent'}`}
      onDragEnter={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDragActive(false);
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="flex items-center border rounded-full overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition">
        {/* Text search input */}
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products…"
          className="flex-1 px-3 py-2 bg-transparent focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          aria-label="Search products"
        />

        {/* Camera button (pick from gallery) */}
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="px-3 py-2 border-l bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
          title="Upload image"
          aria-label="Upload image"
        >
          <FaCamera className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>

        {/* Capture button (take recent pic) */}
        <button
          type="button"
          onClick={() => cameraRef.current?.click()}
          className="px-3 py-2 border-l bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
          title="Capture photo"
          aria-label="Capture photo"
        >
          📸
        </button>

        {/* Search button */}
        <button
          type="button"
          onClick={handleSearch}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-700 hover:to-indigo-700 transition"
          aria-label="Search"
        >
          <FaSearch className="h-5 w-5" />
        </button>

        {/* Hidden file input (gallery) */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImagePick(file);
          }}
        />

        {/* Hidden camera input (recent pic) */}
        <input
          ref={cameraRef}
          type="file"
          accept="image/*"
          capture="environment" // ✅ opens camera for fresh capture
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImagePick(file);
          }}
        />
      </div>

      {/* Drag‑and‑drop hint */}
      {dragActive && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-blue-600 dark:text-blue-400 font-medium pointer-events-none">
          Drop image here to search
        </div>
      )}

      {/* Preview if image selected */}
      {preview && (
        <div className="absolute left-0 right-0 mt-2 rounded-lg border bg-white dark:bg-zinc-900 p-3 shadow-lg">
          <div className="flex items-center gap-3">
            <img src={preview} alt="Preview" className="h-12 w-12 rounded object-cover" />
            <div className="flex-1 text-sm text-gray-700 dark:text-gray-300">
              Image selected. You can clear or use it for search.
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition text-sm font-medium"
                onClick={() => {
                  alert('Image search triggered!');
                  // later: send preview file to backend /api/lens
                }}
              >
                Use image
              </button>
              <button
                className="px-2 py-1 rounded border hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
                onClick={handleClearPreview}
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
