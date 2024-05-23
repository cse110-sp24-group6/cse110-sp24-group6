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

let tasks = [];

function updateProgress() {
  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = (completedTasks / tasks.length) * 100;
  progressText.textContent = `Progress: ${progress.toFixed(2)}% (${completedTasks}/${tasks.length})`;
  progressBar.style.width = `${progress}%`;
}

function addTask(event) {
  event.preventDefault();
  
  const task = taskInput.value.trim();
  
  if (task) {
    const taskElement = createTaskElement(task);
    taskList.appendChild(taskElement);
    
    tasks.push({ task, completed: false });
    
    updateProgress();
    
    taskInput.value = '';
    
    dueDate.value = '';
    taskDescription.value = '';
    taskTags.value = '';
    taskStickers.value = '';
    taskSubtasks.value = '';
    
    updateProgress();
    
    if (tasks.length === tasks.length) {
      otter.style.display = 'none';
      fish.style.display = 'none';
      celebration.style.display = 'block';
    }
    
    updateProgress();
  }
}

function deleteTask(event) {
  const taskElement = event.target.parentNode;
  const taskIndex = tasks.findIndex(task => task.task === taskElement.textContent);
  
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    
    updateProgress();
    
    taskList.removeChild(taskElement);
  }
}

function createTaskElement(task) {
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  const deleteButton = document.createElement('button');
  
  checkbox.type = 'checkbox';
  deleteButton.textContent = 'Delete';
  
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      tasks[taskIndex].completed = true;
    } else {
      tasks[taskIndex].completed = false;
    }
    
    updateProgress();
  });
  
  deleteButton.addEventListener('click', deleteTask);
  
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
