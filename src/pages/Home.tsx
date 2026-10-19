import '../styles/home.css'
import Hero from '../components/Hero'
import Work from '../components/Work'
import About from '../components/About'
import BooksArt from '../components/BooksArt'
import Contact from '../components/Contact'
import DesktopHome from '../components/DesktopHome'

export default function Home() {
  return (
    <>
      <DesktopHome />
      <div className="home-mobile">
        <Hero />
        <Work />
        <About />
        <BooksArt />
        <Contact />
      </div>
    </>
  )
}
