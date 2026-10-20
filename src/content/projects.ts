import type { Project } from '../types/content'
import nelaRideComponents from '../assets/Components.png'
import nelaRideIconography from '../assets/Iconography.png'
import nelaRideLayoutOne from '../assets/Layout&Design.png'
import nelaRideLayoutTwo from '../assets/Layout&Design(2).png'
import nelaRideTypographyOne from '../assets/Typography.png'
import nelaRideTypographyTwo from '../assets/Typography_2.png'
import schedulerHome from '../assets/eportfolio/scheduler-home.png'
import schedulerEvents from '../assets/eportfolio/scheduler-events.png'
import schedulerCollections from '../assets/eportfolio/scheduler-collections.png'

const projects: Project[] = [
  {
    slug: 'sonus',
    num: '03',
    title: 'Sonus',
    type: 'Full-Stack Web Application',
    desc: 'Sonus is a language-learning app built for serious learners. It uses native-speaker standards for fluency, draws from country-of-origin vocabulary lists, and organizes study into units that build on each other over time. It is not perfect, but it is honest, a language lab for the serious learner.',
    tags: ['React', 'TypeScript', 'Fastify', 'Prisma', 'PostgreSQL', 'Vite'],
    link: 'https://sonuslearning.com/',
    details: [
      {
        heading: 'The Problem',
        body: 'Sonus began with a simple problem: language learning is often too expensive, too opaque, and too difficult to access in a meaningful way. I wanted to build something more honest and structured, with vocabulary drawn from materials tied to the language’s country of origin and organized in a way that helps learners build over time. The goal was not just affordability, but accessibility through clarity, transparency, and a learning experience serious enough to be worth returning to.',
      },
      {
        heading: 'Architecture',
        body: 'Sonus is organized around guided units, vocabulary datasets, user progress, and adaptive review. The front end is designed to keep study clear and focused, while the back end manages content, authentication, performance tracking, and review logic. Its overall structure supports repeated exposure, recall, and speaking practice, so learning can build over time rather than disappear after a single pass.',
      },
      {
        heading: 'Key Features',
        body: 'Sonus combines structured lesson paths with focused practice modes designed for different kinds of learning. Learners move through unit-based tracks with Learn, Quiz, and Speak stages, while Practice Focus reinforces retention through a 70/30 split of current lesson material and review words that need support. Travel Sprint offers a separate path for users preparing for a trip, with practical scenario-based phrases for airports, transport, hotels, restaurants, shopping, and emergencies. The platform also includes progress reporting and review tracking, giving learners a clearer view of what they have completed, what is slipping, and what needs to be returned to practice.',
      },
    ],
    year: '2026',
    role: 'Full-Stack Developer',
  },
  {
    slug: 'cs499-eportfolio',
    num: '02',
    title: 'Android Scheduler',
    type: 'Android Application',
    desc: 'Redesigning a scheduling experience around clarity, hierarchy, and discoverability.',
    tags: ['Kotlin', 'Jetpack Compose', 'Android', 'UI/UX Design'],
    link: 'https://mbayers6370.github.io/cs499-eportfolio/',
    linkLabel: 'ePortfolio',
    details: [
      {
        heading: 'Navigation & Information Architecture',
        body: 'The redesign moves from a mixed event list and dropdown-based navigation to explicit destinations and distinct content areas, giving events and collections clearer places to live.',
      },
      {
        heading: 'Search & Interaction',
        body: 'A visible search field replaces the less prominent search icon and translucent overlay, while contextual creation controls make the next action clear within each destination.',
      },
      {
        heading: 'Visual Hierarchy & Consistency',
        body: 'Primary event cards, secondary collections, calmer action hierarchy, and consistent typography and spacing make the interface easier to scan and act on.',
      },
    ],
    galleryLabel: 'Android Scheduler',
    gallery: [
      {
        src: schedulerHome,
        alt: 'Android Scheduler home screen showing upcoming events and collections',
        label: 'Schedule',
      },
      {
        src: schedulerEvents,
        alt: 'Android Scheduler event details screen',
        label: 'Event details',
      },
      {
        src: schedulerCollections,
        alt: 'Android Scheduler collections screen',
        label: 'Collections',
      },
    ],
    year: '2026',
    role: 'UI/UX Design & Android Development',
  },
  {
    slug: 'nelaride',
    num: '01',
    title: 'NELARide',
    type: 'Product Design / Website Redesign',
    desc: 'NELARide is a community rideshare startup building connected Rider and Driver apps. I began by spearheading the website redesign, then expanded into product design work across the platform, helping shape branding, UI guidelines, and a more cohesive visual system across both apps.',
    tags: ['Branding', 'Product Design', 'UI Design', 'Design Systems', 'UX Audit', 'Website Redesign'],
    link: 'https://nelaride.com',
    linkLabel: 'Live Site',
    details: [
      {
        heading: 'The Problem',
        body: 'NELARide needed a clearer and more cohesive design presence across its public website and its two-sided product ecosystem. With separate Rider and Driver experiences, the challenge was not only making each surface feel polished, but making the brand and interface system feel consistent across the company as a whole.',
      },
      {
        heading: 'Design Scope',
        body: 'My work started with the website redesign, where I focused on clarifying the visual direction and strengthening how the company presented itself publicly. From there, I moved into broader product design efforts, helping define branding and UI guidelines and auditing the Rider and Driver apps to identify inconsistencies, improve cohesion, and support a more unified system.',
      },
      {
        heading: 'Impact',
        body: 'This work centered on system-building rather than a single screen or flow. I contributed to a more consistent design language across web and product, established guidelines that could support future design decisions, and helped move the platform toward a more intentional, scalable identity for both riders and drivers.',
      },
    ],
    galleryLabel: 'Design System',
    gallery: [
      {
        src: nelaRideComponents,
        alt: 'NELARide UI guideline page for components',
        label: 'Components',
      },
      {
        src: nelaRideIconography,
        alt: 'NELARide UI guideline page for iconography',
        label: 'Iconography',
      },
      {
        src: nelaRideLayoutOne,
        alt: 'NELARide UI guideline page for layout and design one',
        label: 'Layout & Design I',
      },
      {
        src: nelaRideLayoutTwo,
        alt: 'NELARide UI guideline page for layout and design two',
        label: 'Layout & Design II',
      },
      {
        src: nelaRideTypographyOne,
        alt: 'NELARide UI guideline page for typography one',
        label: 'Typography I',
      },
      {
        src: nelaRideTypographyTwo,
        alt: 'NELARide UI guideline page for typography two',
        label: 'Typography II',
      },
    ],
    year: '2026',
    role: 'Product Design Intern',
  },
  {
    slug: 'travlr',
    num: '04',
    title: 'Travlr',
    type: 'Independent UI/UX Redesign',
    desc: 'A full-stack travel booking application independently redesigned to create a clearer, more cohesive booking experience.',
    tags: ['UI/UX Design', 'Full-Stack Development', 'Responsive Design'],
    link: 'https://github.com/mbayers6370/Travlr',
    linkLabel: 'GitHub repository',
    details: [
      {
        heading: 'Starting with the foundation',
        body: 'Travlr Getaways began as a full-stack application developed for a computer science course. The original work met the technical requirements of a travel booking site, but its older template did not provide the visual clarity or cohesion expected from a polished product experience.',
      },
      {
        heading: 'Redesigning the experience',
        body: 'I independently reimagined the interface with a modern visual identity, improved navigation, clearer content hierarchy, and more intuitive layouts. The redesign carried across travel packages, accommodations, dining, and contact pages so the application would feel like one connected experience rather than a collection of templates.',
      },
      {
        heading: 'Using comparison with purpose',
        body: 'The before-and-after work makes the redesign tangible. It shows how visual hierarchy, navigation, spacing, and page structure can shift an interface from technically complete to easier to understand, scan, and use.',
      },
      {
        heading: 'Beyond the requirements',
        body: 'This project demonstrates the ability to take a complete web application beyond its technical foundation and apply UI/UX principles across the whole experience. The independent redesign became an opportunity to practice systems thinking, visual consistency, and user-centered decision-making in a real product context.',
      },
    ],
    year: '2026',
    role: 'Full-Stack Developer & UI/UX Designer',
  },
]

export default projects
