// src/components/PlaceDetailPage.jsx
import { useParams, Link } from "react-router-dom";
import placesData from "../data/Places";
import "./PlaceDetailPage.css";

function PlaceDetailPage() {
  const { id } = useParams();
  const place = placesData.find(p => p.id === id);

  if (!place) {
    return (
      <div className="container place-not-found">
        <h2>Place not found</h2>
        <p>The place you’re looking for doesn’t exist.</p>
        <Link to="/places" className="primary-btn">
          Back to Places
        </Link>
      </div>
    );
  }

  return (
    <div className="place-detail">
      {/* Hero Image */}
      <section
        className="detail-hero"
        style={{ backgroundImage: `url(${place.image})` }}
      >
        <div className="detail-overlay">
          <h1>{place.name}</h1>
          <p>{place.location}</p>
        </div>
      </section>

      {/* Content */}
      <section className="container detail-content">
        <div className="detail-main">
          <h2>About this place</h2>
          <p>{place.description}</p>

          {place.tips && (
            <>
              <h3>Tips</h3>
              <p>{place.tips}</p>
            </>
          )}
        </div>

        {/* Sidebar */}
        <aside className="detail-sidebar">
          <div className="info-card">
            <h3>Details</h3>

            {place.category && (
              <div className="info-row">
                <span>Category</span>
                <span>{place.category}</span>
              </div>
            )}

            {place.difficulty && (
              <div className="info-row">
                <span>Difficulty</span>
                <span>{place.difficulty}</span>
              </div>
            )}

            {place.bestSeason && (
              <div className="info-row">
                <span>Best Season</span>
                <span>{place.bestSeason}</span>
              </div>
            )}
          </div>

          <Link to="/places" className="back-link">
            ← Back to places
          </Link>
        </aside>
      </section>
    </div>
  );
}

export default PlaceDetailPage;
