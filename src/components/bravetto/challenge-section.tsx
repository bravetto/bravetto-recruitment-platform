"use client"

import type React from "react"

interface ChallengeSectionProps {
  onRequestChallenge: (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void
}

export default function ChallengeSection({ onRequestChallenge }: ChallengeSectionProps) {
  return (
    <section className="section" id="challenge" style={{ background: "rgba(0, 255, 136, 0.02)" }}>
      <div className="container">
        <h2 className="section-title">THE 42-SECOND CHALLENGE</h2>
        <p style={{ textAlign: "center", fontSize: "20px", marginBottom: "40px", color: "var(--bravetto-accent)" }}>
          For Senior Full-Stack Developers Only: Prove You Belong
        </p>
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            background: "rgba(255, 255, 255, 0.05)",
            border: "2px solid var(--bravetto-primary)",
            borderRadius: "30px",
            padding: "50px",
          }}
        >
          <h3 style={{ fontSize: "28px", color: "var(--bravetto-primary)", marginBottom: "30px", textAlign: "center" }}>
            Build Something Impossible in 42 Minutes
          </h3>
          <p style={{ fontSize: "18px", lineHeight: 1.8, marginBottom: "30px" }}>
            We believe the best way to evaluate developers is to see them build. Complete this challenge to skip the
            line and prove you're ready for the 42-second revolution.
          </p>
          <div
            style={{
              background: "rgba(0, 255, 136, 0.1)",
              borderRadius: "15px",
              padding: "30px",
              marginBottom: "30px",
            }}
          >
            <h4 style={{ color: "var(--bravetto-primary)", marginBottom: "20px" }}>Your Challenge:</h4>
            <p style={{ fontSize: "16px", lineHeight: 1.8 }}>
              Create a working prototype that demonstrates AI agent coordination. Your solution should show multiple AI
              agents working together to accomplish a complex task. Use any tools, frameworks, or AI services you
              prefer.
            </p>
          </div>
          <h4 style={{ color: "var(--bravetto-accent)", marginBottom: "20px" }}>Evaluation Criteria:</h4>
          <ul style={{ listStyle: "none", fontSize: "16px", lineHeight: 2, marginBottom: "30px" }}>
            <li>⚡ Speed of implementation (target: 42 minutes)</li>
            <li>🧠 Creativity in AI agent design</li>
            <li>🔧 Code quality and architecture</li>
            <li>🚀 Potential for 42-second deployment</li>
          </ul>
          <p style={{ fontSize: "18px", textAlign: "center", marginBottom: "30px" }}>
            Ready to prove you can build the impossible?
            <br />
            <span style={{ color: "var(--bravetto-primary)" }}>The 42-second revolution starts with you.</span>
          </p>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "16px", color: "rgba(255, 255, 255, 0.7)", marginBottom: "20px" }}>
              Top submissions get immediate interviews with our technical leadership.
            </p>
            <button onClick={onRequestChallenge} className="btn btn-primary">
              🚀 Accept the Challenge
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
