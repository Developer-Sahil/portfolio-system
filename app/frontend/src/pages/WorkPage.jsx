import React from 'react';
import {
  Building2,
  FileCode,
  Lightbulb,
  Mic,
  Briefcase,
  GraduationCap,
  Info,
  Clock
} from 'lucide-react';
import Layout from '../components/layout/Layout';
import { workInfo, personalInfo } from '../data/mock';


const iconMap = {
  Building2,
  FileCode,
  Lightbulb,
  Mic,
  Briefcase,
  GraduationCap
};

export default function WorkPage() {


  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <p className="text-accent font-medium mb-4 tracking-wide uppercase text-sm animate-in fade-in slide-in-from-bottom-2">
              Collaborate
            </p>
            <h1 className="font-serif text-5xl md:text-6xl font-medium text-foreground mb-6 leading-tight">
              {workInfo.headline}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {workInfo.description}
            </p>
          </div>
        </div>
      </section>

      {/* Collaboration Types */}
      {/* Collaboration Types */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-slate-900 mb-12 text-center">
            How We Can Work Together
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {workInfo.collaborationTypes.map((collab) => {
              const IconComponent = iconMap[collab.icon] || Building2;
              return (
                <div
                  key={collab.type}
                  className="p-10 rounded-[2.5rem] border border-slate-100 bg-white shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 text-blue-600">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">
                    {collab.type}
                  </h3>
                  <p className="text-slate-500">{collab.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Availability Status */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              <span className="text-foreground font-medium">{workInfo.availability}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{workInfo.responseTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      {/* Contact Section */}
      <section className="py-16 lg:py-24 relative">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-slate-900 mb-6">
              Get In Touch
            </h2>
            <p className="text-slate-500 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
              Have an interesting project or opportunity? I'd love to hear about it.
              Send me an email and I'll get back to you within 48 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Email */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-md shadow-blue-900/5 hover:-translate-y-1 transition-transform duration-300">
              <p className="text-sm font-bold text-blue-500 uppercase tracking-wide mb-1">
                Email
              </p>
              <a
                href={`mailto:${personalInfo.social.email}`}
                className="text-slate-800 hover:text-primary transition-colors font-medium break-all"
              >
                {personalInfo.social.email}
              </a>
            </div>

            {/* LinkedIn */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-md shadow-blue-900/5 hover:-translate-y-1 transition-transform duration-300">
              <p className="text-sm font-bold text-blue-500 uppercase tracking-wide mb-1">
                LinkedIn
              </p>
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-800 hover:text-primary transition-colors font-medium"
              >
                Connect on LinkedIn
              </a>
            </div>

            {/* GitHub */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-md shadow-blue-900/5 hover:-translate-y-1 transition-transform duration-300">
              <p className="text-sm font-bold text-blue-500 uppercase tracking-wide mb-1">
                GitHub
              </p>
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-800 hover:text-primary transition-colors font-medium"
              >
                View my code
              </a>
            </div>
          </div>

          <div className="mt-12 bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-start justify-center gap-3 text-left md:text-center max-w-2xl mx-auto">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-700 leading-relaxed">
              For formal or work-related inquiries, using <strong>Gmail</strong> is highly recommended to ensure reliable communication.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
