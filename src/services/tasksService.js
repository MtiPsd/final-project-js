import {
  API_COMPLETED_ENDPOINT,
  API_CURRENTS_ENDPOINT,
} from "../config/apiConfig.js";
import { tasksApi } from "../interceptor/tasksApi.js";

//////////////////// Current Tasks ////////////////////

export async function getCurrentTasksService() {
  try {
    const todos = await tasksApi.get(API_CURRENTS_ENDPOINT);
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
      API_CURRENTS_ENDPOINT,
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
      `${API_CURRENTS_ENDPOINT}/${taskId}`,
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
      `${API_CURRENTS_ENDPOINT}/${taskId}`,
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
    // Fetch the task to be marked as complete from "currents"
    const taskToComplete = await tasksApi.get(
      `${API_CURRENTS_ENDPOINT}/${taskId}`,
    );

    // Delete the task from "currents"
    await tasksApi.delete(`${API_CURRENTS_ENDPOINT}/${taskId}`);

    // Add the completed task to "completed"
    const completedTask = await tasksApi.post(
      API_COMPLETED_ENDPOINT,
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
    const completedData = await tasksApi.get(API_COMPLETED_ENDPOINT);
    return completedData;
  } catch (error) {
    console.error(
      "Error getting completed:",
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
}

export async function deleteCompletedTaskService(completedId) {
  try {
    const deletedCompletedResponse = await tasksApi.delete(
      `${API_COMPLETED_ENDPOINT}/${completedId}`,
    );
    return deletedCompletedResponse;
  } catch (error) {
    console.error(
      "Error deleting completed task:",
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
}

export async function undoCompletedTaskService(completedId) {
  try {
    const completedToUndo = await tasksApi.get(
      `${API_COMPLETED_ENDPOINT}/${completedId}`,
    );

    await tasksApi.delete(`${API_COMPLETED_ENDPOINT}/${completedId}`);

    const uncompletedTodo = await tasksApi.post(
      API_CURRENTS_ENDPOINT,
      completedToUndo,
    );

    return uncompletedTodo;
  } catch (error) {
    console.error(
      "Error undoing completed task:",
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
}
