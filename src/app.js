"use strict";

import renderTodosUI from "./components/CurrentTasks.js";
import renderDonesUI from "./components/DoneTasks.js";

document.addEventListener("DOMContentLoaded", async () => {
  const todosContent = document.getElementById("todos-content");
  const donesContent = document.getElementById("dones-content");
  const showCurrent = document.getElementById("current-toggle");
  const showDones = document.getElementById("done-toggle");

  // show items when page loads
  await renderTodosUI();

  let isShowingTodos = true;

  showCurrent.addEventListener("click", async () => {
    if (!isShowingTodos) {
      todosContent.style.display = "block";
      donesContent.style.display = "none";
      isShowingTodos = true;
      await renderTodosUI();
    }
  });

  showDones.addEventListener("click", async () => {
    if (isShowingTodos) {
      todosContent.style.display = "none";
      donesContent.style.display = "block";
      isShowingTodos = false;
      await renderDonesUI();
    }
  });
});
