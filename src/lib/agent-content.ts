import { candidateProfile } from '../content/profile'
import projects from '../content/projects'
import { siteOrigin } from '../content/seo'
import type { Project } from '../types/content'

const url = (path: string) => new URL(path, `${siteOrigin}/`).href

const projectLinks = (project: Project) => [
  `- [Portfolio case study](${url(`/work/${project.slug}`)})`,
  `- [Case study in Markdown](${url(`/work/${project.slug}.md`)})`,
  `- [${project.linkLabel ?? 'Live site'}](${project.link})`,
  ...(project.sourceLink ? [`- [Source code](${project.sourceLink})`] : []),
].join('\n')

const projectFacts = (project: Project) => [
  `Project type: ${project.type}`,
  `Role on this project: ${project.role}`,
  `Year: ${project.year}`,
  `Technologies and disciplines: ${project.tags.join(', ')}`,
].join('\n\n')

/** Build public text representations from existing portfolio facts and evidence. */
export function renderAgentFiles(): Record<string, string> {
  const { name, jobTitle, hiringSummary, introduction, availability, email, skills, links } = candidateProfile
  const skillSections = Object.entries(skills).map(([group, items]) =>
    `### ${group}\n\n${items.join(', ')}.`,
  ).join('\n\n')
  const contactLinks = [
    `- [Email ${name}](mailto:${email})`,
    ...links.map((link) => `- [${link.label}](${link.url})`),
    `- [Portfolio](${url('/')})`,
  ].join('\n')
  const selectedWork = projects.map((project) => [
    `### ${project.title}`,
    project.desc,
    projectFacts(project),
    projectLinks(project),
  ].join('\n\n')).join('\n\n')

  const files: Record<string, string> = {
    'profile.md': [
      `# ${name} | ${jobTitle}`,
      '## Hiring summary', hiringSummary,
      '## About',
      introduction.join('\n\n'),
      '## Availability', availability,
      '## Technical skills', skillSections,
      '## Selected work', selectedWork,
      '## Contact and professional profiles', contactLinks,
    ].join('\n\n') + '\n',
    'llms.txt': [
      `# ${name}`,
      `> ${jobTitle} with a background in graphic design. ${availability}`,
      `Core frontend skills: ${skills.Frontend.join(', ')}.`,
      '## Candidate profile',
      `- [Candidate profile](${url('/profile.md')}): Role, availability, technical skills, project evidence, and contact information.`,
      `- [Portfolio](${url('/')}): Visual portfolio, about, and contact sections.`,
      '## Project evidence',
      projects.map((project) =>
        `- [${project.title}](${url(`/work/${project.slug}.md`)}): ${project.type}. Role: ${project.role}. ${project.tags.join(', ')}.`,
      ).join('\n'),
      '## Professional profiles',
      links.map((link) => `- [${link.label}](${link.url})`).join('\n'),
      '## Optional',
      `- [Design studies](${url('/design')}): Color, typography, and interactive interface studies.`,
      `- [Books](${url('/books')}): The Shape Sequence.`,
      `- [Art](${url('/art')}): Oil and acrylic paintings.`,
    ].join('\n\n') + '\n',
  }

  for (const project of projects) {
    files[`work/${project.slug}.md`] = [
      `# ${project.title} | ${name}`,
      projectFacts(project),
      '## Overview', project.desc,
      ...project.details.flatMap((detail) => [`## ${detail.heading}`, detail.body]),
      '## Links', projectLinks(project),
    ].join('\n\n') + '\n'
  }
  return files
}
