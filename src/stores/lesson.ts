import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { LessonData, Sentence, Word, AppState } from '@/types'
import lessonsData from '@/data/lessons.json'

export const useLessonStore = defineStore('lesson', () => {
  // Load lesson data
  const data = ref<LessonData>(lessonsData as LessonData)
  
  // Application state
  const appState = ref<AppState>({
    currentSentence: null,
    selectedWord: null,
    showTooltip: false,
    tooltipPosition: { x: 0, y: 0 }
  })

  // Computed getters
  const sentences = computed(() => data.value.sentences)
  const cases = computed(() => data.value.cases)
  const currentSentence = computed(() => appState.value.currentSentence)
  const selectedWord = computed(() => appState.value.selectedWord)
  const showTooltip = computed(() => appState.value.showTooltip)
  const tooltipPosition = computed(() => appState.value.tooltipPosition)

  // Actions
  function setSentence(sentence: Sentence) {
    appState.value.currentSentence = sentence
    hideTooltip()
  }

  function selectWord(word: Word, position: { x: number; y: number }) {
    appState.value.selectedWord = word
    appState.value.tooltipPosition = position
    appState.value.showTooltip = true
  }

  function hideTooltip() {
    appState.value.showTooltip = false
    appState.value.selectedWord = null
  }

  function getSentenceById(id: number): Sentence | undefined {
    return data.value.sentences.find(sentence => sentence.id === id)
  }

  function getWordById(sentenceId: number, wordId: number): Word | undefined {
    const sentence = getSentenceById(sentenceId)
    return sentence?.words.find(word => word.id === wordId)
  }

  function getRandomSentence(): Sentence {
    const randomIndex = Math.floor(Math.random() * data.value.sentences.length)
    return data.value.sentences[randomIndex]
  }

  function getCaseColor(caseName: string | null): string {
    if (!caseName || !data.value.cases[caseName]) {
      return '#6B7280' // Default gray color
    }
    return data.value.cases[caseName].color
  }

  return {
    data,
    sentences,
    cases,
    currentSentence,
    selectedWord,
    showTooltip,
    tooltipPosition,
    setSentence,
    selectWord,
    hideTooltip,
    getSentenceById,
    getWordById,
    getRandomSentence,
    getCaseColor
  }
})
