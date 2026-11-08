import { FeedEnd } from './FeedEnd'
import conversation from '../../assets/margin/icons/conversation.svg'
import '../../styles/margin-brand.css'
import '../../styles/margin-preview.css'
import '../../styles/margin-work-preview.css'

/** A non-interactive excerpt inside the work card's single project link. */
export default function MarginWorkPreview() {
  return (
    <div className="margin-work-preview" aria-hidden="true">
      <div className="margin-work-post-stage">
        <div className="margin-work-post-turn">
          <div className="margin-work-post-face margin-work-post-front">
            <header><span className="margin-work-initials">TM</span><div><strong>Theo Marchetti</strong><small>Yesterday · 8:15 am</small></div></header>
            <p>Finished my book on the train home. If anyone needs something to read, you can borrow it.</p>
            <span className="margin-work-post-note"><img src={conversation} alt="" /></span>
          </div>
          <div className="margin-work-post-face margin-work-post-back">
            <header><span>Behind the post</span><strong>A conversation.</strong></header>
            <div className="margin-work-reply"><span className="margin-work-initials">IA</span><p><strong>Ines Alvarez</strong>I have one for you. I’ll bring it on Saturday.</p></div>
            <div className="margin-work-reply"><span className="margin-work-initials">TM</span><p><strong>Theo Marchetti</strong>Perfect. Coffee and a book swap?</p></div>
          </div>
        </div>
      </div>
      <FeedEnd />
    </div>
  )
}
