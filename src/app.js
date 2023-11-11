"use strict";

import taskItem from "./components/TaskItem.js";
import { createTask, getTasks } from "./services/tasksService.js";

document.addEventListener("DOMContentLoaded", async () => {
  displayContent();

  renderUI();
});

const contentList = document.getElementById("content__list");

async function renderUI() {
  const tasks = await getTasks();
  createCurrentTasks(tasks);
  console.log(tasks);
}

function createCurrentTasks(tasks) {
  contentList.innerHTML = "";

  tasks.forEach(task => {
    contentList.insertAdjacentHTML(
      "beforeend",
      taskItem({
        isDone: false,
        title: task.title.toString(),
      }),
    );
  });
}

function createDoneTasks(tasks) {
  contentList.innerHTML = "";

  tasks.forEach(task => {
    contentList.insertAdjacentHTML(
      "beforeend",
      taskItem({
        isDone: true,
        title: task.title.toString(),
      }),
    );
  });
}

///////////////////////////////////////////////

function displayContent() {
  const todosContent = document.getElementById("todos-content");
  const donesContent = document.getElementById("dones-content");
  const showCurrent = document.getElementById("current-toggle");
  const showDones = document.getElementById("done-toggle");

  let isShowingTodos = true; // Initial state

  showCurrent.addEventListener("click", () => {
    if (!isShowingTodos) {
      todosContent.style.display = "block";
      donesContent.style.display = "none";
      isShowingTodos = true;
    }
  });

  showDones.addEventListener("click", () => {
    if (isShowingTodos) {
      todosContent.style.display = "none";
      donesContent.style.display = "block";
      isShowingTodos = false;
    }
  });
}

//////////////////// CREATE /////////////////////////////////

const input = document.getElementById("task--input");
const addTaskBtn = document.getElementById("task--btn");

input.addEventListener("change", addTask);
function addTask(e) {
  const title = e.target.value.trim();
  const newTask = { title };
  createTask(newTask);
  renderUI();
}

addTaskBtn.addEventListener("click", async e => {
  await createTask(newTask);
});
