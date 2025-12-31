// src/components/Layout.jsx
import HeaderNav from "./HeaderNav";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <>
      <HeaderNav />
      <main className="pt-24">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
