'use client';

import { useState, useEffect } from 'react';
import { FaSearch, FaMicrophone } from 'react-icons/fa';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface Suggestion {
  id: string | number;
  label: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    console.log('Searching for:', query);
    setShowSuggestions(false);
  };

  const clearQuery = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // Fake auto-suggest logic (replace with API call)
  useEffect(() => {
    if (query.length > 1) {
      // Example: simulate suggestions
      setSuggestions([
        { id: 1, label: `${query} product` },
        { id: 2, label: `${query} category` },
        { id: 3, label: `${query} service` },
      ]);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  // Voice search (Web Speech API)
  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice search not supported in this browser.');
      return;
    }
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setShowSuggestions(false);
    };
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto px-4">
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center w-full"
        role="search"
        aria-label="Site search"
      >
        {/* Input field */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products, categories, or services..."
          className="w-full rounded-full border border-gray-300 dark:border-zinc-700 
                     bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md 
                     px-5 py-3 pr-20 text-sm md:text-base 
                     text-gray-800 dark:text-gray-200 
                     placeholder-gray-500 dark:placeholder-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 
                     shadow-sm transition-all duration-300"
        />

        {/* Clear button */}
        {query && (
          <button
            type="button"
            onClick={clearQuery}
            aria-label="Clear search"
            className="absolute right-16 flex items-center justify-center 
                       text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 
                       dark:hover:text-zinc-300 transition-colors"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}

        {/* Voice search mic */}
        <button
          type="button"
          onClick={handleVoiceSearch}
          aria-label="Voice search"
          className="absolute right-10 flex items-center justify-center 
                     text-red-500 hover:text-red-600 transition-colors"
        >
          <FaMicrophone className="h-5 w-5" />
        </button>

        {/* Search button */}
        <button
          type="submit"
          aria-label="Search"
          className="absolute right-3 flex items-center justify-center 
                     text-blue-600 dark:text-blue-400 hover:text-blue-700 
                     dark:hover:text-blue-300 transition-colors"
        >
          <FaSearch className="h-5 w-5" />
        </button>
      </form>

      {/* Auto-suggest dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full mt-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-lg z-50">
          {suggestions.map((s) => (
            <li
              key={s.id}
              onClick={() => {
                setQuery(s.label);
                setShowSuggestions(false);
              }}
              className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer"
            >
              {s.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
