const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const dueDate = document.getElementById('due-date');
const taskDescription = document.getElementById('task-description');
const taskTags = document.getElementById('task-tags');
const taskStickers = document.getElementById('task-stickers');
const taskSubtasks = document.getElementById('task-subtasks');
const taskList = document.getElementById('task-list');
const deleteAllBtn = document.getElementById('delete-all');
const progressText = document.getElementById('progress-text');
const progressBar = document.getElementById('progress-bar');
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

function deleteTask(event) {
  event.target.parentNode.remove();
}

function addTask(event) {
  event.preventDefault();
  
  const task = taskInput.value.trim();
  
  if (task) {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    const deleteButton = document.createElement('button');
    
    checkbox.type = 'checkbox';
    deleteButton.textContent = 'Delete';
    
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        tasks.push({ task, completed: true });
      } else {
        tasks.push({ task, completed: false });
      }
      
      updateProgress();
    });
    
    deleteButton.addEventListener('click', deleteTask);
    
    li.appendChild(checkbox);
    li.appendChild(deleteButton);
    
    taskList.appendChild(li);
    
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

taskForm.addEventListener('submit', addTask);

deleteAllBtn.addEventListener('click', () => {
  
});
