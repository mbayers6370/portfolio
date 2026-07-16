import '../styles/home.css'
import Hero from '../components/Hero'
import Work from '../components/Work'
import About from '../components/About'
import BooksArt from '../components/BooksArt'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <About />
      <BooksArt />
      <Contact />
    </>
  )
}
