import React, { useState } from 'react';
import { BeatItem } from '../data/jazzData';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, ShieldCheck, CheckCircle2, FileDown, Heart, Disc, Info } from 'lucide-react';

interface CartItem {
  id: string;
  beat: BeatItem;
  licenseType: string;
  price: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const JazzCartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onClearCart
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'success'>('cart');
  const [billingName, setBillingName] = useState('');
  const [billingEmail, setBillingEmail] = useState('');

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    setCheckoutStep('success');
  };

  const handleCloseSuccess = () => {
    onClearCart();
    setCheckoutStep('cart');
    setBillingName('');
    setBillingEmail('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#020506]/90 backdrop-blur-xs"
            id="cart-drawer-backdrop"
          />

          {/* Drawer Body panel */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-[#051114] border-l border-[#11323a] shadow-2xl flex flex-col justify-between"
              id="cart-drawer-panel"
            >
              {/* Header */}
              <div className="px-6 py-5 bg-[#0a1e23] border-b border-[#11323a] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-emerald-400" />
                  <span className="font-serif text-lg text-white font-medium">Your Beat Leases</span>
                  <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/20 font-mono text-[9px] px-2 py-0.5 rounded-full">
                    {cartItems.length} BEATS
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 text-gray-400 hover:text-white transition-colors"
                  id="cart-drawer-close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {checkoutStep === 'cart' ? (
                /* Cart Items List and Billing Fields */
                <div className="flex-1 flex flex-col justify-between overflow-y-auto">
                  <div className="p-6 space-y-6">
                    {cartItems.length === 0 ? (
                      <div className="text-center py-16 space-y-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/5 border border-[#11323a] flex items-center justify-center mx-auto text-gray-500">
                          <ShoppingBag className="w-6 h-6" />
                        </div>
                        <p className="text-sm text-gray-400 font-light">
                          Your production cart is empty. Explore the Beat Store and lease elements to begin.
                        </p>
                      </div>
                    ) : (
                      /* List of Items */
                      <div className="space-y-4">
                        <span className="font-mono text-[9px] tracking-widest text-emerald-400 uppercase block text-left">
                          SELECTED PRODUCTION STEMS //
                        </span>
                        
                        <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                          {cartItems.map((item) => (
                            <div
                              key={item.id}
                              className="bg-[#08181c] border border-[#11323a] p-3.5 flex justify-between items-center relative group"
                              id={`cart-item-row-${item.id}`}
                            >
                              <div className="text-left space-y-1 pr-4">
                                <span className="font-serif text-sm font-semibold text-white block group-hover:text-emerald-300 transition-colors">
                                  {item.beat.name}
                                </span>
                                <div className="flex items-center gap-2 font-mono text-[9px] text-emerald-400">
                                  <span>{item.licenseType.toUpperCase()} LEASE</span>
                                  <span>•</span>
                                  <span>{item.beat.bpm} BPM</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-4">
                                <span className="font-serif text-sm font-bold text-white">
                                  ${item.price}
                                </span>
                                <button
                                  onClick={() => onRemoveItem(item.id)}
                                  className="text-gray-500 hover:text-red-400 transition-colors p-1"
                                  id={`remove-cart-item-${item.id}`}
                                  title="Remove item"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Lease Checkout Fields */}
                    {cartItems.length > 0 && (
                      <form onSubmit={handleCheckoutSubmit} className="space-y-4 pt-6 border-t border-[#11323a]">
                        <span className="font-mono text-[9px] tracking-widest text-gray-400 uppercase block text-left">
                          Simulated Licensing Information
                        </span>
                        
                        <div className="space-y-3 text-left">
                          <input
                            type="text"
                            required
                            placeholder="Producer / Artist Name"
                            value={billingName}
                            onChange={(e) => setBillingName(e.target.value)}
                            className="w-full bg-[#031317] border border-[#11323a] text-xs text-white py-2.5 px-3 focus:outline-none focus:border-emerald-500"
                            id="cart-checkout-name"
                          />
                          <input
                            type="email"
                            required
                            placeholder="Email Address for Audio Delivery"
                            value={billingEmail}
                            onChange={(e) => setBillingEmail(e.target.value)}
                            className="w-full bg-[#031317] border border-[#11323a] text-xs text-white py-2.5 px-3 focus:outline-none focus:border-emerald-500"
                            id="cart-checkout-email"
                          />
                        </div>

                        {/* Sandbox notice */}
                        <div className="flex items-center gap-2 text-[9px] text-gray-400 font-mono bg-[#031317] p-2.5 border border-[#11323a]/50">
                          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>Simulation checkout: no actual payments or legal contracts generated.</span>
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-[#050d10] font-semibold text-xs tracking-[0.2em] uppercase transition-colors rounded-none cursor-pointer"
                          id="cart-checkout-submit-btn"
                        >
                          Checkout Lease & Download Files (${cartTotal})
                        </button>
                      </form>
                    )}
                  </div>

                  {/* Summary Bar */}
                  {cartItems.length > 0 && (
                    <div className="p-6 bg-[#0a1e23] border-t border-[#11323a] flex items-center justify-between">
                      <div className="text-left">
                        <span className="font-mono text-[9px] text-gray-400 block uppercase">
                          Leasing Total
                        </span>
                        <span className="font-serif text-2xl text-emerald-400 font-bold">
                          ${cartTotal}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-mono text-right max-w-[200px]">
                        ★ WAV Stems delivered instantly on confirmation.
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                /* Success screen with Mock downloads! */
                <div className="flex-1 p-8 text-center space-y-6 flex flex-col justify-center items-center overflow-y-auto">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 animate-bounce" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl text-white font-bold">Lease Approved!</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Thank you for leasing from **billosongs**. Your simulated mechanical rights license has been activated.
                    </p>
                  </div>

                  {/* Download stems files list */}
                  <div className="bg-[#0c242b] border border-[#143d47] p-4 text-left w-full space-y-3 font-mono text-xs">
                    <span className="font-bold text-white text-[10px] block border-b border-[#143d47] pb-1.5 uppercase">
                      ACTIVE STEMS DOWNLOAD LINKS:
                    </span>
                    {cartItems.map((item, idx) => (
                      <div key={item.id} className="flex justify-between items-center py-1 border-b border-[#143d47]/40 last:border-none">
                        <span className="text-gray-300 truncate max-w-[180px]">{item.beat.name}</span>
                        <a
                          href="#"
                          onClick={(e) => { e.preventDefault(); alert(`Simulating high-fidelity download of stem: ${item.beat.name}`); }}
                          className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 shrink-0"
                          id={`download-link-${item.id}`}
                        >
                          <FileDown className="w-3.5 h-3.5" />
                          <span>DOWNLOAD ZIP</span>
                        </a>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleCloseSuccess}
                    className="w-full py-3 bg-[#0a1e23] hover:bg-[#11323a] text-white border border-[#11323a] font-semibold text-xs tracking-[0.2em] uppercase transition-colors"
                    id="cart-success-close-btn"
                  >
                    Return to Beats Store
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
