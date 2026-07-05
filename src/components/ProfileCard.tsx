import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ARTIST_PROFILE } from '../data/artistData';
import { 
  Compass, 
  MapPin, 
  Headphones, 
  Check, 
  Copy, 
  Instagram, 
  Flame, 
  Mail,
  Disc,
  ArrowRight
} from 'lucide-react';

interface ProfileCardProps {
  onSelectService: (service: string) => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ onSelectService }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(ARTIST_PROFILE.socials.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="flex flex-col gap-6 bg-slate-900/60 backdrop-blur-md border border-slate-800 p-4 sm:p-6 rounded-2xl text-slate-100" id="profile-card">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start text-center sm:text-left">
        <div className="relative shrink-0">
          <img 
            src={ARTIST_PROFILE.avatar} 
            alt={ARTIST_PROFILE.name} 
            referrerPolicy="no-referrer"
            className="w-24 h-24 rounded-2xl object-cover border-2 border-violet-500/30"
          />
          {/* Active Status Badge */}
          <div className="absolute -bottom-1 -right-1 bg-violet-500 w-4.5 h-4.5 rounded-full border-2 border-slate-900 flex items-center justify-center" title="Live/Studio Active">
            <span className="absolute w-full h-full rounded-full bg-violet-400 animate-ping opacity-75"></span>
            <Headphones className="w-2.5 h-2.5 text-slate-900" />
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
            <h1 className="text-2xl font-bold tracking-tight text-white">{ARTIST_PROFILE.name}</h1>
            <span className="text-[10px] text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full font-mono border border-violet-500/20">{ARTIST_PROFILE.alias}</span>
          </div>
          <p className="text-amber-400 font-medium text-xs mb-3 font-mono">{ARTIST_PROFILE.title}</p>
          <div className="flex flex-col gap-1 text-xs text-slate-400 font-mono items-center sm:items-start">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              {ARTIST_PROFILE.location}
            </span>
            <span className="flex items-center gap-1.5 text-violet-400 font-medium">
              <Compass className="w-3.5 h-3.5 text-violet-500" />
              {ARTIST_PROFILE.availability}
            </span>
          </div>
        </div>
      </div>

      <hr className="border-slate-800" />

      {/* Bio Description */}
      <div className="text-sm leading-relaxed text-slate-300">
        <p>{ARTIST_PROFILE.bio}</p>
      </div>

      {/* Musical Metrics */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {ARTIST_PROFILE.stats.map((stat, idx) => (
          <div key={idx} className="bg-slate-950/40 border border-slate-800/50 p-2 sm:p-3 rounded-xl text-center">
            <div className="text-lg font-bold text-white tracking-tight font-mono">{stat.value}</div>
            <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold mt-1 leading-tight">{stat.label}</div>
          </div>
        ))}
      </div>

      <hr className="border-slate-800" />

      {/* Interactive Quick Booking Prompts */}
      <div className="flex flex-col gap-2.5">
        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Studio & Gig Booking</div>
        <div className="flex flex-col gap-2">
          <button 
            id="btn-service-gigs"
            onClick={() => onSelectService('Live Hardware Club Set')}
            className="flex items-center justify-between text-left text-xs bg-slate-950/40 hover:bg-slate-950 hover:border-violet-500/40 border border-slate-800/50 px-3 py-2.5 rounded-xl transition duration-200 group text-slate-300"
          >
            <div className="flex items-center gap-2">
              <Flame className="w-3.5 h-3.5 text-violet-400 group-hover:animate-pulse" />
              <span>Book Live Hardware Set</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-violet-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
          </button>
          
          <button 
            id="btn-service-mixing"
            onClick={() => onSelectService('Stereo & Spatial Mixing')}
            className="flex items-center justify-between text-left text-xs bg-slate-950/40 hover:bg-slate-950 hover:border-amber-500/40 border border-slate-800/50 px-3 py-2.5 rounded-xl transition duration-200 group text-slate-300"
          >
            <div className="flex items-center gap-2">
              <Disc className="w-3.5 h-3.5 text-amber-500 group-hover:rotate-45 transition-transform" />
              <span>Hire for Mixing & Mastering</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-amber-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
          </button>
        </div>
      </div>

      <hr className="border-slate-800" />

      {/* Social Outlets & Copying Email */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <button 
            id="btn-copy-email"
            onClick={handleCopyEmail}
            className="flex-1 flex items-center justify-between bg-slate-950/50 border border-slate-800 hover:border-slate-700 hover:bg-slate-950 px-3.5 py-2.5 rounded-xl text-xs font-mono text-slate-300 transition-all duration-200 text-left"
          >
            <span className="truncate">{ARTIST_PROFILE.socials.email}</span>
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <Copy className="w-4 h-4 text-slate-500 hover:text-slate-300 shrink-0" />
            )}
          </button>
        </div>

        {/* Music Platforms Grid */}
        <div className="grid grid-cols-2 gap-2 text-center">
          <a 
            href={ARTIST_PROFILE.socials.spotify} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-slate-950/40 hover:bg-slate-950 border border-slate-800 hover:border-slate-700 py-2 rounded-xl text-xs text-slate-400 hover:text-emerald-400 transition duration-200"
            id="social-spotify"
          >
            <Headphones className="w-3.5 h-3.5" />
            <span>Spotify</span>
          </a>
          <a 
            href={ARTIST_PROFILE.socials.soundcloud} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-slate-950/40 hover:bg-slate-950 border border-slate-800 hover:border-slate-700 py-2 rounded-xl text-xs text-slate-400 hover:text-amber-500 transition duration-200"
            id="social-soundcloud"
          >
            <Disc className="w-3.5 h-3.5" />
            <span>SoundCloud</span>
          </a>
          <a 
            href={ARTIST_PROFILE.socials.bandcamp} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-slate-950/40 hover:bg-slate-950 border border-slate-800 hover:border-slate-700 py-2 rounded-xl text-xs text-slate-400 hover:text-teal-400 transition duration-200"
            id="social-bandcamp"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Bandcamp</span>
          </a>
          <a 
            href={ARTIST_PROFILE.socials.instagram} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-slate-950/40 hover:bg-slate-950 border border-slate-800 hover:border-slate-700 py-2 rounded-xl text-xs text-slate-400 hover:text-violet-400 transition duration-200"
            id="social-instagram"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </div>
  );
};
