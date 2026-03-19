import { Link } from "react-router-dom";
import "./PlaceCard.css";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80";

function PlaceCard({ place }) {
  const imageSrc = place.images?.[0] || place.image || FALLBACK_IMAGE;

  return (
    <Link to={`/place/${place.id}`} className="place-card">
      <div className="place-image">
        <img
          src={imageSrc}
          alt={place.name}
          loading="lazy"
          onError={(e) => {
            e.target.src = FALLBACK_IMAGE;
          }}
        />
      </div>

      <div className="place-content">
        <h3>{place.name}</h3>
        <p className="place-location">{place.location}, {place.county}</p>
        <p className="place-description">{place.description}</p>

        <div className="place-meta">
          {place.category && (
            <span className="place-tag">{place.category}</span>
          )}
          {place.price !== undefined && (
            <span className="place-price">
              {place.price === 0 ? "Free" : `KES ${place.price.toLocaleString()}`}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default PlaceCard;
