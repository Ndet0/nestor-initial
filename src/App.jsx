import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import PlacesPage from "./components/PlacesPage";
import PlaceDetailPage from "./components/PlaceDetailPage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import AdminPlaceForm from "./components/AdminPlaceForm";
import NotFoundPage from "./components/NotFoundPage";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/admin" element={<AdminPlaceForm />} />

      <Route path="/places" element={<Layout><PlacesPage /></Layout>} />
      <Route path="/place/:id" element={<Layout><PlaceDetailPage /></Layout>} />
      <Route path="/about" element={<Layout><AboutPage /></Layout>} />
      <Route path="/contact" element={<Layout><ContactPage /></Layout>} />

      <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
    </Routes>
  );
}

export default App;
