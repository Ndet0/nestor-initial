import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import PlacesPage from "./components/PlacesPage";
import PlaceDetailPage from "./components/PlaceDetailPage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import AdminPlaceForm from "./components/AdminPlaceForm";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      {/* Landing page */}
      <Route path="/" element={<LandingPage />} />

      {/* Admin page (NO public layout) */}
      <Route path="/admin" element={<AdminPlaceForm />} />

      {/* Public pages with layout */}
      <Route
        path="/places"
        element={
          <Layout>
            <PlacesPage />
          </Layout>
        }
      />

      <Route
        path="/place/:id"
        element={
          <Layout>
            <PlaceDetailPage />
          </Layout>
        }
      />

      <Route
        path="/about"
        element={
          <Layout>
            <AboutPage />
          </Layout>
        }
      />

      <Route
        path="/contact"
        element={
          <Layout>
            <ContactPage />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
