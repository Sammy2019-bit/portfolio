import { Release, ArtistSkill, GigMilestone } from '../types';

export const ARTIST_PROFILE = {
  name: "Alex River",
  alias: "RIVER_GLOW",
  pronouns: "they/them",
  title: "Electronic Music Producer & Live Artist",
  subtitle: "Melodic Techno & Ambient Soundscapes",
  avatar: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400&h=400",
  bio: "Alex River (aka RIVER_GLOW) is an electronic music producer, sound designer, and live performer based in Berlin. Fusing rich modular synthesizer sequences with propulsive melodic techno rhythms, they create immersive auditory journeys that have filled boutique club dancefloors and art installation spaces across Europe.",
  location: "Berlin, DE / San Francisco, CA",
  availability: "Available for Live Sets, Mixing, & Custom Sound Design",
  stats: [
    { label: "Spotify Streams", value: "2.4M+" },
    { label: "Live Sets Played", value: "140+" },
    { label: "Original Releases", value: "32" },
  ],
  socials: {
    spotify: "https://spotify.com/artist/riverglow",
    soundcloud: "https://soundcloud.com/riverglow",
    bandcamp: "https://riverglow.bandcamp.com",
    instagram: "https://instagram.com/riverglow",
    email: "buttysongs@gmail.com"
  }
};

export const RELEASES_DATA: Release[] = [
  {
    id: "rel_1",
    title: "Cosmic Resonance",
    type: "album",
    releaseDate: "2025-11-12",
    description: "A 9-track journey combining live modular synthesizer jams with deep, organic bass lines. Conceptually themed around astronomical telemetry signals.",
    tags: ["Melodic Techno", "Modular Synth", "Ambient", "Album"],
    metrics: { streams: "1.2M", beatportRank: "#12 Melodic Techno" },
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=600&h=400",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Royalty-free test mp3
  },
  {
    id: "rel_2",
    title: "Subterranean Pulse",
    type: "single",
    releaseDate: "2026-03-04",
    description: "A dark, peak-time club tool centered around high-voltage distortion patterns and hypnotic vocal chops. Built specifically for modular rig performances.",
    tags: ["Peak Time Techno", "Analog Drums", "Single"],
    metrics: { streams: "650k", beatportRank: "#4 Techno Releases" },
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600&h=400",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: "rel_3",
    title: "Vesper (RIVER_GLOW Remix)",
    type: "remix",
    releaseDate: "2026-05-18",
    description: "A driving cinematic reimagination of Lyra's acoustic neo-classical single, transforming warm string quartets into high-energy dancefloor arpeggios.",
    tags: ["Progressive House", "Neoclassical", "Remix"],
    metrics: { streams: "480k" },
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=600&h=400",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    id: "rel_4",
    title: "Nebula Fragments EP",
    type: "album",
    releaseDate: "2024-09-15",
    description: "An experimental collection of generative atmospheric audio beds exploring spatial panning and microtonal composition arrays.",
    tags: ["Experimental", "Generative", "EP"],
    metrics: { downloads: "4.5k Bandcamp" },
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=600&h=400",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  }
];

export const ARTIST_SKILLS_DATA: ArtistSkill[] = [
  // Production
  { name: "Modular Synthesizers (Eurorack)", category: "production", level: 95, iconName: "cpu" },
  { name: "Ableton Live & Hardware Jamming", category: "production", level: 98, iconName: "sliders" },
  { name: "Sound Design & Foley Recording", category: "production", level: 90, iconName: "mic" },
  { name: "Music Theory & Chord Voicing", category: "production", level: 85, iconName: "music" },

  // Engineering
  { name: "Stereo & Spatial Mixing", category: "engineering", level: 92, iconName: "layers" },
  { name: "Analog Master Tape Warmth", category: "engineering", level: 88, iconName: "disc" },
  { name: "Dynamic Range Mastering", category: "engineering", level: 85, iconName: "activity" },
  { name: "Acoustics & Signal Pipelines", category: "engineering", level: 80, iconName: "cable" },

  // Performance
  { name: "Improvised Live Synthesizer Sets", category: "performance", level: 95, iconName: "sparkles" },
  { name: "Hybrid CDJ / Hardware DJ Sets", category: "performance", level: 90, iconName: "headphones" },
  { name: "Generative Visual Syncing", category: "performance", level: 75, iconName: "tv" },
];

export const GIG_MILESTONES_DATA: GigMilestone[] = [
  {
    id: "gig_1",
    venue: "Tresor Club",
    city: "Berlin, Germany",
    date: "Dec 2025",
    role: "Headliner (Live Hardware Set)",
    highlights: [
      "Performed an entirely improvised 3-hour modular synthesizer live set.",
      "Synchronized custom hardware CV triggers with visual laser artists.",
      "Achieved a sold-out record night attendance of 600+ guests."
    ]
  },
  {
    id: "gig_2",
    venue: "Sonar Festival (Sonar+D)",
    city: "Barcelona, Spain",
    date: "Jun 2025",
    role: "Showcase & Tech Panelist",
    highlights: [
      "Presented a masterclass on 'Generative Logic Loops in Live Modular Performance'.",
      "Performed a 1-hour immersive quadraphonic spatial audio set in the Dome arena."
    ]
  },
  {
    id: "gig_3",
    venue: "Midway SF",
    city: "San Francisco, USA",
    date: "Oct 2024",
    role: "Main Support Set",
    highlights: [
      "Direct support for legendary techno collective on their global tour.",
      "Warmed up the 1,200 capacity arena with melodic ambient soundscapes escalating into hypnotic grooves."
    ]
  }
];
