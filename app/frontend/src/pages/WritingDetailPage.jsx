import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import Layout from '../components/layout/Layout';
// import { writings } from '../data/mock'; // Removed mock
import api from '../lib/api';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function WritingDetailPage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [writing, setWriting] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWriting();
    }, [slug]);

    async function fetchWriting() {
        try {
            // writings.py has GET /{slug}
            const response = await api.get(`/writings/${slug}`);
            setWriting(response.data);
        } catch (err) {
            console.error("Failed to fetch writing", err);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <Layout><div className="p-20 text-center">Loading Article...</div></Layout>;

    if (!writing) {
        return (
            <Layout>
                <div className="max-w-4xl mx-auto px-6 lg:px-8 py-24 text-center">
                    <h1 className="font-serif text-3xl text-[#021024] mb-4">Article Not Found</h1>
                    <p className="text-[#5483B3] mb-8">The article you're looking for doesn't exist.</p>
                    <Button onClick={() => navigate('/writings')}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Writings
                    </Button>
                </div>
            </Layout>
        );
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <Layout>
            {/* Breadcrumb */}
            <div className="bg-glass-bg border-b border-glass-border backdrop-blur-md sticky top-16 z-30">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 py-4">
                    <Link
                        to="/writings"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-sm transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Writings
                    </Link>
                </div>
            </div>

            <article className="py-16">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-12">
                        {writing.series && (
                            <Badge className="mb-4 bg-primary text-primary-foreground border-none">
                                {writing.series}
                            </Badge>
                        )}
                        <h1 className="font-serif text-3xl lg:text-5xl font-semibold text-foreground mb-6 leading-tight">
                            {writing.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
                            <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {formatDate(writing.publishedAt)}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {writing.readingTime} min read
                            </span>
                            {writing.canonicalUrl && (
                                <a href={writing.canonicalUrl} target="_blank" rel="noopener noreferrer">
                                    <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors py-1 px-3 ml-2 border-primary/20 bg-primary/5 text-primary">
                                        Read on {new URL(writing.canonicalUrl).hostname} ↗
                                    </Badge>
                                </a>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {writing.tags.map((tag) => (
                                <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="bg-glass-bg border border-glass-border text-foreground hover:bg-glass-bg/80"
                                >
                                    <Tag className="w-3 h-3 mr-1" />
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="aspect-video w-full rounded-xl overflow-hidden bg-glass-bg mb-12 border border-glass-border relative">
                        <img
                            src={writing.thumbnail}
                            alt={writing.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-40 pointer-events-none" />
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none">
                        <p className="text-xl text-foreground leading-relaxed font-serif italic mb-8 border-l-4 border-primary pl-6">
                            {writing.excerpt}
                        </p>

                        <div className="text-muted-foreground leading-relaxed">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {writing.content || '*Content not available.*'}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </article>
        </Layout>
    );
}
