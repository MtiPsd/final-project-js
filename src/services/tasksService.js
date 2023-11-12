import {
  API_DONES_ENDPOINT,
  API_TODOS_ENDPOINT,
} from "../config/apiConfig.js";
import { tasksApi } from "../interceptor/tasksApi.js";

//////////////////// Current Tasks ////////////////////

export async function getCurrentTasksService() {
  try {
    const todos = await tasksApi.get(API_TODOS_ENDPOINT);
    return todos;
  } catch (error) {
    console.error(
      "Error getting tasks:",
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
}

export async function createCurrentTaskService(newTask) {
  try {
    const createdTask = await tasksApi.post(
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

export async function updateCurrentTaskService(taskId, updatedTask) {
  try {
    const updatedTaskResponse = await tasksApi.put(
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

export async function deleteCurrentTaskService(taskId) {
  try {
    const deletedTaskResponse = await tasksApi.delete(
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

export async function completeCurrentTaskService(taskId) {
  try {
    // Fetch the task to be marked as complete from "todos"
    const taskToComplete = await tasksApi.get(
      `${API_TODOS_ENDPOINT}/${taskId}`,
    );

    // Delete the task from "todos"
    await tasksApi.delete(`${API_TODOS_ENDPOINT}/${taskId}`);

    // Add the completed task to "dones"
    const completedTask = await tasksApi.post(
      API_DONES_ENDPOINT,
      taskToComplete,
    );

    return completedTask;
  } catch (error) {
    console.error(
      "Error completing todo tasks:",
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
}

//////////////////// Completed Tasks ////////////////////

export async function getCompletedTasksService() {
  try {
    const donesData = await tasksApi.get(API_DONES_ENDPOINT);
    return donesData;
  } catch (error) {
    console.error(
      "Error getting dones:",
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
}

export async function deleteCompletedTaskService(doneId) {
  try {
    const deletedDoneResponse = await tasksApi.delete(
      `${API_DONES_ENDPOINT}/${doneId}`,
    );
    return deletedDoneResponse;
  } catch (error) {
    console.error(
      "Error deleting done task:",
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
}

export async function undoCompletedTaskService(doneId) {
  try {
    const doneToUndo = await tasksApi.get(
      `${API_DONES_ENDPOINT}/${doneId}`,
    );

    await tasksApi.delete(`${API_DONES_ENDPOINT}/${doneId}`);

    const undoneTodo = await tasksApi.post(
      API_TODOS_ENDPOINT,
      doneToUndo,
    );

    return undoneTodo;
  } catch (error) {
    console.error(
      "Error undoing done task:",
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
}
