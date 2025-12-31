// src/components/Footer.jsx
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-brand">
          <h3>Nestor</h3>
          <p>
            Discover Kenya’s hidden outdoor gems — from waterfalls to peaceful
            hiking trails.
          </p>
        </div>

        {/* Links */}
        <div className="footer-links">
          <h4>Explore</h4>
          <Link to="/places">Places</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Extra */}
        <div className="footer-links">
          <h4>More</h4>
          <a href="#" aria-disabled="true">Submit a place</a>
          <a href="#" aria-disabled="true">Privacy Policy</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} Nestor. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
