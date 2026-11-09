import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="project-page-404 container">
      <h1>Page not found.</h1>
      <p>This page may have moved, or the address may be incorrect.</p>
      <Link to="/">Back to portfolio</Link>
    </div>
  )
}
