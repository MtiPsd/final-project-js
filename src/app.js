"use strict";

import renderTodosUI from "./components/CurrentTasks.js";
import renderDonesUI from "./components/DoneTasks.js";
// import renderDonesUI from "./components/DoneTasks.js";

document.addEventListener("DOMContentLoaded", async () => {
  displayContent();
});

///////////////////////////////////////////////

function displayContent() {
  const todosContent = document.getElementById("todos-content");
  const donesContent = document.getElementById("dones-content");
  const showCurrent = document.getElementById("current-toggle");
  const showDones = document.getElementById("done-toggle");

  let isShowingTodos = true; // Initial state

  showCurrent.addEventListener("click", () => {
    if (!isShowingTodos) {
      todosContent.style.display = "block";
      donesContent.style.display = "none";
      isShowingTodos = true;
      renderTodosUI();
    }
  });

  showDones.addEventListener("click", () => {
    if (isShowingTodos) {
      todosContent.style.display = "none";
      donesContent.style.display = "block";
      isShowingTodos = false;
      renderDonesUI();
    }
  });
}
