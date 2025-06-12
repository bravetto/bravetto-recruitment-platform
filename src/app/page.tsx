'use client'

import { useState, useEffect, useRef } from 'react'
import HeroSection from '@/components/bravetto/hero-section'
import MissionSection from '@/components/bravetto/mission-section'
import ExecutiveSection from '@/components/bravetto/executive-section'
import OpenRolesSection from '@/components/bravetto/open-roles-section'
import CultureSection from '@/components/bravetto/culture-section'
import TimelineSection from '@/components/bravetto/timeline-section'
import ChallengeSection from '@/components/bravetto/challenge-section'
import FinalCTASection from '@/components/bravetto/final-cta-section'
import BravettoFooter from '@/components/bravetto/bravetto-footer'
import { BravettoQuestModal } from '@/components/shared/Modal/BravettoQuestModal'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContext, setModalContext] = useState<{ role?: string } | null>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  
  // Demo state
  const [demoActive, setDemoActive] = useState(false)
  const [demoTimerValue, setDemoTimerValue] = useState(0)
  const demoIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const handleJoinRevolution = (event?: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (event) event.preventDefault()
    setModalContext(null)
    setIsModalOpen(true)
  }

  const handleApplyForRole = (role: string) => {
    setModalContext({ role })
    setIsModalOpen(true)
  }

  const handleChallengeClick = (event?: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (event) event.preventDefault()
    setModalContext({ role: 'challenge' })
    setIsModalOpen(true)
  }

  const handleLearnMission = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const missionSection = document.getElementById('mission')
    if (missionSection) {
      missionSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleStartLiveDemo = () => {
    const appIdeaInput = document.getElementById('appIdea') as HTMLInputElement
    if (!appIdeaInput || !appIdeaInput.value.trim()) {
      alert('Please describe your app idea first!')
      return
    }
    if (demoActive) return
    
    setDemoActive(true)
    setDemoTimerValue(0)
    
    // Show/hide elements
    const startDemoButton = document.getElementById('startDemo') as HTMLButtonElement
    if (startDemoButton) startDemoButton.disabled = true
    
    const agentGrid = document.getElementById('agentGrid')
    if (agentGrid) agentGrid.style.display = 'grid'
    
    const progressContainer = document.getElementById('progressContainer')
    if (progressContainer) progressContainer.style.display = 'block'
    
    const codeDisplay = document.getElementById('codeDisplay')
    if (codeDisplay) codeDisplay.style.display = 'block'
    
    const successMessage = document.getElementById('successMessage')
    if (successMessage) successMessage.style.display = 'none'
    
    const generatedCodeContainer = document.getElementById('generatedCode')
    if (generatedCodeContainer) generatedCodeContainer.innerHTML = ''
    
    // Start the demo interval
    demoIntervalRef.current = setInterval(() => {
      setDemoTimerValue(prev => prev + 0.1)
    }, 100)
  }

  // Demo update effect
  useEffect(() => {
    if (!demoActive) return
    
    const seconds = Math.floor(demoTimerValue)
    const milliseconds = Math.floor((demoTimerValue % 1) * 100)
    const demoTimerDisplay = document.getElementById('demoTimer')
    if (demoTimerDisplay) {
      demoTimerDisplay.textContent = `${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`
    }
    
    const progress = Math.min((demoTimerValue / 42) * 100, 100)
    const progressBarElement = document.getElementById('progressBar') as HTMLDivElement
    if (progressBarElement) {
      progressBarElement.style.width = progress + '%'
      progressBarElement.textContent = Math.floor(progress) + '%'
    }
    
    // Agent activation logic
    if (demoTimerValue < 7) {
      activateAgent('flynn')
      generateCode('frontend')
    } else if (demoTimerValue < 14) {
      deactivateAgent('flynn')
      activateAgent('clu')
      generateCode('backend')
    } else if (demoTimerValue < 21) {
      deactivateAgent('clu')
      activateAgent('yori')
      generateCode('infrastructure')
    } else if (demoTimerValue < 28) {
      deactivateAgent('yori')
      activateAgent('tron')
      generateCode('security')
    } else if (demoTimerValue < 35) {
      deactivateAgent('tron')
      activateAgent('sark')
      generateCode('analytics')
    } else if (demoTimerValue < 42) {
      deactivateAgent('sark')
      activateAgent('dumont')
      generateCode('testing')
    } else {
      // Demo complete
      if (demoIntervalRef.current) {
        clearInterval(demoIntervalRef.current)
        demoIntervalRef.current = null
      }
      deactivateAgent('dumont')
      showSuccess()
    }
  }, [demoTimerValue, demoActive])

  const activateAgent = (agentId: string) => {
    const agentElement = document.getElementById(`agent-${agentId}`)
    if (agentElement) agentElement.classList.add('active')
  }
  
  const deactivateAgent = (agentId: string) => {
    const agentElement = document.getElementById(`agent-${agentId}`)
    if (agentElement) agentElement.classList.remove('active')
  }
  
  const generateCode = (phase: string) => {
    const codeSnippets: Record<string, string[]> = {
      frontend: [
        '<span class="code-comment">// Flynn: Generating React components...</span>',
        '<span class="code-keyword">import</span> <span class="code-variable">React</span> <span class="code-keyword">from</span> <span class="code-string">"react"</span>;',
        '<span class="code-keyword">import</span> { <span class="code-variable">useState</span>, <span class="code-variable">useEffect</span> } <span class="code-keyword">from</span> <span class="code-string">"react"</span>;',
        '',
        '<span class="code-keyword">const</span> <span class="code-function">TaskManager</span> = () => {',
        '  <span class="code-keyword">const</span> [<span class="code-variable">tasks</span>, <span class="code-variable">setTasks</span>] = <span class="code-function">useState</span>([]);',
        '  <span class="code-keyword">const</span> [<span class="code-variable">voiceEnabled</span>, <span class="code-variable">setVoiceEnabled</span>] = <span class="code-function">useState</span>(true);'
      ],
      backend: [
        '<span class="code-comment">// Clu: Orchestrating API endpoints...</span>',
        '<span class="code-keyword">const</span> <span class="code-variable">express</span> = <span class="code-function">require</span>(<span class="code-string">"express"</span>);',
        '<span class="code-keyword">const</span> <span class="code-variable">app</span> = <span class="code-function">express</span>();',
        '',
        '<span class="code-variable">app</span>.<span class="code-function">post</span>(<span class="code-string">"/api/tasks"</span>, <span class="code-keyword">async</span> (<span class="code-variable">req</span>, <span class="code-variable">res</span>) => {',
        '  <span class="code-keyword">const</span> { <span class="code-variable">task</span>, <span class="code-variable">priority</span> } = <span class="code-variable">req</span>.<span class="code-variable">body</span>;',
        '  <span class="code-keyword">const</span> <span class="code-variable">aiPriority</span> = <span class="code-keyword">await</span> <span class="code-function">calculateAIPriority</span>(<span class="code-variable">task</span>);'
      ],
      infrastructure: [
        '<span class="code-comment">// Yori: Deploying to cloud infrastructure...</span>',
        '<span class="code-keyword">resource</span> <span class="code-string">"aws_lambda_function"</span> <span class="code-string">"task_processor"</span> {',
        '  <span class="code-variable">function_name</span> = <span class="code-string">"bravetto-task-ai"</span>',
        '  <span class="code-variable">runtime</span>       = <span class="code-string">"nodejs18.x"</span>',
        '  <span class="code-variable">handler</span>       = <span class="code-string">"index.handler"</span>',
        '  <span class="code-variable">memory_size</span>   = <span class="code-string">256</span>'
      ],
      security: [
        '<span class="code-comment">// Tron: Implementing security layers...</span>',
        '<span class="code-keyword">const</span> <span class="code-variable">helmet</span> = <span class="code-function">require</span>(<span class="code-string">"helmet"</span>);',
        '<span class="code-keyword">const</span> <span class="code-variable">rateLimit</span> = <span class="code-function">require</span>(<span class="code-string">"express-rate-limit"</span>);',
        '',
        '<span class="code-variable">app</span>.<span class="code-function">use</span>(<span class="code-function">helmet</span>());',
        '<span class="code-variable">app</span>.<span class="code-function">use</span>(<span class="code-function">rateLimit</span>({ <span class="code-variable">windowMs</span>: 900000, <span class="code-variable">max</span>: 100 }));'
      ],
      analytics: [
        '<span class="code-comment">// Sark: Setting up analytics tracking...</span>',
        '<span class="code-keyword">import</span> { <span class="code-variable">Analytics</span> } <span class="code-keyword">from</span> <span class="code-string">"@segment/analytics-next"</span>',
        '',
        '<span class="code-keyword">const</span> <span class="code-variable">analytics</span> = <span class="code-function">Analytics</span>({',
        '  <span class="code-variable">writeKey</span>: <span class="code-variable">process</span>.<span class="code-variable">env</span>.<span class="code-variable">ANALYTICS_KEY</span>',
        '});'
      ],
      testing: [
        '<span class="code-comment">// Dumont: Running quality assurance...</span>',
        '<span class="code-function">describe</span>(<span class="code-string">"TaskManager Integration"</span>, () => {',
        '  <span class="code-function">test</span>(<span class="code-string">"AI prioritization completes in <1s"</span>, <span class="code-keyword">async</span> () => {',
        '    <span class="code-keyword">const</span> <span class="code-variable">result</span> = <span class="code-keyword">await</span> <span class="code-function">prioritizeTask</span>(<span class="code-string">"Complete demo"</span>);',
        '    <span class="code-function">expect</span>(<span class="code-variable">result</span>.<span class="code-variable">responseTime</span>).<span class="code-function">toBeLessThan</span>(1000);',
        '  });',
        '});',
        '',
        '<span class="code-comment">// ✅ All tests passing - Ready for deployment!</span>'
      ]
    }
    
    const lines = codeSnippets[phase]
    if (!lines) return
    
    const codeContainer = document.getElementById('generatedCode')
    if (!codeContainer) return
    
    // Only add new lines if we're in a new phase
    const currentPhase = codeContainer.getAttribute('data-phase')
    if (currentPhase === phase) return
    codeContainer.setAttribute('data-phase', phase)
    
    lines.forEach((line, index) => {
      setTimeout(() => {
        const lineDiv = document.createElement('div')
        lineDiv.className = 'code-line'
        lineDiv.innerHTML = line || '&nbsp;'
        lineDiv.style.animationDelay = `${index * 0.05}s`
        codeContainer.appendChild(lineDiv)
        codeContainer.scrollTop = codeContainer.scrollHeight
      }, index * 50)
    })
  }
  
  const showSuccess = () => {
    const codeDisplay = document.getElementById('codeDisplay')
    if (codeDisplay) codeDisplay.style.display = 'none'
    
    const progressContainer = document.getElementById('progressContainer')
    if (progressContainer) progressContainer.style.display = 'none'
    
    const agentGrid = document.getElementById('agentGrid')
    if (agentGrid) agentGrid.style.display = 'none'
    
    const successMessage = document.getElementById('successMessage')
    if (successMessage) successMessage.style.display = 'block'
    
    setDemoActive(false)
    
    const startDemoButton = document.getElementById('startDemo') as HTMLButtonElement
    if (startDemoButton) startDemoButton.disabled = false
  }

  // Create floating particles
  useEffect(() => {
    function createParticles() {
      const particlesContainer = particlesRef.current
      if (!particlesContainer) return
      particlesContainer.innerHTML = "" // Clear existing particles
      
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement("div")
        particle.className = "particle"
        particle.style.left = Math.random() * 100 + "%"
        particle.style.animationDelay = Math.random() * 15 + "s"
        particle.style.animationDuration = 15 + Math.random() * 10 + "s"
        particlesContainer.appendChild(particle)
      }
    }

    createParticles()
    
    // Recreate particles on window resize
    const handleResize = () => createParticles()
    window.addEventListener('resize', handleResize)
    
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Debug: Check if CSS variables are loaded
  useEffect(() => {
    const styles = getComputedStyle(document.documentElement)
    console.log('Bravetto Primary Color:', styles.getPropertyValue('--bravetto-primary'))
  }, [])

  return (
    <>
      <div id="bravetto-landing">
        {/* Particles Background */}
        <div className="particles" ref={particlesRef}></div>
        
        <HeroSection
          onStartLiveDemo={handleStartLiveDemo}
          onJoinRevolution={handleJoinRevolution}
          onLearnMission={handleLearnMission}
        />
        <MissionSection />
        <ExecutiveSection />
        <OpenRolesSection 
          onChallengeClick={handleChallengeClick}
          onApplyForRole={handleApplyForRole}
        />
        <CultureSection />
        <TimelineSection />
        <ChallengeSection onRequestChallenge={handleChallengeClick} />
        <FinalCTASection onJoinRevolution={handleJoinRevolution} />
        <BravettoFooter />
      </div>

      {/* Modal Component */}
      <BravettoQuestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
}
