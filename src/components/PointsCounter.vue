<template>
  <div class="points-counter">
    <div class="points-display">
      <div class="points-main">
        <div class="points-icon">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        </div>
        <div class="points-text">
          <span class="points-value">{{ userStore.progress.points }}</span>
          <span class="points-label">points</span>
        </div>
      </div>
      
      <div class="level-info">
        <div class="level-badge">
          Niveau {{ userStore.progress.level }}
        </div>
        <div class="progress-bar">
          <div 
            class="progress-fill"
            :style="{ width: `${userStore.progressPercentage}%` }"
          ></div>
        </div>
        <div class="progress-text">
          {{ userStore.pointsToNextLevel }} points jusqu'au niveau suivant
        </div>
      </div>
    </div>

    <div class="stats">
      <div class="stat-item">
        <div class="stat-icon">🔥</div>
        <div class="stat-info">
          <span class="stat-value">{{ userStore.progress.streak }}</span>
          <span class="stat-label">jours</span>
        </div>
      </div>
      
      <div class="stat-item">
        <div class="stat-icon">📚</div>
        <div class="stat-info">
          <span class="stat-value">{{ userStore.progress.completedSentences.length }}</span>
          <span class="stat-label">phrases</span>
        </div>
      </div>
      
      <div class="stat-item">
        <div class="stat-icon">🎯</div>
        <div class="stat-info">
          <span class="stat-value">{{ userStore.progress.completedQuizzes.length }}</span>
          <span class="stat-label">quiz</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/counter'

const userStore = useUserStore()
</script>

<style scoped>
.points-counter {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 1.5rem;
  color: white;
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
}

.points-display {
  margin-bottom: 1.5rem;
}

.points-main {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.points-icon {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.75rem;
  border-radius: 12px;
  color: #fbbf24;
}

.points-text {
  display: flex;
  flex-direction: column;
}

.points-value {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
}

.points-label {
  font-size: 0.875rem;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.level-info {
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.level-badge {
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.progress-bar {
  background: rgba(255, 255, 255, 0.2);
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  background: linear-gradient(90deg, #fbbf24, #f59e0b);
  height: 100%;
  border-radius: 4px;
  transition: width 0.6s ease;
}

.progress-text {
  font-size: 0.75rem;
  text-align: center;
  opacity: 0.9;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.stat-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  backdrop-filter: blur(10px);
  transition: transform 0.2s ease;
}

.stat-item:hover {
  transform: translateY(-2px);
}

.stat-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1;
}

.stat-label {
  font-size: 0.75rem;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

@media (max-width: 768px) {
  .points-counter {
    padding: 1rem;
  }
  
  .points-main {
    gap: 0.75rem;
  }
  
  .points-value {
    font-size: 1.5rem;
  }
  
  .stats {
    gap: 0.75rem;
  }
  
  .stat-item {
    padding: 0.75rem;
  }
  
  .stat-icon {
    font-size: 1.25rem;
  }
  
  .stat-value {
    font-size: 1rem;
  }
}
</style>
