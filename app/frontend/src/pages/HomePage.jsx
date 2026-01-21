import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Brain, Database, Cloud } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { personalInfo, featuredProjects, expertiseDomains } from '../data/mock';
import { Badge } from '../components/ui/badge';

const domainIcons = {
  'Backend Engineering': Code2,
  'Machine Learning': Brain,
  'Data Engineering': Database,
  'Cloud & DevOps': Cloud,
};

export default function HomePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[#5483B3] font-medium mb-4 tracking-wide uppercase text-sm">
              {personalInfo.title}
            </p>
            <h1 className="font-serif text-display text-[#021024] mb-6">
              {personalInfo.tagline}
            </h1>
            <p className="text-body-large text-[#052659] mb-10 leading-relaxed">
              {personalInfo.doctrine}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 bg-[#021024] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#052659] transition-colors"
              >
                View Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/work"
                className="inline-flex items-center gap-2 border-2 border-[#052659] text-[#052659] px-6 py-3 rounded-lg font-medium hover:bg-[#052659] hover:text-white transition-colors"
              >
                Work With Me
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-[#C1E8FF]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="font-serif text-4xl lg:text-5xl font-semibold text-[#021024]">
                {personalInfo.stats.projectsBuilt}
              </p>
              <p className="text-[#5483B3] mt-2 text-sm font-medium uppercase tracking-wide">
                Projects Built
              </p>
            </div>
            <div className="text-center">
              <p className="font-serif text-4xl lg:text-5xl font-semibold text-[#021024]">
                {personalInfo.stats.systemsDesigned}
              </p>
              <p className="text-[#5483B3] mt-2 text-sm font-medium uppercase tracking-wide">
                Systems Designed
              </p>
            </div>
            <div className="text-center">
              <p className="font-serif text-4xl lg:text-5xl font-semibold text-[#021024]">
                {personalInfo.stats.yearsExperience}+
              </p>
              <p className="text-[#5483B3] mt-2 text-sm font-medium uppercase tracking-wide">
                Years Experience
              </p>
            </div>
            <div className="text-center">
              <p className="font-serif text-4xl lg:text-5xl font-semibold text-[#021024]">
                {personalInfo.stats.articlesWritten}
              </p>
              <p className="text-[#5483B3] mt-2 text-sm font-medium uppercase tracking-wide">
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
              <p className="text-[#5483B3] font-medium mb-2 tracking-wide uppercase text-sm">
                Selected Work
              </p>
              <h2 className="font-serif text-headline text-[#021024]">
                Featured Projects
              </h2>
            </div>
            <Link
              to="/projects"
              className="hidden md:flex items-center gap-2 text-[#052659] font-medium hover:text-[#5483B3]"
            >
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.slug}`}
                className="group bg-white rounded-xl overflow-hidden border border-[#C1E8FF] hover:border-[#5483B3] hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-[16/10] overflow-hidden bg-[#C1E8FF]">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-semibold text-[#021024] mb-2 group-hover:text-[#052659]">
                    {project.title}
                  </h3>
                  <p className="text-[#5483B3] text-sm mb-4 line-clamp-2">
                    {project.oneLiner}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-[#C1E8FF] text-[#052659] hover:bg-[#7DA0CA] text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.techStack.length > 3 && (
                      <Badge
                        variant="secondary"
                        className="bg-[#C1E8FF] text-[#052659] text-xs"
                      >
                        +{project.techStack.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 md:hidden">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-[#052659] font-medium hover:text-[#5483B3]"
            >
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#5483B3] font-medium mb-2 tracking-wide uppercase text-sm">
              What I Do
            </p>
            <h2 className="font-serif text-headline text-[#021024]">
              Expertise Domains
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {expertiseDomains.map((domain) => {
              const IconComponent = domainIcons[domain.domain] || Code2;
              return (
                <div
                  key={domain.domain}
                  className="p-8 rounded-xl border border-[#C1E8FF] bg-[#FAFBFC] hover:bg-white hover:border-[#5483B3] transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#C1E8FF] flex items-center justify-center mb-6">
                    <IconComponent className="w-6 h-6 text-[#052659]" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-[#021024] mb-3">
                    {domain.domain}
                  </h3>
                  <p className="text-[#5483B3] mb-6">
                    {domain.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {domain.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-medium text-[#052659] bg-[#C1E8FF] px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#021024]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-serif text-headline text-white mb-6">
            Let's Build Something Together
          </h2>
          <p className="text-[#7DA0CA] text-lg max-w-2xl mx-auto mb-10">
            Looking for a software engineer who thinks in systems? I'm open to
            new opportunities and collaborations.
          </p>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 bg-[#C1E8FF] text-[#021024] px-8 py-4 rounded-lg font-medium hover:bg-white transition-colors"
          >
            Get In Touch
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
