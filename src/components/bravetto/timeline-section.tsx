"use client"

const timelineEvents = [
  {
    period: "Week 1: Immersion",
    color: "var(--bravetto-primary)",
    tasks: [
      "Access the 42-second architecture",
      "Meet your revolutionary team",
      "Define your impact mission",
      "Ship your first contribution",
    ],
  },
  {
    period: "Month 1: Acceleration",
    color: "var(--bravetto-secondary)",
    tasks: [
      "Own a core system component",
      "Integrate AI agents",
      "Measure speed improvements",
      "Hit first 42-second milestone",
    ],
  },
  {
    period: "Month 3: Revolution",
    color: "var(--bravetto-accent)",
    tasks: [
      "Lead breakthrough features",
      "Deploy to production",
      "Present to leadership",
      "Define next impossible goal",
    ],
  },
]

export default function TimelineSection() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">YOUR REVOLUTIONARY PATH</h2>
        <div className="timeline">
          {timelineEvents.map((event) => (
            <div className="timeline-item" key={event.period}>
              <div className="timeline-content">
                <h3 style={{ color: event.color, marginBottom: "15px" }}>{event.period}</h3>
                <ul style={{ listStyle: "none", lineHeight: 2 }}>
                  {event.tasks.map((task) => (
                    <li key={task}>🔧 {task}</li>
                  ))}
                </ul>
              </div>
              <div
                className="timeline-marker"
                style={{ background: event.color, boxShadow: `0 0 20px ${event.color}80` }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
