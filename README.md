# Ember · Todo List

A production-ready todo list with a **glassmorphism** UI and **red/orange fire** accents.
Built with React 19.3, Tailwind CSS v4.3 (CSS-first `@theme` config) and Vite 8.

## Features

- ✅ Add todos (empty input is rejected with a shake animation + inline error)
- ✅ Toggle complete/incomplete (gradient check, strikethrough + dimmed glass)
- ✏️ Inline edit — double-click a todo, use the pencil button, Enter to save, Esc to cancel
- 🗑️ Delete with a smooth "burnout" exit animation
- 🔀 Filter: All / Active / Done (with live counts)
- 🔥 Active-task counter in the footer
- 💾 Persists to `localStorage` (`ember-todos:v1`) — survives page refreshes, validates corrupted data
- 🎨 Glass panels, backdrop blur, animated ambient glows, fire gradient title, micro-interactions

## Project structure

```
├── index.html                  # App shell, Inter font, flame favicon
├── package.json
├── vite.config.js              # Vite 8 + @vitejs/plugin-react + @tailwindcss/vite
└── src
    ├── main.jsx                # Entry point (StrictMode)
    ├── App.jsx                 # Composition + filter state
    ├── index.css               # Tailwind v4 theme: fire palette, glass utilities, keyframes
    ├── hooks
    │   └── useTodos.js         # Todo state + localStorage persistence
    └── components
        ├── BackgroundGlows.jsx # Animated ambient glow blobs
        ├── FilterBar.jsx       # All / Active / Done pill tabs with counts
        ├── Icons.jsx           # Inline SVG icon set
        ├── TodoForm.jsx        # Add form with validation
        ├── TodoItem.jsx        # Toggle / inline edit / delete
        └── TodoList.jsx        # List + empty states
```

## Getting started

```bash
npm install
npm run dev      # → http://localhost:5173
```

Production build:

```bash
npm run build    # outputs to dist/
npm run preview  # serve the production build locally
```

## Notes

- Tailwind v4 is configured entirely in `src/index.css` (`@import "tailwindcss"` +
  `@theme`), so there is **no `tailwind.config.js`** — the custom `flame` color ramp,
  `glass-*` textures, shadow tokens and keyframe animations all live there.
- React 19.3 with function components and hooks only; no other dependencies.
