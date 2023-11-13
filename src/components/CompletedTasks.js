import {
  deleteCompletedTaskService,
  getCompletedTasksService,
  undoCompletedTaskService,
} from "../services/tasksService.js";
import {
  hideCompletedSpinner,
  hideLoading,
  showCompletedSpinner,
  showLoading,
  updateUIAfterDelete,
  updateUIAfterGet,
  updateUIAfterUndo,
} from "../utils/utils.js";

const completedContentList = document.getElementById(
  "content__list--dones",
);

//////////////////// GET ////////////////////

export async function getCompletedTasks() {
  try {
    showCompletedSpinner(completedContentList);
    const tasks = await getCompletedTasksService();
    updateUIAfterGet(tasks, completedContentList, true);
  } catch (error) {
    console.error("Error getting completed tasks:", error.message);
  } finally {
    hideCompletedSpinner(completedContentList);
  }
}

//////////////////// UNDO ////////////////////

async function handlerUndoCompletedTask(e) {
  const target = e.target;

  if (target.matches("#done__icon--undo")) {
    const taskId = target.parentElement.dataset.id;

    try {
      showLoading(taskId);
      await undoCompletedTaskService(taskId);
      updateUIAfterUndo(taskId);
    } catch (error) {
      console.error("Error undo the task:", error.message);
    }
  }
}

//////////////////// DELETE ////////////////////

async function handleDeleteCompletedTask(e) {
  const target = e.target;

  if (target.matches("#done__icon--delete")) {
    const taskId = target.parentElement.dataset.id;

    try {
      showLoading(taskId);
      await deleteCompletedTaskService(taskId);
      updateUIAfterDelete(taskId);
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
