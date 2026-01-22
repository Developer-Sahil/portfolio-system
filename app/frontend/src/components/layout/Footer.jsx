import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '../../data/mock';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-200 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-semibold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {personalInfo.name}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              {personalInfo.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-foreground hover:text-primary text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-foreground hover:text-primary text-sm transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/work" className="text-foreground hover:text-primary text-sm transition-colors">
                  Work With Me
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Connect
            </h4>
            <div className="flex gap-4">
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-glass-bg border border-glass-border flex items-center justify-center hover:bg-primary/20 hover:border-primary text-muted-foreground hover:text-white transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-glass-bg border border-glass-border flex items-center justify-center hover:bg-primary/20 hover:border-primary text-muted-foreground hover:text-white transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${personalInfo.social.email}`}
                className="w-10 h-10 rounded-full bg-glass-bg border border-glass-border flex items-center justify-center hover:bg-primary/20 hover:border-primary text-muted-foreground hover:text-white transition-all duration-300"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-glass-border">
          <p className="text-slate-400 text-sm text-center">
            © {new Date().getFullYear()} {personalInfo.name}. Built with deliberate intent.
          </p>
        </div>
      </div>
    </footer>
  );
}
