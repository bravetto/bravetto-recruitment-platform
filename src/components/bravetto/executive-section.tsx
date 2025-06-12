"use client"

const executives = [
  {
    name: "Michael Mataluni",
    title: "CEO & Visionary Catalyst",
    stats: [
      { value: "$50M+", label: "Revenue Generated" },
      { value: "20/20", label: "Winner Score" },
    ],
    quote: "We're not building software. We're building the future of human potential.",
    achievements: [
      "Scaled Photography Academy from $0 to $10M+",
      "NVIDIA Inception Program Partner",
      "Pioneer of epicMARKETmax framework",
    ],
  },
  {
    name: "Bill McDade",
    title: "COO/CTO & Technical Commander",
    stats: [
      { value: "25+", label: "Years Experience" },
      { value: "19/20", label: "Leader Score" },
    ],
    quote: "I've built global teams. Now we're building technology that builds itself.",
    achievements: [
      "Scaled teams from 0 to 120+ at Fortune 500s",
      "Led deployments across 20+ countries",
      "Former VP Innovation at Westinghouse Electric",
    ],
  },
  {
    name: "Jay Forte",
    title: "CFO/CPO & Chief Human Potential Officer",
    stats: [
      { value: "3,500+", label: "Lives Transformed" },
      { value: "20/20", label: "Friend Score" },
    ],
    quote: "When people operate in their greatness, the impossible becomes inevitable.",
    achievements: [
      'Creator of "The Greatness Zone" methodology',
      "Published thought leader and executive coach",
      "Transforms teams into greatness engines",
    ],
  },
  {
    name: "Cameron Raines",
    title: "Founder & Senior Technical Advisor",
    stats: [
      { value: "25+", label: "Enterprise Deployments" },
      { value: "20/20", label: "Facilitator Score" },
    ],
    quote: "The best technology feels like magic. That's what we're creating.",
    achievements: [
      "Co-founder and strategic technical architect",
      "Deep expertise in AI and emerging technologies",
      "Mentor to technical leadership team",
    ],
  },
]

interface ExecutiveCardProps {
  executive: (typeof executives)[0]
}

function ExecutiveCard({ executive }: ExecutiveCardProps) {
  return (
    <div className="executive-card">
      <h3 className="executive-name">{executive.name}</h3>
      <p className="executive-title">{executive.title}</p>
      <div className="executive-stats">
        {executive.stats.map((stat) => (
          <div className="stat" key={stat.label}>
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
      <p style={{ marginTop: "20px", fontStyle: "italic", color: "rgba(255, 255, 255, 0.8)" }}>"{executive.quote}"</p>
      <ul style={{ marginTop: "20px", listStyle: "none", color: "rgba(255, 255, 255, 0.6)" }}>
        {executive.achievements.map((ach) => (
          <li key={ach}>✓ {ach}</li>
        ))}
      </ul>
    </div>
  )
}

export default function ExecutiveSection() {
  return (
    <section className="section" style={{ background: "rgba(255, 255, 255, 0.02)" }}>
      <div className="container">
        <h2 className="section-title">REVOLUTIONARY LEADERSHIP</h2>
        <p style={{ textAlign: "center", fontSize: "20px", marginBottom: "60px", color: "var(--bravetto-accent)" }}>
          Led by industry veterans with $1B+ in combined experience building the impossible
        </p>
        <div className="executive-grid">
          {executives.map((exec) => (
            <ExecutiveCard key={exec.name} executive={exec} />
          ))}
        </div>
      </div>
    </section>
  )
}
