import {
  deleteDone,
  getDones,
  undoDone,
} from "../services/tasksService.js";
import taskItem from "./TaskItem.js";

const undoDoneBtn = document.getElementById("done__icon--undo");
const deleteDoneBtn = document.getElementById("done__icon--delete");
const completedContentList = document.getElementById(
  "content__list--dones",
);

export default async function getDoneTasks() {
  try {
    const tasks = await getDones();
    createDoneTasks(tasks);
  } catch (error) {
    console.error("Error getting completed tasks:", error.message);
  }
}

function createDoneTasks(tasks) {
  completedContentList.innerHTML = "";

  tasks.forEach(task => {
    completedContentList.insertAdjacentHTML(
      "beforeend",
      taskItem({
        isDone: true,
        title: task.title.toString(),
        id: task.id,
      }),
    );
  });
}

async function undoCompletedTask(e) {
  const target = e.target;

  if (target.matches("#done__icon--undo")) {
    const taskId = target.parentElement.dataset.id;

    try {
      undoDone(taskId);

      const completedTask = document.querySelector(
        `[data-id="${taskId}"]`,
      ).parentElement;

      if (completedTask) {
        completedTask.remove();
      }
    } catch (error) {
      console.error("Error undo the task:", error.message);
    }
  }
}

function deleteCompletedTask(e) {
  const target = e.target;

  if (target.matches("#done__icon--delete")) {
    const taskId = target.parentElement.dataset.id;

    try {
      deleteDone(taskId);

      const completedTask = document.querySelector(
        `[data-id="${taskId}"]`,
      ).parentElement;

      if (completedTask) {
        completedTask.remove();
      }
    } catch (error) {
      console.error("Error undo the task:", error.message);
    }
  }
}

////////////////// LISTENERS //////////////////
completedContentList.addEventListener("click", undoCompletedTask);
completedContentList.addEventListener("click", deleteCompletedTask);
