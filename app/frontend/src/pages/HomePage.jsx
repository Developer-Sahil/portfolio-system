import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Brain, Database, Cloud, Trophy, Award, Star, Zap, Terminal, Coffee, Folder, Users, FileText, Activity, Fingerprint, Lightbulb, BarChart3 } from 'lucide-react';
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
      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-[2.5rem] p-8 lg:p-16 shadow-xl shadow-blue-900/5 relative overflow-hidden border border-white/50">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50 z-0"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 animate-float"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="ice-blue" className="mb-6 px-4 py-1.5 text-sm uppercase tracking-wider font-semibold">
                  {personalInfo.title}
                </Badge>
                <h1 className="font-serif text-5xl lg:text-6xl font-bold mb-6 text-slate-900 tracking-tight leading-tight">
                  {personalInfo.tagline}
                </h1>
                <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
                  {personalInfo.doctrine}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/projects"
                    className="btn-pill bg-primary text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                  >
                    View Projects
                  </Link>
                  <Link
                    to="/work"
                    className="btn-pill bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                  >
                    Work With Me
                  </Link>
                </div>
              </div>

              {/* Illustration / Stats Area */}
              {/* Illustration / Stats Area */}
              <div className="hidden lg:flex items-center justify-center relative">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-60 -z-10 animate-pulse"></div>

                <div className="relative z-10 animate-float">
                  <div className="relative w-80 h-80 rounded-full border-[6px] border-white shadow-2xl shadow-blue-500/20 overflow-hidden">
                    <img
                      src="/images/profile.jpg"
                      alt="Sahil Sharma"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://ui-avatars.com/api/?name=Sahil+Sharma&background=0D8ABC&color=fff&size=400";
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group hover:-translate-y-1 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Folder className="w-8 h-8 text-blue-600" />
              </div>
              <p className="font-serif text-4xl lg:text-5xl font-bold text-slate-900 drop-shadow-sm">
                {projects.length}+
              </p>
              <p className="text-slate-500 mt-2 text-sm font-medium">
                Projects Built
              </p>
            </div>

            <div className="text-center group hover:-translate-y-1 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <p className="font-serif text-4xl lg:text-5xl font-bold text-slate-900 drop-shadow-sm">
                {writings.length}+
              </p>
              <p className="text-slate-500 mt-2 text-sm font-medium">
                Articles Written
              </p>
            </div>

            <div className="text-center group hover:-translate-y-1 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Code2 className="w-8 h-8 text-blue-600" />
              </div>
              <p className="font-serif text-4xl lg:text-5xl font-bold text-slate-900 drop-shadow-sm">
                50K+
              </p>
              <p className="text-slate-500 mt-2 text-sm font-medium">
                Lines of Code
              </p>
            </div>

            <div className="text-center group hover:-translate-y-1 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Coffee className="w-8 h-8 text-blue-600" />
              </div>
              <p className="font-serif text-4xl lg:text-5xl font-bold text-slate-900 drop-shadow-sm">
                ∞
              </p>
              <p className="text-slate-500 mt-2 text-sm font-medium">
                Cups of Coffee
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      {/* Featured Projects Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-blue-500 font-bold mb-2 tracking-wide uppercase text-sm">
                Selected Work
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                Featured Projects
              </h2>
            </div>
            <Link
              to="/projects"
              className="hidden md:flex items-center gap-2 text-slate-500 font-medium hover:text-primary transition-colors hover:translate-x-1 duration-300"
            >
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12 text-slate-500">Loading Projects...</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.slug}`}
                  className="group bg-white border border-slate-100 rounded-[2rem] overflow-hidden hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-8">
                    <h3 className="font-serif text-xl font-bold text-slate-800 mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {project.oneLiner}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.slice(0, 3).map((tech, index) => {
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
                        );
                      })}
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
      <section className="py-24 bg-glass-bg/30 relative overflow-hidden">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {expertiseDomains.map((domain) => {
              const IconComponent = {
                'Software Engineering': Code2,
                'Machine Learning': Brain,
                'Data Engineering': Database,
                'Data Analytics': BarChart3,
              }[domain.domain] || Code2;

              const isMain = domain.domain === 'Software Engineering';

              return (
                <div
                  key={domain.domain}
                  className={`relative p-8 rounded-[2rem] border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isMain
                    ? 'md:col-span-3 bg-slate-900 border-slate-800 text-white shadow-2xl shadow-blue-900/20'
                    : 'bg-white border-slate-100 hover:shadow-blue-900/5'
                    }`}
                >
                  {isMain && (
                    <div className="absolute top-8 right-8 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-500/30">
                      Main Domain
                    </div>
                  )}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${isMain ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-50 text-blue-600'
                    }`}>
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className={`font-serif text-xl font-bold mb-3 ${isMain ? 'text-white text-2xl' : 'text-slate-900'}`}>
                    {domain.domain}
                  </h3>
                  <p className={`mb-6 leading-relaxed ${isMain ? 'text-slate-300 max-w-2xl text-lg' : 'text-slate-500'}`}>
                    {domain.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {domain.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`text-xs font-semibold px-3 py-1 rounded-full border ${isMain
                          ? 'text-blue-200 bg-blue-900/30 border-blue-800'
                          : 'text-blue-700 bg-blue-50 border-blue-100'
                          }`}
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
            <div className="lg:col-span-8 bg-gradient-to-br from-blue-50 to-white border border-slate-100 rounded-[2.5rem] p-10 lg:p-12 relative overflow-hidden group shadow-lg shadow-blue-900/5">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 -mr-16 -mt-16 transition-opacity group-hover:opacity-70"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold uppercase tracking-wider text-blue-600">Key Achievement</span>
                </div>

                <h3 className="font-serif text-2xl lg:text-3xl text-slate-900 font-bold mb-6 leading-snug">
                  Secured 2nd Prize in Return Journey Hackathon organized by IIT-Kanpur.
                </h3>

                <p className="text-slate-600 text-lg leading-relaxed max-w-2xl">
                  Awarded for designing and developing a responsive tourism web app focused on seamless user experience.
                </p>
              </div>
            </div>

            {/* Badges - Rest width (4 cols) */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-4">
              {/* Badge 1 */}
              <div className="bg-white border border-slate-100 p-6 rounded-[2rem] flex flex-col items-center justify-center text-center hover:shadow-lg hover:shadow-blue-900/5 transition-all duration-300 hover:-translate-y-1">
                <Award className="w-8 h-8 text-blue-500 mb-3" />
                <span className="font-bold text-slate-700 text-sm">System Design</span>
              </div>
              {/* Badge 2 */}
              <div className="bg-white border border-slate-100 p-6 rounded-[2rem] flex flex-col items-center justify-center text-center hover:shadow-lg hover:shadow-blue-900/5 transition-all duration-300 hover:-translate-y-1">
                <Terminal className="w-8 h-8 text-blue-500 mb-3" />
                <span className="font-bold text-slate-700 text-sm">Clean Code</span>
              </div>
              {/* Badge 3 */}
              <div className="bg-white border border-slate-100 p-6 rounded-[2rem] flex flex-col items-center justify-center text-center hover:shadow-lg hover:shadow-blue-900/5 transition-all duration-300 hover:-translate-y-1">
                <Zap className="w-8 h-8 text-blue-500 mb-3" />
                <span className="font-bold text-slate-700 text-sm">High Perf</span>
              </div>
              {/* Badge 4 */}
              <div className="bg-white border border-slate-100 p-6 rounded-[2rem] flex flex-col items-center justify-center text-center hover:shadow-lg hover:shadow-blue-900/5 transition-all duration-300 hover:-translate-y-1">
                <Star className="w-8 h-8 text-blue-500 mb-3" />
                <span className="font-bold text-slate-700 text-sm">Mentorship</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Personality Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <p className="text-blue-500 font-bold mb-2 tracking-wide uppercase text-sm">
              The Human Design
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900">
              Personality Archetype
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column: Image/Visual */}
            <div className="relative group h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-violet-200 rounded-[2.5rem] rotate-3 opacity-50 group-hover:rotate-6 transition-transform duration-500"></div>
              <div className="relative bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-blue-900/5 overflow-hidden h-full min-h-[500px] flex items-center justify-center">
                <img src="/images/intp.jpg" className="w-full h-full object-cover" alt="INTP Personality" />
              </div>
            </div>

            {/* Right Column: Content (Identity -> Strengths -> Interests) */}
            <div className="space-y-6">
              {/* Identity Card */}
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg shadow-blue-900/5 transition-transform hover:-translate-y-1 duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl opacity-50 -mr-10 -mt-10"></div>
                <div className="relative z-10">
                  <h3 className="font-serif text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                    INTP <span className="text-blue-600">Logician</span>
                    <Brain className="w-6 h-6 text-blue-400" />
                  </h3>
                  <p className="text-slate-500 font-medium mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    Analyst
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                    Rational
                  </p>
                  <blockquote className="text-slate-600 leading-relaxed italic border-l-4 border-blue-500 pl-4 py-1">
                    "Learn from yesterday, live for today, hope for tomorrow. The important thing is not to stop questioning."
                  </blockquote>
                </div>
              </div>

              {/* Strengths */}
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg shadow-blue-900/5 relative overflow-hidden group hover:border-blue-200 transition-colors duration-300">
                <div className="absolute top-6 right-6 p-3 bg-blue-50 rounded-2xl text-blue-600 opacity-50 group-hover:opacity-100 transition-opacity">
                  <Zap className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                  Strengths
                </h4>
                <p className="text-slate-600 leading-relaxed pr-12">
                  Great Analysts and Abstract Thinkers, Imaginative, Original, Open-Minded, Enthusiastic, Objective, Honest and Straightforward.
                </p>
              </div>

              {/* Interests */}
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg shadow-blue-900/5 relative overflow-hidden group hover:border-violet-200 transition-colors duration-300">
                <div className="absolute top-6 right-6 p-3 bg-violet-50 rounded-2xl text-violet-500 opacity-50 group-hover:opacity-100 transition-opacity">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-2 h-8 bg-violet-500 rounded-full"></span>
                  Interests
                </h4>
                <div className="flex flex-wrap gap-2 pr-12">
                  {[
                    "Systems Thinking",
                    "Artificial Intelligence",
                    "Philosophy & Logic",
                    "Sci-Fi & Futurism",
                    "Strategy Gaming",
                    "Tech Trends"
                  ].map((interest) => (
                    <span key={interest} className="px-3 py-1 bg-violet-50 text-violet-700 text-sm font-medium rounded-full border border-violet-100">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-glass-bg/20">
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
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-[3rem] p-12 lg:p-20 shadow-2xl shadow-blue-900/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
            <div className="relative z-10">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                Let's Build Something Together
              </h2>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                Looking for a software engineer who thinks in systems? I'm open to
                new opportunities and collaborations.
              </p>
              <Link
                to="/work"
                className="btn-pill bg-white text-blue-600 hover:bg-blue-50 shadow-lg shadow-black/10 inline-flex items-center gap-2"
              >
                Get In Touch
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
