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
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[#5483B3] font-medium mb-4 tracking-wide uppercase text-sm">
              Collaborate
            </p>
            <h1 className="font-serif text-display text-[#021024] mb-6">
              {workInfo.headline}
            </h1>
            <p className="text-body-large text-[#052659] leading-relaxed">
              {workInfo.description}
            </p>
          </div>
        </div>
      </section>

      {/* Collaboration Types */}
      <section className="py-16 bg-white border-y border-[#C1E8FF]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="font-serif text-headline text-[#021024] mb-12 text-center">
            How We Can Work Together
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {workInfo.collaborationTypes.map((collab) => {
              const IconComponent = iconMap[collab.icon] || Building2;
              return (
                <div
                  key={collab.type}
                  className="p-8 rounded-xl border border-[#C1E8FF] bg-[#FAFBFC] hover:bg-white hover:border-[#5483B3] transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#C1E8FF] flex items-center justify-center mb-6">
                    <IconComponent className="w-6 h-6 text-[#052659]" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-[#021024] mb-3">
                    {collab.type}
                  </h3>
                  <p className="text-[#5483B3]">{collab.description}</p>
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
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[#021024] font-medium">{workInfo.availability}</span>
            </div>
            <div className="flex items-center gap-3 text-[#5483B3]">
              <Clock className="w-4 h-4" />
              <span>{workInfo.responseTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column - Info */}
            <div>
              <h2 className="font-serif text-headline text-[#021024] mb-6">
                Get In Touch
              </h2>
              <p className="text-[#052659] text-lg mb-8 leading-relaxed">
                Have an interesting project or opportunity? I'd love to hear about it.
                Fill out the form and I'll get back to you within 48 hours.
              </p>

              <div className="space-y-6">
                <div>
                  <p className="text-sm font-medium text-[#5483B3] uppercase tracking-wide mb-2">
                    Email
                  </p>
                  <a
                    href={`mailto:${personalInfo.social.email}`}
                    className="text-[#021024] hover:text-[#052659]"
                  >
                    {personalInfo.social.email}
                  </a>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#5483B3] uppercase tracking-wide mb-2">
                    LinkedIn
                  </p>
                  <a
                    href={personalInfo.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#021024] hover:text-[#052659]"
                  >
                    Connect on LinkedIn
                  </a>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#5483B3] uppercase tracking-wide mb-2">
                    GitHub
                  </p>
                  <a
                    href={personalInfo.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#021024] hover:text-[#052659]"
                  >
                    View my code
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div>
              {isSubmitted ? (
                <div className="bg-[#C1E8FF] rounded-xl p-12 text-center">
                  <CheckCircle className="w-16 h-16 text-[#052659] mx-auto mb-6" />
                  <h3 className="font-serif text-2xl font-semibold text-[#021024] mb-3">
                    Message Sent!
                  </h3>
                  <p className="text-[#052659]">
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[#021024]">
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
                        className="border-[#C1E8FF] focus:border-[#5483B3] focus:ring-[#5483B3]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[#021024]">
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
                        className="border-[#C1E8FF] focus:border-[#5483B3] focus:ring-[#5483B3]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-[#021024]">
                        Company
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your company"
                        className="border-[#C1E8FF] focus:border-[#5483B3] focus:ring-[#5483B3]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type" className="text-[#021024]">
                        Inquiry Type *
                      </Label>
                      <select
                        id="type"
                        name="type"
                        required
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full h-10 px-3 rounded-md border border-[#C1E8FF] bg-white text-[#021024] focus:border-[#5483B3] focus:ring-1 focus:ring-[#5483B3] focus:outline-none"
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
                    <Label htmlFor="message" className="text-[#021024]">
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
                      className="border-[#C1E8FF] focus:border-[#5483B3] focus:ring-[#5483B3] resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#021024] hover:bg-[#052659] text-white py-6"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
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
