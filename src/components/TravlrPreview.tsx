import travlrMain from '../assets/Travlr_Main.png'
import travlrLogos from '../assets/Travlr_Logos.png'
import '../styles/travlr-preview.css'

export default function TravlrPreview() {
  return (
    <figure className="travlr-preview">
      <img className="travlr-preview-photo" src={travlrMain} alt="An alpine lake reflecting mountains and forest, from the Travlr travel experience" loading="lazy" />
      <figcaption className="travlr-preview-signature">
        <span className="travlr-preview-mark" aria-hidden="true"><img src={travlrLogos} alt="" /></span>
        <span>Travlr Getaways</span>
      </figcaption>
    </figure>
  )
}
