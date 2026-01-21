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
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#C1E8FF]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Name */}
          <Link
            to="/"
            className="font-serif text-xl font-semibold text-[#021024] hover:text-[#052659]"
          >
            Sahil Sharma
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
                    'text-sm font-medium transition-colors relative py-1',
                    isActive
                      ? 'text-[#021024]'
                      : 'text-[#5483B3] hover:text-[#052659]'
                  )}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[#052659]" />
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
