import { motion } from "framer-motion";
import { MapPin, Star, DollarSign } from "lucide-react";

/**
 * PlaceCard Component
 * Displays a single adventure place with image, details, rating, and price
 */
export default function PlaceCard({ place, onClick }) {
  const {
    id,
    name,
    location,
    county,
    price,
    rating,
    reviewCount,
    image,
    category,
    description,
    featured = false
  } = place;

  // Format price display
  const formatPrice = (price) => {
    if (price === 0) return "Free";
    return `KSh ${price.toLocaleString()}`;
  };

  // Render star rating
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-600"
        }`}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      onClick={() => onClick && onClick(id)}
      className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer group"
    >
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 left-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
          {category}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
          {name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
          <MapPin className="w-4 h-4" />
          <span>{location}, {county}</span>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        {/* Rating and Price Row */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {renderStars(rating)}
            </div>
            <span className="text-slate-400 text-sm">
              {rating.toFixed(1)} ({reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-1 text-indigo-400 font-semibold">
            {price > 0 && <DollarSign className="w-4 h-4" />}
            <span>{formatPrice(price)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * PlaceCardSkeleton - Loading state component
 */
export function PlaceCardSkeleton() {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 animate-pulse">
      {/* Image Skeleton */}
      <div className="h-56 bg-slate-700/50" />
      
      {/* Content Skeleton */}
      <div className="p-6">
        <div className="h-6 bg-slate-700/50 rounded w-3/4 mb-2" />
        <div className="h-4 bg-slate-700/50 rounded w-1/2 mb-3" />
        <div className="h-4 bg-slate-700/50 rounded w-full mb-2" />
        <div className="h-4 bg-slate-700/50 rounded w-5/6 mb-4" />
        
        <div className="flex justify-between pt-4 border-t border-slate-700/50">
          <div className="h-4 bg-slate-700/50 rounded w-24" />
          <div className="h-4 bg-slate-700/50 rounded w-16" />
        </div>
      </div>
    </div>
  );
}