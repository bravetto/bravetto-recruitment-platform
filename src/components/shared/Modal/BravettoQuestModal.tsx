import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { X, ChevronRight, Check, AlertCircle, Sparkles, Code, Zap, Trophy, Target, Rocket, Brain, ChevronDown, Search, ChevronLeft, Send, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

// Design System Constants
const DESIGN_TOKENS = {
  colors: {
    // Primary palette - reduced saturation for better readability
    background: {
      overlay: 'rgba(0, 0, 0, 0.6)', // Lighter overlay
      modal: '#0A0B0F', // Deep slate instead of pure black
      card: '#12131A',
      input: '#1A1B23',
      hover: '#22232B'
    },
    // Accent colors - more subtle gradients
    accent: {
      primary: '#8B5CF6', // Softer purple
      secondary: '#EC4899', // Softer pink
      gradient: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
      glow: 'rgba(139, 92, 246, 0.2)'
    },
    // Text hierarchy with better contrast
    text: {
      primary: '#F9FAFB', // Near white for main text
      secondary: '#D1D5DB', // Light gray for secondary
      muted: '#9CA3AF', // Medium gray for hints
      error: '#EF4444'
    },
    // Semantic colors
    status: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6'
    }
  },
  spacing: {
    xs: '0.5rem',   // 8px
    sm: '0.75rem',  // 12px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem'      // 32px
  },
  animation: {
    // Reduced animation intensity
    duration: {
      fast: 150,
      normal: 300,
      slow: 500
    },
    easing: [0.4, 0, 0.2, 1]
  },
  typography: {
    // Clear hierarchy
    heading: {
      size: '1.875rem',
      weight: 700,
      lineHeight: 1.2
    },
    subheading: {
      size: '1.25rem',
      weight: 600,
      lineHeight: 1.3
    },
    body: {
      size: '1rem',
      weight: 400,
      lineHeight: 1.6
    },
    small: {
      size: '0.875rem',
      weight: 400,
      lineHeight: 1.5
    }
  }
};

// Type definitions
interface FormData {
  basicInfo: {
    firstName: string;
    lastName: string;
    email: string;
    location: string;
    portfolio: string;
    linkedin: string;
  };
  experience: {
    totalYears: string;
    currentRole: string;
    techStack: string[];
    achievements: string;
  };
  technicalSkills: {
    frontendRating: number;
    backendRating: number;
    mobileRating: number;
    devOpsRating: number;
    specializations: string[];
  };
  problemSolving: {
    challengeDescription: string;
    approach: string;
    outcome: string;
    learnings: string;
  };
  systemDesign: {
    scalabilityRating: number;
    architectureExperience: string;
    performanceOptimization: string;
    securityPractices: string;
  };
  innovation: {
    innovationExample: string;
    emergingTech: string[];
    continuousLearning: string;
    openSourceContributions: string;
  };
  culture: {
    workStyle: string;
    collaboration: string;
    mentorship: string;
    values: string[];
  };
}

interface BravettoQuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: FormData) => void;
}

// Reusable Components
const ProgressBar: React.FC<{ current: number; total: number }> = ({ current, total }) => {
  const progress = (current / total) * 100;
  
  return (
    <div className="relative w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
      <motion.div
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: DESIGN_TOKENS.animation.easing }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
    </div>
  );
};

const FormInput: React.FC<{
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}> = ({ label, name, type = 'text', value, onChange, error, placeholder, required }) => {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-200">
        {label} {required && <span className="text-pink-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          "w-full px-4 py-3 rounded-lg text-sm",
          "bg-gray-800/50 backdrop-blur-sm",
          "border border-gray-700",
          "text-gray-100 placeholder-gray-500",
          "transition-all duration-200",
          "focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none",
          "hover:border-gray-600",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
        )}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-400 flex items-center gap-1 mt-1"
        >
          <AlertCircle className="w-3 h-3" />
          {error}
        </motion.p>
      )}
    </div>
  );
};

const FormTextarea: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}> = ({ label, name, value, onChange, error, placeholder, required, rows = 4 }) => {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-200">
        {label} {required && <span className="text-pink-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={cn(
          "w-full px-4 py-3 rounded-lg resize-none text-sm",
          "bg-gray-800/50 backdrop-blur-sm",
          "border border-gray-700",
          "text-gray-100 placeholder-gray-500",
          "transition-all duration-200",
          "focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none",
          "hover:border-gray-600",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
        )}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-400 flex items-center gap-1 mt-1"
        >
          <AlertCircle className="w-3 h-3" />
          {error}
        </motion.p>
      )}
    </div>
  );
};

