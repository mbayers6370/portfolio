import { aboutContent } from '../content/about'

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-inner">
          <div className="about-left">
            <div className="about-left-header">
              <span className="label">{aboutContent.label}</span>
              <div className="about-left-rule" />
              <h2 className="section-title">
                {aboutContent.title[0]}
                <br />
                {aboutContent.title[1]}
              </h2>
            </div>
          </div>

          <div className="about-right">
            {aboutContent.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <div className="skills-header">{aboutContent.skillsHeader}</div>
            <div className="skills-grid">
              {Object.entries(aboutContent.skills).map(([col, groups]) => (
                <div className="skills-column" key={col}>
                  {Object.entries(groups).map(([group, items]) => (
                    <div key={group}>
                      <h4>{group}</h4>
                      <ul>
                        {items.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
