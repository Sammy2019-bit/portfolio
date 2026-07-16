import React, { useState, useRef, useEffect } from 'react';
import { ALBUM_TRACKS, TrackItem } from '../data/jazzData';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Download, Volume2, Music, SkipBack, SkipForward, Radio, Disc, Laptop, Heart } from 'lucide-react';

export const JazzMusicSection: React.FC = () => {
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(25); // Simulated progress
  const [volume, setVolume] = useState(70);
  const [showEq, setShowEq] = useState(false);

  // Synthesizer variables for playing real audio
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthNodesRef = useRef<any[]>([]);
  const progressIntervalRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      stopSynthesizer();
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  const stopSynthesizer = () => {
    synthNodesRef.current.forEach((node) => {
      try { node.stop(); } catch(e) {}
    });
    synthNodesRef.current = [];
    setShowEq(false);
  };

  const startSynthesizer = (trackTitle: string) => {
    stopSynthesizer();
    setShowEq(true);

    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Generate different frequencies based on the song choice
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filterNode = ctx.createBiquadFilter();

    gainNode.gain.setValueAtTime(0.0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime((volume / 100) * 0.12, ctx.currentTime + 0.4);

    // Design distinct frequencies for a classical jazz feel
    if (trackTitle === 'Human Nature') {
      osc1.frequency.setValueAtTime(110.00, ctx.currentTime); // A2
      osc2.frequency.setValueAtTime(220.00, ctx.currentTime); // A3
      osc1.type = 'triangle';
      osc2.type = 'sine';
    } else if (trackTitle === 'Thinking Free again') {
      osc1.frequency.setValueAtTime(130.81, ctx.currentTime); // C3
      osc2.frequency.setValueAtTime(261.63, ctx.currentTime); // C4
      osc1.type = 'sine';
      osc2.type = 'sine';
    } else if (trackTitle === 'Rainy Day') {
      osc1.frequency.setValueAtTime(73.42, ctx.currentTime); // D2
      osc2.frequency.setValueAtTime(146.83, ctx.currentTime); // D3
      osc1.type = 'sawtooth';
      osc2.type = 'triangle';
      filterNode.frequency.setValueAtTime(200, ctx.currentTime);
    } else {
      osc1.frequency.setValueAtTime(98.00, ctx.currentTime); // G2
      osc2.frequency.setValueAtTime(196.00, ctx.currentTime); // G3
      osc1.type = 'triangle';
      osc2.type = 'sine';
    }

    osc1.connect(filterNode);
    osc2.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start();
    osc2.start();

    synthNodesRef.current = [osc1, osc2, gainNode];
  };

  const handleTrackPlay = (track: TrackItem) => {
    if (activeTrackId === track.id) {
      if (isPlaying) {
        setIsPlaying(false);
        stopSynthesizer();
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      } else {
        setIsPlaying(true);
        startSynthesizer(track.title);
        startProgressSimulation();
      }
    } else {
      setActiveTrackId(track.id);
      setIsPlaying(true);
      startSynthesizer(track.title);
      setAudioProgress(0);
      startProgressSimulation();
    }
  };

  const startProgressSimulation = () => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    progressIntervalRef.current = setInterval(() => {
      setAudioProgress((prev) => {
        if (prev >= 100) {
          handleNextTrack();
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const handleNextTrack = () => {
    const currentIndex = ALBUM_TRACKS.findIndex((t) => t.id === activeTrackId);
    let nextIndex = currentIndex + 1;
    if (nextIndex >= ALBUM_TRACKS.length) nextIndex = 0;
    const nextTrack = ALBUM_TRACKS[nextIndex];
    handleTrackPlay(nextTrack);
  };

  const handlePrevTrack = () => {
    const currentIndex = ALBUM_TRACKS.findIndex((t) => t.id === activeTrackId);
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) prevIndex = ALBUM_TRACKS.length - 1;
    const prevTrack = ALBUM_TRACKS[prevIndex];
    handleTrackPlay(prevTrack);
  };

  const currentTrack = ALBUM_TRACKS.find((t) => t.id === activeTrackId) || ALBUM_TRACKS[0];

  return (
    <section id="music" className="bg-[#050d10] py-24 border-t border-[#0f242a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
        
        {/* Left Column: Album Showcase */}
        <div className="lg:col-span-5 space-y-8" id="music-album-panel">
          <div className="space-y-4 text-left">
            <h2 className="font-serif text-3xl md:text-4xl text-white tracking-wide relative inline-block pb-3">
              Album
              <span className="absolute bottom-0 left-0 w-24 h-[2px] bg-emerald-500" />
            </h2>
          </div>

          {/* Classic Album Art */}
          <div className="bg-[#07191d] border border-[#11323a] p-6 shadow-2xl relative group">
            
            {/* The Sax in the City custom design: skyline over gradient */}
            <div className="relative aspect-square w-full bg-gradient-to-t from-red-600 via-orange-500 to-amber-400 overflow-hidden flex flex-col justify-between p-6">
              
              {/* Silhouette cityscape overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-[url('https://images.unsplash.com/photo-1511520790204-7ecbe192b005?auto=format&fit=crop&w=400&q=80')] bg-cover opacity-30 mix-blend-multiply pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-10" />

              {/* Title & Artist labels */}
              <div className="relative z-10 text-left">
                <span className="font-mono text-[9px] tracking-[0.4em] text-black font-extrabold uppercase">
                  BILLOSONGS PRESENTS
                </span>
                <h3 className="font-serif text-3xl md:text-4xl text-black font-extrabold tracking-tight leading-none mt-1">
                  Sax in the
                  <span className="block italic">City</span>
                </h3>
              </div>

              {/* Big Saxophone Silhouette in center-right */}
              <div className="absolute bottom-4 right-4 w-32 h-64 z-10 flex items-center justify-center opacity-90 select-none">
                <svg className="w-full h-full text-black drop-shadow-lg fill-current" viewBox="0 0 24 24">
                  <path d="M19,5H15V3H13V5H9V3H7V5H5A2,2 0 0,0 3,7V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7A2,2 0 0,0 19,5M19,19H5V7H19V19M16.5,12.5C16.5,11.67 15.83,11 15,11H13.5V9.5C13.5,8.67 12.83,8 12,8H10.5V6.5C10.5,5.67 9.83,5 9,5H7.5V3.5C7.5,2.67 6.83,2 6,2H4.5V1H3V23H4.5V22H6C6.83,22 7.5,21.33 7.5,20.5V19H9C9.83,19 10.5,18.33 10.5,17.5V16H12C12.83,16 13.5,15.33 13.5,14.5V13H15C15.83,13 16.5,12.33 16.5,12.5Z" />
                </svg>
              </div>

              {/* Album footer specs */}
              <div className="relative z-10 flex justify-between items-end">
                <span className="font-mono text-[9px] text-black font-bold tracking-widest">
                  LP VOL. 01 // 2026
                </span>
                <span className="w-6 h-6 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center">
                  <Disc className="w-3.5 h-3.5 text-black animate-spin-slow" />
                </span>
              </div>
            </div>

            {/* Album Metadata */}
            <div className="mt-6 text-left space-y-4">
              <div>
                <span className="font-serif text-xl text-white font-semibold">Album Title</span>
                <span className="font-mono text-xs text-emerald-400 block mt-0.5">Sax in the City — LP Release</span>
              </div>

              <div className="space-y-1 text-xs text-gray-400 font-light leading-relaxed">
                <span className="font-bold text-gray-300 block uppercase font-mono text-[9px] tracking-wider">Text of the printing and typesetting</span>
                <p>
                  Lolem Ipsum is dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
              </div>

              {/* iTunes & Streaming Badges */}
              <div className="flex gap-4 pt-2">
                <a 
                  href="#" 
                  className="bg-black/40 hover:bg-[#112d35] border border-[#11323a] text-white py-2 px-4 flex items-center gap-2 transition-colors duration-300 rounded-none cursor-pointer text-[10px] font-mono tracking-wider uppercase"
                >
                  <Laptop className="w-3.5 h-3.5 text-emerald-400" />
                  iTunes Store
                </a>
                <a 
                  href="#" 
                  className="bg-black/40 hover:bg-[#112d35] border border-[#11323a] text-white py-2 px-4 flex items-center gap-2 transition-colors duration-300 rounded-none cursor-pointer text-[10px] font-mono tracking-wider uppercase"
                >
                  <Radio className="w-3.5 h-3.5 text-emerald-400" />
                  Spotify LP
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Music Player & Tracklist */}
        <div className="lg:col-span-7 space-y-8" id="music-tracklist-panel">
          <div className="space-y-4 text-left">
            <h2 className="font-serif text-3xl md:text-4xl text-white tracking-wide relative inline-block pb-3">
              Music
              <span className="absolute bottom-0 left-0 w-24 h-[2px] bg-emerald-500" />
            </h2>
          </div>

          {/* Interactive Tracks Panel */}
          <div className="space-y-3" id="music-tracklist-container">
            {ALBUM_TRACKS.map((track) => {
              const isActive = activeTrackId === track.id;
              const isCurrentPlaying = isActive && isPlaying;

              return (
                <div
                  key={track.id}
                  onClick={() => handleTrackPlay(track)}
                  className={`flex items-center justify-between p-4 border transition-all duration-300 cursor-pointer group select-none ${
                    isActive 
                      ? 'bg-[#0a1e23] border-emerald-500/50' 
                      : 'bg-transparent border-[#11323a] hover:bg-[#08181c] hover:border-gray-500'
                  }`}
                  id={`track-row-${track.id}`}
                >
                  <div className="flex items-center gap-4 text-left">
                    {/* Play/Pause icon indicator */}
                    <button
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive 
                          ? 'bg-emerald-500 text-black scale-105' 
                          : 'bg-white/5 text-gray-300 group-hover:bg-emerald-500 group-hover:text-black group-hover:scale-105'
                      }`}
                      id={`track-play-btn-${track.id}`}
                    >
                      {isCurrentPlaying ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      )}
                    </button>

                    <div>
                      <span className={`font-serif text-base font-semibold block transition-colors ${
                        isActive ? 'text-emerald-400' : 'text-white'
                      }`}>
                        {track.title}
                      </span>
                      <span className="font-mono text-[9px] text-gray-400 tracking-wider">
                        {track.mood.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Duration and clouds actions */}
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-xs text-gray-400">
                      {track.duration}
                    </span>

                    {/* Simulating download */}
                    <a
                      href="#"
                      onClick={(e) => { e.stopPropagation(); alert(`Downloading lossy audio file for ${track.title} in the background...`); }}
                      className="p-2 text-gray-500 hover:text-white transition-colors"
                      title="Download Stem"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Master Output Sound Console Panel at bottom */}
          <div className="bg-[#051114] border border-[#11323a] p-5 relative" id="sound-console-deck">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Playback Controls */}
              <div className="md:col-span-3 flex justify-center md:justify-start items-center gap-4">
                <button 
                  onClick={handlePrevTrack}
                  className="p-1.5 text-gray-400 hover:text-white transition-colors"
                  id="console-prev-btn"
                >
                  <SkipBack className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleTrackPlay(currentTrack)}
                  className="w-10 h-10 rounded-full bg-emerald-500 text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
                  id="console-play-btn"
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                </button>
                <button 
                  onClick={handleNextTrack}
                  className="p-1.5 text-gray-400 hover:text-white transition-colors"
                  id="console-next-btn"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Timing Slider */}
              <div className="md:col-span-6 space-y-1 text-left">
                <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
                  <span className="text-emerald-400 font-bold">
                    {isPlaying ? `SIMULATING LIVE AUDIO` : `STATIONARY`}
                  </span>
                  <span>{audioProgress}%</span>
                </div>
                {/* Simulated playback bar */}
                <div 
                  className="w-full h-1.5 bg-black/60 rounded-full cursor-pointer overflow-hidden relative"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const percent = Math.round((clickX / rect.width) * 100);
                    setAudioProgress(percent);
                  }}
                  id="console-progress-track"
                >
                  <div 
                    className="h-full bg-emerald-400 transition-all duration-300"
                    style={{ width: `${audioProgress}%` }}
                  />
                </div>
              </div>

              {/* Volume Controller */}
              <div className="md:col-span-3 flex items-center gap-2 justify-center md:justify-end">
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(parseInt(e.target.value))}
                  className="w-20 accent-emerald-500 bg-[#11323a] h-1 rounded-lg cursor-pointer"
                  id="console-volume-slider"
                />
              </div>
            </div>

            {/* Simulated Live Equalizer Wave */}
            <AnimatePresence>
              {showEq && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 20 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex justify-center items-end gap-[3px] mt-4 pt-3 border-t border-[#11323a]/40"
                  id="console-live-eq"
                >
                  {[...Array(24)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [3, Math.random() * 16 + 4, 3] }}
                      transition={{ repeat: Infinity, duration: 0.5 + i * 0.05, ease: 'linear' }}
                      className="w-[3px] bg-emerald-400/60"
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
