import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Release } from '../types';
import { RELEASES_DATA } from '../data/artistData';
import { Play, Pause, Disc, Star, Volume2, Calendar, Share2, Music, X, Heart, Headphones } from 'lucide-react';

export const ReleaseShowcase: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'album' | 'single' | 'remix'>('all');
  const [currentTrack, setCurrentTrack] = useState<Release | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const [likedTracks, setLikedTracks] = useState<Record<string, boolean>>({});
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Playback timers
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        if (audioRef.current) {
          const duration = audioRef.current.duration || 180; // default max or actual
          const current = audioRef.current.currentTime;
          setTrackProgress((current / duration) * 100);
          if (audioRef.current.ended) {
            setIsPlaying(false);
            setTrackProgress(0);
          }
        }
      }, 350);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleTrackToggle = (track: Release) => {
    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play().catch(err => console.log("Audio play error", err));
        setIsPlaying(true);
      }
    } else {
      // Set new track
      setCurrentTrack(track);
      setIsPlaying(false);
      setTrackProgress(0);
      
      // Delay slightly to allow state to bind
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.src = track.audioUrl || '';
          audioRef.current.load();
          audioRef.current.play()
            .then(() => setIsPlaying(true))
            .catch(err => {
              console.log("Audio play error", err);
              // Fallback to simulation if audio load blocked
              setIsPlaying(true);
            });
        }
      }, 100);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    setTrackProgress(newProgress);
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
    }
  };

  const handleLikeToggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedTracks(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredReleases = RELEASES_DATA.filter(rel => {
    if (filter === 'all') return true;
    return rel.type === filter;
  });

  return (
    <div className="flex flex-col gap-6" id="release-showcase">
      {/* Hidden audio tag for real streaming previews */}
      <audio ref={audioRef} className="hidden" preload="auto" />

      {/* Header section with category filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Disc className={`w-5 h-5 text-violet-400 ${isPlaying ? 'animate-spin' : ''}`} />
            <span>Interactive Discography</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Listen to streaming previews. Toggle type filters or download logs directly.</p>
        </div>

        {/* Dynamic Category Selector */}
        <div className="flex flex-wrap p-1 bg-slate-950/80 border border-slate-800/80 rounded-xl max-w-max">
          {(['all', 'album', 'single', 'remix'] as const).map((cat) => (
            <button
              key={cat}
              id={`release-filter-${cat}`}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition duration-200 capitalize ${
                filter === cat
                  ? 'bg-violet-500 text-slate-100 font-bold shadow-lg shadow-violet-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {cat === 'all' ? 'All Releases' : `${cat}s`}
            </button>
          ))}
        </div>
      </div>

      {/* Audio player HUD bar if a track has been loaded */}
      <AnimatePresence>
        {currentTrack && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="bg-slate-950 border border-violet-500/20 p-4 rounded-xl flex flex-col gap-3"
            id="audio-player-hud"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0">
                  <img 
                    src={currentTrack.image} 
                    alt={currentTrack.title} 
                    className={`w-10 h-10 object-cover rounded-lg border border-slate-800 ${isPlaying ? 'animate-spin' : ''}`} 
                    style={{ animationDuration: '6s' }}
                  />
                  <div className="absolute inset-0 bg-slate-900/40 rounded-lg flex items-center justify-center">
                    <Music className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-mono text-violet-400 font-semibold uppercase leading-none">Now Auditioning</p>
                  <h4 className="text-sm font-bold text-white truncate mt-1">{currentTrack.title}</h4>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button
                  id="btn-hud-play-toggle"
                  onClick={() => handleTrackToggle(currentTrack)}
                  className="bg-violet-500 hover:bg-violet-400 text-slate-100 p-2.5 rounded-xl transition duration-200"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-100" />}
                </button>
                <button
                  id="btn-hud-close"
                  onClick={() => {
                    audioRef.current?.pause();
                    setIsPlaying(false);
                    setCurrentTrack(null);
                  }}
                  className="bg-slate-900 border border-slate-800 text-slate-400 hover:text-white p-2.5 rounded-xl transition duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Custom Interactive Progress Bar slider */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-slate-500">0:00</span>
              <input 
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={trackProgress}
                onChange={handleProgressChange}
                className="flex-1 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
              />
              <span className="text-[10px] font-mono text-slate-500">
                {audioRef.current && audioRef.current.duration 
                  ? `${Math.floor(audioRef.current.duration / 60)}:${Math.floor(audioRef.current.duration % 60).toString().padStart(2, '0')}` 
                  : "3:00"}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid distribution */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredReleases.map((release) => {
            const isThisTrackActive = currentTrack?.id === release.id;
            const isLiked = !!likedTracks[release.id];

            return (
              <motion.div
                key={release.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group bg-slate-900/40 hover:bg-slate-900/70 border border-slate-800 hover:border-slate-700/80 rounded-xl overflow-hidden flex flex-col h-full transition duration-300"
                id={`release-card-${release.id}`}
              >
                {/* Artwork Area */}
                <div className="relative aspect-video overflow-hidden bg-slate-950">
                  <img 
                    src={release.image} 
                    alt={release.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

                  {/* Play Action Layer Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-950/50">
                    <button
                      id={`btn-card-play-${release.id}`}
                      onClick={() => handleTrackToggle(release)}
                      className="bg-violet-500 hover:bg-violet-400 text-slate-100 p-4 rounded-full shadow-2xl scale-95 group-hover:scale-100 transition duration-200 flex items-center justify-center"
                    >
                      {isThisTrackActive && isPlaying ? (
                        <Pause className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6 fill-slate-100" />
                      )}
                    </button>
                  </div>

                  {/* Top Stats/Badges */}
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    {release.metrics.streams && (
                      <span className="flex items-center gap-1 bg-slate-950/85 border border-slate-800 text-slate-300 px-2 py-0.5 rounded-md text-[10px] font-mono leading-none">
                        <Headphones className="w-3 h-3 text-violet-400" />
                        {release.metrics.streams} plays
                      </span>
                    )}
                    {release.metrics.beatportRank && (
                      <span className="flex items-center gap-1 bg-slate-950/85 border border-slate-800 text-amber-400 px-2 py-0.5 rounded-md text-[10px] font-mono leading-none">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        {release.metrics.beatportRank}
                      </span>
                    )}
                  </div>

                  {/* Type Badge */}
                  <span className="absolute top-3 right-3 text-[10px] font-mono font-semibold uppercase bg-slate-950/90 border border-slate-800/80 px-2.5 py-0.5 rounded-full text-slate-400 tracking-wider">
                    {release.type}
                  </span>

                  {/* Like Button */}
                  <button
                    id={`btn-like-${release.id}`}
                    onClick={(e) => handleLikeToggle(release.id, e)}
                    className="absolute top-3 left-3 bg-slate-950/80 hover:bg-slate-950 border border-slate-800 p-2 rounded-xl text-slate-400 hover:text-rose-500 transition-all duration-200"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'text-rose-500 fill-rose-500' : ''}`} />
                  </button>
                </div>

                {/* Details Area */}
                <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                  <div className="flex flex-col gap-2 text-left">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-bold text-white text-base group-hover:text-violet-400 transition-colors duration-200">
                        {release.title}
                      </h3>
                      <span className="flex items-center gap-1 text-[10px] text-slate-500 font-mono">
                        <Calendar className="w-3 h-3" />
                        {release.releaseDate.split('-')[0]}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {release.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    {/* Tags row */}
                    <div className="flex flex-wrap gap-1.5">
                      {release.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <hr className="border-slate-800/60" />

                    {/* Direct Quick Listen & Sim Action */}
                    <div className="flex items-center justify-between text-xs">
                      <button 
                        id={`btn-audition-${release.id}`}
                        onClick={() => handleTrackToggle(release)}
                        className="text-violet-400 hover:text-violet-300 font-medium flex items-center gap-1.5 transition duration-150"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{isThisTrackActive && isPlaying ? "Pause Preview" : "Audition Track"}</span>
                      </button>

                      <button 
                        id={`btn-share-${release.id}`}
                        onClick={() => alert(`Direct link copied to clipboard for: ${release.title}`)}
                        className="text-slate-500 hover:text-slate-300 p-1 rounded transition duration-150"
                        title="Copy track link"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
