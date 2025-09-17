const allTasks = [
  {
    id: 1,
    title: "Launch Epic Career 🚀",
    description: "Create a killer Resume",
    status: "todo",
  },
  {
    id: 2,
    title: "Master JavaScript 💛",
    description: "Get comfortable with the fundamentals",
    status: "doing",
  },
  {
    id: 3,
    title: "Keep on Going 🏆",
    description: "You're almost there",
    status: "doing",
  },

  {
    id: 4,
    title: "Learn Data Structures and Algorithms 📚",
    description:
      "Study fundamental data structures and algorithms to solve coding problems efficiently",
    status: "todo",
  },
  {
    id: 5,
    title: "Contribute to Open Source Projects 🌐",
    description:
      "Gain practical experience and collaborate with others in the software development community",
    status: "done",
  },
  {
    id: 6,
    title: "Build Portfolio Projects 🛠️",
    description:
      "Create a portfolio showcasing your skills and projects to potential employers",
    status: "done",
  },
];

// Create variables
const taskModal = document.getElementById("task-modal-container");
const modalClose = document.querySelectorAll(".task-modal-close-btn");

const newTaskBtn = document.getElementById("add-task-btn");
const newTaskModal = document.getElementById("add-task-modal-container");
const createTaskBtn = document.getElementById("create-task-btn");
const newTaskForm = document.getElementById("add-task-form");

let taskTitle = document.getElementById("task-title");
let taskDescription = document.getElementById("task-description");
let taskStatus = document.getElementById("task-status");

// Function to create a new div and style it correctly
function createTaskElement(task) {
  const newDiv = document.createElement("div");

  newDiv.textContent = task.title;
  newDiv.dataset.taskId = task.id;
  newDiv.classList.add("task-div");

  newDiv.addEventListener("click", function () {
    displayTaskModal(task);
  });

  return newDiv;
}

// Function to display the modal and add the corresponding task info to the correct fields
function displayTaskModal(task) {
  // Fetches each input field and adds the correct task info to each
  taskTitle.textContent = task.title;
  taskDescription.textContent = task.description;
  taskStatus.value = task.status;

  // Changes the modal style so it displays
  taskModal.style.display = "block";
}

// Function to display the tasks on the web page
function displayTasks(task) {
  const tasksContainer = getTaskContainerByStatus(task.status);
  const taskDiv = createTaskElement(task);

  if (tasksContainer) {
    tasksContainer.appendChild(taskDiv);
  }
}

function renderTasks() {
  clearExistingTasks();
  allTasks.forEach(displayTasks);
}

modalClose.forEach((button) => {
  button.addEventListener("click", function () {
    taskModal.style.display = "none";
    newTaskModal.style.display = "none";

    newTaskForm.reset();
  });
});

// NEW CODE

function getTaskContainerByStatus(status) {
  return document.getElementById(`${status}-tasks-container`);
}

/**
 * Clears all existing task-divs from all task containers.
 */
function clearExistingTasks() {
  document.querySelectorAll(".tasks-container").forEach((container) => {
    container.innerHTML = "";
  });
}

function getNewTask() {
  let newTask = {};

  newTask.id = allTasks.length + 1;
  newTask.title = document.getElementById("add-task-title").value;
  newTask.description = document.getElementById("add-task-description").value;
  newTask.status = document.getElementById("add-task-status").value;

  return newTask;
}

newTaskBtn.addEventListener("click", function () {
  newTaskModal.style.display = "block";
});

newTaskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const newTask = getNewTask();
  allTasks.push(newTask);

  renderTasks();
  newTaskModal.style.display = "none";
  newTaskForm.reset();
});

document.addEventListener("DOMContentLoaded", renderTasks);
