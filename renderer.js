const editor = document.getElementById("editor");
const fileNameLabel = document.getElementById("file-name");

let isDirty = false;

function updateFileNameLabel(path) {
  if (!path) {
    fileNameLabel.textContent = "untitled.md";
    return;
  }

  const parts = path.split(/[\\/]/);
  fileNameLabel.textContent = parts[parts.length - 1];
}

// Returns true when it is safe to discard the editor content, asking the
// user to save first if there are unsaved changes. Saving a document that
// has no file path yet opens the save dialog.
async function confirmDiscardChanges() {
  if (!isDirty) return true;

  const { choice } = await window.zenWriter.confirmUnsaved(fileNameLabel.textContent);

  if (choice === "cancel") return false;

  if (choice === "save") {
    const result = await window.zenWriter.saveFile(editor.value, { saveAs: false });
    if (result?.canceled) return false;

    updateFileNameLabel(result.filePath || null);
  }

  return true;
}

async function handleNewFile() {
  try {
    if (!(await confirmDiscardChanges())) return;

    await window.zenWriter.newFile();
    isDirty = false;
    editor.value = "";
    updateFileNameLabel(null);
    editor.focus();
  } catch (err) {
    console.error("Failed to create new file", err);
  }
}

async function handleOpenFile() {
  try {
    if (!(await confirmDiscardChanges())) return;

    const result = await window.zenWriter.openFile();
    if (result?.canceled) return;

    isDirty = false;
    editor.value = result.content ?? "";
    updateFileNameLabel(result.filePath || null);
  } catch (err) {
    console.error("Failed to open file", err);
  }
}

async function handleSaveFile(options = {}) {
  try {
    const result = await window.zenWriter.saveFile(editor.value, options);
    if (result?.canceled) return;

    isDirty = false;
    updateFileNameLabel(result.filePath || null);
  } catch (err) {
    console.error("Failed to save file", err);
  }
}

editor.addEventListener("input", () => {
  isDirty = true;
});

window.addEventListener("keydown", (event) => {
  const isMeta = event.metaKey || event.ctrlKey;

  if (!isMeta) return;

  if (event.code === "KeyN") {
    event.preventDefault();
    handleNewFile();
  } else if (event.code === "KeyO") {
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

