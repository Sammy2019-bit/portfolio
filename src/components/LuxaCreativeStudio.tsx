import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Music, Sliders, Volume2, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { AGENCY_SERVICES } from '../data/luxaTemplates';

export const LuxaCreativeStudio: React.FC = () => {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const mockProjects = [
    {
      title: 'Golden Reverie (Official Beat)',
      client: 'Paris Fashion Showcase',
      desc: 'High-contrast trap rhythm arrangement synchronized with a couture luxury digital show. Crafted with custom-carved sub-bass.',
      img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
      stats: '2.4M Streams'
    },
    {
      title: 'Vapor Shadows (Soundtrack)',
      client: 'Independent Film Score',
      desc: 'Dark wave synthesized soundscape leveraging vintage analog oscillators, providing immersive acoustic tension and raw cinematic energy.',
      img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
      stats: '18K Downloads'
    },
    {
      title: 'Couture Trap No. 5',
      client: 'Sartorial Records',
      desc: 'Fast-paced luxury rap beat featuring intricate hi-hat clusters, deep 808 glides, custom vinyl texture presets, and custom flute leads.',
      img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
      stats: '920K Plays'
    }
  ];

  return (
    <div className="text-left font-serif text-slate-100 flex flex-col gap-12" id="luxa-creative-studio">
      
      {/* Intro Header */}
      <div className="border-l border-amber-400/50 pl-4 py-1">
        <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400/80">ARTIST PROFILE</span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
          Platinum Audio & Bespoke Rhythms by <span className="text-[#e5c158] font-semibold italic">billosongs</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-sans max-w-xl mt-3 leading-relaxed">
          I sculpt auditory landscapes. Operating at the intersection of dark trap beats, luxurious synth waves, and cinematic soundtracks. Each beat is crafted to give your voice maximum space and presence.
        </p>
      </div>

      {/* Interactive Core Capabilities */}
      <div>
        <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-6">PRODUCTION FOCUS</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {AGENCY_SERVICES.map((serv) => {
            const isSelected = selectedService === serv.id;
            return (
              <div
                key={serv.id}
                id={`cs-service-${serv.id}`}
                onClick={() => setSelectedService(isSelected ? null : serv.id)}
                className={`group border p-5 rounded-xl cursor-pointer transition duration-350 text-left flex flex-col justify-between min-h-[180px] ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#1b1915] to-[#0d0c0a] border-[#e5c158]'
                    : 'bg-black/40 border-slate-900 hover:border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="text-slate-400 group-hover:text-[#e5c158] transition-colors duration-300">
                      {serv.icon === 'Music' && <Music className="w-5 h-5" />}
                      {serv.icon === 'Sliders' && <Sliders className="w-5 h-5" />}
                      {serv.icon === 'Volume2' && <Volume2 className="w-5 h-5" />}
                    </div>
                    <span className="text-[10px] font-mono text-slate-600">0{serv.id === 'graphic-design' ? '1' : serv.id === 'web-design' ? '2' : '3'}</span>
                  </div>
                  <h4 className="text-sm font-sans font-bold text-slate-100 mt-4 group-hover:text-amber-300 transition-colors">
                    {serv.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 font-sans leading-relaxed">
                    {serv.description}
                  </p>
                </div>

                {isSelected && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px] font-mono text-[#e5c158] mt-3 flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Selected for service consultation briefing</span>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Featured Projects Slider */}
      <div className="bg-[#0b0c10] border border-slate-900 rounded-2xl p-4 sm:p-6 flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/2 flex flex-col justify-between gap-6">
          <div>
            <span className="text-[9px] font-mono text-[#e5c158] uppercase tracking-widest">SPOTLIGHT RELEASE</span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1 leading-snug">
              {mockProjects[activeProjectIdx].title}
            </h3>
            <span className="text-xs font-mono text-slate-500 block mt-1">
              Client/Release: {mockProjects[activeProjectIdx].client}
            </span>
            <p className="text-xs text-slate-400 font-sans mt-3 leading-relaxed">
              {mockProjects[activeProjectIdx].desc}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {/* Stat badge */}
            <div className="bg-black/60 border border-slate-900 px-3.5 py-2 rounded-xl flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Track Performance</span>
              <span className="text-xs font-mono font-bold text-amber-400">{mockProjects[activeProjectIdx].stats}</span>
            </div>

            {/* Slider navigators */}
            <div className="flex items-center gap-2">
              {mockProjects.map((_, idx) => (
                <button
                  key={idx}
                  id={`btn-cs-slider-${idx}`}
                  onClick={() => setActiveProjectIdx(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeProjectIdx ? 'w-8 bg-[#e5c158]' : 'w-2 bg-slate-800 hover:bg-slate-700'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Visual Preview Frame */}
        <div className="lg:w-1/2 relative h-52 sm:h-64 rounded-xl overflow-hidden bg-slate-950 border border-slate-900 group">
          <img
            src={mockProjects[activeProjectIdx].img}
            alt={mockProjects[activeProjectIdx].title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />
          <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1.5 border border-slate-800 rounded-lg text-[10px] font-mono text-amber-300">
            AUDIO PREVIEWING
          </div>
        </div>
      </div>

      {/* Quote Banner */}
      <div className="bg-gradient-to-r from-[#1c1a15]/30 to-[#0c0b0a]/30 border border-[#e5c158]/10 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-xs font-sans font-bold text-slate-200">Need a specialized soundscape for your next project?</h4>
          <p className="text-[11px] font-sans text-slate-400 mt-0.5">Let’s engineer custom beats or vocal mixes with professional standard-compliant loudness levels.</p>
        </div>
        <button 
          onClick={() => alert("Simulating a session inquiry with billosongs! Thank you.")}
          className="bg-[#e5c158] hover:bg-amber-400 text-black px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition duration-200 self-start sm:self-auto shadow-md shadow-amber-400/10"
        >
          <span>Commission Custom Beat</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
