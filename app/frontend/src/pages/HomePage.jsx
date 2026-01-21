import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Brain, Database, Cloud, Trophy, Award, Star, Zap, Terminal } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { personalInfo, expertiseDomains, testimonials } from '../data/mock';
import api from '../lib/api';
import { Badge } from '../components/ui/badge';

const domainIcons = {
  'Backend Engineering': Code2,
  'Machine Learning': Brain,
  'Data Engineering': Database,
  'Cloud & DevOps': Cloud,
};

export default function HomePage() {
  const [projects, setProjects] = useState([]);
  const [writings, setWritings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [projectsRes, writingsRes] = await Promise.all([
          api.get('/projects/'),
          api.get('/writings/')
        ]);

        // Filter featured projects or take first 3 if none featured
        const allProjects = projectsRes.data || [];
        const featured = allProjects.filter(p => p.featured && p.status === 'published');
        setProjects(featured.length > 0 ? featured.slice(0, 3) : allProjects.slice(0, 3));

        // Sort writings by date desc and take top 2
        const allWritings = writingsRes.data || [];
        const sortedWritings = allWritings.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        setWritings(sortedWritings.slice(0, 2));

      } catch (error) {
        console.error("Failed to fetch homepage data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 lg:py-32 relative">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-accent font-medium mb-6 tracking-wide uppercase text-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
              {personalInfo.title}
            </p>
            <h1 className="font-serif text-5xl md:text-7xl font-semibold mb-8 tracking-tight leading-[1.1]">
              <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                {personalInfo.tagline}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-2xl">
              {personalInfo.doctrine}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25"
              >
                View Projects
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/work"
                className="inline-flex items-center gap-2 bg-glass-bg border border-glass-border text-foreground px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                Work With Me
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-glass-border bg-glass-bg/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="font-serif text-4xl lg:text-5xl font-semibold bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
                {projects.length}+
              </p>
              <p className="text-muted-foreground mt-2 text-sm font-medium uppercase tracking-wide">
                Projects Built
              </p>
            </div>
            <div className="text-center">
              <p className="font-serif text-4xl lg:text-5xl font-semibold bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
                {personalInfo.stats.systemsDesigned}
              </p>
              <p className="text-muted-foreground mt-2 text-sm font-medium uppercase tracking-wide">
                Systems Designed
              </p>
            </div>
            <div className="text-center">
              <p className="font-serif text-4xl lg:text-5xl font-semibold bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
                {personalInfo.stats.yearsExperience}+
              </p>
              <p className="text-muted-foreground mt-2 text-sm font-medium uppercase tracking-wide">
                Years Experience
              </p>
            </div>
            <div className="text-center">
              <p className="font-serif text-4xl lg:text-5xl font-semibold bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
                {writings.length}+
              </p>
              <p className="text-muted-foreground mt-2 text-sm font-medium uppercase tracking-wide">
                Articles Written
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-accent font-medium mb-2 tracking-wide uppercase text-sm">
                Selected Work
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-foreground">
                Featured Projects
              </h2>
            </div>
            <Link
              to="/projects"
              className="hidden md:flex items-center gap-2 text-muted-foreground font-medium hover:text-primary transition-colors"
            >
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading Projects...</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.slug}`}
                  className="group bg-glass-bg border border-glass-border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-secondary/50 relative">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {project.oneLiner}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="bg-secondary/50 text-secondary-foreground hover:bg-secondary border-none"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-8 md:hidden">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-muted-foreground font-medium hover:text-primary"
            >
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Writings Section (New) */}
      <section className="py-24 border-y border-glass-border bg-glass-bg/30 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-accent font-medium mb-2 tracking-wide uppercase text-sm">
                Thought Leadership
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-foreground">
                Latest Insights
              </h2>
            </div>
            <Link
              to="/writings"
              className="hidden md:flex items-center gap-2 text-muted-foreground font-medium hover:text-primary transition-colors"
            >
              Read All Articles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading Writings...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {writings.map((writing) => (
                <Link
                  key={writing.id}
                  to={`/writings/${writing.slug}`}
                  className="group bg-glass-bg rounded-xl p-8 border border-glass-border hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
                >
                  {writing.series && (
                    <p className="text-xs font-bold text-accent uppercase tracking-wider mb-3">
                      {writing.series}
                    </p>
                  )}
                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {writing.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                    {writing.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm text-muted-foreground font-medium">
                      {new Date(writing.publishedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                    <span className="inline-flex items-center text-foreground font-medium text-sm group-hover:text-primary transition-colors">
                      Read Article <ArrowRight className="w-4 h-4 ml-2" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-8 md:hidden">
            <Link
              to="/writings"
              className="inline-flex items-center gap-2 text-muted-foreground font-medium hover:text-primary"
            >
              Read All Articles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-24 bg-transparent">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent font-medium mb-2 tracking-wide uppercase text-sm">
              What I Do
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-foreground">
              Expertise Domains
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {expertiseDomains.map((domain) => {
              const IconComponent = domainIcons[domain.domain] || Code2;
              return (
                <div
                  key={domain.domain}
                  className="p-8 rounded-xl border border-glass-border bg-glass-bg hover:bg-glass-bg/80 hover:border-primary/50 transition-all duration-300 backdrop-blur-md"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                    {domain.domain}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {domain.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {domain.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-medium text-primary-foreground bg-primary/20 bg-opacity-10 px-3 py-1 rounded-full border border-primary/20 text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Achievement & Badges Section (New) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Achievement - 65% width approx (8 cols) */}
            <div className="lg:col-span-8 bg-gradient-to-br from-primary/20 to-accent/20 border border-glass-border rounded-xl p-8 lg:p-10 relative overflow-hidden group backdrop-blur-md">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/30 rounded-full blur-3xl opacity-20 -mr-16 -mt-16 transition-opacity group-hover:opacity-40"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4 text-accent">
                  <Trophy className="w-5 h-5" />
                  <span className="text-sm font-semibold uppercase tracking-wider">Key Achievement</span>
                </div>

                <h3 className="font-serif text-2xl lg:text-3xl text-foreground font-medium mb-4 leading-snug">
                  Scaled a distributed payment processing engine to handle $50M+ daily transaction volume with 99.99% uptime.
                </h3>

                <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
                  Redesigned the legacy monolith into event-driven microservices using Kafka and Golang, reducing latency by 40% and eliminating single points of failure.
                </p>
              </div>
            </div>

            {/* Badges - Rest width (4 cols) */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-4">
              {/* Badge 1 */}
              <div className="bg-glass-bg border border-glass-border p-6 rounded-xl flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors backdrop-blur-sm">
                <Award className="w-8 h-8 text-primary mb-3" />
                <span className="font-medium text-foreground text-sm">System Design</span>
              </div>
              {/* Badge 2 */}
              <div className="bg-glass-bg border border-glass-border p-6 rounded-xl flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors backdrop-blur-sm">
                <Terminal className="w-8 h-8 text-primary mb-3" />
                <span className="font-medium text-foreground text-sm">Clean Code</span>
              </div>
              {/* Badge 3 */}
              <div className="bg-glass-bg border border-glass-border p-6 rounded-xl flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors backdrop-blur-sm">
                <Zap className="w-8 h-8 text-primary mb-3" />
                <span className="font-medium text-foreground text-sm">High Perf</span>
              </div>
              {/* Badge 4 */}
              <div className="bg-glass-bg border border-glass-border p-6 rounded-xl flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors backdrop-blur-sm">
                <Star className="w-8 h-8 text-primary mb-3" />
                <span className="font-medium text-foreground text-sm">Mentorship</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 border-t border-glass-border bg-glass-bg/20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-foreground">
              What People Think of Me
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-glass-bg p-8 rounded-xl border border-glass-border hover:border-primary/50 transition-all duration-300 flex flex-col h-full backdrop-blur-sm">
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-8 leading-relaxed italic flex-grow">
                  "{t.review}"
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border border-glass-border"
                  />
                  <div>
                    <p className="font-serif text-lg font-semibold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.designation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background-deep relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-3xl pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6 text-white leading-tight">
            Let's Build Something Together
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
            Looking for a software engineer who thinks in systems? I'm open to
            new opportunities and collaborations.
          </p>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-full font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
          >
            Get In Touch
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
