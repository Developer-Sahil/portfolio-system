import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

const VaultEditorPage = () => {
    const { id } = useParams();
    const isEditing = !!id && id !== 'new';
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        tags: '',
        content: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditing) {
            fetchEntry();
        }
    }, [id]);

    async function fetchEntry() {
        try {
            setLoading(true);
            const response = await api.get(`/vault/${id}`);
            const data = response.data;
            setFormData({
                ...data,
                tags: data.tags ? data.tags.join(', ') : ''
            });
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch entry", err);
            setError("Failed to load entry data");
            setLoading(false);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError('');

        const payload = {
            ...formData,
            tags: formData.tags.split(',').map(s => s.trim()).filter(s => s)
        };

        try {
            if (isEditing) {
                await api.put(`/vault/${id}`, payload);
            } else {
                await api.post('/vault/', payload);
            }
            navigate('/admin/vault');
        } catch (err) {
            console.error("Save failed", err);
            setError("Failed to save entry. " + (err.response?.data?.detail || err.message));
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
                    <Link to="/admin/vault">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">
                        {isEditing ? 'Edit Vault Entry' : 'New Vault Entry'}
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
                            <Label htmlFor="category">Category</Label>
                            <Input id="category" name="category" value={formData.category} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tags">Tags (comma separated)</Label>
                        <Input id="tags" name="tags" value={formData.tags} onChange={handleChange} placeholder="Mental Model, Philosophy" required />
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
                            {loading ? 'Saving...' : 'Save Entry'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VaultEditorPage;
