import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Disc, Music, Calendar, ArrowRight, Check } from 'lucide-react';

// Import our custom jazz subcomponents
import { JazzHeader } from './components/JazzHeader';
import { JazzHero } from './components/JazzHero';
import { JazzBioSection } from './components/JazzBioSection';
import { JazzBeatStore } from './components/JazzBeatStore';
import { JazzTourSection } from './components/JazzTourSection';
import { JazzMusicSection } from './components/JazzMusicSection';
import { JazzGallerySection } from './components/JazzGallerySection';
import { JazzContactSection } from './components/JazzContactSection';
import { JazzFooter } from './components/JazzFooter';
import { JazzCartDrawer } from './components/JazzCartDrawer';

import { BeatItem } from './data/jazzData';

interface CartItem {
  id: string;
  beat: BeatItem;
  licenseType: string;
  price: number;
}

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Smooth scroll handler to scroll cleanly to different anchors
  const handleNavClick = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Beat Cart functions
  const handleAddToCart = (beat: BeatItem, licenseType: string, price: number) => {
    const newItem: CartItem = {
      id: `${beat.id}-${licenseType}-${Date.now()}`,
      beat,
      licenseType,
      price
    };
    
    setCartItems((prev) => [...prev, newItem]);
    
    // Trigger toast notification
    setToastMessage(`Lease added: ${beat.name} (${licenseType})`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);

    // Open cart drawer so user sees items immediately
    setTimeout(() => {
      setIsCartOpen(true);
    }, 400);
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-[#050d10] text-white selection:bg-emerald-500 selection:text-black antialiased font-sans">
      
      {/* Toast Notification Bar */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-emerald-500 text-[#050d10] font-semibold text-xs tracking-widest uppercase px-6 py-3.5 shadow-xl border border-emerald-400 flex items-center gap-2.5 rounded-none"
            id="toast-notification"
          >
            <Check className="w-4 h-4 text-[#050d10] stroke-[3]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exquisite Header */}
      <JazzHeader 
        onNavClick={handleNavClick} 
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Floating Left Side Social Handle Indicator Bar */}
      <div className="fixed left-6 bottom-24 z-40 hidden xl:flex flex-col items-center space-y-6 text-gray-500 text-[10px] font-mono tracking-widest pointer-events-none">
        <span className="rotate-90 origin-left translate-x-2.5 translate-y-6 block uppercase select-none">
          BILLOSONGS // JAZZ STUDIO
        </span>
        <div className="w-[1px] h-20 bg-[#11323a]" />
      </div>

      {/* Floating Right Side Cart Overlay */}
      <AnimatePresence>
        {cartItems.length > 0 && !isCartOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed right-6 bottom-6 z-40 p-4 bg-emerald-500 text-[#050d10] rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center border-2 border-white/20"
            id="floating-cart-button"
            title="Open Beat Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-white border border-emerald-500 text-emerald-600 font-mono text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {cartItems.length}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Page Sections Stack */}
      <main className="flex flex-col" id="jazz-app-main-content">
        
        {/* [Hero Section] */}
        <JazzHero onExploreClick={handleNavClick} />

        {/* [Bio & Latest News Section] */}
        <JazzBioSection />

        {/* [Beat leasing marketplace Section] */}
        <JazzBeatStore onAddToCart={handleAddToCart} />

        {/* [My Tour Section] */}
        <JazzTourSection />

        {/* [Music & Albums Section] */}
        <JazzMusicSection />

        {/* [Gallery Photo lightboxes Section] */}
        <JazzGallerySection />

        {/* [Contact Intake Inquiries Section] */}
        <JazzContactSection />

      </main>

      {/* Sophisticated Footer */}
      <JazzFooter onScrollToTop={handleScrollToTop} />

      {/* Slideout Beat Cart Drawer */}
      <JazzCartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