const RatingInput: React.FC<{
  label: string;
  value: number;
  onChange: (value: number) => void;
  max?: number;
}> = ({ label, value, onChange, max = 10 }) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-200">{label}</label>
      <div className="flex items-center gap-3">
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: max }, (_, i) => (
            <button
              key={i}
              onClick={() => onChange(i + 1)}
              className={cn(
                "w-10 h-10 rounded-md font-medium text-sm transition-all duration-200",
                "hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500/20",
                value >= i + 1
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                  : "bg-gray-800/50 text-gray-400 border border-gray-700 hover:border-gray-600"
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <span className="text-sm text-gray-400 ml-2">
          {value > 0 ? `${value} / ${max}` : 'Not rated'}
        </span>
      </div>
    </div>
  );
};

const MultiSelect: React.FC<{
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
}> = ({ label, options, selected, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(item => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const clearAll = () => {
    onChange([]);
  };

  const selectAll = () => {
    onChange(options);
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-200">
        {label}
        {selected.length > 0 && (
          <span className="ml-2 text-xs text-purple-400">({selected.length} selected)</span>
        )}
      </label>
      <div className="relative" ref={dropdownRef}>
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full px-4 py-3 rounded-lg text-left text-sm",
            "bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm",
            "border border-gray-700",
            "text-gray-100",
            "transition-all duration-200",
            "hover:border-purple-600/50 hover:shadow-lg hover:shadow-purple-500/10",
            "focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none",
            "flex items-center justify-between group"
          )}
        >
          <div className="flex-1 min-w-0">
            {selected.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {selected.slice(0, 3).map(item => (
                  <span key={item} className="inline-flex items-center px-2.5 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full text-xs font-medium">
                    {item}
                  </span>
                ))}
                {selected.length > 3 && (
                  <span className="inline-flex items-center px-2.5 py-1 bg-gradient-to-r from-gray-700 to-gray-800 text-gray-300 rounded-full text-xs font-medium">
                    +{selected.length - 3} more
                  </span>
                )}
              </div>
            ) : (
              <span className="text-gray-400">{placeholder || 'Select options'}</span>
            )}
          </div>
          <div className={cn(
            "ml-2 transition-all duration-300",
            isOpen && "transform rotate-180"
          )}>
            <ChevronDown className={cn(
              "w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors"
            )} />
          </div>
        </button>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={cn(
                "absolute z-50 w-full mt-2",
                "bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-700 rounded-lg shadow-2xl",
                "max-h-[320px] overflow-hidden flex flex-col",
                "backdrop-blur-xl"
              )}
            >
              {/* Quick actions */}
              <div className="px-4 py-3 border-b border-gray-800/50 bg-gray-900/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">
                    {options.length} options available
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-xs text-gray-400 hover:text-gray-300 font-medium transition-colors px-2 py-1 rounded hover:bg-gray-800"
                    >
                      Close
                    </button>
                    <span className="text-gray-700">•</span>
                    <button
                      onClick={selectAll}
                      className="text-xs text-purple-400 hover:text-purple-300 font-medium transition-colors px-2 py-1 rounded hover:bg-purple-500/10"
                    >
                      Select all
                    </button>
                    <span className="text-gray-700">•</span>
                    <button
                      onClick={clearAll}
                      className="text-xs text-purple-400 hover:text-purple-300 font-medium transition-colors px-2 py-1 rounded hover:bg-purple-500/10"
                    >
                      Clear all
                    </button>
                  </div>
                </div>
              </div>

              {/* Options list */}
              <div className="overflow-y-auto flex-1 overscroll-contain py-2">
                {options.map((option, index) => (
                  <motion.button
                    key={option}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02, duration: 0.2 }}
                    onClick={() => toggleOption(option)}
                    className={cn(
                      "w-full px-6 py-2.5 text-left transition-all duration-200 text-sm",
                      "hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10",
                      "flex items-center justify-between group",
                      selected.includes(option) 
                        ? "text-purple-300 bg-gradient-to-r from-purple-500/10 to-pink-500/10" 
                        : "text-gray-300"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <div className={cn(
                        "w-5 h-5 rounded-md border-2 transition-all duration-200",
                        "flex items-center justify-center",
                        selected.includes(option)
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 border-transparent shadow-lg shadow-purple-500/30"
                          : "border-gray-600 group-hover:border-purple-500/50"
                      )}>
                        <AnimatePresence>
                          {selected.includes(option) && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Check className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <span className="font-medium">{option}</span>
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Level Components
const LevelBasicInfo: React.FC<{
  data: FormData['basicInfo'];
  onChange: (data: FormData['basicInfo']) => void;
  errors: Record<string, string>;
}> = ({ data, onChange, errors }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Sparkles className="w-12 h-12 text-purple-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-100 mb-2">Welcome, Future Bravettian!</h3>
        <p className="text-base text-gray-400">Let's start with the basics</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput
          label="First Name"
          name="firstName"
          value={data.firstName}
          onChange={(e) => onChange({ ...data, firstName: e.target.value })}
          error={errors.firstName}
          placeholder="John"
          required
        />
        
        <FormInput
          label="Last Name"
          name="lastName"
          value={data.lastName}
          onChange={(e) => onChange({ ...data, lastName: e.target.value })}
          error={errors.lastName}
          placeholder="Doe"
          required
        />
      </div>
      
      <FormInput
        label="Email Address"
        name="email"
        type="email"
        value={data.email}
        onChange={(e) => onChange({ ...data, email: e.target.value })}
        error={errors.email}
        placeholder="john@example.com"
        required
      />
      
      <FormInput
        label="Location"
        name="location"
        value={data.location}
        onChange={(e) => onChange({ ...data, location: e.target.value })}
        error={errors.location}
        placeholder="City, Country"
        required
      />
      
      <FormInput
        label="Portfolio/GitHub URL"
        name="portfolio"
        type="url"
        value={data.portfolio}
        onChange={(e) => onChange({ ...data, portfolio: e.target.value })}
        error={errors.portfolio}
        placeholder="https://github.com/johndoe"
      />
      
      <FormInput
        label="LinkedIn URL"
        name="linkedin"
        type="url"
        value={data.linkedin}
        onChange={(e) => onChange({ ...data, linkedin: e.target.value })}
        error={errors.linkedin}
        placeholder="https://linkedin.com/in/johndoe"
      />
    </div>
  );
};

const LevelExperience: React.FC<{
  data: FormData['experience'];
  onChange: (data: FormData['experience']) => void;
  errors: Record<string, string>;
}> = ({ data, onChange, errors }) => {
  const techStackOptions = [
    'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular', 'Node.js',
    'Python', 'Django', 'Flask', 'Java', 'Spring', 'Go', 'Rust',
    'AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB'
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Code className="w-10 h-10 text-purple-500 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-gray-100 mb-1">Your Journey So Far</h3>
        <p className="text-sm text-gray-400">Tell us about your experience</p>
      </div>
      
      <FormInput
        label="Years of Experience"
        name="totalYears"
        value={data.totalYears}
        onChange={(e) => onChange({ ...data, totalYears: e.target.value })}
        error={errors.totalYears}
        placeholder="e.g., 5"
        required
      />
      
      <FormInput
        label="Current Role"
        name="currentRole"
        value={data.currentRole}
        onChange={(e) => onChange({ ...data, currentRole: e.target.value })}
        error={errors.currentRole}
        placeholder="e.g., Senior Full Stack Developer"
        required
      />
      
      <MultiSelect
        label="Tech Stack (Select all that apply)"
        options={techStackOptions}
        selected={data.techStack}
        onChange={(selected) => onChange({ ...data, techStack: selected })}
        placeholder="Select technologies you work with"
      />
      
      <FormTextarea
        label="Key Achievements"
        name="achievements"
        value={data.achievements}
        onChange={(e) => onChange({ ...data, achievements: e.target.value })}
        error={errors.achievements}
        placeholder="Describe your most impactful achievements..."
        rows={4}
        required
      />
    </div>
  );
};

const LevelTechnicalSkills: React.FC<{
  data: FormData['technicalSkills'];
  onChange: (data: FormData['technicalSkills']) => void;
  errors: Record<string, string>;
}> = ({ data, onChange, errors }) => {
  const specializationOptions = [
    'Microservices Architecture', 'Cloud Native Development', 'Machine Learning',
    'Real-time Systems', 'Blockchain', 'IoT', 'Security', 'Performance Optimization',
    'Mobile Development', 'Progressive Web Apps', 'DevOps/SRE', 'Data Engineering'
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Zap className="w-10 h-10 text-purple-500 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-gray-100 mb-1">Technical Mastery</h3>
        <p className="text-sm text-gray-400">Rate your skills honestly (1-10)</p>
      </div>
      
      <RatingInput
        label="Frontend Development"
        value={data.frontendRating}
        onChange={(value) => onChange({ ...data, frontendRating: value })}
      />
      
      <RatingInput
        label="Backend Development"
        value={data.backendRating}
        onChange={(value) => onChange({ ...data, backendRating: value })}
      />
      
      <RatingInput
        label="Mobile Development"
        value={data.mobileRating}
        onChange={(value) => onChange({ ...data, mobileRating: value })}
      />
      
      <RatingInput
        label="DevOps & Infrastructure"
        value={data.devOpsRating}
        onChange={(value) => onChange({ ...data, devOpsRating: value })}
      />
      
      <MultiSelect
        label="Specializations"
        options={specializationOptions}
        selected={data.specializations}
        onChange={(selected) => onChange({ ...data, specializations: selected })}
        placeholder="Select your areas of expertise"
      />
    </div>
  );
};

const LevelProblemSolving: React.FC<{
  data: FormData['problemSolving'];
  onChange: (data: FormData['problemSolving']) => void;
  errors: Record<string, string>;
}> = ({ data, onChange, errors }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Target className="w-10 h-10 text-purple-500 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-gray-100 mb-1">Problem Solving Excellence</h3>
        <p className="text-sm text-gray-400">Share a challenging problem you've solved</p>
      </div>
      
      <FormTextarea
        label="Challenge Description"
        name="challengeDescription"
        value={data.challengeDescription}
        onChange={(e) => onChange({ ...data, challengeDescription: e.target.value })}
        error={errors.challengeDescription}
        placeholder="Describe a complex technical challenge you faced..."
        rows={3}
        required
      />
      
      <FormTextarea
        label="Your Approach"
        name="approach"
        value={data.approach}
        onChange={(e) => onChange({ ...data, approach: e.target.value })}
        error={errors.approach}
        placeholder="How did you approach solving this problem?"
        rows={3}
        required
      />
      
      <FormTextarea
        label="Outcome"
        name="outcome"
        value={data.outcome}
        onChange={(e) => onChange({ ...data, outcome: e.target.value })}
        error={errors.outcome}
        placeholder="What was the result? Include metrics if possible"
        rows={3}
        required
      />
      
      <FormTextarea
        label="Key Learnings"
        name="learnings"
        value={data.learnings}
        onChange={(e) => onChange({ ...data, learnings: e.target.value })}
        error={errors.learnings}
        placeholder="What did you learn from this experience?"
        rows={2}
        required
      />
    </div>
  );
};

const LevelSystemDesign: React.FC<{
  data: FormData['systemDesign'];
  onChange: (data: FormData['systemDesign']) => void;
  errors: Record<string, string>;
}> = ({ data, onChange, errors }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Brain className="w-10 h-10 text-purple-500 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-gray-100 mb-1">System Design & Architecture</h3>
        <p className="text-sm text-gray-400">Demonstrate your architectural thinking</p>
      </div>
      
      <RatingInput
        label="System Scalability Experience"
        value={data.scalabilityRating}
        onChange={(value) => onChange({ ...data, scalabilityRating: value })}
      />
      
      <FormTextarea
        label="Architecture Experience"
        name="architectureExperience"
        value={data.architectureExperience}
        onChange={(e) => onChange({ ...data, architectureExperience: e.target.value })}
        error={errors.architectureExperience}
        placeholder="Describe a system you've designed or significantly contributed to..."
        rows={4}
        required
      />
      
      <FormTextarea
        label="Performance Optimization"
        name="performanceOptimization"
        value={data.performanceOptimization}
        onChange={(e) => onChange({ ...data, performanceOptimization: e.target.value })}
        error={errors.performanceOptimization}
        placeholder="Share an example of how you've optimized system performance..."
        rows={3}
        required
      />
      
      <FormTextarea
        label="Security Practices"
        name="securityPractices"
        value={data.securityPractices}
        onChange={(e) => onChange({ ...data, securityPractices: e.target.value })}
        error={errors.securityPractices}
        placeholder="How do you approach security in your designs?"
        rows={3}
        required
      />
    </div>
  );
};

const LevelInnovation: React.FC<{
  data: FormData['innovation'];
  onChange: (data: FormData['innovation']) => void;
  errors: Record<string, string>;
}> = ({ data, onChange, errors }) => {
  const emergingTechOptions = [
    'AI/Machine Learning', 'Blockchain/Web3', 'Quantum Computing', 'AR/VR/XR',
    'Edge Computing', 'IoT', '5G Technologies', 'Serverless', 'WebAssembly',
    'GraphQL', 'Micro Frontends', 'Low-Code Platforms'
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Rocket className="w-10 h-10 text-purple-500 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-gray-100 mb-1">Innovation & Growth</h3>
        <p className="text-sm text-gray-400">Show us your innovative side</p>
      </div>
      
      <FormTextarea
        label="Innovation Example"
        name="innovationExample"
        value={data.innovationExample}
        onChange={(e) => onChange({ ...data, innovationExample: e.target.value })}
        error={errors.innovationExample}
        placeholder="Describe something innovative you've built or contributed to..."
        rows={4}
        required
      />
      
      <MultiSelect
        label="Emerging Technologies You're Exploring"
        options={emergingTechOptions}
        selected={data.emergingTech}
        onChange={(selected) => onChange({ ...data, emergingTech: selected })}
        placeholder="Select technologies you're learning or interested in"
      />
      
      <FormTextarea
        label="Continuous Learning"
        name="continuousLearning"
        value={data.continuousLearning}
        onChange={(e) => onChange({ ...data, continuousLearning: e.target.value })}
        error={errors.continuousLearning}
        placeholder="How do you stay updated with technology trends?"
        rows={3}
        required
      />
      
      <FormTextarea
        label="Open Source Contributions"
        name="openSourceContributions"
        value={data.openSourceContributions}
        onChange={(e) => onChange({ ...data, openSourceContributions: e.target.value })}
        error={errors.openSourceContributions}
        placeholder="Share any open source projects or contributions..."
        rows={3}
      />
    </div>
  );
};

const LevelCulture: React.FC<{
  data: FormData['culture'];
  onChange: (data: FormData['culture']) => void;
  errors: Record<string, string>;
}> = ({ data, onChange, errors }) => {
  const valueOptions = [
    'Innovation First', 'User-Centric Design', 'Continuous Learning', 'Collaboration',
    'Ownership Mentality', 'Data-Driven Decisions', 'Agile Mindset', 'Quality Excellence',
    'Transparency', 'Work-Life Balance', 'Diversity & Inclusion', 'Sustainability'
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Trophy className="w-10 h-10 text-purple-500 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-gray-100 mb-1">Culture Fit</h3>
        <p className="text-sm text-gray-400">Let's see if we're aligned</p>
      </div>
      
      <FormTextarea
        label="Preferred Work Style"
        name="workStyle"
        value={data.workStyle}
        onChange={(e) => onChange({ ...data, workStyle: e.target.value })}
        error={errors.workStyle}
        placeholder="Describe your ideal work environment and style..."
        rows={3}
        required
      />
      
      <FormTextarea
        label="Collaboration Approach"
        name="collaboration"
        value={data.collaboration}
        onChange={(e) => onChange({ ...data, collaboration: e.target.value })}
        error={errors.collaboration}
        placeholder="How do you collaborate with team members?"
        rows={3}
        required
      />
      
      <FormTextarea
        label="Mentorship & Leadership"
        name="mentorship"
        value={data.mentorship}
        onChange={(e) => onChange({ ...data, mentorship: e.target.value })}
        error={errors.mentorship}
        placeholder="Share your experience with mentoring or being mentored..."
        rows={3}
        required
      />
      
      <MultiSelect
        label="Core Values (Select your top values)"
        options={valueOptions}
        selected={data.values}
        onChange={(selected) => onChange({ ...data, values: selected })}
        placeholder="Select values that resonate with you"
      />
    </div>
  );
};

// Main Modal Component
export const BravettoQuestModal: React.FC<BravettoQuestModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  console.log('🚀 BravettoQuestModal - v2.10 ENHANCED HEADER/FOOTER PADDING!');
  console.log('Modal opened at:', new Date().toISOString());
  
  // Debug: Log the actual padding classes being applied
  useEffect(() => {
    if (isOpen) {
      const modalContent = document.querySelector('.px-8.py-8');
      console.log('Modal content element:', modalContent);
      if (modalContent) {
        const computedStyle = window.getComputedStyle(modalContent);
        console.log('Computed padding:', {
          paddingLeft: computedStyle.paddingLeft,
          paddingRight: computedStyle.paddingRight,
          paddingTop: computedStyle.paddingTop,
          paddingBottom: computedStyle.paddingBottom
        });
      }
    }
  }, [isOpen]);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    basicInfo: {
      firstName: '',
      lastName: '',
      email: '',
      location: '',
      portfolio: '',
      linkedin: ''
    },
    experience: {
      totalYears: '',
      currentRole: '',
      techStack: [],
      achievements: ''
    },
    technicalSkills: {
      frontendRating: 0,
      backendRating: 0,
      mobileRating: 0,
      devOpsRating: 0,
      specializations: []
    },
    problemSolving: {
      challengeDescription: '',
      approach: '',
      outcome: '',
      learnings: ''
    },
    systemDesign: {
      scalabilityRating: 0,
      architectureExperience: '',
      performanceOptimization: '',
      securityPractices: ''
    },
    innovation: {
      innovationExample: '',
      emergingTech: [],
      continuousLearning: '',
      openSourceContributions: ''
    },
    culture: {
      workStyle: '',
      collaboration: '',
      mentorship: '',
      values: []
    }
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  // Focus trap
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const validateCurrentLevel = useCallback(() => {
    const newErrors: Record<string, string> = {};
    
    switch (currentLevel) {
      case 1:
        if (!formData.basicInfo.firstName) newErrors.firstName = 'First name is required';
        if (!formData.basicInfo.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.basicInfo.email) newErrors.email = 'Email is required';
        if (!formData.basicInfo.location) newErrors.location = 'Location is required';
        break;
      case 2:
        if (!formData.experience.totalYears) newErrors.totalYears = 'Years of experience is required';
        if (!formData.experience.currentRole) newErrors.currentRole = 'Current role is required';
        if (!formData.experience.achievements) newErrors.achievements = 'Achievements are required';
        break;
      case 3:
        // Technical skills are all ratings, so no validation needed
        break;
      case 4:
        if (!formData.problemSolving.challengeDescription) newErrors.challengeDescription = 'Challenge description is required';
        if (!formData.problemSolving.approach) newErrors.approach = 'Approach is required';
        if (!formData.problemSolving.outcome) newErrors.outcome = 'Outcome is required';
        if (!formData.problemSolving.learnings) newErrors.learnings = 'Learnings are required';
        break;
      case 5:
        if (!formData.systemDesign.architectureExperience) newErrors.architectureExperience = 'Architecture experience is required';
        if (!formData.systemDesign.performanceOptimization) newErrors.performanceOptimization = 'Performance optimization is required';
        if (!formData.systemDesign.securityPractices) newErrors.securityPractices = 'Security practices are required';
        break;
      case 6:
        if (!formData.innovation.innovationExample) newErrors.innovationExample = 'Innovation example is required';
        if (!formData.innovation.continuousLearning) newErrors.continuousLearning = 'Continuous learning approach is required';
        break;
      case 7:
        if (!formData.culture.workStyle) newErrors.workStyle = 'Work style is required';
        if (!formData.culture.collaboration) newErrors.collaboration = 'Collaboration approach is required';
        if (!formData.culture.mentorship) newErrors.mentorship = 'Mentorship experience is required';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [currentLevel, formData]);

  const handleNext = () => {
    if (validateCurrentLevel() && currentLevel < 7) {
      setCurrentLevel(currentLevel + 1);
      setErrors({});
    }
  };

  const handlePrevious = () => {
    if (currentLevel > 1) {
      setCurrentLevel(currentLevel - 1);
      setErrors({});
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentLevel()) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit?.(formData);
      setShowThankYou(true);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderLevel = () => {
    switch (currentLevel) {
      case 1:
        return (
          <LevelBasicInfo
            data={formData.basicInfo}
            onChange={(data) => setFormData({ ...formData, basicInfo: data })}
            errors={errors}
          />
        );
      case 2:
        return (
          <LevelExperience
            data={formData.experience}
            onChange={(data) => setFormData({ ...formData, experience: data })}
            errors={errors}
          />
        );
      case 3:
        return (
          <LevelTechnicalSkills
            data={formData.technicalSkills}
            onChange={(data) => setFormData({ ...formData, technicalSkills: data })}
            errors={errors}
          />
        );
      case 4:
        return (
          <LevelProblemSolving
            data={formData.problemSolving}
            onChange={(data) => setFormData({ ...formData, problemSolving: data })}
            errors={errors}
          />
        );
      case 5:
        return (
          <LevelSystemDesign
            data={formData.systemDesign}
            onChange={(data) => setFormData({ ...formData, systemDesign: data })}
            errors={errors}
          />
        );
      case 6:
        return (
          <LevelInnovation
            data={formData.innovation}
            onChange={(data) => setFormData({ ...formData, innovation: data })}
            errors={errors}
          />
        );
      case 7:
        return (
          <LevelCulture
            data={formData.culture}
            onChange={(data) => setFormData({ ...formData, culture: data })}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  const levelTitles = [
    'Basic Information',
    'Experience',
    'Technical Skills',
    'Problem Solving',
    'System Design',
    'Innovation',
    'Culture Fit'
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: DESIGN_TOKENS.animation.easing }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow effect behind modal */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[800px] h-[600px] bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-purple-600/20 blur-3xl animate-pulse" />
            </div>
            
            <div className="relative w-full max-w-3xl max-h-[90vh] bg-gradient-to-b from-gray-900 to-gray-950 rounded-xl shadow-2xl overflow-hidden">
              {/* Animated border */}
              <div className="absolute inset-0 rounded-xl p-[1px] bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 animate-gradient-x">
                <div className="h-full w-full bg-gradient-to-b from-gray-900 to-gray-950 rounded-xl" />
              </div>
              
              {/* Subtle gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-pink-500/20 pointer-events-none" />
              
              {/* Thank You Modal */}
              <AnimatePresence>
                {showThankYou && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 z-50 flex items-center justify-center p-12 bg-gradient-to-b from-gray-900/95 to-gray-950/95 backdrop-blur-xl rounded-xl"
                  >
                    <div className="text-center max-w-2xl px-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", damping: 15 }}
                        className="mb-8"
                      >
                        <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50">
                          <Check className="w-12 h-12 text-white" />
                        </div>
                      </motion.div>
                      
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl font-bold text-white mb-6"
                      >
                        Application Received with Excellence
                      </motion.h2>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-6 text-gray-300 mb-10"
                      >
                        <p className="text-lg leading-relaxed">
                          Your quest has been received and is being reviewed by our team with the utmost care and attention. 
                          We deeply value the time and thought you've invested in sharing your journey with us.
                        </p>
                        
                        <p className="text-lg leading-relaxed">
                          At Bravetto, we believe every application represents a unique story of innovation and potential. 
                          Your submission will be thoughtfully evaluated by our leadership team who are excited to learn about your experiences and aspirations.
                        </p>
                        
                        <div className="mt-8 p-6 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                          <p className="text-purple-300 font-medium">
                            <Sparkles className="inline w-5 h-5 mr-2" />
                            Expect to hear from us within 48 hours. We move fast, just like our deployments!
                          </p>
                        </div>
                        
                        <p className="text-sm text-gray-400 mt-8">
                          Thank you for considering Bravetto as your next adventure. We're honored by your interest in joining our mission to revolutionize software development.
                        </p>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                      >
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            window.location.href = 'mailto:Jay@bravetto.com?subject=Resume%20Submission%20-%20Bravetto%20Quest&body=Hello%20Jay,%0A%0AI%20have%20completed%20the%20Bravetto%20Quest%20and%20would%20like%20to%20submit%20my%20resume%20for%20your%20consideration.%0A%0AThank%20you!';
                          }}
                          className={cn(
                            "px-12 py-5",
                            "bg-gradient-to-r from-green-600 to-emerald-600",
                            "text-white text-lg font-semibold",
                            "rounded-xl shadow-2xl",
                            "hover:from-green-500 hover:to-emerald-500",
                            "hover:shadow-green-500/30",
                            "transition-all duration-300",
                            "flex items-center gap-3",
                            "min-w-[200px] justify-center"
                          )}
                        >
                          <Mail className="w-5 h-5" />
                          <span>Send Resume</span>
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setShowThankYou(false);
                            onClose();
                          }}
                          className={cn(
                            "px-12 py-5",
                            "bg-gradient-to-r from-purple-600 to-pink-600",
                            "text-white text-lg font-semibold",
                            "rounded-xl shadow-2xl",
                            "hover:from-purple-500 hover:to-pink-500",
                            "hover:shadow-purple-500/30",
                            "transition-all duration-300",
                            "flex items-center gap-3",
                            "min-w-[200px] justify-center"
                          )}
                        >
                          <X className="w-5 h-5" />
                          <span>Close Modal</span>
                        </motion.button>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Header - with 15% more padding */}
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-gray-900 to-gray-900/95 backdrop-blur-sm border-b border-gray-800 px-12 py-9 z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-100">Bravetto Quest <span className="text-xs text-green-400">(v2.10)</span></h2>
                    <p className="text-sm text-gray-400 mt-1">Level {currentLevel} of 7: {levelTitles[currentLevel - 1]}</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-gray-800 transition-all duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <ProgressBar current={currentLevel} total={7} />
              </div>
              
              {/* Content - with more padding all around and space between fields */}
              <div className="relative overflow-y-auto max-h-[calc(90vh-260px)] custom-scrollbar">
                <div 
                  className="!p-10 !pb-20 !pt-32" 
                  data-modal-content="v2.10"
                  style={{ padding: '2.5rem !important', paddingBottom: '5rem !important', paddingTop: '8rem !important' }}
                >
                  <div className="space-y-6">
                    {renderLevel()}
                  </div>
                </div>
              </div>
              
              {/* Footer - with 15% more padding */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 via-gray-900/95 to-gray-900/80 backdrop-blur-sm border-t border-gray-800 px-12 py-9">
                <div className="flex items-center justify-between gap-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePrevious}
                    disabled={currentLevel === 1}
                    className={cn(
                      "group relative px-8 py-4 rounded-xl font-medium text-sm transition-all duration-300",
                      "flex items-center gap-3 min-w-[160px]",
                      currentLevel === 1
                        ? "bg-gray-800/50 text-gray-500 cursor-not-allowed opacity-50"
                        : "bg-gradient-to-r from-gray-800 to-gray-700 text-gray-100 hover:from-gray-700 hover:to-gray-600 shadow-lg hover:shadow-xl hover:shadow-gray-700/20"
                    )}
                  >
                    <ChevronLeft className={cn(
                      "w-5 h-5 transition-transform duration-300",
                      currentLevel !== 1 && "group-hover:-translate-x-1"
                    )} />
                    <span className="font-semibold">Previous</span>
                    {currentLevel !== 1 && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
                    )}
                  </motion.button>
                  
                  <div className="flex items-center gap-3">
                    {Array.from({ length: 7 }, (_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className={cn(
                          "transition-all duration-500",
                          i + 1 === currentLevel
                            ? "w-10 h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50"
                            : i + 1 < currentLevel
                            ? "w-2.5 h-2.5 rounded-full bg-purple-500/50"
                            : "w-2.5 h-2.5 rounded-full bg-gray-700"
                        )}
                      />
                    ))}
                  </div>
                  
                  {currentLevel < 7 ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleNext}
                      className={cn(
                        "group relative px-8 py-4 rounded-xl font-medium text-sm transition-all duration-300",
                        "flex items-center gap-3 min-w-[180px] justify-center",
                        "bg-gradient-to-r from-purple-600 to-pink-600",
                        "text-white shadow-lg shadow-purple-500/25",
                        "hover:from-purple-500 hover:to-pink-500",
                        "hover:shadow-xl hover:shadow-purple-500/30"
                      )}
                    >
                      <span className="font-semibold whitespace-nowrap">Next Level</span>
                      <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className={cn(
                        "group relative px-10 py-4 rounded-xl font-medium text-sm transition-all duration-300",
                        "flex items-center gap-3 min-w-[220px] justify-center",
                        "bg-gradient-to-r from-green-600 to-emerald-600",
                        "text-white shadow-lg shadow-green-500/25",
                        "hover:from-green-500 hover:to-emerald-500",
                        "hover:shadow-xl hover:shadow-green-500/30",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        !isSubmitting && "animate-pulse"
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span className="font-semibold">Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span className="font-semibold whitespace-nowrap">Deploy Application</span>
                          <Sparkles className="w-4 h-4 ml-1" />
                        </>
                      )}
                      {!isSubmitting && (
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
                      )}
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Export default - Updated
export default BravettoQuestModal; 