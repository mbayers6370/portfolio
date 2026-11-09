import overcastImage from '../assets/design-inspo.jpg'
import cayucosImage from '../assets/vacation-2.jpeg'
import fujiImage from '../assets/Japan.jpeg'

const overcastPalette = [
  { hex: '#D3AD36', ink: '#20323A' },
  { hex: '#3D5060', ink: '#F7F6F1' },
  { hex: '#B5B4A9', ink: '#20323A' },
] as const

export const overcastStudy = {
  slug: 'an-overcast-afternoon',
  title: 'An Overcast Afternoon',
  description: 'A wet road, a gray sky, a line of yellow.',
  summary: 'Colors from a drive home, explored through typography and a small journal interface.',
  image: overcastImage,
  imageAlt: 'A wet road with yellow lane markings curving between trees beneath an overcast sky',
  palette: overcastPalette,
  preview: {
    surface: 'var(--white)',
    text: overcastPalette[2].ink,
    accent: overcastPalette[1].hex,
  },
} as const

const cayucosPalette = [
  { hex: '#b04d01', ink: '#ffffff' },
  { hex: '#020914', ink: '#d4c7a5' },
  { hex: '#052b41', ink: '#d4c7a5' },
  { hex: '#d4c7a5', ink: '#020914' },
] as const

export const cayucosStudy = {
  slug: 'cayucos',
  title: 'Cayucos',
  description: 'Downtown at night, after a day at the beach and shops.',
  summary: 'One of my favorite vacation shots becomes a palette for two burger-menu concepts.',
  image: cayucosImage,
  imageAlt: 'A lit storefront in downtown Cayucos at night, with orange door trim, blue window frames, and a warm cream facade',
  palette: cayucosPalette,
  preview: {
    surface: 'var(--white)',
    text: cayucosPalette[1].hex,
    accent: cayucosPalette[2].hex,
  },
} as const satisfies DesignStudyMetadata

const fujiPalette = [
  { hex: '#6D8B8B', ink: '#020914' },
  { hex: '#A1AD9A', ink: '#20323A' },
  { hex: '#574B30', ink: '#ffffff' },
] as const

export const kyotoTokyoStudy = {
  slug: 'kyoto-to-tokyo',
  title: 'Kyoto to Tokyo',
  description: 'On the Shinkansen, finally meeting a friend I’d known since childhood.',
  summary: 'A train ride, a first meeting, and the colors of Fuji outside the window.',
  image: fujiImage,
  imageAlt: 'Mount Fuji in a hazy blue distance behind a pale green building and weathered rooftops',
  palette: fujiPalette,
  preview: {
    surface: 'var(--white)',
    text: 'var(--study-ink)',
    accent: fujiPalette[2].hex,
  },
} as const satisfies DesignStudyMetadata

export const designStudies: readonly DesignStudyMetadata[] = [overcastStudy, cayucosStudy, kyotoTokyoStudy]

export type DesignStudyMetadata = {
  slug: string
  title: string
  description: string
  summary: string
  image: string
  imageAlt: string
  palette: readonly { hex: string; ink: string }[]
  preview: { surface: string; text: string; accent: string }
}
