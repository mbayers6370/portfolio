export type ProjectDetail = {
  heading: string
  body: string
}

export type ProjectGalleryItem = {
  src: string
  alt: string
  label?: string
}

export type Project = {
  slug: string
  num: string
  title: string
  type: string
  desc: string
  tags: string[]
  link: string
  linkLabel?: string
  details: ProjectDetail[]
  galleryLabel?: string
  gallery?: ProjectGalleryItem[]
  year: string
  role: string
}

export type Artwork = {
  src: string
  title: string
  medium: string
  pos?: string
}

export type Book = {
  number: string
  title: string
  status: string
  statusClass: 'available' | 'upcoming'
  description: string
  link: string
  linkLabel: string
  cover: string
}
