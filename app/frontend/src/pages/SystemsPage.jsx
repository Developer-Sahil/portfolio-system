import React, { useState, useEffect } from 'react';
import { Search, Wrench } from 'lucide-react';
import Layout from '../components/layout/Layout';
// import { systems } from '../data/mock'; // Removed mock
import api from '../lib/api';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';

export default function SystemsPage() {
  const [systems, setSystems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expandedSystem, setExpandedSystem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSystems();
  }, []);

  async function fetchSystems() {
    try {
      const response = await api.get('/systems/');
      setSystems(response.data);
    } catch (err) {
      console.error("Failed to fetch systems", err);
    } finally {
      setLoading(false);
    }
  }

  // Get all unique categories
  const allCategories = [...new Set(systems.map((s) => s.category))];

  // Filter systems
  const filteredSystems = systems.filter((system) => {
    const matchesSearch =
      system.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      system.usage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || system.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 lg:py-20 border-b border-glass-border">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <p className="text-accent font-medium mb-4 tracking-wide uppercase text-sm animate-in fade-in slide-in-from-bottom-2">
            Engineering Philosophy
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-medium tracking-tight text-foreground mb-6">
            Systems
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            The tools I use and why I use them. Not a list of technologies I've
            touched, but the ones I've chosen deliberately—with an honest
            assessment of where they excel and where they break.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-glass-bg border-b border-glass-border backdrop-blur-md sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            {/* Search */}
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search systems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 border-glass-border focus:border-primary focus:ring-primary text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Wrench className="w-4 h-4 text-muted-foreground" />
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
        </div>
      </section>

      {/* Systems Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-16 text-muted-foreground">Loading Systems...</div>
          ) : filteredSystems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No systems found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredSystems.map((system) => (
                <div
                  key={system.id}
                  className="bg-glass-bg border border-glass-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 backdrop-blur-sm"
                >
                  {/* Header */}
                  <div className="p-6 border-b border-glass-border bg-white/5">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-lg bg-background/50 border border-glass-border flex items-center justify-center p-2 flex-shrink-0">
                        <img
                          src={system.logo}
                          alt={system.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="hidden w-full h-full items-center justify-center text-primary font-bold text-xl">
                          {system.name.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-serif text-xl font-semibold text-foreground">
                          {system.name}
                        </h3>
                        <Badge className="mt-2 bg-secondary/50 text-secondary-foreground text-xs hover:bg-secondary">
                          {system.category}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <p className="text-sm font-medium text-accent uppercase tracking-wide mb-2">
                        How I Use It
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {system.usage}
                      </p>
                    </div>

                    <button
                      onClick={() => setExpandedSystem(expandedSystem === system.id ? null : system.id)}
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {expandedSystem === system.id ? 'Show less' : 'Show more →'}
                    </button>

                    {expandedSystem === system.id && (
                      <div className="mt-4 pt-4 border-t border-glass-border space-y-4">
                        <div>
                          <p className="text-sm font-medium text-foreground mb-1">
                            Why I Chose It
                          </p>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {system.whyChosen}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground mb-1">
                            Where It Breaks
                          </p>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {system.whereItBreaks}
                          </p>
                        </div>
                      </div>
                    )}
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
