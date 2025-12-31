// src/data/Places.js
// Central data file for all adventure places in Kenya

export const PLACES_DATA = [
  {
    id: 1,
    name: "Karura Forest",
    location: "Nairobi",
    county: "Nairobi",
    price: 0,
    rating: 4.5,
    reviewCount: 128,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    category: "Hiking",
    description: "Beautiful urban forest with walking trails, waterfalls, and diverse wildlife. Perfect for nature lovers seeking a peaceful escape within the city.",
    featured: true
  },
  {
    id: 2,
    name: "Fourteen Falls",
    location: "Thika",
    county: "Kiambu",
    price: 300,
    rating: 4.3,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&q=80",
    category: "Waterfall",
    description: "Series of stunning waterfalls on the Athi River, perfect for photography and picnics.",
    featured: false
  },
  {
    id: 3,
    name: "Hell's Gate National Park",
    location: "Naivasha",
    county: "Nakuru",
    price: 1000,
    rating: 4.8,
    reviewCount: 256,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    category: "Adventure",
    description: "Dramatic landscape with cliffs, gorges, and geothermal features. Cycling and walking allowed!",
    featured: true
  },
  {
    id: 4,
    name: "Ngong Hills",
    location: "Ngong",
    county: "Kajiado",
    price: 200,
    rating: 4.6,
    reviewCount: 174,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    category: "Hiking",
    description: "Scenic hilltops with panoramic views of the Great Rift Valley.",
    featured: false
  },
  {
    id: 5,
    name: "Ol Donyo Sabuk",
    location: "Kyanzavi",
    county: "Machakos",
    price: 500,
    rating: 4.4,
    reviewCount: 92,
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
    category: "Hiking",
    description: "Mountain peak with buffalo and colobus monkeys, offering stunning views.",
    featured: false
  },
  {
    id: 6,
    name: "Lake Naivasha",
    location: "Naivasha",
    county: "Nakuru",
    price: 800,
    rating: 4.7,
    reviewCount: 203,
    image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&q=80",
    category: "Picnic",
    description: "Freshwater lake with hippos, boat rides, and beautiful bird watching.",
    featured: true
  }
];

export const CATEGORIES = [
  "All",
  "Hiking",
  "Waterfall",
  "Picnic",
  "Adventure",
  "Scenic",
  "Beach",
  "Forest"
];

export const COUNTIES = [
  "All Counties",
  "Nairobi",
  "Kiambu",
  "Nakuru",
  "Kajiado",
  "Machakos",
  "Mombasa",
  "Kilifi"
];

// Helper function to get place by ID
export const getPlaceById = (id) => {
  return PLACES_DATA.find(place => place.id === parseInt(id));
};

// Helper function to get featured places
export const getFeaturedPlaces = () => {
  return PLACES_DATA.filter(place => place.featured);
};

// Default export for backward-compatible imports
export default PLACES_DATA;