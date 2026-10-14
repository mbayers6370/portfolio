import { useLayoutEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Books from './pages/Books'
import Art from './pages/Art'
import Project from './pages/Project'

function ScrollToRoutePosition() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if (hash) {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
      return
    }

    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
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
          <Route path="/work/:slug" element={<Project />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
