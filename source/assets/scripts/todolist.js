const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');
const taskForm = document.getElementById('task-form');
const deleteAllBtn = document.getElementById('delete-all');
const otter = document.getElementById('otter');
const fish = document.getElementById('fish');
const celebration = document.getElementById('celebration');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

let tasks = [];

function updateProgress() {
  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = (completedTasks / tasks.length) * 100;
  progressText.textContent = `Progress: ${progress.toFixed(2)}% (${completedTasks}/${tasks.length})`;
  progressBar.style.width = `${progress}%`;
}

function addTask(event) {
  event.preventDefault();
  
  const taskDescription = taskInput.value.trim();
  const taskElement = createTaskElement(taskDescription);
  taskList.appendChild(taskElement);
  
  tasks.push({ description: taskDescription, completed: false });
  
  updateProgress();
  
  taskInput.value = '';
  
  otter.style.display = 'none';
  fish.style.display = 'none';
  celebration.style.display = 'none';
}

function deleteTask(event) {
  const taskElement = event.target.parentNode;
  const taskIndex = tasks.findIndex(task => task.description === taskElement.textContent);
  
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    
    updateProgress();
    
    taskList.removeChild(taskElement);
  }
}

function createTaskElement(description) {
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  const deleteButton = document.createElement('button');
  
  checkbox.type = 'checkbox';
  deleteButton.textContent = 'Delete';
  
  checkbox.addEventListener('change', () => {
    const taskDescription = li.textContent;
    const taskIndex = tasks.findIndex(task => task.description === taskDescription);
    if (taskIndex !== -1) {
      const task = tasks[taskIndex];
      task.completed = checkbox.checked;
      updateProgress();
    }
  });
  
  deleteButton.addEventListener('click', () => {
    deleteTask(event);
  });
  
  li.textContent = description;
  li.appendChild(checkbox);
  li.appendChild(deleteButton);
  
  return li;
}

taskForm.addEventListener('submit', addTask);

deleteAllBtn.addEventListener('click', () => {
  tasks.length = 0;
  
  updateProgress();
  
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
});