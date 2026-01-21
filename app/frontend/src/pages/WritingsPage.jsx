import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, Tag, BookOpen } from 'lucide-react';
import Layout from '../components/layout/Layout';
// import { writings } from '../data/mock'; // Removed mock
import api from '../lib/api';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';

export default function WritingsPage() {
  const [writings, setWritings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWritings();
  }, []);

  async function fetchWritings() {
    try {
      const response = await api.get('/writings/');
      setWritings(response.data);
    } catch (err) {
      console.error("Failed to fetch writings", err);
    } finally {
      setLoading(false);
    }
  }

  // Get all unique tags and series
  const allTags = [...new Set(writings.flatMap((w) => w.tags || []))];
  const allSeries = [...new Set(writings.map((w) => w.series).filter(Boolean))];

  // Filter writings
  const filteredWritings = writings.filter((writing) => {
    const matchesSearch =
      writing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (writing.excerpt && writing.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTag = !selectedTag || (writing.tags && writing.tags.includes(selectedTag));
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
      {/* Hero Section */}
      <section className="py-16 lg:py-20 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Badge variant="ice-blue" className="mb-4 px-4 py-1.5 text-sm uppercase tracking-wider font-semibold">
            Thoughts & Insights
          </Badge>
          <h1 className="font-serif text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            Writings
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
            Long-form articles on software engineering, system design, and the
            craft of building reliable systems. Lessons learned from building
            production software.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      {/* Filters Section */}
      <section className="py-8 bg-white/80 border-b border-slate-100 backdrop-blur-md sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* ... existing filters UI ... */}
          <div className="flex flex-col lg:flex-row gap-6 lg:items-center justify-between">
            {/* Search */}
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400 rounded-full"
              />
            </div>

            {/* Series Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <BookOpen className="w-4 h-4 text-slate-500" />
              <span className="text-sm text-slate-700 mr-2 font-medium">Series:</span>
              <button
                onClick={() => setSelectedSeries(null)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${!selectedSeries
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
              >
                All
              </button>
              {allSeries.map((series) => (
                <button
                  key={series}
                  onClick={() => setSelectedSeries(series === selectedSeries ? null : series)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${selectedSeries === series
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                >
                  {series}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap mt-4">
            <Tag className="w-4 h-4 text-slate-500" />
            <span className="text-sm text-slate-700 mr-2 font-medium">Tags:</span>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors border ${selectedTag === tag
                  ? 'bg-blue-100 text-blue-700 border-blue-200'
                  : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Writings Grid */}
      {/* Writings Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-16 text-slate-500">Loading Writings...</div>
          ) : filteredWritings.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg">
                No articles found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredWritings.map((writing) => (
                <Link
                  key={writing.id}
                  to={`/writings/${writing.slug}`}
                  className="group block bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-md hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-72 lg:w-80 flex-shrink-0">
                      <div className="aspect-[16/10] md:aspect-auto md:h-full overflow-hidden bg-slate-100 relative">
                        <img
                          src={writing.thumbnail}
                          alt={writing.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                    <div className="p-8 lg:p-10 flex flex-col justify-center w-full">
                      {writing.series && (
                        <Badge variant="void-purple" className="mb-3 w-fit border-none">
                          {writing.series}
                        </Badge>
                      )}
                      <h2 className="font-serif text-2xl lg:text-3xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                        {writing.title}
                      </h2>
                      <p className="text-slate-500 mb-6 line-clamp-2 leading-relaxed text-lg">
                        {writing.excerpt}
                      </p>
                      <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 font-medium">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {writing.readingTime} min read
                        </span>
                        <span>{formatDate(writing.publishedAt)}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-6">
                        {writing.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="ice-blue"
                            className="bg-opacity-50"
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
