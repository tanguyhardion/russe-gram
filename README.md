# RusseGram - Apprentissage des Cas Russes 🇷🇺

Une application Vue.js interactive pour apprendre les cas grammaticaux russes de manière ludique et efficace.

## 📋 Fonctionnalités

### 🎯 Mode Apprentissage
- **Phrases interactives** : Cliquez sur les mots colorés pour découvrir leur cas grammatical
- **Explications détaillées** : Chaque mot est accompagné d'une explication claire en français
- **Exemples contextuels** : Apprenez avec des phrases réelles et leurs traductions
- **Système de progression** : Marquez les phrases comme apprises pour suivre votre progression

### 🧠 Mode Quiz
- **Questions adaptatives** : Testez vos connaissances avec des quiz ciblés
- **Choix multiple** : Identifiez le bon cas grammatical parmi plusieurs options
- **Feedback immédiat** : Recevez des explications après chaque réponse
- **Sessions personnalisables** : Choisissez le nombre de questions (5, 10 ou 15)

### 🏆 Système de Gamification
- **Points et niveaux** : Gagnez des points pour chaque réponse correcte
- **Série quotidienne** : Maintenez votre motivation avec un suivi des jours consécutifs
- **Statistiques détaillées** : Suivez votre progression avec des métriques complètes

### 📚 Référence des Cas
- **6 cas grammaticaux** : Nominatif, Génitif, Datif, Accusatif, Instrumental, Prépositionnel
- **Codes couleur** : Chaque cas a sa propre couleur pour une identification rapide
- **Exemples multiples** : De nombreux exemples pour chaque cas grammatical

## 🚀 Installation et Démarrage

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone [url-du-repo]
cd russian-learning

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Ou pour construire pour la production
npm run build
```

### Scripts disponibles
- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Construit l'application pour la production
- `npm run preview` - Prévisualise la version de production
- `npm run type-check` - Vérifie les types TypeScript

## 🏗️ Architecture du Projet

### Structure des dossiers
```
src/
├── components/          # Composants réutilisables
│   ├── SentenceDisplay.vue    # Affichage des phrases avec mots cliquables
│   ├── WordTooltip.vue        # Tooltip d'explication des mots
│   ├── PointsCounter.vue      # Affichage des points et du niveau
│   └── QuizQuestion.vue       # Interface de question de quiz
├── views/               # Pages principales
│   ├── HomeView.vue           # Page d'accueil
│   ├── LearnView.vue          # Mode apprentissage
│   ├── QuizView.vue           # Mode quiz
│   └── AboutView.vue          # Page à propos
├── stores/              # Gestion d'état avec Pinia
│   ├── counter.ts             # Store utilisateur (points, progression)
│   ├── lesson.ts              # Store des leçons et phrases
│   └── quiz.ts                # Store des quiz
├── types/               # Définitions TypeScript
│   └── index.ts               # Interfaces et types
├── data/                # Données statiques
│   └── lessons.json           # Phrases, traductions et quiz
└── router/              # Configuration des routes
    └── index.ts               # Routes de l'application
```

### Technologies utilisées
- **Vue 3** avec Composition API et `<script setup>`
- **TypeScript** pour la sécurité des types
- **Pinia** pour la gestion d'état
- **Vue Router** pour la navigation
- **Vite** pour le bundling et le développement
- **CSS moderne** avec variables CSS et animations

## 🎨 Guide des Couleurs

Chaque cas grammatical a sa couleur distinctive :
- **Nominatif** : Bleu indigo (`#4F46E5`)
- **Génitif** : Rouge (`#DC2626`)
- **Datif** : Vert (`#059669`)
- **Accusatif** : Orange (`#D97706`)
- **Instrumental** : Violet (`#7C3AED`)
- **Prépositionnel** : Rose (`#BE185D`)

## 🔧 Personnalisation

### Ajouter de nouvelles phrases
Éditez le fichier `src/data/lessons.json` pour ajouter de nouvelles phrases avec leurs traductions et explications.

### Modifier le système de points
Ajustez les valeurs dans les stores (`src/stores/counter.ts` et `src/stores/quiz.ts`).

### Personnaliser l'interface
Les styles sont organisés par composant avec CSS scoped et variables CSS pour faciliter la personnalisation.

## 📱 Compatibilité

- **Navigateurs modernes** : Chrome, Firefox, Safari, Edge
- **Responsive Design** : Optimisé pour mobile, tablette et desktop
- **Accessibilité** : Support du clavier et lecteurs d'écran
- **PWA Ready** : Structure préparée pour une application web progressive

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité
3. Commitez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🎯 Objectifs Pédagogiques

L'application vise à :
- Simplifier l'apprentissage des cas russes pour les francophones
- Fournir une approche interactive et moderne
- Maintenir la motivation grâce à la gamification
- Offrir des explications claires et contextuelles
- Permettre un apprentissage progressif et adaptatif

---

**Bon apprentissage ! Удачи в изучении русского языка! 🇷🇺**
