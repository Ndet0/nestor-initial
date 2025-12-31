// src/components/LandingPage.jsx
import { Link } from "react-router-dom";
import HeaderNav from "./HeaderNav";
import Footer from "./Footer";
import "./LandingPage.css";

function LandingPage() {
  return (
    <>
      <HeaderNav />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Discover Kenya’s Hidden Outdoor Gems</h1>
          <p>
            Explore waterfalls, hiking trails, picnic spots, and nature escapes
            across Kenya — all in one place.
          </p>

          <Link to="/places" className="primary-btn">
            Explore Places
          </Link>
        </div>
      </section>

      {/* Intro Section */}
      <section className="intro container">
        <h2>Why Nestor?</h2>
        <p>
          Kenya is full of breathtaking outdoor destinations that often go
          unnoticed. Nestor helps adventurers, families, and travelers discover
          authentic experiences beyond the usual tourist routes.
        </p>
      </section>

      {/* Highlights */}
      <section className="highlights container">
        <div className="highlight-card">
          <h3>🌿 Nature First</h3>
          <p>Discover trails, waterfalls, and peaceful outdoor escapes.</p>
        </div>

        <div className="highlight-card">
          <h3>🗺️ Local Gems</h3>
          <p>Find places recommended and explored by locals.</p>
        </div>

        <div className="highlight-card">
          <h3>🥾 Adventure Ready</h3>
          <p>Perfect for hikers, campers, and weekend explorers.</p>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default LandingPage;
