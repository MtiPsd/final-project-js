"use strict";

import taskItem from "./components/TaskItem.js";
import { createTask, getTasks } from "./services/tasksService.js";

// document.addEventListener("DOMContentLoaded", async () => {
//   // const input = document.getElementById("task--input");
//   // const checkBtn = document.getElementById("icon--check");
//   // const editBtn = document.getElementById("icon--edit");
//   // const undoBtn = document.getElementById("done__icon--undo");
//   // const deleteBtn = document.getElementById("icon--delete");
//   // checkBtn.addEventListener("click", onCheck);
//   // editBtn?.addEventListener("click", onEdit);
//   // undoBtn?.addEventListener("click", onUndo);
//   // deleteBtn?.addEventListener("click", onDelete);

//   const tasks = await getTasks();
//   renderTodosUI(tasks);
// });

// const contentList = document.getElementById("content__list");

// function renderTodosUI(tasks) {
//   contentList.innerHTML = "";

//   tasks.forEach(task => {
//     contentList.insertAdjacentHTML(
//       "beforeend",
//       taskItem({
//         isDone: false,
//         title: task.title.toString(),
//         onCheck: () => {
//           console.log("checked");
//         },
//       }),
//     );
//   });
// }

// function renderDonesUI(tasks) {
//   contentList.innerHTML = "";

//   tasks.forEach(task => {
//     contentList.insertAdjacentHTML(
//       "beforeend",
//       taskItem({
//         isDone: true,
//         title: task.title.toString(),
//       }),
//     );
//   });
// }

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
    }
  });

  showDones.addEventListener("click", () => {
    if (isShowingTodos) {
      todosContent.style.display = "none";
      donesContent.style.display = "block";
      isShowingTodos = false;
    }
  });
}
