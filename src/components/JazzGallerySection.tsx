import React, { useState } from 'react';
import { GALLERY_ITEMS, GalleryItem } from '../data/jazzData';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Maximize2, Camera, Calendar, Tag } from 'lucide-react';

export const JazzGallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Studio' | 'Live' | 'Portrait'>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = activeCategory === 'All' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const handleOpenLightbox = (item: GalleryItem) => {
    const originalIndex = GALLERY_ITEMS.findIndex((gi) => gi.id === item.id);
    if (originalIndex !== -1) {
      setLightboxIndex(originalIndex);
    }
  };

  const handleNextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev + 1 >= GALLERY_ITEMS.length ? 0 : prev + 1;
    });
  };

  const handlePrevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev - 1 < 0 ? GALLERY_ITEMS.length - 1 : prev - 1;
    });
  };

  return (
    <section 
      id="gallery" 
      className="relative py-28 flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1511192336575-5a79af67a629')] bg-cover bg-center bg-blend-multiply bg-[#041418] overflow-hidden"
    >
      {/* Wooden teal blending filters */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050d10] via-transparent to-[#050d10]" />
      <div className="absolute inset-0 bg-[#061d23]/80 mix-blend-multiply" />

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        
        {/* Gallery Container Box */}
        <div 
          className="bg-[#050d10]/90 backdrop-blur-md border border-[#11323a] p-8 md:p-12 shadow-2xl relative"
          id="gallery-card-box"
        >
          {/* Subtle line header */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 to-transparent" />

          {/* Heading and Filters */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="text-left">
              <h2 className="font-serif text-3xl md:text-4xl text-white tracking-wide relative inline-block pb-3">
                Gallery
                <span className="absolute bottom-0 left-0 w-20 h-[2px] bg-emerald-500" />
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2" id="gallery-category-filter">
              {(['All', 'Studio', 'Live', 'Portrait'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 font-mono text-[9px] tracking-widest uppercase transition-all duration-300 rounded-none cursor-pointer border ${
                    activeCategory === cat 
                      ? 'border-emerald-400 bg-[#0b262d] text-emerald-400' 
                      : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
                  }`}
                  id={`gallery-filter-${cat.toLowerCase()}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Images Grid */}
          <div 
            className="grid grid-cols-2 md:grid-cols-5 gap-4" 
            id="gallery-thumbnails-grid"
          >
            {filteredItems.map((item) => (
              <div 
                key={item.id}
                onClick={() => handleOpenLightbox(item)}
                className="relative aspect-[3/4] border border-[#11323a] bg-[#031114] overflow-hidden group cursor-pointer"
                id={`gallery-card-${item.id}`}
              >
                {/* Image */}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Hover glassmorphic caption card */}
                <div className="absolute inset-0 bg-[#050d10]/75 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-3.5 text-left">
                  <span className="font-mono text-[8px] tracking-widest text-emerald-400 uppercase mb-1 flex items-center gap-1">
                    <Tag className="w-2.5 h-2.5" />
                    {item.category}
                  </span>
                  <span className="font-serif text-xs font-semibold text-white leading-snug">
                    {item.title}
                  </span>
                  <span className="font-mono text-[8px] text-gray-500 block mt-1">
                    {item.year} RELEASE
                  </span>
                  
                  <div className="absolute top-3 right-3">
                    <Maximize2 className="w-4 h-4 text-emerald-400 opacity-60 hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Micro stats bar inside Gallery */}
          <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 mt-6 pt-4 border-t border-[#11323a]/30">
            <span>[TOTAL SAMPLES: 5 STYLES]</span>
            <span className="text-emerald-500/80">★ STUDIO MONITORS CALIBRATED</span>
          </div>

        </div>

      </div>

      {/* Lightbox Slider Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark background */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
              className="absolute inset-0 bg-[#020506]/95 backdrop-blur-md"
              id="lightbox-backdrop"
            />

            {/* Slider container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-3xl relative z-10 flex flex-col items-center justify-center"
              id="lightbox-frame"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/5] md:aspect-[16/10] w-full bg-black border border-[#11323a] shadow-2xl overflow-hidden flex items-center justify-center">
                
                {/* Navigation Controls */}
                <button 
                  onClick={handlePrevLightbox}
                  className="absolute left-4 z-20 p-2.5 bg-black/60 hover:bg-emerald-500 hover:text-black text-white rounded-full transition-all cursor-pointer"
                  id="lightbox-prev-btn"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleNextLightbox}
                  className="absolute right-4 z-20 p-2.5 bg-black/60 hover:bg-emerald-500 hover:text-black text-white rounded-full transition-all cursor-pointer"
                  id="lightbox-next-btn"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Close Button */}
                <button 
                  onClick={() => setLightboxIndex(null)}
                  className="absolute top-4 right-4 z-20 p-2 bg-black/60 hover:bg-red-500 text-white rounded-full transition-all cursor-pointer"
                  id="lightbox-close-btn"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Active Lightbox Image */}
                <img 
                  src={GALLERY_ITEMS[lightboxIndex].image} 
                  alt={GALLERY_ITEMS[lightboxIndex].title} 
                  className="max-h-full max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />

                {/* Glass Bottom Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#050d10]/90 backdrop-blur-md border-t border-[#11323a] p-4 text-left flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <Camera className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="font-mono text-[9px] tracking-widest text-emerald-400 uppercase">
                        {GALLERY_ITEMS[lightboxIndex].category} PHOTOGRAPHY //
                      </span>
                    </div>
                    <h4 className="font-serif text-lg text-white font-medium mt-1">
                      {GALLERY_ITEMS[lightboxIndex].title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-gray-400 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{GALLERY_ITEMS[lightboxIndex].year}</span>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
