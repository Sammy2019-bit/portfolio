import React, { useState } from 'react';
import { ARTIST_SKILLS_DATA } from '../data/artistData';
import { motion } from 'motion/react';
import { 
  Cpu, 
  Sliders, 
  Mic, 
  Music, 
  Layers, 
  Disc, 
  Activity, 
  Cable, 
  Sparkles, 
  Headphones, 
  Tv,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

export const AudioSkills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'production' | 'performance' | 'engineering'>('all');
  const [viewMetric, setViewMetric] = useState<'mastery' | 'experience'>('mastery');

  // Map icon names to lucide react icons
  const iconMap: Record<string, React.ReactNode> = {
    "cpu": <Cpu className="w-4 h-4 text-violet-400" />,
    "sliders": <Sliders className="w-4 h-4 text-violet-400" />,
    "mic": <Mic className="w-4 h-4 text-violet-400" />,
    "music": <Music className="w-4 h-4 text-violet-400" />,
    "layers": <Layers className="w-4 h-4 text-violet-400" />,
    "disc": <Disc className="w-4 h-4 text-violet-400" />,
    "activity": <Activity className="w-4 h-4 text-violet-400" />,
    "cable": <Cable className="w-4 h-4 text-violet-400" />,
    "sparkles": <Sparkles className="w-4 h-4 text-violet-400" />,
    "headphones": <Headphones className="w-4 h-4 text-violet-400" />,
    "tv": <Tv className="w-4 h-4 text-violet-400" />
  };

  const filteredSkills = ARTIST_SKILLS_DATA.filter(skill => {
    if (activeCategory === 'all') return true;
    return skill.category === activeCategory;
  });

  return (
    <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-6 rounded-2xl flex flex-col gap-5" id="audio-skills-console">
      {/* Console Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <Sliders className="w-4 h-4 text-violet-400" />
            <span>Interactive Production Rig & Tech</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Toggle categories to explore software protocols and live hardware fluencies.</p>
        </div>

        {/* View Metric Toggler */}
        <button
          id="btn-toggle-skill-metric"
          onClick={() => setViewMetric(viewMetric === 'mastery' ? 'experience' : 'mastery')}
          className="flex items-center gap-2 bg-slate-950/60 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-300 hover:bg-slate-950 hover:text-white transition duration-200 self-start sm:self-auto"
        >
          <span>Show {viewMetric === 'mastery' ? 'Experience (Yrs)' : 'Proficiency (%)'}</span>
          {viewMetric === 'mastery' ? (
            <ToggleLeft className="w-4 h-4 text-slate-500" />
          ) : (
            <ToggleRight className="w-4 h-4 text-violet-500" />
          )}
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-slate-950/60 border border-slate-800/80 rounded-xl max-w-max">
        {(['all', 'production', 'engineering', 'performance'] as const).map((cat) => (
          <button
            key={cat}
            id={`skill-cat-${cat}`}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 text-xs font-mono rounded-lg capitalize transition duration-200 ${
              activeCategory === cat
                ? 'bg-slate-850 text-white font-medium border border-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {cat === 'all' ? 'All Skills' : cat}
          </button>
        ))}
      </div>

      {/* Skills Progress Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredSkills.map((skill, index) => {
          // Dynamic calculation of experience based on mastery level for realism
          const yearsOfExp = Math.round((skill.level / 12) * 10) / 10;
          const displayVal = viewMetric === 'mastery' 
            ? `${skill.level}%` 
            : `${yearsOfExp} yrs`;

          return (
            <div 
              key={skill.name} 
              className="bg-slate-950/30 border border-slate-800/40 p-3.5 rounded-xl flex flex-col gap-2.5 hover:border-slate-800/85 transition duration-200"
              id={`skill-item-${index}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="bg-slate-900 border border-slate-800 p-1.5 rounded-lg">
                    {iconMap[skill.iconName] || <Music className="w-4 h-4 text-violet-400" />}
                  </div>
                  <span className="text-xs font-semibold text-slate-200">{skill.name}</span>
                </div>
                <span className="text-xs font-mono text-violet-400 font-medium bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  {displayVal}
                </span>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-violet-500 to-indigo-400 rounded-full"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
