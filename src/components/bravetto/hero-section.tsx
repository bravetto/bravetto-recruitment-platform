"use client"
import type React from "react"

interface HeroSectionProps {
  onStartLiveDemo: () => void
  onJoinRevolution: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
  onLearnMission: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

export default function HeroSection({ onStartLiveDemo, onJoinRevolution, onLearnMission }: HeroSectionProps) {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="glitch">42-SECOND REVOLUTION</h1>
          <p className="hero-subtitle">Deploy Software Faster Than Making Coffee</p>

          {/* Live Demo Section - This will be further componentized */}
          <div className="live-demo-container">
            <div className="demo-header">
              <h2 className="demo-title">🚀 EXPERIENCE THE 42-SECOND FUTURE</h2>
              <div className="demo-timer" id="demoTimer">
                00:00
              </div>
            </div>

            <div className="demo-input-section">
              <input
                type="text"
                className="demo-input"
                id="appIdea"
                placeholder="Describe your app idea (e.g., 'AI-powered task manager with voice commands')"
              />
              <button className="demo-button" id="startDemo" onClick={onStartLiveDemo}>
                Generate Application in 42 Seconds
              </button>
            </div>

            {/* Agent Activity Visualization */}
            <div className="agent-grid" id="agentGrid" style={{ display: "none" }}>
              {/* Agent cards would be mapped here if this was a sub-component */}
              <div className="agent-card" id="agent-flynn">
                <div className="agent-icon">🧠</div>
                <div className="agent-name">Flynn</div>
                <div className="agent-status">Code Generation</div>
              </div>
              <div className="agent-card" id="agent-clu">
                <div className="agent-icon">🎯</div>
                <div className="agent-name">Clu</div>
                <div className="agent-status">Orchestration</div>
              </div>
              <div className="agent-card" id="agent-yori">
                <div className="agent-icon">⚡</div>
                <div className="agent-name">Yori</div>
                <div className="agent-status">Infrastructure</div>
              </div>
              <div className="agent-card" id="agent-tron">
                <div className="agent-icon">🛡️</div>
                <div className="agent-name">Tron</div>
                <div className="agent-status">Security</div>
              </div>
              <div className="agent-card" id="agent-sark">
                <div className="agent-icon">📊</div>
                <div className="agent-name">Sark</div>
                <div className="agent-status">Analytics</div>
              </div>
              <div className="agent-card" id="agent-dumont">
                <div className="agent-icon">✅</div>
                <div className="agent-name">Dumont</div>
                <div className="agent-status">Quality</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="progress-container" id="progressContainer" style={{ display: "none" }}>
              <div className="progress-bar" id="progressBar">
                0%
              </div>
            </div>

            {/* Code Display */}
            <div className="code-display" id="codeDisplay" style={{ display: "none" }}>
              <div id="generatedCode"></div>
            </div>

            {/* Success Message */}
            <div className="success-message" id="successMessage">
              <div className="success-icon">🎉</div>
              <h3 style={{ fontSize: "32px", color: "var(--bravetto-primary)", marginBottom: "20px" }}>
                Your Vision is Ready for the Revolution!
              </h3>
              <p style={{ fontSize: "20px", marginBottom: "30px" }}>
                This is just a demo, but imagine building this <strong>for real</strong> as part of our team.
              </p>
              <div className="demo-impact">
                <h4 style={{ fontSize: "24px", color: "var(--bravetto-primary)", marginBottom: "20px" }}>
                  As a Bravetto Revolutionary, You Will:
                </h4>
                <div className="impact-grid">
                  <div className="impact-item">
                    <span className="impact-number">10M+</span>
                    <span className="impact-label">Lives Transformed</span>
                  </div>
                  <div className="impact-item">
                    <span className="impact-number">1M+</span>
                    <span className="impact-label">Businesses Enabled</span>
                  </div>
                  <div className="impact-item">
                    <span className="impact-number">$100B+</span>
                    <span className="impact-label">Economic Value Created</span>
                  </div>
                  <div className="impact-item">
                    <span className="impact-number">∞</span>
                    <span className="impact-label">Human Potential Amplified</span>
                  </div>
                </div>
                <p style={{ marginTop: "30px", fontSize: "18px", lineHeight: 1.8 }}>
                  Join us to democratize AI, transform industries, and create abundance for all humanity.
                  <br />
                  <strong>The revolution isn't coming. It's here.</strong>
                </p>
              </div>
              <button className="demo-button" onClick={onJoinRevolution}>
                🚀 Start Your Quest
              </button>
            </div>
          </div>

          <p style={{ fontSize: "24px", margin: "30px 0", opacity: 0, animation: "fadeInUp 1s 1s forwards" }}>
            We're not hiring employees.
            <br />
            <span style={{ color: "var(--bravetto-primary)", fontWeight: 700 }}>
              We're recruiting architects of the impossible.
            </span>
          </p>
          <div className="cta-container" style={{ opacity: 0, animation: "fadeInUp 1s 1.5s forwards" }}>
            <button className="btn btn-primary" onClick={onJoinRevolution}>
              🎯 Begin Your Journey
            </button>
            <a href="#mission" className="btn btn-secondary" onClick={onLearnMission}>
              Learn Our Mission
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
