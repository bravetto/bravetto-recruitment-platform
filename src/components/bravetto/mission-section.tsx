"use client"

export default function MissionSection() {
  return (
    <section className="section" id="mission">
      <div className="container">
        <h2 className="section-title">THE IMPOSSIBLE MISSION</h2>
        {/* Vision Box */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(0, 255, 136, 0.05) 0%, rgba(255, 0, 255, 0.05) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "30px",
            padding: "60px",
            marginBottom: "60px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "radial-gradient(circle at center, rgba(0, 255, 136, 0.1) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          ></div>
          <h3
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "42px",
              background: "var(--bravetto-gradient-1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            Bravetto: Where Visionaries Build the Future
          </h3>
          <p
            style={{
              fontSize: "24px",
              color: "var(--bravetto-accent)",
              textAlign: "center",
              marginBottom: "30px",
              fontStyle: "italic",
            }}
          >
            Democratizing AI. Amplifying Humanity. Creating the Impossible.
          </p>
          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.8,
              textAlign: "center",
              maxWidth: "900px",
              margin: "0 auto 20px",
              color: "rgba(255, 255, 255, 0.9)",
            }}
          >
            Bravetto is the revolutionary force building the human-centric AI infrastructure that will power the next
            century of human flourishing.
          </p>
          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.8,
              textAlign: "center",
              maxWidth: "900px",
              margin: "0 auto 30px",
              color: "rgba(255, 255, 255, 0.9)",
            }}
          >
            We don't just build AI - we orchestrate the symphony of human potential amplified by artificial intelligence
            across every industry, every community, and every life.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "30px",
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                background: "rgba(0, 255, 136, 0.1)",
                border: "1px solid var(--bravetto-primary)",
                borderRadius: "15px",
                padding: "30px",
              }}
            >
              <h4 style={{ color: "var(--bravetto-primary)", fontSize: "20px", marginBottom: "15px" }}>Our Mission</h4>
              <p style={{ fontSize: "16px", lineHeight: 1.6, color: "rgba(255, 255, 255, 0.8)" }}>
                Transform every business, empower every human, and create abundance for all through the thoughtful
                deployment of AI that amplifies rather than replaces human potential.
              </p>
            </div>
            <div
              style={{
                background: "rgba(255, 0, 255, 0.1)",
                border: "1px solid var(--bravetto-secondary)",
                borderRadius: "15px",
                padding: "30px",
              }}
            >
              <h4 style={{ color: "var(--bravetto-secondary)", fontSize: "20px", marginBottom: "15px" }}>Our Vision</h4>
              <p style={{ fontSize: "16px", lineHeight: 1.6, color: "rgba(255, 255, 255, 0.8)" }}>
                A world where AI serves humanity, where every person can access the tools to reach their greatness, and
                where technology creates opportunity rather than displacement.
              </p>
            </div>
          </div>
        </div>

        {/* Goal Box */}
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "24px", lineHeight: 1.8, marginBottom: "30px" }}>
            Every role we're hiring is laser-focused on one revolutionary goal:
          </p>
          <div
            style={{
              background: "rgba(0, 255, 136, 0.1)",
              border: "2px solid var(--bravetto-primary)",
              borderRadius: "20px",
              padding: "40px",
              margin: "40px 0",
            }}
          >
            <h3
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "36px",
                color: "var(--bravetto-primary)",
                marginBottom: "20px",
              }}
            >
              BUILD THE WORLD'S FIRST
            </h3>
            <p style={{ fontSize: "28px", color: "var(--bravetto-accent)", marginBottom: "20px" }}>
              AI-Orchestrated Software Deployment System
            </p>
            <p style={{ fontSize: "20px" }}>
              That transforms ideas into production-ready applications in{" "}
              <span className="loading-text" style={{ color: "var(--bravetto-primary)", fontWeight: 700 }}>
                42 seconds
              </span>
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-container">
          {/* Individual stat cards would be components or mapped here */}
          <div className="stat-card">
            <span className="stat-number" id="stat-agents">
              6
            </span>
            <p style={{ color: "var(--bravetto-accent)", fontSize: "18px", marginBottom: "10px" }}>
              AI Agents to Orchestrate
            </p>
            <p style={{ color: "rgba(255, 255, 255, 0.6)" }}>Flynn • Clu • Yori • Tron • Sark • Dumont</p>
          </div>
          <div className="stat-card">
            <span className="stat-number" id="stat-domains">
              1,020+
            </span>
            <p style={{ color: "var(--bravetto-accent)", fontSize: "18px", marginBottom: "10px" }}>
              Premium .ai Domains
            </p>
            <p style={{ color: "rgba(255, 255, 255, 0.6)" }}>Creating insurmountable market advantage</p>
          </div>
          <div className="stat-card">
            <span className="stat-number" id="stat-impact">
              $3B
            </span>
            <p style={{ color: "var(--bravetto-accent)", fontSize: "18px", marginBottom: "10px" }}>
              Projected Impact by 2030
            </p>
            <p style={{ color: "rgba(255, 255, 255, 0.6)" }}>Transform millions of businesses</p>
          </div>
          <div className="stat-card">
            <span className="stat-number" id="stat-speed">
              42s
            </span>
            <p style={{ color: "var(--bravetto-accent)", fontSize: "18px", marginBottom: "10px" }}>Deployment Time</p>
            <p style={{ color: "rgba(255, 255, 255, 0.6)" }}>From idea to production</p>
          </div>
        </div>
      </div>
    </section>
  )
}
