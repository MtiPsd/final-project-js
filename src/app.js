"use strict";

import {
  createTask,
  deleteTask,
  getDones,
  getTasks,
  undoDone,
  updateTask,
} from "./services/tasksService.js";

const btn = document.getElementById("btn");

btn.addEventListener("click", async e => {
  const data = await undoDone(2);
});
