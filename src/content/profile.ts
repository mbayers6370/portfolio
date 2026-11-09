import { aboutContent } from './about'
import { contactContent } from './contact'
import { heroContent } from './hero'

// Ground the candidate facts and hiring summary in the portfolio content.
export const candidateProfile = {
  name: `${heroContent.firstName} ${heroContent.lastName.replace(/\.$/, '')}`,
  jobTitle: heroContent.tagline,
  hiringSummary: 'Matthew Bayers is a Frontend Developer who combines frontend engineering in React, Next.js, and TypeScript with visual design and user experience skills. His projects connect design systems, custom typography, and responsive layouts with clear navigation and purposeful interactions, carrying creative decisions through to working applications.',
  introduction: aboutContent.intro,
  availability: contactContent.availability,
  email: contactContent.email,
  skills: aboutContent.skills,
  links: [
    { label: 'GitHub', url: 'https://github.com/mbayers6370' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/matthew-bayers' },
  ],
}
