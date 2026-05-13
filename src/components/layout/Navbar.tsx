import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Beaker, Moon, Sun, Search, Menu, X } from 'lucide-react';
import { useTheme } from '../shared/ThemeContext';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Modules', path: '/classes' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full glass border-b border-slate-200 backdrop-blur-3xl">
      <div className="container mx-auto flex h-24 items-center justify-between px-8 text-slate-900">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-200 group-hover:bg-primary group-hover:text-white transition-all duration-500">
            <Beaker className="h-6 w-6 text-primary group-hover:text-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase italic text-slate-900 group-hover:text-primary transition-colors">EDU<span className="text-primary not-italic group-hover:text-slate-900">MATRIX</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-black uppercase tracking-widest transition-all hover:text-primary ${
                location.pathname === link.path ? 'text-primary' : 'text-slate-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="h-6 w-px bg-slate-200 mx-2" />
          
          <button
            onClick={toggleTheme}
            className="rounded-xl p-2.5 bg-slate-50 border border-slate-100 hover:bg-white transition-colors"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5 text-slate-400" /> : <Moon className="h-5 w-5 text-slate-400" />}
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 hover:bg-accent transition-colors"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-border bg-background"
          >
            <div className="flex flex-col p-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-lg font-medium ${
                    location.pathname === link.path ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
