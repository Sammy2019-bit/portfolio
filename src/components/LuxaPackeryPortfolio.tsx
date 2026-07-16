import React, { useState } from 'react';
import { LayoutGrid, ZoomIn, X, Compass, ExternalLink } from 'lucide-react';
import { ARTWORK_GALLERY } from '../data/luxaTemplates';

export const LuxaPackeryPortfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'fashion' | 'abstract' | 'product'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredArtworks = activeFilter === 'all'
    ? ARTWORK_GALLERY
    : ARTWORK_GALLERY.filter((item) => item.category === activeFilter);

  return (
    <div className="text-left font-serif text-slate-100 flex flex-col gap-10" id="luxa-packery-portfolio">
      
      {/* Packery Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-900 pb-4">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#e5c158]">ALBUM & EP ART WORK</span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
            Premium <span className="text-amber-400 font-medium italic">Release Cover Designs</span>
          </h2>
        </div>

        {/* Dynamic Category Sorter */}
        <div className="flex overflow-x-auto p-1 bg-slate-950/80 border border-slate-900 rounded-xl max-w-full scrollbar-none gap-1 font-sans">
          {[
            { id: 'all', label: 'All Artworks' },
            { id: 'fashion', label: 'EP & LPs' },
            { id: 'abstract', label: 'Single Releases' },
            { id: 'product', label: 'Studio Logs' }
          ].map((cat) => (
            <button
              key={cat.id}
              id={`btn-packery-filter-${cat.id}`}
              onClick={() => setActiveFilter(cat.id as any)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-medium transition duration-200 shrink-0 ${
                activeFilter === cat.id
                  ? 'bg-[#e5c158] text-black font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-slate-400 font-sans max-w-xl leading-relaxed">
        Each project series is matched with highly expressive premium cover art, styled with a high-contrast dark aesthetic. Re-align designs instantly by selecting categories. Click to view high-definition artwork details.
      </p>

      {/* Masonry / Bento Portfolio Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-sans" id="packery-artwork-grid">
        {filteredArtworks.map((item, idx) => (
          <div 
            key={item.id} 
            id={`packery-item-${item.id}`}
            onClick={() => setLightboxIndex(idx)}
            className={`group bg-black/60 border border-slate-900 hover:border-[#e5c158]/50 p-2.5 rounded-xl cursor-pointer transition duration-300 flex flex-col justify-between ${
              item.aspect || 'aspect-square'
            }`}
          >
            <div className="w-full h-full rounded-lg overflow-hidden relative bg-slate-950">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <ZoomIn className="w-6 h-6 text-[#e5c158] scale-90 group-hover:scale-100 transition-transform duration-300" />
              </div>

              {/* Category tag */}
              <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-slate-800 px-2 py-0.5 rounded text-[8px] font-mono text-slate-400 capitalize">
                {item.category === 'fashion' ? 'EP & LP' : item.category === 'abstract' ? 'Single' : 'Studio'}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-sans font-bold text-slate-200">{item.title}</h4>
                <span className="text-[9px] font-mono text-slate-500">{item.year} Master Series</span>
              </div>
              <Compass className="w-3.5 h-3.5 text-[#e5c158] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </div>

      {/* High-Definition Lightbox Overlay */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="absolute top-4 right-4 flex gap-4">
            <button
              onClick={() => {
                const target = filteredArtworks[lightboxIndex];
                alert(`Direct asset link: ${target.image}`);
              }}
              className="text-slate-400 hover:text-white bg-slate-900 border border-slate-800 p-2 rounded-xl transition flex items-center gap-1.5 text-xs font-mono"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Full Resolution</span>
            </button>
            <button
              onClick={() => setLightboxIndex(null)}
              className="text-slate-400 hover:text-white bg-slate-900 border border-slate-800 p-2 rounded-xl transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="max-w-3xl w-full flex flex-col gap-4 text-left font-sans">
            <div className="aspect-[4/5] sm:aspect-video w-full rounded-2xl overflow-hidden border border-slate-800 bg-black">
              <img 
                src={filteredArtworks[lightboxIndex].image} 
                alt="" 
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="flex justify-between items-end">
              <div>
                <span className="text-[10px] font-mono text-[#e5c158] uppercase">
                  {filteredArtworks[lightboxIndex].category === 'fashion' ? 'EP & LP' : filteredArtworks[lightboxIndex].category === 'abstract' ? 'Single' : 'Studio'} Collection
                </span>
                <h3 className="text-base font-bold text-white mt-1">{filteredArtworks[lightboxIndex].title}</h3>
              </div>
              <span className="text-xs font-mono text-slate-500">Premium Audio Release Art No. 0{lightboxIndex + 1}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
