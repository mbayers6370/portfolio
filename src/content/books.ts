import cover01 from '../assets/The Shape in the Echo - Kindle - 2.jpg'
import cover02 from '../assets/The Shape that Breaks - Kindle.png'
import type { Book } from '../types/content'

export const booksPageContent = {
  pageLabel: 'Writing',
  title: ['The Shape', 'Sequence.'],
  subtitle: 'A series about the architecture of a world meant to make you forget.',
  authorQuote: 'Writing found me when everything else fell apart.',
  authorBio:
    "Matthew Bayers is a self-published author, full-stack developer, and painter. His fiction explores queer identity, memory, and the architecture of worlds that feel just slightly out of reach, built for anyone who has ever felt like they didn't quite fit.",
  backLabel: '← Back to portfolio',
}

export const books: Book[] = [
  {
    number: '01',
    title: 'The Shape\nIn The Echo',
    status: 'Available Now',
    statusClass: 'available',
    description:
      'A story of memory, identity, and what gets left behind when the world resets around you. Book one of The Shape Sequence.',
    link: 'https://www.amazon.com/dp/B0DPF54L84',
    linkLabel: 'Buy on Amazon →',
    cover: cover01,
  },
  {
    number: '02',
    title: 'The Shape\nThat Breaks',
    status: 'Available Now',
    statusClass: 'available',
    description:
      "Lucian's reset comes with memories marked into his skin. He wakes in the city of Vaelor with a new promotion and an Engine that is on the brink of total control.",
    link: 'https://www.amazon.com/dp/B0GJ5FG1L4',
    linkLabel: 'Buy on Amazon →',
    cover: cover02,
  },
]
