import { Bookmark } from "lucide-react";
import StudyLayout, { InspirationStudy, PaletteStudy, TypographyStudy } from "../components/design/StudyLayout";
import { overcastStudy } from "../content/design-studies";
import { useId, useState } from "react";

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
    <section className="interface-variation" aria-label={mustard ? "Mustard variation" : "Slate variation"}>
      <h3 className="interface-variation-label">{mustard ? "Mustard" : "Slate"}</h3>
      <div className={`interaction-sample${mustard ? " interaction-sample--mustard" : ""}`}>
        <header className="concept-header">
          <strong>Field notes<span aria-hidden="true">.</span></strong>
          <button className="concept-bookmark" disabled={!showNote} type="button" aria-label={saved ? "Unsave note" : "Save note"} aria-pressed={saved} onClick={() => setSaved(!saved)}>
            <Bookmark aria-hidden="true" fill={saved ? "currentColor" : "none"} />
          </button>
        </header>
        <div className="concept-body">
          <div className="concept-feature">
            <div className="interface-copy">
              <h4>{showNote ? "Small observations, properly held." : "Nothing saved yet."}</h4>
              <p>{showNote ? "Three things worth returning to." : "Return to Journal and bookmark a note to keep it here."}</p>
            </div>
          </div>
          <p id={excerptId} className="concept-excerpt" hidden={!open || !showNote}>The color of the road after rain. A line of trees against the sky. The small details that stay with us on the way home.</p>
          <div className="concept-bottom">
            {showNote ? <button className="concept-read-more" type="button" aria-expanded={open} aria-controls={excerptId} onClick={() => setOpen(!open)}>{open ? "Read less" : "Read more"}</button> : <span>No saved notes</span>}
          </div>
        </div>
        <nav className="concept-footer" aria-label={mustard ? "Mustard concept views" : "Slate concept views"}>
          <button type="button" aria-pressed={view === "journal"} onClick={() => setView("journal")}><span className="concept-view-label">Journal</span></button>
          <button type="button" aria-pressed={view === "saved"} onClick={() => setView("saved")}><span className="concept-view-label">Saved <span className="concept-save-count">{saved ? 1 : 0}</span></span></button>
        </nav>
      </div>
    </section>
  );
}

export default function OvercastAfternoon() {
  return (
    <StudyLayout study={overcastStudy}>
      <InspirationStudy study={overcastStudy}>
        A wet road, a gray sky, a line of yellow. The starting point
        for this collection of color, type, and interface studies.
      </InspirationStudy>
      <PaletteStudy study={overcastStudy} title="An overcast afternoon" label="A muted overcast color palette">
        This idea came to me on a drive home, watching the road meet
        the sky and the yellow lines cut through the gray. A few
        colors from an ordinary afternoon, worth keeping together.
      </PaletteStudy>
      <TypographyStudy name="Caudex" specimens={typeSpecimens} />
      <article className="curiosity-card interaction-study">
        <h2 className="interface-section-title">From palette to interface</h2>
        <p className="interface-study-note">Two takes on a small journal, using the colors and type above. Try saving a note, opening Saved, or expanding the text.</p>
        <div className="interface-variations">
          <InterfaceConcept />
          <InterfaceConcept mustard />
        </div>
      </article>
    </StudyLayout>
  );
}
