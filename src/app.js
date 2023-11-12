"use strict";

import getTodos from "./components/CurrentTasks.js";
import getDoneTasks from "./components/DoneTasks.js";
import { handleModal } from "./utils/utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const todosContent = document.getElementById("todos-content");
  const donesContent = document.getElementById("dones-content");
  const showCurrent = document.getElementById("current-toggle");
  const showDones = document.getElementById("done-toggle");

  // show items when page loads
  getTodos();

  let isShowingTodos = true;

  showCurrent.addEventListener("click", async () => {
    if (!isShowingTodos) {
      todosContent.style.display = "block";
      donesContent.style.display = "none";
      isShowingTodos = true;
      getTodos();
    }
  });

  showDones.addEventListener("click", async () => {
    if (isShowingTodos) {
      todosContent.style.display = "none";
      donesContent.style.display = "block";
      isShowingTodos = false;
      getDoneTasks();
    }
  });

  handleModal();
});
