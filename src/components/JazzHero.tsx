import React from 'react';
import { motion } from 'motion/react';
import { Disc, ChevronDown, Music, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreClick: (sectionId: string) => void;
}

export const JazzHero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section 
      id="hero" 
      className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1533090161767-e6ffed986c88')] bg-cover bg-center bg-blend-multiply bg-[#031317] pt-24 overflow-hidden"
    >
      {/* Dynamic Overlay Gradients for the Classic Teal Wooden Tint */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050d10] via-transparent to-[#050d10]/80 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050d10]/95 via-[#050d10]/50 to-transparent z-10" />

      {/* Subtle animated floating lights */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-[120px] animate-pulse duration-[6000ms]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full filter blur-[100px] animate-pulse duration-[8000ms]" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20">
        {/* Left Side Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="lg:col-span-7 flex flex-col items-start text-left space-y-6"
          id="hero-content-panel"
        >
          <div className="inline-flex items-center gap-2 bg-[#0a1f24] border border-[#11323a] px-3.5 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-[10px] tracking-widest text-emerald-300 uppercase">
              Now Touring & Licensing Beats
            </span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl xl:text-8xl text-white tracking-tight leading-none">
            Nigerian <span className="text-emerald-400 italic block mt-1">Jazz Fusion</span> 
            Modern Beats.
          </h1>

          <p className="text-gray-300 text-sm md:text-base max-w-xl leading-relaxed font-sans font-light">
            Welcome to the interactive portfolio of <span className="text-white font-medium">billosongs</span>, the acclaimed Nigerian jazz saxophonist and multi-instrumentalist. 
            Blending the legendary, timeless, smoky elements of classic Jazz with rich West African Afrobeat grooves, high-performance 808 trap rhythms, and vintage lofi swings. Explore albums, lease custom beats, and book global live performances.
          </p>

          {/* Core Interactive Actions */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => onExploreClick('beat-store')}
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-[#050d10] font-semibold text-xs tracking-[0.2em] uppercase rounded-none transition-all duration-300 shadow-[0_4px_20px_rgba(16,185,129,0.15)] flex items-center gap-2.5 hover:scale-105 active:scale-95 cursor-pointer"
              id="hero-buy-beats-btn"
            >
              <Disc className="w-4 h-4 animate-spin-slow" />
              Lease Beats
            </button>
            <button
              onClick={() => onExploreClick('music')}
              className="px-8 py-4 bg-transparent hover:bg-white/5 text-white border border-gray-600 hover:border-white font-semibold text-xs tracking-[0.2em] uppercase rounded-none transition-all duration-300 flex items-center gap-2.5 hover:scale-105 active:scale-95 cursor-pointer"
              id="hero-listen-btn"
            >
              <Music className="w-4 h-4" />
              Listen Portfolio
            </button>
          </div>

          {/* Quick social snippets */}
          <div className="flex items-center gap-6 pt-6 text-gray-500 text-xs font-mono">
            <span>KEY FEATURES:</span>
            <span className="text-emerald-400/80">★ Web Synthesizer</span>
            <span className="text-emerald-400/80">★ Interactive Beat Cart</span>
            <span className="text-emerald-400/80">★ Dynamic Ticketing</span>
          </div>
        </motion.div>

        {/* Right Side Image - Sax Player Superimposed */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="lg:col-span-5 relative flex justify-center"
          id="hero-image-panel"
        >
          <div className="relative w-full max-w-[450px] aspect-[4/5] border-8 border-[#0c242b] shadow-2xl overflow-hidden group">
            {/* Soft gold backdrop glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e23] via-transparent to-transparent z-10" />
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200" />
            
            {/* The primary portrait of the Jazz Artist (billosongs simulation) */}
            <img 
              src="https://images.unsplash.com/photo-1525994886773-080587e161c2?auto=format&fit=crop&w=1000&q=90" 
              alt="billosongs American Jazz Artist" 
              className="w-full h-full object-cover grayscale brightness-90 contrast-110 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            
            {/* Small floating info box */}
            <div className="absolute bottom-6 left-6 right-6 bg-[#050d10]/90 backdrop-blur-md border border-[#11323a] p-4 z-20">
              <span className="font-mono text-[9px] tracking-widest text-emerald-400 uppercase block mb-1">
                Artist Profile //
              </span>
              <span className="font-serif text-lg text-white font-medium block">
                billosongs
              </span>
              <span className="font-mono text-[10px] text-gray-400 block mt-0.5">
                Nigerian Multi-Instrumentalist, Saxophonist & Sound Designer
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Downward Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1">
        <span className="font-mono text-[9px] tracking-[0.3em] text-gray-500 uppercase">Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="cursor-pointer p-1.5 rounded-full hover:bg-white/5 transition-colors"
          onClick={() => onExploreClick('bio')}
        >
          <ChevronDown className="w-4 h-4 text-emerald-400" />
        </motion.div>
      </div>
    </section>
  );
};
