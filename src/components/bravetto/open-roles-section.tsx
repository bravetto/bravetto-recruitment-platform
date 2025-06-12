"use client"
import type React from "react"

interface Role {
  id: string
  title: string
  subtitle: string
  mission: string
  responsibilities: string[]
  compensation: { label: string; value: string; detail: string }[]
  challengeLink?: string
  applyLink: string
  applyText: string
  challengeText?: string
}

const roles: Role[] = [
  {
    id: "full-stack",
    title: "🛠️ SENIOR FULL-STACK DEVELOPER",
    subtitle: "The 42-Second Architect",
    mission:
      "You will architect and build the core development engine (Flynn) that generates complete, production-ready applications in 42 seconds. This isn't about maintaining code—it's about creating an AI system that writes better code than humans, faster than humans thought possible.",
    responsibilities: [
      "The Flynn Development Engine: AI agent that generates complete applications",
      "Multi-Agent Orchestration: Make 6 specialized AI agents work as one",
      "42-Second Pipeline: From natural language to deployed application",
      "V0.dev + Cursor.ai Integration: Leverage cutting-edge AI development tools",
    ],
    compensation: [
      { label: "Base Salary", value: "$125K", detail: "Top-tier compensation" },
      { label: "Equity", value: "0.75%", detail: "Own the revolution" },
      { label: "Bonuses", value: "$20K", detail: "For breaking barriers" },
      { label: "Location", value: "Remote", detail: "Create from anywhere" },
    ],
    applyLink: "mailto:jay@bravetto.com?subject=Senior Full-Stack Developer - 42-Second Revolution",
    applyText: "📧 Apply Standard Process",
  },
  {
    id: "ai-ml",
    title: "🧠 AI/ML ENGINEER",
    subtitle: "The Intelligence Orchestrator",
    mission:
      "You will design the AI coordination system that enables 6 specialized agents to function as one unified intelligence. Your work will make Flynn (development), Clu (orchestration), Yori (infrastructure), and others dance in perfect 42-second harmony.",
    responsibilities: [
      "Multi-Agent Coordination System: Real-time AI agent choreography",
      "Intelligent Task Routing: <5-second handoffs between agents",
      "Creative AI Integration: Midjourney, VEO 3, Runway ML for multimedia",
      "Learning Systems: AI that improves with every deployment",
    ],
    compensation: [
      { label: "Base Salary", value: "$135K", detail: "Innovation premium" },
      { label: "Equity", value: "0.75%", detail: "Bigger stake" },
      { label: "Bonuses", value: "$20K", detail: "For breakthroughs" },
      { label: "Learning", value: "$3K/yr", detail: "Conference budget" },
    ],
    applyLink: "mailto:jay@bravetto.com?subject=AI/ML Engineer - Intelligence Orchestrator",
    applyText: "🎯 Apply to Orchestrate Intelligence",
  },
  {
    id: "devops",
    title: "⚡ DEVOPS ENGINEER",
    subtitle: "The Speed Architect",
    mission:
      "You will build the infrastructure that makes 42-second deployment not just possible, but inevitable. Your pipelines will deploy faster than most systems can boot. Your infrastructure will scale before load arrives. You'll make the impossible timeline possible.",
    responsibilities: [
      "42-Second CI/CD Pipeline: From commit to production in seconds",
      "Predictive Auto-Scaling: Infrastructure that anticipates demand",
      "Edge-First Architecture: Sub-second response times globally",
      "Yori Infrastructure Agent: Automated deployment and scaling",
    ],
    compensation: [
      { label: "Base Salary", value: "$140K", detail: "Speed has value" },
      { label: "Equity", value: "0.75%", detail: "Own the infrastructure" },
      { label: "Bonuses", value: "$20K", detail: "For speed records" },
      { label: "Tech", value: "Latest", detail: "MacBook Pro + $1K" },
    ],
    applyLink: "mailto:jay@bravetto.com?subject=DevOps Engineer - Speed Architect",
    applyText: "⚡ Apply to Break Speed Limits",
  },
]

