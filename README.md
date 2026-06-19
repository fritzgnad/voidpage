# VoidPage

VoidPage is a tiny, distraction‑free Markdown editor built with Electron.  
It shows a single page floating in a dark starry background and keeps UI chrome to a minimum.

## Why minimalism

Most writing tools compete for your attention with the very thing you came to do: write. Toolbars, sidebars, notifications, formatting menus, AI suggestions — each one is a small invitation to stop thinking and start fiddling. In an age engineered for interruption, focus has quietly become the scarce resource. The blank page is hard enough without the software adding friction.

VoidPage takes the opposite bet. There is one page, one cursor, and the dark. No menus to learn, no settings to tune, no chrome to ignore. The void around the page isn't decoration — it's the point: a space with nothing to click means there is nothing to do but write. Minimalism here isn't an aesthetic, it's a way of protecting attention. Strip away everything optional and what's left is you and the words.

## Features

- **New file**: ⌘N / Ctrl+N  
- **Open files**: ⌘O / Ctrl+O  
- **Save**: ⌘S / Ctrl+S  
- **Save As…**: ⇧⌘S / Ctrl+Shift+S  
- Unsaved‑changes prompt before opening, creating, or closing  
- Supports **Markdown** (`.md`, `.markdown`) and **plain text** (`.txt`) files.

## Getting started

```bash
# install dependencies
npm install

# run the app
npm start
```

## Packaging for macOS

VoidPage uses `electron-builder` to create a signed, notarized macOS `.app`, DMG, and ZIP:

```bash
npm run dist
```

This produces artifacts in `dist/` for both `arm64` and `x64`, such as:

- `VoidPage-1.0.4-arm64.dmg`
- `VoidPage-1.0.4-arm64-mac.zip` (contains `VoidPage.app`)

Releases are built and notarized automatically by GitHub Actions on every `v*` tag.

## Project structure

- `main.js` – Electron main process and file open/save dialogs  
- `preload.js` – Safe bridge exposing `window.zenWriter.*` (new/open/save/confirm)  
- `index.html` – Minimal editor layout  
- `styles.css` – Dark, starry background and page styling  
- `renderer.js` – Keyboard shortcuts and editor behavior  

## License

ISC
