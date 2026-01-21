import React from 'react';
import { MessageSquare, User } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { arenaThreads } from '../data/mock';

export default function ArenaPage() {
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
            Public Discourse
          </p>
          <h1 className="font-serif text-display text-[#021024] mb-6">
            Arena
          </h1>
          <p className="text-body-large text-[#052659] max-w-2xl">
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
                className="bg-white rounded-xl border border-[#C1E8FF] overflow-hidden"
              >
                {/* Thread Header */}
                <div className="p-6 lg:p-8 border-b border-[#C1E8FF]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#021024] flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-[#021024]">Sahil Sharma</p>
                      <p className="text-sm text-[#5483B3]">{formatDate(thread.publishedAt)}</p>
                    </div>
                  </div>
                  <h2 className="font-serif text-xl lg:text-2xl font-semibold text-[#021024] mb-4">
                    {thread.title}
                  </h2>
                  <div className="text-[#052659] leading-relaxed whitespace-pre-line">
                    {thread.content}
                  </div>
                </div>

                {/* Responses */}
                {thread.responses.length > 0 && (
                  <div className="bg-[#FAFBFC] p-6 lg:p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <MessageSquare className="w-4 h-4 text-[#5483B3]" />
                      <span className="text-sm font-medium text-[#5483B3]">
                        {thread.responses.length} Response{thread.responses.length > 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="space-y-4">
                      {thread.responses.map((response) => (
                        <div
                          key={response.id}
                          className="bg-white rounded-lg p-4 border border-[#C1E8FF]"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-[#052659] flex items-center justify-center">
                              <User className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-[#021024]">
                                Sahil Sharma
                                <span className="ml-2 text-xs bg-[#C1E8FF] text-[#052659] px-2 py-0.5 rounded-full">
                                  Author
                                </span>
                              </p>
                              <p className="text-xs text-[#5483B3]">{formatDate(response.createdAt)}</p>
                            </div>
                          </div>
                          <p className="text-[#052659] text-sm leading-relaxed ml-10">
                            {response.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* No Responses */}
                {thread.responses.length === 0 && (
                  <div className="bg-[#FAFBFC] p-6 text-center">
                    <p className="text-sm text-[#5483B3]">
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
