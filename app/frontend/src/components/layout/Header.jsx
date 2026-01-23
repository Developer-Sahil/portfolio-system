import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Work', href: '/work' },
  { name: 'Projects', href: '/projects' },
  /* { name: 'Arena', href: '/arena' }, */
  { name: 'Systems', href: '/systems' },
  { name: 'Vault', href: '/vault' },
  { name: 'Writings', href: '/writings' },
];

export default function Header() {
  const location = useLocation();

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg shadow-blue-900/5 rounded-full px-6 py-3 flex items-center justify-between">
        {/* Logo / Name */}
        <Link
          to="/"
          className="font-serif text-lg font-bold text-slate-800 hover:text-primary transition-colors tracking-tight flex items-center gap-2"
        >
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Sahil Sharma
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'text-sm font-medium transition-all duration-300 relative py-2 px-4 rounded-full',
                  isActive
                    ? 'bg-primary text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
