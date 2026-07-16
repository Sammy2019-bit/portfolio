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
    title: 'Text of the printing and typesetting',
    date: 'March 20, 2026, New York',
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  },
  {
    id: 'news-2',
    title: 'Classic Rhythm meets Modern Beat Leases',
    date: 'February 15, 2026, London',
    description: 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. Billosongs announces his new live beat-making sessions.'
  },
  {
    id: 'news-3',
    title: 'The Resonance of Acoustic Saxophones',
    date: 'January 10, 2026, Paris',
    description: 'A close look into the recording process of the newly anticipated album "Sax in the City" using flat reference monitors and vintage vacuum tube microphones.'
  }
];

export const TOUR_DATES: TourDate[] = [
  { id: 'tour-1', dateStr: 'DEC 29', monthDay: 'DEC 29', year: '2026', venue: 'Chelsea Rocks', city: 'NEW YORK', status: 'Available' },
  { id: 'tour-2', dateStr: 'JAN 22', monthDay: 'JAN 22', year: '2027', venue: 'RPM', city: 'TORONTO', status: 'Limited' },
  { id: 'tour-3', dateStr: 'FEB 09', monthDay: 'FEB 09', year: '2027', venue: 'Massey Hall', city: 'SAN FRANCISCO', status: 'Available' },
  { id: 'tour-4', dateStr: 'MAR 30', monthDay: 'MAR 30', year: '2027', venue: 'Elbow Room', city: 'MIAMI', status: 'Sold Out' },
  { id: 'tour-5', dateStr: 'APR 19', monthDay: 'APR 19', year: '2027', venue: 'Easy and the 5th', city: 'LOS ANGELES', status: 'Available' }
];

export const ALBUM_TRACKS: TrackItem[] = [
  { id: 'track-1', title: 'Human Nature', duration: '03:44', mood: 'Calm Jazz' },
  { id: 'track-2', title: 'Thinking Free again', duration: '04:00', mood: 'Mellow Sax' },
  { id: 'track-3', title: 'Rainy Day', duration: '05:23', mood: 'Late Night Blues' },
  { id: 'track-4', title: 'Back to the beat', duration: '02:12', mood: 'Groovy Swing' },
  { id: 'track-5', title: 'Get it on', duration: '03:22', mood: 'Uptempo Session' }
];

export const BEAT_MARKETPLACE: BeatItem[] = [
  {
    id: 'beat-1',
    name: 'Sax in the City (Jazz Trap)',
    genre: 'Jazz Trap / Drill',
    bpm: 140,
    key: 'C Minor',
    price: 39,
    description: 'Moody, late-night acoustic sax riffs paired with heavy sliding 808 sub-bass, sharp hats, and organic piano structures.',
    image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&w=600&q=80',
    tags: ['Acoustic Sax', '808 Glide', 'Dark Trap']
  },
  {
    id: 'beat-2',
    name: 'Blue Velvet (Lofi Swing)',
    genre: 'Lofi Jazz / Chillhop',
    bpm: 85,
    key: 'F Major',
    price: 29,
    description: 'Smooth vintage piano chords, clean ride cymbals, crackly vinyl layer, and a beautiful acoustic sax hook.',
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=600&q=80',
    tags: ['Vinyl Crackle', 'Mellow Keys', 'Lofi Sax']
  },
  {
    id: 'beat-3',
    name: 'Subterranean Session (Boom Bap)',
    genre: 'Classic Boom Bap',
    bpm: 92,
    key: 'G Minor',
    price: 49,
    description: 'Heavy dusty jazz drums, upright acoustic bass loop, brass sample cuts, and a melodic tenor sax solo overlay.',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=600&q=80',
    tags: ['Upright Bass', 'Dusty Breaks', 'Brass Cuts']
  },
  {
    id: 'beat-4',
    name: 'Midnight Reverie (Chill Synth)',
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
