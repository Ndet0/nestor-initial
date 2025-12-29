import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MapPin, X } from "lucide-react";
import PlaceCard from "./PlaceCard";

// Sample data - Replace with your real data later
const SAMPLE_PLACES = [
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
    description: "Beautiful urban forest with walking trails, waterfalls, and diverse wildlife.",
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
    description: "Series of stunning waterfalls on the Athi River, perfect for photography.",
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
    description: "Dramatic landscape with cliffs, gorges, and geothermal features. Cycling allowed!",
    featured: true
  }
];

const CATEGORIES = ["All", "Hiking", "Waterfall", "Picnic", "Adventure", "Scenic"];
const COUNTIES = ["All Counties", "Nairobi", "Kiambu", "Nakuru", "Kajiado", "Machakos"];

export default function PlacesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCounty, setSelectedCounty] = useState("All Counties");
  const [showFilters, setShowFilters] = useState(false);

  // Filter places
  const filteredPlaces = SAMPLE_PLACES.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         place.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || place.category === selectedCategory;
    const matchesCounty = selectedCounty === "All Counties" || place.county === selectedCounty;
    return matchesSearch && matchesCategory && matchesCounty;
  });

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedCounty("All Counties");
  };

  const hasActiveFilters = searchQuery || selectedCategory !== "All" || selectedCounty !== "All Counties";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      {/* Header Section */}
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Amazing Places
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Explore Kenya's hidden gems, from hiking trails to scenic waterfalls
            </p>
          </motion.div>

          {/* Search and Filter Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/50">
              {/* Search Input */}
              <div className="flex gap-3 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search places, locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-900/50 text-white pl-12 pr-4 py-3 rounded-xl border border-slate-700 focus:border-indigo-500 focus:outline-none transition-colors"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-6 py-3 rounded-xl border transition-all ${
                    showFilters || hasActiveFilters
                      ? "bg-indigo-600 border-indigo-600 text-white"
                      : "bg-slate-900/50 border-slate-700 text-slate-300 hover:border-indigo-500"
                  }`}
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>

              {/* Filters Panel */}
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="pt-4 border-t border-slate-700/50"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Category Filter */}
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">
                        Category
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full bg-slate-900/50 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-indigo-500 focus:outline-none"
                      >
                        {CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    {/* County Filter */}
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">
                        County
                      </label>
                      <select
                        value={selectedCounty}
                        onChange={(e) => setSelectedCounty(e.target.value)}
                        className="w-full bg-slate-900/50 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-indigo-500 focus:outline-none"
                      >
                        {COUNTIES.map(county => (
                          <option key={county} value={county}>{county}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Clear Filters */}
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Clear all filters
                    </button>
                  )}
                </motion.div>
              )}
            </div>

            {/* Results Count */}
            <div className="mt-6 text-center text-slate-400">
              Found <span className="text-white font-semibold">{filteredPlaces.length}</span> places
            </div>
          </div>
        </div>
      </div>

      {/* Places Grid */}
      <div className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          {filteredPlaces.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlaces.map((place, index) => (
                <motion.div
                  key={place.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PlaceCard place={place} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <MapPin className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-400 mb-2">
                No places found
              </h3>
              <p className="text-slate-500">
                Try adjusting your filters or search query
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}