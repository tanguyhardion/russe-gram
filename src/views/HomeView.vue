<template>
  <div class="home">
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">
          Apprenez les <span class="highlight">cas russes</span> en vous amusant
        </h1>
        <p class="hero-subtitle">
          Maîtrisez la grammaire russe grâce à des exercices interactifs et une approche ludique
        </p>
        <div class="hero-actions">
          <router-link to="/learn" class="cta-button primary">
            <span>Commencer à apprendre</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </router-link>
          <router-link to="/quiz" class="cta-button secondary">
            <span>Tester mes connaissances</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
          </router-link>
        </div>
      </div>
      <div class="hero-image">
        <div class="floating-cards">
          <div 
            v-for="(card, index) in previewCards"
            :key="card.case"
            class="preview-card"
            :style="{ 
              '--delay': `${index * 0.2}s`,
              '--color': card.color
            }"
          >
            <span class="card-text">{{ card.text }}</span>
            <span class="card-case">{{ card.case }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="stats-section">
      <PointsCounter />
    </div>

    <div class="features-section">
      <h2 class="section-title">Pourquoi choisir notre méthode ?</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">📚</div>
          <h3 class="feature-title">Apprentissage interactif</h3>
          <p class="feature-description">
            Cliquez sur les mots pour découvrir leurs cas grammaticaux et leurs explications détaillées
          </p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🎯</div>
          <h3 class="feature-title">Quiz adaptatifs</h3>
          <p class="feature-description">
            Testez vos connaissances avec des quiz intelligents qui s'adaptent à votre niveau
          </p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🏆</div>
          <h3 class="feature-title">Système de points</h3>
          <p class="feature-description">
            Gagnez des points et débloquez de nouveaux niveaux en progressant dans votre apprentissage
          </p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🔥</div>
          <h3 class="feature-title">Suivi des progrès</h3>
          <p class="feature-description">
            Maintenez votre motivation avec le suivi de votre série quotidienne et de vos statistiques
          </p>
        </div>
      </div>
    </div>

    <div class="cases-preview">
      <h2 class="section-title">Les 6 cas russes</h2>
      <div class="cases-grid">
        <div 
          v-for="(caseInfo, caseName) in lessonStore.cases"
          :key="caseName"
          class="case-card"
          :style="{ '--case-color': caseInfo.color }"
        >
          <div class="case-header">
            <h3 class="case-name">{{ caseInfo.name }}</h3>
          </div>
          <p class="case-description">{{ caseInfo.description }}</p>
          <div class="case-examples">
            <div 
              v-for="example in caseInfo.examples.slice(0, 1)"
              :key="example"
              class="case-example"
            >
              {{ example }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="cta-section">
      <div class="cta-content">
        <h2 class="cta-title">Prêt à commencer votre voyage ?</h2>
        <p class="cta-text">
          Rejoignez des milliers d'apprenants qui maîtrisent déjà les cas russes
        </p>
        <router-link to="/learn" class="cta-button large">
          Commencer maintenant
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import PointsCounter from '@/components/PointsCounter.vue'
import { useLessonStore } from '@/stores/lesson'

const lessonStore = useLessonStore()

const previewCards = computed(() => [
  { text: 'Я читаю', case: 'Nominatif', color: '#4F46E5' },
  { text: 'книгу', case: 'Accusatif', color: '#D97706' },
  { text: 'студенту', case: 'Datif', color: '#059669' },
  { text: 'о работе', case: 'Prépositionnel', color: '#BE185D' }
])
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-content {
  max-width: 500px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.highlight {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 1rem;
}

.cta-button.primary {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
}

.cta-button.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 12px -2px rgba(59, 130, 246, 0.3);
}

.cta-button.secondary {
  background: white;
  color: #374151;
  border: 2px solid #e5e7eb;
}

.cta-button.secondary:hover {
  border-color: #3b82f6;
  color: #3b82f6;
  transform: translateY(-2px);
}

.cta-button.large {
  padding: 1rem 2.5rem;
  font-size: 1.125rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
}

.cta-button.large:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(102, 126, 234, 0.4);
}

.hero-image {
  position: relative;
  height: 400px;
}

.floating-cards {
  position: relative;
  width: 100%;
  height: 100%;
}

.preview-card {
  position: absolute;
  background: white;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  animation: float 6s ease-in-out infinite;
  animation-delay: var(--delay);
  border-left: 4px solid var(--color);
}

.preview-card:nth-child(1) { top: 10%; left: 20%; }
.preview-card:nth-child(2) { top: 30%; right: 10%; }
.preview-card:nth-child(3) { bottom: 30%; left: 10%; }
.preview-card:nth-child(4) { bottom: 10%; right: 20%; }

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
}

.card-text {
  display: block;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  font-family: 'Times New Roman', serif;
}

.card-case {
  display: block;
  font-size: 0.875rem;
  color: var(--color);
  font-weight: 500;
  margin-top: 0.25rem;
}

.stats-section {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.features-section, .cases-preview {
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  color: #1f2937;
  margin-bottom: 3rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.feature-description {
  color: #6b7280;
  line-height: 1.6;
}

.cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.case-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border-left: 4px solid var(--case-color);
  transition: transform 0.2s ease;
}

.case-card:hover {
  transform: translateY(-3px);
}

.case-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--case-color);
  margin-bottom: 0.75rem;
}

.case-description {
  color: #4b5563;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.case-example {
  background: #f9fafb;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #374151;
  font-style: italic;
}

.cta-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.cta-text {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .hero-section {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
    padding: 2rem 1rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-actions {
    justify-content: center;
  }
  
  .cta-button {
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .features-grid, .cases-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-title {
    font-size: 2rem;
  }
}
</style>
