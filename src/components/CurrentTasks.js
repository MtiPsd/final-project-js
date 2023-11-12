import {
  completeTask,
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../services/tasksService.js";
import {
  clearInput,
  closeModal,
  openModal,
  updateUIAfterAdd,
  updateUIAfterComplete,
  updateUIAfterDelete,
  updateUIAfterEdit,
  updateUIAfterGet,
} from "../utils/utils.js";
import taskItem from "./TaskItem.js";

const todosContentList = document.getElementById(
  "content__list--todos",
);

const input = document.getElementById("task--input");
const addTaskBtn = document.getElementById("task--btn");
const modal = document.getElementById("modal");
const saveChangesBtn = document.getElementById("modal--save");
const modalInput = document.getElementById("modal-input");

//////////////////// Get ////////////////////

export default async function getTodos() {
  try {
    const tasks = await getTasks();
    updateUIAfterGet(tasks, todosContentList);
  } catch (error) {
    console.error("Error getting tasks:", error.message);
  }
}

//////////////////// ADD ////////////////////

async function addTask(e) {
  const title = e.target.value.trim();
  if (title) {
    try {
      const newTask = { title };
      const createdTask = await createTask(newTask);

      updateUIAfterAdd(createdTask, input, todosContentList);
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  }
}

//////////////////// EDIT //////////////////

let editingTaskId;

function openModalOnClick(e) {
  const target = e.target;
  if (target.matches("#icon--edit")) {
    editingTaskId = target.parentElement.dataset.id;
    openModal(modal);
  }
}

async function handleEdit() {
  const title = modalInput.value.trim();
  if (title && editingTaskId) {
    try {
      const updatedTask = { title };
      await updateTask(editingTaskId, updatedTask);
      updateUIAfterEdit(editingTaskId, title);
    } catch (error) {
      console.error("Error editing task:", error.message);
    }
  }

  closeModal(modal);
}

//////////////////// DELETE //////////////////

async function handleDelete(e) {
  const target = e.target;

  if (target.matches("#icon--delete")) {
    const taskId = target.parentElement.dataset.id;

    try {
      await deleteTask(taskId);
      updateUIAfterDelete(taskId);
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  }
}

//////////////////// COMPLETE //////////////////

async function handleComplete(e) {
  const target = e.target;

  if (target.matches("#icon--check")) {
    const taskId = target.parentElement.dataset.id;

    try {
      await completeTask(taskId);
      updateUIAfterComplete(taskId);
    } catch (error) {
      console.error("Error completing task:", error.message);
    }
  }
}

////////////////// LISTENERS //////////////////
input.addEventListener("change", addTask);
addTaskBtn.addEventListener("click", addTask);
todosContentList.addEventListener("click", openModalOnClick);
saveChangesBtn.addEventListener("click", handleEdit);
todosContentList.addEventListener("click", handleDelete);
todosContentList.addEventListener("click", handleComplete);
