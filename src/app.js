"use strict";

import { getCurrentTasks } from "./components/CurrentTasks.js";
import { getCompletedTasks } from "./components/CompletedTasks.js";
import { handleModal } from "./utils/utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const todosContent = document.getElementById("todos-content");
  const donesContent = document.getElementById("dones-content");
  const showCurrent = document.getElementById("current-toggle");
  const showDones = document.getElementById("done-toggle");

  getCurrentTasks();

  let isShowingTodos = true;

  showCurrent.addEventListener("click", async () => {
    if (!isShowingTodos) {
      todosContent.style.display = "block";
      donesContent.style.display = "none";
      isShowingTodos = true;
      getCurrentTasks();
    }
  });

  showDones.addEventListener("click", async () => {
    if (isShowingTodos) {
      todosContent.style.display = "none";
      donesContent.style.display = "block";
      isShowingTodos = false;
      getCompletedTasks();
    }
  });

  handleModal();
});
