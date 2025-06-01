import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Home, User, Briefcase, Package, Mic2, Terminal, Linkedin, Github, Mail, Menu, X, Rss } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Resume', path: '/resume', icon: User },
  { name: 'Projects', path: '/projects', icon: Briefcase },
  { name: 'NPM', path: '/npm-packages', icon: Package },
  { name: 'Research', path: '/research', icon: Mic2 },
  { name: 'Blog', path: '/blog', icon: Rss },
  { name: 'Contact', path: '/contact', icon: Terminal },
];

const Layout = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false); 
  }, [location]);

  const headerVariants = {
    scrolled: {
      backgroundColor: "hsla(var(--background) / 0.8)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 2px 10px hsla(var(--foreground) / 0.05)",
    },
    top: {
      backgroundColor: "hsla(var(--background) / 0.2)",
      backdropFilter: "blur(0px)",
      boxShadow: "none",
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <motion.header
        variants={headerVariants}
        animate={isScrolled ? "scrolled" : "top"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <Code size={32} className="text-primary group-hover:animate-pulse-subtle transition-transform group-hover:scale-110" />
            <span className="text-2xl font-bold tracking-tighter text-foreground group-hover:text-primary transition-colors">Sampark Bhol</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button key={item.name} variant="ghost" asChild size="sm">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-out hover:text-primary ${
                      isActive ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:bg-primary/5'
                    }`
                  }
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </NavLink>
              </Button>
            ))}
          </nav>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed top-20 left-0 right-0 bg-background/95 backdrop-blur-md shadow-lg z-40 p-4"
          >
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Button key={item.name} variant="ghost" asChild className="w-full justify-start">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-3 rounded-md text-base font-medium transition-colors hover:text-primary ${
                        isActive ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:bg-primary/5'
                      }`
                    }
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </NavLink>
                </Button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      
      <main className="flex-grow pt-20"> 
        {children}
      </main>

      <footer className="bg-secondary/30 text-secondary-foreground py-12 border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center space-x-6 mb-6">
            <a href="https://linkedin.com/in/sampark-bhol-118560251" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="https://github.com/SamparkBhol" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Github size={24} />
            </a>
            <a href="mailto:samparkaccess1234@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail size={24} />
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Sampark Bhol. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            Crafted with React, TailwindCSS, and a touch of ☕.
          </p>
        </div>
      </footer >
    </div>
  );
};

export default Layout;