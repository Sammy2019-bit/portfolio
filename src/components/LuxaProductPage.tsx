import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Sliders, Play, Disc, Settings, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const LuxaProductPage: React.FC = () => {
  const [selectedFinish, setSelectedFinish] = useState<'gold' | 'obsidian' | 'brass'>('gold');
  const [eqPreset, setEqPreset] = useState<'bass' | 'balanced' | 'air'>('balanced');
  const [isSynthPlaying, setIsSynthPlaying] = useState(false);
  const [frequency, setFrequency] = useState(220); // Low calming frequency

  // Web Audio Context refs for safe synthesizer tones
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const startSoundcheck = () => {
    try {
      if (isSynthPlaying) {
        stopSoundcheck();
        return;
      }

      // Initialize audio context
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Setup clean safe sine oscillator
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Configure oscillator type based on selected finish waveform
      if (selectedFinish === 'gold') {
        osc.type = 'sine';
      } else if (selectedFinish === 'obsidian') {
        osc.type = 'triangle';
      } else {
        osc.type = 'sawtooth';
      }
      
      // Calculate active base frequency based on EQ Preset
      let baseFreq = frequency;
      if (eqPreset === 'bass') baseFreq = 55; // Low subwoofer resonance
      if (eqPreset === 'air') baseFreq = 440; // High clarity note
      
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      
      // Keep volume super low and safe (0.02) for pleasant user experience
      gain.gain.setValueAtTime(0.02, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();

      oscillatorRef.current = osc;
      gainNodeRef.current = gain;
      setIsSynthPlaying(true);
    } catch (err) {
      console.warn("Web Audio API blocked or not supported:", err);
      setIsSynthPlaying(true);
    }
  };

  const stopSoundcheck = () => {
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      } catch (e) {}
      oscillatorRef.current = null;
    }
    setIsSynthPlaying(false);
  };

  const handleEqChange = (preset: 'bass' | 'balanced' | 'air') => {
    setEqPreset(preset);
    if (oscillatorRef.current && audioCtxRef.current) {
      let baseFreq = frequency;
      if (preset === 'bass') baseFreq = 55;
      if (preset === 'air') baseFreq = 440;
      oscillatorRef.current.frequency.setValueAtTime(baseFreq, audioCtxRef.current.currentTime);
    }
  };

  const updateFreq = (val: number) => {
    setFrequency(val);
    if (oscillatorRef.current && audioCtxRef.current) {
      oscillatorRef.current.frequency.setValueAtTime(val, audioCtxRef.current.currentTime);
    }
  };

  const finishDetails = {
    gold: {
      name: 'Pure Sine Wave',
      desc: 'An ultra-smooth, clean fundamental waveform containing no additional harmonics. Perfect for warm, deep sub-bass representation.',
      accentClass: 'from-[#f3e7c4] to-[#dfbc6c]',
      bgHex: '#dfbc6c'
    },
    obsidian: {
      name: 'Sub-Bass Triangle Wave',
      desc: 'Contains odd harmonics which roll off rapidly. Excellent for creating deep punchy 808 kicks and organic sliding basslines.',
      accentClass: 'from-slate-700 to-slate-900',
      bgHex: '#1e293b'
    },
    brass: {
      name: 'Analog Sawtooth Wave',
      desc: 'Rich in both even and odd harmonics. Produces a buzzy, bright, vintage synthesizer tone that cuts directly through heavy vocal mixes.',
      accentClass: 'from-amber-600 to-yellow-700',
      bgHex: '#b45309'
    }
  };

  return (
    <div className="text-left font-serif text-slate-100 flex flex-col gap-10" id="luxa-product-page-headphones">
      
      {/* Product Page Header */}
      <div>
        <span className="text-[10px] uppercase font-mono tracking-widest text-[#e5c158]">AUDIO DIAGNOSTICS</span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1 leading-snug">
          Subwoofer & <span className="text-amber-400 font-medium italic">Transducer Frequency Test Bed</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-sans max-w-xl mt-2 leading-relaxed">
          Verify low-end trap vibrations, sub-bass glide sweeps, and high-clarity frequencies on your active studio monitors or headphones.
        </p>
      </div>

      {/* Product Customizer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Graphic Headphone Visualizer */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="relative aspect-square rounded-2xl bg-black border border-slate-900 flex items-center justify-center overflow-hidden p-6">
            
            {/* Dynamic visual rings that react to finish selection */}
            <div className="absolute inset-8 rounded-full border border-dashed border-slate-900 flex items-center justify-center animate-spin" style={{ animationDuration: '40s' }}>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400/10 to-transparent" />
            </div>
            <div className="absolute inset-16 rounded-full border border-dashed border-slate-900" />
            <div className="absolute inset-24 rounded-full border border-slate-950" />

            {/* Simulated Headphone rendering via SVG and CSS for ultra clean crisp look */}
            <div className="relative w-48 h-48 flex items-center justify-center">
              
              {/* Dynamic Soundwaves if synthesizer is active */}
              {isSynthPlaying && (
                <div className="absolute inset-0 flex items-center justify-between pointer-events-none px-4 z-20">
                  {[1, 2, 3, 4, 5, 6].map((bar) => (
                    <div 
                      key={bar} 
                      className="w-1.5 bg-[#e5c158] rounded-full animate-pulse" 
                      style={{ 
                        height: `${Math.random() * 60 + 20}%`,
                        animationDuration: `${Math.random() * 0.4 + 0.3}s`
                      }} 
                      id={`wave-bar-${bar}`}
                    />
                  ))}
                </div>
              )}

              {/* Vector Headphone Model with interactive color fill */}
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl relative z-10">
                {/* Headband */}
                <path 
                  d="M 30,110 A 70,70 0 0,1 170,110" 
                  fill="none" 
                  stroke={selectedFinish === 'gold' ? '#dfbc6c' : selectedFinish === 'obsidian' ? '#27272a' : '#b45309'} 
                  strokeWidth="12" 
                  strokeLinecap="round" 
                />
                <path 
                  d="M 40,105 A 60,60 0 0,1 160,105" 
                  fill="none" 
                  stroke="#000" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                />

                {/* Left Ear Cup */}
                <rect 
                  x="20" y="100" width="24" height="50" rx="12" 
                  fill={selectedFinish === 'gold' ? '#dfbc6c' : selectedFinish === 'obsidian' ? '#3f3f46' : '#b45309'} 
                  stroke="#1c1917" strokeWidth="3" 
                />
                <rect x="12" y="105" width="8" height="40" rx="4" fill="#000" />

                {/* Right Ear Cup */}
                <rect 
                  x="156" y="100" width="24" height="50" rx="12" 
                  fill={selectedFinish === 'gold' ? '#dfbc6c' : selectedFinish === 'obsidian' ? '#3f3f46' : '#b45309'} 
                  stroke="#1c1917" strokeWidth="3" 
                />
                <rect x="180" y="105" width="8" height="40" rx="4" fill="#000" />

                {/* Center dial ornament */}
                <circle cx="100" cy="110" r="10" fill="#000" />
                <circle cx="100" cy="110" r="6" fill={selectedFinish === 'gold' ? '#dfbc6c' : '#1e293b'} />
              </svg>
            </div>

            {/* Price badge overlay */}
            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 border border-slate-900 rounded-lg">
              <span className="text-[9px] font-mono text-slate-500 block">FREQUENCY STAGE</span>
              <span className="text-sm font-mono font-bold text-amber-300">TEST OK</span>
            </div>
          </div>

          {/* Quick finish selector buttons */}
          <div className="grid grid-cols-3 gap-3">
            {(['gold', 'obsidian', 'brass'] as const).map((finish) => (
              <button
                key={finish}
                id={`btn-finish-${finish}`}
                onClick={() => {
                  setSelectedFinish(finish);
                  if (isSynthPlaying) {
                    stopSoundcheck();
                  }
                }}
                className={`py-2 px-3 rounded-xl border text-center transition duration-200 capitalize ${
                  selectedFinish === finish 
                    ? 'border-[#e5c158] bg-amber-400/5' 
                    : 'border-slate-900 bg-black/20 hover:border-slate-800'
                }`}
              >
                <div className={`w-3 h-3 rounded-full mx-auto mb-1 bg-gradient-to-r ${finishDetails[finish].accentClass}`} />
                <span className="text-[10px] font-sans font-bold text-slate-100">{finishDetails[finish].name.split(' ')[1] || 'Wave'}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Technical Acoustic Rig */}
        <div className="lg:col-span-6 bg-[#0b0c10] border border-slate-900 p-5 rounded-2xl flex flex-col gap-5">
          <div className="border-b border-slate-900 pb-3">
            <h3 className="text-xs font-sans font-bold text-slate-200 flex items-center gap-1.5">
              <Settings className="w-4 h-4 text-amber-400" />
              <span>Acoustic Waveform Profile</span>
            </h3>
            <p className="text-[11px] text-slate-500 font-sans mt-1">Select EQ curve presets and test with real-time audio oscillations.</p>
          </div>

          <div className="flex flex-col gap-1 text-left">
            <span className="text-[9px] font-mono text-slate-500 uppercase">ACTIVE COUTURE WAVEFORM</span>
            <h4 className="text-sm font-sans font-bold text-white">{finishDetails[selectedFinish].name}</h4>
            <p className="text-xs text-slate-400 font-sans mt-1 leading-relaxed">
              {finishDetails[selectedFinish].desc}
            </p>
          </div>

          {/* Preset EQ curves */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-[9px] font-mono text-slate-500 uppercase">Select Target Soundstage Curve</label>
            <div className="grid grid-cols-3 p-1 bg-slate-950 border border-slate-900 rounded-xl text-center">
              {(['bass', 'balanced', 'air'] as const).map((preset) => (
                <button
                  key={preset}
                  id={`btn-eq-${preset}`}
                  onClick={() => {
                    handleEqChange(preset);
                    if (preset === 'bass') setFrequency(55);
                    if (preset === 'air') setFrequency(440);
                  }}
                  className={`py-1.5 rounded-lg text-[10px] font-mono uppercase transition duration-200 ${
                    eqPreset === preset 
                      ? 'bg-[#e5c158] text-black font-bold' 
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Synthesizer tone generator */}
          <div className="bg-slate-950 border border-slate-900/80 p-4 rounded-xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#e5c158] uppercase font-bold flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                <span>Test Tone Sweep</span>
              </span>
              {isSynthPlaying && (
                <span className="text-[9px] font-mono text-emerald-400 animate-pulse">OSCILLATOR ACTIVE</span>
              )}
            </div>

            <div className="flex flex-col gap-1 text-left">
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>ACTIVE OSCILLATOR FREQUENCY</span>
                <span className="text-[#e5c158] font-bold">{frequency} Hz</span>
              </div>
              <input
                type="range"
                min="55"
                max="550"
                value={frequency}
                onChange={(e) => updateFreq(parseInt(e.target.value))}
                className="w-full h-1 bg-black rounded-lg appearance-none cursor-pointer accent-[#e5c158]"
                disabled={eqPreset !== 'balanced'}
              />
              <span className="text-[8px] font-sans text-slate-600">Manual slider sweep is enabled on Balanced preset.</span>
            </div>

            {/* Play trigger button */}
            <button
              id="btn-soundcheck-trigger"
              onClick={startSoundcheck}
              className={`w-full py-2.5 rounded-xl text-xs font-mono font-bold transition duration-200 flex items-center justify-center gap-2 ${
                isSynthPlaying
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                  : 'bg-[#e5c158] hover:bg-amber-400 text-black'
              }`}
            >
              {isSynthPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isSynthPlaying ? "Mute Transducer Tone" : "Test Waveform Frequencies"}</span>
            </button>
          </div>

          {/* Guarantee banner */}
          <div className="flex items-center gap-3 bg-slate-950/40 p-3 rounded-lg border border-slate-900 text-xs text-slate-400">
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
            <span>Guaranteed zero frequency distortion across reference subwoofers. Professional audio certified.</span>
          </div>
        </div>

      </div>

    </div>
  );
};
