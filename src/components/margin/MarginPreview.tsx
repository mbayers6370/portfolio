import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { BrandBrackets } from './BrandBrackets'
import { FeedEnd } from './FeedEnd'
import { Friends, GalleryAnimated, HeartAnimated, OnRepeatAnimated, SpacesAnimated } from './AnimatedIcons'
import ines from '../../assets/margin/photos/Ines_Coffee.jpg'
import theo from '../../assets/margin/photos/Theo-profile.jpg'
import beach from '../../assets/margin/photos/morning_beach.jpg'
import tea from '../../assets/margin/photos/tea.jpg'
import june from '../../assets/margin/photos/park-2.jpg'
import samuel from '../../assets/margin/photos/Okafor-profile.jpg'
import mara from '../../assets/margin/photos/mara-profile.jpg'
import conversation from '../../assets/margin/icons/conversation.svg'
import '../../styles/margin-brand.css'
import '../../styles/margin-preview.css'

export type MarginScreen = 'Feed' | 'Profile' | 'Spaces'

function Avatar({ name, photo }: { name: string; photo?: string }) {
  return photo
    ? <img className="margin-sample-avatar" src={photo} alt="" />
    : <span className="margin-sample-avatar">{name.split(' ').map((part) => part[0]).join('')}</span>
}

function PostSnippet() {
  const [liked, setLiked] = useState(false)
  const [flipped, setFlipped] = useState(false)
  const [thought, setThought] = useState('')
  const [comments, setComments] = useState<string[]>([])
  const conversationTrigger = useRef<HTMLButtonElement>(null)
  const postTrigger = useRef<HTMLButtonElement>(null)

  const turn = (back: boolean) => {
    setFlipped(back)
    window.requestAnimationFrame(() => (back ? postTrigger : conversationTrigger).current?.focus({ preventScroll: true }))
  }

  const front = (
    <div className="margin-sample-post" aria-hidden={flipped || undefined}>
      <header><Avatar name="Theo Marchetti" photo={theo} /><div><strong>Theo Marchetti</strong><span>Yesterday · 8:15 am</span></div></header>
      <p>Finished my book on the train home. If anyone needs something to read, you can borrow it.</p>
      <p>Need a new recommendation for the commute.</p>
      <div className="margin-sample-post-actions">
        <button type="button" tabIndex={flipped ? -1 : 0} aria-pressed={liked} aria-label={liked ? 'Remove reaction to Theo’s sample post' : 'React to Theo’s sample post'} onClick={() => setLiked(!liked)}><HeartAnimated key={String(liked)} animate={liked} fill={liked ? 'currentColor' : 'none'} />{liked ? 'Liked' : 'Like'}</button>
        <button type="button" ref={conversationTrigger} tabIndex={flipped ? -1 : 0} aria-expanded={flipped} aria-label="Flip Theo’s post to its conversation" onClick={() => turn(true)}><img src={conversation} alt="" />Conversation</button>
      </div>
    </div>
  )

  return (
    <div className="margin-sample-flip" data-side={flipped ? 'conversation' : 'post'} onKeyDown={(event) => { if (event.key === 'Escape' && flipped) turn(false) }}>
      <div className="margin-sample-flip-rotor">
        <div className="margin-sample-flip-front">{front}</div>
        <section className="margin-sample-flip-back" aria-hidden={!flipped || undefined} aria-label="Conversation on Theo’s post">
          <header><button type="button" ref={postTrigger} tabIndex={flipped ? 0 : -1} aria-label="Back to post" onClick={() => turn(false)}><ChevronLeft className="link-chevron" aria-hidden="true" /> Post</button><span>Conversation</span><button type="button" tabIndex={flipped ? 0 : -1} aria-pressed={liked} onClick={() => setLiked(!liked)}><HeartAnimated key={String(liked)} animate={liked} fill={liked ? 'currentColor' : 'none'} />{liked ? 'Liked' : 'Like'}</button></header>
          <div className="margin-sample-discussion">
            <div className="margin-sample-post-summary"><span>Aa</span><p><strong>Theo Marchetti</strong>Finished my book on the train home. Need a new recommendation for the commute.</p></div>
            <div className="margin-sample-comment"><Avatar name="Ines Alvarez" photo={ines} /><p><strong>Ines Alvarez</strong>I have one for you. I’ll bring it on Saturday.</p></div>
            <div className="margin-sample-comment"><Avatar name="Theo Marchetti" photo={theo} /><p><strong>Theo Marchetti</strong>Perfect. Coffee and a book swap?</p></div>
            {comments.map((comment, index) => <div className="margin-sample-comment" key={index}><Avatar name="Ines Alvarez" photo={ines} /><p><strong>Ines Alvarez</strong>{comment}</p></div>)}
          </div>
          <form className="margin-sample-comment-form" onSubmit={(event) => { event.preventDefault(); if (thought.trim()) { setComments((items) => [...items, thought.trim()]); setThought('') } }}>
            <label htmlFor="margin-sample-thought">Leave a thought</label>
            <div><input id="margin-sample-thought" tabIndex={flipped ? 0 : -1} value={thought} onChange={(event) => setThought(event.target.value)} maxLength={300} placeholder="Add to the conversation…" /><button type="submit" tabIndex={flipped ? 0 : -1} disabled={!thought.trim()}>Post</button></div>
            <small>Sample replies stay in this preview.</small>
          </form>
        </section>
      </div>
    </div>
  )
}

function FeedSnippet() {
  return <div className="margin-sample-feed"><PostSnippet /><FeedEnd /></div>
}

