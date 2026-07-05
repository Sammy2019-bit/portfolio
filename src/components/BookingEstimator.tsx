import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, DollarSign, Clock, ShieldCheck, RefreshCw, Volume2 } from 'lucide-react';

interface BookingEstimatorProps {
  selectedService: string;
  onClearService: () => void;
}

export const BookingEstimator: React.FC<BookingEstimatorProps> = ({ 
  selectedService, 
  onClearService 
}) => {
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [serviceType, setServiceType] = useState('Live Hardware Club Set');
  const [venueCapacity, setVenueCapacity] = useState<'small' | 'medium' | 'large'>('medium');
  const [durationHours, setDurationHours] = useState(2);
  const [travelRequired, setTravelRequired] = useState(false);
  const [customBrief, setCustomBrief] = useState('');

  // Estimator outputs
  const [costEstimate, setCostEstimate] = useState(1200);

  // Status handlers
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionLogs, setSubmissionLogs] = useState<string[]>([]);
  const [submittedData, setSubmittedData] = useState<any | null>(null);

  // Populate selectedService if modified from profile quick actions
  useEffect(() => {
    if (selectedService) {
      setServiceType(selectedService);
    }
  }, [selectedService]);

  // Handle dynamic pricing calculation
  useEffect(() => {
    let basePrice = 500;
    
    // Base by type
    if (serviceType.includes('Live')) {
      basePrice = 1200; // Live gigs are premium
    } else if (serviceType.includes('Mixing')) {
      basePrice = 600;
    } else if (serviceType.includes('Mastering')) {
      basePrice = 400;
    } else if (serviceType.includes('Sound Design')) {
      basePrice = 800;
    }

    // Capacity multipliers
    let multiplier = 1.0;
    if (venueCapacity === 'small') multiplier = 0.8;
    if (venueCapacity === 'large') multiplier = 1.8;

    // Set duration multiplier for live gigs
    let durationSurcharge = 0;
    if (serviceType.includes('Live') && durationHours > 2) {
      durationSurcharge = (durationHours - 2) * 300;
    }

    // Travel premium
    let travelPremium = travelRequired ? 500 : 0;

    setCostEstimate(Math.round((basePrice * multiplier) + durationSurcharge + travelPremium));
  }, [serviceType, venueCapacity, durationHours, travelRequired]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Please fill out your name and email to proceed with the booking estimate.");
      return;
    }

    setIsSubmitting(true);
    setSubmissionLogs([]);

    const logs = [
      "Securing booking satellite connection...",
      "Validating sound rider requirements...",
      "Analyzing modular hardware configuration limits...",
      "Calculating signal pipeline budget variables...",
      "Encrypting transmission signal...",
      "Dispatched. Alex River's agency has been notified!"
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setSubmissionLogs(prev => [...prev, log]);
        if (index === logs.length - 1) {
          setTimeout(() => {
            setSubmittedData({
              name,
              email,
              serviceType,
              venueCapacity,
              durationHours,
              travelRequired,
              costEstimate,
              customBrief
            });
            setIsSubmitting(false);
            // Reset form fields
            setName('');
            setEmail('');
            setCustomBrief('');
            onClearService();
          }, 600);
        }
      }, (index + 1) * 450);
    });
  };

  const handleResetForm = () => {
    setSubmittedData(null);
    setSubmissionLogs([]);
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-6 rounded-2xl flex flex-col gap-6" id="booking-estimator-console">
      {/* Header */}
      <div>
        <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />
          <span>Live Booking & Sound Estimator</span>
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">Customize your gig, mix session, or audio master specs for a secure instant quote.</p>
      </div>

      <AnimatePresence mode="wait">
        {/* State 1: Active Submission Server Log */}
        {isSubmitting && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-slate-950 border border-slate-800 p-5 rounded-xl font-mono text-xs text-violet-400 flex flex-col gap-2 min-h-[280px] justify-center text-left"
            id="booking-submitting-logs"
          >
            <div className="flex items-center gap-2 mb-3">
              <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
              <span className="text-slate-400">CONNECTING BOOKING ENGINE</span>
            </div>
            {submissionLogs.map((log, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-1.5"
              >
                <span className="text-slate-600 shrink-0">&gt;</span>
                <span>{log}</span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* State 2: Success Receipt */}
        {!isSubmitting && submittedData && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="bg-slate-950/85 border border-slate-800 p-6 rounded-xl text-center flex flex-col items-center gap-4 justify-center"
            id="booking-success-receipt"
          >
            <div className="bg-violet-500/10 border border-violet-500/30 p-3 rounded-2xl text-violet-400">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-white font-bold text-base">Inquiry Dispatched Successfully!</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Thank you for reaching out, <span className="text-slate-200 font-semibold">{submittedData.name}</span>. I have received your musical specs and we will touch base within 24 hours.
              </p>
            </div>

            {/* Receipt details */}
            <div className="w-full bg-slate-900/50 border border-slate-800/80 rounded-xl p-4 text-left font-mono text-xs text-slate-400 flex flex-col gap-2">
              <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                <span>Requested Service:</span>
                <span className="text-white font-semibold">{submittedData.serviceType}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                <span>Scale / Capacity:</span>
                <span className="text-violet-400 font-semibold capitalize">{submittedData.venueCapacity} Venue</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                <span>Duration / Unit:</span>
                <span className="text-white font-semibold">{submittedData.durationHours} Hours</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                <span>Travel Required:</span>
                <span className="text-white font-semibold">{submittedData.travelRequired ? "Yes (Fares apply)" : "No (Local/Digital)"}</span>
              </div>
              <div className="flex justify-between pt-1 font-sans text-sm font-semibold">
                <span className="text-slate-300">Baseline Budget:</span>
                <span className="text-violet-400">${submittedData.costEstimate.toLocaleString()} - ${(submittedData.costEstimate * 1.2).toLocaleString()} EUR</span>
              </div>
            </div>

            <button
              id="btn-receipt-reset"
              onClick={handleResetForm}
              className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 px-4 py-2 rounded-xl text-xs font-semibold transition duration-200 w-full"
            >
              Compose Another Music Inquiry
            </button>
          </motion.div>
        )}

        {/* State 3: Interactive Estimation & Booking Form */}
        {!isSubmitting && !submittedData && (
          <motion.form 
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 text-left"
            id="booking-estimator-form"
          >
            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Your Name / Agency</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="E.g., Tresor Booking"
                  className="bg-slate-950/60 border border-slate-800 focus:border-violet-500/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 outline-none transition duration-200"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Your Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="booking@agency.de"
                  className="bg-slate-950/60 border border-slate-800 focus:border-violet-500/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 outline-none transition duration-200"
                  required
                />
              </div>
            </div>

            {/* Service Selection */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Service Type</label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="bg-slate-950 border border-slate-800 focus:border-violet-500/50 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 outline-none transition duration-200 cursor-pointer appearance-none"
              >
                <option value="Live Hardware Club Set">Live Hardware Club Set (Improvised Synthesizers)</option>
                <option value="Stereo & Spatial Mixing">Multi-track Stereo / Spatial Mixing</option>
                <option value="Stem Mastering">Dynamic Stem Mastering (Analog Outboard Gear)</option>
                <option value="Custom Modular Sound Design">Custom Modular Sound Design (Games / Visuals)</option>
              </select>
            </div>

            {/* Venue Capacity & Duration Side-by-Side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Venue Size / Scale</label>
                <div className="grid grid-cols-3 p-1 bg-slate-950 border border-slate-800/80 rounded-xl text-center">
                  {(['small', 'medium', 'large'] as const).map((lvl) => (
                    <button
                      type="button"
                      key={lvl}
                      id={`capacity-btn-${lvl}`}
                      onClick={() => setVenueCapacity(lvl)}
                      className={`py-1 rounded-lg text-[10px] font-mono capitalize transition duration-200 ${
                        venueCapacity === lvl 
                          ? 'bg-violet-500 text-white font-bold' 
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {lvl === 'small' ? 'Boutique' : lvl === 'medium' ? 'Standard' : 'Festival'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Set / Session Duration (Hours)</label>
                <input 
                  type="number" 
                  min="1" 
                  max="8" 
                  value={durationHours}
                  onChange={(e) => setDurationHours(parseInt(e.target.value) || 1)}
                  className="bg-slate-950 border border-slate-800 focus:border-violet-500/50 rounded-xl px-3.5 py-1.5 text-xs text-white outline-none transition duration-200"
                />
              </div>
            </div>

            {/* Travel Requirement Toggle */}
            <div className="flex items-center justify-between bg-slate-950/30 border border-slate-800 p-3.5 rounded-xl">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-200">Travel & Lodging Required?</span>
                <span className="text-[10px] text-slate-500">Toggle if flight/accomodation needs budgeting.</span>
              </div>
              <button
                type="button"
                id="btn-toggle-travel"
                onClick={() => setTravelRequired(!travelRequired)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 outline-none ${
                  travelRequired ? 'bg-violet-500' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                    travelRequired ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Custom Notes */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Technical Rider / Special Details (Optional)</label>
              <textarea
                value={customBrief}
                onChange={(e) => setCustomBrief(e.target.value)}
                placeholder="List required sound systems, analog consoles, or custom stem requirements..."
                rows={3}
                className="bg-slate-950/60 border border-slate-800 focus:border-violet-500/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 outline-none transition duration-200 resize-none"
              />
            </div>

            {/* Price Estimation Result Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-violet-500/10 border border-violet-500/30 p-2 rounded-xl text-violet-400">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Estimated Booking Cost</div>
                  <div className="text-base font-bold text-white tracking-tight flex items-center gap-1 mt-0.5">
                    <span className="text-violet-400 font-mono">${costEstimate.toLocaleString()} - ${(costEstimate * 1.2).toLocaleString()}</span>
                    <span className="text-xs text-slate-500 font-normal">EUR</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-500 text-[10px] font-mono">
                <span className="flex items-center gap-1 text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  {durationHours} Hrs set
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-400">
                  <Volume2 className="w-3.5 h-3.5" />
                  Stereo Out
                </span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              id="submit-booking-inquiry"
              className="bg-violet-500 hover:bg-violet-400 text-slate-100 font-bold py-3 px-4 rounded-xl text-xs transition duration-200 flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Booking Inquiry Packet</span>
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
