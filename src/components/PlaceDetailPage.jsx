import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, Star, DollarSign, Clock, Users, 
  Phone, Mail, Calendar, ArrowLeft, Share2,
  ThumbsUp, MessageCircle
} from "lucide-react";
import Button from "./Button";

// Sample place data - Replace with real data from your backend
const SAMPLE_PLACE = {
  id: 1,
  name: "Karura Forest",
  location: "Nairobi",
  county: "Nairobi",
  price: 0,
  rating: 4.5,
  reviewCount: 128,
  images: [
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80",
    "https://images.unsplash.com/photo-1511497584788-876760111969?w=1200&q=80",
    "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=1200&q=80"
  ],
  category: "Hiking",
  description: "Karura Forest is a beautiful urban forest reserve located in Nairobi. It features over 50 kilometers of walking, running, and cycling trails, as well as several waterfalls and a variety of wildlife. The forest is a popular destination for nature lovers and offers a peaceful escape from the city.",
  highlights: [
    "50+ km of trails",
    "Multiple waterfalls",
    "Bike-friendly paths",
    "Wildlife viewing",
    "Picnic areas",
    "Guided tours available"
  ],
  openingHours: "6:00 AM - 6:00 PM",
  bestTimeToVisit: "Early morning or late afternoon",
  difficulty: "Easy to Moderate",
  duration: "2-4 hours",
  facilities: ["Parking", "Restrooms", "Picnic areas", "Security"],
  contact: {
    phone: "+254 700 000 000",
    email: "info@karuraforest.org"
  },
  coordinates: {
    lat: -1.2468,
    lng: 36.8372
  }
};

// Sample reviews
const SAMPLE_REVIEWS = [
  {
    id: 1,
    user: "Sarah M.",
    rating: 5,
    date: "2024-01-15",
    comment: "Absolutely beautiful! Perfect for a weekend hike. The waterfalls are stunning!",
    helpful: 24
  },
  {
    id: 2,
    user: "John K.",
    rating: 4,
    date: "2024-01-10",
    comment: "Great place for cycling. Well-maintained trails and plenty of shade.",
    helpful: 18
  },
  {
    id: 3,
    user: "Mary W.",
    rating: 5,
    date: "2024-01-05",
    comment: "Love this place! Very peaceful and lots of wildlife to see.",
    helpful: 31
  }
];

export default function PlaceDetailPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newReview, setNewReview] = useState("");

  const place = SAMPLE_PLACE;
  const reviews = SAMPLE_REVIEWS;

  const renderStars = (rating, interactive = false, onSelect = null) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        onClick={() => interactive && onSelect && onSelect(index + 1)}
        className={`w-5 h-5 ${interactive ? 'cursor-pointer' : ''} ${
          index < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-600"
        }`}
      />
    ));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    // Handle review submission
    console.log("Review submitted:", { rating: newRating, review: newReview });
    setShowReviewForm(false);
    setNewReview("");
    setNewRating(5);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: place.name,
        text: place.description,
        url: window.location.href
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      {/* Back Button */}
      <div className="pt-24 px-6">
        <div className="max-w-6xl mx-auto mb-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to places
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="px-6 mb-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="md:col-span-2 h-96 md:h-[500px] rounded-2xl overflow-hidden"
            >
              <img
                src={place.images[currentImageIndex]}
                alt={place.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-3 md:grid-cols-1 gap-4">
              {place.images.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-24 md:h-[156px] rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                    currentImageIndex === index
                      ? "border-indigo-500"
                      : "border-transparent hover:border-slate-600"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${place.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Title and Actions */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl font-bold">{place.name}</h1>
                    <span className="px-3 py-1 bg-indigo-600 rounded-full text-sm">
                      {place.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <MapPin className="w-5 h-5" />
                    <span>{place.location}, {place.county}</span>
                  </div>
                </div>
                <button
                  onClick={handleShare}
                  className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-700">
                <div className="flex items-center gap-2">
                  {renderStars(place.rating)}
                  <span className="text-2xl font-bold">{place.rating}</span>
                </div>
                <span className="text-slate-400">
                  ({place.reviewCount} reviews)
                </span>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">About</h2>
                <p className="text-slate-300 leading-relaxed">
                  {place.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Highlights</h2>
                <div className="grid grid-cols-2 gap-3">
                  {place.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-slate-300"
                    >
                      <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews Section */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Reviews</h2>
                  <Button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="px-6 py-2"
                  >
                    Write a Review
                  </Button>
                </div>

                {/* Review Form */}
                {showReviewForm && (
                  <motion.form
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleSubmitReview}
                    className="bg-slate-800/50 rounded-xl p-6 mb-6"
                  >
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">
                        Your Rating
                      </label>
                      <div className="flex gap-1">
                        {renderStars(newRating, true, setNewRating)}
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">
                        Your Review
                      </label>
                      <textarea
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                        placeholder="Share your experience..."
                        rows={4}
                        className="w-full bg-slate-900/50 text-white px-4 py-3 rounded-lg border border-slate-700 focus:border-indigo-500 focus:outline-none resize-none"
                        required
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button type="submit" className="px-6 py-2">
                        Submit Review
                      </Button>
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.form>
                )}

                {/* Reviews List */}
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-slate-800/50 rounded-xl p-6"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-semibold">{review.user}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex gap-0.5">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-sm text-slate-400">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-slate-300 mb-3">{review.comment}</p>
                      <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        Helpful ({review.helpful})
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 sticky top-24">
                {/* Price */}
                <div className="mb-6 pb-6 border-b border-slate-700">
                  <div className="text-3xl font-bold text-indigo-400 mb-2">
                    {place.price === 0 ? "Free Entry" : `KSh ${place.price.toLocaleString()}`}
                  </div>
                  <p className="text-sm text-slate-400">Per person</p>
                </div>

                {/* Quick Info */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-indigo-400 mt-1" />
                    <div>
                      <p className="font-medium">Opening Hours</p>
                      <p className="text-sm text-slate-400">{place.openingHours}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-indigo-400 mt-1" />
                    <div>
                      <p className="font-medium">Best Time</p>
                      <p className="text-sm text-slate-400">{place.bestTimeToVisit}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-indigo-400 mt-1" />
                    <div>
                      <p className="font-medium">Difficulty</p>
                      <p className="text-sm text-slate-400">{place.difficulty}</p>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="mb-6 pb-6 border-b border-slate-700">
                  <h3 className="font-semibold mb-3">Contact</h3>
                  <div className="space-y-2">
                    <a
                      href={`tel:${place.contact.phone}`}
                      className="flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      {place.contact.phone}
                    </a>
                    <a
                      href={`mailto:${place.contact.email}`}
                      className="flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      {place.contact.email}
                    </a>
                  </div>
                </div>

                {/* Facilities */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Facilities</h3>
                  <div className="flex flex-wrap gap-2">
                    {place.facilities.map((facility, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-slate-700/50 rounded-full text-xs"
                      >
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Button className="w-full py-3 text-lg">
                  Get Directions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}