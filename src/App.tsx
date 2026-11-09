import { useLayoutEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Art from "./pages/Art";
import Design from "./pages/Design";
import OvercastAfternoon from "./pages/OvercastAfternoon";
import Cayucos from "./pages/Cayucos";
import KyotoToTokyo from "./pages/KyotoToTokyo";
import Project from "./pages/Project";

function ScrollToRoutePosition() {
  const { pathname, hash, key } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      const sectionId = decodeURIComponent(hash.slice(1));
      const desktopSection = window.matchMedia("(min-width: 901px)").matches
        ? document.getElementById(`desktop-${sectionId}`)
        : null;
      (desktopSection || document.getElementById(sectionId))?.scrollIntoView();
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname, hash, key]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToRoutePosition />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/art" element={<Art />} />
          <Route path="/design" element={<Design />} />
          <Route path="/design/an-overcast-afternoon" element={<OvercastAfternoon />} />
          <Route path="/design/cayucos" element={<Cayucos />} />
          <Route path="/design/after-dark" element={<Navigate to="/design/cayucos" replace />} />
          <Route path="/design/kyoto-to-tokyo" element={<KyotoToTokyo />} />
          <Route path="/design/fuji-in-the-distance" element={<Navigate to="/design/kyoto-to-tokyo" replace />} />
          <Route path="/work/:slug" element={<Project />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
