import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

const ArenaThreadEditorPage = () => {
    const { id } = useParams();
    const isEditing = !!id && id !== 'new';
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        publishedAt: new Date().toISOString().slice(0, 16)
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditing) {
            fetchThread();
        }
    }, [id]);

    async function fetchThread() {
        try {
            setLoading(true);
            const response = await api.get(`/arena/${id}`);
            const data = response.data;

            let formattedDate = '';
            if (data.publishedAt) {
                formattedDate = new Date(data.publishedAt).toISOString().slice(0, 16);
            }

            setFormData({
                ...data,
                publishedAt: formattedDate
            });
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch thread", err);
            setError("Failed to load thread data");
            setLoading(false);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError('');

        const payload = {
            ...formData
        };

        if (payload.publishedAt) {
            payload.publishedAt = new Date(payload.publishedAt).toISOString();
        }

        try {
            if (isEditing) {
                await api.put(`/arena/${id}`, payload);
            } else {
                await api.post('/arena/', payload);
            }
            navigate('/admin/arena');
        } catch (err) {
            console.error("Save failed", err);
            setError("Failed to save thread. " + (err.response?.data?.detail || err.message));
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
                    <Link to="/admin/arena">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">
                        {isEditing ? 'Edit Thread' : 'New Thread'}
                    </h1>
                </header>

                {error && <div className="bg-destructive/15 text-destructive p-4 rounded-md">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6 border border-border bg-card p-6 rounded-lg">

                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
                    </div>

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
                            {loading ? 'Saving...' : 'Save Thread'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ArenaThreadEditorPage;
