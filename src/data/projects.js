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
  {
    slug: 'abovo',
    num: '02',
    title: 'abovo',
    type: 'Full-Stack Web Application',
    desc: 'abovo is a recipe and meal-planning app built for the full rhythm of home cooking. It helps users capture recipes from wherever they find them, organize what matters, plan meals for the week, build grocery lists that make sense in the store, and cook from a cleaner step-by-step interface. It is designed less as a recipe archive and more as a working kitchen system.',
    tags: ['Next.js', 'React', 'Prisma', 'PostgreSQL', 'Zod', 'PWA'],
    link: 'https://recipes-peach-two.vercel.app',
    details: [
      {
        heading: 'The Problem',
        body: 'abovo began with a familiar frustration: recipes are easy to save and hard to use. They end up scattered across websites, screenshots, notes, and social posts, disconnected from the actual work of planning meals, shopping for ingredients, and cooking dinner. I wanted to build something that treated cooking as a complete flow rather than a collection of saved links, making it easier to move from inspiration to preparation without losing clarity along the way.',
      },
      {
        heading: 'Architecture',
        body: 'abovo is structured as a full-stack Next.js application with React on the front end, Prisma as the data layer, and PostgreSQL for persistent storage. Recipe imports from links, pasted text, and images are parsed and normalized into local structured records, which can then be edited, categorized, attached to meal plans, and reused across the app without depending on the source at read time. From there, the system connects recipe data to shared kitchen membership, weekly planning state, grocery-list generation, and cook-mode presentation, so each part of the product feeds the next instead of existing as a separate tool.',
      },
      {
        heading: 'Key Features',
        body: 'abovo combines recipe import, weekly planning, grocery generation, and cooking tools into one continuous experience, but its most distinctive feature is the shared kitchen. Instead of treating meal planning as a single-user task, the app creates a collaborative household space where recipes, meal ideas, and plans can be shared across the people actually cooking and shopping together. Alongside that, users can save recipes from URLs, pasted text, photos, or screenshots, organize them into folders, cook from a focused step-by-step view with inline timers, and generate grocery lists that are normalized and grouped for more practical use in the store. The result is a system that supports both personal organization and real shared decision-making around food.',
      },
    ],
    year: '2026',
    role: 'Full-Stack Developer',
  },
]

export default projects
