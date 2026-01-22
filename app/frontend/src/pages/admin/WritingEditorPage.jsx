import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
// import { Textarea } from '@/components/ui/textarea'; 

const WritingEditorPage = () => {
    const { id } = useParams();
    const isEditing = !!id && id !== 'new';
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        thumbnail: '',
        excerpt: '',
        content: '',
        readingTime: 5,
        tags: '',
        series: '',
        publishedAt: new Date().toISOString().slice(0, 16) // Default to now
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditing) {
            fetchWriting();
        }
    }, [id]);

    async function fetchWriting() {
        try {
            setLoading(true);
            // We need to fetch by ID specifically. 
            // The public API has /writings/id/:id
            const response = await api.get(`/writings/id/${id}`);
            const data = response.data;

            let formattedDate = '';
            if (data.publishedAt) {
                formattedDate = new Date(data.publishedAt).toISOString().slice(0, 16);
            }

            setFormData({
                ...data,
                tags: data.tags ? data.tags.join(', ') : '',
                publishedAt: formattedDate
            });
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch writing", err);
            setError("Failed to load writing data");
            setLoading(false);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError('');

        const payload = {
            ...formData,
            tags: formData.tags.split(',').map(s => s.trim()).filter(s => s),
            readingTime: parseInt(formData.readingTime)
        };

        // Ensure publishedAt is ISO string with timezone or just UTC
        if (payload.publishedAt) {
            payload.publishedAt = new Date(payload.publishedAt).toISOString();
        }

        try {
            if (isEditing) {
                await api.put(`/writings/${id}`, payload);
            } else {
                await api.post('/writings/', payload);
            }
            navigate('/admin/writings');
        } catch (err) {
            console.error("Save failed", err);
            setError("Failed to save writing. " + (err.response?.data?.detail || err.message));
        } finally {
            setLoading(false);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-3xl mx-auto space-y-8">
                <header className="flex items-center space-x-4 pb-6 border-b border-border">
                    <Link to="/admin/writings">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">
                        {isEditing ? 'Edit Writing' : 'New Writing'}
                    </h1>
                </header>

                {error && <div className="bg-destructive/15 text-destructive p-4 rounded-md">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6 border border-border bg-card p-6 rounded-lg">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug</Label>
                            <Input id="slug" name="slug" value={formData.slug} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="excerpt">Excerpt</Label>
                        <textarea
                            id="excerpt"
                            name="excerpt"
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={formData.excerpt}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="thumbnail">Thumbnail URL</Label>
                            <Input id="thumbnail" name="thumbnail" value={formData.thumbnail} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="canonicalUrl">Canonical URL (External Link)</Label>
                            <Input id="canonicalUrl" name="canonicalUrl" value={formData.canonicalUrl || ''} onChange={handleChange} placeholder="https://medium.com/..." />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="readingTime">Reading Time (mins)</Label>
                            <Input id="readingTime" type="number" name="readingTime" value={formData.readingTime} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tags">Tags (comma separated)</Label>
                            <Input id="tags" name="tags" value={formData.tags} onChange={handleChange} placeholder="React, Tutorial" required />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="publishedAt">Published At</Label>
                            <Input
                                id="publishedAt"
                                type="datetime-local"
                                name="publishedAt"
                                value={formData.publishedAt}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="series">Series (Optional)</Label>
                            <Input id="series" name="series" value={formData.series} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content">Content (Markdown)</Label>
                        <textarea
                            id="content"
                            name="content"
                            className="flex min-h-[300px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
                            value={formData.content}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Writing'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WritingEditorPage;
