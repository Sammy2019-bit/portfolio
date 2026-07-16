import React, { useState } from 'react';
import { Award, Zap, Flame, Trophy, Sliders, ChevronRight, Music, Radio, Disc } from 'lucide-react';

export const LuxaDesignAgency: React.FC = () => {
  const [scale, setScale] = useState(65); // Mastering target index (-16 to -6 LUFS)

  // Calculate simulated parameters
  const lufs = -16 + Math.round((scale / 100) * 10);
  const headroomDb = (-(1.0 - (scale / 100) * 0.9)).toFixed(1);
  const dynamicRange = (14 - (scale / 100) * 8).toFixed(1);
  const recommendedFor = lufs < -12 ? 'Ambient / Folk streaming standard' : lufs < -9 ? 'Modern Spotify & Apple Music standards' : 'Club, DJ Rig & Loudness War Champion';

  return (
    <div className="text-left font-serif text-slate-100 flex flex-col gap-10" id="luxa-design-agency">
      
      {/* Editorial Header */}
      <div>
        <span className="text-[10px] uppercase font-mono tracking-widest text-[#e5c158]">STREAMING STANDARDS</span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1 leading-snug">
          We believe that premium audio creates <span className="text-amber-400 font-medium italic">shared emotional value</span> for fans
        </h2>
        <div className="h-px bg-gradient-to-r from-[#e5c158]/50 via-slate-800 to-transparent my-4" />
      </div>

      {/* Two column metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left: Custom Value Cards */}
        <div className="flex flex-col gap-4">
          <div className="bg-black/40 border border-slate-900 p-4 rounded-xl flex items-start gap-4">
            <div className="bg-[#e5c158]/10 border border-[#e5c158]/20 p-2 rounded-lg text-[#e5c158] shrink-0">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-sans font-bold text-slate-200">Melodic Intention</h4>
              <p className="text-xs text-slate-400 font-sans mt-1 leading-relaxed">
                Soundscapes connect on an emotional level. billosongs integrates vintage synths with hand-played acoustic chord structures.
              </p>
            </div>
          </div>

          <div className="bg-black/40 border border-slate-900 p-4 rounded-xl flex items-start gap-4">
            <div className="bg-[#e5c158]/10 border border-[#e5c158]/20 p-2 rounded-lg text-[#e5c158] shrink-0">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-sans font-bold text-slate-200 font-serif">Rhythmic Sub-Bass</h4>
              <p className="text-xs text-slate-400 font-sans mt-1 leading-relaxed">
                Engineered for maximum low-end impact. 808 percussion patterns are custom-carved to translate seamlessly on massive club rigs.
              </p>
            </div>
          </div>

          <div className="bg-black/40 border border-slate-900 p-4 rounded-xl flex items-start gap-4">
            <div className="bg-[#e5c158]/10 border border-[#e5c158]/20 p-2 rounded-lg text-[#e5c158] shrink-0">
              <Disc className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-sans font-bold text-slate-200">Acoustic Auditing</h4>
              <p className="text-xs text-slate-400 font-sans mt-1 leading-relaxed">
                Pre-release testing. Every beat undergoes strict checks on cheap consumer headphones, car stereos, and flat reference monitors.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Interactive Custom Refinement Work Scale */}
        <div className="bg-[#0c0d12] border border-slate-800 p-5 rounded-2xl flex flex-col gap-5">
          <div className="flex justify-between items-center border-b border-slate-900 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-300" />
              <span className="text-xs font-sans font-bold text-slate-200">Loudness & Limiter Config</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 uppercase">Interactive simulation</span>
          </div>

          <p className="text-xs text-slate-400 font-sans leading-relaxed">
            Adjust the mastering compression target slider to simulate target streaming loudness outputs and transient ceiling response.
          </p>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-[11px] font-mono text-slate-400">
              <span>LIMITER GAIN (LUFS INTEGRATED)</span>
              <span className="text-[#e5c158] font-bold">{lufs} LUFS</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={scale}
              onChange={(e) => setScale(parseInt(e.target.value))}
              className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-[#e5c158]"
            />
          </div>

          {/* Interactive Calculation Matrix */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-black/80 border border-slate-900 p-3 rounded-xl text-center">
              <div className="text-sm font-mono font-bold text-[#e5c158]">{headroomDb} dBFS</div>
              <div className="text-[9px] font-sans font-bold text-slate-500 uppercase mt-0.5">True Peak Ceiling</div>
            </div>
            <div className="bg-black/80 border border-slate-900 p-3 rounded-xl text-center">
              <div className="text-sm font-mono font-bold text-slate-200">{dynamicRange} dB</div>
              <div className="text-[9px] font-sans font-bold text-slate-500 uppercase mt-0.5">Dynamic Range Crest</div>
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-900/60 text-left">
            <span className="text-[9px] font-mono text-[#e5c158] block uppercase">BEST RECOMMENDED FOR</span>
            <span className="text-xs font-sans text-slate-300 font-semibold mt-1 block">{recommendedFor}</span>
          </div>
        </div>

      </div>

      {/* Studio Philosophy Block */}
      <div className="bg-[#08080c] border border-slate-900 rounded-xl p-6 text-center flex flex-col items-center gap-3">
        <span className="text-3xl text-[#e5c158]">“</span>
        <blockquote className="text-sm italic font-serif text-slate-300 max-w-xl leading-relaxed">
          Music isn't about filling empty airwaves. It's the ultimate intentionality of rhythm, frequency harmonics, and silent pauses that shapes an artist's auditory soul.
        </blockquote>
        <span className="text-xs font-mono tracking-widest text-[#e5c158] uppercase mt-2">BILLOSONGS COUTURE ACOUSTICS</span>
      </div>

    </div>
  );
};