const photos = [
  { src: beach, label: 'The long way home was worth it.', alt: 'A quiet beach beneath a warm morning sky' },
  { src: tea, label: 'A slow start to the morning.', alt: 'A cup of tea beside an open book and a small radio' },
  { src: ines, label: 'A pause for coffee.', alt: 'Ines enjoying coffee by a window' },
]

const topFriends = [
  { name: 'Theo Marchetti', label: 'Theo M.', photo: theo },
  { name: 'June Park', label: 'June P.', photo: june },
  { name: 'Samuel Okafor', label: 'Samuel O.', photo: samuel },
  { name: 'Mara Lindqvist', label: 'Mara L.', photo: mara },
]

function ProfileSnippet({ paused }: { paused: boolean }) {
  const [selected, setSelected] = useState(0)
  return (
    <div className="margin-sample-profile">
      <div className="margin-sample-identity"><Avatar name="Ines Alvarez" photo={ines} /><div><strong>Ines Alvarez</strong><p>Landscape architect. Usually out walking, taking photos, or trying a new coffee place.</p></div></div>
      <div className="margin-sample-top-friends">
        <header><Friends /><span>Top 4</span></header>
        <div>{topFriends.map((person) => <figure key={person.name}><img src={person.photo} alt={person.name} /><figcaption>{person.label}</figcaption></figure>)}</div>
      </div>
      <div className="margin-sample-gallery">
        <header><GalleryAnimated key={selected} animate /><span>Gallery</span></header>
        <div className="margin-sample-photos">{photos.map((photo, index) => <button key={photo.src} type="button" aria-label={`View caption: ${photo.alt}`} aria-pressed={selected === index} onClick={() => setSelected(index)}><img src={photo.src} alt={photo.alt} /></button>)}</div>
        <p className="margin-sample-photo-caption" aria-live="polite">{photos[selected].label}</p>
      </div>
      <div className="margin-sample-music"><OnRepeatAnimated paused={paused} /><div><span>On Repeat</span><strong>Je veux</strong><small>Greg Gontier</small></div><span className="margin-sample-music-note">A song worth keeping close.</span></div>
    </div>
  )
}

const sampleSpaces = [
  { name: 'Japan 2027', location: 'Kyoto, Japan', date: '1 June 2027', body: 'I found a little place in Kyoto. What does everyone think about staying here for three nights?' },
  { name: 'Saturday Dinner', location: 'At June’s', date: '9 January 2027', body: 'I’ll bring something for dessert. What are we cooking?' },
  { name: 'The Reading Room', location: 'A private place for friends', date: '', body: 'What should we read next month?' },
]

function SpacesSnippet() {
  const [selected, setSelected] = useState<number | null>(null)
  const space = selected === null ? undefined : sampleSpaces[selected]
  const heading = useRef<HTMLHeadingElement>(null)
  const open = (index: number | null) => {
    setSelected(index)
    window.requestAnimationFrame(() => heading.current?.focus({ preventScroll: true }))
  }
  const portraits = <div className="margin-sample-space-portraits" aria-label="Four members"><Avatar name="Ines Alvarez" photo={ines} />{topFriends.slice(0, 3).map((person) => <Avatar key={person.name} name={person.name} photo={person.photo} />)}<span>4 members</span></div>

  return (
    <div className="margin-sample-spaces">
      {space ? <>
        <button className="margin-sample-spaces-back" type="button" onClick={() => open(null)}><ChevronLeft className="link-chevron" aria-hidden="true" /> All Spaces</button>
        <p className="margin-sample-space-privacy">Space · Invitation-only</p>
        <h3 ref={heading} tabIndex={-1}>{space.name}</h3>
        <p className="margin-sample-space-context">{space.date && <span>{space.date} · </span>}{space.location}</p>
        {portraits}
        <div className="margin-sample-space-thought"><header><Avatar name="Theo Marchetti" photo={theo} /><span>Theo Marchetti</span></header><p>{space.body}</p></div>
      </> : <>
        <h3 ref={heading} tabIndex={-1}><SpacesAnimated animate />Your spaces</h3>
        <p className="margin-sample-space-context">Little places for the people in your life.</p>
        <ul className="margin-sample-space-directory">{sampleSpaces.map((item, index) => <li key={item.name}><button type="button" onClick={() => open(index)}><div><strong><SpacesAnimated />{item.name}</strong><p>{item.location}</p>{portraits}</div><span aria-hidden="true"><ChevronRight className="link-chevron" aria-hidden="true" /></span></button></li>)}</ul>
        <p className="margin-sample-space-privacy">Spaces are invitation-only.</p>
      </>}
    </div>
  )
}

/** Small, local excerpts adapted from Margin’s public UI and motion components. */
export default function MarginPreview({ kind = 'Feed' }: { kind?: MarginScreen }) {
  const root = useRef<HTMLDivElement>(null)
  const [replay, setReplay] = useState(0)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = root.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .15 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="margin-snippet margin-brand" ref={root} data-margin-motion={paused || !visible ? 'off' : undefined}>
      <div className="margin-snippet-top"><span className="margin-snippet-brand"><BrandBrackets>margin</BrandBrackets></span><span>{kind}</span></div>
      <div className="margin-snippet-content" key={`${kind}-${replay}`}>
        {kind === 'Feed' && <FeedSnippet />}
        {kind === 'Profile' && <ProfileSnippet paused={paused || !visible} />}
        {kind === 'Spaces' && <SpacesSnippet />}
      </div>
      <div className="margin-snippet-footer"><span>Interactive excerpt · Fictional content</span><div><button type="button" onClick={() => setPaused(!paused)}>{paused ? 'Resume motion' : 'Pause motion'}</button><button type="button" onClick={() => setReplay((value) => value + 1)}>Replay</button></div></div>
    </div>
  )
}
