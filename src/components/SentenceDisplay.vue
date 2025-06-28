<template>
  <div class="sentence-display">
    <div class="sentence-container">
      <h2 class="sentence-title">Phrase en russe</h2>
      <div class="russian-sentence">
        <span
          v-for="(word, index) in sentence.words"
          :key="word.id"
          :class="[
            'word',
            { 'clickable': word.case, 'highlighted': selectedWord?.id === word.id }
          ]"
          :style="{ '--case-color': getCaseColor(word.case) }"
          @click="handleWordClick(word, $event)"
        >
          {{ word.russian }}{{ index < sentence.words.length - 1 ? ' ' : '' }}
        </span>
      </div>
      
      <div class="translation">
        <h3 class="translation-title">Traduction française</h3>
        <p class="french-sentence">{{ sentence.french }}</p>
      </div>
    </div>

    <!-- Word Tooltip -->
    <WordTooltip
      v-if="showTooltip && selectedWord"
      :word="selectedWord"
      :position="tooltipPosition"
      @close="hideTooltip"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Sentence, Word } from '@/types'
import { useLessonStore } from '@/stores/lesson'
import WordTooltip from './WordTooltip.vue'

interface Props {
  sentence: Sentence
}

defineProps<Props>()

const lessonStore = useLessonStore()

const selectedWord = computed(() => lessonStore.selectedWord)
const showTooltip = computed(() => lessonStore.showTooltip)
const tooltipPosition = computed(() => lessonStore.tooltipPosition)

function handleWordClick(word: Word, event: MouseEvent) {
  if (!word.case) return
  
  const rect = (event.target as HTMLElement).getBoundingClientRect()
  const position = {
    x: rect.left + rect.width / 2,
    y: rect.top - 10
  }
  
  lessonStore.selectWord(word, position)
}

function getCaseColor(caseName: string | null): string {
  return lessonStore.getCaseColor(caseName)
}

function hideTooltip() {
  lessonStore.hideTooltip()
}
</script>

<style scoped>
.sentence-display {
  position: relative;
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.sentence-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
}

.russian-sentence {
  font-size: 2rem;
  font-weight: 500;
  line-height: 1.4;
  color: #1f2937;
  margin-bottom: 2rem;
  font-family: 'Times New Roman', serif;
}

.word {
  display: inline;
  transition: all 0.2s ease;
  border-radius: 4px;
  padding: 2px 4px;
}

.word.clickable {
  cursor: pointer;
  position: relative;
}

.word.clickable:hover {
  background-color: var(--case-color);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.word.highlighted {
  background-color: var(--case-color);
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.translation {
  border-top: 2px solid #f3f4f6;
  padding-top: 1.5rem;
}

.translation-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 0.75rem;
}

.french-sentence {
  font-size: 1.5rem;
  color: #4b5563;
  font-style: italic;
  margin: 0;
}

@media (max-width: 768px) {
  .sentence-display {
    padding: 1.5rem;
  }
  
  .russian-sentence {
    font-size: 1.5rem;
  }
  
  .french-sentence {
    font-size: 1.25rem;
  }
}
</style>
