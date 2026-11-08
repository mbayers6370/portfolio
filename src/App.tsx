import { useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Art from "./pages/Art";
import Design from "./pages/Design";
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
          <Route path="/work/:slug" element={<Project />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
