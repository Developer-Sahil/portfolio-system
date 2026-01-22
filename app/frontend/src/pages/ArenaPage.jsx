import React, { useState, useEffect } from 'react';
import { MessageSquare, User, ThumbsUp, ThumbsDown, Send } from 'lucide-react';
import Layout from '../components/layout/Layout';
import api from '../lib/api';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function ArenaPage() {
  const [arenaThreads, setArenaThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState({}); // Map of threadId -> text
  const [submittingComment, setSubmittingComment] = useState({}); // Map of threadId -> boolean

  useEffect(() => {
    fetchThreads();
  }, []);

  async function fetchThreads() {
    try {
      const response = await api.get('/arena/');
      // Sort by publishedAt desc
      const sorted = response.data.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
      setArenaThreads(sorted.map(t => ({
        ...t,
        responses: t.responses || [],
        likes: t.likes || 0,
        dislikes: t.dislikes || 0
      })));
    } catch (err) {
      console.error("Failed to fetch threads", err);
    } finally {
      setLoading(false);
    }
  }

  const handleLike = async (threadId) => {
    try {
      await api.post(`/arena/${threadId}/like`);
      setArenaThreads(prev => prev.map(t =>
        t.id === threadId ? { ...t, likes: (t.likes || 0) + 1 } : t
      ));
    } catch (err) {
      console.error("Failed to like", err);
    }
  };

  const handleDislike = async (threadId) => {
    try {
      await api.post(`/arena/${threadId}/dislike`);
      setArenaThreads(prev => prev.map(t =>
        t.id === threadId ? { ...t, dislikes: (t.dislikes || 0) + 1 } : t
      ));
    } catch (err) {
      console.error("Failed to dislike", err);
    }
  };

  const handleCommentSubmit = async (threadId) => {
    const text = commentText[threadId];
    if (!text || !text.trim()) return;

    setSubmittingComment(prev => ({ ...prev, [threadId]: true }));
    try {
      const response = await api.post(`/arena/${threadId}/comment`, {
        content: text,
        author: "Viewer" // Or "Anonymous" or prompt for name
      });

      const newComment = response.data;

      setArenaThreads(prev => prev.map(t => {
        if (t.id === threadId) {
          return { ...t, responses: [...(t.responses || []), newComment] };
        }
        return t;
      }));

      setCommentText(prev => ({ ...prev, [threadId]: '' }));
    } catch (err) {
      console.error("Failed to comment", err);
    } finally {
      setSubmittingComment(prev => ({ ...prev, [threadId]: false }));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
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
                  <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-lg mb-6">
                    {thread.content}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-green-500 hover:bg-green-500/10" onClick={() => handleLike(thread.id)}>
                      <ThumbsUp className="w-4 h-4" />
                      <span>{thread.likes || 0}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10" onClick={() => handleDislike(thread.id)}>
                      <ThumbsDown className="w-4 h-4" />
                      <span>{thread.dislikes || 0}</span>
                    </Button>
                    <div className="flex items-center gap-2 text-muted-foreground ml-auto">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm">{thread.responses?.length || 0} Comments</span>
                    </div>
                  </div>
                </div>

                {/* Responses */}
                <div className="bg-background/20 p-6 lg:p-8">
                  {/* Comment Form */}
                  <div className="mb-8 flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center">
                      <User className="w-4 h-4 text-slate-500" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <Textarea
                        placeholder="Add to the discussion..."
                        className="min-h-[80px] bg-glass-bg border-glass-border"
                        value={commentText[thread.id] || ''}
                        onChange={(e) => setCommentText(prev => ({ ...prev, [thread.id]: e.target.value }))}
                      />
                      <div className="flex justify-end">
                        <Button
                          size="sm"
                          onClick={() => handleCommentSubmit(thread.id)}
                          disabled={submittingComment[thread.id] || !commentText[thread.id]?.trim()}
                        >
                          {submittingComment[thread.id] ? 'Posting...' : 'Post Comment'}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Comment List */}
                  <div className="space-y-4">
                    {thread.responses && thread.responses.map((response) => (
                      <div
                        key={response.id}
                        className="bg-glass-bg/50 rounded-lg p-4 border border-glass-border backdrop-blur-sm"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                            <User className="w-4 h-4 text-slate-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {response.author || "Viewer"}
                              {response.author === "Sahil Sharma" && (
                                <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full border border-primary/20">
                                  Author
                                </span>
                              )}
                            </p>
                            <p className="text-xs text-muted-foreground">{formatDate(response.createdAt)}</p>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed ml-10">
                          {response.content}
                        </p>
                      </div>
                    ))}
                    {(!thread.responses || thread.responses.length === 0) && (
                      <p className="text-sm text-center text-muted-foreground italic">No comments yet. Be the first to share your thoughts.</p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
