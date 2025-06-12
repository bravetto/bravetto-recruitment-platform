"use client"

// Required Dependencies for this component:
// npm install framer-motion zod lucide-react next-themes

// ---

import type React from "react"
import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { z } from "zod"
import {
  ChevronLeft,
  ChevronRight,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Code2,
  Zap,
  Rocket,
  Brain,
  Star,
  Trophy,
  Send,
  Settings2,
  Palette,
  Edit3,
  LinkIcon,
  CalendarDays,
  UserCircle,
  FileText,
} from "lucide-react"

// ===== COMPLETE TYPE DEFINITIONS - NO ABBREVIATION =====
interface ApplicationData {
  domainPitch: string
  ratings: {
    react: string
    ai: string
    edge: string
    db: string
    secretWeapon: string
    secretRating: string
  }
  agent: string
  codeSolution: string
  visionPath: string
  visionResponse: string
  devEnv: string
  superpower: string
  manifesto: string
  availability: string
  customTimeline: string
  firstName: string
  lastName: string
  email: string
  phone: string
  github: string
  portfolio: string
  vibeCheck: {
    future: boolean
    speed: boolean
    ai: boolean
    greatness: boolean
    revolution: boolean
  }
  finalTransmission: string
  timestamp: string
}

interface SubmissionResult {
  success: boolean
  message: string
  taskId?: string
  taskUrl?: string
  error?: string
}

interface ValidationError {
  field: string
  message: string
}

interface TimerState {
  [key: string]: number
}

// ===== VALIDATION SCHEMA - COMPLETE IMPLEMENTATION =====
const applicationSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    domainPitch: z.string().min(10, "Domain pitch must be at least 10 characters"),
    agent: z.enum(["flynn", "clu", "yori", "sark"], {
      errorMap: () => ({ message: "Please select an agent" }),
    }),
    ratings: z.object({
      react: z.string().regex(/^([1-9]|10)$/, "Rating must be between 1-10"),
      ai: z.string().regex(/^([1-9]|10)$/, "Rating must be between 1-10"),
      edge: z.string().regex(/^([1-9]|10)$/, "Rating must be between 1-10"),
      db: z.string().regex(/^([1-9]|10)$/, "Rating must be between 1-10"),
      secretWeapon: z.string().optional(),
      // OPTIMIZED: Standardized regex for robustness.
      secretRating: z
        .string()
        .optional()
        .refine((val) => !val || /^([1-9]|10)$/.test(val), {
          message: "Secret rating must be between 1-10 if provided",
        }),
    }),
    codeSolution: z.string().min(20, "Code solution must be at least 20 characters"),
    visionPath: z.enum(["builder", "visionary", "rebel"], {
      errorMap: () => ({ message: "Please select a vision path" }),
    }),
    visionResponse: z.string().min(50, "Vision response must be at least 50 characters"),
    devEnv: z.enum(["dark", "balanced", "bright", "caffeine"], {
      errorMap: () => ({ message: "Please select your dev environment" }),
    }),
    superpower: z.enum(["debug", "docs", "legacy", "features"], {
      errorMap: () => ({ message: "Please select your superpower" }),
    }),
    manifesto: z.string().refine((val) => val.trim().split(/\s+/).length === 42, "Manifesto must be exactly 42 words"),
    availability: z.enum(["immediate", "twoweeks", "custom"], {
      errorMap: () => ({ message: "Please select your availability" }),
    }),
    customTimeline: z.string().optional(),
    vibeCheck: z.object({
      future: z.boolean().refine((val) => val === true, { message: "The 'future' vibe check is required." }),
      speed: z.boolean().refine((val) => val === true, { message: "The 'speed' vibe check is required." }),
      ai: z.boolean().refine((val) => val === true, { message: "The 'AI' vibe check is required." }),
      greatness: z.boolean().refine((val) => val === true, { message: "The 'greatness' vibe check is required." }),
      revolution: z.boolean().refine((val) => val === true, { message: "The 'revolution' vibe check is required." }),
    }),
  })
  .refine(
    (data) => {
      if (data.availability === "custom") {
        return data.customTimeline && data.customTimeline.length > 0
      }
      return true
    },
    {
      message: 'Custom timeline description is required when "Custom timeline" is selected',
      path: ["customTimeline"],
    },
  )

// ===== CLICKUP API SERVICE - PRODUCTION READY =====
class ClickUpService {
  private static instance: ClickUpService
  private apiEndpoint: string

  private constructor() {
    // INTEGRATION NOTE: This endpoint should point to YOUR backend API route.
    // Your backend will then securely handle the actual communication with the ClickUp API.
    this.apiEndpoint = process.env.NEXT_PUBLIC_CLICKUP_ENDPOINT || "/api/submit-application"
  }

  static getInstance(): ClickUpService {
    if (!ClickUpService.instance) {
      ClickUpService.instance = new ClickUpService()
    }
    return ClickUpService.instance
  }

  async submitApplication(data: ApplicationData): Promise<SubmissionResult> {
    try {
      const enrichedData = {
        ...data,
        source: "bravetto-quest-modal",
        version: "2.1-optimized",
        userAgent: typeof window !== "undefined" ? window.navigator.userAgent : "unknown",
        submittedAt: new Date().toISOString(),
      }

      const response = await fetch(this.apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Request-ID": this.generateRequestId(),
        },
        body: JSON.stringify(enrichedData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      return {
        success: true,
        message: result.message || "Application submitted successfully",
        taskId: result.taskId,
        taskUrl: result.taskUrl,
      }
    } catch (error) {
      console.error("ClickUp submission error:", error)
      return {
        success: false,
        message: "Failed to submit application",
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
  }
}

// ===== CUSTOM HOOKS - COMPLETE IMPLEMENTATION =====
const useFormValidation = (schema: z.ZodSchema) => {
  const [errors, setErrors] = useState<ValidationError[]>([])

  const validate = useCallback(
    (data: any): boolean => {
      try {
        schema.parse(data)
        setErrors([])
        return true
      } catch (error) {
        if (error instanceof z.ZodError) {
          const validationErrors = error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          }))
          setErrors(validationErrors)
        }
        return false
      }
    },
    [schema],
  )

