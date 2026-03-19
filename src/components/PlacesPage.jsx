import { useEffect, useState, useMemo } from "react";
import { Search } from "lucide-react";
import { fetchPlaces } from "../utils/api";
import PlaceCard from "./PlaceCard";
import "./PlacesPage.css";

function PlacesPage() {
  const [places, setPlaces] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCounty, setSelectedCounty] = useState("All Counties");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchPlaces()
      .then((data) => {
        if (!cancelled) {
          setPlaces(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(places.map((p) => p.category).filter(Boolean))],
    [places]
  );

  const counties = useMemo(
    () => [
      "All Counties",
      ...new Set(places.map((p) => p.county).filter(Boolean)),
    ],
    [places]
  );

  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      const matchesCategory =
        selectedCategory === "All" || place.category === selectedCategory;
      const matchesCounty =
        selectedCounty === "All Counties" || place.county === selectedCounty;
      const matchesSearch =
        !searchQuery ||
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesCounty && matchesSearch;
    });
  }, [places, selectedCategory, selectedCounty, searchQuery]);

  if (loading) {
    return (
      <div className="places-page container">
        <div className="loading-state">
          <div className="spinner" />
          <p>Loading places...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="places-page container">
        <div className="error-state">
          <h2>Something went wrong</h2>
          <p>{error}</p>
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

      {/* Search */}
      <div className="search-bar">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          placeholder="Search by name or location…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search places"
        />
      </div>

      {/* Filters */}
      <div className="filters-row">
        <div className="category-filter">
          {categories.map((category) => (
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

        <select
          className="county-select"
          value={selectedCounty}
          onChange={(e) => setSelectedCounty(e.target.value)}
          aria-label="Filter by county"
        >
          {counties.map((county) => (
            <option key={county} value={county}>
              {county}
            </option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <p className="results-count">
        {filteredPlaces.length} place{filteredPlaces.length !== 1 ? "s" : ""} found
      </p>

      {/* Grid */}
      {filteredPlaces.length > 0 ? (
        <section className="places-grid">
          {filteredPlaces.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </section>
      ) : (
        <div className="empty-state">
          <p>No places match your filters.</p>
          <button
            className="filter-btn active"
            onClick={() => {
              setSelectedCategory("All");
              setSelectedCounty("All Counties");
              setSearchQuery("");
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default PlacesPage;
