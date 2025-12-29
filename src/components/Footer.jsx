import { Link } from "react-router-dom";

export default function Footer() {
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
              {[
                { name: "About Us", path: "/about" },
                { name: "Places", path: "/places" },
                { name: "Contact", path: "/contact" }
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-slate-400 hover:text-indigo-400 transition-colors text-sm w-fit"
                >
                  {link.name}
                </Link>
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