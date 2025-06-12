"use client"

import BravettoQuestModal from "../components/bravetto-quest-modal"
import { ThemeToggle } from "../components/theme-toggle"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
          Welcome to the Bravetto Quest Portal
        </h1>
        <p className="text-xl text-muted-foreground">Embark on your journey to join the elite. Click below to begin.</p>
      </div>
      <BravettoQuestModal />
      <footer className="absolute bottom-8 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Bravetto Inc. All rights reserved.</p>
        <p>Powered by Next.js, Tailwind CSS, and Framer Motion.</p>
      </footer>
    </div>
  )
}
