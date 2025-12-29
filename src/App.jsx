import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import PlacesPage from "./components/PlacesPage";
import PlaceDetailPage from "./components/PlaceDetailPage";
import HeaderNav from "./components/HeaderNav";
import Footer from "./components/Footer";

// Temporary placeholder components for About and Contact
function AboutPage() {
  return (
    <>
      <HeaderNav />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white pt-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About Nestor</h1>
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
            <p className="text-slate-300 leading-relaxed mb-4">
              Nestor is your gateway to discovering Kenya's hidden gems. From breathtaking hiking trails 
              to stunning waterfalls, we help you explore the beauty of Kenya.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Our mission is to connect adventure seekers with unique experiences across the country, 
              making it easier for families, students, and travelers to discover amazing places.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

function ContactPage() {
  return (
    <>
      <HeaderNav />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white pt-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
            <p className="text-slate-300 leading-relaxed mb-6">
              Have questions or want to suggest a place? We'd love to hear from you!
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <a href="mailto:info@nestor.co.ke" className="text-indigo-400 hover:text-indigo-300">
                  info@nestor.co.ke
                </a>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Phone</h3>
                <a href="tel:+254700000000" className="text-indigo-400 hover:text-indigo-300">
                  +254 700 000 000
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page - Has its own header and footer built-in */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Places Pages - Add HeaderNav and Footer */}
        <Route 
          path="/places" 
          element={
            <>
              <HeaderNav />
              <PlacesPage />
              <Footer />
            </>
          } 
        />
        <Route 
          path="/place/:id" 
          element={
            <>
              <HeaderNav />
              <PlaceDetailPage />
              <Footer />
            </>
          } 
        />
        
        {/* Other Pages */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;