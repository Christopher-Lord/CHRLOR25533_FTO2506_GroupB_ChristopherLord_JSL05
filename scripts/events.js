import { allTasks } from "./initialData.js";
import {
  closeModals,
  selectedTask,
  newTaskModal,
  newTaskForm,
  titleErrorMsg,
  descriptionErrorMsg,
} from "./modals.js";
import {
  getNewTask,
  renderTasks,
  deleteTask,
  titleInput,
  descriptionInput,
} from "./tasks.js";
import { saveTasksToStorage } from "./storage.js";

// Button variables
const newTaskBtn = document.getElementById("add-task-btn");
const deleteTaskBtn = document.getElementById("delete-task-btn");
const modalCloseBtn = document.querySelectorAll(".task-modal-close-btn");

newTaskBtn.addEventListener("click", function () {
  newTaskModal.classList.add("visible");
});

modalCloseBtn.forEach((button) => {
  button.addEventListener("click", function () {
    closeModals();
  });
});

newTaskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const newTask = getNewTask();

  if (newTask.title.trim() === "") {
    titleErrorMsg.textContent = "❗Please fill out this field.";
    titleErrorMsg.classList.add("visible");
    return;
  }
  if (newTask.description.trim() === "") {
    descriptionErrorMsg.textContent = "❗Please fill out this field.";
    descriptionErrorMsg.classList.add("visible");
    return;
  }

  allTasks.push(newTask);

  saveTasksToStorage();
  renderTasks();
  closeModals();
});

titleInput.addEventListener("input", () => {
  titleErrorMsg.classList.remove("visible");
});

descriptionInput.addEventListener("input", () => {
  descriptionErrorMsg.classList.remove("visible");
});

deleteTaskBtn.addEventListener("click", function () {
  deleteTask(selectedTask);
  saveTasksToStorage();
  renderTasks();
  closeModals();
});
