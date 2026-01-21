import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { allProjects } from '../data/mock';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState(null);

  // Get all unique tech stack items
  const allTechStack = [...new Set(allProjects.flatMap((p) => p.techStack))];

  // Filter projects
  const filteredProjects = allProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.oneLiner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTech = !selectedTech || project.techStack.includes(selectedTech);
    return matchesSearch && matchesTech;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 lg:py-20 border-b border-[#C1E8FF]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <p className="text-[#5483B3] font-medium mb-4 tracking-wide uppercase text-sm">
            Portfolio
          </p>
          <h1 className="font-serif text-display text-[#021024] mb-6">
            Projects
          </h1>
          <p className="text-body-large text-[#052659] max-w-2xl">
            A collection of systems I've designed and built—each one a lesson in
            engineering trade-offs, scalability, and deliberate decision-making.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b border-[#C1E8FF]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            {/* Search */}
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5483B3]" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-[#C1E8FF] focus:border-[#5483B3] focus:ring-[#5483B3]"
              />
            </div>

            {/* Tech Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-[#5483B3]" />
              <button
                onClick={() => setSelectedTech(null)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  !selectedTech
                    ? 'bg-[#021024] text-white'
                    : 'bg-[#C1E8FF] text-[#052659] hover:bg-[#7DA0CA]'
                }`}
              >
                All
              </button>
              {allTechStack.slice(0, 6).map((tech) => (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(tech === selectedTech ? null : tech)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedTech === tech
                      ? 'bg-[#021024] text-white'
                      : 'bg-[#C1E8FF] text-[#052659] hover:bg-[#7DA0CA]'
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
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#5483B3] text-lg">
                No projects found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
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
                    {project.featured && (
                      <Badge className="mb-3 bg-[#052659] text-white text-xs">
                        Featured
                      </Badge>
                    )}
                    <h3 className="font-serif text-xl font-semibold text-[#021024] mb-2 group-hover:text-[#052659]">
                      {project.title}
                    </h3>
                    <p className="text-[#5483B3] text-sm mb-4 line-clamp-2">
                      {project.oneLiner}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="bg-[#C1E8FF] text-[#052659] hover:bg-[#7DA0CA] text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.techStack.length > 4 && (
                        <Badge
                          variant="secondary"
                          className="bg-[#C1E8FF] text-[#052659] text-xs"
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
