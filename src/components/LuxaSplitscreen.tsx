import React, { useState } from 'react';
import { Layout, ArrowLeftRight, ToggleLeft, ToggleRight, Sparkles, Sliders, Volume2 } from 'lucide-react';

export const LuxaSplitscreen: React.FC = () => {
  const [activeSide, setActiveSide] = useState<'left' | 'right' | 'equal'>('equal');

  return (
    <div className="text-left font-serif text-slate-100 flex flex-col gap-10" id="luxa-splitscreen-concept">
      
      {/* Splitscreen Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-900 pb-4">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#e5c158]">SPATIAL PANNING AUDITS</span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
            Acoustic Symmetry & <span className="text-amber-400 font-medium italic">Spatial Audio Balance</span>
          </h2>
        </div>

        {/* Symmetry adjusters */}
        <div className="flex bg-slate-950 border border-slate-900 p-1 rounded-xl">
          {(['left', 'equal', 'right'] as const).map((side) => (
            <button
              key={side}
              id={`btn-splitscreen-${side}`}
              onClick={() => setActiveSide(side)}
              className={`px-3 py-1 text-[9px] font-mono uppercase rounded-lg transition duration-150 ${
                activeSide === side ? 'bg-[#e5c158] text-black font-bold' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {side === 'left' ? 'Left' : side === 'right' ? 'Right' : 'Equal'}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-slate-400 font-sans max-w-xl leading-relaxed">
        Spatial audio splits auditory weight dynamically. Test the symmetric channel balances by clicking the panning tabs above to focus frequencies.
      </p>

      {/* Main Splitscreen Container */}
      <div className="grid grid-cols-12 gap-4 items-stretch min-h-[300px]">
        
        {/* Left Pane */}
        <div 
          className={`bg-gradient-to-br from-[#12110e] to-black border border-slate-900 rounded-2xl p-5 flex flex-col justify-between transition-all duration-500 ${
            activeSide === 'left' 
              ? 'col-span-12 md:col-span-8' 
              : activeSide === 'right' 
              ? 'col-span-12 md:col-span-4' 
              : 'col-span-12 md:col-span-6'
          }`}
        >
          <div>
            <span className="text-[9px] font-mono text-[#e5c158] uppercase">Left Auditory Channel</span>
            <h3 className="text-lg font-bold text-white mt-2">Sub-Bass & Drum Weight</h3>
            <p className="text-xs text-slate-400 font-sans mt-2 leading-relaxed">
              Anchors the primary physical rhythm. This channel hosts the heavy kick drum transient, deep sub-bass glides, and fundamental snare center frequencies. Keeping these focused stabilizes stream playbacks.
            </p>
          </div>

          <div className="bg-black/40 border border-slate-900/60 p-3 rounded-xl mt-4">
            <span className="text-[9px] font-mono text-slate-500 uppercase block">PANNING INTENSITY RATIO</span>
            <span className="text-xs font-mono text-amber-300 mt-1 block">
              {activeSide === 'left' ? '70% L / 30% R (Left Dominant Weight)' : activeSide === 'right' ? '30% L / 70% R (Right Dominant Drift)' : '50% L / 50% R (Balanced Center Core)'}
            </span>
          </div>
        </div>

        {/* Right Pane */}
        <div 
          className={`bg-[#0b0c10] border border-slate-900 rounded-2xl p-5 flex flex-col justify-between transition-all duration-500 ${
            activeSide === 'right' 
              ? 'col-span-12 md:col-span-8' 
              : activeSide === 'left' 
              ? 'col-span-12 md:col-span-4' 
              : 'col-span-12 md:col-span-6'
          }`}
        >
          <div>
            <span className="text-[9px] font-mono text-[#e5c158] uppercase">Right Auditory Channel</span>
            <h3 className="text-lg font-bold text-white mt-2">Melodic Leads & Air Highs</h3>
            <p className="text-xs text-slate-400 font-sans mt-2 leading-relaxed">
              Handles secondary ambient synth pads, vocal delay lines, hi-hat pan clusters, and high-frequency acoustic reflections. Panning elements here opens up wide spatial depth.
            </p>
          </div>

          <div className="flex flex-col gap-2 mt-4 font-sans">
            <div className="flex justify-between items-center bg-black/60 border border-slate-950 p-2.5 rounded-xl text-[10px] font-mono text-slate-400">
              <span>ACTIVE AUDIO CODES</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Volume2 className="w-3 h-3" />
                <span>STEREO OK</span>
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
