export type SkillGroups = Record<string, string[]>

export const aboutContent = {
  label: 'About',
  title: ['Who', 'I Am'],
  intro: [
    'I’m a Frontend Developer with a background in graphic design. I build interfaces with the same care for how they work as how they look, bringing visual identity, interaction, and code into one coherent experience.',
    'I enjoy shaping a product from the first idea to the smallest detail. That might mean developing a design system, creating a custom typeface, or refining an interaction until it feels natural. Outside of code, I write fiction and paint.',
  ],
  skillsHeader: 'Technical skills',
  skills: {
    'Front-End': ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
    'Back-End': ['Node.js', 'PostgreSQL', 'Prisma'],
    Design: ['Responsive Design', 'UI/UX', 'Design Systems'],
    Testing: ['Playwright', 'Vitest'],
    'Tools & Workflow': ['Git', 'GitHub', 'Codex', 'Claude'],
  } satisfies SkillGroups,
}
