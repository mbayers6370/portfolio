const projects = [
  {
    slug: 'sonus',
    num: '01',
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
]

export default projects
