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
    // Live demo functionality can be added here
    console.log('Starting live demo...')
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
