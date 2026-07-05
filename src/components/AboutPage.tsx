import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Cpu, Radio, Award, Compass, Music, Sliders, ChevronRight } from 'lucide-react';

interface GearItem {
  name: string;
  category: 'synthesizer' | 'module' | 'processor' | 'utility';
  description: string;
  specs: string;
}

const STUDIO_GEAR: GearItem[] = [
  {
    name: "Make Noise Shared System",
    category: "synthesizer",
    description: "An iconic custom Eurorack system focusing on West Coast synthesis techniques. Used for generating unpredictable microtonal arpeggios.",
    specs: "Analog oscillators, Maths envelope, René sequencer"
  },
  {
    name: "Mutable Instruments Clouds",
    category: "module",
    description: "Granular audio texture processor. Fades incoming live instrument audio into vast, shimmering reverb-like micro-clouds.",
    specs: "32-bit audio buffer, pitch shifting, density grids"
  },
  {
    name: "Moog Mother-32",
    category: "synthesizer",
    description: "Classic analog semi-modular synthesizer with a legendary 4-pole low-pass ladder filter. Powers the heavy sub-basslines in live club tracks.",
    specs: "Single VCO, noise generator, 32-point patchbay"
  },
  {
    name: "Erica Synths Zen Delay",
    category: "processor",
    description: "A hardware tube-delay unit built in collaboration with Liquid Sky Berlin. Adds warm, gritty tape style delays and high-resonance tube warmth.",
    specs: "Stereo 24-bit delay, vintage analog tube overdrive filter"
  },
  {
    name: "Strymon NightSky",
    category: "processor",
    description: "Time-warped reverberator and pitch sequencer. Elevates basic synthetic signals into massive spatial rooms.",
    specs: "Midi synced pitch, core DSP core, dual-mode filter"
  }
];

