import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../lib/api'; // Import API client
import {
  ArrowLeft,
  ExternalLink,
  Github,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Loader2,
} from 'lucide-react';
import Layout from '../components/layout/Layout';
// import { allProjects } from '../data/mock'; // Removed mock
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null); // State for project data
  const [loading, setLoading] = useState(true); // Loading state
  const [expandedSection, setExpandedSection] = useState(null);
  const [aiExplanation, setAiExplanation] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [selectedDepth, setSelectedDepth] = useState(null);

  useEffect(() => {
    fetchProject();
  }, [slug]);

  async function fetchProject() {
    try {
      // Use the new slug endpoint
      const response = await api.get(`/projects/slug/${slug}`);
      setProject(response.data);
    } catch (err) {
      console.error("Failed to fetch project", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-24 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#5483B3] mb-4" />
          <p className="text-[#5483B3]">Loading Project...</p>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-24 text-center">
          <h1 className="font-serif text-3xl text-foreground mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/projects')} variant="outline" className="border-glass-border hover:bg-glass-bg">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </div>
      </Layout>
    );
  }

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Mock AI explanation - will be replaced with real API call
  const getAiExplanation = async (depth) => {
    setAiLoading(true);
    setSelectedDepth(depth);

    // Simulating API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const explanations = {
      recruiter: `**${project.title}** is a ${project.oneLiner.toLowerCase()} This project demonstrates proficiency in ${project.techStack.slice(0, 3).join(', ')}. Key achievement: Built a production-ready system that solves real-world problems with clean architecture and scalable design patterns.`,
      engineer: `## Technical Overview\n\n${project.overview}\n\n### Architecture Highlights\n- **Tech Stack**: ${project.techStack.join(', ')}\n- **Key Patterns**: Microservices, Event-driven architecture\n- **Scalability**: Designed for horizontal scaling\n\n### Implementation Details\n${project.lld || 'Detailed implementation documentation available on request.'}`,
      architect: `## Deep Dive: ${project.title}\n\n### High-Level Design\n${project.hld || 'Architecture documentation available.'}\n\n### Low-Level Design\n${project.lld || 'Component details available.'}\n\n### Architecture Decisions\n${project.architectureDecisions || 'Decision records available.'}\n\n### Failure Points & Scaling Considerations\n${project.failurePoints || 'Failure analysis available.'}\n\n### Trade-offs Made\n- Chose ${project.techStack[0]} for its ecosystem and community support\n- Prioritized read performance over write performance\n- Implemented eventual consistency for better availability`,
    };

    setAiExplanation(explanations[depth]);
    setAiLoading(false);
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-glass-bg border-b border-glass-border backdrop-blur-md sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-4">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Project Image */}
            <div className="aspect-video rounded-xl overflow-hidden border border-glass-border bg-glass-bg relative group">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-40 pointer-events-none" />
            </div>

            {/* Project Info */}
            <div>
              {project.featured && (
                <Badge className="mb-4 bg-primary text-primary-foreground border-none">Featured Project</Badge>
              )}
              <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground mb-4 leading-tight">
                {project.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">{project.oneLiner}</p>

              {/* Tech Stack */}
              <div className="mb-8">
                <p className="text-sm font-medium text-accent uppercase tracking-wide mb-3">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="bg-glass-bg border border-glass-border text-foreground hover:bg-glass-bg/80"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-4">
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-glass-border bg-glass-bg text-foreground px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    View Source
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Explanation Section */}
      <section className="py-12 border-y border-glass-border bg-glass-bg/30 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-6 text-accent">
            <Sparkles className="w-5 h-5" />
            <h2 className="font-serif text-xl font-semibold text-foreground">
              AI-Powered Explanation
            </h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Get an AI-generated explanation tailored to your depth of interest.
          </p>

          {/* Depth Selection */}
          <div className="flex flex-wrap gap-3 mb-6">
            <Button
              variant={selectedDepth === 'recruiter' ? 'default' : 'outline'}
              onClick={() => getAiExplanation('recruiter')}
              disabled={aiLoading}
              className={selectedDepth === 'recruiter' ? 'bg-primary text-primary-foreground border-none' : 'border-glass-border text-muted-foreground hover:bg-glass-bg hover:text-foreground'}
            >
              Recruiter (30s)
            </Button>
            <Button
              variant={selectedDepth === 'engineer' ? 'default' : 'outline'}
              onClick={() => getAiExplanation('engineer')}
              disabled={aiLoading}
              className={selectedDepth === 'engineer' ? 'bg-primary text-primary-foreground border-none' : 'border-glass-border text-muted-foreground hover:bg-glass-bg hover:text-foreground'}
            >
              Engineer (5 min)
            </Button>
            <Button
              variant={selectedDepth === 'architect' ? 'default' : 'outline'}
              onClick={() => getAiExplanation('architect')}
              disabled={aiLoading}
              className={selectedDepth === 'architect' ? 'bg-primary text-primary-foreground border-none' : 'border-glass-border text-muted-foreground hover:bg-glass-bg hover:text-foreground'}
            >
              Architect (Deep Dive)
            </Button>
          </div>

          {/* AI Response */}
          {aiLoading && (
            <div className="flex items-center gap-3 p-6 bg-glass-bg rounded-xl border border-glass-border backdrop-blur-md">
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
              <span className="text-muted-foreground">Generating explanation...</span>
            </div>
          )}

          {aiExplanation && !aiLoading && (
            <div className="p-6 bg-glass-bg rounded-xl border border-glass-border backdrop-blur-md">
              <div className="prose prose-sm max-w-none prose-invert">
                {aiExplanation.split('\n').map((line, i) => {
                  if (line.startsWith('## ')) {
                    return (
                      <h2 key={i} className="font-serif text-xl font-semibold text-foreground mt-4 mb-2">
                        {line.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (line.startsWith('### ')) {
                    return (
                      <h3 key={i} className="font-serif text-lg font-semibold text-foreground mt-3 mb-2">
                        {line.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (line.startsWith('- ')) {
                    return (
                      <li key={i} className="text-muted-foreground ml-4">
                        {line.replace('- ', '')}
                      </li>
                    );
                  }
                  if (line.startsWith('**')) {
                    return (
                      <p key={i} className="text-foreground font-medium">
                        {line.replace(/\*\*/g, '')}
                      </p>
                    );
                  }
                  return line ? (
                    <p key={i} className="text-muted-foreground mb-2">
                      {line}
                    </p>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Detailed Tabs Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="bg-glass-bg border border-glass-border p-1 rounded-full mb-8">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-full px-6 transition-all"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="architecture"
                className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-full px-6 transition-all"
              >
                Architecture
              </TabsTrigger>
              <TabsTrigger
                value="decisions"
                className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-full px-6 transition-all"
              >
                Decisions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-0">
              <div className="bg-glass-bg rounded-xl p-8 border border-glass-border backdrop-blur-md">
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  Project Overview
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {project.overview}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="architecture" className="mt-0">
              <div className="space-y-6">
                {/* HLD */}
                <div className="bg-glass-bg rounded-xl border border-glass-border overflow-hidden backdrop-blur-md">
                  <button
                    onClick={() => toggleSection('hld')}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                  >
                    <h3 className="font-serif text-xl font-semibold text-foreground">
                      High-Level Design (HLD)
                    </h3>
                    {expandedSection === 'hld' ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                  {expandedSection === 'hld' && (
                    <div className="px-6 pb-6 border-t border-glass-border pt-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {project.hld || 'High-level design documentation coming soon.'}
                      </p>
                    </div>
                  )}
                </div>

                {/* LLD */}
                <div className="bg-glass-bg rounded-xl border border-glass-border overflow-hidden backdrop-blur-md">
                  <button
                    onClick={() => toggleSection('lld')}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                  >
                    <h3 className="font-serif text-xl font-semibold text-foreground">
                      Low-Level Design (LLD)
                    </h3>
                    {expandedSection === 'lld' ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                  {expandedSection === 'lld' && (
                    <div className="px-6 pb-6 border-t border-glass-border pt-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {project.lld || 'Low-level design documentation coming soon.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="decisions" className="mt-0">
              <div className="space-y-6">
                {/* Architecture Decisions */}
                <div className="bg-glass-bg rounded-xl p-8 border border-glass-border backdrop-blur-md">
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                    Architecture Decisions
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.architectureDecisions || 'Architecture decision records coming soon.'}
                  </p>
                </div>

                {/* Failure Points */}
                <div className="bg-glass-bg rounded-xl p-8 border border-glass-border backdrop-blur-md">
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                    Failure Points & Scaling Notes
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.failurePoints || 'Failure analysis and scaling notes coming soon.'}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
}
