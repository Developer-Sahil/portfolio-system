import React, { useState, useEffect } from 'react';
import { Search, Tag, Folder, BookmarkIcon } from 'lucide-react';
import Layout from '../components/layout/Layout';
// import { vaultEntries } from '../data/mock'; // Removed mock
import api from '../lib/api';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';

export default function VaultPage() {
  const [vaultEntries, setVaultEntries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVaultEntries();
  }, []);

  async function fetchVaultEntries() {
    try {
      const response = await api.get('/vault/');
      setVaultEntries(response.data);
    } catch (err) {
      console.error("Failed to fetch vault entries", err);
    } finally {
      setLoading(false);
    }
  }

  // Get all unique categories and tags
  const allCategories = [...new Set(vaultEntries.map((v) => v.category))];
  const allTags = [...new Set(vaultEntries.flatMap((v) => v.tags || []))];

  // Filter entries
  const filteredEntries = vaultEntries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || entry.category === selectedCategory;
    const matchesTag = !selectedTag || (entry.tags && entry.tags.includes(selectedTag));
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
      <section className="py-16 lg:py-20 border-b border-glass-border">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <p className="text-accent font-medium mb-4 tracking-wide uppercase text-sm animate-in fade-in slide-in-from-bottom-2">
            Knowledge Base
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-medium tracking-tight text-foreground mb-6">
            Vault
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Atomic knowledge entries—concepts, patterns, and mental models that
            inform how I think about software. A public second brain for
            engineering fundamentals.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-glass-bg border-b border-glass-border backdrop-blur-md sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* ... existing filters UI ... */}
          <div className="flex flex-col lg:flex-row gap-6 lg:items-center justify-between">
            {/* Search */}
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search vault..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 border-glass-border focus:border-primary focus:ring-primary text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Folder className="w-4 h-4 text-muted-foreground" />
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${!selectedCategory
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-glass-bg border-glass-border text-muted-foreground hover:bg-white/10 hover:text-foreground'
                  }`}
              >
                All
              </button>
              {allCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${selectedCategory === category
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-glass-bg border-glass-border text-muted-foreground hover:bg-white/10 hover:text-foreground'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap mt-4">
            <Tag className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-foreground mr-2">Tags:</span>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors border ${selectedTag === tag
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-glass-bg border-glass-border text-muted-foreground hover:bg-white/10 hover:text-foreground'
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
          {loading ? (
            <div className="text-center py-16 text-muted-foreground">Loading Vault...</div>
          ) : filteredEntries.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No entries found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(groupedEntries).map(([category, entries]) => (
                <div key={category}>
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-6 flex items-center gap-2 border-b border-glass-border pb-2">
                    <BookmarkIcon className="w-5 h-5 text-primary" />
                    {category}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {entries.map((entry) => (
                      <div
                        key={entry.id}
                        className="bg-glass-bg rounded-xl p-6 border border-glass-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 backdrop-blur-sm group"
                      >
                        <h3 className="font-serif text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {entry.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                          {entry.content}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {entry.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="bg-secondary/30 text-muted-foreground hover:bg-secondary/50 border-glass-border text-xs"
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
