import "../styles/design.css";
import { Bookmark, Copy, Check } from "lucide-react";
import designInspo from "../assets/design-inspo.jpg";
import { useEffect, useId, useState } from "react";

const palette = [
  { hex: "#D3AD36", ink: "#20323A" },
  { hex: "#3D5060", ink: "#F7F6F1" },
  { hex: "#B5B4A9", ink: "#20323A" },
] as const;

function PaletteSwatch({ hex, ink }: { hex: string; ink: string }) {
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function copyColor() {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      setMessage(`${hex} copied to clipboard`);
    } catch {
      setMessage(`Select ${hex} to copy it manually`);
    }
  }

  return (
    <div className="palette-swatch" style={{ backgroundColor: hex, color: ink }}>
      <button type="button" className="palette-copy" onClick={copyColor} aria-label={`Copy ${hex}`} title={copied ? "Copied!" : `Copy ${hex}`}>
        <code>{hex}</code>
        {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
      </button>
      <span className="palette-copy-status" role="status">{message}</span>
    </div>
  );
}

const typeSpecimens = [
  { role: "Display", family: '"Caudex", Georgia, serif', style: "normal", name: "Caudex Regular", text: "Look closer.", size: 48, leading: 48 },
  { role: "Emphasis", family: '"Caudex", Georgia, serif', style: "italic", name: "Caudex Italic", text: "A quieter perspective.", size: 22, leading: 30 },
  { role: "Body & interface", family: "var(--font-body)", style: "normal", name: "Atkinson Hyperlegible", text: "Good design leaves room to look, read, and think.", size: 16, leading: 26 },
] as const;

function InterfaceConcept({ mustard = false }: { mustard?: boolean }) {
  const excerptId = useId();
  const [saved, setSaved] = useState(false);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"journal" | "saved">("journal");
  const showNote = view === "journal" || saved;

  return (
    <div className={`interaction-sample${mustard ? " interaction-sample--mustard" : ""}`}>
      <header className="concept-header">
        <strong>Field notes<span aria-hidden="true">.</span></strong>
        <button className="concept-bookmark" type="button" aria-label={saved ? "Unsave note" : "Save note"} aria-pressed={saved} onClick={() => setSaved(!saved)}>
          <Bookmark aria-hidden="true" fill={saved ? "currentColor" : "none"} />
        </button>
      </header>
      <div className="concept-body">
        <div className="concept-feature">
          <div className="interface-copy">
            <h2>{showNote ? "Small observations, properly held." : "Nothing saved yet."}</h2>
            <p>{showNote ? "Three things worth returning to." : "Use the bookmark to keep this note here."}</p>
          </div>
        </div>
        <p id={excerptId} className="concept-excerpt" hidden={!open || !showNote}>The color of the road after rain. A line of trees against the sky. The small details that stay with us on the way home.</p>
        <div className="concept-bottom">
          {showNote ? <button className="concept-read-more" type="button" aria-expanded={open} aria-controls={excerptId} onClick={() => setOpen(!open)}>{open ? "Read Less" : "Read More"}</button> : <span>No saved notes</span>}
        </div>
      </div>
      <nav className="concept-footer" aria-label={mustard ? "Mustard concept views" : "Slate concept views"}>
        <button type="button" aria-pressed={view === "journal"} onClick={() => setView("journal")}>Journal</button>
        <button type="button" aria-pressed={view === "saved"} onClick={() => setView("saved")}>Saved <span>{saved ? 1 : 0}</span></button>
      </nav>
    </div>
  );
}

export default function Design() {
  return (
    <div className="curiosities-page">
      <main className="curiosities-main container">
        <header className="curiosities-intro">
          <h1>Collected<br />Curiosities.</h1>
          <p>
            Some things are simply worth a closer look.
          </p>
        </header>
        <section className="curiosities-grid" aria-label="Collection">
            <article className="curiosity-card color-study">
              <div
                className="color-study-swatches"
                aria-label="A muted overcast color palette"
              >
                {palette.map((color) => <PaletteSwatch key={color.hex} {...color} />)}
              </div>
              <div className="curiosity-card-caption">
                <h2>An overcast afternoon</h2>
                <p className="color-study-note">
                  This idea came to me on a drive home, watching the road meet
                  the sky and the yellow lines cut through the gray. A few
                  colors from an ordinary afternoon, worth keeping together.
                </p>
              </div>
            </article>
            <article className="curiosity-card type-study">
              <header className="type-study-heading">
                <div className="type-study-letter" aria-hidden="true">Ag</div>
                <div><h2>Caudex</h2><p>Typography &amp; pairing</p></div>
              </header>
              <div className="type-guidelines">
                {typeSpecimens.map((specimen) => (
                  <div className="type-guideline-row" key={specimen.role}>
                    <span className="type-guideline-role">{specimen.role}</span>
                    <p
                      className="type-guideline-specimen"
                      style={{
                        fontFamily: specimen.family,
                        fontStyle: specimen.style,
                        fontWeight: 400,
                        fontSize: specimen.size,
                        lineHeight: `${specimen.leading}px`,
                      }}
                    >
                      {specimen.text}
                    </p>
                    <small>{specimen.name} · {specimen.size}px / {specimen.leading}px</small>
                  </div>
                ))}
              </div>
            </article>
            <article className="curiosity-card interaction-study">
              <h2 className="interface-section-title">INTERFACE CONCEPTS</h2>
              <div className="interface-variations">
                <InterfaceConcept />
                <InterfaceConcept mustard />
              </div>
            </article>
            <article className="curiosity-card photo-study">
              <div className="photo-study-image">
                <img src={designInspo} alt="A wet road with yellow lane markings curving between trees beneath an overcast sky" />
              </div>

              <div className="curiosity-card-caption">
                <h2>Everyday inspirations</h2>
                <p className="inspiration-note">
                  I’m drawn to minimalism, in design and in life. Leaving a
                  little room makes it easier to notice what’s around me.
                  Color palettes are already there: in a road, the weather, a
                  line of trees. Sometimes it’s just a matter of paying
                  attention and saving the combination.
                </p>
              </div>
            </article>
        </section>
      </main>
    </div>
  );
}
