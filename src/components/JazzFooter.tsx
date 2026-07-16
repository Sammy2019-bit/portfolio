import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BILLO_SOCIALS } from '../data/jazzData';
import { Mail, Instagram, Youtube, Disc, Send, ArrowUp, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onScrollToTop: () => void;
}

export const JazzFooter: React.FC<FooterProps> = ({ onScrollToTop }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#030a0c] border-t border-[#0e242a] pt-16 pb-8 relative overflow-hidden" id="jazz-footer">
      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-12">
        
        {/* Core footer columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#0e242a]/60">
          
          {/* Logo brand */}
          <div className="md:col-span-4 space-y-4 text-left">
            <div className="flex flex-col">
              <span className="font-serif text-xl tracking-[0.2em] text-white font-bold">
                BILLOSONGS
              </span>
              <span className="font-mono text-[9px] tracking-[0.35em] text-emerald-500 font-medium -mt-1">
                NIGERIAN JAZZ STUDIO
              </span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              An interactive classical portfolio simulation. Blending vintage West African highlife rhythms and smoky Nigerian Jazz with custom-engineered 808 sub trap synthesis.
            </p>
          </div>

          {/* Social Platforms links */}
          <div className="md:col-span-4 text-left space-y-4">
            <span className="font-mono text-[9px] tracking-[0.25em] text-emerald-400 uppercase block">
              SOCIAL CHANNELS
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {BILLO_SOCIALS.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  id={`footer-social-${soc.name.toLowerCase()}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                  <span>{soc.name}</span>
                  <ArrowRight className="w-3 h-3 text-emerald-500 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                </a>
              ))}
            </div>
          </div>

          {/* Subscribe newsletter form */}
          <div className="md:col-span-4 text-left space-y-4">
            <span className="font-mono text-[9px] tracking-[0.25em] text-emerald-400 uppercase block">
              RELEASE TELEMETRY
            </span>
            <p className="text-gray-400 text-xs leading-relaxed">
              Stay updated on new limited beat leases, instrument loops, stem clearance dates, and venue show schedules.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="bg-[#050d10] border border-[#11323a] text-xs text-white py-2 px-3 focus:outline-none focus:border-emerald-500 flex-1"
                id="footer-newsletter-input"
              />
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-400 text-[#050d10] p-2 transition-colors cursor-pointer flex items-center justify-center shrink-0"
                id="footer-newsletter-submit"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <AnimatePresence>
              {subscribed && (
                <motion.span 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="text-[10px] text-emerald-400 font-mono block"
                >
                  ✓ Subscribed successfully to billosongs releases.
                </motion.span>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Lower row */}
        <div className="flex flex-col md:flex-row items-center justify-between text-[11px] font-mono text-gray-500 gap-4">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>© 2026 billosongs. Engineered in classical dark gold-and-teal LUXA layouts.</span>
          </div>
          
          <button
            onClick={onScrollToTop}
            className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors cursor-pointer group"
            id="footer-scroll-top-btn"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
};
