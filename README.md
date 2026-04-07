# Progressive Quiz Hub

An educational website in English with a structured navigation flow:

**Grade selection → Subject selection → Topic selection → Quiz**

## Features

- Grade picker from **Year 2** to **A Levels**
- Subject picker (Maths, English, History, Geography, Science, Technology)
- Topic picker inside each subject
- Topic-specific quizzes with level-adapted questions
- Instant answer feedback and live score tracking
- Final score summary with retry and restart actions
- Responsive interface for desktop, tablet, and mobile

## Project structure

- `index.html` — single interactive app shell for all steps
- `assets/css/styles.css` — global responsive styling
- `assets/js/questions.js` — curriculum metadata + topic question builders
- `assets/js/app.js` — step navigation and quiz engine
- `reward.html` and `reward-win.html` — reward pages (legacy flow)

## Run locally

Open `index.html` directly in a browser, or use a simple static server.
