export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  year: string;
  aspect?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  specs: string[];
}

export interface LuxaTemplate {
  id: string;
  name: string;
  tagline: string;
  description: string;
  accentColor: string;
  previewImage: string;
}

export const LUXA_TEMPLATES: LuxaTemplate[] = [
  {
    id: 'creative-studio',
    name: 'Artist Bio',
    tagline: 'The Musical Vision & Journey of billosongs',
    description: 'Explore billosongs\' unique signature, musical influences, and avant-garde sound philosophy designed for modern headphones and subwoofers.',
    accentColor: '#dfbc6c',
    previewImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'design-agency',
    name: 'Discography & Credits',
    tagline: 'Delivering Premium Soundwaves and Charting Records',
    description: 'Detailed stream milestones, release catalogs, and live statistics reflecting global distributions and radio play.',
    accentColor: '#e5c158',
    previewImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'photographer',
    name: 'Inside the Studio',
    tagline: 'Analog Synthesizers & Sound Treatment Rig',
    description: 'A visual walkthrough of billosongs\' professional studio, featuring custom vocal booths, vintage oscillators, and high-fidelity mixing racks.',
    accentColor: '#d4af37',
    previewImage: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'product-page',
    name: 'Interactive Synth Engine',
    tagline: 'Real-Time Web Audio Frequency Test Bed',
    description: 'Configure and test customizable low-frequency waves and synthetic pitch parameters directly inside the browser using our built-in oscillator.',
    accentColor: '#dfbc6c',
    previewImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'shop-one-screen',
    name: 'Beat Marketplace',
    tagline: 'Bespoke Beat Leases & Licensing Contracts',
    description: 'Instant lease acquisition with transparent pricing, master stem downloads, and fully legal commercial distribution rights.',
    accentColor: '#ffd700',
    previewImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'freelancer',
    name: 'Production Estimator',
    tagline: 'Commission billosongs for Bespoke Sound Engineering',
    description: 'Calculate real-time estimates for mixing vocal tracks, stem master refinement, exclusive audio contracts, or tailored video foley.',
    accentColor: '#dfbc6c',
    previewImage: 'https://images.unsplash.com/photo-1516280440614-37939bbacd6a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'splitscreen',
    name: 'Stereo Balance Sizer',
    tagline: 'Symmetry in Sound Panning and Spatial Audio',
    description: 'Experience dual symmetry in mixing layouts by shifting auditory elements between left channel sub-bass and right channel leads.',
    accentColor: '#b38938',
    previewImage: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'packery-portfolio',
    name: 'EP Artwork Gallery',
    tagline: 'Conceptual Visual Designs for Major Releases',
    description: 'Browse the gorgeous artwork collection accompanying billosongs\' albums, featuring dark luxury aesthetics and couture digital photography.',
    accentColor: '#dfbc6c',
    previewImage: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80'
  }
];

export const AGENCY_SERVICES: Service[] = [
  {
    id: 'graphic-design', // Keep IDs same to prevent rendering code errors
    title: 'Custom Beat Production',
    description: 'Unique custom-built arrangements crafted from scratch in FL Studio and Pro Tools, optimized for your vocal tone.',
    icon: 'Music' // we will handle icon mapping in Component safely
  },
  {
    id: 'web-design',
    title: 'Professional Mixing & Mastering',
    description: 'High-contrast spatial tuning, vocal pitch correction, and loudness optimization matching standard streaming specs.',
    icon: 'Sliders'
  },
  {
    id: 'user-experience',
    title: 'Sound Design & Foley',
    description: 'Atmospheric sonic textures and sound effects tailored for movies, fashion ads, and modern creative campaigns.',
    icon: 'Volume2'
  }
];

export const SHOP_ITEMS: ProductItem[] = [
  {
    id: 'gold-corona', // Keep IDs same to avoid breaking cart code references
    name: 'Basic MP3/WAV Beat Lease',
    price: 29,
    description: 'Perfect for non-commercial mixtapes and streaming under 10k plays. High-quality stereo track format.',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=500&q=80',
    specs: ['MP3 + WAV Stereo Files', 'Distribution limit: 10,000 streams', '1 Commercial Use allowed']
  },
  {
    id: 'midas-signet',
    name: 'Premium Trackout Stem Lease',
    price: 99,
    description: 'Get individual track stems for optimal vocal mixing. Perfect for professional studio engineers.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=500&q=80',
    specs: ['All Separated Stem Tracks', 'Distribution limit: 100,000 streams', 'Radio broadcasting rights']
  },
  {
    id: 'astral-rose',
    name: 'Unlimited Streaming License',
    price: 199,
    description: 'No caps on streams or sales. Distribute across Spotify, Apple Music, and YouTube worldwide with total peace of mind.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=500&q=80',
    specs: ['Unlimited Streaming & Sales', 'All Separated Trackout Stems', 'Keep 100% of your royalties']
  },
  {
    id: 'obsidian-ribbon',
    name: 'Exclusive Ownership Buyout',
    price: 499,
    description: 'Complete transfer of copyright. The beat is removed from the store instantly. Customized arrangement adjustments included.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=500&q=80',
    specs: ['100% Exclusive Ownership Contract', 'Tailored Arrangement Re-structures', 'Original DAW Project Files included']
  }
];

export const ARTWORK_GALLERY: Project[] = [
  {
    id: 'art-1',
    title: 'Midnight Resonance Series',
    category: 'fashion',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80',
    year: '2026',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 'art-2',
    title: 'Subterranean Bass Chords',
    category: 'abstract',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    year: '2026',
    aspect: 'aspect-square'
  },
  {
    id: 'art-3',
    title: 'Golden Frequency Studio EP',
    category: 'product',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
    year: '2025',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 'art-4',
    title: 'Analog Oscillations Volume I',
    category: 'fashion',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80',
    year: '2026',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 'art-5',
    title: 'Acoustic Treatment Sessions',
    category: 'product',
    image: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?auto=format&fit=crop&w=600&q=80',
    year: '2026',
    aspect: 'aspect-[2/3]'
  },
  {
    id: 'art-6',
    title: 'Couture Chords & Vocals',
    category: 'abstract',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd6a?auto=format&fit=crop&w=600&q=80',
    year: '2025',
    aspect: 'aspect-square'
  }
];
