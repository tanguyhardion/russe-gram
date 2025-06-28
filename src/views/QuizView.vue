<template>
  <div class="quiz-view">
    <div class="quiz-container">
      <div class="quiz-header">
        <h1 class="quiz-title">Mode Quiz</h1>
        <p class="quiz-subtitle">
          Testez vos connaissances des cas russes
        </p>
        <div class="points-mini">
          <span class="points-value">{{ userStore.progress.points }} points</span>
          <span class="level-badge">Niveau {{ userStore.progress.level }}</span>
        </div>
      </div>

      <!-- Quiz Start Screen -->
      <div v-if="!quizStarted && !quizCompleted" class="quiz-start">
        <div class="start-card">
          <div class="start-icon">🎯</div>
          <h2 class="start-title">Prêt pour le défi ?</h2>
          <p class="start-description">
            Vous allez répondre à {{ numberOfQuestions }} questions sur les cas grammaticaux russes.
            Chaque bonne réponse vous rapporte 20 points !
          </p>
          
          <div class="difficulty-selector">
            <h3>Nombre de questions :</h3>
            <div class="difficulty-options">
              <button
                v-for="option in questionOptions"
                :key="option.value"
                class="difficulty-button"
                :class="{ active: numberOfQuestions === option.value }"
                @click="numberOfQuestions = option.value"
              >
                {{ option.label }}
              </button>
            </div>
          </div>
          
          <button class="start-button" @click="startQuiz">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9c.96 0 1.88-.16 2.73-.45l3.77 1.26-1.26-3.77c.29-.85.45-1.77.45-2.73 0-4.97-4.03-9-9-9z"/>
            </svg>
            Commencer le quiz
          </button>
        </div>
      </div>

      <!-- Quiz Questions -->
      <div v-else-if="quizStarted && !quizCompleted && currentQuiz">
        <QuizQuestion
          :quiz="currentQuiz"
          :current-index="quizStore.currentQuizIndex"
          :total="quizStore.sessionTotal"
          :score="quizStore.sessionScore"
          :selected-answer="quizStore.selectedAnswer"
          :is-answered="quizStore.isAnswered"
          :show-explanation="quizStore.showExplanation"
          @select-answer="handleAnswerSelect"
          @next="handleNext"
        />
      </div>

      <!-- Quiz Completed -->
      <div v-else-if="quizCompleted" class="quiz-results">
        <div class="results-card">
          <div class="results-icon">
            {{ results.percentage >= 80 ? '🏆' : results.percentage >= 60 ? '🎉' : '📚' }}
          </div>
          
          <h2 class="results-title">Quiz terminé !</h2>
          
          <div class="score-display">
            <div class="score-main">
              <span class="score-value">{{ results.score }}</span>
              <span class="score-divider">/</span>
              <span class="score-total">{{ results.total }}</span>
            </div>
            <div class="score-percentage">{{ results.percentage }}%</div>
          </div>
          
          <div class="performance-message">
            <p>{{ getPerformanceMessage() }}</p>
          </div>
          
          <div class="points-earned">
            <div class="points-display">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span>+{{ pointsEarned }} points gagnés !</span>
            </div>
          </div>
          
          <div class="results-actions">
            <button class="results-button primary" @click="restartQuiz">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Refaire un quiz
            </button>
            
            <router-link to="/learn" class="results-button secondary">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
              Continuer l'apprentissage
            </router-link>
            
            <router-link to="/" class="results-button accent">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              Retour à l'accueil
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useQuizStore } from '@/stores/quiz'
import { useUserStore } from '@/stores/counter'
import QuizQuestion from '@/components/QuizQuestion.vue'

const quizStore = useQuizStore()
const userStore = useUserStore()

const quizStarted = ref(false)
const quizCompleted = ref(false)
const numberOfQuestions = ref(5)
const pointsEarned = ref(0)

const questionOptions = [
  { label: '5 questions', value: 5 },
  { label: '10 questions', value: 10 },
  { label: '15 questions', value: 15 }
]

const currentQuiz = computed(() => quizStore.currentQuiz)
const results = computed(() => quizStore.getSessionResults())

function startQuiz() {
  quizStarted.value = true
  quizCompleted.value = false
  pointsEarned.value = 0
  quizStore.startQuizSession(numberOfQuestions.value)
}

function handleAnswerSelect(answer: string) {
  quizStore.selectAnswer(answer)
}

