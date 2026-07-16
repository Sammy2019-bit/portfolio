import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, ShieldAlert, FileText, Sparkles, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const JazzContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Custom Beat Production',
    budget: '500',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API delivery
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        inquiryType: 'Custom Beat Production',
        budget: '500',
        message: '',
      });
    }, 1800);
  };

  return (
    <section id="contact" className="bg-[#050d10] py-24 border-t border-[#0f242a] relative overflow-hidden">
      {/* Decorative vertical lines and background grids */}
      <div className="absolute top-0 bottom-0 left-[20%] w-[1px] bg-emerald-500/5 hidden md:block" />
      <div className="absolute top-0 bottom-0 right-[20%] w-[1px] bg-emerald-500/5 hidden md:block" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16 space-y-4">
          <span className="font-mono text-[10px] tracking-[0.3em] text-emerald-400 uppercase block">
            CONTACT & BOOKING AGENT
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-white tracking-wide relative inline-block pb-3">
            Inquire Production Services
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-[2px] bg-emerald-500" />
          </h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed font-sans font-light">
            Inquire about custom beat commissions, stems packages, live saxophone session bookings, or mechanical licensing rights. Get a custom contract estimate.
          </p>
        </div>

        {/* Contact Container Box */}
        <div className="bg-[#08181c] border border-[#11323a] shadow-2xl overflow-hidden relative" id="contact-box">
          <AnimatePresence mode="wait">
            {!success ? (
              <motion.form 
                key="contact-form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="p-8 md:p-12 space-y-6 text-left"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] tracking-widest text-gray-400 uppercase block">Your Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Quincy Miles"
                      className="w-full bg-[#050d10] border border-[#11323a] text-white py-3 px-4 text-sm focus:outline-none focus:border-emerald-500 font-sans transition-colors duration-200"
                      id="contact-field-name"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] tracking-widest text-gray-400 uppercase block">Your Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. quincy@recordlabel.com"
                      className="w-full bg-[#050d10] border border-[#11323a] text-white py-3 px-4 text-sm focus:outline-none focus:border-emerald-500 font-sans transition-colors duration-200"
                      id="contact-field-email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Inquiry Type */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] tracking-widest text-gray-400 uppercase block">Production Inquiry Type</label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full bg-[#050d10] border border-[#11323a] text-white py-3 px-3 text-sm focus:outline-none focus:border-emerald-500 font-mono"
                      id="contact-field-type"
                    >
                      <option value="Custom Beat Production">Custom Beat Production</option>
                      <option value="Saxophone Session Work">Saxophone Session Work</option>
                      <option value="Concert & Live Booking">Concert & Live Booking</option>
                      <option value="Stem Licensing & Clearance">Stem Licensing & Clearance</option>
                      <option value="Mechanical Rights / Other">Mechanical Rights / Other</option>
                    </select>
                  </div>

                  {/* Estimated Budget */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="font-mono text-[9px] tracking-widest text-gray-400 uppercase block">Estimated Budget (USD)</label>
                      <span className="font-mono text-xs text-emerald-400 font-bold">${formData.budget}</span>
                    </div>
                    <div className="pt-2">
                      <input 
                        type="range" 
                        min="100" 
                        max="5000" 
                        step="50"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full accent-emerald-500 bg-[#0c2328] h-1.5 rounded-lg cursor-pointer"
                        id="contact-field-budget"
                      />
                      <div className="flex justify-between text-[8px] font-mono text-gray-500 mt-1">
                        <span>$100 INDIE</span>
                        <span>$5,000 EXCLUSIVE RECORDING</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message description */}
                <div className="space-y-1.5">
                  <label className="font-mono text-[9px] tracking-widest text-gray-400 uppercase block">Detailed Project Specifications</label>
                  <textarea 
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your audio specifications (key signatures, reference tempos, license terms or show date details)..."
                    className="w-full bg-[#050d10] border border-[#11323a] text-white py-3 px-4 text-sm focus:outline-none focus:border-emerald-500 font-sans transition-colors duration-200"
                    id="contact-field-message"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-[#0c242b] disabled:text-gray-500 text-[#050d10] font-semibold text-xs tracking-[0.25em] uppercase transition-all duration-300 rounded-none flex items-center justify-center gap-2 cursor-pointer"
                  id="contact-submit-btn"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#050d10] border-t-transparent rounded-full animate-spin" />
                      Dispatching Specs...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 shrink-0" />
                      Submit Production Specification Sheet
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              /* Success screen */
              <motion.div 
                key="contact-success"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 text-center space-y-6"
                id="contact-success-panel"
              >
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 animate-bounce" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-2xl text-white font-bold">Specs Received!</h3>
                  <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                    billosongs' engineering team has logged your specifications. We will evaluate references, licensing terms, and scheduling availability within 24 working hours.
                  </p>
                </div>

                <button
                  onClick={() => setSuccess(false)}
                  className="px-6 py-2.5 bg-[#0a1e23] hover:bg-[#11323a] text-white border border-[#11323a] font-semibold text-xs tracking-[0.2em] uppercase transition-colors duration-300 rounded-none"
                  id="contact-reset-btn"
                >
                  Send Another Inquiry
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
