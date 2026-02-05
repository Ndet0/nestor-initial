import { useEffect, useState } from "react";
import PlaceCard from "./PlaceCard";
import "./PlacesPage.css";

const API_URL = import.meta.env.VITE_API_URL;

function PlacesPage() {
  const [places, setPlaces] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/places`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to load places");
        return res.json();
      })
      .then(data => {
        setPlaces(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const categories = [
    "All",
    ...new Set(places.map(place => place.category).filter(Boolean))
  ];

  const filteredPlaces =
    selectedCategory === "All"
      ? places
      : places.filter(place => place.category === selectedCategory);

  if (loading) {
    return <div className="text-center text-white py-20">Loading places...</div>;
  }

  if (error) {
    return (
      <div className="places-page container">
        <div className="text-center py-20">
          <h2 className="text-xl text-white mb-4">Something went wrong</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="filter-btn active"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="places-page container">
      <header className="places-header">
        <h1>Explore Outdoor Places</h1>
        <p>
          Discover waterfalls, hiking trails, picnic spots, and nature escapes
          across Kenya.
        </p>
      </header>

      {/* Category Filter */}
      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category}
            className={
              category === selectedCategory
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Places Grid */}
      {filteredPlaces.length > 0 ? (
        <section className="places-grid">
          {filteredPlaces.map(place => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </section>
      ) : (
        <div className="empty-state">
          <p>No places found for this category.</p>
        </div>
      )}
    </div>
  );
}

export default PlacesPage;
