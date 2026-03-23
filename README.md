# Saakshi Kobarne — Portfolio

Minimalist developer portfolio built with React + Vite + Tailwind CSS v4.

## Stack
- **React 19** — UI
- **Vite 6** — build tool  
- **Tailwind CSS v4** — utility styling via `@tailwindcss/vite` plugin

## Project Structure
```
src/
├── components/
│   ├── Sidebar.jsx       # Fixed left nav (desktop) + bottom nav (mobile)
│   ├── Hero.jsx          # Intro with typing animation
│   ├── Experience.jsx    # Work experience
│   ├── Projects.jsx      # Project cards grid
│   ├── Education.jsx     # Education
│   ├── Social.jsx        # Social links + testimonials
│   ├── Footer.jsx
│   ├── SectionLabel.jsx  # Shared section heading
│   └── TechTag.jsx       # Shared tech pill
├── data/
│   └── index.js          # All portfolio content — edit here
├── hooks/
│   ├── useReveal.js      # Scroll reveal via IntersectionObserver
│   └── useTyping.js      # Typewriter animation
├── App.jsx
├── main.jsx
└── index.css
```

## Getting Started
```bash
npm install
npm run dev
```

## Customise
All content is in **`src/data/index.js`** — edit your name, roles, experience, projects, education, social links, and testimonials there.

## Deploy
```bash
npm run build
# drop dist/ on Netlify, Vercel, or GitHub Pages
```
