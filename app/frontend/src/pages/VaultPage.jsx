import React, { useState } from 'react';
import { Search, Tag, Folder, BookmarkIcon } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { vaultEntries } from '../data/mock';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';

export default function VaultPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  // Get all unique categories and tags
  const allCategories = [...new Set(vaultEntries.map((v) => v.category))];
  const allTags = [...new Set(vaultEntries.flatMap((v) => v.tags))];

  // Filter entries
  const filteredEntries = vaultEntries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || entry.category === selectedCategory;
    const matchesTag = !selectedTag || entry.tags.includes(selectedTag);
    return matchesSearch && matchesCategory && matchesTag;
  });

  // Group by category for display
  const groupedEntries = filteredEntries.reduce((acc, entry) => {
    if (!acc[entry.category]) {
      acc[entry.category] = [];
    }
    acc[entry.category].push(entry);
    return acc;
  }, {});

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 lg:py-20 border-b border-[#C1E8FF]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <p className="text-[#5483B3] font-medium mb-4 tracking-wide uppercase text-sm">
            Knowledge Base
          </p>
          <h1 className="font-serif text-display text-[#021024] mb-6">
            Vault
          </h1>
          <p className="text-body-large text-[#052659] max-w-2xl">
            Atomic knowledge entries—concepts, patterns, and mental models that
            inform how I think about software. A public second brain for
            engineering fundamentals.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b border-[#C1E8FF]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:items-center justify-between">
            {/* Search */}
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5483B3]" />
              <Input
                type="text"
                placeholder="Search vault..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-[#C1E8FF] focus:border-[#5483B3] focus:ring-[#5483B3]"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Folder className="w-4 h-4 text-[#5483B3]" />
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  !selectedCategory
                    ? 'bg-[#021024] text-white'
                    : 'bg-[#C1E8FF] text-[#052659] hover:bg-[#7DA0CA]'
                }`}
              >
                All
              </button>
              {allCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-[#021024] text-white'
                      : 'bg-[#C1E8FF] text-[#052659] hover:bg-[#7DA0CA]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap mt-4">
            <Tag className="w-4 h-4 text-[#5483B3]" />
            <span className="text-sm text-[#5483B3] mr-2">Tags:</span>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedTag === tag
                    ? 'bg-[#052659] text-white'
                    : 'bg-[#C1E8FF] text-[#052659] hover:bg-[#7DA0CA]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Vault Entries */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {filteredEntries.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#5483B3] text-lg">
                No entries found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(groupedEntries).map(([category, entries]) => (
                <div key={category}>
                  <h2 className="font-serif text-xl font-semibold text-[#021024] mb-6 flex items-center gap-2">
                    <BookmarkIcon className="w-5 h-5 text-[#5483B3]" />
                    {category}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {entries.map((entry) => (
                      <div
                        key={entry.id}
                        className="bg-white rounded-xl p-6 border border-[#C1E8FF] hover:border-[#5483B3] hover:shadow-lg transition-all duration-300"
                      >
                        <h3 className="font-serif text-lg font-semibold text-[#021024] mb-3">
                          {entry.title}
                        </h3>
                        <p className="text-[#052659] text-sm leading-relaxed mb-4">
                          {entry.content}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {entry.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="bg-[#C1E8FF] text-[#052659] text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
