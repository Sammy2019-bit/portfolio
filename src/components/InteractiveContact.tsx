import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, DollarSign, Clock, ShieldCheck, RefreshCw, Layers } from 'lucide-react';

interface InteractiveContactProps {
  selectedService: string;
  onClearService: () => void;
}

export const InteractiveContact: React.FC<InteractiveContactProps> = ({ 
  selectedService, 
  onClearService 
}) => {
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Full-Stack Web App');
  const [complexity, setComplexity] = useState<'simple' | 'medium' | 'complex'>('medium');
  const [timeline, setTimeline] = useState('4-6 Weeks');
  const [customBrief, setCustomBrief] = useState('');

  // Estimator outputs
  const [costEstimate, setCostEstimate] = useState(4500);

  // Status handlers
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionLogs, setSubmissionLogs] = useState<string[]>([]);
  const [submittedData, setSubmittedData] = useState<any | null>(null);

  // Populate selectedService if modified from profile quick actions
  useEffect(() => {
    if (selectedService) {
      setProjectType(selectedService);
    }
  }, [selectedService]);

  // Handle dynamic pricing calculation
  useEffect(() => {
    let basePrice = 2000;
    
    // Base by type
    if (projectType.includes('Full-Stack')) {
      basePrice = 5000;
    } else if (projectType.includes('Performance') || projectType.includes('Overhaul')) {
      basePrice = 3000;
    } else if (projectType.includes('API') || projectType.includes('Backend')) {
      basePrice = 3500;
    } else if (projectType.includes('Design') || projectType.includes('Landing')) {
      basePrice = 2000;
    }

    // Complexity multipliers
    let multiplier = 1.0;
    if (complexity === 'simple') multiplier = 0.75;
    if (complexity === 'complex') multiplier = 1.75;

    // Timeline adjustments (rushed timeline is more expensive)
    let urgencyPremium = 0;
    if (timeline.includes('1-2') || timeline.includes('Rapid')) {
      urgencyPremium = 1000;
    }

    setCostEstimate(Math.round((basePrice * multiplier) + urgencyPremium));
  }, [projectType, complexity, timeline]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Please fill out your name and email to proceed.");
      return;
    }

    setIsSubmitting(true);
    setSubmissionLogs([]);

    const logs = [
      "Establishing connection socket...",
      "Validating project specification metrics...",
      "Drafting dynamic project budget ledger...",
      "Encrypting transmission packet...",
      "Synchronizing client storage records...",
      "Dispatched. Alex Rivera has been notified!"
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setSubmissionLogs(prev => [...prev, log]);
        if (index === logs.length - 1) {
          setTimeout(() => {
            setSubmittedData({
              name,
              email,
              projectType,
              complexity,
              timeline,
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
    <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-6 rounded-2xl flex flex-col gap-6" id="interactive-contact-console">
      {/* Header */}
      <div>
        <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
          <span>Project Estimator & Contact</span>
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">Customize your project scope to receive a baseline budget estimate in real-time.</p>
      </div>

      <AnimatePresence mode="wait">
        {/* State 1: Active Submission Server Log */}
        {isSubmitting && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-slate-950 border border-slate-800 p-5 rounded-xl font-mono text-xs text-emerald-400 flex flex-col gap-2 min-h-[280px] justify-center"
            id="submitting-console-logs"
          >
            <div className="flex items-center gap-2 mb-3">
              <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
              <span className="text-slate-400">TRANSMITTING SECURE PAYLOAD</span>
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
            id="submission-success-receipt"
          >
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-2xl text-emerald-400">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-white font-bold text-base">Inquiry Dispatched Successfully!</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Thank you for reaching out, <span className="text-slate-200 font-semibold">{submittedData.name}</span>. I've received your estimation specification and brief.
              </p>
            </div>

            {/* Receipt details */}
            <div className="w-full bg-slate-900/50 border border-slate-800/80 rounded-xl p-4 text-left font-mono text-xs text-slate-400 flex flex-col gap-2">
              <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                <span>Requested Service:</span>
                <span className="text-white font-semibold">{submittedData.projectType}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                <span>Complexity Tier:</span>
                <span className="text-amber-400 font-semibold capitalize">{submittedData.complexity} Scale</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                <span>Target Timeline:</span>
                <span className="text-white font-semibold">{submittedData.timeline}</span>
              </div>
              <div className="flex justify-between pt-1 font-sans text-sm font-semibold">
                <span className="text-slate-300">Baseline Budget:</span>
                <span className="text-emerald-400">${submittedData.costEstimate.toLocaleString()} - ${(submittedData.costEstimate * 1.25).toLocaleString()} USD</span>
              </div>
            </div>

            <button
              id="btn-receipt-reset"
              onClick={handleResetForm}
              className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 px-4 py-2 rounded-xl text-xs font-semibold transition duration-200 w-full"
            >
              Compose Another Project Inquiry
            </button>
          </motion.div>
        )}

        {/* State 3: Interactive Estimation & Composition Form */}
        {!isSubmitting && !submittedData && (
          <motion.form 
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            id="estimator-contact-form"
          >
            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Your Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="E.g., Elena Vance"
                  className="bg-slate-950/60 border border-slate-800 focus:border-amber-500/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 outline-none transition duration-200"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Your Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Elena@company.com"
                  className="bg-slate-950/60 border border-slate-800 focus:border-amber-500/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 outline-none transition duration-200"
                  required
                />
              </div>
            </div>

            {/* Scope Customizers */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Project Type</label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="bg-slate-950 border border-slate-800 focus:border-amber-500/50 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 outline-none transition duration-200 cursor-pointer appearance-none"
              >
                <option value="Full-Stack Web App">Full-Stack Web App & Dashboard</option>
                <option value="Frontend Performance Overhaul">Frontend Performance Overhaul</option>
                <option value="Custom REST / GraphQL API Backend">Custom REST / GraphQL API Backend</option>
                <option value="Landing Page & Design Audit">Premium Brand Site & Design Audit</option>
              </select>
            </div>

            {/* Complexity & Timeline Side-by-Side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Scale & Complexity</label>
                <div className="grid grid-cols-3 p-1 bg-slate-950 border border-slate-800/80 rounded-xl text-center">
                  {(['simple', 'medium', 'complex'] as const).map((lvl) => (
                    <button
                      type="button"
                      key={lvl}
                      id={`complexity-btn-${lvl}`}
                      onClick={() => setComplexity(lvl)}
                      className={`py-1 rounded-lg text-[10px] font-mono capitalize transition duration-200 ${
                        complexity === lvl 
                          ? 'bg-amber-500 text-slate-950 font-bold' 
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Target Delivery Timeline</label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="bg-slate-950 border border-slate-800 focus:border-amber-500/50 rounded-xl px-3.5 py-2 text-xs text-slate-300 outline-none transition duration-200 cursor-pointer appearance-none h-full"
                >
                  <option value="1-2 Weeks (Rapid)">1-2 Weeks (Rapid Rush)</option>
                  <option value="4-6 Weeks">4-6 Weeks (Recommended)</option>
                  <option value="8+ Weeks">8+ Weeks (Heavy Enterprise)</option>
                </select>
              </div>
            </div>

            {/* Custom Project Brief Text */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Brief Project Overview (Optional)</label>
              <textarea
                value={customBrief}
                onChange={(e) => setCustomBrief(e.target.value)}
                placeholder="Give a brief description of the product or features you need..."
                rows={3}
                className="bg-slate-950/60 border border-slate-800 focus:border-amber-500/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 outline-none transition duration-200 resize-none"
              />
            </div>

            {/* Live Pricing Estimation Block */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-2 rounded-xl text-emerald-400">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Estimated Project Cost</div>
                  <div className="text-base font-bold text-white tracking-tight flex items-center gap-1 mt-0.5">
                    <span className="text-emerald-400 font-mono">${costEstimate.toLocaleString()} - ${(costEstimate * 1.25).toLocaleString()}</span>
                    <span className="text-xs text-slate-500 font-normal">USD</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-500 text-[10px] font-mono">
                <span className="flex items-center gap-1 text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  {timeline}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Guaranteed
                </span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              id="submit-estimate-inquiry"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs transition duration-200 flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Secure Estimator Inquiry</span>
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
