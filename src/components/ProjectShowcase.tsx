import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { PROJECTS_DATA } from '../data/developerData';
import { Star, Eye, Zap, Flame, ExternalLink, X, Compass, Github } from 'lucide-react';

export const ProjectShowcase: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'frontend' | 'fullstack' | 'devops'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = PROJECTS_DATA.filter(proj => {
    if (filter === 'all') return true;
    return proj.category === filter;
  });

  return (
    <div className="flex flex-col gap-6" id="project-showcase">
      {/* Filters Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-500 animate-pulse" />
            <span>Interactive Project Gallery</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Explore real production builds. Click any card for technical breakdowns.</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap p-1 bg-slate-950/80 border border-slate-800/80 rounded-xl max-w-max">
          {(['all', 'fullstack', 'frontend', 'devops'] as const).map((cat) => (
            <button
              key={cat}
              id={`filter-tab-${cat}`}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition duration-200 capitalize ${
                filter === cat
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedProject(project)}
              className="group bg-slate-900/40 hover:bg-slate-900/70 border border-slate-800 hover:border-slate-700/80 rounded-xl overflow-hidden cursor-pointer flex flex-col h-full transition duration-300"
              id={`project-card-${project.id}`}
            >
              {/* Card Image Cover with Badge */}
              <div className="relative aspect-video overflow-hidden bg-slate-950">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                {/* Stars/Lighthouse Metrics Badges */}
                <div className="absolute bottom-3 left-3 flex gap-2">
                  {project.stats.stars && (
                    <span className="flex items-center gap-1 bg-slate-950/80 border border-slate-800 text-slate-300 px-2 py-0.5 rounded-md text-[10px] font-mono">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      {project.stats.stars} stars
                    </span>
                  )}
                  {project.stats.lighthouseScore && (
                    <span className="flex items-center gap-1 bg-slate-950/80 border border-slate-800 text-emerald-400 px-2 py-0.5 rounded-md text-[10px] font-mono">
                      <Zap className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                      {project.stats.lighthouseScore}% Performance
                    </span>
                  )}
                  {project.stats.downloads && (
                    <span className="flex items-center gap-1 bg-slate-950/80 border border-slate-800 text-cyan-400 px-2 py-0.5 rounded-md text-[10px] font-mono">
                      <Flame className="w-3 h-3 text-cyan-400" />
                      {project.stats.downloads}
                    </span>
                  )}
                </div>

                <span className="absolute top-3 right-3 text-[10px] font-mono font-semibold uppercase bg-slate-950/90 border border-slate-800/80 px-2.5 py-0.5 rounded-full text-slate-400 tracking-wider">
                  {project.category}
                </span>
              </div>

              {/* Card Contents */}
              <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold text-white text-base group-hover:text-amber-400 transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tag row */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project Detail Dialog */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto" id="project-detail-overlay">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-slate-900 border border-slate-800 max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl flex flex-col my-8 max-h-[90vh]"
              id="project-detail-modal"
            >
              {/* Cover */}
              <div className="relative aspect-video w-full">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent"></div>
                
                <button 
                  id="close-project-modal"
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 bg-slate-950/80 hover:bg-slate-950 border border-slate-800 text-slate-400 hover:text-white p-2 rounded-xl transition duration-200"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="absolute bottom-4 left-4">
                  <span className="text-[10px] font-mono font-semibold uppercase bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full tracking-wider mb-2 inline-block">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{selectedProject.title}</h3>
                </div>
              </div>

              {/* Details Content */}
              <div className="p-6 flex-1 overflow-y-auto flex flex-col gap-6 text-slate-300 text-sm">
                <div>
                  <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1.5">Executive Summary</h4>
                  <p className="leading-relaxed text-slate-300">{selectedProject.description}</p>
                </div>

                {/* Tech Highlights */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-950/50 border border-slate-800/80 p-4 rounded-xl">
                    <h5 className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Architecture Highlights</h5>
                    <ul className="text-xs text-slate-400 list-disc list-inside space-y-1">
                      <li>Optimized runtime compilation</li>
                      <li>Highly secure API validation</li>
                      <li>Automated failover proxies</li>
                    </ul>
                  </div>

                  <div className="bg-slate-950/50 border border-slate-800/80 p-4 rounded-xl">
                    <h5 className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Performance Auditing</h5>
                    <div className="flex items-center gap-3 mt-1.5">
                      {selectedProject.stats.lighthouseScore && (
                        <div>
                          <div className="text-lg font-bold text-emerald-400 font-mono">{selectedProject.stats.lighthouseScore}%</div>
                          <div className="text-[9px] uppercase text-slate-500">Lighthouse Score</div>
                        </div>
                      )}
                      {selectedProject.stats.stars && (
                        <div>
                          <div className="text-lg font-bold text-amber-400 font-mono">{selectedProject.stats.stars}</div>
                          <div className="text-[9px] uppercase text-slate-500">GitHub Stars</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Built with Technologies</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="text-xs font-mono text-slate-300 bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-lg">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer Links */}
              <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  id="btn-modal-demo"
                  onClick={() => alert(`Simulating external redirection to ${selectedProject.title} Live Demo...`)}
                  className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-4 py-2 rounded-xl transition duration-200"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Launch Live App</span>
                </button>
                <button
                  id="btn-modal-repo"
                  onClick={() => alert(`Simulating GitHub code repository opening...`)}
                  className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold px-4 py-2 rounded-xl transition duration-200"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>View Source</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