interface RoleCardProps {
  role: Role
  onChallengeClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  onApplyForRole: (role: string) => void
}

function RoleCard({ role, onChallengeClick, onApplyForRole }: RoleCardProps) {
  return (
    <div className="role-card">
      <h3>{role.title}</h3>
      <p className="role-subtitle">{role.subtitle}</p>
      <div className="mission-box">
        <h4>YOUR 42-SECOND MISSION</h4>
        <p style={{ fontSize: "18px", lineHeight: 1.8 }}>{role.mission}</p>
      </div>
      <h4 style={{ color: "var(--bravetto-primary)", margin: "30px 0 20px" }}>What You'll Build:</h4>
      <ul style={{ listStyle: "none", fontSize: "18px", lineHeight: 2, marginBottom: "30px" }}>
        {role.responsibilities.map((resp) => (
          <li key={resp}>
            ⚡ <strong>{resp.split(":")[0]}</strong>: {resp.split(":")[1]}
          </li>
        ))}
      </ul>
      <div className="comp-grid">
        {role.compensation.map((comp) => (
          <div className="comp-item" key={comp.label}>
            <h5 style={{ color: "var(--bravetto-accent)", marginBottom: "10px" }}>{comp.label}</h5>
            <span className="comp-value">{comp.value}</span>
            <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.6)" }}>{comp.detail}</p>
          </div>
        ))}
      </div>
      <div className="cta-container">
        {role.challengeLink && role.challengeText && onChallengeClick && (
          <a href={role.challengeLink} className="btn btn-primary" onClick={onChallengeClick}>
            {role.challengeText}
          </a>
        )}
        <button
          className={`btn ${role.challengeLink ? "btn-secondary" : "btn-primary"}`}
          onClick={() => onApplyForRole(role.id)}
        >
          {role.id === 'full-stack' ? '🚀 Start Your Quest' : 
           role.id === 'ai-ml' ? '🧠 Begin AI Journey' : 
           role.id === 'devops' ? '⚡ Launch Speed Quest' : 
           role.applyText}
        </button>
        <a
          href={role.applyLink}
          className="btn btn-tertiary"
          style={{ marginTop: "10px", opacity: 0.7, fontSize: "14px" }}
        >
          {role.id === 'full-stack' ? '📧 Submit Dusty Resume' :
           role.id === 'ai-ml' ? '🤖 Email Your Pre-Trained Resume' :
           role.id === 'devops' ? '🐌 Send Traditional CV via SMTP' :
           '📧 Apply Standard Process'}
        </a>
      </div>
    </div>
  )
}

interface OpenRolesSectionProps {
  onChallengeClick: (event: React.MouseEvent<HTMLAnchorElement>) => void
  onApplyForRole: (role: string) => void
}

export default function OpenRolesSection({ onChallengeClick, onApplyForRole }: OpenRolesSectionProps) {
  return (
    <section className="section" id="roles">
      <div className="container">
        <h2 className="section-title">BUILD THE 42-SECOND ENGINE</h2>
        <p style={{ textAlign: "center", fontSize: "24px", marginBottom: "60px", color: "var(--bravetto-accent)" }}>
          These aren't jobs. They're invitations to architect the impossible.
        </p>
        <div className="positions-counter">
          <h3 className="positions-title">🔥 Founding Team Status</h3>
          <p style={{ fontSize: "18px", marginBottom: "20px" }}>Current Team: 7 Revolutionaries</p>
          <div className="position-item">
            <span className="position-name">Only 3 Positions Remaining</span>
            <div className="position-status">
              <div className="position-bar" style={{ width: "150px" }}>
                <div className="position-fill" style={{ width: "70%" }}></div>
              </div>
              <span style={{ color: "var(--bravetto-primary)" }}>Join Before It's Too Late</span>
            </div>
          </div>
        </div>
        {roles.map((role) => (
          <RoleCard key={role.id} role={role} onChallengeClick={onChallengeClick} onApplyForRole={onApplyForRole} />
        ))}
      </div>
    </section>
  )
}
