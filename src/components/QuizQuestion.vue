<template>
  <div class="quiz-question">
    <div class="quiz-header">
      <div class="quiz-progress">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
        </div>
        <span class="progress-text"> Question {{ currentIndex + 1 }} sur {{ total }} </span>
      </div>
      <div class="quiz-score">
        <span class="score-text">Score: {{ score }}/{{ total }}</span>
      </div>
    </div>

    <div class="question-content">
      <div class="sentence-context">
        <h3 class="context-title">Phrase :</h3>
        <p class="russian-sentence">{{ sentence?.russian }}</p>
        <p class="french-sentence">{{ sentence?.french }}</p>
      </div>

      <div class="highlighted-word">
        <span
          class="word-highlight"
          :style="{ backgroundColor: getCaseColor(targetWord?.case || null) }"
        >
          {{ targetWord?.russian }}
        </span>
      </div>

      <div class="question-text">
        <h2>{{ quiz.question }}</h2>
      </div>
    </div>

    <div class="answer-options">
      <button
        v-for="option in quiz.options"
        :key="option.case"
        class="option-button"
        :class="{
          selected: selectedAnswer === option.case,
          correct: isAnswered && option.case === quiz.correct,
          incorrect: isAnswered && selectedAnswer === option.case && option.case !== quiz.correct,
          disabled: isAnswered,
        }"
        :disabled="isAnswered"
        @click="selectAnswer(option.case)"
      >
        <div class="option-content">
          <span class="option-label">{{ option.label }}</span>
          <div v-if="isAnswered && option.case === quiz.correct" class="check-icon">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div
            v-else-if="isAnswered && selectedAnswer === option.case && option.case !== quiz.correct"
            class="x-icon"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </button>
    </div>

    <div v-if="showExplanation" class="explanation">
      <div class="explanation-content">
        <h4 class="explanation-title">
          {{ isCorrect ? '✅ Correct !' : '❌ Incorrect' }}
        </h4>
        <p class="explanation-text">{{ quiz.explanation }}</p>
      </div>
    </div>

    <div class="quiz-actions">
      <button v-if="showExplanation" class="next-button" @click="$emit('next')">
        Question suivante
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Quiz, Sentence, Word } from '@/types'
import { useLessonStore } from '@/stores/lesson'

interface Props {
  quiz: Quiz
  currentIndex: number
  total: number
  score: number
  selectedAnswer: string | null
  isAnswered: boolean
  showExplanation: boolean
}

const emit = defineEmits<{
  selectAnswer: [answer: string]
  next: []
}>()

const props = defineProps<Props>()

const lessonStore = useLessonStore()

const sentence = computed(() => {
  return lessonStore.getSentenceById(props.quiz.sentenceId)
})

const targetWord = computed(() => {
  return lessonStore.getWordById(props.quiz.sentenceId, props.quiz.wordId)
})

const progress = computed(() => {
  return Math.round((props.currentIndex / props.total) * 100)
})

const isCorrect = computed(() => {
  return props.selectedAnswer === props.quiz.correct
})

function selectAnswer(answer: string) {
  if (!props.isAnswered) {
    // Add a small delay for visual feedback
    setTimeout(() => {
      lessonStore.hideTooltip() // Hide any open tooltips
    }, 100)
    emit('selectAnswer', answer)
  }
}

function getCaseColor(caseName: string | null): string {
  return lessonStore.getCaseColor(caseName)
}
</script>

<style scoped>
.quiz-question {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
}

.quiz-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.quiz-progress {
  flex: 1;
  margin-right: 2rem;
}

.progress-bar {
  background: #e5e7eb;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
  height: 100%;
  transition: width 0.6s ease;
}

.progress-text {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.quiz-score {
  background: #f3f4f6;
  padding: 0.5rem 1rem;
  border-radius: 8px;
}

.score-text {
  font-weight: 600;
  color: #374151;
}

.question-content {
  margin-bottom: 2rem;
}

.sentence-context {
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
}

.context-title {
  font-size: 1rem;
  font-weight: 600;
  color: #6b7280;
  margin: 0 0 1rem 0;
}

.russian-sentence {
  font-size: 1.5rem;
  font-weight: 500;
  color: #1f2937;
  font-family: 'Times New Roman', serif;
  margin-bottom: 0.5rem;
}

.french-sentence {
  font-size: 1.125rem;
  color: #6b7280;
  font-style: italic;
  margin: 0;
}

.highlighted-word {
  text-align: center;
  margin-bottom: 1.5rem;
}

.word-highlight {
  display: inline-block;
  color: white;
  font-size: 1.75rem;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-family: 'Times New Roman', serif;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.question-text h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  text-align: center;
  margin: 0;
}

.answer-options {
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;
}

.option-button {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  font-size: 1.125rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.option-button:hover:not(.disabled) {
  border-color: #3b82f6;
  background: #eff6ff;
  transform: translateY(-2px);
}

.option-button.selected:not(.correct):not(.incorrect) {
  border-color: #3b82f6;
  background: #dbeafe;
}

.option-button.correct {
  border-color: #10b981;
  background: #d1fae5;
  color: #065f46;
}

.option-button.incorrect {
  border-color: #ef4444;
  background: #fee2e2;
  color: #991b1b;
}

.option-button.disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.option-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.check-icon {
  color: #10b981;
}

.x-icon {
  color: #ef4444;
}

.explanation {
  background: #f0f9ff;
  border: 1px solid #e0f2fe;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.explanation-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #0c4a6e;
  margin: 0 0 0.75rem 0;
}

.explanation-text {
  color: #0369a1;
  line-height: 1.6;
  margin: 0;
}

.quiz-actions {
  text-align: center;
}

.next-button {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.75rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
}

.next-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 12px -2px rgba(59, 130, 246, 0.3);
}

@media (max-width: 768px) {
  .quiz-question {
    padding: 1.5rem;
  }

  .quiz-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .quiz-progress {
    margin-right: 0;
  }

  .russian-sentence {
    font-size: 1.25rem;
  }

  .word-highlight {
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
  }

  .question-text h2 {
    font-size: 1.25rem;
  }

  .option-button {
    padding: 0.75rem 1rem;
    font-size: 1rem;
  }
}
</style>
