import taskItem from "../components/TaskItem.js";

export function clearInput(input) {
  input.value = "";
  input.focus();
}

export function handleModal() {
  const modal = document.getElementById("modal");

  document
    .getElementById("modal--cancel")
    .addEventListener("click", function () {
      modal.style.display = "none";
    });

  document
    .getElementById("close-modal-btn")
    .addEventListener("click", function () {
      modal.style.display = "none";
    });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}

export function closeModal(modal) {
  modal.style.display = "none";
}

export function openModal(modal) {
  modal.style.display = "block";
}

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
      isDone: false,
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

export function updateUIAfterGet(tasks, list) {
  list.innerHTML = "";

  tasks.forEach(task => {
    list.insertAdjacentHTML(
      "beforeend",
      taskItem({
        isDone: false,
        title: task.title.toString(),
        id: task.id,
      }),
    );
  });
}
