"use client"

const cultureItems = [
  {
    title: "🚀 We Question Everything",
    description:
      "If someone says \"that's how it's always been done,\" we know we're onto something revolutionary. The 42-second goal exists because we questioned why deployment takes hours.",
  },
  {
    title: "💫 We Build for Humanity",
    description:
      "Technology serves people. The 42-second system democratizes software creation, enabling anyone to build without barriers. We amplify human potential, never replace it.",
  },
  {
    title: "⚡ We Move at Thought Speed",
    description:
      "42 seconds isn't just our product—it's our metabolism. We build, test, and deploy at speeds others consider impossible. Speed is our competitive advantage.",
  },
  {
    title: "🌊 We Create Tsunamis",
    description:
      "While others iterate, we revolutionize. The 42-second system isn't an improvement—it's a paradigm shift that transforms how humanity creates software.",
  },
]

export default function CultureSection() {
  return (
    <section className="section" style={{ background: "rgba(255, 0, 255, 0.02)" }}>
      <div className="container">
        <h2 className="section-title">THE BRAVËTTO WAY</h2>
        <div className="culture-grid">
          {cultureItems.map((item) => (
            <div className="culture-item" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
