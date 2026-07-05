import React from 'react';
import { BookingEstimator } from './BookingEstimator';
import { Mail, Globe, MapPin, Sparkles, Building, Headphones } from 'lucide-react';

interface ContactPageProps {
  selectedService: string;
  onClearService: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ 
  selectedService, 
  onClearService 
}) => {
  return (
    <div className="flex flex-col gap-8 text-left" id="contact-page-view">
      {/* Header Info */}
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Mail className="w-5 h-5 text-violet-400" />
          <span>Agency Bookings & General Contacts</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">Get in touch for live modular performances, studio mixing/mastering sessions, or press licenses.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Booking Estimator form */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <BookingEstimator 
            selectedService={selectedService} 
            onClearService={onClearService} 
          />
        </div>

        {/* Right Column: Representation details, social channels, and physical studio coords */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Booking Agency Info */}
          <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl flex flex-col gap-4">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2.5">
              <Building className="w-4 h-4 text-violet-400" />
              <span>Agency Representation</span>
            </h3>

            <div className="flex flex-col gap-4">
              {/* European Agency */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase">Europe & ROW (Live Gigs)</span>
                <span className="text-xs font-bold text-slate-200">Raptor Booking Berlin</span>
                <a href="mailto:jonas@raptorbooking.de" className="text-xs text-violet-400 hover:underline mt-0.5 font-mono">jonas@raptorbooking.de</a>
              </div>

              {/* Americas Agency */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase">Americas & Asia (Live Gigs)</span>
                <span className="text-xs font-bold text-slate-200">Astral Agent SF</span>
                <a href="mailto:book@astralagency.com" className="text-xs text-violet-400 hover:underline mt-0.5 font-mono">book@astralagency.com</a>
              </div>

              {/* Sync & Press */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase">Sync Licensing / Remix Requests</span>
                <span className="text-xs font-bold text-slate-200">RIVER_GLOW Music</span>
                <a href="mailto:buttysongs@gmail.com" className="text-xs text-violet-400 hover:underline mt-0.5 font-mono">buttysongs@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Physical Location map coordinates */}
          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex flex-col gap-3">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-violet-400" />
              <span>Studio Telemetry Coordinates</span>
            </h3>

            <div className="grid grid-cols-2 gap-4 mt-1">
              <div className="bg-slate-900/50 border border-slate-800/60 p-3 rounded-xl text-center flex flex-col items-center">
                <span className="text-[9px] font-mono text-slate-500 uppercase">BERLIN LAB</span>
                <span className="text-xs font-bold text-slate-200 mt-1">Kreuzberg</span>
                <span className="text-[9px] font-mono text-slate-500 mt-0.5">52.4986&deg; N, 13.4069&deg; E</span>
              </div>
              
              <div className="bg-slate-900/50 border border-slate-800/60 p-3 rounded-xl text-center flex flex-col items-center">
                <span className="text-[9px] font-mono text-slate-500 uppercase">SF LAB</span>
                <span className="text-xs font-bold text-slate-200 mt-1">Mission Dist.</span>
                <span className="text-[9px] font-mono text-slate-500 mt-0.5">37.7599&deg; N, 122.4148&deg; W</span>
              </div>
            </div>
          </div>

          {/* Prompt regarding feedback */}
          <div className="bg-gradient-to-r from-violet-500/10 to-indigo-500/5 border border-violet-500/15 p-4 rounded-xl flex items-start gap-3">
            <Headphones className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200 font-semibold">Technical Rider compliance:</strong> Live hardware sets are backed by professional tech riders. For any custom mixer requirements, outboard limiters, or spatial audio configurations, please detail them in your booking inquiry brief.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
