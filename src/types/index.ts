// Types for the Russian learning application

export interface Word {
  id: number
  russian: string
  french: string
  case: string | null
  explanation: string
  position: number
}

export interface Sentence {
  id: number
  russian: string
  french: string
  words: Word[]
}

export interface Case {
  name: string
  description: string
  color: string
  examples: string[]
}

export interface Cases {
  [key: string]: Case
}

export interface QuizOption {
  case: string
  label: string
}

export interface Quiz {
  id: number
  sentenceId: number
  wordId: number
  question: string
  options: QuizOption[]
  correct: string
  explanation: string
}

export interface LessonData {
  sentences: Sentence[]
  cases: Cases
  quizzes: Quiz[]
}

export interface UserProgress {
  points: number
  level: number
  completedSentences: number[]
  completedQuizzes: number[]
  streak: number
  lastActivity: string
}

export interface QuizState {
  currentQuiz: Quiz | null
  score: number
  answered: boolean
  selectedAnswer: string | null
  showExplanation: boolean
}

export interface AppState {
  currentSentence: Sentence | null
  selectedWord: Word | null
  showTooltip: boolean
  tooltipPosition: { x: number; y: number }
}
