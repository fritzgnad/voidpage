# VoidPage

VoidPage is a tiny, distraction‑free Markdown editor built with Electron.  
It shows a single page floating in a dark starry background and keeps UI chrome to a minimum.

## Features

- **Open files**: ⌘O / Ctrl+O  
- **Save**: ⌘S / Ctrl+S  
- **Save As…**: ⇧⌘S / Ctrl+Shift+S  
- Supports **Markdown** (`.md`, `.markdown`) and **plain text** (`.txt`) files.

## Getting started

```bash
# install dependencies
npm install

# run the app
npm start
```

## Packaging for macOS

VoidPage uses `electron-builder` to create a macOS `.app`, DMG, and ZIP:

```bash
CSC_IDENTITY_AUTO_DISCOVERY=false npm run dist
```

This produces artifacts in `dist/` such as:

- `VoidPage-1.0.0-arm64.dmg`
- `VoidPage-1.0.0-arm64-mac.zip` (contains `VoidPage.app`)

The build is **unsigned**, so the first launch may require using  
“Open Anyway” in **System Settings → Privacy & Security** or right‑click → **Open**.

## Project structure

- `main.js` – Electron main process and file open/save dialogs  
- `preload.js` – Safe bridge exposing `window.zenWriter.openFile` / `window.zenWriter.saveFile`  
- `index.html` – Minimal editor layout  
- `styles.css` – Dark, starry background and page styling  
- `renderer.js` – Keyboard shortcuts and editor behavior  

## License

MIT

