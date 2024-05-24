const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');
const dueDate = document.getElementById('due-date');
const taskDescription = document.getElementById('task-description');
const taskTags = document.getElementById('task-tags');
const taskStickers = document.getElementById('task-stickers');
const taskSubtasks = document.getElementById('task-subtasks');
const deleteAllBtn = document.getElementById('delete-all');
const otter = document.getElementById('otter');
const fish = document.getElementById('fish');
const celebration = document.getElementById('celebration');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const taskForm = document.getElementById('task-form');
let tasks = [];

function addTask(event) {
  event.preventDefault();
  
  const taskInput = document.getElementById('task-input');
  const task = taskInput.value.trim();
  
  if (task) {
    const taskElement = createTaskElement(task);
    taskList.appendChild(taskElement);
    
    const newTask = { task, completed: false };
    tasks.push(newTask);
    
    updateProgress();
    
    taskInput.value = '';
  }
}

function deleteTask(event) {
  const taskElement = event.target.parentNode;
  const taskIndex = tasks.findIndex((task, index) => task.task === taskElement.textContent);
  
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    
    updateProgress();
    
    taskList.removeChild(taskElement);
  }
}

function createTaskElement(task) {
  // Create a new task element
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  const deleteButton = document.createElement('button');
  
  // Add event listeners
  checkbox.addEventListener('change', () => {
    // Update the task completed status
    tasks[taskIndex].completed = checkbox.checked;
    
    updateProgress();
  });
  
  deleteButton.addEventListener('click', () => {
    deleteTask(event);
  });
  
  li.appendChild(checkbox);
  li.appendChild(deleteButton);
  
  return li;
}

taskForm.addEventListener('submit', addTask);
