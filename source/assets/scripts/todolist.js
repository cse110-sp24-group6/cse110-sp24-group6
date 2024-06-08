
document.addEventListener('DOMContentLoaded', function () {
  function getTasksFromStorage() {
      let tasks = localStorage.getItem('tasks');
      return tasks ? JSON.parse(tasks) : [];
  }

  function saveTasksToStorage(tasks) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

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

  let tasks = getTasksFromStorage();

  function updateProgress() {
      const completedTasks = tasks.filter(task => task.completed).length;
      const progress = tasks.length ? (completedTasks / tasks.length) * 100 : 0;
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

  function loadTasks() {
    tasks = []; // Clear existing tasks array

    taskList.innerHTML = ''; // Clear existing tasks from the task list

    tasks = getTasksFromStorage(); // Load tasks from localStorage

    tasks.forEach(task => {
        const taskElement = createTaskElement(task.description, task.dueDate, task.taskDescription, task.tag, task.completed);
        taskList.appendChild(taskElement);
    });
    updateProgress();
    
  }

  function addTask(event) {
    
  }

  function deleteTask(event) {
      const taskElement = event.target.parentNode;
      const taskIndex = Array.from(taskList.children).indexOf(taskElement);

      if (taskIndex !== -1) {
          tasks.splice(taskIndex, 1);
          saveTasksToStorage(tasks);

          updateProgress();
          taskList.removeChild(taskElement);
      }
  }

  function createTaskElement(description, dueDate, taskDescription, tag, completed = false) {
      const li = document.createElement('li');
      const checkbox = document.createElement('input');
      const deleteButton = document.createElement('button');

      checkbox.type = 'checkbox';
      checkbox.checked = completed;

      deleteButton.textContent = 'Delete';

      checkbox.addEventListener('change', () => {
          const taskIndex = Array.from(taskList.children).indexOf(li);
          if (taskIndex !== -1) {
              tasks[`${taskIndex}`].completed = checkbox.checked;
              saveTasksToStorage(tasks);
              updateProgress();
          }
      });

      deleteButton.addEventListener('click', (event) => {
          deleteTask(event);
      });

      li.innerHTML =
          `<b>Task:</b> ${description} <br>
          <b>Due Date:</b> ${dueDate} <br>
          <b>Description:</b> ${taskDescription} <br>
          <b>Tag:</b> ${tag} <br>
      `;

      li.appendChild(checkbox);
      li.appendChild(deleteButton);

      return li;
  }

  taskForm.addEventListener('submit', addTask);

  deleteAllBtn.addEventListener('click', () => {
      tasks = [];
      saveTasksToStorage(tasks);

      updateProgress();

      while (taskList.firstChild) {
          taskList.removeChild(taskList.firstChild);
      }
  });

  loadTasks(); 
});

