import {
  createTask,
  getTasks,
  updateTask,
} from "../services/tasksService.js";
import { clearInput } from "../utils/utils.js";

import taskItem from "./TaskItem.js";

const contentList = document.getElementById("content__list");
const input = document.getElementById("task--input");
const addTaskBtn = document.getElementById("task--btn");
const completeBtn = document.getElementById("icon--check");
const editBtn = document.getElementById("icon--edit");
const deleteBtn = document.getElementById("icon--delete");

export default async function renderTodosUI() {
  const tasks = await getTasks();
  createCurrentTasks(tasks);
}

function createCurrentTasks(tasks) {
  contentList.innerHTML = "";

  tasks.forEach(task => {
    contentList.insertAdjacentHTML(
      "beforeend",
      taskItem({
        isDone: false,
        title: task.title.toString(),
        id: task.id,
      }),
    );
  });
}

//////////////////// ADD //////////////////

function addTask(e) {
  const title = e.target.value.trim();
  const newTask = { title };
  createTask(newTask);
  renderTodosUI();
  clearInput(input);
}

//////////////////// EDIT //////////////////

function editTask(e) {
  const title = e.target.value.trim();
  const taskId = this.parentElement.dataset.id;
  const updatedTask = { title };

  updateTask(taskId, updatedTask);
  renderTodosUI();
}

//////////////////// DELETE //////////////////

////////////////// LISTENERS //////////////////
input.addEventListener("change", addTask);
addTaskBtn.addEventListener("click", addTask);
// editBtn.addEventListener("click", editTask);
// deleteBtn.addEventListener("click", editTask);
