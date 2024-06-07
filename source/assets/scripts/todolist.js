const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');
const dueDate = document.getElementById('due-date');
const taskDescription = document.getElementById('task-description');
const taskTags = document.getElementById('task-tags');
const taskForm = document.getElementById('task-form');
const deleteAllBtn = document.getElementById('delete-all');
const otter = document.getElementById('otter');
const fish = document.getElementById('fish');
const celebration = document.getElementById('celebration');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

let tasks = [];
let currentEditTaskIndex = null;

function updateProgress() {
  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = (completedTasks / tasks.length) * 100;
  progressText.textContent = `Progress: ${progress.toFixed(2)}% (${completedTasks}/${tasks.length})`;
  progressBar.style.width = `${progress}%`;

  if (progress === 100) {
    otter.style.display = 'none';
    fish.style.display = 'none';
    celebration.style.display = 'block';
  } else {
    otter.style.display = 'block';
    fish.style.display = 'block';
    celebration.style.display = 'none';
  }
}

function addTask(event) {
  event.preventDefault();
  
  const taskTitle = taskInput.value.trim();
  const date = dueDate.value;
  const description = taskDescription.value.trim();
  const tag = taskTags.value;

  if (currentEditTaskIndex !== null) {
    tasks[currentEditTaskIndex] = {
      title: taskTitle,
      date: date,
      description: description,
      tag: tag,
      completed: tasks[currentEditTaskIndex].completed
    };
    renderTasks();
    currentEditTaskIndex = null;
  } else {
    tasks.push({
      title: taskTitle,
      date: date,
      description: description,
      tag: tag,
      completed: false
    });
    const taskElement = createTaskElement(tasks.length - 1);
    taskList.appendChild(taskElement);
  }

  updateProgress();
  taskInput.value = '';
  dueDate.value = '';
  taskDescription.value = '';
  taskTags.value = '';
  otter.style.display = 'block';
  fish.style.display = 'block';
  celebration.style.display = 'none';
}

function deleteTask(event) {
  const taskElement = event.target.parentNode;
  const taskIndex = taskElement.dataset.index;
  
  tasks.splice(taskIndex, 1);
  
  updateProgress();
  renderTasks();
}

function editTask(event) {
  const taskElement = event.target.parentNode;
  const taskIndex = taskElement.dataset.index;
  const task = tasks[taskIndex];
  
  taskInput.value = task.title;
  dueDate.value = task.date;
  taskDescription.value = task.description;
  taskTags.value = task.tag;
  currentEditTaskIndex = taskIndex;
}

function createTaskElement(index) {
  const task = tasks[index];
  const li = document.createElement('li');
  li.dataset.index = index;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    updateProgress();
  });

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', deleteTask);

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', editTask);
  
  li.innerHTML = `
    <b>Task:</b> ${task.title} <br>
    <b>Due Date:</b> ${task.date} <br>
    <b>Description:</b> ${task.description} <br>
    <b>Tag:</b> ${task.tag} <br>
  `;
  li.appendChild(checkbox);
  li.appendChild(deleteButton);
  li.appendChild(editButton);
  
  return li;
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskElement = createTaskElement(index);
    taskList.appendChild(taskElement);
  });
}

taskForm.addEventListener('submit', addTask);

deleteAllBtn.addEventListener('click', () => {
  tasks.length = 0;
  updateProgress();
  renderTasks();
});