function handleNext() {
  // Add points for the current question
  if (currentQuiz.value) {
    const isCorrect = quizStore.isCorrectAnswer()
    const points = isCorrect ? 20 : 5
    pointsEarned.value += points
    userStore.completeQuiz(currentQuiz.value.id, isCorrect)
  }
  
  // Move to next question or complete quiz
  if (quizStore.currentQuizIndex + 1 >= quizStore.sessionTotal) {
    completeQuiz()
  } else {
    quizStore.nextQuestion()
  }
}

function completeQuiz() {
  quizStarted.value = false
  quizCompleted.value = true
}

function restartQuiz() {
  quizStarted.value = false
  quizCompleted.value = false
  quizStore.resetQuiz()
}

function getPerformanceMessage(): string {
  const percentage = results.value.percentage
  
  if (percentage >= 90) {
    return "Excellent ! Vous maîtrisez parfaitement les cas russes !"
  } else if (percentage >= 80) {
    return "Très bien ! Vous avez une bonne compréhension des cas russes."
  } else if (percentage >= 70) {
    return "Bien joué ! Continuez à vous entraîner pour progresser."
  } else if (percentage >= 60) {
    return "Pas mal ! Quelques révisions vous aideront à améliorer vos résultats."
  } else {
    return "Ne vous découragez pas ! Relisez les leçons et réessayez."
  }
}

onMounted(() => {
  quizStore.resetQuiz()
})
</script>

<style scoped>
.quiz-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
}

.quiz-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.quiz-header {
  text-align: center;
  margin-bottom: 3rem;
}

.quiz-title {
  font-size: 3rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 1rem;
}

.quiz-subtitle {
  font-size: 1.25rem;
  color: #6b7280;
  margin-bottom: 2rem;
}

.points-mini {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  background: white;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.points-value {
  font-weight: 600;
  color: #3b82f6;
}

.level-badge {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
}

.quiz-start {
  display: flex;
  justify-content: center;
}

.start-card {
  background: white;
  border-radius: 16px;
  padding: 3rem;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
}

.start-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
}

.start-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
}

.start-description {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.difficulty-selector {
  margin-bottom: 2rem;
}

.difficulty-selector h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
}

.difficulty-options {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

.difficulty-button {
  padding: 0.5rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.difficulty-button:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}

.difficulty-button.active {
  border-color: #3b82f6;
  background: #3b82f6;
  color: white;
}

.start-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
}

.start-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 12px -2px rgba(59, 130, 246, 0.3);
}

.quiz-results {
  display: flex;
  justify-content: center;
}

.results-card {
  background: white;
  border-radius: 16px;
  padding: 3rem;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
}

.results-icon {
  font-size: 5rem;
  margin-bottom: 1.5rem;
}

.results-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 2rem;
}

.score-display {
  margin-bottom: 2rem;
}

.score-main {
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.score-value {
  font-size: 4rem;
  font-weight: 800;
  color: #10b981;
}

.score-divider {
  font-size: 2rem;
  color: #6b7280;
}

.score-total {
  font-size: 2rem;
  color: #6b7280;
}

.score-percentage {
  font-size: 1.5rem;
  font-weight: 600;
  color: #3b82f6;
}

.performance-message {
  background: #f0f9ff;
  border: 1px solid #e0f2fe;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.performance-message p {
  color: #0369a1;
  font-weight: 500;
  margin: 0;
}

.points-earned {
  margin-bottom: 2rem;
}

.points-display {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  box-shadow: 0 4px 6px -1px rgba(251, 191, 36, 0.3);
}

.results-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.results-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1rem;
  min-width: 200px;
  justify-content: center;
}

.results-button.primary {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
}

.results-button.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 12px -2px rgba(59, 130, 246, 0.3);
}

.results-button.secondary {
  background: white;
  color: #374151;
  border: 2px solid #e5e7eb;
}

.results-button.secondary:hover {
  border-color: #3b82f6;
  color: #3b82f6;
  transform: translateY(-2px);
}

.results-button.accent {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 6px -1px rgba(102, 126, 234, 0.3);
}

.results-button.accent:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 12px -2px rgba(102, 126, 234, 0.3);
}

@media (max-width: 768px) {
  .quiz-container {
    padding: 1rem;
  }
  
  .quiz-title {
    font-size: 2rem;
  }
  
  .start-card, .results-card {
    padding: 2rem;
  }
  
  .difficulty-options {
    flex-direction: column;
  }
  
  .difficulty-button {
    width: 100%;
  }
  
  .results-button {
    width: 100%;
    max-width: 300px;
  }
  
  .score-value {
    font-size: 3rem;
  }
  
  .points-mini {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
