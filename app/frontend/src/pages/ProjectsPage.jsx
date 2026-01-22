import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import Layout from '../components/layout/Layout';
// import { allProjects } from '../data/mock'; // Removed mock
import api from '../lib/api';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import LoadingState from '../components/ui/LoadingState';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const response = await api.get('/projects/');
      // Filter only published projects for public view
      const published = response.data.filter(p => p.status === 'published');
      setProjects(published);
    } catch (err) {
      console.error("Failed to fetch projects", err);
    } finally {
      setLoading(false);
    }
  }

  // Get all unique tech stack items
  const allTechStack = [...new Set(projects.flatMap((p) => p.techStack || []))];

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.oneLiner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTech = !selectedTech || (project.techStack && project.techStack.includes(selectedTech));
    return matchesSearch && matchesTech;
  });

  return (
    <Layout>
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <p className="text-accent font-medium mb-4 tracking-wide uppercase text-sm animate-in fade-in slide-in-from-bottom-2">
            Portfolio
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-medium tracking-tight text-foreground mb-6">
            Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            A collection of systems I've designed and built—each one a lesson in
            engineering trade-offs, scalability, and deliberate decision-making.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-glass-bg backdrop-blur-md sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            {/* Search */}
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 border-glass-border focus:border-primary focus:ring-primary text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Tech Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <button
                onClick={() => setSelectedTech(null)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${!selectedTech
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-glass-bg border-glass-border text-muted-foreground hover:bg-white/10 hover:text-foreground'
                  }`}
              >
                All
              </button>
              {allTechStack.slice(0, 6).map((tech) => (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(tech === selectedTech ? null : tech)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${selectedTech === tech
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-glass-bg border-glass-border text-muted-foreground hover:bg-white/10 hover:text-foreground'
                    }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {loading ? (
            <div className="min-h-[40vh] flex items-center justify-center">
              <LoadingState message="Accessing Project Archives..." />
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No projects found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.slug}`}
                  className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-md hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    {project.featured && (
                      <Badge variant="star-gold" className="mb-3 border-none">
                        Featured
                      </Badge>
                    )}
                    <h3 className="font-serif text-xl font-bold text-slate-800 mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {project.oneLiner}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack && project.techStack.slice(0, 4).map((tech, index) => {
                        const variants = ["ice-blue", "void-purple", "dendro-green"];
                        const variant = variants[index % variants.length];
                        return (
                          <Badge
                            key={tech}
                            variant={variant}
                            className="bg-opacity-50"
                          >
                            {tech}
                          </Badge>
                        )
                      })}
                      {project.techStack && project.techStack.length > 4 && (
                        <Badge
                          variant="secondary"
                          className="bg-slate-100 text-slate-500 hover:bg-slate-200 border-none text-xs"
                        >
                          +{project.techStack.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
