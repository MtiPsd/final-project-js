"use strict";

import { getCurrentTasks } from "./components/CurrentTasks.js";
import { getCompletedTasks } from "./components/CompletedTasks.js";
import { handleModal } from "./utils/utils.js";

document.addEventListener("DOMContentLoaded", async () => {
  const todosContent = document.getElementById("todos-content");
  const completedContent = document.getElementById(
    "completed-content",
  );
  const showCurrent = document.getElementById("current-toggle");
  const showcompleted = document.getElementById("completed-toggle");

  await getCurrentTasks();

  let isShowingTodos = true;

  showCurrent.addEventListener("click", async () => {
    if (!isShowingTodos) {
      todosContent.style.display = "block";
      completedContent.style.display = "none";
      isShowingTodos = true;
      await getCurrentTasks();
    }
  });

  showcompleted.addEventListener("click", async () => {
    if (isShowingTodos) {
      todosContent.style.display = "none";
      completedContent.style.display = "block";
      isShowingTodos = false;
      await getCompletedTasks();
    }
  });

  handleModal();
});
