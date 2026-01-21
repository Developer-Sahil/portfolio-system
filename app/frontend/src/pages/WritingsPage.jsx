import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, Tag, BookOpen } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { writings } from '../data/mock';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';

export default function WritingsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedSeries, setSelectedSeries] = useState(null);

  // Get all unique tags and series
  const allTags = [...new Set(writings.flatMap((w) => w.tags))];
  const allSeries = [...new Set(writings.map((w) => w.series).filter(Boolean))];

  // Filter writings
  const filteredWritings = writings.filter((writing) => {
    const matchesSearch =
      writing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      writing.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || writing.tags.includes(selectedTag);
    const matchesSeries = !selectedSeries || writing.series === selectedSeries;
    return matchesSearch && matchesTag && matchesSeries;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 lg:py-20 border-b border-[#C1E8FF]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <p className="text-[#5483B3] font-medium mb-4 tracking-wide uppercase text-sm">
            Thoughts & Insights
          </p>
          <h1 className="font-serif text-display text-[#021024] mb-6">
            Writings
          </h1>
          <p className="text-body-large text-[#052659] max-w-2xl">
            Long-form articles on software engineering, system design, and the
            craft of building reliable systems. Lessons learned from building
            production software.
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
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-[#C1E8FF] focus:border-[#5483B3] focus:ring-[#5483B3]"
              />
            </div>

            {/* Series Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <BookOpen className="w-4 h-4 text-[#5483B3]" />
              <span className="text-sm text-[#5483B3] mr-2">Series:</span>
              <button
                onClick={() => setSelectedSeries(null)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  !selectedSeries
                    ? 'bg-[#021024] text-white'
                    : 'bg-[#C1E8FF] text-[#052659] hover:bg-[#7DA0CA]'
                }`}
              >
                All
              </button>
              {allSeries.map((series) => (
                <button
                  key={series}
                  onClick={() => setSelectedSeries(series === selectedSeries ? null : series)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedSeries === series
                      ? 'bg-[#021024] text-white'
                      : 'bg-[#C1E8FF] text-[#052659] hover:bg-[#7DA0CA]'
                  }`}
                >
                  {series}
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

      {/* Writings Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {filteredWritings.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#5483B3] text-lg">
                No articles found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredWritings.map((writing) => (
                <Link
                  key={writing.id}
                  to={`/writings/${writing.slug}`}
                  className="group block bg-white rounded-xl overflow-hidden border border-[#C1E8FF] hover:border-[#5483B3] hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-72 lg:w-80 flex-shrink-0">
                      <div className="aspect-[16/10] md:aspect-auto md:h-full overflow-hidden bg-[#C1E8FF]">
                        <img
                          src={writing.thumbnail}
                          alt={writing.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                    <div className="p-6 lg:p-8 flex flex-col justify-center">
                      {writing.series && (
                        <Badge className="mb-3 w-fit bg-[#052659] text-white text-xs">
                          {writing.series}
                        </Badge>
                      )}
                      <h2 className="font-serif text-xl lg:text-2xl font-semibold text-[#021024] mb-3 group-hover:text-[#052659]">
                        {writing.title}
                      </h2>
                      <p className="text-[#5483B3] mb-4 line-clamp-2">
                        {writing.excerpt}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-[#5483B3]">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {writing.readingTime} min read
                        </span>
                        <span>{formatDate(writing.publishedAt)}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {writing.tags.map((tag) => (
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
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
