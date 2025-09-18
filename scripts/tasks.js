/**
 * Task Management Module:
 * Handles task creation/ deletion
 * Handles sorting of tasks into correct containers
 * Handles rendering of tasks onto the webpage
 */

// Importing necessary functions and variables from other modules
import { displayTaskModal } from "./modals.js";
import { allTasks } from "./initialData.js";
import { retrieveTasksFromStorage } from "./storage.js";

// Exporting variables to be used elsewhere
export const titleInput = document.getElementById("add-task-title");
export const descriptionInput = document.getElementById("add-task-description");
export const statusInput = document.getElementById("add-task-status");

/**
 * Gets the correct container for each task by status
 * @param {string} status - The status value of each task
 * @returns The correct HTML container for each task
 */
export function getTaskContainerByStatus(status) {
  return document.getElementById(`${status}-tasks-container`);
}

/**
 * Clears any existing HTML elements within each task container
 */
export function clearExistingTasks() {
  document.querySelectorAll(".tasks-container").forEach((container) => {
    container.innerHTML = "";
  });
}

/**
 * Creates a new task object based on values input by the user
 * @returns The full task object created
 */
export function getNewTask() {
  let newTask = {};

  newTask.id = allTasks.length + 1;
  newTask.title = titleInput.value;
  newTask.description = descriptionInput.value;
  newTask.status = statusInput.value;

  return newTask;
}

/**
 * Creates a new div element, populates it with task information and adds correct styling
 * @param {object} task - Each task in the array
 * @returns New, populated, div element
 */
export function createTaskElement(task) {
  const newDiv = document.createElement("div");

  newDiv.textContent = task.title;
  newDiv.dataset.taskId = task.id;
  newDiv.classList.add("task-div");

  newDiv.addEventListener("click", function () {
    displayTaskModal(task);
  });

  return newDiv;
}

/**
 * Assigns each task to its respective container based on status
 * @param {object} task Each task in the array
 */
export function assignTasks(task) {
  const tasksContainer = getTaskContainerByStatus(task.status);
  const taskDiv = createTaskElement(task);

  if (tasksContainer) {
    tasksContainer.appendChild(taskDiv);
  }
}

/**
 * Finds the array index of the currently selected task and removes that task
 * @param {object} task Currently selected task
 */
export function deleteTask(task) {
  const indexToRemove = allTasks.indexOf(task);

  allTasks.splice(indexToRemove, 1);
}

/**
 * Clears existing tasks, retrieves all tasks from storage, then displays the tasks on the web page
 */
export function renderTasks() {
  clearExistingTasks();
  retrieveTasksFromStorage();
  allTasks.forEach(assignTasks);
}
