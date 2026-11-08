import '../styles/page-hero.css'

type PageHeroProps = {
  title: string
  description: string
  className?: string
}

export default function PageHero({ title, description, className = '' }: PageHeroProps) {
  return (
    <header className={`page-hero ${className}`}>
      <div className="container page-hero-inner">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </header>
  )
}
