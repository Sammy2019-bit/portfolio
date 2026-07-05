import React, { useState } from 'react';
import { GIG_MILESTONES_DATA } from '../data/artistData';
import { motion, AnimatePresence } from 'motion/react';
import { Headphones, Calendar, Sparkles, Building, MapPin } from 'lucide-react';

export const ArtistMilestones: React.FC = () => {
  const [activeId, setActiveId] = useState(GIG_MILESTONES_DATA[0].id);

  const selectedGig = GIG_MILESTONES_DATA.find(g => g.id === activeId) || GIG_MILESTONES_DATA[0];

  return (
    <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-6 rounded-2xl flex flex-col gap-5" id="artist-milestones">
      {/* Header */}
      <div>
        <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
          <Headphones className="w-4 h-4 text-violet-400" />
          <span>Performance & Tour History</span>
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">Explore selected hardware live-sets, panel sessions, and modular club bookings.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-5">
        {/* Navigation/Selector */}
        <div className="flex md:flex-col gap-1.5 overflow-x-auto md:overflow-visible pb-2 md:pb-0 shrink-0 md:w-44">
          {GIG_MILESTONES_DATA.map((gig) => (
            <button
              key={gig.id}
              id={`gig-tab-${gig.id}`}
              onClick={() => setActiveId(gig.id)}
              className={`flex items-center gap-2.5 text-left px-3 py-2.5 rounded-xl text-xs font-medium font-mono border transition duration-200 whitespace-nowrap md:whitespace-normal ${
                activeId === gig.id
                  ? 'bg-violet-500/10 border-violet-500/40 text-violet-400'
                  : 'bg-slate-950/20 border-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-950/50'
              }`}
            >
              <Building className="w-3.5 h-3.5 shrink-0" />
              <div className="flex flex-col">
                <span className="font-semibold text-xs leading-none">{gig.venue}</span>
                <span className="text-[9px] text-slate-500 mt-1 leading-none">{gig.date}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Milestone Detail Box */}
        <div className="flex-1 bg-slate-950/40 border border-slate-800/50 p-5 rounded-xl min-h-[190px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedGig.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col gap-3"
            >
              <div>
                <h4 className="text-sm font-bold text-white tracking-tight">{selectedGig.role}</h4>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400 font-mono">
                  <span className="text-violet-400 font-medium">{selectedGig.venue}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    {selectedGig.city}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    {selectedGig.date}
                  </span>
                </div>
              </div>

              {/* Achievements bullet list */}
              <div className="flex flex-col gap-2 mt-2">
                {selectedGig.highlights.map((point, index) => (
                  <div key={index} className="flex items-start gap-2.5 text-xs text-slate-400 leading-relaxed">
                    <Sparkles className="w-3.5 h-3.5 text-violet-400 fill-violet-400/10 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
