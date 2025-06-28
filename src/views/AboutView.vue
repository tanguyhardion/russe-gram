<template>
  <div class="about">
    <div class="about-container">
      <div class="about-header">
        <h1 class="about-title">À propos de RusseGram</h1>
        <p class="about-subtitle">Votre compagnon pour maîtriser les cas grammaticaux russes</p>
      </div>

      <div class="about-content">
        <section class="mission-section">
          <h2 class="section-title">Notre Mission</h2>
          <p class="section-text">
            RusseGram a été créé pour simplifier l'apprentissage des cas russes, l'un des aspects
            les plus complexes de la grammaire russe. Notre approche interactive et ludique vous
            aide à comprendre et mémoriser les six cas grammaticaux de manière intuitive.
          </p>
        </section>

        <section class="features-section">
          <h2 class="section-title">Nos Fonctionnalités</h2>
          <div class="features-grid">
            <div class="feature-item">
              <div class="feature-icon">🎯</div>
              <h3>Apprentissage ciblé</h3>
              <p>Chaque mot est expliqué dans son contexte avec des exemples concrets</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">🎮</div>
              <h3>Gamification</h3>
              <p>Système de points et niveaux pour maintenir votre motivation</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">📱</div>
              <h3>Interface moderne</h3>
              <p>Design responsive et intuitive pour tous les appareils</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">🇫🇷</div>
              <h3>En français</h3>
              <p>Toutes les explications sont en français pour les francophones</p>
            </div>
          </div>
        </section>

        <section class="cases-section">
          <h2 class="section-title">Les 6 Cas Russes</h2>
          <p class="section-text">
            Le russe utilise six cas grammaticaux qui déterminent la fonction des noms, pronoms et
            adjectifs dans une phrase :
          </p>
          <div class="cases-list">
            <div class="case-item">
              <span class="case-name" style="color: #4f46e5">Nominatif</span>
              <span class="case-desc">Le sujet de la phrase</span>
            </div>
            <div class="case-item">
              <span class="case-name" style="color: #dc2626">Génitif</span>
              <span class="case-desc">La possession, la négation</span>
            </div>
            <div class="case-item">
              <span class="case-name" style="color: #059669">Datif</span>
              <span class="case-desc">L'objet indirect, le destinataire</span>
            </div>
            <div class="case-item">
              <span class="case-name" style="color: #d97706">Accusatif</span>
              <span class="case-desc">L'objet direct, la direction</span>
            </div>
            <div class="case-item">
              <span class="case-name" style="color: #7c3aed">Instrumental</span>
              <span class="case-desc">L'instrument, le moyen</span>
            </div>
            <div class="case-item">
              <span class="case-name" style="color: #be185d">Prépositionnel</span>
              <span class="case-desc">Après certaines prépositions</span>
            </div>
          </div>
        </section>

        <section class="tech-section">
          <h2 class="section-title">Technologie</h2>
          <p class="section-text">
            RusseGram est développé avec Vue.js 3, TypeScript, et Pinia pour offrir une expérience
            utilisateur moderne et performante. L'application utilise les dernières technologies web
            pour garantir rapidité et fiabilité.
          </p>
        </section>

        <section class="contact-section">
          <h2 class="section-title">Contact</h2>
          <p class="section-text">
            Vous avez des questions, suggestions, ou souhaitez contribuer au projet ? N'hésitez pas
            à nous contacter !
          </p>
          <div class="contact-actions">
            <a href="mailto:contact@russegram.com" class="contact-button">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>Nous contacter</span>
            </a>
            <router-link to="/" class="contact-button secondary">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span>Retour à l'accueil</span>
            </router-link>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// About page - no reactive data needed
</script>

<style scoped>
.about {
  min-height: 100vh;
  background: linear-gradient(135deg, #f6f9fc 0%, #eef7ff 100%);
}

.about-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.about-header {
  text-align: center;
  margin-bottom: 4rem;
}

.about-title {
  font-size: 3rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 1rem;
}

.about-subtitle {
  font-size: 1.25rem;
  color: #6b7280;
  margin: 0;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

section {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.section-text {
  color: #4b5563;
  line-height: 1.7;
  font-size: 1.125rem;
  margin: 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.feature-item {
  text-align: center;
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature-item h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.75rem;
}

.feature-item p {
  color: #6b7280;
  line-height: 1.5;
  margin: 0;
}

.cases-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}

.case-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  border-left: 4px solid currentColor;
}

.case-name {
  font-weight: 600;
  font-size: 1.125rem;
}

.case-desc {
  color: #6b7280;
  font-style: italic;
}

.contact-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.contact-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 1rem;
}

.contact-button:not(.secondary) {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
}

.contact-button:not(.secondary):hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 12px -2px rgba(59, 130, 246, 0.3);
}

.contact-button.secondary {
  background: white;
  color: #374151;
  border: 2px solid #e5e7eb;
}

.contact-button.secondary:hover {
  border-color: #3b82f6;
  color: #3b82f6;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .about-container {
    padding: 1rem;
  }

  .about-title {
    font-size: 2rem;
  }

  section {
    padding: 1.5rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .case-item {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }

  .contact-actions {
    flex-direction: column;
    align-items: center;
  }

  .contact-button {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
}
</style>