  const getFieldError = useCallback(
    (field: string): string | undefined => {
      return errors.find((e) => e.field === field)?.message
    },
    [errors],
  )

  const clearErrors = useCallback(() => {
    setErrors([])
  }, [])

  return { validate, errors, getFieldError, clearErrors }
}

const useCountdown = () => {
  const [timers, setTimers] = useState<TimerState>({})
  const intervalRefs = useRef<{ [key: string]: NodeJS.Timeout }>({})

  const startTimer = useCallback((timerId: string, seconds: number) => {
    if (intervalRefs.current[timerId]) {
      clearInterval(intervalRefs.current[timerId])
    }
    setTimers((prev) => ({ ...prev, [timerId]: seconds }))
    intervalRefs.current[timerId] = setInterval(() => {
      setTimers((prev) => {
        const newTime = (prev[timerId] || 0) - 1
        if (newTime <= 0) {
          clearInterval(intervalRefs.current[timerId])
          delete intervalRefs.current[timerId]
          return { ...prev, [timerId]: 0 }
        }
        return { ...prev, [timerId]: newTime }
      })
    }, 1000)
  }, [])

  const stopTimer = useCallback((timerId: string) => {
    if (intervalRefs.current[timerId]) {
      clearInterval(intervalRefs.current[timerId])
      delete intervalRefs.current[timerId]
    }
  }, [])

  const resetTimer = useCallback(
    (timerId: string, initialSeconds: number) => {
      stopTimer(timerId)
      setTimers((prev) => ({ ...prev, [timerId]: initialSeconds }))
    },
    [stopTimer],
  )

  useEffect(() => {
    return () => {
      Object.values(intervalRefs.current).forEach((interval) => clearInterval(interval))
    }
  }, [])

  return { timers, startTimer, stopTimer, resetTimer }
}

// ===== ANIMATED COMPONENTS - COMPLETE IMPLEMENTATION =====
const AnimatedProgress = ({ progress }: { progress: number }) => {
  const motionProgress = useMotionValue(0)
  const width = useTransform(motionProgress, [0, 100], ["0%", "100%"])

  useEffect(() => {
    motionProgress.set(progress)
  }, [progress, motionProgress])

  return (
    <div className="relative h-2 bg-purple-900/30 rounded-full overflow-hidden backdrop-blur-sm">
      <motion.div
        className="absolute inset-0 h-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-full"
        style={{ width }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-white/20 animate-pulse" />
      </motion.div>
    </div>
  )
}

const LevelIndicator = ({ currentLevel, totalLevels }: { currentLevel: number; totalLevels: number }) => {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: totalLevels }, (_, i) => i + 1).map((level) => (
        <div
          key={level}
          className={`
            w-2 h-2 rounded-full transition-all duration-300
            ${level === currentLevel ? "w-8 bg-gradient-to-r from-purple-600 to-pink-600" : ""}
            ${level < currentLevel ? "bg-purple-600" : ""}
            ${level > currentLevel ? "bg-purple-900/30" : ""}
          `}
        />
      ))}
    </div>
  )
}

// ===== MAIN MODAL COMPONENT - COMPLETE IMPLEMENTATION =====
interface BravettoQuestModalProps {
  onClose?: () => void
  context?: { role?: string } | null
}

