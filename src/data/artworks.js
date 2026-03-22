import rose from '../assets/Rose_BW.jpeg'
import lemons from '../assets/Lemons.jpeg'
import bathtub from '../assets/Bathtub_Benjamin.jpeg'
import copperFlowers from '../assets/Copper_Flowers.jpeg'

const toTitleFromFilename = (path) =>
  path
    .split('/')
    .pop()
    .replace(/\.[^/.]+$/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())

const artworks = [
  { src: lemons, title: 'Jenny\'s Flowers', medium: 'Oil on canvas' },
  { src: copperFlowers, title: 'Copper & Shadow', medium: 'Oil on canvas' },
  { src: bathtub, title: 'A Pivot', medium: 'Oil on canvas' },
  { src: rose, title: 'The Final Rose', medium: 'Acrylic on canvas', pos: '65% center' },
].map((art) => ({
  ...art,
  title: art.title || toTitleFromFilename(art.src),
}))

export default artworks
