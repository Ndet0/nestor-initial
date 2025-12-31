// src/components/HeaderNav.jsx
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import "./HeaderNav.css";

function HeaderNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="logo">
          Nestor
        </Link>

        {/* Desktop Nav */}
        <nav className="nav-links">
          <NavLink to="/places">Places</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <NavLink to="/places" onClick={() => setMenuOpen(false)}>
            Places
          </NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>
            About
          </NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </NavLink>
        </div>
      )}
    </header>
  );
}

export default HeaderNav;
