type ProjectTitleProps = {
  title: string
}

export default function ProjectTitle({ title }: ProjectTitleProps) {
  if (title !== 'NELARide') {
    return <>{title}</>
  }

  return (
    <span className="project-title-wordmark">
      <span className="project-title-accent">NELA</span>
      <span className="project-title-rest">Ride</span>
    </span>
  )
}
