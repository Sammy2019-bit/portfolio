import React, { useState } from 'react';
import { EXPERIENCES_DATA } from '../data/developerData';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Calendar, Star, Building2 } from 'lucide-react';

export const ExperienceConsole: React.FC = () => {
  const [activeId, setActiveId] = useState(EXPERIENCES_DATA[0].id);

  const selectedExp = EXPERIENCES_DATA.find(e => e.id === activeId) || EXPERIENCES_DATA[0];

  return (
    <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-6 rounded-2xl flex flex-col gap-5" id="experience-console">
      {/* Header */}
      <div>
        <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-amber-500" />
          <span>Professional Background</span>
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">Click through past roles to inspect milestones, technical leadership, and outcomes.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-5">
        {/* Navigation/Selector */}
        <div className="flex md:flex-col gap-1.5 overflow-x-auto md:overflow-visible pb-2 md:pb-0 shrink-0 md:w-44">
          {EXPERIENCES_DATA.map((exp) => (
            <button
              key={exp.id}
              id={`exp-tab-${exp.id}`}
              onClick={() => setActiveId(exp.id)}
              className={`flex items-center gap-2.5 text-left px-3 py-2.5 rounded-xl text-xs font-medium font-mono border transition duration-200 whitespace-nowrap md:whitespace-normal ${
                activeId === exp.id
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                  : 'bg-slate-950/20 border-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-950/50'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 shrink-0" />
              <div className="flex flex-col">
                <span className="font-semibold text-xs leading-none">{exp.company}</span>
                <span className="text-[9px] text-slate-500 mt-1 leading-none">{exp.period}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Console Details Panel */}
        <div className="flex-1 bg-slate-950/40 border border-slate-800/50 p-5 rounded-xl min-h-[190px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedExp.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col gap-3"
            >
              <div>
                <h4 className="text-sm font-bold text-white tracking-tight">{selectedExp.role}</h4>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400 font-mono">
                  <span className="text-amber-500 font-medium">{selectedExp.company}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    {selectedExp.period}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed italic border-l-2 border-slate-800 pl-3">
                {selectedExp.description}
              </p>

              {/* Achievements list */}
              <div className="flex flex-col gap-2 mt-1">
                {selectedExp.achievements.map((point, index) => (
                  <div key={index} className="flex items-start gap-2.5 text-xs text-slate-400 leading-relaxed">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500/10 shrink-0 mt-0.5" />
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
