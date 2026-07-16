import React, { useState } from 'react';
import { ShoppingBag, Tag, Trash2, ShieldCheck, Truck, Star, Sparkles, FileText, Download } from 'lucide-react';
import { SHOP_ITEMS } from '../data/luxaTemplates';

export const LuxaShopOneScreen: React.FC = () => {
  const [cart, setCart] = useState<{ id: string; qty: number }[]>([]);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // percentage
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [giftWrap, setGiftWrap] = useState(false); // Express delivery/insurance toggle

  const handleAddToCart = (itemId: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing) {
        return prev.map((i) => (i.id === itemId ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { id: itemId, qty: 1 }];
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId));
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    if (discountCode.toUpperCase() === 'BILLOGOLD') {
      setAppliedDiscount(20);
      setCouponSuccess('Platinum 20% discount applied successfully!');
    } else {
      setCouponError('Invalid coupon code. Try code: BILLOGOLD');
    }
  };

  const cartItemsDetailed = cart.map((cartItem) => {
    const item = SHOP_ITEMS.find((s) => s.id === cartItem.id)!;
    return {
      ...item,
      qty: cartItem.qty,
      total: item.price * cartItem.qty
    };
  });

  const subtotal = cartItemsDetailed.reduce((sum, item) => sum + item.total, 0);
  const discountAmount = subtotal * (appliedDiscount / 100);
  const delivery = subtotal > 0 ? 0 : 0; // Immediate digital delivery is free
  const total = subtotal - discountAmount + delivery + (giftWrap ? 15 : 0);

  return (
    <div className="text-left font-serif text-slate-100 flex flex-col gap-10" id="luxa-shop-one-screen">
      
      {/* Shop Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-900 pb-4">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#e5c158]">BEAT STORE</span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
            Shop <span className="text-amber-400 font-medium italic">Premium Beat Licenses</span>
          </h2>
        </div>
        <span className="text-xs font-mono text-slate-500 bg-black border border-slate-900 px-3 py-1 rounded-xl">
          Instant Secure Digital Download Sim
        </span>
      </div>

      {/* Main Checkout Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Beat licenses list */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SHOP_ITEMS.map((item) => (
              <div 
                key={item.id} 
                className="bg-black/40 border border-slate-900 hover:border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between p-4 gap-4"
              >
                <div>
                  <div className="aspect-square w-full rounded-lg overflow-hidden bg-slate-950 border border-slate-900 relative group">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                      <div className="flex flex-col gap-1">
                        {item.specs.map((spec, sidx) => (
                          <span key={sidx} className="text-[9px] font-sans text-slate-300 font-medium flex items-center gap-1">
                            <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <h3 className="text-xs font-sans font-bold text-slate-100">{item.name}</h3>
                    <p className="text-[10px] text-slate-400 mt-1 font-sans leading-relaxed truncate">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-900/60 pt-3 mt-1">
                  <span className="text-sm font-mono font-bold text-amber-300">${item.price}</span>
                  <button
                    id={`btn-add-to-cart-${item.id}`}
                    onClick={() => handleAddToCart(item.id)}
                    className="bg-[#e5c158] hover:bg-amber-400 text-black font-mono font-bold text-[10px] px-3 py-1.5 rounded-lg transition duration-250 flex items-center gap-1"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Immersive checkout and order calculation */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="bg-[#0b0c10] border border-slate-900 p-5 rounded-2xl flex flex-col gap-4">
            <h3 className="text-xs font-sans font-bold text-slate-200 flex items-center gap-2 border-b border-slate-900 pb-2.5">
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span>Your Beat Cart ({cart.reduce((sum, i) => sum + i.qty, 0)})</span>
            </h3>

            {cart.length === 0 ? (
              <div className="text-center py-8 flex flex-col items-center gap-2">
                <ShoppingBag className="w-8 h-8 text-slate-700 stroke-1" />
                <p className="text-xs text-slate-500 font-sans">Your beat cart is empty. Choose a license lease from the left.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3 max-h-48 overflow-y-auto pr-1">
                {cartItemsDetailed.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-black/60 border border-slate-950 p-2.5 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0 border border-slate-900">
                        <img src={item.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="truncate">
                        <h4 className="text-[11px] font-sans font-bold text-slate-200 truncate max-w-[130px]">{item.name}</h4>
                        <span className="text-[9px] font-mono text-slate-500 block">Qty: {item.qty} &times; ${item.price}</span>
                      </div>
                    </div>

                    <button
                      id={`btn-remove-cart-${item.id}`}
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-slate-900 transition duration-150"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Gift wrap option (mapped to Express Stem Arrangement delivery) */}
            {cart.length > 0 && (
              <label className="flex items-center gap-2.5 bg-black/30 border border-slate-900 p-2.5 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                  className="rounded border-slate-800 text-[#e5c158] focus:ring-0 accent-[#e5c158]"
                />
                <div className="text-left">
                  <span className="text-[11px] font-sans font-bold text-slate-200 block">Add Custom Arrangement (+$15)</span>
                  <span className="text-[9px] font-sans text-slate-500 block">Tailor structural verse/chorus blocks to your song structure</span>
                </div>
              </label>
            )}

            {/* Coupon Code input */}
            {cart.length > 0 && (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="BILLOGOLD"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="bg-black border border-slate-900 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-700 outline-none focus:border-[#e5c158]/50 flex-1 font-mono uppercase"
                />
                <button
                  type="submit"
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white px-3 py-1.5 rounded-xl text-[10px] font-mono font-semibold transition"
                >
                  Apply
                </button>
              </form>
            )}

            {couponError && <p className="text-[10px] font-mono text-red-400">{couponError}</p>}
            {couponSuccess && <p className="text-[10px] font-mono text-emerald-400">{couponSuccess}</p>}

            {/* Price list */}
            {cart.length > 0 && (
              <div className="border-t border-slate-950 pt-3 flex flex-col gap-1.5 font-mono text-[10px] text-slate-400">
                <div className="flex justify-between">
                  <span>Cart Subtotal</span>
                  <span className="text-slate-200">${subtotal}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-[#e5c158]">
                    <span>Golden Discount (20%)</span>
                    <span>-${discountAmount.toFixed(0)}</span>
                  </div>
                )}
                {giftWrap && (
                  <div className="flex justify-between text-slate-300">
                    <span>Bespoke Arrangement</span>
                    <span>+$15</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Secure Digital Ingress</span>
                  <span className="text-slate-200">FREE</span>
                </div>

                <div className="flex justify-between text-xs font-bold text-white border-t border-slate-950 pt-2.5 mt-1">
                  <span>ORDER TOTAL INVST</span>
                  <span className="text-amber-300">${total.toFixed(0)}</span>
                </div>
              </div>
            )}

            {cart.length > 0 && (
              <button
                id="btn-confirm-purchase"
                onClick={() => {
                  alert(`Order Simulation Successful! Beats are delivered instantly. Billosongs thanks you for supporting independent music.`);
                  setCart([]);
                  setDiscountCode('');
                  setAppliedDiscount(0);
                  setGiftWrap(false);
                }}
                className="w-full bg-[#e5c158] hover:bg-amber-400 text-black py-2.5 rounded-xl text-xs font-mono font-bold transition duration-200 flex items-center justify-center gap-1.5 shadow-md shadow-amber-400/10"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Simulate License Checkout</span>
              </button>
            )}
          </div>

          {/* Delivery Policy */}
          <div className="bg-black/30 border border-slate-900 p-3.5 rounded-xl flex items-start gap-2.5">
            <Download className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
            <p className="text-[10px] text-slate-500 font-sans leading-normal">
              Digital files are generated instantly. High-fidelity uncompressed WAV tracks, standard MIDI tempo grids, and signed PDF legal contracts are delivered immediately to your active billing address.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
