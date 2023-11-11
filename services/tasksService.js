import { API_TODOS_ENDPOINT } from "../config/apiConfig.js";
import { tasksApi } from "../interceptor/todosApi.js";

async function getTasks() {
  const todos = await tasksApi.get(API_TODOS_ENDPOINT);
  console.log(todos);
}

async function createTask(newTask) {
  const todos = await tasksApi.post(API_TODOS_ENDPOINT, newTask);
  console.log(todos);
}

export { getTasks, createTask };
