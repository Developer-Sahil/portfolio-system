import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea'; // Assuming you have this or use generic textarea

const ProjectEditorPage = () => {
    const { id } = useParams();
    const isEditing = !!id && id !== 'new';
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        thumbnail: '',
        oneLiner: '',
        techStack: '', // Comma separated for input
        status: 'published',
        overview: '',

        motivation: '',
        hld: '',
        lld: '',
        architectureDecisions: '',
        failurePoints: '',
        liveDemo: '',
        github: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditing) {
            fetchProject();
        }
    }, [id]);

    async function fetchProject() {
        try {
            setLoading(true);
            const response = await api.get(`/projects/${id}`);
            const data = response.data;
            setFormData({
                ...data,
                techStack: data.techStack ? data.techStack.join(', ') : ''
            });
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch project", err);
            setError("Failed to load project data");
            setLoading(false);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError('');

        const payload = {
            ...formData,
            techStack: formData.techStack.split(',').map(s => s.trim()).filter(s => s)
        };

        try {
            if (isEditing) {
                await api.put(`/projects/${id}`, payload);
            } else {
                await api.post('/projects/', payload);
            }
            navigate('/admin/projects');
        } catch (err) {
            console.error("Save failed", err);
            setError("Failed to save project. " + (err.response?.data?.detail || err.message));
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
                    <Link to="/admin/projects">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">
                        {isEditing ? 'Edit Project' : 'New Project'}
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
                        <Label htmlFor="oneLiner">One Liner</Label>
                        <Input id="oneLiner" name="oneLiner" value={formData.oneLiner} onChange={handleChange} required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="thumbnail">Thumbnail URL</Label>
                        <Input id="thumbnail" name="thumbnail" value={formData.thumbnail} onChange={handleChange} required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <select
                                id="status"
                                name="status"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="techStack">Tech Stack (comma separated)</Label>
                            <Input id="techStack" name="techStack" value={formData.techStack} onChange={handleChange} placeholder="React, Python, Firebase" required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="overview">Overview (Markdown)</Label>
                        <textarea
                            id="overview"
                            name="overview"
                            className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={formData.overview}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="motivation">Motivation (Markdown)</Label>
                        <textarea
                            id="motivation"
                            name="motivation"
                            className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={formData.motivation}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-6 pt-4 border-t border-border">
                        <h3 className="text-lg font-medium">Architecture Details (Markdown)</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="hld">High-Level Design (HLD)</Label>
                                <textarea
                                    id="hld"
                                    name="hld"
                                    className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={formData.hld || ''}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="lld">Low-Level Design (LLD)</Label>
                                <textarea
                                    id="lld"
                                    name="lld"
                                    className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={formData.lld || ''}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="architectureDecisions">Architecture Decisions</Label>
                                <textarea
                                    id="architectureDecisions"
                                    name="architectureDecisions"
                                    className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={formData.architectureDecisions || ''}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="failurePoints">Failure Points</Label>
                                <textarea
                                    id="failurePoints"
                                    name="failurePoints"
                                    className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={formData.failurePoints || ''}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="liveDemo">Live Demo URL</Label>
                            <Input id="liveDemo" name="liveDemo" value={formData.liveDemo} onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="github">GitHub URL</Label>
                            <Input id="github" name="github" value={formData.github} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Project'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectEditorPage;
