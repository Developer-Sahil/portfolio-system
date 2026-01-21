import React, { useState, useEffect } from 'react';
import { MessageSquare, User } from 'lucide-react';
import Layout from '../components/layout/Layout';
// import { arenaThreads } from '../data/mock'; // Removed mock
import api from '../lib/api';

export default function ArenaPage() {
  const [arenaThreads, setArenaThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchThreads();
  }, []);

  async function fetchThreads() {
    try {
      const response = await api.get('/arena/');
      // Process responses if nested, but backend returns threads.
      // Assuming mock structure: thread has responses.
      // Backend model might need to include responses or we fetch separately.
      // For now, assuming standard response.
      setArenaThreads(response.data.map(t => ({ ...t, responses: t.responses || [] })));
    } catch (err) {
      console.error("Failed to fetch threads", err);
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) return <Layout><div className="p-20 text-center">Loading Arena...</div></Layout>;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 lg:py-20 border-b border-glass-border">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <p className="text-accent font-medium mb-4 tracking-wide uppercase text-sm animate-in fade-in slide-in-from-bottom-2">
            Public Discourse
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-medium tracking-tight text-foreground mb-6">
            Arena
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Opinions, hot takes, and thoughts that don't fit neatly into articles.
            A space for controlled public discourse on software engineering and
            the industry at large.
          </p>
        </div>
      </section>

      {/* Threads */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="space-y-8">
            {arenaThreads.map((thread) => (
              <article
                key={thread.id}
                className="bg-glass-bg border border-glass-border rounded-xl overflow-hidden backdrop-blur-md"
              >
                {/* Thread Header */}
                <div className="p-6 lg:p-8 border-b border-glass-border relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Sahil Sharma</p>
                      <p className="text-sm text-muted-foreground">{formatDate(thread.publishedAt)}</p>
                    </div>
                  </div>
                  <h2 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-4">
                    {thread.title}
                  </h2>
                  <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-lg">
                    {thread.content}
                  </div>
                </div>

                {/* Responses */}
                {thread.responses.length > 0 && (
                  <div className="bg-background/20 p-6 lg:p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <MessageSquare className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">
                        {thread.responses.length} Response{thread.responses.length > 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="space-y-4">
                      {thread.responses.map((response) => (
                        <div
                          key={response.id}
                          className="bg-glass-bg/50 rounded-lg p-4 border border-glass-border backdrop-blur-sm"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                              <User className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                Sahil Sharma
                                <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full border border-primary/20">
                                  Author
                                </span>
                              </p>
                              <p className="text-xs text-muted-foreground">{formatDate(response.createdAt)}</p>
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm leading-relaxed ml-10">
                            {response.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* No Responses */}
                {thread.responses.length === 0 && (
                  <div className="bg-background/20 p-6 text-center border-t border-glass-border">
                    <p className="text-sm text-muted-foreground italic">
                      No responses yet. Discourse is author-controlled.
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
