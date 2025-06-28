<template>
  <Teleport to="body">
    <div 
      v-if="visible"
      class="tooltip-backdrop"
      @click="$emit('close')"
    >
      <div
        class="word-tooltip"
        :style="tooltipStyle"
        @click.stop
      >
        <div class="tooltip-header">
          <div class="word-info">
            <span class="russian-word">{{ word.russian }}</span>
            <span class="french-word">{{ word.french }}</span>
          </div>
          <button 
            class="close-button"
            @click="$emit('close')"
            aria-label="Fermer"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div v-if="word.case" class="case-info">
          <div class="case-badge" :style="{ backgroundColor: caseColor }">
            {{ caseName }}
          </div>
          <p class="case-description">{{ caseDescription }}</p>
        </div>

        <div class="explanation">
          <h4 class="explanation-title">Explication</h4>
          <p class="explanation-text">{{ word.explanation }}</p>
        </div>

        <div v-if="word.case && caseExamples" class="examples">
          <h4 class="examples-title">Exemples</h4>
          <ul class="examples-list">
            <li v-for="example in caseExamples" :key="example" class="example-item">
              {{ example }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import type { Word } from '@/types'
import { useLessonStore } from '@/stores/lesson'

interface Props {
  word: Word
  position: { x: number; y: number }
}

defineEmits<{
  close: []
}>()

const props = defineProps<Props>()

const lessonStore = useLessonStore()
const visible = ref(false)

const caseColor = computed(() => {
  return lessonStore.getCaseColor(props.word.case)
})

const caseName = computed(() => {
  if (!props.word.case) return ''
  return lessonStore.cases[props.word.case]?.name || ''
})

const caseDescription = computed(() => {
  if (!props.word.case) return ''
  return lessonStore.cases[props.word.case]?.description || ''
})

const caseExamples = computed(() => {
  if (!props.word.case) return []
  return lessonStore.cases[props.word.case]?.examples || []
})

const tooltipStyle = computed(() => {
  const { x, y } = props.position
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  
  // Tooltip dimensions (approximate)
  const tooltipWidth = 350
  const tooltipHeight = 300
  
  let left = x - tooltipWidth / 2
  let top = y - tooltipHeight - 20
  
  // Adjust horizontal position if it goes off-screen
  if (left < 20) {
    left = 20
  } else if (left + tooltipWidth > viewportWidth - 20) {
    left = viewportWidth - tooltipWidth - 20
  }
  
  // Adjust vertical position if it goes off-screen
  if (top < 20) {
    top = y + 40 // Show below the word instead
  }
  
  return {
    left: `${left}px`,
    top: `${top}px`,
    maxWidth: `${Math.min(tooltipWidth, viewportWidth - 40)}px`
  }
})

onMounted(() => {
  // Small delay for smooth animation
  setTimeout(() => {
    visible.value = true
  }, 10)
})

function handleEscape(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    lessonStore.hideTooltip()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>
.tooltip-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;
  backdrop-filter: blur(2px);
}

.word-tooltip {
  position: fixed;
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  padding: 1.5rem;
  max-width: 350px;
  z-index: 1001;
  animation: tooltipFadeIn 0.2s ease-out;
  border: 2px solid #f3f4f6;
}

@keyframes tooltipFadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.tooltip-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.word-info {
  display: flex;
  flex-direction: column;
}

.russian-word {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  font-family: 'Times New Roman', serif;
}

.french-word {
  font-size: 1.125rem;
  color: #6b7280;
  font-style: italic;
  margin-top: 0.25rem;
}

.close-button {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
}

.close-button:hover {
  color: #6b7280;
  background: #f3f4f6;
}

.case-info {
  margin-bottom: 1rem;
}

.case-badge {
  display: inline-block;
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  margin-bottom: 0.5rem;
}

.case-description {
  color: #4b5563;
  font-size: 0.875rem;
  margin: 0;
}

.explanation {
  margin-bottom: 1rem;
}

.explanation-title {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.5rem 0;
}

.explanation-text {
  color: #4b5563;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
}

.examples {
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
}

.examples-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.5rem 0;
}

.examples-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.example-item {
  color: #6b7280;
  font-size: 0.8rem;
  line-height: 1.4;
  margin-bottom: 0.25rem;
  padding-left: 1rem;
  position: relative;
}

.example-item::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #9ca3af;
}

@media (max-width: 768px) {
  .word-tooltip {
    max-width: calc(100vw - 2rem);
    left: 1rem !important;
    right: 1rem;
    width: auto;
  }
}
</style>
