import taskItem from "../components/TaskItem.js";

export function clearInput(input) {
  input.value = "";
  input.focus();
}

export function handleDelegation(e, selector, actionCallback) {
  const target = e.target;

  if (target.matches(selector)) {
    const taskId = target.parentElement.dataset.id;
    actionCallback(taskId);
  }
}

////////////////////////////////////////////////////////////

export function updateUIAfterDelete(taskId) {
  const taskLiElem = document.querySelector(
    `[data-id="${taskId}"]`,
  ).parentElement;
  if (taskLiElem) {
    taskLiElem.remove();
  }
}

export function updateUIAfterComplete(taskId) {
  const movedTaskLiElem = document.querySelector(
    `[data-id="${taskId}"]`,
  ).parentElement;
  if (movedTaskLiElem) {
    movedTaskLiElem.remove();
  }
}

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

export function updateUIAfterEdit(taskId, newTitle) {
  const taskTitleElem = document.querySelector(
    `[data-id="${taskId}"]`,
  ).parentElement.firstElementChild;
  taskTitleElem.textContent = newTitle;
}

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

export function updateUIAfterUndo(taskId) {
  const completedTask = document.querySelector(
    `[data-id="${taskId}"]`,
  ).parentElement;

  if (completedTask) {
    completedTask.remove();
  }
}

export function showLoading(taskId) {
  document
    .querySelector(`[data-id="${taskId}"]`)
    .parentElement.classList.add("loading");
}

export function hideLoading(taskId) {
  document
    .querySelector(`[data-id="${taskId}"]`)
    .parentElement.classList.remove("loading");
}

export function showCurrentSpinner(contentList) {
  contentList.style.display = "none";
  document
    .querySelector(".content__spinner--current")
    .classList.add("spinner");
}

export function hideCurrentSpinner(contentList) {
  contentList.style.display = "block";
  document
    .querySelector(".content__spinner--current")
    .classList.remove("spinner");
}

export function showCompletedSpinner(contentList) {
  contentList.style.display = "none";
  document
    .querySelector(".content__spinner--completed")
    .classList.add("spinner");
}

export function hideCompletedSpinner(contentList) {
  contentList.style.display = "block";
  document
    .querySelector(".content__spinner--completed")
    .classList.remove("spinner");
}
