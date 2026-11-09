import { siteName, siteOrigin, type SeoPage } from '../content/seo'
import { heroContent } from '../content/hero'
import { candidateProfile } from '../content/profile'
import projects from '../content/projects'

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]!)

export const absoluteUrl = (path: string) => new URL(path, `${siteOrigin}/`).href

function structuredData(page: SeoPage) {
  const personId = `${siteOrigin}/#person`
  const websiteId = `${siteOrigin}/#website`
  const url = absoluteUrl(page.path)
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Person',
      '@id': personId,
      name: siteName,
      url: `${siteOrigin}/`,
      jobTitle: heroContent.tagline,
      description: candidateProfile.introduction[0],
      email: candidateProfile.email,
      knowsAbout: [...new Set(Object.values(candidateProfile.skills).flat())],
      sameAs: candidateProfile.links.map((link) => link.url),
      subjectOf: projects.map((project) => ({
        '@type': 'WebPage',
        name: `${project.title} case study`,
        url: absoluteUrl(`/work/${project.slug}`),
      })),
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: `${siteName} | ${heroContent.tagline}`,
      url: `${siteOrigin}/`,
      author: { '@id': personId },
      inLanguage: 'en',
    },
    {
      '@type': page.path === '/' ? 'ProfilePage' : 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      isPartOf: { '@id': websiteId },
      ...(page.path === '/' ? { mainEntity: { '@id': personId } } : { author: { '@id': personId } }),
      ...(page.path !== '/' ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
      inLanguage: 'en',
    },
  ]

  if (page.path !== '/') {
    const crumbs = [{ name: 'Home', item: `${siteOrigin}/` }]
    if (page.section) {
      crumbs.push({ name: page.section, item: absoluteUrl(page.section === 'Design' ? '/design' : '/#work') })
    }
    crumbs.push({ name: page.title.split(' | ')[0], item: url })
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: crumbs.map((crumb, index) => ({ '@type': 'ListItem', position: index + 1, ...crumb })),
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}

/** Shared by generated HTML and client navigation so metadata cannot diverge. */
export function renderSeoHead(page: SeoPage): string {
  const meta = (attribute: 'name' | 'property', key: string, content: string) =>
    `<meta data-seo ${attribute}="${key}" content="${escapeHtml(content)}" />`
  const image = absoluteUrl(page.image)
  const tags = [
    `<title data-seo>${escapeHtml(page.title)}</title>`,
    meta('name', 'description', page.description),
    meta('name', 'robots', page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'),
    meta('property', 'og:type', 'website'),
    meta('property', 'og:site_name', siteName),
    meta('property', 'og:locale', 'en_US'),
    meta('property', 'og:title', page.title),
    meta('property', 'og:description', page.description),
    meta('property', 'og:image', image),
    meta('property', 'og:image:alt', page.imageAlt),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', page.title),
    meta('name', 'twitter:description', page.description),
    meta('name', 'twitter:image', image),
    meta('name', 'twitter:image:alt', page.imageAlt),
  ]
  if (!page.noindex) {
    const canonical = absoluteUrl(page.path)
    tags.push(`<link data-seo rel="canonical" href="${escapeHtml(canonical)}" />`)
    tags.push(meta('property', 'og:url', canonical))
    tags.push(`<link data-seo rel="describedby" href="${absoluteUrl('/llms.txt')}" />`)
    const markdownPath = page.path === '/' ? '/profile.md' :
      projects.some((project) => page.path === `/work/${project.slug}`) ? `${page.path}.md` : undefined
    if (markdownPath) {
      tags.push(`<link data-seo rel="alternate" type="text/markdown" href="${absoluteUrl(markdownPath)}" />`)
    }
    const json = JSON.stringify(structuredData(page)).replace(/</g, '\\u003c')
    tags.push(`<script data-seo type="application/ld+json">${json}</script>`)
  }
  return tags.join('\n    ')
}
