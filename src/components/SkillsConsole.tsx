import React, { useState } from 'react';
import { SKILLS_DATA } from '../data/developerData';
import { motion } from 'motion/react';
import { 
  Code2, 
  Server, 
  Terminal, 
  Cpu, 
  Layers, 
  Layout, 
  Network, 
  Palette, 
  Database, 
  Cloud, 
  GitBranch, 
  Sparkles,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

export const SkillsConsole: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'languages' | 'frameworks' | 'tools'>('all');
  const [viewMetric, setViewMetric] = useState<'mastery' | 'experience'>('mastery');

  // Map icon names to lucide react icons
  const iconMap: Record<string, React.ReactNode> = {
    "code-2": <Code2 className="w-4 h-4 text-amber-500" />,
    "server": <Server className="w-4 h-4 text-amber-500" />,
    "terminal": <Terminal className="w-4 h-4 text-amber-500" />,
    "cpu": <Cpu className="w-4 h-4 text-amber-500" />,
    "layers": <Layers className="w-4 h-4 text-amber-500" />,
    "layout": <Layout className="w-4 h-4 text-amber-500" />,
    "network": <Network className="w-4 h-4 text-amber-500" />,
    "palette": <Palette className="w-4 h-4 text-amber-500" />,
    "database": <Database className="w-4 h-4 text-amber-500" />,
    "cloud": <Cloud className="w-4 h-4 text-amber-500" />,
    "git-branch": <GitBranch className="w-4 h-4 text-amber-500" />,
    "sparkles": <Sparkles className="w-4 h-4 text-amber-500" />
  };

  const filteredSkills = SKILLS_DATA.filter(skill => {
    if (activeCategory === 'all') return true;
    return skill.category === activeCategory;
  });

  return (
    <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-6 rounded-2xl flex flex-col gap-5" id="skills-console">
      {/* Console Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <Cpu className="w-4 h-4 text-amber-500" />
            <span>Interactive Tech Stack</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Toggle filter categories or customize metric calculations.</p>
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
            <ToggleRight className="w-4 h-4 text-amber-500" />
          )}
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-slate-950/60 border border-slate-800/80 rounded-xl max-w-max">
        {(['all', 'languages', 'frameworks', 'tools'] as const).map((cat) => (
          <button
            key={cat}
            id={`skill-cat-${cat}`}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 text-xs font-mono rounded-lg capitalize transition duration-200 ${
              activeCategory === cat
                ? 'bg-slate-800 text-white font-medium border border-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {cat === 'tools' ? 'Tools & DBs' : cat}
          </button>
        ))}
      </div>

      {/* Skills Progress Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredSkills.map((skill, index) => {
          // Dynamic calculation of experience based on mastery level for realism
          const yearsOfExp = Math.round((skill.level / 15) * 10) / 10;
          const displayVal = viewMetric === 'mastery' 
            ? `${skill.level}%` 
            : `${yearsOfExp} yrs`;

          return (
            <div 
              key={skill.name} 
              className="bg-slate-950/30 border border-slate-800/40 p-3.5 rounded-xl flex flex-col gap-2.5 hover:border-slate-800/80 transition duration-200"
              id={`skill-item-${index}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="bg-slate-900 border border-slate-800 p-1.5 rounded-lg">
                    {iconMap[skill.iconName] || <Code2 className="w-4 h-4 text-amber-500" />}
                  </div>
                  <span className="text-xs font-semibold text-slate-200">{skill.name}</span>
                </div>
                <span className="text-xs font-mono text-amber-400 font-medium bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  {displayVal}
                </span>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
