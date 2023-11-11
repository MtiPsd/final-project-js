"use strict";

import taskItem from "./components/TaskItem.js";
import { handleNavigation } from "./routes/route.js";
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

window.addEventListener("hashchange", handleNavigation);
