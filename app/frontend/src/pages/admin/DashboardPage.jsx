import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '@/components/ui/button';
import {
    LayoutDashboard,
    FileText,
    FolderGit2,
    Cpu,
    Database,
    MonitorPlay,
    LogOut
} from 'lucide-react';

const DashboardCard = ({ title, icon: Icon, link, description }) => (
    <Link to={link}>
        <div className="p-6 border border-border rounded-lg bg-card hover:bg-accent/50 transition-colors cursor-pointer group h-full">
            <div className="flex items-center space-x-4 mb-4">
                <div className="p-2 bg-primary/10 rounded-md group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <p className="text-muted-foreground text-sm">
                {description}
            </p>
        </div>
    </Link>
);

const DashboardPage = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await logout();
            navigate('/admin/login');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    }

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <header className="flex justify-between items-center pb-8 border-b border-border">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                        <p className="text-muted-foreground mt-2">
                            Welcome back, {currentUser?.email}
                        </p>
                    </div>
                    <Button variant="outline" onClick={handleLogout}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                    </Button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <DashboardCard
                        title="Projects"
                        icon={FolderGit2}
                        link="/admin/projects"
                        description="Manage your portfolio projects and detailed case studies."
                    />
                    <DashboardCard
                        title="Writings"
                        icon={FileText}
                        link="/admin/writings"
                        description="Create and edit technical articles and blog posts."
                    />
                    <DashboardCard
                        title="Systems"
                        icon={Cpu}
                        link="/admin/systems"
                        description="Document tools, configurations, and engineering philosophy."
                    />
                    <DashboardCard
                        title="Vault"
                        icon={Database}
                        link="/admin/vault"
                        description="Manage atomic knowledge entries and mental models."
                    />
                    <DashboardCard
                        title="Arena"
                        icon={MonitorPlay}
                        link="/admin/arena"
                        description="Oversee public threads and discourse."
                    />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
