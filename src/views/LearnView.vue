<template>
  <div class="learn-view">
    <div class="learn-container">
      <div class="learn-header">
        <h1 class="learn-title">Mode Apprentissage</h1>
        <p class="learn-subtitle">
          Cliquez sur les mots colorés pour découvrir leurs cas grammaticaux
        </p>
        <div class="points-mini">
          <span class="points-value">{{ userStore.progress.points }} points</span>
          <span class="level-badge">Niveau {{ userStore.progress.level }}</span>
        </div>
      </div>

      <div class="lesson-content">
        <div v-if="currentSentence" class="lesson-main">
          <SentenceDisplay :sentence="currentSentence" />

          <div class="lesson-actions">
            <button class="action-button secondary" @click="loadRandomSentence">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Nouvelle phrase
            </button>

            <button class="action-button primary" @click="completeSentence" :disabled="isCompleted">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {{ isCompleted ? 'Terminé' : 'Marquer comme apprise' }}
            </button>

            <router-link to="/quiz" class="action-button accent">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              Passer au quiz
            </router-link>
          </div>
        </div>

        <div v-else class="loading-state">
          <div class="loading-spinner"></div>
          <p>Chargement de la leçon...</p>
        </div>
      </div>

      <div class="cases-reference">
        <h2 class="reference-title">Référence des cas</h2>
        <div class="cases-grid">
          <div
            v-for="(caseInfo, caseName) in lessonStore.cases"
            :key="caseName"
            class="case-reference-card"
            :style="{ '--case-color': caseInfo.color }"
          >
            <div class="case-reference-header">
              <h3 class="case-reference-name">{{ caseInfo.name }}</h3>
            </div>
            <p class="case-reference-description">{{ caseInfo.description }}</p>
            <div class="case-reference-examples">
              <div
                v-for="example in caseInfo.examples"
                :key="example"
                class="case-reference-example"
              >
                {{ example }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useLessonStore } from '@/stores/lesson'
import { useUserStore } from '@/stores/counter'
import SentenceDisplay from '@/components/SentenceDisplay.vue'

const lessonStore = useLessonStore()
const userStore = useUserStore()

const currentSentence = computed(() => lessonStore.currentSentence)

const isCompleted = computed(() => {
  if (!currentSentence.value) return false
  return userStore.progress.completedSentences.includes(currentSentence.value.id)
})

function loadRandomSentence() {
  const sentence = lessonStore.getRandomSentence()
  lessonStore.setSentence(sentence)
}

function completeSentence() {
  if (currentSentence.value && !isCompleted.value) {
    userStore.completeSentence(currentSentence.value.id)
  }
}

onMounted(() => {
  if (!currentSentence.value) {
    loadRandomSentence()
  }
})
</script>

<style scoped>
.learn-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #f6f9fc 0%, #eef7ff 100%);
}

.learn-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.learn-header {
  text-align: center;
  margin-bottom: 3rem;
}

.learn-title {
  font-size: 3rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 1rem;
}

.learn-subtitle {
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

.lesson-content {
  margin-bottom: 4rem;
}

.lesson-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.action-button {
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
}

.action-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-button.primary {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3);
}

.action-button.primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 12px -2px rgba(16, 185, 129, 0.3);
}

.action-button.secondary {
  background: white;
  color: #374151;
  border: 2px solid #e5e7eb;
}

.action-button.secondary:hover {
  border-color: #3b82f6;
  color: #3b82f6;
  transform: translateY(-2px);
}

.action-button.accent {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  box-shadow: 0 4px 6px -1px rgba(245, 158, 11, 0.3);
}

.action-button.accent:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 12px -2px rgba(245, 158, 11, 0.3);
}

.loading-state {
  text-align: center;
  padding: 4rem 2rem;
}

.loading-spinner {
  width: 3rem;
  height: 3rem;
  border: 3px solid #e5e7eb;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.cases-reference {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.reference-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  text-align: center;
  margin-bottom: 2rem;
}

.cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.case-reference-card {
  background: #f9fafb;
  border-radius: 12px;
  padding: 1.5rem;
  border-left: 4px solid var(--case-color);
  transition: transform 0.2s ease;
}

.case-reference-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.case-reference-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--case-color);
  margin-bottom: 0.75rem;
}

.case-reference-description {
  color: #4b5563;
  line-height: 1.5;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.case-reference-examples {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.case-reference-example {
  background: white;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.8rem;
  color: #374151;
  font-style: italic;
  border: 1px solid #e5e7eb;
}

@media (max-width: 768px) {
  .learn-container {
    padding: 1rem;
  }

  .learn-title {
    font-size: 2rem;
  }

  .points-mini {
    flex-direction: column;
    gap: 0.5rem;
  }

  .lesson-actions {
    flex-direction: column;
    align-items: center;
  }

  .action-button {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }

  .cases-grid {
    grid-template-columns: 1fr;
  }
}
</style>
