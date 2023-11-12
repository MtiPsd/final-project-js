import {
  completeTask,
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../services/tasksService.js";
import { clearInput, closeModal, openModal } from "../utils/utils.js";
import taskItem from "./TaskItem.js";

const todosContentList = document.getElementById(
  "content__list--todos",
);
const doneContentList = document.getElementById(
  "content__list--dones",
);
const input = document.getElementById("task--input");
const addTaskBtn = document.getElementById("task--btn");
const completeBtn = document.getElementById("icon--check");
const editBtn = document.getElementById("icon--edit");
const deleteBtn = document.getElementById("icon--delete");
const modal = document.getElementById("modal");
const saveChangesBtn = document.getElementById("modal--save");
const modalInput = document.getElementById("modal-input");

//////////////////// Get ////////////////////

export default async function getTodos() {
  try {
    const tasks = await getTasks();
    // Update UI
    renderTodosUI(tasks);
  } catch (error) {
    console.error("Error getting tasks:", error.message);
  }
}

function renderTodosUI(tasks) {
  todosContentList.innerHTML = "";

  tasks.forEach(task => {
    todosContentList.insertAdjacentHTML(
      "beforeend",
      taskItem({
        isDone: false,
        title: task.title.toString(),
        id: task.id,
      }),
    );
  });
}

//////////////////// ADD ////////////////////

async function addTask(e) {
  const title = e.target.value.trim();
  if (title) {
    try {
      const newTask = { title };
      const createdTask = await createTask(newTask);

      // Update UI with the newly created task
      todosContentList.insertAdjacentHTML(
        "beforeend",
        taskItem({
          isDone: false,
          title: createdTask.title.toString(),
          id: createdTask.id,
        }),
      );

      clearInput(input);
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  }
}

//////////////////// EDIT //////////////////

function openModalOnClick(e) {
  const target = e.target;
  if (target.matches("#icon--edit")) {
    const taskId = target.parentElement.dataset.id;
    saveChangesBtn.dataset.id = taskId;
    openModal(modal);
  }
}

async function onEdit() {
  const taskId = saveChangesBtn.dataset.id;
  const title = modalInput.value.trim();
  if (title && taskId) {
    try {
      const updatedTask = { title };
      await updateTask(taskId, updatedTask);

      // Update UI
      const taskTitle = document.querySelector(
        `[data-id="${taskId}"]`,
      ).parentElement.firstElementChild;
      taskTitle.textContent = title;
    } catch (error) {
      console.error("Error editing task:", error.message);
    }
  }

  closeModal(modal);
}

//////////////////// DELETE //////////////////

function onDelete(e) {
  const target = e.target;

  if (target.matches("#icon--delete")) {
    const taskId = target.parentElement.dataset.id;

    try {
      deleteTask(taskId);
      // Update UI after a successful delete
      const taskLiElem = document.querySelector(
        `[data-id="${taskId}"]`,
      ).parentElement;

      if (taskLiElem) {
        taskLiElem.remove();
      }
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  }
}

//////////////////// COMPLETE //////////////////

async function onCheck(e) {
  const target = e.target;

  if (target.matches("#icon--check")) {
    const taskId = target.parentElement.dataset.id;

    try {
      const movedItem = await completeTask(taskId);

      const movedTaskLiElem = document.querySelector(
        `[data-id="${taskId}"]`,
      ).parentElement;

      if (movedTaskLiElem) {
        movedTaskLiElem.remove();
      }
    } catch (error) {
      console.error("Error checking task:", error.message);
    }
  }
}

////////////////// LISTENERS //////////////////
input.addEventListener("change", addTask);
addTaskBtn.addEventListener("click", addTask);
todosContentList.addEventListener("click", openModalOnClick);
saveChangesBtn.addEventListener("click", onEdit);
todosContentList.addEventListener("click", onDelete);
todosContentList.addEventListener("click", onCheck);
