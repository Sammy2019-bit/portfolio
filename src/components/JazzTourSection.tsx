import React, { useState } from 'react';
import { TOUR_DATES, TourDate } from '../data/jazzData';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, X, Ticket, ShieldCheck, CheckCircle2, CreditCard } from 'lucide-react';

export const JazzTourSection: React.FC = () => {
  const [selectedTour, setSelectedTour] = useState<TourDate | null>(null);
  const [ticketQty, setTicketQty] = useState(2);
  const [ticketTier, setTicketTier] = useState<'Standard' | 'VIP' | 'Backstage'>('Standard');
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'success'>('details');

  const tierPrices = {
    Standard: 65,
    VIP: 150,
    Backstage: 295
  };

  const handleOpenCheckout = (tour: TourDate) => {
    if (tour.status === 'Sold Out') return;
    setSelectedTour(tour);
    setTicketQty(2);
    setTicketTier('Standard');
    setCheckoutStep('details');
  };

  const handleCloseCheckout = () => {
    setSelectedTour(null);
  };

  const handleCompletePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('success');
  };

  const totalPrice = tierPrices[ticketTier] * ticketQty;

  return (
    <section 
      id="tour" 
      className="relative py-28 flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1486591978090-58e619d37fe7')] bg-cover bg-center bg-blend-multiply bg-[#031317] overflow-hidden"
    >
      {/* Absolute Overlays for Classical Teal Wood Integration */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050d10] via-transparent to-[#050d10]" />
      <div className="absolute inset-0 bg-[#061c22]/80 mix-blend-multiply" />

      <div className="max-w-4xl mx-auto px-6 w-full relative z-10">
        
        {/* Transparent Glass Card Container */}
        <div 
          className="bg-[#050d10]/85 backdrop-blur-md border border-[#11323a] p-8 md:p-12 shadow-2xl relative"
          id="tour-glass-card"
        >
          {/* Subtle gold-teal visual bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />

          {/* Heading */}
          <div className="mb-10 text-left">
            <h2 className="font-serif text-3xl md:text-4xl text-white tracking-wide relative inline-block pb-3">
              My Tour
              <span className="absolute bottom-0 left-0 w-20 h-[2px] bg-emerald-500" />
            </h2>
          </div>

          {/* Schedule Table */}
          <div className="space-y-4" id="tour-dates-list">
            {TOUR_DATES.map((tour) => {
              const isSoldOut = tour.status === 'Sold Out';
              const isLimited = tour.status === 'Limited';

              return (
                <div 
                  key={tour.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-5 border-b border-[#11323a] hover:bg-emerald-500/5 px-3 transition-colors duration-300 group"
                  id={`tour-row-${tour.id}`}
                >
                  {/* Date Column */}
                  <div className="md:col-span-3 flex flex-col justify-center">
                    <span className="font-serif text-xl md:text-2xl text-white font-semibold tracking-wider block">
                      {tour.monthDay}
                    </span>
                    <span className="font-mono text-[10px] text-emerald-400 tracking-widest mt-0.5">
                      {tour.year}
                    </span>
                  </div>

                  {/* Venue & City Column */}
                  <div className="md:col-span-6 flex flex-col text-left">
                    <span className="font-serif text-lg text-white font-medium group-hover:text-emerald-300 transition-colors">
                      {tour.venue}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{tour.city}</span>
                    </div>
                  </div>

                  {/* Booking / Status Column */}
                  <div className="md:col-span-3 flex justify-start md:justify-end items-center">
                    {isSoldOut ? (
                      <span className="px-5 py-2.5 border border-red-500/30 text-red-400 font-mono text-[10px] tracking-widest uppercase w-full md:w-auto text-center bg-red-950/20">
                        Sold Out
                      </span>
                    ) : (
                      <button
                        onClick={() => handleOpenCheckout(tour)}
                        className={`w-full md:w-auto px-6 py-2.5 text-center font-mono text-[10px] tracking-[0.2em] uppercase font-bold border rounded-none transition-all duration-300 cursor-pointer ${
                          isLimited 
                            ? 'bg-amber-600 border-amber-600 text-white hover:bg-amber-500 hover:border-amber-500' 
                            : 'bg-transparent border-gray-400 text-white hover:bg-white hover:text-black hover:border-white'
                        }`}
                        id={`book-btn-${tour.id}`}
                      >
                        {isLimited ? 'Limited' : 'Tickets'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* Ticket Checkout Simulator Modal */}
      <AnimatePresence>
        {selectedTour && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseCheckout}
              className="absolute inset-0 bg-[#020506]/95 backdrop-blur-sm"
              id="checkout-modal-backdrop"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="bg-[#051114] border border-[#11323a] w-full max-w-lg shadow-2xl relative z-10 overflow-hidden"
              id="checkout-modal-container"
            >
              {/* Header */}
              <div className="bg-[#0a1e23] border-b border-[#11323a] px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-emerald-400 animate-pulse" />
                  <span className="font-serif text-base text-white tracking-wide font-medium">Ticket Booking Simulation</span>
                </div>
                <button 
                  onClick={handleCloseCheckout}
                  className="p-1 text-gray-400 hover:text-white transition-colors"
                  id="checkout-close-btn"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {checkoutStep === 'details' ? (
                <form onSubmit={handleCompletePurchase} className="p-6 space-y-6">
                  {/* Event Details Card */}
                  <div className="bg-[#0c242b] border border-[#143d47] p-4 text-left">
                    <span className="font-mono text-[9px] tracking-widest text-emerald-400 block mb-1">SELECTED SHOW //</span>
                    <h4 className="font-serif text-lg text-white font-semibold leading-snug">{selectedTour.venue}</h4>
                    <div className="flex items-center gap-4 mt-2 font-mono text-[10px] text-gray-300">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                        {selectedTour.monthDay}, {selectedTour.year}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        {selectedTour.city}
                      </span>
                    </div>
                  </div>

                  {/* Select Ticket Tier */}
                  <div className="space-y-3 text-left">
                    <label className="font-mono text-[10px] tracking-widest text-gray-400 uppercase block">Ticket Package Level</label>
                    <div className="grid grid-cols-3 gap-3">
                      {(['Standard', 'VIP', 'Backstage'] as const).map((tier) => (
                        <button
                          key={tier}
                          type="button"
                          onClick={() => setTicketTier(tier)}
                          className={`p-3 border text-left flex flex-col justify-between transition-all duration-200 ${
                            ticketTier === tier 
                              ? 'border-emerald-400 bg-[#0c242b]' 
                              : 'border-[#11323a] bg-transparent hover:border-gray-500'
                          }`}
                          id={`tier-select-${tier}`}
                        >
                          <span className={`font-serif text-sm font-semibold ${ticketTier === tier ? 'text-emerald-400' : 'text-white'}`}>
                            {tier}
                          </span>
                          <span className="font-mono text-[11px] text-gray-300 mt-2">
                            ${tierPrices[tier]}
                          </span>
                        </button>
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400 block pt-1 font-sans">
                      {ticketTier === 'Standard' && '★ Entrance access to general floor.'}
                      {ticketTier === 'VIP' && '★ Fast-track skip row line, VIP floor access & 1 premium beverage.'}
                      {ticketTier === 'Backstage' && '★ Direct dressing room meet, signed vinyl bundle & acoustic rehearsal pass.'}
                    </span>
                  </div>

                  {/* Quantity and Calculations */}
                  <div className="grid grid-cols-2 gap-4 items-center">
                    <div className="space-y-1.5 text-left">
                      <label className="font-mono text-[10px] tracking-widest text-gray-400 uppercase block">Quantity</label>
                      <input 
                        type="number" 
                        min="1" 
                        max="8" 
                        value={ticketQty}
                        onChange={(e) => setTicketQty(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full bg-[#031317] border border-[#11323a] text-white py-2 px-3 text-sm focus:outline-none focus:border-emerald-500 font-mono"
                        id="checkout-quantity-input"
                      />
                    </div>
                    <div className="text-right space-y-1">
                      <span className="font-mono text-[10px] tracking-widest text-gray-400 uppercase block">Subtotal</span>
                      <span className="font-serif text-2xl text-emerald-400 font-bold">
                        ${totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Fields */}
                  <div className="space-y-3 pt-3 border-t border-[#11323a]">
                    <span className="font-mono text-[10px] tracking-widest text-gray-400 uppercase block text-left">Simulated Billing Details</span>
                    <div className="grid grid-cols-2 gap-3">
                      <input 
                        type="text" 
                        placeholder="Full Name" 
                        required 
                        className="bg-[#031317] border border-[#11323a] text-white py-2 px-3 text-xs focus:outline-none focus:border-emerald-500"
                        id="checkout-name"
                      />
                      <input 
                        type="email" 
                        placeholder="Email Address" 
                        required 
                        className="bg-[#031317] border border-[#11323a] text-white py-2 px-3 text-xs focus:outline-none focus:border-emerald-500"
                        id="checkout-email"
                      />
                    </div>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Simulated Card Number (e.g. 4242 ...)" 
                        required 
                        className="w-full bg-[#031317] border border-[#11323a] text-white py-2 pl-9 pr-3 text-xs focus:outline-none focus:border-emerald-500 font-mono"
                        id="checkout-card"
                      />
                      <CreditCard className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
                    </div>
                  </div>

                  {/* Safety guarantees */}
                  <div className="flex items-center gap-2 text-[10px] text-gray-400 font-mono bg-[#031317] p-2.5 border border-[#11323a]/50">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>This is a sandbox checkout simulation. No live transactions occur.</span>
                  </div>

                  {/* CTA */}
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-[#050d10] font-semibold text-xs tracking-[0.25em] uppercase transition-all duration-300 rounded-none cursor-pointer"
                    id="checkout-confirm-btn"
                  >
                    Confirm & Book ${totalPrice}
                  </button>
                </form>
              ) : (
                /* Success screen */
                <div className="p-8 text-center space-y-6">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400 animate-bounce" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl text-white font-bold">Booking Confirmed!</h3>
                    <p className="text-sm text-gray-300 max-w-sm mx-auto leading-relaxed">
                      Your simulated reservation has been recorded successfully. Check your email for custom passes, booking details, and pre-show schedules.
                    </p>
                  </div>

                  {/* Receipt */}
                  <div className="bg-[#0c242b] border border-[#143d47] p-4 text-left font-mono text-[11px] text-gray-300 space-y-1.5 max-w-xs mx-auto">
                    <div className="flex justify-between border-b border-[#143d47] pb-1.5 mb-1.5">
                      <span className="font-bold text-white">ORDER SUMMARY:</span>
                      <span className="text-emerald-400">#JAZZ-{Math.floor(1000 + Math.random() * 9000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Show:</span>
                      <span className="text-white">{selectedTour.venue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Package:</span>
                      <span className="text-white">{ticketTier} ({ticketQty}x)</span>
                    </div>
                    <div className="flex justify-between border-t border-[#143d47] pt-1.5 mt-1.5 font-bold">
                      <span className="text-white">Amount Paid:</span>
                      <span className="text-emerald-400">${totalPrice}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCloseCheckout}
                    className="w-full py-3 bg-[#0a1e23] hover:bg-[#11323a] text-white border border-[#11323a] font-semibold text-xs tracking-[0.2em] uppercase transition-colors duration-300 rounded-none"
                    id="checkout-finish-btn"
                  >
                    Return to Page
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
