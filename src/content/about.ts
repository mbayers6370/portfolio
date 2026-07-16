export type SkillGroups = Record<string, string[]>

export const aboutContent = {
  label: 'About',
  title: ['Who', 'I Am'],
  intro: [
    'I work across product design, branding, and software development, with a background in graphic design that shapes how I think about systems. I care about how products work, how they communicate, and how they hold together visually from one surface to the next.',
    'I am at my best when I can shape a product from multiple angles at once: defining the visual language, refining the user experience, and building the underlying interfaces that bring it to life. I tend to do my strongest work where branding, product thinking, and code overlap, because that is where a product starts to feel cohesive rather than merely functional.',
  ],
  skillsHeader: 'Technical Skills',
  skills: {
    left: {
      Languages: ['JavaScript (ES6+)', 'TypeScript', 'Python', 'SQL', 'HTML / CSS'],
      Frontend: ['React', 'Next.js', 'Vite', 'CSS Modules'],
    },
    right: {
      Backend: ['Node.js', 'Express', 'PostgreSQL', 'REST APIs'],
      Tools: ['Git / GitHub', 'Figma', 'Netlify / Vercel', 'Linux / CLI'],
    },
  } satisfies Record<string, SkillGroups>,
}
