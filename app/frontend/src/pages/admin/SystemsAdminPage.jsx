import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../lib/api';
import { Button } from '@/components/ui/button';
import {
    Plus,
    Pencil,
    Trash2,
    ArrowLeft
} from 'lucide-react';

const SystemsAdminPage = () => {
    const [systems, setSystems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchSystems();
    }, []);

    async function fetchSystems() {
        try {
            const response = await api.get('/systems/');
            setSystems(response.data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch systems", err);
            setError('Failed to load systems.');
            setLoading(false);
        }
    }

    async function handleDelete(id) {
        if (window.confirm("Are you sure you want to delete this system?")) {
            try {
                await api.delete(`/systems/${id}`);
                setSystems(systems.filter(s => s.id !== id));
            } catch (err) {
                console.error("Failed to delete system", err);
                alert("Failed to delete system");
            }
        }
    }

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <header className="flex justify-between items-center pb-6 border-b border-border">
                    <div className="flex items-center space-x-4">
                        <Link to="/admin">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                        </Link>
                        <h1 className="text-3xl font-bold tracking-tight">Manage Systems</h1>
                    </div>
                    <Link to="/admin/systems/new">
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            New System
                        </Button>
                    </Link>
                </header>

                {error && <div className="text-destructive">{error}</div>}

                <div className="rounded-md border border-border bg-card">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Category</th>
                                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {systems.map((system) => (
                                    <tr key={system.id} className="border-b transition-colors hover:bg-muted/50">
                                        <td className="p-4 align-middle font-medium">{system.name}</td>
                                        <td className="p-4 align-middle text-muted-foreground">{system.category}</td>
                                        <td className="p-4 align-middle text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link to={`/admin/systems/${system.id}`}>
                                                    <Button variant="outline" size="sm">
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(system.id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {systems.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="p-4 text-center text-muted-foreground">
                                            No systems found. Create one!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemsAdminPage;
