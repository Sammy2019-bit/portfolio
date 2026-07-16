import React, { useState, useRef } from 'react';
import { BEAT_MARKETPLACE, BeatItem } from '../data/jazzData';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, ShoppingCart, Sliders, Music, Check, ArrowRight, Sparkles, Volume2, Key, Activity, Heart } from 'lucide-react';

interface BeatStoreProps {
  onAddToCart: (beat: BeatItem, licenseType: string, price: number) => void;
}

export const JazzBeatStore: React.FC<BeatStoreProps> = ({ onAddToCart }) => {
  const [playingBeatId, setPlayingBeatId] = useState<string | null>(null);
  const [selectedLicense, setSelectedLicense] = useState<Record<string, 'Basic' | 'Premium' | 'Unlimited'>>({
    'beat-1': 'Basic',
    'beat-2': 'Basic',
    'beat-3': 'Basic',
    'beat-4': 'Basic',
  });
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Web Audio Synth state to play a beautiful real simulated Jazz Loop
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthNodesRef = useRef<any[]>([]);

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(f => f !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const stopAudioSynth = () => {
    synthNodesRef.current.forEach((node) => {
      try { node.stop(); } catch(e) {}
    });
    synthNodesRef.current = [];
  };

  const playAudioSynth = (genre: string) => {
    stopAudioSynth();
    
    // Initialize Web Audio
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Design different beautiful jazz-chords and beat loops depending on genre
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const osc3 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filterNode = ctx.createBiquadFilter();

    gainNode.gain.setValueAtTime(0.0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.3); // Soft fade-in

    // Set frequencies for a beautiful minor 7th jazz chord
    if (genre.includes('Trap') || genre.includes('Drill')) {
      // Dark mysterious minor chord with deep bass
      osc1.frequency.setValueAtTime(65.41, ctx.currentTime); // C2 (deep bass)
      osc2.frequency.setValueAtTime(130.81, ctx.currentTime); // C3
      osc3.frequency.setValueAtTime(155.56, ctx.currentTime); // Eb3 (Minor third)
      osc1.type = 'sawtooth';
      osc2.type = 'triangle';
      osc3.type = 'sine';
      filterNode.frequency.setValueAtTime(400, ctx.currentTime);
      filterNode.Q.setValueAtTime(3, ctx.currentTime);
    } else if (genre.includes('Lofi') || genre.includes('Chillhop')) {
      // Sweet warm major 7th chord
      osc1.frequency.setValueAtTime(87.31, ctx.currentTime); // F2
      osc2.frequency.setValueAtTime(174.61, ctx.currentTime); // F3
      osc3.frequency.setValueAtTime(220.00, ctx.currentTime); // A3
      osc1.type = 'triangle';
      osc2.type = 'sine';
      osc3.type = 'sine';
      filterNode.frequency.setValueAtTime(250, ctx.currentTime);
    } else {
      // Moody modal chords
      osc1.frequency.setValueAtTime(98.00, ctx.currentTime); // G2
      osc2.frequency.setValueAtTime(196.00, ctx.currentTime); // G3
      osc3.frequency.setValueAtTime(233.08, ctx.currentTime); // Bb3
      osc1.type = 'sine';
      osc2.type = 'triangle';
      osc3.type = 'triangle';
      filterNode.frequency.setValueAtTime(500, ctx.currentTime);
    }

    // Connect nodes
    osc1.connect(filterNode);
    osc2.connect(filterNode);
    osc3.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Start oscillators
    osc1.start();
    osc2.start();
    osc3.start();

    // Store references
    synthNodesRef.current = [osc1, osc2, osc3, gainNode];

    // Simulate simple groove rhythm by pulsing filter frequency
    const pulseInterval = setInterval(() => {
      if (playingBeatId === null) {
        clearInterval(pulseInterval);
        return;
      }
      try {
        const now = ctx.currentTime;
        filterNode.frequency.setValueAtTime(150, now);
        filterNode.frequency.exponentialRampToValueAtTime(700, now + 0.25);
      } catch(e) {}
    }, 450);
  };

  const handlePlayToggle = (beatId: string, genre: string) => {
    if (playingBeatId === beatId) {
      setPlayingBeatId(null);
      stopAudioSynth();
    } else {
      setPlayingBeatId(beatId);
      playAudioSynth(genre);
    }
  };

  // Adjust price according to license tier
  const getLicensePrice = (basePrice: number, tier: 'Basic' | 'Premium' | 'Unlimited') => {
    if (tier === 'Basic') return basePrice;
    if (tier === 'Premium') return basePrice + 30;
    return basePrice + 90;
  };

  const getLicenseBadge = (tier: 'Basic' | 'Premium' | 'Unlimited') => {
    if (tier === 'Basic') return 'MP3 / 100k Streams';
    if (tier === 'Premium') return 'WAV + MP3 / 500k Streams';
    return 'Track Stems / Unlimited Streams';
  };

  return (
    <section id="beat-store" className="bg-[#050d10] py-24 border-t border-[#0f242a] relative overflow-hidden">
      {/* Decorative vector overlays */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title and Intro */}
        <div className="text-left mb-16 max-w-2xl">
          <span className="font-mono text-[10px] tracking-[0.3em] text-emerald-400 uppercase block mb-1">
            EXQUISITE PRODUCTION RIGHTS
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-white tracking-wide relative inline-block pb-3">
            Lease Premium Beats
            <span className="absolute bottom-0 left-0 w-28 h-[2px] bg-emerald-500" />
          </h2>
          <p className="text-gray-400 text-sm mt-4 leading-relaxed font-sans font-light">
            Need high-fidelity jazz trap or vintage lofi drum tracks for your next release? Pick your beat, select the license that fits your production size, and unlock trackouts instantly. All master sax lines recorded live.
          </p>
        </div>

        {/* Live Audio Feedback Indicator */}
        <AnimatePresence>
          {playingBeatId !== null && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-[#0a1e23] border border-emerald-500/30 p-4 mb-10 flex items-center justify-between text-left"
              id="active-beat-synth-bar"
            >
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <Volume2 className="w-4 h-4 text-emerald-400 animate-bounce" />
                <div>
                  <span className="font-mono text-[9px] tracking-widest text-emerald-400 uppercase block">WEB SYNTH ACTIVE //</span>
                  <span className="font-serif text-sm text-white font-medium">
                    Simulating: {BEAT_MARKETPLACE.find(b => b.id === playingBeatId)?.name}
                  </span>
                </div>
              </div>
              
              {/* Fake visual waves animation */}
              <div className="flex items-end gap-1 h-6 px-4">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [4, Math.random() * 20 + 6, 4] }}
                    transition={{ repeat: Infinity, duration: 0.6 + i * 0.1, ease: 'easeInOut' }}
                    className="w-1 bg-emerald-400"
                  />
                ))}
              </div>

              <button
                onClick={() => { setPlayingBeatId(null); stopAudioSynth(); }}
                className="text-gray-400 hover:text-white font-mono text-[9px] uppercase tracking-wider bg-[#102e35] px-3 py-1.5 border border-emerald-500/20"
              >
                [STOP BEAT]
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Beats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="beat-store-grid">
          {BEAT_MARKETPLACE.map((beat) => {
            const isPlaying = playingBeatId === beat.id;
            const currentLicense = selectedLicense[beat.id] || 'Basic';
            const price = getLicensePrice(beat.price, currentLicense);
            const isFavorited = favorites.includes(beat.id);

            return (
              <div 
                key={beat.id}
                className="bg-[#08181c] border border-[#11323a] group flex flex-col justify-between overflow-hidden shadow-xl hover:border-emerald-500/40 transition-all duration-300 relative"
                id={`beat-card-${beat.id}`}
              >
                {/* Floating Tags */}
                <div className="absolute top-3 left-3 z-20 flex flex-wrap gap-1">
                  <span className="bg-[#050d10]/90 text-emerald-400 font-mono text-[8px] tracking-widest uppercase px-2 py-0.5 border border-emerald-500/20">
                    {beat.genre}
                  </span>
                </div>

                {/* Cover art image container */}
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={beat.image} 
                    alt={beat.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050d10] via-[#050d10]/40 to-transparent" />

                  {/* Play & Favorite triggers */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                    <div className="flex gap-3">
                      <button
                        onClick={() => toggleFavorite(beat.id)}
                        className={`p-2.5 rounded-full backdrop-blur-md border ${
                          isFavorited 
                            ? 'bg-red-500/20 border-red-500 text-red-400' 
                            : 'bg-[#050d10]/80 border-[#11323a] text-gray-400 hover:text-white'
                        } transition-all duration-200 cursor-pointer`}
                        id={`favorite-btn-${beat.id}`}
                        title="Add to Favorites"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                      
                      <button
                        onClick={() => handlePlayToggle(beat.id, beat.genre)}
                        className={`p-3 rounded-full backdrop-blur-md border transition-all duration-300 hover:scale-110 cursor-pointer ${
                          isPlaying 
                            ? 'bg-emerald-500 border-emerald-400 text-[#050d10]' 
                            : 'bg-emerald-500/20 border-emerald-400 text-emerald-400 hover:bg-emerald-500 hover:text-black'
                        }`}
                        id={`play-btn-${beat.id}`}
                        title="Simulate Beat Preview"
                      >
                        {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card Content details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5 text-left">
                    <h3 className="font-serif text-base text-white font-medium group-hover:text-emerald-300 transition-colors duration-200">
                      {beat.name}
                    </h3>
                    
                    {/* BPM and Key specs info */}
                    <div className="flex items-center gap-3 font-mono text-[9px] text-gray-400">
                      <span className="flex items-center gap-1">
                        <Activity className="w-3 h-3 text-emerald-500" />
                        {beat.bpm} BPM
                      </span>
                      <span className="flex items-center gap-1">
                        <Key className="w-3 h-3 text-emerald-500" />
                        {beat.key}
                      </span>
                    </div>

                    <p className="text-gray-400 text-xs font-light line-clamp-2 leading-relaxed pt-1.5">
                      {beat.description}
                    </p>
                  </div>

                  {/* License Config & Add to Cart button */}
                  <div className="space-y-3 pt-3 border-t border-[#0e272d]">
                    
                    {/* License Tier Dropdown Selector */}
                    <div className="space-y-1">
                      <label className="font-mono text-[8px] tracking-widest text-gray-500 uppercase block text-left">License Option</label>
                      <select
                        value={currentLicense}
                        onChange={(e) => setSelectedLicense({
                          ...selectedLicense,
                          [beat.id]: e.target.value as 'Basic' | 'Premium' | 'Unlimited'
                        })}
                        className="w-full bg-[#050d10] border border-[#11323a] text-xs text-gray-300 py-1.5 px-2 focus:outline-none focus:border-emerald-500 font-mono"
                        id={`license-select-${beat.id}`}
                      >
                        <option value="Basic">Basic Lease (${beat.price})</option>
                        <option value="Premium">Premium Lease (${beat.price + 30})</option>
                        <option value="Unlimited">Unlimited Stems (${beat.price + 90})</option>
                      </select>
                      <span className="font-mono text-[8px] text-emerald-400/80 block text-left">
                        {getLicenseBadge(currentLicense)}
                      </span>
                    </div>

                    {/* Lease CTA */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="text-left">
                        <span className="font-mono text-[9px] text-gray-500 block uppercase">Price</span>
                        <span className="font-serif text-lg font-bold text-white">${price}</span>
                      </div>

                      <button
                        onClick={() => onAddToCart(beat, currentLicense, price)}
                        className="bg-emerald-500 hover:bg-emerald-400 text-[#050d10] font-bold text-[9px] tracking-widest uppercase px-4 py-2 flex items-center gap-1.5 hover:scale-105 transition-all duration-200 cursor-pointer"
                        id={`add-to-cart-btn-${beat.id}`}
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Lease
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* License Specs Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-10 border-t border-[#11323a]/50" id="beat-specs-legend">
          <div className="bg-[#050d10] border border-[#11323a]/40 p-5 text-left">
            <span className="font-mono text-[9px] text-emerald-400 tracking-wider font-bold block mb-1">[01] BASIC LICENSE</span>
            <span className="text-white font-serif text-sm block">Singles & Independent releases</span>
            <p className="text-xs text-gray-400 mt-2 font-light">
              High-quality non-exclusive MP3 file. Valid for up to 100,000 commercial streams. Synchronized performance rights for small digital concerts.
            </p>
          </div>
          <div className="bg-[#050d10] border border-[#11323a]/40 p-5 text-left">
            <span className="font-mono text-[9px] text-emerald-400 tracking-wider font-bold block mb-1">[02] PREMIUM WAV LICENSE</span>
            <span className="text-white font-serif text-sm block">Radio Airplays & Music Videos</span>
            <p className="text-xs text-gray-400 mt-2 font-light">
              Lossless 24-bit WAV file format plus basic MP3 package. Broadened stream limits of 500,000 plays, including local indie radio airplays.
            </p>
          </div>
          <div className="bg-[#050d10] border border-[#11323a]/40 p-5 text-left">
            <span className="font-mono text-[9px] text-emerald-400 tracking-wider font-bold block mb-1">[03] FULL TRACKOUT STEMS</span>
            <span className="text-white font-serif text-sm block">Professional mixing & editing rights</span>
            <p className="text-xs text-gray-400 mt-2 font-light">
              Receive individual audio trackouts (dry drums, sax line tracks, acoustic keys, sub-basses). Unlimited commercial stream counts.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
