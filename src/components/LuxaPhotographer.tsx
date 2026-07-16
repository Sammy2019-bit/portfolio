import React, { useState } from 'react';
import { Camera, Sliders, Eye, RefreshCw, ZoomIn, Info, Music, Volume2 } from 'lucide-react';

export const LuxaPhotographer: React.FC = () => {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [brightness, setBrightness] = useState(100); // Tube Saturation
  const [contrast, setContrast] = useState(100); // Dynamic Range Accent
  const [grain, setGrain] = useState(10); // Vinyl Crackle
  const [focusLength, setFocusLength] = useState(50); // Stereo Width (represented in px/%)

  const photoSlides = [
    {
      title: 'Main Analog Console',
      location: 'Studio Desk Node A',
      shutter: 'SSL G-Bus',
      aperture: '12-Band EQ',
      iso: 'Vacuum Tube',
      img: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Modular Eurorack Synthesizer',
      location: 'Oscillator Stack',
      shutter: 'VCO-3',
      aperture: 'Ladder Filter',
      iso: 'Analog',
      img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Vocal Isolation Cabin',
      location: 'Mic Locker',
      shutter: 'Neumann U87',
      aperture: 'Cardioid Pattern',
      iso: 'Pre-Amp Solo',
      img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const resetFilters = () => {
    setBrightness(100);
    setContrast(100);
    setGrain(10);
    setFocusLength(50);
  };

  const currentPhoto = photoSlides[activePhotoIdx];

  return (
    <div className="text-left font-serif text-slate-100 flex flex-col gap-10" id="luxa-photographer-concept">
      
      {/* Photographer Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-4">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#e5c158]">STUDIO WORKSPACE</span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
            Inside the <span className="text-amber-400 font-medium italic">Production Rig</span>
          </h2>
        </div>
        <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
          Billosongs HQ • 2026 Studio Tour
        </span>
      </div>

      {/* Main Photographic Workspace split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Col: Interactive Live Render Preview Frame */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative aspect-[3/4] sm:aspect-video rounded-2xl overflow-hidden bg-black border border-slate-900">
            {/* Main Image with dynamic CSS filters resembling thermal/studio visualizer */}
            <img
              src={currentPhoto.img}
              alt={currentPhoto.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-300"
              style={{
                filter: `brightness(${brightness}%) contrast(${contrast}%) grayscale(10%)`,
              }}
            />

            {/* Grain Overlay simulating Tape Saturation Hiss */}
            <div 
              className="absolute inset-0 pointer-events-none bg-repeat mix-blend-overlay opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0%200%20200%20200'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter%20id='noiseFilter'%3E%3CfeTurbulence%20type='fractalNoise'%20baseFrequency='0.8'%20numOctaves='3'%20stitchTiles='stitch'/%3E%3C/filter%3E%3Crect%20width='100%25'%20height='100%25'%20filter='url(%23noiseFilter)'%253E%3C/rect%3E%3C/svg%3E")`,
                opacity: grain / 150
              }}
            />

            {/* Ambient vignette */}
            <div className="absolute inset-0 bg-radial-vignette pointer-events-none" style={{ background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.85) 100%)' }} />

            {/* Live focus outline indicator */}
            <div className="absolute inset-8 border border-white/10 pointer-events-none rounded-xl flex items-center justify-center">
              <div className="w-12 h-12 border border-dashed border-amber-400/30 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-1.5 h-1.5 bg-[#e5c158] rounded-full" />
              </div>
            </div>

            {/* Real-time Lens focal label */}
            <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 border border-slate-800 rounded-lg flex items-center gap-2 text-[10px] font-mono text-amber-300">
              <Volume2 className="w-3.5 h-3.5" />
              <span>STEREO FIELD: {focusLength}% Width</span>
            </div>

            {/* Photographic parameters info bar */}
            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1.5 border border-slate-800 rounded-lg flex gap-3 text-[9px] font-mono text-slate-400">
              <span>{currentPhoto.shutter}</span>
              <span>{currentPhoto.aperture}</span>
              <span>{currentPhoto.iso}</span>
            </div>
          </div>

          {/* Selector thumbnail buttons */}
          <div className="grid grid-cols-3 gap-2">
            {photoSlides.map((slide, idx) => (
              <button
                key={idx}
                id={`btn-photo-thumb-${idx}`}
                onClick={() => setActivePhotoIdx(idx)}
                className={`p-1.5 rounded-xl border bg-black/30 flex items-center gap-2.5 transition duration-200 text-left ${
                  idx === activePhotoIdx ? 'border-[#e5c158] bg-amber-400/5' : 'border-slate-900 hover:border-slate-800'
                }`}
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-800">
                  <img src={slide.img} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="truncate">
                  <h4 className="text-[10px] font-sans font-bold text-slate-100 truncate">{slide.title}</h4>
                  <span className="text-[9px] font-mono text-slate-500 block truncate">{slide.location}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Col: Custom Saturation & Width adjusters */}
        <div className="lg:col-span-5 bg-[#0b0c10] border border-slate-900 p-5 rounded-2xl flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-slate-900 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-300" />
              <span className="text-xs font-sans font-bold text-slate-200">Saturation & Width Desk</span>
            </div>
            <button
              id="btn-photo-reset"
              onClick={resetFilters}
              className="text-[9px] font-mono text-slate-500 hover:text-white uppercase flex items-center gap-1 bg-slate-950 px-2 py-1 rounded border border-slate-900"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          <p className="text-xs text-slate-400 font-sans leading-relaxed">
            Billosongs' hardware emulator. Modify transient drive, analog vacuum tube saturation, and tape crackle levels on the visual console feedback.
          </p>

          <div className="flex flex-col gap-4 font-sans">
            {/* Brightness slider (Tube Saturation) */}
            <div className="flex flex-col gap-1.5 text-left">
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                <span className="uppercase">Tube Saturation (Harmonics)</span>
                <span className="text-amber-400 font-bold">{brightness}% Drive</span>
              </div>
              <input
                type="range"
                min="50"
                max="150"
                value={brightness}
                onChange={(e) => setBrightness(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-[#e5c158]"
              />
            </div>

            {/* Contrast slider (Transient punch) */}
            <div className="flex flex-col gap-1.5 text-left">
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                <span className="uppercase">Transient Punch (Compression)</span>
                <span className="text-amber-400 font-bold">{contrast}% Ratio</span>
              </div>
              <input
                type="range"
                min="50"
                max="150"
                value={contrast}
                onChange={(e) => setContrast(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-[#e5c158]"
              />
            </div>

            {/* Grain slider (Vinyl crackle noise) */}
            <div className="flex flex-col gap-1.5 text-left">
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                <span className="uppercase">Vinyl Crackle & Tape Hiss</span>
                <span className="text-amber-400 font-bold">{grain}% Floor</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                value={grain}
                onChange={(e) => setGrain(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-[#e5c158]"
              />
            </div>

            {/* Prime Focal slider (Stereo field width) */}
            <div className="flex flex-col gap-1.5 text-left">
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                <span className="uppercase">Stereo Field Width</span>
                <span className="text-amber-400 font-bold">{focusLength}% Mid/Side</span>
              </div>
              <input
                type="range"
                min="24"
                max="85"
                step="1"
                value={focusLength}
                onChange={(e) => setFocusLength(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-[#e5c158]"
              />
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-900 p-3.5 rounded-xl flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
            <p className="text-[10px] text-slate-500 font-sans leading-normal">
              Expanding stereo width enhances the spatial positioning of synth pads and panning hi-hats. Extreme tube drive saturation adds high-end warmth that mirrors analog tape reels.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
