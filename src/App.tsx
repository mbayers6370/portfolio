import { useEffect, useLayoutEffect } from "react";
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
import NotFound from "./pages/NotFound";
import Seo from "./components/Seo";
import { routeAliases } from "./content/seo";

const useBrowserLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

function ScrollToRoutePosition() {
  const { pathname, hash, key } = useLocation();

  useBrowserLayoutEffect(() => {
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
      <Seo />
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
          <Route path="/design/kyoto-to-tokyo" element={<KyotoToTokyo />} />
          {Object.entries(routeAliases).map(([from, to]) => <Route key={from} path={from} element={<Navigate to={to} replace />} />)}
          <Route path="/work/:slug" element={<Project />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
