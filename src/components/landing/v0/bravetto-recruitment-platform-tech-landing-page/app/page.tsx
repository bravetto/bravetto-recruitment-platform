"use client"

import type React from "react"
import { useEffect, useRef, useCallback, useState } from "react"
import Script from "next/script"

// Import new components
// TODO: These components need to be copied to the V0 directory or the imports need to be adjusted
// import HeroSection from "@/components/bravetto/hero-section"
// import MissionSection from "@/components/bravetto/mission-section"
// import ExecutiveSection from "@/components/bravetto/executive-section"
// import OpenRolesSection from "@/components/bravetto/open-roles-section"
// import CultureSection from "@/components/bravetto/culture-section"
// import TimelineSection from "@/components/bravetto/timeline-section"
// import ChallengeSection from "@/components/bravetto/challenge-section"
// import FinalCTASection from "@/components/bravetto/final-cta-section"
// import BravettoFooter from "@/components/bravetto/bravetto-footer"
// import { BravettoQuestModal } from '@/components/shared/Modal/BravettoQuestModal'

export default function BravettoPage() {
  const particlesRef = useRef<HTMLDivElement>(null)
  const [showModal, setShowModal] = useState(false)
  const [modalContext, setModalContext] = useState<{ role?: string } | null>(null)

  // Smooth scroll handler
  const smoothScrollTo = (targetId: string, event?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (event) event.preventDefault()
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  // Handlers to pass to child components
  const handleStartLiveDemo = useCallback(() => {
    if (typeof window !== "undefined" && (window as any).startLiveDemo) {
      ;(window as any).startLiveDemo() // This will be refactored into Hero/LiveDemo component
    }
  }, [])

  const handleJoinRevolution = useCallback((event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    event.preventDefault()
    setModalContext(null)
    setShowModal(true)
  }, [])

  const handleApplyForRole = useCallback((role: string) => {
    setModalContext({ role })
    setShowModal(true)
  }, [])

  const handleLearnMission = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    smoothScrollTo("mission", event)
  }, [])

  const handleChallengeClick = useCallback((event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    event.preventDefault()
    setModalContext({ role: 'challenge' })
    setShowModal(true)
  }, [])

  useEffect(() => {
    // Particle Animation
    function createParticles() {
      const particlesContainer = particlesRef.current
      if (!particlesContainer) return
      particlesContainer.innerHTML = "" // Clear existing particles
      const particleCount = 50
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div")
        particle.classList.add("particle") // Ensure .particle styles are applied from bravetto.css
        particle.style.left = Math.random() * 100 + "%"
        particle.style.animationDelay = Math.random() * 15 + "s"
        particle.style.animationDuration = 15 + Math.random() * 10 + "s"
        particlesContainer.appendChild(particle)
      }
    }

    // Mouse tracking for cards
    function initMouseTracking() {
      const cards = document.querySelectorAll(
        "#bravetto-landing .executive-card, #bravetto-landing .role-card, #bravetto-landing .stat-card",
      )
      cards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const mouseEvent = e as MouseEvent
          const currentCard = card as HTMLElement
          const rect = currentCard.getBoundingClientRect()
          const x = ((mouseEvent.clientX - rect.left) / rect.width) * 100
          const y = ((mouseEvent.clientY - rect.top) / rect.height) * 100
          currentCard.style.setProperty("--mouse-x", `${x}%`)
          currentCard.style.setProperty("--mouse-y", `${y}%`)
        })
      })
    }

    // Animate numbers on scroll
    function animateNumbers() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target as HTMLElement
              const finalValueText = target.textContent || ""
              const isNumber = /^\d+([,.]\d*)*[+BKMs]*$/.test(finalValueText)

              if (isNumber) {
                const rawValueMatch = finalValueText.match(/^\d+([,.]\d*)*[+BKMs]*$/)
                if (!rawValueMatch) return
                const rawValue = rawValueMatch[0]
                const suffix = finalValueText.substring(rawValue.length)
                const num = Number.parseInt(rawValue.replace(/[^.\d]/g, ""))

                if (isNaN(num)) return

                let current = 0
                const increment = Math.max(1, num / 50)
                const timer = setInterval(() => {
                  current += increment
                  if (current >= num) {
                    current = num
                    clearInterval(timer)
                  }
                  target.textContent = Math.floor(current).toLocaleString() + suffix
                }, 30)
              }
              observer.unobserve(target)
            }
          })
        },
        { threshold: 0.1 },
      )

      document
        .querySelectorAll(
          "#bravetto-landing .stat-number, #bravetto-landing .stat-value, #bravetto-landing .impact-number",
        )
        .forEach((el) => {
          observer.observe(el)
        })
    }

    // Section fade-in animations
    function initPageAnimations() {
      document.querySelectorAll("#bravetto-landing .section").forEach((section) => {
        const s = section as HTMLElement
        s.style.opacity = "0"
        s.style.transform = "translateY(50px)"
        s.style.transition = "opacity 0.8s ease, transform 0.8s ease"
      })

      const scrollHandler = () => {
        const scrolled = window.pageYOffset
        document.querySelectorAll("#bravetto-landing .section").forEach((section) => {
          const s = section as HTMLElement
          const top = s.offsetTop - window.innerHeight + 200
          if (scrolled > top) {
            s.style.opacity = "1"
            s.style.transform = "translateY(0)"
          }
        })
      }
      window.addEventListener("scroll", scrollHandler)
      scrollHandler() // Initial call
      return () => window.removeEventListener("scroll", scrollHandler)
    }

    // Initialize all effects
    createParticles()
    initMouseTracking()
    animateNumbers()
    const removePageAnimationsListener = initPageAnimations()

    // Cleanup function
    return () => {
      removePageAnimationsListener()
      // Potentially remove other listeners if they were added directly to window/document
      // and not cleaned up by their own IntersectionObserver.unobserve
    }
  }, [])

  return (
    // Add the main wrapper for CSS scoping
    <div id="bravetto-landing">
      {/* Particles Background */}
      <div className="particles" ref={particlesRef}></div>

      {/* Components are commented out until they are properly imported or created in the V0 directory */}
      {/* <HeroSection
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
      <BravettoFooter /> */}

      {/* Temporary placeholder content */}
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">Bravetto Landing Page (V0 Template)</h1>
      </div>

      {/* === Modal Trigger Button === */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg hover:bg-primary/90 transition"
          onClick={() => setShowModal(true)}
        >
          Start Your Quest
        </button>
      </div>
      {/* === Modal Integration === */}
      {/* <BravettoQuestModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onSubmit={async (data) => {
          try {
            const response = await fetch('/api/submit-quest', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
            
            const result = await response.json();
            
            if (result.success) {
              console.log('Quest submitted successfully:', result);
              // You can add a success notification here
            } else {
              console.error('Quest submission failed:', result.error);
              // You can add an error notification here
            }
          } catch (error) {
            console.error('Quest submission error:', error);
          }
        }}
      /> */}

      {/* 
        The Live Demo script logic is still complex and uses global functions.
        This needs further refactoring to be fully contained within a LiveDemo component
        using React state and refs. For now, we'll keep the script tag but aim to eliminate it.
      */}
      <Script id="bravetto-live-demo-script" strategy="afterInteractive">
        {`
          // Live Demo Functionality (to be refactored into a React component)
          let demoActive = false;
          let demoTimerValue = 0; 
          let demoInterval;
          
          window.startLiveDemo = function() {
              const appIdeaInput = document.getElementById('appIdea'); // Still uses getElementById
              if (!appIdeaInput || !appIdeaInput.value.trim()) {
                  alert('Please describe your app idea first!');
                  return;
              }
              if (demoActive) return;
              demoActive = true;
              
              const startDemoButton = document.getElementById('startDemo');
              if(startDemoButton) startDemoButton.disabled = true;
              const agentGrid = document.getElementById('agentGrid');
              if(agentGrid) agentGrid.style.display = 'grid';
              const progressContainer = document.getElementById('progressContainer');
              if(progressContainer) progressContainer.style.display = 'block';
              const codeDisplay = document.getElementById('codeDisplay');
              if(codeDisplay) codeDisplay.style.display = 'block';
              const successMessage = document.getElementById('successMessage');
              if(successMessage) successMessage.style.display = 'none';
              const generatedCodeContainer = document.getElementById('generatedCode');
              if(generatedCodeContainer) generatedCodeContainer.innerHTML = '';
              
              demoTimerValue = 0;
              demoInterval = setInterval(updateDemo, 100);
          }
          
          function updateDemo() {
              demoTimerValue += 0.1;
              const seconds = Math.floor(demoTimerValue);
              const milliseconds = Math.floor((demoTimerValue % 1) * 100);
              const demoTimerDisplay = document.getElementById('demoTimer');
              if (demoTimerDisplay) {
                  demoTimerDisplay.textContent = \`\${seconds.toString().padStart(2, '0')}:\${milliseconds.toString().padStart(2, '0')}\`;
              }
              
              const progress = Math.min((demoTimerValue / 42) * 100, 100);
              const progressBarElement = document.getElementById('progressBar');
              if (progressBarElement) {
                  progressBarElement.style.width = progress + '%';
                  progressBarElement.textContent = Math.floor(progress) + '%';
              }
              
              if (demoTimerValue < 7) { activateAgent('flynn'); generateCode('frontend'); }
              else if (demoTimerValue < 14) { deactivateAgent('flynn'); activateAgent('clu'); generateCode('backend'); }
              else if (demoTimerValue < 21) { deactivateAgent('clu'); activateAgent('yori'); generateCode('infrastructure'); }
              else if (demoTimerValue < 28) { deactivateAgent('yori'); activateAgent('tron'); generateCode('security'); }
              else if (demoTimerValue < 35) { deactivateAgent('tron'); activateAgent('sark'); generateCode('analytics'); }
              else if (demoTimerValue < 42) { deactivateAgent('sark'); activateAgent('dumont'); generateCode('testing'); }
              else { clearInterval(demoInterval); deactivateAgent('dumont'); showSuccess(); }
          }
          
          function activateAgent(agentId) {
              const agentElement = document.getElementById(\`agent-\${agentId}\`);
              if (agentElement) agentElement.classList.add('active');
          }
          
          function deactivateAgent(agentId) {
               const agentElement = document.getElementById(\`agent-\${agentId}\`);
              if (agentElement) agentElement.classList.remove('active');
          }
          
          function generateCode(phase) {
              const codeSnippets = { 
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
                  '<span class="code-keyword">import</span> { <span class="code-variable">Analytics</span> } <span class="code-keyword">from</span> <span class="code-string">"/@segment/analytics-next"</span>>',
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
              };
              const lines = codeSnippets[phase];
              if (!lines) return;
              const codeContainer = document.getElementById('generatedCode');
              if (!codeContainer) return;
              lines.forEach((line, index) => {
                  setTimeout(() => {
                      const lineDiv = document.createElement('div');
                      lineDiv.className = 'code-line';
                      lineDiv.innerHTML = line || '&nbsp;';
                      lineDiv.style.animationDelay = \`\${index * 0.05}s\`;
                      codeContainer.appendChild(lineDiv);
                      codeContainer.scrollTop = codeContainer.scrollHeight;
                  }, index * 50);
              });
          }
          
          function showSuccess() {
              const codeDisplay = document.getElementById('codeDisplay');
              if(codeDisplay) codeDisplay.style.display = 'none';
              const progressContainer = document.getElementById('progressContainer');
              if(progressContainer) progressContainer.style.display = 'none';
              const agentGrid = document.getElementById('agentGrid');
              if(agentGrid) agentGrid.style.display = 'none';
              const successMessage = document.getElementById('successMessage');
              if(successMessage) successMessage.style.display = 'block';
              demoActive = false;
              const startDemoButton = document.getElementById('startDemo');
              if(startDemoButton) startDemoButton.disabled = false;
          }
        `}
      </Script>
    </div>
  )
}
