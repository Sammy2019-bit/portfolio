import React, { useState } from 'react';
import { Menu, X, Disc, Music, Calendar, Image as ImageIcon, Mail, FileText, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BILLO_SOCIALS } from '../data/jazzData';

interface HeaderProps {
  onNavClick: (sectionId: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const JazzHeader: React.FC<HeaderProps> = ({ onNavClick, cartCount, onOpenCart }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'bio', label: 'BIO', icon: FileText },
    { id: 'beat-store', label: 'BEAT STORE', icon: Disc },
    { id: 'tour', label: 'TOUR', icon: Calendar },
    { id: 'music', label: 'MUSIC', icon: Music },
    { id: 'gallery', label: 'GALLERY', icon: ImageIcon },
    { id: 'contact', label: 'CONTACT', icon: Mail },
  ];

  const handleItemClick = (id: string) => {
    onNavClick(id);
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050d10]/90 backdrop-blur-md border-b border-[#0f242a] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => handleItemClick('hero')} 
          className="cursor-pointer group flex flex-col justify-center"
          id="header-logo"
        >
          <span className="font-serif text-xl tracking-[0.25em] text-white font-bold group-hover:text-emerald-400 transition-colors duration-300">
            BILLOSONGS
          </span>
          <span className="font-mono text-[9px] tracking-[0.4em] text-emerald-500 font-medium -mt-1 group-hover:text-emerald-300 transition-colors duration-300">
            AMERICAN JAZZ STUDIO
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className="text-xs tracking-[0.2em] font-medium text-gray-300 hover:text-white hover:underline underline-offset-8 transition-all duration-300 cursor-pointer"
              id={`nav-link-${item.id}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Cart & Social Controls */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onOpenCart}
            className="relative p-2 text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-1.5 bg-[#0a181c] hover:bg-[#112a32] border border-[#112a32] rounded-full px-4 text-xs tracking-wider"
            id="header-cart-button"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
            <span className="font-mono">{cartCount}</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors duration-300 focus:outline-none"
            aria-label="Toggle menu"
            id="mobile-menu-trigger"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#050d10] border-b border-[#0f242a] overflow-hidden"
            id="mobile-drawer-container"
          >
            <div className="px-6 py-6 space-y-4 flex flex-col">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className="flex items-center space-x-3 py-2 text-sm tracking-widest font-medium text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-left border-b border-[#0d1e22]/50 pb-2"
                    id={`mobile-nav-${item.id}`}
                  >
                    <Icon className="w-4 h-4 text-emerald-500" />
                    <span>{item.label}</span>
                  </button>
                );
              })}

              <div className="pt-4 flex justify-between items-center text-xs text-gray-500 font-mono">
                <span>SOCIALS //</span>
                <div className="flex space-x-3">
                  {BILLO_SOCIALS.slice(0, 4).map((soc) => (
                    <a
                      key={soc.name}
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      {soc.name.substring(0, 3).toUpperCase()}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
