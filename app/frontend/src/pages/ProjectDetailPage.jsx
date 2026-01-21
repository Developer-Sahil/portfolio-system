import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
import { allProjects } from '../data/mock';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState(null);
  const [aiExplanation, setAiExplanation] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [selectedDepth, setSelectedDepth] = useState(null);

  const project = allProjects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-24 text-center">
          <h1 className="font-serif text-3xl text-[#021024] mb-4">Project Not Found</h1>
          <p className="text-[#5483B3] mb-8">The project you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/projects')}>
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
      <div className="bg-white border-b border-[#C1E8FF]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-4">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-[#5483B3] hover:text-[#052659] text-sm"
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
            <div className="aspect-video rounded-xl overflow-hidden border border-[#C1E8FF] bg-[#C1E8FF]">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Project Info */}
            <div>
              {project.featured && (
                <Badge className="mb-4 bg-[#052659] text-white">Featured Project</Badge>
              )}
              <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-[#021024] mb-4">
                {project.title}
              </h1>
              <p className="text-lg text-[#052659] mb-6">{project.oneLiner}</p>

              {/* Tech Stack */}
              <div className="mb-6">
                <p className="text-sm font-medium text-[#5483B3] uppercase tracking-wide mb-3">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="bg-[#C1E8FF] text-[#052659]"
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
                    className="inline-flex items-center gap-2 bg-[#021024] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#052659] transition-colors"
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
                    className="inline-flex items-center gap-2 border-2 border-[#052659] text-[#052659] px-5 py-2.5 rounded-lg font-medium hover:bg-[#052659] hover:text-white transition-colors"
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
      <section className="py-12 bg-white border-y border-[#C1E8FF]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-5 h-5 text-[#052659]" />
            <h2 className="font-serif text-xl font-semibold text-[#021024]">
              AI-Powered Explanation
            </h2>
          </div>
          <p className="text-[#5483B3] mb-6">
            Get an AI-generated explanation tailored to your depth of interest.
          </p>

          {/* Depth Selection */}
          <div className="flex flex-wrap gap-3 mb-6">
            <Button
              variant={selectedDepth === 'recruiter' ? 'default' : 'outline'}
              onClick={() => getAiExplanation('recruiter')}
              disabled={aiLoading}
              className={selectedDepth === 'recruiter' ? 'bg-[#021024]' : 'border-[#5483B3] text-[#052659]'}
            >
              Recruiter (30s)
            </Button>
            <Button
              variant={selectedDepth === 'engineer' ? 'default' : 'outline'}
              onClick={() => getAiExplanation('engineer')}
              disabled={aiLoading}
              className={selectedDepth === 'engineer' ? 'bg-[#021024]' : 'border-[#5483B3] text-[#052659]'}
            >
              Engineer (5 min)
            </Button>
            <Button
              variant={selectedDepth === 'architect' ? 'default' : 'outline'}
              onClick={() => getAiExplanation('architect')}
              disabled={aiLoading}
              className={selectedDepth === 'architect' ? 'bg-[#021024]' : 'border-[#5483B3] text-[#052659]'}
            >
              Architect (Deep Dive)
            </Button>
          </div>

          {/* AI Response */}
          {aiLoading && (
            <div className="flex items-center gap-3 p-6 bg-[#FAFBFC] rounded-lg border border-[#C1E8FF]">
              <Loader2 className="w-5 h-5 text-[#5483B3] animate-spin" />
              <span className="text-[#5483B3]">Generating explanation...</span>
            </div>
          )}

          {aiExplanation && !aiLoading && (
            <div className="p-6 bg-[#FAFBFC] rounded-lg border border-[#C1E8FF]">
              <div className="prose prose-sm max-w-none text-[#021024]">
                {aiExplanation.split('\n').map((line, i) => {
                  if (line.startsWith('## ')) {
                    return (
                      <h2 key={i} className="font-serif text-xl font-semibold text-[#021024] mt-4 mb-2">
                        {line.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (line.startsWith('### ')) {
                    return (
                      <h3 key={i} className="font-serif text-lg font-semibold text-[#021024] mt-3 mb-2">
                        {line.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (line.startsWith('- ')) {
                    return (
                      <li key={i} className="text-[#052659] ml-4">
                        {line.replace('- ', '')}
                      </li>
                    );
                  }
                  if (line.startsWith('**')) {
                    return (
                      <p key={i} className="text-[#021024] font-medium">
                        {line.replace(/\*\*/g, '')}
                      </p>
                    );
                  }
                  return line ? (
                    <p key={i} className="text-[#052659] mb-2">
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
            <TabsList className="bg-[#C1E8FF] mb-8">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white">
                Overview
              </TabsTrigger>
              <TabsTrigger value="architecture" className="data-[state=active]:bg-white">
                Architecture
              </TabsTrigger>
              <TabsTrigger value="decisions" className="data-[state=active]:bg-white">
                Decisions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-0">
              <div className="bg-white rounded-xl p-8 border border-[#C1E8FF]">
                <h3 className="font-serif text-2xl font-semibold text-[#021024] mb-4">
                  Project Overview
                </h3>
                <p className="text-[#052659] text-lg leading-relaxed">
                  {project.overview}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="architecture" className="mt-0">
              <div className="space-y-6">
                {/* HLD */}
                <div className="bg-white rounded-xl border border-[#C1E8FF] overflow-hidden">
                  <button
                    onClick={() => toggleSection('hld')}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-[#FAFBFC]"
                  >
                    <h3 className="font-serif text-xl font-semibold text-[#021024]">
                      High-Level Design (HLD)
                    </h3>
                    {expandedSection === 'hld' ? (
                      <ChevronUp className="w-5 h-5 text-[#5483B3]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#5483B3]" />
                    )}
                  </button>
                  {expandedSection === 'hld' && (
                    <div className="px-6 pb-6">
                      <p className="text-[#052659] leading-relaxed">
                        {project.hld || 'High-level design documentation coming soon.'}
                      </p>
                    </div>
                  )}
                </div>

                {/* LLD */}
                <div className="bg-white rounded-xl border border-[#C1E8FF] overflow-hidden">
                  <button
                    onClick={() => toggleSection('lld')}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-[#FAFBFC]"
                  >
                    <h3 className="font-serif text-xl font-semibold text-[#021024]">
                      Low-Level Design (LLD)
                    </h3>
                    {expandedSection === 'lld' ? (
                      <ChevronUp className="w-5 h-5 text-[#5483B3]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#5483B3]" />
                    )}
                  </button>
                  {expandedSection === 'lld' && (
                    <div className="px-6 pb-6">
                      <p className="text-[#052659] leading-relaxed">
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
                <div className="bg-white rounded-xl p-8 border border-[#C1E8FF]">
                  <h3 className="font-serif text-xl font-semibold text-[#021024] mb-4">
                    Architecture Decisions
                  </h3>
                  <p className="text-[#052659] leading-relaxed">
                    {project.architectureDecisions || 'Architecture decision records coming soon.'}
                  </p>
                </div>

                {/* Failure Points */}
                <div className="bg-white rounded-xl p-8 border border-[#C1E8FF]">
                  <h3 className="font-serif text-xl font-semibold text-[#021024] mb-4">
                    Failure Points & Scaling Notes
                  </h3>
                  <p className="text-[#052659] leading-relaxed">
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
