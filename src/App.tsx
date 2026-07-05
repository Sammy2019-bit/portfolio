import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProfileCard } from './components/ProfileCard';
import { ReleaseShowcase } from './components/ReleaseShowcase';
import { AudioSkills } from './components/AudioSkills';
import { ArtistMilestones } from './components/ArtistMilestones';
import { AboutPage } from './components/AboutPage';
import { DownloadPage } from './components/DownloadPage';
import { SupportPage } from './components/SupportPage';
import { ContactPage } from './components/ContactPage';
import { LoginPage } from './components/LoginPage';
import { Music, Sparkles, Disc, Waves, Info, Download, HelpCircle, Mail, Key } from 'lucide-react';

type TabType = 'discography' | 'about' | 'downloads' | 'support' | 'contact' | 'login';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('discography');
  const [selectedService, setSelectedService] = useState('');

  const handleSelectService = (serviceName: string) => {
    setSelectedService(serviceName);
    setCurrentTab('contact');
    
    // Smoothly scroll the estimator into view for exceptional user experience
    setTimeout(() => {
      const targetElement = document.getElementById('booking-estimator-console');
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleClearService = () => {
    setSelectedService('');
  };

  // Helper to render the active tab content with sleek enter/exit animations
  const renderTabContent = () => {
    switch (currentTab) {
      case 'discography':
        return (
          <motion.div
            key="discography"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-8"
          >
            {/* Releases Gallery with Player */}
            <section className="bg-slate-900/20 border border-slate-800/60 p-6 rounded-3xl" id="section-releases">
              <ReleaseShowcase />
            </section>

            {/* Performance/Gig Milestones */}
            <section id="section-tour-dates">
              <ArtistMilestones />
            </section>

            {/* Tech Stack / Synthesizers */}
            <section id="section-modular-rig">
              <AudioSkills />
            </section>
          </motion.div>
        );
      case 'about':
        return (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            <AboutPage />
          </motion.div>
        );
      case 'downloads':
        return (
          <motion.div
            key="downloads"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            <DownloadPage />
          </motion.div>
        );
      case 'support':
        return (
          <motion.div
            key="support"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            <SupportPage />
          </motion.div>
        );
      case 'contact':
        return (
          <motion.div
            key="contact"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            <ContactPage 
              selectedService={selectedService} 
              onClearService={handleClearService} 
            />
          </motion.div>
        );
      case 'login':
        return (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            <LoginPage />
          </motion.div>
        );
      default:
        return null;
    }
  };

  const tabsConfig: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'discography', label: 'Discography', icon: <Disc className="w-3.5 h-3.5" /> },
    { id: 'about', label: 'About Gear', icon: <Info className="w-3.5 h-3.5" /> },
    { id: 'downloads', label: 'Downloads', icon: <Download className="w-3.5 h-3.5" /> },
    { id: 'support', label: 'Support FAQ', icon: <HelpCircle className="w-3.5 h-3.5" /> },
    { id: 'contact', label: 'Contact representation', icon: <Mail className="w-3.5 h-3.5" /> },
    { id: 'login', label: 'VIP Sound Sandbox', icon: <Key className="w-3.5 h-3.5" /> }
  ];

  return (
    <div className="min-h-screen bg-[#07080e] text-slate-100 selection:bg-violet-500/20 selection:text-violet-400 relative overflow-x-hidden font-sans">
      {/* Dynamic atmospheric radial background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[50%] bg-violet-600/5 blur-[120px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[60%] bg-indigo-500/5 blur-[150px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: '12s' }} />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col gap-6 relative z-10" id="main-artist-dashboard">
        
        {/* Modern Studio Control Console Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between border border-slate-800/80 bg-slate-900/40 backdrop-blur-md px-5 py-3.5 rounded-2xl gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-violet-500/10 border border-violet-500/30 p-2 rounded-xl text-violet-400">
              <Waves className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-500 font-semibold uppercase tracking-widest leading-none">Audio Studio Hub</div>
              <h1 className="text-xs font-bold text-slate-300 mt-1 font-mono">riverglow_synth_console_v2.5</h1>
            </div>
          </div>

          {/* Core Technical Badges */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800/60">
              <Music className="w-3.5 h-3.5 text-violet-400" />
              <span>Stereo & Spatial Live Out</span>
            </span>
            <span className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800/60">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>48kHz Studio Master</span>
            </span>
          </div>
        </header>

        {/* Synthesizer Rack Style Navigation Controls */}
        <nav className="bg-slate-950/80 border border-slate-800/80 p-1.5 rounded-2xl flex flex-wrap gap-1 items-center" id="studio-console-navbar">
          {tabsConfig.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav-tab-${tab.id}`}
                onClick={() => setCurrentTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-medium transition duration-200 capitalize relative ${
                  isActive 
                    ? 'text-white bg-slate-900 border border-slate-800/80' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
                }`}
              >
                {/* Active Neon State LED Dot Indicator */}
                {isActive && (
                  <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-violet-400 shadow-lg shadow-violet-500 animate-pulse" />
                )}
                <span className={isActive ? 'pl-1' : ''}>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bento Grid Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (Sticky artist bio details) */}
          <div className="lg:col-span-4 lg:sticky lg:top-8 flex flex-col gap-6">
            <ProfileCard onSelectService={handleSelectService} />
          </div>

          {/* Right Column (Dynamic switchable pages) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <div className="bg-slate-900/20 border border-slate-800/40 p-6 rounded-3xl" id="tab-content-container">
                {renderTabContent()}
              </div>
            </AnimatePresence>
          </div>
        </div>

        {/* Simple Footer */}
        <footer className="border-t border-slate-900 mt-8 pt-6 pb-2 text-center text-xs font-mono text-slate-600">
          <p>© 2026 Alex River / RIVER_GLOW. Mastered with Analog Warmth • Synthesizer Studio Hub Portfolio</p>
        </footer>
      </main>
    </div>
  );
}
