import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { UserProgress } from '@/types'

export const useUserStore = defineStore('user', () => {
  const progress = ref<UserProgress>({
    points: 0,
    level: 1,
    completedSentences: [],
    completedQuizzes: [],
    streak: 0,
    lastActivity: new Date().toISOString()
  })

  const pointsToNextLevel = computed(() => {
    return progress.value.level * 100 - (progress.value.points % (progress.value.level * 100))
  })

  const progressPercentage = computed(() => {
    const currentLevelBase = (progress.value.level - 1) * 100
    const currentLevelProgress = progress.value.points - currentLevelBase
    return Math.min((currentLevelProgress / (progress.value.level * 100)) * 100, 100)
  })

  function addPoints(points: number) {
    progress.value.points += points
    updateLevel()
    updateActivity()
  }

  function updateLevel() {
    const newLevel = Math.floor(progress.value.points / 100) + 1
    if (newLevel > progress.value.level) {
      progress.value.level = newLevel
    }
  }

  function completeSentence(sentenceId: number) {
    if (!progress.value.completedSentences.includes(sentenceId)) {
      progress.value.completedSentences.push(sentenceId)
      addPoints(10)
      updateStreak()
    }
  }

  function completeQuiz(quizId: number, isCorrect: boolean) {
    if (!progress.value.completedQuizzes.includes(quizId)) {
      progress.value.completedQuizzes.push(quizId)
      addPoints(isCorrect ? 20 : 5)
      updateStreak()
    }
  }

  function updateStreak() {
    const today = new Date().toDateString()
    const lastActivity = new Date(progress.value.lastActivity).toDateString()
    
    if (today === lastActivity) {
      // Same day, no change to streak
      return
    }
    
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    
    if (lastActivity === yesterday.toDateString()) {
      // Consecutive day
      progress.value.streak += 1
    } else {
      // Streak broken
      progress.value.streak = 1
    }
    
    updateActivity()
  }

  function updateActivity() {
    progress.value.lastActivity = new Date().toISOString()
  }

  function resetProgress() {
    progress.value = {
      points: 0,
      level: 1,
      completedSentences: [],
      completedQuizzes: [],
      streak: 0,
      lastActivity: new Date().toISOString()
    }
  }

  return {
    progress,
    pointsToNextLevel,
    progressPercentage,
    addPoints,
    completeSentence,
    completeQuiz,
    resetProgress
  }
})
