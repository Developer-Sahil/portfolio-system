import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

const SystemEditorPage = () => {
    const { id } = useParams();
    const isEditing = !!id && id !== 'new';
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        logo: '',
        usage: '',
        whyChosen: '',
        whereItBreaks: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditing) {
            fetchSystem();
        }
    }, [id]);

    async function fetchSystem() {
        try {
            setLoading(true);
            const response = await api.get(`/systems/${id}`);
            setFormData(response.data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch system", err);
            setError("Failed to load system data");
            setLoading(false);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isEditing) {
                await api.put(`/systems/${id}`, formData);
            } else {
                await api.post('/systems/', formData);
            }
            navigate('/admin/systems');
        } catch (err) {
            console.error("Save failed", err);
            setError("Failed to save system. " + (err.response?.data?.detail || err.message));
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
                    <Link to="/admin/systems">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">
                        {isEditing ? 'Edit System' : 'New System'}
                    </h1>
                </header>

                {error && <div className="bg-destructive/15 text-destructive p-4 rounded-md">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6 border border-border bg-card p-6 rounded-lg">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Input id="category" name="category" value={formData.category} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="logo">Logo URL or Icon Name</Label>
                        <Input id="logo" name="logo" value={formData.logo} onChange={handleChange} required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="usage">Usage</Label>
                        <textarea
                            id="usage"
                            name="usage"
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={formData.usage}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="whyChosen">Why Chosen</Label>
                        <textarea
                            id="whyChosen"
                            name="whyChosen"
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={formData.whyChosen}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="whereItBreaks">Where It Breaks</Label>
                        <textarea
                            id="whereItBreaks"
                            name="whereItBreaks"
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={formData.whereItBreaks}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Saving...' : 'Save System'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SystemEditorPage;
