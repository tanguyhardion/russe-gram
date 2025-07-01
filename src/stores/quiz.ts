import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Quiz, QuizState } from '@/types'
import quizzesData from '@/data/quizzes.json'

export const useQuizStore = defineStore('quiz', () => {
  // Quiz data
  const quizzes = ref<Quiz[]>(quizzesData as Quiz[])

  // Quiz state
  const quizState = ref<QuizState>({
    currentQuiz: null,
    score: 0,
    answered: false,
    selectedAnswer: null,
    showExplanation: false,
  })

  // Current quiz session
  const currentQuizIndex = ref(0)
  const quizSession = ref<Quiz[]>([])
  const sessionScore = ref(0)
  const sessionTotal = ref(0)

  // Computed getters
  const currentQuiz = computed(() => quizState.value.currentQuiz)
  const isAnswered = computed(() => quizState.value.answered)
  const selectedAnswer = computed(() => quizState.value.selectedAnswer)
  const showExplanation = computed(() => quizState.value.showExplanation)
  const sessionProgress = computed(() => {
    if (sessionTotal.value === 0) return 0
    return Math.round((currentQuizIndex.value / sessionTotal.value) * 100)
  })

  // Actions
  function startQuizSession(numberOfQuestions: number = 5) {
    // Shuffle and select random quizzes
    const shuffled = [...quizzes.value].sort(() => Math.random() - 0.5)
    quizSession.value = shuffled.slice(0, Math.min(numberOfQuestions, shuffled.length))

    currentQuizIndex.value = 0
    sessionScore.value = 0
    sessionTotal.value = quizSession.value.length

    if (quizSession.value.length > 0) {
      loadCurrentQuiz()
    }
  }

  function loadCurrentQuiz() {
    if (currentQuizIndex.value < quizSession.value.length) {
      quizState.value = {
        currentQuiz: quizSession.value[currentQuizIndex.value],
        score: sessionScore.value,
        answered: false,
        selectedAnswer: null,
        showExplanation: false,
      }
    } else {
      // Quiz session completed
      quizState.value.currentQuiz = null
    }
  }

  function selectAnswer(answer: string) {
    if (quizState.value.answered) return

    quizState.value.selectedAnswer = answer
    quizState.value.answered = true

    // Check if answer is correct
    const isCorrect = answer === quizState.value.currentQuiz?.correct
    if (isCorrect) {
      sessionScore.value += 1
    }

    // Show explanation after a short delay
    setTimeout(() => {
      quizState.value.showExplanation = true
    }, 500)
  }

  function nextQuestion() {
    currentQuizIndex.value += 1
    loadCurrentQuiz()
  }

  function getQuizById(id: number): Quiz | undefined {
    return quizzes.value.find((quiz) => quiz.id === id)
  }

  function isCorrectAnswer(): boolean {
    if (!quizState.value.currentQuiz || !quizState.value.selectedAnswer) {
      return false
    }
    return quizState.value.selectedAnswer === quizState.value.currentQuiz.correct
  }

  function resetQuiz() {
    quizState.value = {
      currentQuiz: null,
      score: 0,
      answered: false,
      selectedAnswer: null,
      showExplanation: false,
    }
    currentQuizIndex.value = 0
    quizSession.value = []
    sessionScore.value = 0
    sessionTotal.value = 0
  }

  function getSessionResults() {
    return {
      score: sessionScore.value,
      total: sessionTotal.value,
      percentage:
        sessionTotal.value > 0 ? Math.round((sessionScore.value / sessionTotal.value) * 100) : 0,
    }
  }

  return {
    quizzes,
    currentQuiz,
    isAnswered,
    selectedAnswer,
    showExplanation,
    sessionProgress,
    currentQuizIndex,
    sessionScore,
    sessionTotal,
    startQuizSession,
    selectAnswer,
    nextQuestion,
    getQuizById,
    isCorrectAnswer,
    resetQuiz,
    getSessionResults,
  }
})
