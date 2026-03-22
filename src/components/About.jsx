const skills = {
  left: {
    Languages: ['JavaScript (ES6+)', 'TypeScript', 'Python', 'SQL', 'HTML / CSS'],
    Frontend: ['React', 'Next.js', 'Vite', 'CSS Modules'],
  },
  right: {
    Backend: ['Node.js', 'Express', 'PostgreSQL', 'REST APIs'],
    Tools: ['Git / GitHub', 'Figma', 'Netlify / Vercel', 'Linux / CLI'],
  },
}

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-inner">

          <div className="about-left">
            <div className="about-left-header">
              <span className="label">About</span>
              <div className="about-left-rule" />
              <h2 className="section-title">Who<br />I Am</h2>
            </div>
          </div>

          <div className="about-right">
            <p>
              I’m a full-stack developer with a background in graphic design, which 
              means I tend to see products as systems of both logic and perception. 
              I care as much about structure as I do about surface.
            </p>
            <p>
              I care about systems that make sense beneath the surface and interfaces 
              that feel clear when people actually use them. Whether I’m working in 
              frontend architecture, backend logic, or interaction design, I tend to 
              focus on the same things: clarity, intention, and removing what does 
              not need to be there.
            </p>

            <div className="skills-header">Technical Skills</div>
            <div className="skills-grid">
              {Object.entries(skills).map(([col, groups]) => (
                <div className="skills-column" key={col}>
                  {Object.entries(groups).map(([group, items]) => (
                    <div key={group}>
                      <h4>{group}</h4>
                      <ul>
                        {items.map(item => <li key={item}>{item}</li>)}
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
