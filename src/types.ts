export interface Release {
  id: string;
  title: string;
  type: 'album' | 'single' | 'remix';
  releaseDate: string;
  description: string;
  tags: string[];
  metrics: {
    streams?: string;
    downloads?: string;
    beatportRank?: string;
  };
  image: string;
  audioUrl?: string; // Standard or preview simulated track
}

export interface ArtistSkill {
  name: string;
  category: 'production' | 'performance' | 'engineering';
  level: number; // 0 to 100
  iconName: string;
}

export interface GigMilestone {
  id: string;
  venue: string;
  city: string;
  date: string;
  role: string; // e.g., Headliner, Support Set, Festival Act
  highlights: string[];
}

export interface BookingEstimate {
  serviceType: string;
  venueCapacity: 'small' | 'medium' | 'large';
  durationHours: number;
  travelRequired: boolean;
  basePrice: number;
}
