# Instagram Stories Clone

A mobile-only Instagram Stories experience built with React and TypeScript.

# Live Demo

## 📦 Tech Stack

- React (Vite)
- TypeScript
- Custom CSS (no external libraries)
- React Hooks (`useEffect`, `useState`)
- Jest + React Testing Library

# Getting Started

1.  Clone the repository

git clone https://github.com/rahul2891/instagram_stories_feature.git
npm install
npm run dev
npm run test

# Folder structure

src/
├── components/ # UI Components
├── types/ # TypeScript types
├── data/ # Mock JSON for users + stories
├── App.tsx # Main app component
└── main.tsx # Entry point

# Performance Optimizations

1. Story image loading is lazy-loaded to improve mobile performance.

2. Used React.memo on thumbnail components to prevent unnecessary re-renders.

3. Transition animations between stories for smooth UX.

4. Efficient useRef + setTimeout for auto-advance logic with clear cleanup.

# Features Implemented

Horizontally scrollable story list (thumbnail view)
Left/right navigation
Auto-advance every 5 seconds
Individual progress bars per story
Responsive layout for mobile
Loading indicators + graceful image handling
