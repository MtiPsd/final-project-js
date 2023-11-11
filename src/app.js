"use strict";

contentList.insertAdjacentHTML(
  "beforeend",
  taskItem({
    isDone: false,
    title: "title",
  }),
);

function onCheck(e) {
  const newTodo = {
    id: 1,
    title: "Buy groceries",
  };

  createTask(newTodo);
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("task--input");
  const checkBtn = document.getElementById("icon--check");
  const editBtn = document.getElementById("icon--edit");
  const undoBtn = document.getElementById("done__icon--undo");
  const deleteBtn = document.getElementById("icon--delete");

  console.log(checkBtn);
  checkBtn.addEventListener("click", onCheck);
  // editBtn?.addEventListener("click", onEdit);
  // undoBtn?.addEventListener("click", onUndo);
  // deleteBtn?.addEventListener("click", onDelete);
});
