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
      <section className="py-16 border-y border-glass-border bg-glass-bg/30">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-semibold text-foreground mb-12 text-center">
            How We Can Work Together
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {workInfo.collaborationTypes.map((collab) => {
              const IconComponent = iconMap[collab.icon] || Building2;
              return (
                <div
                  key={collab.type}
                  className="p-8 rounded-xl border border-glass-border bg-glass-bg hover:bg-glass-bg/80 hover:border-primary/50 transition-all duration-300 backdrop-blur-md"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                    {collab.type}
                  </h3>
                  <p className="text-muted-foreground">{collab.description}</p>
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
      <section className="py-16 lg:py-24 relative">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column - Info */}
            <div>
              <h2 className="font-serif text-4xl font-semibold text-foreground mb-6">
                Get In Touch
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Have an interesting project or opportunity? I'd love to hear about it.
                Fill out the form and I'll get back to you within 48 hours.
              </p>

              <div className="space-y-6">
                <div>
                  <p className="text-sm font-medium text-accent uppercase tracking-wide mb-2">
                    Email
                  </p>
                  <a
                    href={`mailto:${personalInfo.social.email}`}
                    className="text-foreground hover:text-primary transition-colors text-lg"
                  >
                    {personalInfo.social.email}
                  </a>
                </div>
                <div>
                  <p className="text-sm font-medium text-accent uppercase tracking-wide mb-2">
                    LinkedIn
                  </p>
                  <a
                    href={personalInfo.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors text-lg"
                  >
                    Connect on LinkedIn
                  </a>
                </div>
                <div>
                  <p className="text-sm font-medium text-accent uppercase tracking-wide mb-2">
                    GitHub
                  </p>
                  <a
                    href={personalInfo.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors text-lg"
                  >
                    View my code
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div>
              {isSubmitted ? (
                <div className="bg-glass-bg border border-glass-border rounded-xl p-12 text-center backdrop-blur-md">
                  <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground">
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
                        className="bg-background/50 border-glass-border focus:border-primary focus:ring-primary text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground">
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
                        className="bg-background/50 border-glass-border focus:border-primary focus:ring-primary text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-foreground">
                        Company
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your company"
                        className="bg-background/50 border-glass-border focus:border-primary focus:ring-primary text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type" className="text-foreground">
                        Inquiry Type *
                      </Label>
                      <select
                        id="type"
                        name="type"
                        required
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full h-10 px-3 rounded-md border border-glass-border bg-background/50 text-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
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
                    <Label htmlFor="message" className="text-foreground">
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
                      className="bg-background/50 border-glass-border focus:border-primary focus:ring-primary text-foreground placeholder:text-muted-foreground resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 border-none shadow-lg shadow-primary/20"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
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
