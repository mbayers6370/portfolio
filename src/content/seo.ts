import { heroContent } from './hero'
import { candidateProfile } from './profile'
import projects from './projects'
import { designStudies } from './design-studies'
import sharingPreview from '../assets/portfolio-sharing.png'
import schedulerImage from '../assets/Scheduler_Hero.png'
import sonusImage from '../assets/Desktop_Home.png'
import nelaImage from '../assets/After.PNG'
import { books } from './books'
import artworks from './artworks'

export const siteOrigin = 'https://matthewbayers.com'
export const siteName = candidateProfile.name

export type SeoPage = {
  path: string
  title: string
  description: string
  image: string
  imageAlt: string
  section?: 'Work' | 'Design'
  noindex?: boolean
}

const projectMetadata: Record<string, { description: string; image?: string; imageAlt?: string }> = {
  sonus: {
    description: 'Explore Sonus, a language-learning application by Matthew Bayers, with structured lessons, focused practice, and a clear React and TypeScript interface.',
    image: sonusImage,
    imageAlt: 'Sonus language-learning dashboard',
  },
  'cs499-eportfolio': {
    description: 'An Android Scheduler redesign by Matthew Bayers, improving navigation, search, and visual hierarchy with Kotlin and Jetpack Compose.',
    image: schedulerImage,
    imageAlt: 'Android Scheduler interface',
  },
  nelaride: {
    description: 'A NELARide website and product design case study by Matthew Bayers, connecting branding, UI guidelines, and a consistent Rider and Driver experience.',
    image: nelaImage,
    imageAlt: 'Redesigned NELARide website',
  },
  margin: {
    description: 'Explore Margin by Matthew Bayers: a social platform with a finite feed, custom typography, original icons, and an interactive Next.js portfolio demo.',
  },
}

export const seoPages: SeoPage[] = [
  {
    path: '/',
    title: `${siteName} | ${heroContent.tagline}`,
    description: 'Matthew Bayers is a Frontend Developer with a background in graphic design. Explore React and TypeScript projects, interface design, and selected work.',
    image: sharingPreview,
    imageAlt: 'Matthew Bayers, Frontend Developer, with a sculptural moss and slate ribbon',
  },
  {
    path: '/books',
    title: `The Shape Sequence | Books by ${siteName}`,
    description: 'Discover The Shape Sequence by Matthew Bayers, including The Shape In The Echo and The Shape That Breaks: fiction exploring identity, memory, and belonging.',
    image: books[0].cover,
    imageAlt: 'The Shape In The Echo book cover',
  },
  {
    path: '/art',
    title: `Oil & Acrylic Paintings | ${siteName}`,
    description: 'Explore original oil and acrylic paintings by Matthew Bayers, with studies in presence, absence, restraint, and negative space.',
    image: artworks[0].src,
    imageAlt: artworks[0].title,
  },
  {
    path: '/design',
    title: `Design Studies & Collected Curiosities | ${siteName}`,
    description: 'Explore color palettes, typography, and interactive interface studies by Matthew Bayers, inspired by everyday observations, travel, and photography.',
    image: designStudies[0].image,
    imageAlt: designStudies[0].imageAlt,
  },
  ...projects.map((project): SeoPage => {
    const metadata = projectMetadata[project.slug]
    return {
      path: `/work/${project.slug}`,
      title: `${project.title} | ${project.slug === 'nelaride' ? 'Product Design' : 'Development'} Case Study | ${siteName}`,
      description: metadata.description,
      image: metadata.image ?? sharingPreview,
      imageAlt: metadata.imageAlt ?? 'Matthew Bayers, Frontend Developer, with a sculptural moss and slate ribbon',
      section: 'Work',
    }
  }),
  ...designStudies.map((study): SeoPage => ({
    path: `/design/${study.slug}`,
    title: `${study.title} | Design Study | ${siteName}`,
    description: `${study.summary} Explore ${study.title}, a color, typography, and interface study by ${siteName}.`,
    image: study.image,
    imageAlt: study.imageAlt,
    section: 'Design',
  })),
]

export const routeAliases: Record<string, string> = {
  '/design/after-dark': '/design/cayucos',
  '/design/fuji-in-the-distance': '/design/kyoto-to-tokyo',
}

export const notFoundSeo: SeoPage = {
  path: '/404',
  title: `Page Not Found | ${siteName}`,
  description: 'This page could not be found. Return to Matthew Bayers’s portfolio to explore development projects, design studies, books, and art.',
  image: sharingPreview,
  imageAlt: 'Matthew Bayers portfolio sharing graphic',
  noindex: true,
}

export function getPageSeo(pathname: string): SeoPage {
  const path = pathname.replace(/\/+$/, '') || '/'
  return seoPages.find((page) => page.path === (routeAliases[path] ?? path)) ?? notFoundSeo
}
