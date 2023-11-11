"use strict";

import renderTodosUI from "./components/CurrentTasks.js";
import renderDonesUI from "./components/DoneTasks.js";

document.addEventListener("DOMContentLoaded", () => {
  const todosContent = document.getElementById("todos-content");
  const donesContent = document.getElementById("dones-content");
  const showCurrent = document.getElementById("current-toggle");
  const showDones = document.getElementById("done-toggle");

  // show items when page loads
  renderTodosUI();

  let isShowingTodos = true;

  showCurrent.addEventListener("click", async () => {
    if (!isShowingTodos) {
      todosContent.style.display = "block";
      donesContent.style.display = "none";
      isShowingTodos = true;
      renderTodosUI();
    }
  });

  showDones.addEventListener("click", async () => {
    if (isShowingTodos) {
      todosContent.style.display = "none";
      donesContent.style.display = "block";
      isShowingTodos = false;
      renderDonesUI();
    }
  });
});

///////////////////////// Modal /////////////////////////

document.getElementById("btn").addEventListener("click", function () {
  document.getElementById("modal").style.display = "block";
});

// document
//   .getElementById("closeModalBtn")
//   .addEventListener("click", function () {
//     document.getElementById("myModal").style.display = "none";
//   });

window.addEventListener("click", function (event) {
  if (event.target === document.getElementById("modal")) {
    document.getElementById("modal").style.display = "none";
  }
});
