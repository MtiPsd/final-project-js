import taskItem from "../components/TaskItem.js";
import { clearInput } from "../utils/utils.js";

/////////// DELETE ///////////
export function updateUIAfterDelete(taskId) {
  const taskLiElem = document.querySelector(
    `[data-id="${taskId}"]`,
  ).parentElement;
  if (taskLiElem) {
    taskLiElem.remove();
  }
}

/////////// UPDATE ///////////
export function updateUIAfterComplete(taskId) {
  const movedTaskLiElem = document.querySelector(
    `[data-id="${taskId}"]`,
  ).parentElement;
  if (movedTaskLiElem) {
    movedTaskLiElem.remove();
  }
}

/////////// ADD ///////////
export function updateUIAfterAdd(createdTask, input, list) {
  list.insertAdjacentHTML(
    "beforeend",
    taskItem({
      isCompleted: false,
      title: createdTask.title.toString(),
      id: createdTask.id,
    }),
  );
  clearInput(input);
}

/////////// EDIT ///////////
export function updateUIAfterEdit(taskId, newTitle) {
  const taskTitleElem = document.querySelector(
    `[data-id="${taskId}"]`,
  ).parentElement.firstElementChild;
  taskTitleElem.textContent = newTitle;
}

/////////// GET ///////////
export function updateUIAfterGet(tasks, list, isCompleted) {
  list.innerHTML = "";

  tasks.forEach(task => {
    list.insertAdjacentHTML(
      "beforeend",
      taskItem({
        isCompleted,
        title: task.title.toString(),
        id: task.id,
      }),
    );
  });
}
