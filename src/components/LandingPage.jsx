import { motion } from "framer-motion";
import { useState } from "react";
import Button from "./Button";

// Header Component
function HeaderNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-700/50">
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-bold tracking-wide bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
      >
        Nestor
      </motion.h1>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-8 text-slate-300">
        {["Home", "Categories", "About", "Contact"].map((item, i) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="hover:text-white transition-colors relative group"
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-400 group-hover:w-full transition-all duration-300" />
          </motion.a>
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
            {["Home", "Categories", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white hover:bg-slate-800/50 transition-colors py-2 px-3 rounded-lg"
              >
                {item}
              </a>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
}

// Footer Component
function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: "Twitter", icon: "𝕏", url: "https://twitter.com" },
    { name: "Instagram", icon: "📷", url: "https://instagram.com" },
    { name: "Facebook", icon: "👤", url: "https://facebook.com" },
  ];

  return (
    <footer className="w-full mt-32 py-12 bg-slate-950 border-t border-slate-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Nestor
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Discover Kenya — One Hidden Gem at a Time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {["About Us", "Categories", "Events", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(" ", "-")}`}
                  className="text-slate-400 hover:text-indigo-400 transition-colors text-sm w-fit"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect With Us</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-indigo-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-slate-500 text-sm">
            © {currentYear} Nestor Adventures. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main Landing Page Component
export default function LandingPage() {
  const stats = [
    { label: "Active Events", value: "500+" },
    { label: "Communities", value: "150+" },
    { label: "Happy Users", value: "10K+" },
  ];

  const categories = [
    { 
      name: "Tech & Innovation", 
      icon: "💡", 
      color: "from-blue-500/20 to-cyan-500/20",
      description: "Explore cutting-edge technology events and innovation hubs."
    },
    { 
      name: "Entertainment", 
      icon: "🎭", 
      color: "from-purple-500/20 to-pink-500/20",
      description: "Discover live shows, concerts, and cultural performances."
    },
    { 
      name: "Fitness & Wellness", 
      icon: "🏃", 
      color: "from-green-500/20 to-emerald-500/20",
      description: "Join fitness classes, yoga sessions, and wellness retreats."
    },
    { 
      name: "Nightlife", 
      icon: "🌙", 
      color: "from-indigo-500/20 to-purple-500/20",
      description: "Experience vibrant clubs, bars, and night events."
    },
    { 
      name: "Travel & Outdoors", 
      icon: "🌍", 
      color: "from-orange-500/20 to-red-500/20",
      description: "Plan adventures, hikes, and outdoor excursions."
    },
    { 
      name: "Business & Networking", 
      icon: "💼", 
      color: "from-slate-500/20 to-gray-500/20",
      description: "Connect with professionals and attend networking events."
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <HeaderNav />

      {/* Hero Section */}
      <section id="home" className="px-6 pt-20 pb-10 text-center max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            Discover, Connect & Explore With
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="block mt-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Nestor
            </motion.span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-base sm:text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Your gateway to events, communities and experiences tailored to your vibe.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Button className="text-lg px-10 py-4 shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40">
            Explore Now
          </Button>
        </motion.div>

        {/* Floating stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20 flex flex-wrap justify-center gap-8 md:gap-12"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="text-center cursor-default"
            >
              <div className="text-3xl md:text-4xl font-bold text-indigo-400">{stat.value}</div>
              <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Categories Grid */}
      <section id="categories" className="mt-20 px-6 max-w-6xl mx-auto relative z-10">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-semibold mb-12 text-center"
        >
          Top Categories
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`bg-gradient-to-br ${item.color} backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-700/50 cursor-pointer hover:border-indigo-400/50 transition-all duration-300 group`}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h4 className="text-xl font-semibold mb-3">{item.name}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section - NEW */}
      <section id="about" className="mt-32 px-6 max-w-6xl mx-auto relative z-10">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-semibold mb-12 text-center"
        >
          Why Choose Nestor?
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Curated Events",
              description: "Hand-picked events tailored to your interests and location.",
              icon: "✨"
            },
            {
              title: "Community Driven",
              description: "Connect with like-minded people and build lasting relationships.",
              icon: "🤝"
            },
            {
              title: "Easy Discovery",
              description: "Find your next adventure with our intuitive search and filters.",
              icon: "🔍"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="text-center p-6"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="mt-32 px-6 text-center max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl p-8 sm:p-12 border border-indigo-500/20 backdrop-blur-sm"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">Ready to Dive In?</h3>
          <p className="text-slate-300 mb-10 text-base sm:text-lg leading-relaxed">
            Join thousands exploring new opportunities, communities and vibes across Kenya.
          </p>
          <Button className="text-lg px-10 py-4 shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50">
            Create Account
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}