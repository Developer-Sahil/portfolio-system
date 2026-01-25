import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Menu, X } from 'lucide-react';

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
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

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-slate-600 hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-3xl pt-24 px-6 md:hidden animate-in fade-in slide-in-from-top-10 duration-200">
          <nav className="flex flex-col gap-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'text-lg font-medium transition-all duration-300 py-4 border-b border-slate-100 last:border-0',
                    isActive
                      ? 'text-primary'
                      : 'text-slate-600'
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
