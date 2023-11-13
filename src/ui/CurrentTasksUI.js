import taskItem from "../components/TaskItem.js";
import { clearInput } from "../utils/utils.js";

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

/////////// ADD ///////////

export function updateUIAfterAdd(task, input, list) {
  if (task) {
    list.insertAdjacentHTML(
      "beforeend",
      taskItem({
        isCompleted: false,
        title: task.title.toString(),
        id: task.id,
      }),
    );
  }
  clearInput(input);
}

/////////// DELETE ///////////
export function updateUIAfterDelete(taskId) {
  if (taskId) {
    const taskLiElem = document.querySelector(
      `[data-id="${taskId}"]`,
    ).parentElement;
    if (taskLiElem) {
      taskLiElem.remove();
    }
  }
}

/////////// UPDATE ///////////
export function updateUIAfterComplete(taskId) {
  if (taskId) {
    const movedTaskLiElem = document.querySelector(
      `[data-id="${taskId}"]`,
    ).parentElement;
    if (movedTaskLiElem) {
      movedTaskLiElem.remove();
    }
  }
}

/////////// EDIT ///////////
export function updateUIAfterEdit(taskId, newTitle) {
  const taskTitleElem = document.querySelector(
    `[data-id="${taskId}"]`,
  ).parentElement.firstElementChild;
  taskTitleElem.textContent = newTitle;
}
