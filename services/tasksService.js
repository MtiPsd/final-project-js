import { API_TODOS_ENDPOINT } from "../config/apiConfig.js";
import { tasksApi } from "../interceptor/todosApi.js";

async function getTasks() {
  try {
    const todos = await todosApi.get(API_TODOS_ENDPOINT);
    return todos;
  } catch (error) {
    console.error(
      "Error getting tasks:",
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
}

async function createTask(newTask) {
  try {
    const createdTask = await todosApi.post(
      API_TODOS_ENDPOINT,
      newTask,
    );
    return createdTask;
  } catch (error) {
    console.error(
      "Error creating task:",
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
}

async function updateTask(taskId, updatedTask) {
  try {
    const updatedTaskResponse = await todosApi.put(
      `${API_TODOS_ENDPOINT}/${taskId}`,
      updatedTask,
    );
    return updatedTaskResponse;
  } catch (error) {
    console.error(
      "Error updating task:",
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
}

async function deleteTask(taskId) {
  try {
    const deletedTaskResponse = await todosApi.delete(
      `${API_TODOS_ENDPOINT}/${taskId}`,
    );
    return deletedTaskResponse;
  } catch (error) {
    console.error(
      "Error deleting task:",
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
}

export { getTasks, createTask, updateTask, deleteTask };
