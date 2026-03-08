const editor = document.getElementById("editor");
const fileNameLabel = document.getElementById("file-name");

let currentFilePath = null;

function updateFileNameLabel(path) {
  if (!path) {
    fileNameLabel.textContent = "untitled.md";
    return;
  }

  const parts = path.split(/[\\/]/);
  fileNameLabel.textContent = parts[parts.length - 1];
}

async function handleOpenFile() {
  try {
    const result = await window.zenWriter.openFile();
    if (result?.canceled) return;

    currentFilePath = result.filePath || null;
    editor.value = result.content ?? "";
    updateFileNameLabel(currentFilePath);
  } catch (err) {
    console.error("Failed to open file", err);
  }
}

async function handleSaveFile(options = {}) {
  try {
    const result = await window.zenWriter.saveFile(editor.value, options);
    if (result?.canceled) return;

    currentFilePath = result.filePath || null;
    updateFileNameLabel(currentFilePath);
  } catch (err) {
    console.error("Failed to save file", err);
  }
}

window.addEventListener("keydown", (event) => {
  const isMeta = event.metaKey || event.ctrlKey;

  if (!isMeta) return;

  if (event.code === "KeyO") {
    event.preventDefault();
    handleOpenFile();
  } else if (event.code === "KeyS" && !event.shiftKey) {
    event.preventDefault();
    handleSaveFile({ saveAs: false });
  } else if (event.code === "KeyS" && event.shiftKey) {
    event.preventDefault();
    handleSaveFile({ saveAs: true });
  } else if (event.code === "KeyW") {
    event.preventDefault();
    window.close();
  }
});

// Focus the editor on load for instant typing.
window.addEventListener("DOMContentLoaded", () => {
  editor?.focus();
});

