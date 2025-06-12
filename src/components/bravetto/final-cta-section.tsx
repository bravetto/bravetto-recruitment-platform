"use client"
import type React from "react"

interface FinalCTASectionProps {
  onJoinRevolution: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
}
export default function FinalCTASection({ onJoinRevolution }: FinalCTASectionProps) {
  return (
    <section
      className="section"
      style={{ background: "linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(255, 0, 255, 0.1) 100%)" }}
    >
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "48px",
              background: "var(--bravetto-gradient-2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "30px",
            }}
          >
            Your 42-Second Future Awaits
          </h2>
          <p style={{ fontSize: "24px", marginBottom: "20px" }}>Stop building someone else's vision.</p>
          <p style={{ fontSize: "28px", color: "var(--bravetto-primary)", fontWeight: 700, marginBottom: "40px" }}>
            Start creating the impossible.
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
            <h3 style={{ fontSize: "32px", color: "var(--bravetto-primary)", marginBottom: "20px" }}>
              In 90 Days, You Will Have:
            </h3>
            <ul
              style={{
                listStyle: "none",
                fontSize: "20px",
                lineHeight: 2.5,
                textAlign: "left",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              <li>✅ Built core components of the 42-second system</li>
              <li>✅ Orchestrated AI agents that work as one</li>
              <li>✅ Deployed your first sub-minute application</li>
              <li>✅ Transformed how software is created</li>
              <li>✅ Proven the impossible is possible</li>
            </ul>
          </div>
          <div className="cta-container">
            <button
              className="btn btn-primary"
              onClick={onJoinRevolution}
              style={{ fontSize: "20px", padding: "25px 50px" }}
            >
              🚀 Start Your 42-Second Quest
            </button>
          </div>
          <p style={{ fontSize: "18px", marginTop: "30px", color: "rgba(255, 255, 255, 0.8)" }}>
            Apply only if you believe the impossible is just the beginning.
          </p>
        </div>
      </div>
    </section>
  )
}
