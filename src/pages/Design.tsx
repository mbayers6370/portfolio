import "../styles/design.css";
import { ArrowUpRight } from "lucide-react";
import designInspo from "../assets/design-inspo.jpg";
import { useState } from "react";

export default function Design() {
  const [activeFilter, setActiveFilter] = useState("All");
  const show = (filter: string) =>
    activeFilter === "All" || activeFilter === filter;

  return (
    <div className="curiosities-page">
      <main className="curiosities-main container">
        <header className="curiosities-intro">
          <p className="curiosities-note">
            An ongoing collection, established 2026
          </p>
          <h1>Collected Curiosities.</h1>
          <p>
            Some things are simply worth a closer look.
          </p>
        </header>
        <section className="curiosities-grid" aria-label="Collection">
          {show("Color") && (
            <article className="curiosity-card color-study">
              <div
                className="color-study-swatches"
                aria-label="A muted overcast color palette"
              >
                <span />
                <span />
                <span />
              </div>
              <div className="curiosity-card-caption">
                <h2>An overcast afternoon</h2>
                <p>Color study, October 2026</p>
              </div>
            </article>
          )}
          {show("Typography") && (
            <article className="curiosity-card type-study">
              <p className="curiosity-card-index">Caudex / type guidelines</p>
              <div className="type-study-letter">Ag</div>
              <h2>Caudex</h2>
              <div className="type-guidelines">
                <div>
                  <span>Display</span>
                  <strong>Lorem Ipsum</strong>
                  <small>Regular · 48 / 48</small>
                </div>
                <div>
                  <span>Reading</span>
                  <em>Lorem Ipsum</em>
                  <small>Italic · 22 / 30</small>
                </div>
              </div>
            </article>
          )}
          {show("Interfaces") && (
            <article className="curiosity-card interaction-study">
              <p className="curiosity-card-index">Interface Concepts</p>
              <div className="interface-variations">
                <div className="interaction-sample">
                  <header>
                    <strong>Field notes</strong>
                    <nav aria-label="Sample interface navigation">
                      <span>Archive</span>
                      <span>About</span>
                    </nav>
                  </header>
                  <div className="interface-copy">
                    <p>22 October</p>
                    <h2>
                      Small observations,
                      <br />
                      properly held.
                    </h2>
                    <span>Three things worth returning to.</span>
                  </div>
                  <footer>
                    <button type="button">
                      Open note <ArrowUpRight aria-hidden="true" />
                    </button>
                    <button type="button">Save</button>
                  </footer>
                </div>
                <div className="interaction-sample interaction-sample--mustard">
                  <header>
                    <strong>Field notes</strong>
                    <nav aria-label="Alternate sample interface navigation">
                      <span>Archive</span>
                      <span>About</span>
                    </nav>
                  </header>
                  <div className="interface-copy">
                    <p>22 October</p>
                    <h2>
                      Small observations,
                      <br />
                      properly held.
                    </h2>
                    <span>Three things worth returning to.</span>
                  </div>
                  <footer>
                    <button type="button">
                      Open note <ArrowUpRight aria-hidden="true" />
                    </button>
                    <button type="button">Save</button>
                  </footer>
                </div>
              </div>
            </article>
          )}
          {show("Objects & inspiration") && (
            <article className="curiosity-card photo-study">
              <div className="photo-study-image">
                <img src={designInspo} alt="Design inspiration reference" />
              </div>

              <div className="curiosity-card-caption">
                <h2>Everyday inspirations</h2>
                <p>Collected ideas for future projects.</p>
              </div>
            </article>
          )}
        </section>
      </main>
    </div>
  );
}
