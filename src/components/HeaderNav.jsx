import { Link, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import "./HeaderNav.css";

function HeaderNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [prevPathname, setPrevPathname] = useState(location.pathname);

  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname);
    if (menuOpen) setMenuOpen(false);
  }

  return (
    <header className="header" role="banner">
      <div className="nav-container">
        <Link to="/" className="logo">
          Nestor
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          <NavLink to="/places">Places</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <nav className="mobile-menu" aria-label="Mobile navigation">
          <NavLink to="/places">Places</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      )}
    </header>
  );
}

export default HeaderNav;
