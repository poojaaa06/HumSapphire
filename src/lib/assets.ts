/**
 * HUM Sapphire – Centralized Asset Configuration
 *
 * Replace any URL here with official project imagery.
 * All components import images from this file, so no component-level changes are needed.
 *
 * Image credit: Unsplash (free to use). Replace with official renders when available.
 */

export const assets = {
  /** Main hero / banner image – full-screen opening viewport */
  heroImage:
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=85&auto=format&fit=crop",

  /** Secondary hero image – used for mobile */
  heroImageMobile:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=85&auto=format&fit=crop",

  /** Project introduction section – editorial image */
  introImage:
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=85&auto=format&fit=crop",

  /** Developer / about section image */
  developerImage:
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=85&auto=format&fit=crop",

  /** Architecture section – large building exterior */
  architectureImages: [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1400&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=85&auto=format&fit=crop",
  ],

  /** Interior / residence images */
  interiorImages: {
    lobby:
      "https://humsapphire.com/assets/Lobby.jpg",
    masterBedroom:
      "https://humsapphire.com/assets/M_Bedroom.jpg",
    livingRoom:
      "https://humsapphire.com/assets/LivingRoom.jpg",
    kitchen:
      "https://humsapphire.com/assets/Kitchen.jpg",
    bathroom:
      "https://humsapphire.com/assets/Toilet.jpg",
  },

  /** Amenity images sourced from the live HUM Sapphire site */
  amenityImages: {
    gym: "https://humsapphire.com/assets/amenities/Gym.jpg",
    jacuzzi: "https://humsapphire.com/assets/amenities/Jacuzzi-Room.jpeg",
    multipurposeCourt:
      "https://humsapphire.com/assets/amenities/Multipurpose-Court-Turf.jpg",
    openTheatre:
      "https://humsapphire.com/assets/amenities/Open-Theatre.jpg",
    seatingArea:
      "https://humsapphire.com/assets/amenities/Seating-Area.jpg",
    starGazing:
      "https://humsapphire.com/assets/amenities/Star-Gazzing.jpg",
    steamRoom:
      "https://humsapphire.com/assets/amenities/Steam-Room.jpeg",
    swingArea:
      "https://humsapphire.com/assets/amenities/Swing-Area.jpg",
    yogaArea:
      "https://humsapphire.com/assets/amenities/Yoga-Area.jpg",
    kidsPlay:
      "https://humsapphire.com/assets/amenities/kids-Play-Area.jpeg",
  },

  /** Gallery images (mix of HUM Sapphire originals + high-quality architectural placeholders) */
  galleryImages: [
    {
      src: "https://humsapphire.com/assets/Lobby.jpg",
      alt: "Grand lobby at HUM Sapphire",
      caption: "Grand Entrance Lobby",
    },
    {
      src: "https://humsapphire.com/assets/LivingRoom.jpg",
      alt: "Spacious living room at HUM Sapphire",
      caption: "Contemporary Living Room",
    },
    {
      src: "https://humsapphire.com/assets/M_Bedroom.jpg",
      alt: "Master bedroom at HUM Sapphire",
      caption: "Master Bedroom",
    },
    {
      src: "https://humsapphire.com/assets/Kitchen.jpg",
      alt: "Modern kitchen at HUM Sapphire",
      caption: "Modern Kitchen",
    },
    {
      src: "https://humsapphire.com/assets/amenities/Gym.jpg",
      alt: "Fully equipped gymnasium at HUM Sapphire",
      caption: "Fully Equipped Gymnasium",
    },
    {
      src: "https://humsapphire.com/assets/amenities/Jacuzzi-Room.jpeg",
      alt: "Jacuzzi room at HUM Sapphire",
      caption: "Jacuzzi & Relaxation",
    },
    {
      src: "https://humsapphire.com/assets/amenities/Open-Theatre.jpg",
      alt: "Open-air theatre at HUM Sapphire",
      caption: "Open-Air Theatre",
    },
    {
      src: "https://humsapphire.com/assets/amenities/Yoga-Area.jpg",
      alt: "Yoga and wellness area at HUM Sapphire",
      caption: "Yoga & Wellness Area",
    },
  ],

  /** Floor plan placeholder – replace with official floor plan images */
  floorPlans: {
    bhk2: null as string | null, // Official 2 BHK floor plan – replace when available
    bhk3: null as string | null, // Official 3 BHK floor plan – replace when available
  },

  /** Logo – the live HUM Sapphire logo SVG */
  logo: "https://humsapphire.com/assets/logo.svg",
};
