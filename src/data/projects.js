const projects = [
  {
    slug: 'sonus',
    num: '01',
    title: 'Sonus',
    type: 'Full-Stack Web Application',
    desc: 'Sonus is a structured language-learning platform designed to help learners move beyond recognition and into real retention. It combines guided lessons, speaking practice, quizzes, and adaptive review to reinforce vocabulary through repeated use rather than passive exposure. The system tracks performance across different modes, including pronunciation and recall, so practice can focus on what is actually starting to slip. The goal is to create a calmer, more intentional learning experience that feels clear to navigate, grounded in real progress, and useful in everyday situations.',
    tags: ['React', 'TypeScript', 'Fastify', 'Prisma', 'PostgreSQL', 'Vite'],
    link: 'https://sonuslearning.com/',
    details: [
      {
        heading: 'The Problem',
        body: 'Most language-learning apps are built around streaks, repetition, and surface-level engagement. They make it easy to feel productive without creating much lasting retention. Sonus was built in response to that gap, with a structure that treats learning as something to be reinforced, revisited, and gradually made usable.',
      },
      {
        heading: 'Architecture',
        body: 'Sonus is designed as a structured learning system rather than a single study flow. Its architecture supports lesson progression, review logic, and performance tracking in a way that keeps the experience coherent while allowing the learning model itself to drive what happens next.',
      },
      {
        heading: 'Key Features',
        body: 'The platform moves learners through a full practice loop instead of relying on passive review alone. New material is introduced, revisited under different conditions, and surfaced again when performance begins to slip. Progress is tracked across that cycle so the system can respond to what is actually sticking.',
      },
    ],
    year: '2026',
    role: 'Full-Stack Developer',
  },
]

export default projects
