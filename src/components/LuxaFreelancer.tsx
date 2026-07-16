import React, { useState } from 'react';
import { Mail, Briefcase, Plus, Users, Target, ShieldCheck, FileText, Music, Sliders } from 'lucide-react';

export const LuxaFreelancer: React.FC = () => {
  const [brandType, setBrandType] = useState<'stereo-mix' | 'stem-mix' | 'exclusive-prod'>('stem-mix');
  const [channelsCount, setChannelsCount] = useState(16); // Stem tracks
  const [includeGuidelines, setIncludeGuidelines] = useState(true); // Premium tuning

  // Calculate simulated pricing
  const baseRate = brandType === 'stereo-mix' ? 150 : brandType === 'stem-mix' ? 350 : 800;
  const channelCost = channelsCount * 8; // $8 per audio stem
  const guidelinesCost = includeGuidelines ? 150 : 0; // Manual pitch correction
  const totalQuote = baseRate + channelCost + guidelinesCost;

  return (
    <div className="text-left font-serif text-slate-100 flex flex-col gap-10" id="luxa-freelancer-concept">
      
      {/* Editorial Freelancer Header */}
      <div className="flex flex-col md:flex-row items-center gap-6 border-b border-slate-900 pb-5">
        <div className="w-16 h-16 rounded-full overflow-hidden border border-amber-400/40 shrink-0">
          <img 
            src="https://images.unsplash.com/photo-1516280440614-37939bbacd6a?auto=format&fit=crop&w=300&q=80" 
            alt="billosongs" 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#e5c158]">MEET THE PRODUCER</span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
            I'm <span className="text-amber-400 font-medium italic">billosongs</span>, Master Beatmaker & Mix Engineer
          </h2>
        </div>
      </div>

      {/* Numerical Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { value: '3,200', label: 'Hours Mastering' },
          { value: '140+', label: 'Premium Instrumentals' },
          { value: '480+', label: 'Satisfied Vocalists' },
          { value: '100%', label: 'Industry Standard Loudness' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-black/40 border border-slate-900 p-4 rounded-xl text-center">
            <div className="text-2xl font-mono font-bold text-white tracking-tight">{stat.value}</div>
            <div className="text-[9px] uppercase tracking-widest text-[#e5c158] font-bold mt-1.5 leading-snug">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Main Freelancer details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Col: Creative Statement */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <div className="border-l border-amber-400/40 pl-4 py-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">CREATIVE PHILOSOPHY</span>
            <p className="text-sm font-sans text-slate-300 mt-1.5 leading-relaxed font-serif">
              I focus on crafting powerful sonic spaces that support your lyrics, engage your fans, and generate commercial impact.
            </p>
          </div>

          <p className="text-xs text-slate-400 font-sans leading-relaxed">
            With solid expertise in modern rap, drill, and atmospheric R&B styles, my production mixes classical harmonic scales with heavy digital transient shaping. I utilize industry-leading plugins like FabFilter, Soundtoys, and SSL processing racks.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-1">
            <div className="bg-black/20 border border-slate-900 p-3.5 rounded-xl">
              <span className="text-[9px] font-mono text-slate-500 uppercase">Beats & Arrangements</span>
              <p className="text-xs text-slate-300 mt-1">Custom composition sequences tailored to your tempo, key, and lyrical rhythm.</p>
            </div>
            <div className="bg-black/20 border border-slate-900 p-3.5 rounded-xl">
              <span className="text-[9px] font-mono text-slate-500 uppercase">Mixing & Master processing</span>
              <p className="text-xs text-slate-300 mt-1">Surgical EQ frequency clearing, vocal pitch alignment, and high-fidelity loudness master.</p>
            </div>
          </div>
        </div>

        {/* Right Col: Interactive Commission Rate calculator */}
        <div className="lg:col-span-5 bg-[#0b0c10] border border-slate-900 p-5 rounded-2xl flex flex-col gap-5 font-sans">
          <div className="border-b border-slate-900 pb-3 flex justify-between items-center">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>Production Investment Estimator</span>
            </div>
            <span className="text-[9px] font-mono text-slate-500 uppercase">LIVE COST</span>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            Select production tiers and stems to estimate your project's custom mixing or arrangement quote instantly.
          </p>

          <div className="flex flex-col gap-4">
            {/* Identity tier selector */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-[9px] font-mono text-slate-500 uppercase">Engineering Tier Class</label>
              <div className="grid grid-cols-3 p-1 bg-slate-950 border border-slate-900 rounded-xl text-center">
                {(['stereo-mix', 'stem-mix', 'exclusive-prod'] as const).map((tier) => (
                  <button
                    key={tier}
                    id={`btn-tier-${tier}`}
                    onClick={() => setBrandType(tier)}
                    className={`py-1 rounded-lg text-[9px] font-mono uppercase transition duration-150 truncate ${
                      brandType === tier 
                        ? 'bg-[#e5c158] text-black font-bold' 
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {tier === 'stereo-mix' ? 'Stereo' : tier === 'stem-mix' ? 'Stem Mix' : 'Exclusive'}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Touchpoints count */}
            <div className="flex flex-col gap-1.5 text-left">
              <div className="flex justify-between items-center text-[9px] font-mono text-slate-500">
                <span className="uppercase">Total Stem Tracks Count</span>
                <span className="text-amber-400 font-bold">{channelsCount} Stems</span>
              </div>
              <input
                type="range"
                min="4"
                max="48"
                step="4"
                value={channelsCount}
                onChange={(e) => setChannelsCount(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-[#e5c158]"
              />
              <span className="text-[8px] text-slate-600">E.g., main vocals, backup tracks, drums, synth bass stems.</span>
            </div>

            {/* Premium Guidelines Checkbox */}
            <label className="flex items-center gap-2.5 bg-slate-950 border border-slate-900 p-2.5 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={includeGuidelines}
                onChange={(e) => setIncludeGuidelines(e.target.checked)}
                className="rounded border-slate-850 text-[#e5c158] focus:ring-0 accent-[#e5c158]"
              />
              <div className="text-left">
                <span className="text-[11px] font-sans font-bold text-slate-200 block">Melodyne Pitch Correction (+$150)</span>
                <span className="text-[9px] text-slate-500 block">Manual note-by-note vocal alignment, vibrato control and polish</span>
              </div>
            </label>

            {/* Simulated Rate */}
            <div className="border-t border-slate-950 pt-3 flex flex-col gap-2">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>ESTIMATED SESSION INVESTMENT</span>
                <span className="text-sm font-bold text-amber-300">${totalQuote}</span>
              </div>
              <button
                id="btn-freelancer-submit"
                onClick={() => {
                  alert(`Inquiry Drafted Successfully! Estimate is $${totalQuote}. Billosongs will respond directly to schedule your studio session.`);
                }}
                className="w-full bg-[#e5c158] hover:bg-amber-400 text-black py-2 rounded-xl text-xs font-mono font-bold transition duration-200"
              >
                Book Engineering Session
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
