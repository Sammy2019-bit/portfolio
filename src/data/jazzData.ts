export interface BeatItem {
  id: string;
  name: string;
  genre: string;
  bpm: number;
  key: string;
  price: number;
  description: string;
  image: string;
  tags: string[];
}

export interface TourDate {
  id: string;
  dateStr: string;
  monthDay: string;
  year: string;
  venue: string;
  city: string;
  status: 'Available' | 'Sold Out' | 'Limited';
}

export interface TrackItem {
  id: string;
  title: string;
  duration: string;
  url?: string;
  mood: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Studio' | 'Live' | 'Portrait';
  image: string;
  year: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  description: string;
}

export const BILLO_SOCIALS = [
  { name: 'Instagram', url: 'https://instagram.com/billosongs' },
  { name: 'YouTube', url: 'https://youtube.com/c/billosongs' },
  { name: 'SoundCloud', url: 'https://soundcloud.com/billosongs' },
  { name: 'Spotify', url: 'https://open.spotify.com/artist/billosongs' },
  { name: 'Twitter', url: 'https://twitter.com/billosongs' },
  { name: 'Website', url: 'https://billosongs.com' }
];

export const JAZZ_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Pioneering the Afro-Jazz Fusion Soundscape',
    date: 'March 20, 2026, Lagos',
    description: "Billosongs details his creative process of combining traditional Yoruba talking drum loops with early 20th-century classical saxophone frameworks in his upcoming project."
  },
  {
    id: 'news-2',
    title: 'Classic Highlife meets Modern 808 Bass Leases',
    date: 'February 15, 2026, London',
    description: 'Surpassing standard loop styling, billosongs announces a brand new catalog of interactive beat leases featuring live-recorded sax stems and native talking drums.'
  },
  {
    id: 'news-3',
    title: 'The Resonance of Acoustic African Brass',
    date: 'January 10, 2026, Abuja',
    description: "A deep-dive review on billosongs' custom vintage vacuum tube microphones and acoustic chambers used to record premium wind ensembles for maximum analog warmth."
  }
];

export const TOUR_DATES: TourDate[] = [
  { id: 'tour-1', dateStr: 'DEC 29', monthDay: 'DEC 29', year: '2026', venue: 'The New Afrika Shrine', city: 'LAGOS', status: 'Available' },
  { id: 'tour-2', dateStr: 'JAN 22', monthDay: 'JAN 22', year: '2027', venue: 'Jazz Cafe', city: 'LONDON', status: 'Limited' },
  { id: 'tour-3', dateStr: 'FEB 09', monthDay: 'FEB 09', year: '2027', venue: 'Alliance Française', city: 'LAGOS', status: 'Available' },
  { id: 'tour-4', dateStr: 'MAR 30', monthDay: 'MAR 30', year: '2027', venue: 'Transcorp Hilton Dome', city: 'ABUJA', status: 'Sold Out' },
  { id: 'tour-5', dateStr: 'APR 19', monthDay: 'APR 19', year: '2027', venue: 'Blue Note Jazz Club', city: 'NEW YORK', status: 'Available' }
];

export const ALBUM_TRACKS: TrackItem[] = [
  { id: 'track-1', title: 'Lagos Rain & Brass', duration: '03:44', mood: 'Calm Afro-Jazz' },
  { id: 'track-2', title: 'Eko Wind Serenade', duration: '04:00', mood: 'Mellow Sax' },
  { id: 'track-3', title: 'Late Night Lekki Blues', duration: '05:23', mood: 'Late Night Chill' },
  { id: 'track-4', title: 'Fuji-Jazz Poly-Rhythms', duration: '02:12', mood: 'Uptempo Fusion' },
  { id: 'track-5', title: 'Sunset on Broad Street', duration: '03:22', mood: 'Warm Sax Groove' }
];

export const BEAT_MARKETPLACE: BeatItem[] = [
  {
    id: 'beat-1',
    name: 'Lagos Late Nights (Afro-Jazz)',
    genre: 'Afro-Jazz / Drill',
    bpm: 120,
    key: 'C Minor',
    price: 39,
    description: 'Moody, late-night acoustic sax riffs paired with deep talking drums, heavy sliding 808 sub-bass, and organic piano structures.',
    image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&w=600&q=80',
    tags: ['Acoustic Sax', 'Talking Drum', '808 Glide']
  },
  {
    id: 'beat-2',
    name: 'Eko Velvet (Highlife Lofi)',
    genre: 'Highlife / Chillhop',
    bpm: 90,
    key: 'F Major',
    price: 29,
    description: 'Smooth vintage guitar chords, light Afro percussion, crackly vinyl layer, and a beautiful acoustic soprano sax hook.',
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=600&q=80',
    tags: ['West African Highlife', 'Mellow Keys', 'Lofi Sax']
  },
  {
    id: 'beat-3',
    name: 'Subterranean Shrine (Afrobeat)',
    genre: 'Afrobeat / Boom Bap',
    bpm: 95,
    key: 'G Minor',
    price: 49,
    description: 'Heavy dusty jazz drums mixed with polyrhythmic percussion loops, upright acoustic bass, and a melodic tenor sax solo overlay.',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=600&q=80',
    tags: ['Polyrhythmic Percussion', 'Upright Bass', 'Brass Cuts']
  },
  {
    id: 'beat-4',
    name: 'Broad Street Reverie (Warm Synth)',
    genre: 'Synthwave Jazz',
    bpm: 110,
    key: 'A Minor',
    price: 59,
    description: 'Retrowave analog synth pads mixed with a slow jazz percussion drive and soaring soprano sax echoes.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    tags: ['Analog Synths', 'Soprano Sax', 'Neon Vibe']
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Vocal Tracking & Pre-amp Setup',
    category: 'Studio',
    image: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?auto=format&fit=crop&w=500&q=80',
    year: '2026'
  },
  {
    id: 'gal-2',
    title: 'Analog Modular Eurorack Oscillators',
    category: 'Studio',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=500&q=80',
    year: '2026'
  },
  {
    id: 'gal-3',
    title: 'Live American Jazz Performance',
    category: 'Live',
    image: 'https://images.unsplash.com/photo-1486591978090-58e619d37fe7?auto=format&fit=crop&w=500&q=80',
    year: '2026'
  },
  {
    id: 'gal-4',
    title: 'Saxophone Acoustic Session Closeup',
    category: 'Portrait',
    image: 'https://images.unsplash.com/photo-1525994886773-080587e161c2?auto=format&fit=crop&w=500&q=80',
    year: '2026'
  },
  {
    id: 'gal-5',
    title: 'Vintage Vinyl & Tape Reel Logging',
    category: 'Studio',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=500&q=80',
    year: '2025'
  }
];
