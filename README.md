# Progressive Quiz Hub

Educational website with a strict guided flow:

**Grade selection → Subject selection → Topic selection → Quiz**

## Features

- Grade picker from **Year 2** to **A Levels**
- Subject and topic pickers for Maths, English, History, Geography, Science, and Technology
- **Unique quiz set per grade** for every subject/topic combination
- Difficulty progression by grade band: Year 2-4 easy, Year 5-6 medium, Year 7-11 difficult, A Levels very difficult
- Dynamic interface language switcher: **English, Arabic, Spanish, French**
- Subject wheel to randomly choose a subject at the subject-selection step
- Language switch affects navigation/UI labels and displayed subject/topic names
- Quiz engine with instant feedback, score tracking, final result panel, and reward unlock on perfect score
- Subject lock rule: once a subject is chosen, learners must finish all its topics before switching to a different subject
- Responsive layout for desktop and mobile

## Project structure

- `index.html` — app shell with language selector and step-based UI
- `assets/css/styles.css` — responsive styles + RTL support for Arabic UI
- `assets/js/questions.js` — curriculum model and generated per-grade question bank
- `assets/js/i18n.js` — interface translations and localized labels
- `assets/js/app.js` — state management, rendering, i18n wiring, and quiz behavior

## Run locally

Open `index.html` directly in a browser, or serve the folder with a static server.