export const AboutPage: React.FC = () => {
  const [selectedGear, setSelectedGear] = useState<GearItem | null>(STUDIO_GEAR[0]);
  const [copiedPress, setCopiedPress] = useState(false);

  const handleCopyPressInfo = () => {
    navigator.clipboard.writeText("RIVER_GLOW / Alex River Press Kit - 2026. Official electronic press materials, hi-res visual logos, and licensing catalogs.");
    setCopiedPress(true);
    setTimeout(() => setCopiedPress(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8 text-left" id="about-page-view">
      {/* Bio Summary Hero */}
      <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row gap-6 items-center">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border border-violet-500/30 shrink-0 relative">
          <img 
            src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400&h=400" 
            alt="Alex River" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-violet-500/10 mix-blend-color-add" />
        </div>

        <div className="flex-1 flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-mono font-bold tracking-widest text-violet-400 uppercase bg-violet-500/10 px-2.5 py-1 rounded-lg border border-violet-500/20">
              ARTIST DOSSIER
            </span>
            <span className="text-xs font-mono text-slate-500">
              EST. 2018 / BERLIN-BASED
            </span>
          </div>

          <h2 className="text-2xl font-bold text-white tracking-tight">Alex River / RIVER_GLOW</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Pioneering a deep synthesis between human intuition and analog hardware loops. Fusing the raw mechanical warmth of Eurorack modules with dark, peak-time melodic techno arpeggios, Alex River designs immersive sonic landscapes that transcend standard electronic music boundaries.
          </p>
        </div>
      </div>

      {/* Philosophy & Aesthetic Statement Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-950/40 border border-slate-800/60 p-5 rounded-2xl flex flex-col gap-3">
          <div className="bg-violet-500/10 border border-violet-500/20 p-2 rounded-xl text-violet-400 w-max">
            <Radio className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-white">Generative Patching</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Believing in generative compositions where voltages are set free to modulate themselves, creating unique micro-variations during live performances so no two gigs sound identical.
          </p>
        </div>

        <div className="bg-slate-950/40 border border-slate-800/60 p-5 rounded-2xl flex flex-col gap-3">
          <div className="bg-violet-500/10 border border-violet-500/20 p-2 rounded-xl text-violet-400 w-max">
            <Compass className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-white">Telemetry & Space</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Sound concepts are influenced by electromagnetic radiation recordings, pulsars, and telescope telemetry, translating astronomical telemetry frequencies into musical rhythms.
          </p>
        </div>

        <div className="bg-slate-950/40 border border-slate-800/60 p-5 rounded-2xl flex flex-col gap-3">
          <div className="bg-violet-500/10 border border-violet-500/20 p-2 rounded-xl text-violet-400 w-max">
            <Award className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-white">Improvisational Focus</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Rejecting pre-sequenced laptop stems on stage. Every synthesizer modulation, filter sweep, and drum pattern is manipulated live in response to the acoustic feedback of the dancefloor.
          </p>
        </div>
      </div>

      {/* Interactive Rig Showcase & Hardware Rack */}
      <div className="bg-slate-900/30 border border-slate-800 p-6 rounded-3xl flex flex-col gap-5">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <Cpu className="w-4 h-4 text-violet-400" />
            <span>Studio Hardware Rig & Modules</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Explore the physical gear that shapes the RIVER_GLOW sound signature. Click any unit to read schematic specifications.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Gear Selection Column */}
          <div className="lg:col-span-5 flex flex-col gap-1.5">
            {STUDIO_GEAR.map((gear) => (
              <button
                key={gear.name}
                id={`btn-gear-select-${gear.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setSelectedGear(gear)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-mono transition duration-200 text-left border ${
                  selectedGear?.name === gear.name
                    ? 'bg-violet-500/10 border-violet-500/40 text-violet-400'
                    : 'bg-slate-950/30 border-slate-800/50 text-slate-400 hover:text-slate-200 hover:bg-slate-950/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Sliders className="w-3.5 h-3.5 shrink-0" />
                  <span className="font-semibold">{gear.name}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            ))}
          </div>

          {/* Interactive Specification Viewport */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 p-5 rounded-2xl min-h-[160px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {selectedGear ? (
                <motion.div
                  key={selectedGear.name}
                  initial={{ opacity: 0, x: 5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -5 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col gap-4"
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold text-violet-400 bg-violet-500/5 border border-violet-500/10 px-2 py-0.5 rounded uppercase">
                      {selectedGear.category}
                    </span>
                    <h4 className="text-base font-bold text-white mt-2.5 tracking-tight">{selectedGear.name}</h4>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedGear.description}
                  </p>

                  <div className="bg-slate-900 border border-slate-800/80 rounded-xl px-3.5 py-2.5 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Core Architecture:</span>
                    <span className="text-[11px] font-mono text-slate-300 font-medium">{selectedGear.specs}</span>
                  </div>
                </motion.div>
              ) : (
                <div className="text-xs text-slate-500 flex items-center justify-center h-full">
                  Select a synthesizer or audio signal processor to view specifications.
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* EPK Press Kit Showcase */}
      <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-violet-500/10 border border-violet-500/30 p-2.5 rounded-xl text-violet-400">
            <Music className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-mono text-violet-400 font-semibold uppercase leading-none">Electronic Press Kit (EPK)</h4>
            <h3 className="text-sm font-bold text-white mt-1.5">Download Promo Material & Bio Sheets</h3>
            <p className="text-xs text-slate-400 mt-1">Includes high-res promotional imagery, logo assets, sound-riders, and bio sheets.</p>
          </div>
        </div>

        <button
          id="btn-copy-press-kit"
          onClick={handleCopyPressInfo}
          className="bg-violet-500 hover:bg-violet-400 text-slate-100 px-4 py-2 rounded-xl text-xs font-semibold transition duration-200 flex items-center gap-2 whitespace-nowrap shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{copiedPress ? 'Copied Details!' : 'Download Promo Pack'}</span>
        </button>
      </div>
    </div>
  );
};
