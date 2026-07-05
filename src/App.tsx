import { useState } from 'react';
import { ProfileCard } from './components/ProfileCard';
import { ProjectShowcase } from './components/ProjectShowcase';
import { SkillsConsole } from './components/SkillsConsole';
import { ExperienceConsole } from './components/ExperienceConsole';
import { InteractiveContact } from './components/InteractiveContact';
import { Terminal, Code2, Sparkles, Check } from 'lucide-react';

export default function App() {
  const [selectedService, setSelectedService] = useState('');

  const handleSelectService = (serviceName: string) => {
    setSelectedService(serviceName);
    
    // Smoothly scroll the estimator into view for exceptional user experience
    const targetElement = document.getElementById('interactive-contact-console');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleClearService = () => {
    setSelectedService('');
  };

  return (
    <div className="min-h-screen bg-[#070b13] text-slate-100 selection:bg-amber-500/20 selection:text-amber-400 relative overflow-x-hidden font-sans">
      {/* Decorative ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[50%] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[60%] bg-indigo-500/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col gap-8 relative z-10" id="main-portfolio-dashboard">
        {/* Terminal Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between border border-slate-800 bg-slate-900/40 backdrop-blur-md px-5 py-3.5 rounded-2xl gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500/10 border border-amber-500/30 p-2 rounded-xl text-amber-500 animate-pulse">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-slate-500 font-semibold uppercase tracking-wider leading-none">Developer Studio Console</div>
              <h1 className="text-sm font-bold text-slate-200 mt-1">alexrivera_workspace_v1.2.0</h1>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
              <Code2 className="w-3.5 h-3.5 text-amber-500" />
              <span>React 19 + TypeScript</span>
            </span>
            <span className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Tailwind v4</span>
            </span>
          </div>
        </header>

        {/* Bento Grid Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (Sticky profile context on desktop) */}
          <div className="lg:col-span-4 lg:sticky lg:top-8 flex flex-col gap-6">
            <ProfileCard onSelectService={handleSelectService} />
          </div>

          {/* Right Column (Dynamic content panels) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Interactive Showcase */}
            <section className="bg-slate-900/20 border border-slate-800/60 p-6 rounded-3xl" id="section-gallery">
              <ProjectShowcase />
            </section>

            {/* Experience timeline */}
            <section id="section-experience">
              <ExperienceConsole />
            </section>

            {/* Tech stack */}
            <section id="section-skills">
              <SkillsConsole />
            </section>

            {/* Price Estimator & Contact */}
            <section id="section-estimate">
              <InteractiveContact 
                selectedService={selectedService} 
                onClearService={handleClearService} 
              />
            </section>
          </div>
        </div>

        {/* Simple Footer */}
        <footer className="border-t border-slate-900 mt-8 pt-6 pb-2 text-center text-xs font-mono text-slate-600">
          <p>© 2026 Alex Rivera. All rights reserved. • Single-Screen Developer Portfolio</p>
        </footer>
      </main>
    </div>
  );
}
