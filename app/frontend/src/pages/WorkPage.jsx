import React, { useState } from 'react';
import {
  Building2,
  FileCode,
  Lightbulb,
  Mic,
  Send,
  CheckCircle,
  Clock,
} from 'lucide-react';
import Layout from '../components/layout/Layout';
import { workInfo, personalInfo } from '../data/mock';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';

const iconMap = {
  Building2,
  FileCode,
  Lightbulb,
  Mic,
};

export default function WorkPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    type: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after showing success
    setTimeout(() => {
      setFormData({ name: '', email: '', company: '', type: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

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
      {/* Contact Form */}
      <section className="py-16 lg:py-24 relative">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column - Info */}
            <div>
              <h2 className="font-serif text-4xl font-bold text-slate-900 mb-6">
                Get In Touch
              </h2>
              <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                Have an interesting project or opportunity? I'd love to hear about it.
                Fill out the form and I'll get back to you within 48 hours.
              </p>

              <div className="space-y-6">
                <div>
                  <p className="text-sm font-bold text-blue-500 uppercase tracking-wide mb-2">
                    Email
                  </p>
                  <a
                    href={`mailto:${personalInfo.social.email}`}
                    className="text-slate-800 hover:text-primary transition-colors text-lg font-medium"
                  >
                    {personalInfo.social.email}
                  </a>
                </div>
                <div>
                  <p className="text-sm font-bold text-blue-500 uppercase tracking-wide mb-2">
                    LinkedIn
                  </p>
                  <a
                    href={personalInfo.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-800 hover:text-primary transition-colors text-lg font-medium"
                  >
                    Connect on LinkedIn
                  </a>
                </div>
                <div>
                  <p className="text-sm font-bold text-blue-500 uppercase tracking-wide mb-2">
                    GitHub
                  </p>
                  <a
                    href={personalInfo.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-800 hover:text-primary transition-colors text-lg font-medium"
                  >
                    View my code
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div>
              {isSubmitted ? (
                <div className="bg-white border border-slate-100 rounded-[2.5rem] p-12 text-center shadow-lg shadow-blue-900/5">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                  <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3">
                    Message Sent!
                  </h3>
                  <p className="text-slate-500">
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-blue-900/5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-700 font-medium ml-1">
                        Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400 rounded-2xl h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-700 font-medium ml-1">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400 rounded-2xl h-12"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-slate-700 font-medium ml-1">
                        Company
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your company"
                        className="bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400 rounded-2xl h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type" className="text-slate-700 font-medium ml-1">
                        Inquiry Type *
                      </Label>
                      <select
                        id="type"
                        name="type"
                        required
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full h-12 px-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      >
                        <option value="">Select type...</option>
                        <option value="fulltime">Full-time Role</option>
                        <option value="contract">Contract Work</option>
                        <option value="advisory">Technical Advisory</option>
                        <option value="speaking">Speaking/Workshop</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-slate-700 font-medium ml-1">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or opportunity..."
                      rows={6}
                      className="bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400 rounded-2xl resize-none p-4"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-white py-6 border-none shadow-lg shadow-blue-500/20 rounded-full text-lg font-medium transition-all hover:-translate-y-0.5"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