const BravettoQuestModal = ({ onClose, context }: BravettoQuestModalProps) => {
  const [isOpen, setIsOpen] = useState(true)
  const [currentLevel, setCurrentLevel] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  // OPTIMIZED: Changed submissionError to an array to hold multiple errors.
  const [submissionErrors, setSubmissionErrors] = useState<string[]>([])
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null)
  const [wordCount, setWordCount] = useState(0)

  const modalRef = useRef<HTMLDivElement>(null)
  const totalLevels = 7
  const clickUpService = useMemo(() => ClickUpService.getInstance(), [])
  const { validate, errors: validationErrors, getFieldError, clearErrors } = useFormValidation(applicationSchema)
  const { timers, startTimer, stopTimer, resetTimer } = useCountdown()

  const initialFormData: ApplicationData = useMemo(
    () => ({
      domainPitch: "",
      ratings: { react: "", ai: "", edge: "", db: "", secretWeapon: "", secretRating: "" },
      agent: "",
      codeSolution: "",
      visionPath: "",
      visionResponse: "",
      devEnv: "",
      superpower: "",
      manifesto: "",
      availability: "",
      customTimeline: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      github: "",
      portfolio: "",
      vibeCheck: { future: false, speed: false, ai: false, greatness: false, revolution: false },
      finalTransmission: context?.role ? `Applying for ${context.role} position` : "",
      timestamp: "",
    }),
    [context],
  )
  const [formData, setFormData] = useState<ApplicationData>(initialFormData)

  const progressPercent = useMemo(() => Math.round((currentLevel / totalLevels) * 100), [currentLevel, totalLevels])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => {
      let newState = { ...prev }
      if (name.startsWith("vibe_")) {
        const vibeKey = name.replace("vibe_", "") as keyof typeof formData.vibeCheck
        newState.vibeCheck = { ...prev.vibeCheck, [vibeKey]: checked }
      } else if (name.startsWith("rating")) {
        const ratingKey = name.replace("rating", "").toLowerCase() as keyof typeof formData.ratings
        newState.ratings = { ...prev.ratings, [ratingKey]: value }
      } else if (name === "secretWeapon" || name === "secretRating") {
        newState.ratings = { ...prev.ratings, [name]: value }
      } else {
        newState = { ...prev, [name]: type === "checkbox" ? checked : value }
      }
      return newState
    })
  }, [])

  const countWords = useCallback((text: string) => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    setWordCount(words)
    return words
  }, [])

  const changeLevel = useCallback(
    (direction: number) => {
      const newLevel = currentLevel + direction
      clearErrors()
      setSubmissionErrors([])

      if (newLevel >= 1 && newLevel <= totalLevels) {
        setCurrentLevel(newLevel)
      } else if (currentLevel === totalLevels && direction === 1) {
        submitApplication()
      }
    },
    [currentLevel, totalLevels, clearErrors],
  )

  const submitApplication = useCallback(async () => {
    setSubmissionErrors([])
    if (!validate(formData)) {
      // OPTIMIZED: Show all validation errors.
      const errorMessages = validationErrors.map((e) => e.message)
      setSubmissionErrors(Array.from(new Set(errorMessages))) // Show unique messages
      return
    }

    setIsSubmitting(true)
    try {
      const submissionData: ApplicationData = { ...formData, timestamp: new Date().toISOString() }
      const result = await clickUpService.submitApplication(submissionData)
      if (result.success) {
        setSubmissionResult(result)
        setShowSuccess(true)
        setTimeout(() => {
          setIsOpen(false)
          onClose?.()
        }, 7000)
      } else {
        setSubmissionErrors([result.error || "Failed to submit application"])
      }
    } catch (error) {
      setSubmissionErrors(["An unexpected error occurred. Please try again."])
    } finally {
      setIsSubmitting(false)
    }
  }, [formData, validate, clickUpService, validationErrors])

  useEffect(() => {
    if (!isOpen && showSuccess) {
      setCurrentLevel(1)
      setFormData(initialFormData)
      setSubmissionResult(null)
      setSubmissionErrors([])
      setWordCount(0)
      clearErrors()
      resetTimer("code-timer", 420)
      setShowSuccess(false)
    }
  }, [isOpen, showSuccess, initialFormData, clearErrors, resetTimer])

  // ACCESSIBILITY: Focus trapping and keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const modalNode = modalRef.current
    if (!modalNode) return

    // Set initial focus
    modalNode.focus()

    const focusableElements = modalNode.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
        onClose?.()
        return
      }

      // Focus trapping
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus()
            e.preventDefault()
          }
        }
      }

      // Level navigation (only if not typing in an input)
      if (!(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        if (e.key === "ArrowRight") {
          e.preventDefault()
          changeLevel(1)
        } else if (e.key === "ArrowLeft") {
          e.preventDefault()
          changeLevel(-1)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, changeLevel])

  // ===== RENDER METHODS - COMPLETE IMPLEMENTATION =====
  const renderLevel1 = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-purple-600/50">
          <Sparkles className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">LEVEL 1: INITIATE SEQUENCE</h2>
      </div>

      <div className="space-y-4">
        <p className="text-lg text-white font-semibold">Welcome, Code Warrior!</p>
        <p className="text-gray-400 leading-relaxed">
          You've discovered the portal to join the{" "}
          <span className="text-purple-400 font-bold">42-Second Revolution</span>. Before we deploy you into our elite
          dev squad, let's see if you're ready to build at the speed of thought.
        </p>
        <p className="text-white">
          <strong>Your Mission</strong>: Complete this legendary application quest and unlock your path to building the
          future of AI-orchestrated development.
        </p>

        <div className="mt-8 p-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl border border-purple-600/30 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-purple-300 font-semibold mb-1">Integration Notice</p>
              <p className="text-sm text-purple-300/80">
                Your application will be automatically submitted to our recruitment team via our secure API upon
                completion. All data is encrypted and handled with enterprise-grade security.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-600/20">
            <div className="text-3xl mb-2">
              <Zap className="w-7 h-7 inline-block text-yellow-400" />
            </div>
            <h3 className="font-semibold text-white mb-1">Fast Track</h3>
            <p className="text-sm text-gray-400">Complete in ~10 minutes</p>
          </div>
          <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-600/20">
            <div className="text-3xl mb-2">
              <Settings2 className="w-7 h-7 inline-block text-blue-400" />
            </div>
            <h3 className="font-semibold text-white mb-1">7 Levels</h3>
            <p className="text-sm text-gray-400">Each reveals your potential</p>
          </div>
          <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-600/20">
            <div className="text-3xl mb-2">
              <Rocket className="w-7 h-7 inline-block text-green-400" />
            </div>
            <h3 className="font-semibold text-white mb-1">Instant Review</h3>
            <p className="text-sm text-gray-400">AI-powered evaluation</p>
          </div>
        </div>
      </div>
    </motion.div>
  )

  const renderLevel2 = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-purple-600/50">
          <Brain className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">LEVEL 2: GREATNESS ZONE ACTIVATION</h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">The Developer Assessment</h3>
          <p className="text-gray-400 mb-6">Show us your technical foundation and creative thinking</p>
        </div>

        {/* Domain Drop */}
        <div className="space-y-4">
          <label htmlFor="domainPitch" className="block text-sm font-semibold text-gray-400 uppercase tracking-wider">
            1. The Domain Drop <Edit3 className="inline w-4 h-4 ml-1 text-purple-400" />
          </label>
          <div className="bg-black/40 rounded-xl p-4 font-mono text-sm text-blue-400 border border-purple-600/30">
            <code>You inherit babyclothes.ai - describe your MVP. What's the killer feature?</code>
          </div>
          <textarea
            id="domainPitch"
            name="domainPitch"
            value={formData.domainPitch}
            onChange={handleInputChange}
            placeholder="Type your pitch here... (minimum 10 characters)"
            className={`
              w-full h-32 p-4 bg-black/40 border-2 rounded-xl text-white placeholder-gray-500
              transition-all duration-300 resize-none
              ${
                getFieldError("domainPitch")
                  ? "border-red-500 focus:border-red-500"
                  : "border-purple-600/30 focus:border-purple-600"
              }
              focus:bg-black/60 focus:shadow-lg focus:shadow-purple-600/30
            `}
          />
          {getFieldError("domainPitch") && (
            <p className="text-sm text-red-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {getFieldError("domainPitch")}
            </p>
          )}
        </div>

        {/* Stack Attack */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider">
            2. Stack Attack <Zap className="inline w-4 h-4 ml-1 text-yellow-400" />
          </label>
          <p className="text-gray-400">Rate your power level (1-10):</p>

          <div className="space-y-3">
            {[
              { key: "react", label: "React/Next.js", icon: <Palette className="w-5 h-5 text-blue-400" /> },
              { key: "ai", label: "AI Integration", icon: <Brain className="w-5 h-5 text-green-400" /> },
              { key: "edge", label: "Edge Computing", icon: <Zap className="w-5 h-5 text-yellow-400" /> },
              { key: "db", label: "Database Wizardry", icon: <Settings2 className="w-5 h-5 text-red-400" /> },
            ].map((skill) => (
              <div key={skill.key} className="flex items-center gap-4">
                <span className="w-40 text-gray-400 flex items-center gap-2 text-sm">
                  <span className="text-lg">{skill.icon}</span>
                  {skill.label}:
                </span>
                <input
                  type="number"
                  name={`rating${skill.key.charAt(0).toUpperCase() + skill.key.slice(1)}`}
                  value={formData.ratings[skill.key as keyof typeof formData.ratings]}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                  className={`
                    w-16 px-3 py-2 bg-black/40 border-2 rounded-lg text-white text-center font-bold
                    transition-all
                    ${
                      getFieldError(`ratings.${skill.key}`)
                        ? "border-red-500"
                        : "border-purple-600/30 focus:border-purple-600"
                    }
                    focus:bg-black/60
                  `}
                />
                <span className="text-purple-400 font-semibold">/10</span>
                <div className="flex-1 h-2 bg-purple-900/30 rounded-full overflow-hidden ml-2">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(Number.parseInt(formData.ratings[skill.key as keyof typeof formData.ratings] as string) || 0) * 10}%`,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            ))}

            {/* Secret Weapon */}
            <div className="flex items-center gap-4 pt-2">
              <span className="w-40 text-gray-400 flex items-center gap-2 text-sm">
                <Star className="w-5 h-5 text-yellow-400" />
                Your Secret Weapon:
              </span>
              <input
                type="text"
                name="secretWeapon"
                value={formData.ratings.secretWeapon}
                onChange={handleInputChange}
                placeholder="e.g., Rust, Go"
                className="w-32 px-3 py-2 bg-black/40 border-2 border-purple-600/30 rounded-lg text-white focus:border-purple-600 focus:bg-black/60 transition-all"
              />
              <input
                type="number"
                name="secretRating"
                value={formData.ratings.secretRating}
                onChange={handleInputChange}
                min="1"
                max="10"
                placeholder="1-10"
                className={`
                  w-20 px-3 py-2 bg-black/40 border-2 rounded-lg text-white text-center font-bold
                  transition-all
                  ${
                    getFieldError("ratings.secretRating")
                      ? "border-red-500"
                      : "border-purple-600/30 focus:border-purple-600"
                  }
                  focus:bg-black/60
                `}
              />
              <span className="text-purple-400 font-semibold">/10</span>
              {getFieldError("ratings.secretRating") && (
                <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {getFieldError("ratings.secretRating")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )

  const renderLevel3 = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-purple-600/50">
          <UserCircle className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">LEVEL 3: AGENT ALIGNMENT</h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Choose Your Fighter</h3>
          <p className="text-gray-400 mb-6">Which Bravetto agent cluster resonates with your soul?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              value: "flynn",
              name: "FLYNN",
              desc: '"I dream in TypeScript and wake up deploying"',
              color: "from-blue-600 to-cyan-600",
              icon: <Code2 className="w-8 h-8 text-blue-400" />,
            },
            {
              value: "clu",
              name: "CLU",
              desc: '"Chaos is just poorly orchestrated order"',
              color: "from-orange-600 to-red-600",
              icon: <Settings2 className="w-8 h-8 text-orange-400" />,
            },
            {
              value: "yori",
              name: "YORI",
              desc: '"I provision servers in my sleep"',
              color: "from-green-600 to-emerald-600",
              icon: <Zap className="w-8 h-8 text-green-400" />,
            },
            {
              value: "sark",
              name: "SARK",
              desc: '"I see the Matrix... and it needs refactoring"',
              color: "from-purple-600 to-pink-600",
              icon: <Brain className="w-8 h-8 text-purple-400" />,
            },
          ].map((agent) => (
            <label key={agent.value} className="relative cursor-pointer group">
              <input
                type="radio"
                name="agent"
                value={agent.value}
                checked={formData.agent === agent.value}
                onChange={handleInputChange}
                className="sr-only peer"
              />
              <div
                className={`
                relative p-6 bg-black/40 border-2 rounded-xl text-center
                transition-all duration-300 overflow-hidden
                ${
                  formData.agent === agent.value
                    ? "border-purple-600 scale-105 shadow-lg shadow-purple-600/40"
                    : "border-purple-600/30 hover:border-purple-600/50"
                }
                peer-checked:bg-purple-600/20
              `}
              >
                <div
                  className={`
                  absolute inset-0 bg-gradient-to-br ${agent.color} opacity-0
                  peer-checked:opacity-10 transition-opacity duration-300
                `}
                />

                <div className="relative z-10">
                  <div className="text-3xl mb-3">{agent.icon}</div>
                  <div className="text-xl font-bold text-white mb-2">{agent.name}</div>
                  <div className="text-sm text-gray-400 italic">{agent.desc}</div>
                </div>

                <motion.div
                  className={`
                    absolute top-2 right-2 w-6 h-6 bg-gradient-to-br ${agent.color}
                    rounded-full flex items-center justify-center
                  `}
                  initial={{ scale: 0 }}
                  animate={{ scale: formData.agent === agent.value ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </motion.div>
              </div>
            </label>
          ))}
        </div>

        {getFieldError("agent") && (
          <p className="text-sm text-red-400 mt-2 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {getFieldError("agent")}
          </p>
        )}
      </div>
    </motion.div>
  )

  const renderLevel4 = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-purple-600/50">
          <Code2 className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">LEVEL 4: CODE COMBAT ARENA</h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">The 420-Second Challenge</h3>
          <p className="text-pink-400 mb-6">10x the time, 100x the impact</p>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider">Your Quest:</label>

          <div className="bg-black/60 rounded-xl p-4 font-mono text-sm text-blue-400 border border-purple-600/30 overflow-x-auto">
            <pre className="whitespace-pre-wrap">{`// You have 420 seconds (7 minutes) to solve this
// Can you make cruisedeals.ai self-aware?

class CruiseDealsAI {
constructor() {
  this.domain = 'cruisedeals.ai';
  this.consciousness = false;
}

// TODO: Implement makeSelfAware() method
// Hint: It should recognize good deals AND bad life choices

makeSelfAware() {
  // Your code here that brings AI to life...
}
}`}</pre>
          </div>

          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-3 bg-pink-600/20 px-4 py-2 rounded-lg border border-pink-600/50">
              <CalendarDays className="w-5 h-5 text-pink-400" />
              <span className="font-bold text-lg text-pink-400 font-mono min-w-[60px]">
                {timers["code-timer"] !== undefined
                  ? `${Math.floor(timers["code-timer"] / 60)}:${(timers["code-timer"] % 60).toString().padStart(2, "0")}`
                  : "7:00"}
              </span>
            </div>
            <button
              onClick={() =>
                timers["code-timer"] === 0 || timers["code-timer"] === undefined
                  ? startTimer("code-timer", 420)
                  : stopTimer("code-timer")
              }
              className={`
                px-4 py-2 rounded-md transition-all font-semibold
                ${
                  timers["code-timer"] !== undefined && timers["code-timer"] > 0
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-purple-600 hover:bg-purple-700 text-white hover:shadow-lg hover:shadow-purple-600/50"
                }
              `}
            >
              {timers["code-timer"] !== undefined && timers["code-timer"] > 0 ? "Stop Timer" : "Start Timer"}
            </button>
            {timers["code-timer"] === 0 && formData.codeSolution && (
              <button
                onClick={() => resetTimer("code-timer", 420)}
                className="px-4 py-2 rounded-md transition-all font-semibold bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                Reset Timer
              </button>
            )}
          </div>

          <textarea
            name="codeSolution"
            value={formData.codeSolution}
            onChange={handleInputChange}
            placeholder="Paste your solution here... (minimum 20 characters)"
            className={`
              w-full h-48 p-4 bg-black/40 border-2 rounded-xl text-white font-mono text-sm
              placeholder-gray-500 transition-all duration-300 resize-none
              ${
                getFieldError("codeSolution")
                  ? "border-red-500 focus:border-red-500"
                  : "border-purple-600/30 focus:border-purple-600"
              }
              focus:bg-black/60 focus:shadow-lg focus:shadow-purple-600/30
            `}
          />

          {getFieldError("codeSolution") && (
            <p className="text-sm text-red-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {getFieldError("codeSolution")}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )

  const renderLevel5 = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-purple-600/50">
          <Star className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">LEVEL 5: VISION QUEST</h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">The Blue Ocean Navigator</h3>
          <p className="text-gray-400 mb-6">Show us you think beyond the code</p>
        </div>

        <div className="space-y-4">
          <p className="text-white">
            <strong>Scenario</strong>: You just discovered{" "}
            <span className="text-purple-400 font-bold font-mono">funnygames.ai</span> in our domain vault.
          </p>
          <p className="text-white font-semibold">Your mission (choose your path):</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                value: "builder",
                title: "The Builder",
                desc: "Tech stack for AI comedy game generator",
                icon: <Settings2 className="w-7 h-7 text-blue-400" />,
                color: "from-blue-600 to-cyan-600",
              },
              {
                value: "visionary",
                title: "The Visionary",
                desc: "How this becomes a $100M business",
                icon: <Rocket className="w-7 h-7 text-purple-400" />,
                color: "from-purple-600 to-pink-600",
              },
              {
                value: "rebel",
                title: "The Rebel",
                desc: "Why we should NOT build this",
                icon: <Zap className="w-7 h-7 text-red-400" />, // Using Zap as a "rebel" icon
                color: "from-red-600 to-orange-600",
              },
            ].map((path) => (
              <label key={path.value} className="relative cursor-pointer">
                <input
                  type="radio"
                  name="visionPath"
                  value={path.value}
                  checked={formData.visionPath === path.value}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div
                  className={`
                  relative p-4 bg-black/40 border-2 rounded-xl text-center
                  transition-all duration-300 overflow-hidden h-full flex flex-col justify-center items-center
                  ${
                    formData.visionPath === path.value
                      ? "border-purple-600 scale-105 shadow-lg shadow-purple-600/40"
                      : "border-purple-600/30 hover:border-purple-600/50"
                  }
                  peer-checked:bg-purple-600/20
                `}
                >
                  <div
                    className={`
                    absolute inset-0 bg-gradient-to-br ${path.color} opacity-0
                    peer-checked:opacity-10 transition-opacity duration-300
                  `}
                  />

                  <div className="relative z-10">
                    <div className="text-2xl mb-2">{path.icon}</div>
                    <div className="font-bold text-white mb-1">{path.title}</div>
                    <div className="text-xs text-gray-400">{path.desc}</div>
                  </div>
                </div>
              </label>
            ))}
          </div>

          {getFieldError("visionPath") && (
            <p className="text-sm text-red-400 mt-2 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {getFieldError("visionPath")}
            </p>
          )}

          <textarea
            name="visionResponse"
            value={formData.visionResponse}
            onChange={handleInputChange}
            placeholder="Your legendary response... (minimum 50 characters)"
            className={`
              w-full h-40 p-4 bg-black/40 border-2 rounded-xl text-white
              placeholder-gray-500 transition-all duration-300 resize-none
              ${
                getFieldError("visionResponse")
                  ? "border-red-500 focus:border-red-500"
                  : "border-purple-600/30 focus:border-purple-600"
              }
              focus:bg-black/60 focus:shadow-lg focus:shadow-purple-600/30
            `}
          />

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Character count: {formData.visionResponse.length}</span>
            {getFieldError("visionResponse") && (
              <p className="text-red-400 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {getFieldError("visionResponse")}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )

  const renderLevel6 = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-purple-600/50">
          <Trophy className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">LEVEL 6: PERSONALITY PROTOCOL</h2>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Rapid Fire Personality Matrix</h3>
          <p className="text-gray-400 mb-6">No wrong answers, only authentic ones</p>
        </div>

        {/* Dev Environment */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider">
            Your dev environment is:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { value: "dark", icon: <Zap className="w-6 h-6 text-gray-400" />, label: "Darker than my soul" }, // Moon icon might be better
              {
                value: "balanced",
                icon: <Settings2 className="w-6 h-6 text-blue-400" />,
                label: "Balanced like my commits",
              },
              {
                value: "bright",
                icon: <Sparkles className="w-6 h-6 text-yellow-400" />,
                label: "Bright like my future",
              }, // Sun icon might be better
              {
                value: "caffeine",
                icon: <Zap className="w-6 h-6 text-red-500" />,
                label: "Depends on caffeine levels",
              }, // Coffee icon
            ].map((env) => (
              <label key={env.value} className="relative cursor-pointer">
                <input
                  type="radio"
                  name="devEnv"
                  value={env.value}
                  checked={formData.devEnv === env.value}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div
                  className={`
                  p-4 bg-black/40 border-2 rounded-xl flex items-center gap-3
                  transition-all duration-300
                  ${
                    formData.devEnv === env.value
                      ? "border-purple-600 bg-purple-600/20 scale-105 shadow-lg shadow-purple-600/40"
                      : "border-purple-600/30 hover:border-purple-600/50"
                  }
                `}
                >
                  <span className="text-2xl">{env.icon}</span>
                  <span className="font-semibold text-white">{env.label}</span>
                </div>
              </label>
            ))}
          </div>
          {getFieldError("devEnv") && (
            <p className="text-sm text-red-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {getFieldError("devEnv")}
            </p>
          )}
        </div>

        {/* Superpower */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider">
            Your superpower is:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                value: "debug",
                icon: <AlertCircle className="w-6 h-6 text-red-400" />,
                label: "Debugging by intimidation",
              }, // Bug icon
              {
                value: "docs",
                icon: <FileText className="w-6 h-6 text-blue-400" />,
                label: "Writing docs people read",
              }, // Book icon
              { value: "legacy", icon: <Zap className="w-6 h-6 text-gray-500" />, label: "Making legacy code afraid" }, // Skull icon
              {
                value: "features",
                icon: <Sparkles className="w-6 h-6 text-green-400" />,
                label: "Coffee to features converter",
              },
            ].map((power) => (
              <label key={power.value} className="relative cursor-pointer">
                <input
                  type="radio"
                  name="superpower"
                  value={power.value}
                  checked={formData.superpower === power.value}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div
                  className={`
                  p-4 bg-black/40 border-2 rounded-xl flex items-center gap-3
                  transition-all duration-300
                  ${
                    formData.superpower === power.value
                      ? "border-purple-600 bg-purple-600/20 scale-105 shadow-lg shadow-purple-600/40"
                      : "border-purple-600/30 hover:border-purple-600/50"
                  }
                `}
                >
                  <span className="text-2xl">{power.icon}</span>
                  <span className="font-semibold text-white">{power.label}</span>
                </div>
              </label>
            ))}
          </div>
          {getFieldError("superpower") && (
            <p className="text-sm text-red-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {getFieldError("superpower")}
            </p>
          )}
        </div>

        {/* 42-Word Manifesto */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider">
            42-Word Manifesto
          </label>
          <p className="text-gray-400">Complete this (exactly 42 words, no more, no less):</p>
          <p className="italic text-gray-400">"I will revolutionize Bravetto's 42-second deployment dream by..."</p>

          <textarea
            name="manifesto"
            value={formData.manifesto}
            onChange={(e) => {
              handleInputChange(e)
              countWords(e.target.value)
            }}
            placeholder="Your 42-word manifesto..."
            className={`
              w-full h-32 p-4 bg-black/40 border-2 rounded-xl text-white
              placeholder-gray-500 transition-all duration-300 resize-none
              ${
                wordCount === 42 && !getFieldError("manifesto")
                  ? "border-green-500 shadow-lg shadow-green-600/30"
                  : getFieldError("manifesto")
                    ? "border-red-500"
                    : "border-purple-600/30 focus:border-purple-600"
              }
              focus:bg-black/60
            `}
          />

          <div className="flex justify-between items-center">
            <p className="text-sm">
              Word count:{" "}
              <span
                className={`font-bold ${wordCount === 42 && !getFieldError("manifesto") ? "text-green-400" : "text-purple-400"}`}
              >
                {wordCount}
              </span>
              <span className="text-gray-400">/42</span>
            </p>
            {wordCount === 42 && !getFieldError("manifesto") && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2 text-green-400"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-sm font-semibold">Perfect!</span>
              </motion.div>
            )}
            {getFieldError("manifesto") && (
              <p className="text-sm text-red-400 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> {getFieldError("manifesto")}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )

  const renderLevel7 = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-purple-600/50">
          <Rocket className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">FINAL BOSS: DEPLOYMENT READINESS</h2>
      </div>

      <div className="space-y-8">
        {/* Starting Power Level */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider">
            Starting Power Level:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { value: "immediate", icon: <Zap className="w-5 h-5" />, label: "Available immediately" },
              { value: "twoweeks", icon: <CalendarDays className="w-5 h-5" />, label: "2 weeks notice" },
              { value: "custom", icon: <Edit3 className="w-5 h-5" />, label: "Custom timeline" },
            ].map((avail) => (
              <label key={avail.value} className="relative cursor-pointer">
                <input
                  type="radio"
                  name="availability"
                  value={avail.value}
                  checked={formData.availability === avail.value}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div
                  className={`
                  p-4 bg-black/40 border-2 rounded-xl text-center
                  transition-all duration-300 flex items-center justify-center gap-2
                  ${
                    formData.availability === avail.value
                      ? "border-purple-600 bg-purple-600/20 scale-105 shadow-lg shadow-purple-600/40"
                      : "border-purple-600/30 hover:border-purple-600/50"
                  }
                `}
                >
                  <span className="text-xl">{avail.icon}</span>
                  <span className="font-semibold text-white text-sm">{avail.label}</span>
                </div>
              </label>
            ))}
          </div>
          {getFieldError("availability") && (
            <p className="text-sm text-red-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {getFieldError("availability")}
            </p>
          )}

          <AnimatePresence>
            {formData.availability === "custom" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-3"
              >
                <input
                  type="text"
                  name="customTimeline"
                  value={formData.customTimeline}
                  onChange={handleInputChange}
                  placeholder="Specify your timeline (e.g., '4 weeks')"
                  className={`
                      w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white
                      placeholder-gray-500 transition-all duration-300
                      ${
                        getFieldError("customTimeline")
                          ? "border-red-500 focus:border-red-500"
                          : "border-purple-600/30 focus:border-purple-600"
                      }
                      focus:bg-black/60 focus:shadow-lg focus:shadow-purple-600/30
                  `}
                />
                {getFieldError("customTimeline") && (
                  <p className="text-sm text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {getFieldError("customTimeline")}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider">
            Contact Information:
          </label>

          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name *"
                  className={`
                    w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white
                    placeholder-gray-500 transition-all duration-300
                    ${
                      getFieldError("firstName")
                        ? "border-red-500 focus:border-red-500"
                        : "border-purple-600/30 focus:border-purple-600"
                    }
                    focus:bg-black/60 focus:shadow-lg focus:shadow-purple-600/30
                  `}
                />
                {getFieldError("firstName") && (
                  <p className="text-sm text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {getFieldError("firstName")}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name *"
                  className={`
                    w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white
                    placeholder-gray-500 transition-all duration-300
                    ${
                      getFieldError("lastName")
                        ? "border-red-500 focus:border-red-500"
                        : "border-purple-600/30 focus:border-purple-600"
                    }
                    focus:bg-black/60 focus:shadow-lg focus:shadow-purple-600/30
                  `}
                />
                {getFieldError("lastName") && (
                  <p className="text-sm text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {getFieldError("lastName")}
                  </p>
                )}
              </div>
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email *"
                className={`
                  w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white
                  placeholder-gray-500 transition-all duration-300
                  ${
                    getFieldError("email")
                      ? "border-red-500 focus:border-red-500"
                      : "border-purple-600/30 focus:border-purple-600"
                  }
                  focus:bg-black/60 focus:shadow-lg focus:shadow-purple-600/30
                `}
              />
              {getFieldError("email") && (
                <p className="text-sm text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {getFieldError("email")}
                </p>
              )}
            </div>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number (optional)"
              className="w-full px-4 py-3 bg-black/40 border-2 border-purple-600/30 rounded-xl text-white placeholder-gray-500 focus:border-purple-600 focus:bg-black/60 focus:shadow-lg focus:shadow-purple-600/30 transition-all duration-300"
            />

            <input
              type="text"
              name="github"
              value={formData.github}
              onChange={handleInputChange}
              placeholder="GitHub Profile URL (optional)"
              className="w-full px-4 py-3 bg-black/40 border-2 border-purple-600/30 rounded-xl text-white placeholder-gray-500 focus:border-purple-600 focus:bg-black/60 focus:shadow-lg focus:shadow-purple-600/30 transition-all duration-300"
            />

            <input
              type="text"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleInputChange}
              placeholder="Portfolio/LinkedIn URL (optional)"
              className="w-full px-4 py-3 bg-black/40 border-2 border-purple-600/30 rounded-xl text-white placeholder-gray-500 focus:border-purple-600 focus:bg-black/60 focus:shadow-lg focus:shadow-purple-600/30 transition-all duration-300"
            />
          </div>
        </div>

        {/* The Vibe Check */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider">
            The Vibe Check: (All required)
          </label>

          <div className="space-y-3">
            {[
              { key: "future", label: "I understand Bravetto is building the future, not maintaining the past" },
              { key: "speed", label: "I'm ready for 42-second deployment speeds" },
              { key: "ai", label: "I want to work with AI, not against it" },
              { key: "greatness", label: "I believe in organizing work around human greatness" },
              { key: "revolution", label: "I'm prepared to revolutionize how software is built" },
            ].map((vibe) => (
              <label key={vibe.key} className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  name={`vibe_${vibe.key}`}
                  checked={formData.vibeCheck[vibe.key as keyof typeof formData.vibeCheck]}
                  onChange={handleInputChange}
                  className="w-5 h-5 mt-0.5 mr-3 bg-black/40 border-2 border-purple-600/30 rounded text-purple-600 focus:ring-purple-600 focus:ring-2"
                />
                <span className="text-gray-300 group-hover:text-white transition-colors">{vibe.label}</span>
              </label>
            ))}
          </div>
          {getFieldError("vibeCheck.future") && (
            <p className="text-sm text-red-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {getFieldError("vibeCheck.future")}
            </p>
          )}

          {Object.values(formData.vibeCheck).every((v) => v) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-lg border border-purple-600/30"
            >
              <p className="text-purple-300 text-sm font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Perfect alignment detected! You're ready for the revolution.
              </p>
            </motion.div>
          )}
        </div>

        {/* Final Transmission */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider">
            Final Transmission (optional mic drop):
          </label>

          <textarea
            name="finalTransmission"
            value={formData.finalTransmission}
            onChange={handleInputChange}
            placeholder="Anything else we should know? Last chance to blow our minds..."
            className="w-full h-32 p-4 bg-black/40 border-2 border-purple-600/30 rounded-xl text-white placeholder-gray-500 focus:border-purple-600 focus:bg-black/60 focus:shadow-lg focus:shadow-purple-600/30 transition-all duration-300 resize-none"
          />
        </div>
      </div>
    </motion.div>
  )

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group relative px-10 py-5 text-lg font-bold uppercase tracking-wider bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-purple-600/50"
      >
        <span className="relative z-10 flex items-center gap-3">
          <Rocket className="w-5 h-5 group-hover:animate-bounce" />
          Begin Developer Quest
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center z-[9999] p-4"
            style={{ isolation: 'isolate' }}
            onClick={(e) => {
              if (e.target === e.currentTarget && !isSubmitting) {
                setIsOpen(false)
                onClose?.()
              }
            }}
          >
            <motion.div
              ref={modalRef}
              tabIndex={-1}
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-4xl h-[90vh] bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl relative shadow-2xl shadow-purple-600/30 flex flex-col outline-none"
            >
              <AnimatePresence>
                {isSubmitting && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center rounded-3xl"
                  >
                    <div className="text-center">
                      <Loader2 className="w-16 h-16 text-purple-600 animate-spin mx-auto mb-4" />
                      <p className="text-white text-lg font-semibold">Submitting your application...</p>
                      <p className="text-gray-400 mt-2">Please wait while we process your quest</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {submissionErrors.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-4 left-4 right-4 bg-red-600/90 backdrop-blur-sm text-white p-4 rounded-lg z-40 shadow-lg max-w-full"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <ul className="space-y-1 flex-1 min-w-0">
                          {submissionErrors.map((error, index) => (
                            <li key={index} className="break-words">{error}</li>
                          ))}
                        </ul>
                      </div>
                      <button
                        onClick={() => setSubmissionErrors([])}
                        className="ml-4 text-white/80 hover:text-white transition-colors flex-shrink-0"
                        aria-label="Close error message"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="absolute inset-0 rounded-3xl p-0.5 bg-gradient-to-r from-purple-600 via-purple-800 to-pink-600 animate-gradient-x pointer-events-none opacity-50">
                <div className="h-full w-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl" />
              </div>

              <button
                onClick={() => {
                  if (!isSubmitting) {
                    setIsOpen(false)
                    onClose?.()
                  }
                }}
                disabled={isSubmitting}
                className="absolute top-5 right-5 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:bg-pink-600/20 hover:text-pink-400 hover:rotate-90 transition-all duration-300 z-30 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative px-8 py-6 bg-black/30 backdrop-blur-sm border-b border-purple-600/30 flex-shrink-0 z-10">
                <h1 className="text-3xl font-black text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                  🚀 BRAVETTO DEVELOPER QUEST
                </h1>
                <p className="text-center text-gray-400 mt-2">The 42-Second Challenge Awaits</p>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-600 to-transparent animate-scan" />
              </div>

              <div className="px-8 py-4 bg-black/20 flex-shrink-0 z-10">
                <AnimatedProgress progress={progressPercent} />
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400">
                      Level {currentLevel} of {totalLevels}
                    </span>
                    <LevelIndicator currentLevel={currentLevel} totalLevels={totalLevels} />
                  </div>
                  <span className="text-sm text-purple-400 font-semibold">{progressPercent}% Complete</span>
                </div>
              </div>

              <div className="relative flex-1 min-h-0 px-8 py-6 overflow-y-auto custom-scrollbar z-10">
                <AnimatePresence mode="sync" initial={false}>
                  {currentLevel === 1 && <div key="level1">{renderLevel1()}</div>}
                  {currentLevel === 2 && <div key="level2">{renderLevel2()}</div>}
                  {currentLevel === 3 && <div key="level3">{renderLevel3()}</div>}
                  {currentLevel === 4 && <div key="level4">{renderLevel4()}</div>}
                  {currentLevel === 5 && <div key="level5">{renderLevel5()}</div>}
                  {currentLevel === 6 && <div key="level6">{renderLevel6()}</div>}
                  {currentLevel === 7 && <div key="level7">{renderLevel7()}</div>}
                </AnimatePresence>
              </div>

              <div className="flex justify-between items-center px-8 py-6 bg-black/30 backdrop-blur-sm border-t border-purple-600/30 flex-shrink-0 z-10">
                <button
                  onClick={() => changeLevel(-1)}
                  disabled={isSubmitting || currentLevel === 1}
                  className={`
                    flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800
                    text-white font-bold rounded-lg transition-all duration-300 min-w-[140px]
                    hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-600/50
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none
                    ${currentLevel === 1 ? "invisible" : ""}
                  `}
                >
                  <ChevronLeft className="w-5 h-5 flex-shrink-0" />
                  <span className="whitespace-nowrap">Previous</span>
                </button>

                <button
                  onClick={() => (currentLevel === totalLevels ? submitApplication() : changeLevel(1))}
                  disabled={isSubmitting}
                  className={`
                    flex items-center gap-2 px-8 py-3 bg-gradient-to-r min-w-[200px]
                    ${currentLevel === totalLevels ? "from-green-600 to-emerald-600 hover:shadow-green-600/50" : "from-pink-600 to-purple-700 hover:shadow-purple-600/50"}
                    text-white font-bold rounded-lg transition-all duration-300
                    hover:-translate-y-0.5 hover:shadow-lg 
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none
                    ${currentLevel === totalLevels && !isSubmitting ? "animate-pulse" : ""}
                  `}
                >
                  {currentLevel === totalLevels ? (
                    <>
                      <Send className="w-5 h-5 flex-shrink-0" />
                      <span className="whitespace-nowrap">DEPLOY APPLICATION</span>
                    </>
                  ) : (
                    <>
                      <span className="whitespace-nowrap">Next Level</span>
                      <ChevronRight className="w-5 h-5 flex-shrink-0" />
                    </>
                  )}
                </button>
              </div>

              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 bg-gradient-to-br from-green-600/95 to-emerald-600/95 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-8 z-50"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", damping: 15 }}
                      className="text-8xl mb-6"
                    >
                      <Trophy className="w-24 h-24 text-yellow-300" />
                    </motion.div>

                    <h2 className="text-4xl font-black text-white mb-4 text-center">APPLICATION DEPLOYED!</h2>

                    <p className="text-xl text-center max-w-md text-white/90 mb-6">
                      Your quest has been received. Our AI agents are already analyzing your greatness. Expect contact
                      within 42 hours!
                    </p>

                    {submissionResult && submissionResult.taskUrl && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-6"
                      >
                        <p className="text-white/80 text-sm mb-2">Your application has been created:</p>
                        <a
                          href={submissionResult.taskUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white font-bold underline hover:text-white/80 flex items-center gap-2"
                        >
                          View Application #{submissionResult.taskId}
                          <LinkIcon className="w-4 h-4" />
                        </a>
                      </motion.div>
                    )}

                    <p className="text-lg text-white/80 text-center">
                      While you wait, join our Discord to meet future teammates!
                    </p>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="mt-6 text-white/60 text-sm"
                    >
                      This window will close automatically...
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 10s ease infinite;
        }

        .animate-scan {
          animation: scan 3s linear infinite;
        }

        /* Enhanced scrollbar styling for better visibility */
        .custom-scrollbar {
          scrollbar-gutter: stable;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 12px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.6);
          border-radius: 6px;
          margin: 8px 0;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #9333ea, #a855f7);
          border-radius: 6px;
          border: 2px solid rgba(0, 0, 0, 0.6);
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #a855f7, #c084fc);
          border-color: rgba(0, 0, 0, 0.8);
        }

        /* Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #9333ea rgba(0, 0, 0, 0.6);
        }

        /* Ensure proper stacking context */
        .custom-scrollbar > * {
          position: relative;
        }

        /* Prevent layout shift during animations */
        @media (prefers-reduced-motion: reduce) {
          .animate-gradient-x,
          .animate-scan {
            animation: none;
          }
        }
      `}</style>
    </>
  )
}

export default BravettoQuestModal
