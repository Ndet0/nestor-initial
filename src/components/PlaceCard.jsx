// src/components/PlaceCard.jsx
import { Link } from "react-router-dom";
import "./PlaceCard.css";

function PlaceCard({ place }) {
  return (
    <Link to={`/place/${place.id}`} className="place-card">
      <div className="place-image">
        <img
          src={place.image}
          alt={place.name}
          loading="lazy"
        />
      </div>

      <div className="place-content">
        <h3>{place.name}</h3>

        <p className="place-location">{place.location}</p>

        <p className="place-description">
          {place.description}
        </p>

        {place.category && (
          <span className="place-tag">{place.category}</span>
        )}
      </div>
    </Link>
  );
}

export default PlaceCard;
