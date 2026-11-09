import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getPageSeo } from '../content/seo'
import { renderSeoHead } from '../lib/seo'

export default function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.head.querySelectorAll('[data-seo]').forEach((element) => element.remove())
    document.head.insertAdjacentHTML('beforeend', renderSeoHead(getPageSeo(pathname)))
  }, [pathname])

  return null
}
