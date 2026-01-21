import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Work', href: '/work' },
  { name: 'Projects', href: '/projects' },
  { name: 'Arena', href: '/arena' },
  { name: 'Systems', href: '/systems' },
  { name: 'Vault', href: '/vault' },
  { name: 'Writings', href: '/writings' },
];

export default function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-glass-bg backdrop-blur-lg border-b border-glass-border supports-[backdrop-filter]:bg-glass-bg/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Name */}
          <Link
            to="/"
            className="font-serif text-xl font-semibold text-foreground hover:text-primary transition-colors tracking-tight flex items-center gap-2"
          >
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Sahil Sharma
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'text-sm font-medium transition-all duration-300 relative py-1 px-3 rounded-full hover:bg-white/5',
                    isActive
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
