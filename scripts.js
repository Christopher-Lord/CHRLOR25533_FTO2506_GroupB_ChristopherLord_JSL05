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
const createTaskBtn = document.getElementById("create-task-btn");

const newTaskModal = document.getElementById("add-task-modal-container");
const newTaskForm = document.getElementById("add-task-form");

const titleErrorMsg = document.getElementById("title-error-msg");
const descriptionErrorMsg = document.getElementById("description-error-msg");

const taskTitle = document.getElementById("task-title");
const taskDescription = document.getElementById("task-description");
const taskStatus = document.getElementById("task-status");

const titleInput = document.getElementById("add-task-title");
const descriptionInput = document.getElementById("add-task-description");
const statusInput = document.getElementById("add-task-status");

function saveTasksToStorage() {
  let allTasksJSON = JSON.stringify(allTasks);
  localStorage.setItem("allTasks", allTasksJSON);
}

function retrieveTasksFromStorage() {
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

function getTaskContainerByStatus(status) {
  return document.getElementById(`${status}-tasks-container`);
}

function clearExistingTasks() {
  document.querySelectorAll(".tasks-container").forEach((container) => {
    container.innerHTML = "";
  });
}

function getNewTask() {
  let newTask = {};

  newTask.id = allTasks.length + 1;
  newTask.title = titleInput.value;
  newTask.description = descriptionInput.value;
  newTask.status = statusInput.value;

  return newTask;
}

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
  retrieveTasksFromStorage();
  allTasks.forEach(displayTasks);
}

newTaskBtn.addEventListener("click", function () {
  newTaskModal.style.display = "block";
});

modalClose.forEach((button) => {
  button.addEventListener("click", function () {
    taskModal.style.display = "none";
    newTaskModal.style.display = "none";

    newTaskForm.reset();

    titleErrorMsg.style.display = "none";
    descriptionErrorMsg.style.display = "none";
  });
});

newTaskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const newTask = getNewTask();

  if (newTask.title.trim() === "") {
    titleErrorMsg.textContent = "❗Please fill out this field.";
    titleErrorMsg.style.display = "block";
    return;
  }
  if (newTask.description.trim() === "") {
    descriptionErrorMsg.textContent = "❗Please fill out this field.";
    descriptionErrorMsg.style.display = "block";
    return;
  }

  allTasks.push(newTask);

  saveTasksToStorage();

  renderTasks();
  newTaskModal.style.display = "none";
  newTaskForm.reset();
});

titleInput.addEventListener("input", () => {
  titleErrorMsg.style.display = "none";
});

descriptionInput.addEventListener("input", () => {
  descriptionErrorMsg.style.display = "none";
});

document.addEventListener("DOMContentLoaded", renderTasks);
