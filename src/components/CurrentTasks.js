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
} from "../ui/CurrentTasksUI.js";
import {
  hideCurrentSpinner,
  hideLoading,
  removeNoTasksMessage,
  showCurrentSpinner,
  showLoading,
  toggleNoTasksMessage,
} from "../utils/utils.js";
import {
  clearModalInput,
  closeModal,
  handleOpenModal,
} from "./Modal.js";
import { showErrorAlert } from "./Noty.js";

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
    showCurrentSpinner(todosContentList);
    const tasks = await getCurrentTasksService();
    updateUIAfterGet(tasks, todosContentList);
    toggleNoTasksMessage(tasks);
  } catch (error) {
    console.error("Error getting tasks:", error);
  } finally {
    hideCurrentSpinner(todosContentList);
  }
}

//////////////////// ADD ////////////////////

async function handleAddCurrentTask(e) {
  const title = input.value.trim();
  const id = crypto.randomUUID();
  removeNoTasksMessage();

  if (e.key === "Enter" || e.type === "click") {
    if (title) {
      try {
        showCurrentSpinner(todosContentList);
        const newTask = { title, id };
        const createdTask = await createCurrentTaskService(newTask);
        updateUIAfterAdd(createdTask, input, todosContentList);
      } catch (error) {
        console.error("Error adding task:", error);
      } finally {
        hideCurrentSpinner(todosContentList);
      }
    } else {
      showErrorAlert("Input is empty");
    }
  }
}

//////////////////// EDIT //////////////////

handleOpenModal(todosContentList);

async function handleEditCurrentTask() {
  const title = modalInput.value.trim();
  const taskId = saveChangesBtn.dataset.id;
  if (title && taskId) {
    try {
      showLoading(taskId);
      const updatedTask = { title };
      await updateCurrentTaskService(taskId, updatedTask);
      updateUIAfterEdit(taskId, title);
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      hideLoading(taskId);
      clearModalInput(modalInput);
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
      showLoading(taskId);
      await deleteCurrentTaskService(taskId);
      updateUIAfterDelete(taskId);
      const tasks = await getCurrentTasksService();
      toggleNoTasksMessage(tasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }
}

//////////////////// COMPLETE //////////////////

async function handleCompleteCurrentTask(e) {
  const target = e.target;

  if (target.matches("#icon--check")) {
    const taskId = target.parentElement.dataset.id;

    try {
      showLoading(taskId);
      await completeCurrentTaskService(taskId);
      updateUIAfterComplete(taskId);
      const tasks = await getCurrentTasksService();
      toggleNoTasksMessage(tasks);
    } catch (error) {
      console.error("Error completing task:", error);
    }
  }
}

////////////////// LISTENERS //////////////////
input.addEventListener("keydown", handleAddCurrentTask);
addTaskBtn.addEventListener("click", handleAddCurrentTask);
saveChangesBtn.addEventListener("click", handleEditCurrentTask);
todosContentList.addEventListener("click", handleDeleteCurrentTask);
todosContentList.addEventListener("click", handleCompleteCurrentTask);
