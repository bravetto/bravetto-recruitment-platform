'use client'

import { useState } from 'react'
import { BravettoQuestModal } from '@/components/shared/Modal/BravettoQuestModal'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="relative">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-10 opacity-50">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`
                }}
              >
                <div className="w-2 h-2 bg-purple-400 rounded-full blur-sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                Bravetto
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              Join the elite team building the future of AI-powered development
            </p>

            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-semibold text-white">
                Are You Ready for the Challenge?
              </h2>
              <p className="text-lg text-gray-400">
                We're looking for exceptional developers who can push boundaries
              </p>
            </div>

            {/* Start Quest Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg text-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Start Your Quest
            </button>

            {/* Modal Component */}
            <BravettoQuestModal 
              isOpen={isModalOpen} 
              onClose={() => setIsModalOpen(false)} 
            />

            <div className="mt-12 text-sm text-gray-500">
              <p>© 2024 Bravetto Inc. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
