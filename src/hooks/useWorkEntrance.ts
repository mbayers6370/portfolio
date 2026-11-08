import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

type WorkEntrancePhase = 'intro' | 'opening' | 'expanded'

export default function useWorkEntrance(skipIntro = false) {
  const shellRef = useRef<HTMLDivElement>(null)
  const previousRects = useRef<Map<HTMLElement, DOMRect> | null>(null)
  const animations = useRef<Animation[]>([])
  const [phase, setPhase] = useState<WorkEntrancePhase>(() => (
    !skipIntro && !document.hidden &&
    window.matchMedia('(min-width: 901px)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'intro'
      : 'expanded'
  ))

  const cancelAnimations = useCallback(() => {
    previousRects.current = null
    animations.current.forEach(animation => animation.cancel())
    animations.current = []
  }, [])

  const finishImmediately = useCallback(() => {
    cancelAnimations()
    setPhase('expanded')
  }, [cancelAnimations])

  useEffect(() => {
    if (skipIntro) finishImmediately()
  }, [skipIntro, finishImmediately])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 901px)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onPreferenceChange = () => {
      if (!desktop.matches || reducedMotion.matches) finishImmediately()
    }
    const onVisibilityChange = () => {
      if (document.hidden) finishImmediately()
    }
    desktop.addEventListener('change', onPreferenceChange)
    reducedMotion.addEventListener('change', onPreferenceChange)
    // FLIP coordinates belong to one viewport. Resizing invalidates them even
    // when the viewport remains above the desktop breakpoint.
    window.addEventListener('resize', finishImmediately)
    window.addEventListener('pagehide', finishImmediately)
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => {
      desktop.removeEventListener('change', onPreferenceChange)
      reducedMotion.removeEventListener('change', onPreferenceChange)
      window.removeEventListener('resize', finishImmediately)
      window.removeEventListener('pagehide', finishImmediately)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      cancelAnimations()
    }
  }, [finishImmediately, cancelAnimations])

  useEffect(() => {
    if (skipIntro || phase === 'expanded') return
    const timer = setTimeout(() => {
      if (phase === 'intro') {
        setPhase('opening')
      } else {
        const cards = shellRef.current?.querySelectorAll<HTMLElement>('.desktop-showcase-card')
        previousRects.current = new Map(
          [...(cards || [])].map(card => [card, card.getBoundingClientRect()]),
        )
        setPhase('expanded')
      }
    }, phase === 'intro' ? 3000 : 220)
    return () => clearTimeout(timer)
  }, [skipIntro, phase])

  useLayoutEffect(() => {
    if (skipIntro || phase !== 'expanded' || !previousRects.current) return
    const startingRects = previousRects.current
    previousRects.current = null
    const nextAnimations: Animation[] = []

    startingRects.forEach((first, card) => {
      const last = card.getBoundingClientRect()
      if (!first.width || !first.height || !last.width || !last.height || typeof card.animate !== 'function') return
      nextAnimations.push(card.animate([
        {
          transform: `translate(${first.left - last.left}px, ${first.top - last.top}px) scale(${first.width / last.width}, ${first.height / last.height})`,
          transformOrigin: 'top left',
        },
        { transform: 'none', transformOrigin: 'top left' },
      ], {
        duration: 800,
        delay: nextAnimations.length * 45,
        easing: 'cubic-bezier(.22, 1, .36, 1)',
        fill: 'backwards',
      }))
    })
    animations.current = nextAnimations
    return cancelAnimations
  }, [skipIntro, phase, cancelAnimations])

  return { phase: skipIntro ? 'expanded' : phase, shellRef }
}
