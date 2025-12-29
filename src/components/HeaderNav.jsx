import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HeaderNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-700/50">
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-bold tracking-wide"
      >
        <Link to="/" className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Nestor
        </Link>
      </motion.h1>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-8 text-slate-300">
        {[
          { name: "Home", path: "/" },
          { name: "Places", path: "/places" },
          { name: "About", path: "/about" },
          { name: "Contact", path: "/contact" }
        ].map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to={item.path}
              className="hover:text-white transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-400 group-hover:w-full transition-all duration-300" />
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden text-white p-2 hover:bg-slate-800 rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {mobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 md:hidden"
        >
          <nav className="flex flex-col px-6 py-4 gap-4 text-slate-300">
            {[
              { name: "Home", path: "/" },
              { name: "Places", path: "/places" },
              { name: "About", path: "/about" },
              { name: "Contact", path: "/contact" }
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white hover:bg-slate-800/50 transition-colors py-2 px-3 rounded-lg"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
}