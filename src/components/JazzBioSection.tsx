import React, { useState } from 'react';
import { JAZZ_NEWS } from '../data/jazzData';
import { Calendar, Quote, ChevronRight, Volume2, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const JazzBioSection: React.FC = () => {
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [activeBioThumb, setActiveBioThumb] = useState<number | null>(null);

  // Bio thumbnails
  const bioThumbnails = [
    {
      id: 0,
      title: 'Acoustic Setup',
      desc: 'billosongs recording acoustic brass loops in Studio B, blending tube mics with analog desks.',
      img: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 1,
      title: 'Beats & Synths',
      desc: 'Developing deep sub-bass glides and synth filters for the signature Jazz Trap beat catalogs.',
      img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 2,
      title: 'The Instrument',
      desc: 'Vintage Selmer Mark VI tenor saxophone used in all premium audio stems and performance tracks.',
      img: 'https://images.unsplash.com/photo-1525994886773-080587e161c2?auto=format&fit=crop&w=300&q=80'
    }
  ];

  return (
    <section id="bio" className="bg-[#050d10] py-24 border-t border-[#0f242a] relative overflow-hidden">
      {/* Decorative vertical lines */}
      <div className="absolute top-0 bottom-0 left-[10%] w-[1px] bg-emerald-500/5 hidden md:block" />
      <div className="absolute top-0 bottom-0 right-[10%] w-[1px] bg-emerald-500/5 hidden md:block" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
        
        {/* Left Column: Bio */}
        <div className="lg:col-span-7 space-y-8" id="bio-left-panel">
          <div className="space-y-4">
            <h2 className="font-serif text-3xl md:text-4xl text-white tracking-wide relative inline-block pb-3">
              Bio
              <span className="absolute bottom-0 left-0 w-24 h-[2px] bg-emerald-500" />
            </h2>
            
            <div className="space-y-6 text-gray-400 text-sm md:text-base leading-relaxed font-sans font-light">
              <p>
                <span className="text-white font-medium text-lg font-serif">Lorem Ipsum</span> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
              <p>
                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </div>
          </div>

          {/* 3 Horizontal Custom Bio Cards */}
          <div className="space-y-4 pt-4">
            <span className="font-mono text-[10px] tracking-[0.25em] text-emerald-400 uppercase block">
              STUDIO CAPTURES // CLICK TO EXAMINE
            </span>
            <div className="grid grid-cols-3 gap-4">
              {bioThumbnails.map((thumb) => (
                <div 
                  key={thumb.id}
                  onClick={() => setActiveBioThumb(activeBioThumb === thumb.id ? null : thumb.id)}
                  className={`relative aspect-[4/3] border-2 cursor-pointer overflow-hidden group transition-all duration-300 ${
                    activeBioThumb === thumb.id ? 'border-emerald-400 scale-[1.03] shadow-lg shadow-emerald-500/10' : 'border-[#102a32] hover:border-gray-500'
                  }`}
                  id={`bio-thumb-${thumb.id}`}
                >
                  <img 
                    src={thumb.img} 
                    alt={thumb.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-[#050d10]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Info className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
              ))}
            </div>

            {/* Micro details panel on click */}
            <AnimatePresence mode="wait">
              {activeBioThumb !== null && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-[#0a1e23] border border-[#11323a] p-4 text-xs space-y-1.5"
                  id="bio-thumb-expanded-details"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-serif font-semibold text-white tracking-wide">
                      {bioThumbnails[activeBioThumb].title}
                    </span>
                    <button 
                      onClick={() => setActiveBioThumb(null)} 
                      className="text-gray-500 hover:text-white font-mono text-[9px] uppercase tracking-wider"
                    >
                      [CLOSE]
                    </button>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {bioThumbnails[activeBioThumb].desc}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Latest News */}
        <div className="lg:col-span-5 space-y-8" id="bio-right-panel">
          <div className="space-y-4">
            <h2 className="font-serif text-3xl md:text-4xl text-white tracking-wide relative inline-block pb-3">
              Latest News
              <span className="absolute bottom-0 left-0 w-24 h-[2px] bg-emerald-500" />
            </h2>
          </div>

          <div className="space-y-6">
            {JAZZ_NEWS.map((item, idx) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedNewsId(selectedNewsId === item.id ? null : item.id)}
                className="group border-b border-[#0d2228] pb-6 cursor-pointer hover:border-[#163a44] transition-colors"
                id={`news-item-${item.id}`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="font-mono text-[10px] tracking-widest uppercase">
                      {item.date}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg text-white group-hover:text-emerald-300 transition-colors duration-200">
                    {item.title}
                  </h3>
                </div>

                {/* News details expander */}
                <div className={`mt-3 text-xs leading-relaxed text-gray-400 overflow-hidden transition-all duration-500 ${
                  selectedNewsId === item.id ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0 md:max-h-16 md:opacity-85'
                }`}>
                  {item.description}
                  {selectedNewsId !== item.id && (
                    <span className="text-emerald-500 text-[10px] block font-mono tracking-wider mt-1 hover:underline">
                      READ FULL ARTICLE →
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Studio Quote Accent */}
          <div className="bg-[#06181d] border-l-4 border-emerald-500 p-5 mt-4">
            <Quote className="w-6 h-6 text-emerald-500/50 mb-2" />
            <p className="text-xs italic text-gray-300 leading-relaxed font-serif">
              "We took original saxophone arrangements tracked in an empty wooden cathedral and fused them directly into a 92-BPM classic groove. It creates a space where history breathes through modern steel plates."
            </p>
            <span className="text-[10px] font-mono text-emerald-400 block mt-2 tracking-widest">
              — BILLOSONGS SOUND JOURNAL
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
