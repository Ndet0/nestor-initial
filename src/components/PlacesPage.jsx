import { useEffect, useState } from "react";
import PlaceCard from "./PlaceCard";
import "./PlacesPage.css";

function PlacesPage() {
  const [places, setPlaces] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/places")
      .then(res => res.json())
      .then(data => {
        setPlaces(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
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
