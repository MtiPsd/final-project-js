import {
  deleteCompletedTaskService,
  getCompletedTasksService,
  undoCompletedTaskService,
} from "../services/tasksService.js";
import { updateUIAfterUndo } from "../ui/CompletedTasksUI.js";
import {
  updateUIAfterDelete,
  updateUIAfterGet,
} from "../ui/CurrentTasksUI.js";
import {
  hideCompletedSpinner,
  showCompletedSpinner,
  showLoading,
  toggleAllTasksCompleted,
} from "../utils/utils.js";

const completedContentList = document.getElementById(
  "content__list--completed",
);

//////////////////// GET ////////////////////

export async function getCompletedTasks() {
  try {
    showCompletedSpinner(completedContentList);
    const tasks = await getCompletedTasksService();
    updateUIAfterGet(tasks, completedContentList, true);
    toggleAllTasksCompleted(tasks);
  } catch (error) {
    console.error("Error getting completed tasks:", error.message);
  } finally {
    hideCompletedSpinner(completedContentList);
  }
}

//////////////////// UNDO ////////////////////

async function handlerUndoCompletedTask(e) {
  const target = e.target;

  if (target.matches("#completed__icon--undo")) {
    const taskId = target.parentElement.dataset.id;

    try {
      showLoading(taskId);
      await undoCompletedTaskService(taskId);
      updateUIAfterUndo(taskId);
      const tasks = await getCompletedTasksService();
      toggleAllTasksCompleted(tasks);
    } catch (error) {
      console.error("Error undo the task:", error.message);
    }
  }
}

//////////////////// DELETE ////////////////////

async function handleDeleteCompletedTask(e) {
  const target = e.target;

  if (target.matches("#completed__icon--delete")) {
    const taskId = target.parentElement.dataset.id;

    try {
      showLoading(taskId);
      await deleteCompletedTaskService(taskId);
      updateUIAfterDelete(taskId);
      const tasks = await getCompletedTasksService();
      toggleAllTasksCompleted(tasks);
    } catch (error) {
      console.error("Error undo the task:", error.message);
    }
  }
}

////////////////// LISTENERS //////////////////
completedContentList.addEventListener(
  "click",
  handlerUndoCompletedTask,
);
completedContentList.addEventListener(
  "click",
  handleDeleteCompletedTask,
);
