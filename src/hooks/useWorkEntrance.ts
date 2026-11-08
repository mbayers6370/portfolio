import { useEffect, useLayoutEffect, useRef, useState } from 'react'

type WorkEntrancePhase = 'intro' | 'opening' | 'expanded'

export default function useWorkEntrance(skipIntro = false) {
  const shellRef = useRef<HTMLDivElement>(null)
  const previousRects = useRef<Map<HTMLElement, DOMRect> | null>(null)
  const animations = useRef<Animation[]>([])
  const [phase, setPhase] = useState<WorkEntrancePhase>(() => (
    window.matchMedia('(min-width: 901px)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'intro'
      : 'expanded'
  ))

  useEffect(() => {
    if (!skipIntro) return
    previousRects.current = null
    animations.current.forEach(animation => animation.cancel())
    setPhase('expanded')
  }, [skipIntro])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 901px)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const finishImmediately = () => {
      if (!desktop.matches || reducedMotion.matches) {
        previousRects.current = null
        animations.current.forEach(animation => animation.cancel())
        setPhase('expanded')
      }
    }
    desktop.addEventListener('change', finishImmediately)
    reducedMotion.addEventListener('change', finishImmediately)
    return () => {
      desktop.removeEventListener('change', finishImmediately)
      reducedMotion.removeEventListener('change', finishImmediately)
    }
  }, [])

  useEffect(() => {
    if (skipIntro || phase === 'expanded') return
    let timer: ReturnType<typeof setTimeout> | undefined

    const schedule = () => {
      clearTimeout(timer)
      if (document.hidden) return
      timer = setTimeout(() => {
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
    }

    schedule()
    document.addEventListener('visibilitychange', schedule)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('visibilitychange', schedule)
    }
  }, [skipIntro, phase])

  useLayoutEffect(() => {
    if (skipIntro || phase !== 'expanded' || !previousRects.current) return
    const startingRects = previousRects.current
    previousRects.current = null
    const nextAnimations: Animation[] = []

    startingRects.forEach((first, card) => {
      const last = card.getBoundingClientRect()
      if (!first.width || !first.height || !last.width || !last.height) return
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
    return () => nextAnimations.forEach(animation => animation.cancel())
  }, [skipIntro, phase])

  return { phase: skipIntro ? 'expanded' : phase, shellRef }
}
