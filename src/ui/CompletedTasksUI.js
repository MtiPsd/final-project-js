/////////// UNDO ///////////
export function updateUIAfterUndo(taskId) {
  const completedTask = document.querySelector(
    `[data-id="${taskId}"]`,
  ).parentElement;

  if (completedTask) {
    completedTask.remove();
  }
}
