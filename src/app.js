"use strict";

import { getTasks } from "./services/tasksService.js";

const btn = document.getElementById("btn");

btn.addEventListener("click", async e => {
  const data = await getTasks();
  console.log(data);
});
