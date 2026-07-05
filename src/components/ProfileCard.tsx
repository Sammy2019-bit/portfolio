import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DEVELOPER_PROFILE } from '../data/developerData';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  MapPin, 
  Briefcase, 
  CheckCircle2, 
  Copy, 
  Check,
  ExternalLink
} from 'lucide-react';

interface ProfileCardProps {
  onSelectService: (service: string) => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ onSelectService }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(DEVELOPER_PROFILE.socials.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="flex flex-col gap-6 bg-slate-900/60 backdrop-blur-md border border-slate-800 p-6 rounded-2xl text-slate-100" id="profile-card">
      {/* Bio Header */}
      <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start text-center sm:text-left">
        <div className="relative">
          <img 
            src={DEVELOPER_PROFILE.avatar} 
            alt={DEVELOPER_PROFILE.name} 
            referrerPolicy="no-referrer"
            className="w-24 h-24 rounded-2xl object-cover border-2 border-amber-500/30"
          />
          <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-4.5 h-4.5 rounded-full border-2 border-slate-900 flex items-center justify-center" title="Available">
            <span className="absolute w-full h-full rounded-full bg-emerald-400 animate-ping opacity-75"></span>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
            <h1 className="text-2xl font-bold tracking-tight text-white">{DEVELOPER_PROFILE.name}</h1>
            <span className="text-xs text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-full font-mono">{DEVELOPER_PROFILE.pronouns}</span>
          </div>
          <p className="text-amber-400 font-medium text-sm mb-2">{DEVELOPER_PROFILE.title}</p>
          <div className="flex flex-col gap-1 text-xs text-slate-400 font-mono items-center sm:items-start">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              {DEVELOPER_PROFILE.location}
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <Briefcase className="w-3.5 h-3.5 text-emerald-500" />
              {DEVELOPER_PROFILE.availability}
            </span>
          </div>
        </div>
      </div>

      <hr className="border-slate-800" />

      {/* Main Bio */}
      <div className="text-sm leading-relaxed text-slate-300">
        <p>{DEVELOPER_PROFILE.bio}</p>
      </div>

      {/* Numerical Stats */}
      <div className="grid grid-cols-3 gap-3">
        {DEVELOPER_PROFILE.stats.map((stat, idx) => (
          <div key={idx} className="bg-slate-950/40 border border-slate-800/50 p-3 rounded-xl text-center">
            <div className="text-lg font-bold text-white tracking-tight">{stat.value}</div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mt-1 leading-tight">{stat.label}</div>
          </div>
        ))}
      </div>

      <hr className="border-slate-800" />

      {/* Action Buttons & Quick Inquiry Trigger */}
      <div className="flex flex-col gap-2.5">
        <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1">Interactive Services</div>
        <div className="grid grid-cols-2 gap-2">
          <button 
            id="btn-service-fullstack"
            onClick={() => onSelectService('Full-Stack Web App')}
            className="flex items-center justify-between text-left text-xs bg-slate-950/40 hover:bg-slate-950/80 hover:border-amber-500/50 border border-slate-800/50 px-3 py-2.5 rounded-xl transition duration-200 group text-slate-300"
          >
            <span>Full-Stack Development</span>
            <span className="text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
          </button>
          <button 
            id="btn-service-frontend"
            onClick={() => onSelectService('Frontend Performance Overhaul')}
            className="flex items-center justify-between text-left text-xs bg-slate-950/40 hover:bg-slate-950/80 hover:border-amber-500/50 border border-slate-800/50 px-3 py-2.5 rounded-xl transition duration-200 group text-slate-300"
          >
            <span>Frontend Optimizations</span>
            <span className="text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
          </button>
        </div>
      </div>

      <hr className="border-slate-800" />

      {/* Social Connection Hub */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          {/* Email Copy Box */}
          <button 
            id="btn-copy-email"
            onClick={handleCopyEmail}
            className="flex-1 flex items-center justify-between bg-slate-950/50 border border-slate-800 hover:border-slate-700 hover:bg-slate-950 px-3.5 py-2.5 rounded-xl text-xs font-mono text-slate-300 transition-all duration-200 text-left"
          >
            <span className="truncate">{DEVELOPER_PROFILE.socials.email}</span>
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <Copy className="w-4 h-4 text-slate-500 hover:text-slate-300 shrink-0" />
            )}
          </button>
        </div>

        {/* Social Grid */}
        <div className="flex gap-2">
          <a 
            href={DEVELOPER_PROFILE.socials.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-slate-950/40 hover:bg-slate-950 border border-slate-800 hover:border-slate-700 py-2 rounded-xl text-xs text-slate-400 hover:text-white transition duration-200"
            id="social-github"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          <a 
            href={DEVELOPER_PROFILE.socials.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-slate-950/40 hover:bg-slate-950 border border-slate-800 hover:border-slate-700 py-2 rounded-xl text-xs text-slate-400 hover:text-white transition duration-200"
            id="social-linkedin"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
          <a 
            href={DEVELOPER_PROFILE.socials.twitter} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-slate-950/40 hover:bg-slate-950 border border-slate-800 hover:border-slate-700 py-2 rounded-xl text-xs text-slate-400 hover:text-white transition duration-200"
            id="social-twitter"
          >
            <Twitter className="w-4 h-4" />
            <span>Twitter</span>
          </a>
        </div>
      </div>
    </div>
  );
};
