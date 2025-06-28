'use client';

import { useState } from 'react';
import { Post } from 'contentlayer/generated';
import Link from 'next/link';

type Props = {
  posts: Post[];
  locale: 'en' | 'fr';
};

export default function SearchInput({ posts, locale }: Props) {
  const [query, setQuery] = useState('');

  const filtered = posts.filter((post) => {
    const q = query.toLowerCase();
    return (
      post.title.toLowerCase().includes(q) ||
      post.description.toLowerCase().includes(q)
    );
  });

  const base = locale === 'fr' ? '/fr/blog/' : '/blog/';

  return (
    <div className="space-y-4">
      <input
        type="search"
        placeholder={locale === 'fr' ? 'Rechercher un article...' : 'Search posts...'}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="space-y-3">
        {query.length > 0 &&
          (filtered.length > 0 ? (
            filtered.map((post) => (
              <Link
                key={post.slug}
                href={`${base}${post.slug}`}
                className="block hover:underline"
              >
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(post.date).toLocaleDateString(locale, { dateStyle: 'medium' })}
                </div>
                <div className="text-base font-medium">{post.title}</div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-gray-400 italic">
              {locale === 'fr' ? 'Aucun résultat.' : 'No results.'}
            </p>
          ))}
      </div>
    </div>
  );
}
