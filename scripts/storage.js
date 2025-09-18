/**
 * Storage Management Module:
 * Handles saving data to and retrieving data from local storage
 */

import { allTasks } from "./initialData.js";

/**
 * Saves array to local storage
 */
export function saveTasksToStorage() {
  let allTasksJSON = JSON.stringify(allTasks);
  localStorage.setItem("allTasks", allTasksJSON);
}

/**
 * Retrieves tasks from local storage, empties allTasks array and repopulates it with tasks from storage
 */
export function retrieveTasksFromStorage() {
  let savedTasks = localStorage.getItem("allTasks");
  try {
    let parsedTasks = JSON.parse(savedTasks);
    allTasks.length = 0;
    parsedTasks.forEach((task) => {
      allTasks.push(task);
    });
  } catch (error) {
    console.error("Error parsing JSON", error);
  }
}