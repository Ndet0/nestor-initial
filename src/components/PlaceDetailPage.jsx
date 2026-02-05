// src/components/PlaceDetailPage.jsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./PlaceDetailPage.css";

const API_URL = import.meta.env.VITE_API_URL;

function PlaceDetailPage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/places/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Place not found");
        return res.json();
      })
      .then(data => {
        setPlace(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="container text-center py-20">Loading...</div>;
  }

  if (error || !place) {
    return (
      <div className="container place-not-found">
        <h2>Place not found</h2>
        <p>The place you're looking for doesn't exist.</p>
        <Link to="/places" className="primary-btn">
          Back to Places
        </Link>
      </div>
    );
  }

  // Support both single image and images array
  const heroImage = place.images?.[0] || place.image;

  return (
    <div className="place-detail">
      {/* Hero Image */}
      <section
        className="detail-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
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

          {place.highlights?.length > 0 && (
            <>
              <h3>Highlights</h3>
              <ul>
                {place.highlights.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </>
          )}

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

            {place.price !== undefined && (
              <div className="info-row">
                <span>Price</span>
                <span>{place.price === 0 ? "Free" : `KES ${place.price}`}</span>
              </div>
            )}

            {place.difficulty && (
              <div className="info-row">
                <span>Difficulty</span>
                <span>{place.difficulty}</span>
              </div>
            )}

            {place.duration && (
              <div className="info-row">
                <span>Duration</span>
                <span>{place.duration}</span>
              </div>
            )}

            {(place.bestTimeToVisit || place.bestSeason) && (
              <div className="info-row">
                <span>Best Time</span>
                <span>{place.bestTimeToVisit || place.bestSeason}</span>
              </div>
            )}

            {place.openingHours && (
              <div className="info-row">
                <span>Hours</span>
                <span>{place.openingHours}</span>
              </div>
            )}
          </div>

          {(place.phone || place.email) && (
            <div className="info-card">
              <h3>Contact</h3>
              {place.phone && (
                <div className="info-row">
                  <span>Phone</span>
                  <span>{place.phone}</span>
                </div>
              )}
              {place.email && (
                <div className="info-row">
                  <span>Email</span>
                  <span>{place.email}</span>
                </div>
              )}
            </div>
          )}

          <Link to="/places" className="back-link">
            ← Back to places
          </Link>
        </aside>
      </section>
    </div>
  );
}

export default PlaceDetailPage;
