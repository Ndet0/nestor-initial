import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPlaceById } from "../utils/api";
import "./PlaceDetailPage.css";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=80";

function PlaceDetailPage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [error, setError] = useState(null);
  const [prevId, setPrevId] = useState(id);

  if (prevId !== id) {
    setPrevId(id);
    setPlace(null);
    setError(null);
  }

  const loading = !place && !error;

  useEffect(() => {
    let cancelled = false;

    fetchPlaceById(id)
      .then((data) => {
        if (!cancelled) setPlace(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="place-detail">
        <div className="detail-hero detail-hero--loading" />
        <div className="container detail-content">
          <div className="detail-main">
            <div className="skeleton skeleton-title" />
            <div className="skeleton skeleton-text" />
            <div className="skeleton skeleton-text short" />
          </div>
          <aside className="detail-sidebar">
            <div className="skeleton skeleton-card" />
          </aside>
        </div>
      </div>
    );
  }

  if (error || !place) {
    return (
      <div className="container place-not-found">
        <h2>{error === "Place not found" ? "Place not found" : "Something went wrong"}</h2>
        <p>
          {error === "Place not found"
            ? "The place you're looking for doesn't exist."
            : error || "An unexpected error occurred."}
        </p>
        <Link to="/places" className="primary-btn">
          Back to Places
        </Link>
      </div>
    );
  }

  const heroImage = place.images?.[0] || place.image || FALLBACK_IMAGE;

  return (
    <article className="place-detail">
      {/* Hero */}
      <section
        className="detail-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
        role="img"
        aria-label={`Photo of ${place.name}`}
      >
        <div className="detail-overlay">
          <h1>{place.name}</h1>
          <p>{place.location}, {place.county}</p>
        </div>
      </section>

      {/* Content */}
      <section className="container detail-content">
        <div className="detail-main">
          <h2>About this place</h2>
          <p>{place.description || "No description available."}</p>

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

          {place.facilities?.length > 0 && (
            <>
              <h3>Facilities</h3>
              <ul>
                {place.facilities.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
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
                <span>
                  {place.price === 0
                    ? "Free"
                    : `KES ${Number(place.price).toLocaleString()}`}
                </span>
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
                  <a href={`tel:${place.phone}`}>{place.phone}</a>
                </div>
              )}
              {place.email && (
                <div className="info-row">
                  <span>Email</span>
                  <a href={`mailto:${place.email}`}>{place.email}</a>
                </div>
              )}
            </div>
          )}

          <Link to="/places" className="back-link">
            &larr; Back to places
          </Link>
        </aside>
      </section>
    </article>
  );
}

export default PlaceDetailPage;
