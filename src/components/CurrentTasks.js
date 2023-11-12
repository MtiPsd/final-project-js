import {
  completeCurrentTaskService,
  createCurrentTaskService,
  deleteCurrentTaskService,
  getCurrentTasksService,
  updateCurrentTaskService,
} from "../services/tasksService.js";
import {
  closeModal,
  openModal,
  updateUIAfterAdd,
  updateUIAfterComplete,
  updateUIAfterDelete,
  updateUIAfterEdit,
  updateUIAfterGet,
} from "../utils/utils.js";

const todosContentList = document.getElementById(
  "content__list--todos",
);
const input = document.getElementById("task--input");
const addTaskBtn = document.getElementById("task--btn");
const modal = document.getElementById("modal");
const saveChangesBtn = document.getElementById("modal--save");
const modalInput = document.getElementById("modal-input");

//////////////////// GET ////////////////////

export async function getCurrentTasks() {
  try {
    const tasks = await getCurrentTasksService();
    updateUIAfterGet(tasks, todosContentList);
  } catch (error) {
    console.error("Error getting tasks:", error.message);
  }
}

//////////////////// ADD ////////////////////

async function handleAddCurrentTasks(e) {
  const title = e.target.value.trim();
  if (title) {
    try {
      const newTask = { title };
      const createdTask = await createCurrentTaskService(newTask);

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

async function handleEditCurrentTasks() {
  const title = modalInput.value.trim();
  if (title && editingTaskId) {
    try {
      const updatedTask = { title };
      await updateCurrentTaskService(editingTaskId, updatedTask);
      updateUIAfterEdit(editingTaskId, title);
    } catch (error) {
      console.error("Error editing task:", error.message);
    }
  }

  closeModal(modal);
}

//////////////////// DELETE //////////////////

async function handleDeleteCurrentTasks(e) {
  const target = e.target;

  if (target.matches("#icon--delete")) {
    const taskId = target.parentElement.dataset.id;

    try {
      await deleteCurrentTaskService(taskId);
      updateUIAfterDelete(taskId);
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  }
}

//////////////////// COMPLETE //////////////////

async function handleCompleteCurrentTasks(e) {
  const target = e.target;

  if (target.matches("#icon--check")) {
    const taskId = target.parentElement.dataset.id;

    try {
      await completeCurrentTaskService(taskId);
      updateUIAfterComplete(taskId);
    } catch (error) {
      console.error("Error completing task:", error.message);
    }
  }
}

////////////////// LISTENERS //////////////////
input.addEventListener("change", handleAddCurrentTasks);
addTaskBtn.addEventListener("click", handleAddCurrentTasks);
todosContentList.addEventListener("click", openModalOnClick);
saveChangesBtn.addEventListener("click", handleEditCurrentTasks);
todosContentList.addEventListener("click", handleDeleteCurrentTasks);
todosContentList.addEventListener(
  "click",
  handleCompleteCurrentTasks,
);
