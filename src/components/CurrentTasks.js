import {
  completeCurrentTaskService,
  createCurrentTaskService,
  deleteCurrentTaskService,
  getCurrentTasksService,
  updateCurrentTaskService,
} from "../services/tasksService.js";
import {
  updateUIAfterAdd,
  updateUIAfterComplete,
  updateUIAfterDelete,
  updateUIAfterEdit,
  updateUIAfterGet,
} from "../utils/utils.js";
import { closeModal, handleOpenModal } from "./Modal.js";

const todosContentList = document.getElementById(
  "content__list--todos",
);
const input = document.getElementById("task--input");
const addTaskBtn = document.getElementById("task--btn");
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

async function handleAddCurrentTask(e) {
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

handleOpenModal(todosContentList);

async function handleEditCurrentTask() {
  const title = modalInput.value.trim();
  const taskID = saveChangesBtn.dataset.id;

  if (title && taskID) {
    try {
      const updatedTask = { title };
      await updateCurrentTaskService(taskID, updatedTask);
      updateUIAfterEdit(taskID, title);
    } catch (error) {
      console.error("Error editing task:", error.message);
    }
  }

  closeModal(modal);
}

//////////////////// DELETE //////////////////

async function handleDeleteCurrentTask(e) {
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

async function handleCompleteCurrentTask(e) {
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
input.addEventListener("change", handleAddCurrentTask);
addTaskBtn.addEventListener("click", handleAddCurrentTask);
saveChangesBtn.addEventListener("click", handleEditCurrentTask);
todosContentList.addEventListener("click", handleDeleteCurrentTask);
todosContentList.addEventListener("click", handleCompleteCurrentTask);
// todosContentList.addEventListener("click", handleOpenModal);
