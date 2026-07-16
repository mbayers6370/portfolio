import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Books from './pages/Books'
import Art from './pages/Art'
import Project from './pages/Project'

export default function App() {
  return (
    <>
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
