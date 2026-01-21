import React, { useState } from 'react';
import { Search, Wrench } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { systems } from '../data/mock';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';

export default function SystemsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expandedSystem, setExpandedSystem] = useState(null);

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
      <section className="py-16 lg:py-20 border-b border-[#C1E8FF]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <p className="text-[#5483B3] font-medium mb-4 tracking-wide uppercase text-sm">
            Engineering Philosophy
          </p>
          <h1 className="font-serif text-display text-[#021024] mb-6">
            Systems
          </h1>
          <p className="text-body-large text-[#052659] max-w-2xl">
            The tools I use and why I use them. Not a list of technologies I've
            touched, but the ones I've chosen deliberately—with an honest
            assessment of where they excel and where they break.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b border-[#C1E8FF]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            {/* Search */}
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5483B3]" />
              <Input
                type="text"
                placeholder="Search systems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-[#C1E8FF] focus:border-[#5483B3] focus:ring-[#5483B3]"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Wrench className="w-4 h-4 text-[#5483B3]" />
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
        </div>
      </section>

      {/* Systems Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {filteredSystems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#5483B3] text-lg">
                No systems found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredSystems.map((system) => (
                <div
                  key={system.id}
                  className="bg-white rounded-xl border border-[#C1E8FF] overflow-hidden hover:border-[#5483B3] transition-all duration-300"
                >
                  {/* Header */}
                  <div className="p-6 border-b border-[#C1E8FF]">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-lg bg-[#FAFBFC] border border-[#C1E8FF] flex items-center justify-center p-2 flex-shrink-0">
                        <img
                          src={system.logo}
                          alt={system.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="hidden w-full h-full items-center justify-center text-[#5483B3] font-bold text-xl">
                          {system.name.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-serif text-xl font-semibold text-[#021024]">
                          {system.name}
                        </h3>
                        <Badge className="mt-2 bg-[#C1E8FF] text-[#052659] text-xs">
                          {system.category}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <p className="text-sm font-medium text-[#5483B3] uppercase tracking-wide mb-2">
                        How I Use It
                      </p>
                      <p className="text-[#052659] text-sm leading-relaxed">
                        {system.usage}
                      </p>
                    </div>

                    <button
                      onClick={() => setExpandedSystem(expandedSystem === system.id ? null : system.id)}
                      className="text-sm font-medium text-[#052659] hover:text-[#5483B3] transition-colors"
                    >
                      {expandedSystem === system.id ? 'Show less' : 'Show more →'}
                    </button>

                    {expandedSystem === system.id && (
                      <div className="mt-4 pt-4 border-t border-[#C1E8FF] space-y-4">
                        <div>
                          <p className="text-sm font-medium text-[#021024] mb-1">
                            Why I Chose It
                          </p>
                          <p className="text-[#5483B3] text-sm leading-relaxed">
                            {system.whyChosen}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#021024] mb-1">
                            Where It Breaks
                          </p>
                          <p className="text-[#5483B3] text-sm leading-relaxed">
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
