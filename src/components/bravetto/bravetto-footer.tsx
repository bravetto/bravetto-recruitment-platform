"use client"

export default function BravettoFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <h3 className="footer-tagline">bë bold. bë human. bë Bravëtto.</h3>
        <p style={{ fontSize: "18px", color: "rgba(255, 255, 255, 0.6)", margin: "20px 0" }}>
          Building the 42-second deployment system that will transform how humanity creates software.
        </p>
        <p style={{ fontSize: "16px", color: "rgba(255, 255, 255, 0.4)", marginTop: "40px" }}>
          We are an equal opportunity revolutionizer. We celebrate diversity of thought, background, and approach.
          <br />
          The only requirement is the burning desire to make the impossible possible.
        </p>
        <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.3)", marginTop: "20px" }}>
          Contact:{" "}
          <a href="mailto:jay@bravetto.com" style={{ color: "var(--bravetto-primary)", textDecoration: "none" }}>
            jay@bravetto.com
          </a>{" "}
          | Location: Orlando, FL (Remote-First) | © 2025 Bravëtto LLC
        </p>
      </div>
    </footer>
  )
}
