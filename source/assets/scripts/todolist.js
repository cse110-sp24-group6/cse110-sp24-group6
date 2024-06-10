document.addEventListener('DOMContentLoaded', function () {
/**
 * Function to retrieve tasks from localStorage
 * @returns {array} An array of tasks from localStorage
 */
  function getTasksFromStorage() {
      let tasks = localStorage.getItem('tasks');
      return tasks ? JSON.parse(tasks) : [];
  }
/**
 * Function to save tasks to localStorage
 * @param {array} tasks - The array of tasks to save
 */
  function saveTasksToStorage(tasks) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // DOM elements
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

  // Retrieve tasks from localStorage
  let tasks = getTasksFromStorage();

/**
 * Function to update progress bar and text
 * @param {array} tasks - The array of tasks
 */
  function updateProgress(tasks) {
      console.log("updating progress");
      const completedTasks = tasks.filter(task => task.completed).length;
      const progress = tasks.length ? (completedTasks / tasks.length) * 100 : 0;
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
/**
 * Function to load tasks from localStorage
 * @param {array} tasks - The array of tasks
 */
  function loadTasks() {
    tasks = []; // Clear existing tasks array
    taskList.innerHTML = ''; // Clear existing tasks from the task list

    tasks = getTasksFromStorage(); // Load tasks from localStorage

    tasks.forEach(task => {
        const taskElement = createTaskElement(task.description, task.dueDate, task.taskDescription, task.tag, task.completed);
        taskList.appendChild(taskElement);
    });
    updateProgress(tasks);
  }
/**
 * Function to add a task
 * @param {event} event - The event object for the form submission
 */
  function addTask(event) {
      event.preventDefault();

      const description = taskInput.value.trim();
      const date = dueDate.value;
      const desc = taskDescription.value.trim();
      const tag = taskTags.value;

      if (!description) return;

      console.log("Adding task...");

      const taskElement = createTaskElement(description, date, desc, tag);
      taskList.appendChild(taskElement);

      tasks.push({ description, dueDate: date, taskDescription: desc, tag, completed: false });
      saveTasksToStorage(tasks);

      updateProgress(tasks);

      taskInput.value = '';
      dueDate.value = '';
      taskDescription.value = '';
      taskTags.value = '';
  }
/**
 * Function to delete a task
 * @param {event} event - The event object for the delete button click
 */
  function deleteTask(event) {
      const taskElement = event.target.parentNode;
      const taskIndex = Array.from(taskList.children).indexOf(taskElement);

      if (taskIndex !== -1) {
          tasks.splice(taskIndex, 1);
          saveTasksToStorage(tasks);

          updateProgress(tasks);
          taskList.removeChild(taskElement);
      }
  }
/**
 * Function to create a task element
 * @param {string} description - The description of the task
 * @param {string} dueDate - The due date of the task
 * @param {string} desc - The description of the task
 * @param {string} tag - The tag of the task
 * @param {boolean} completed - Whether the task is completed or not
 */
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
              updateProgress(tasks);
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

  // Event listener for task form submission
  taskForm.addEventListener('submit', addTask);

  // Event listener for deleting all tasks
  deleteAllBtn.addEventListener('click', () => {
      tasks = [];
      saveTasksToStorage(tasks);

      updateProgress(tasks);

      while (taskList.firstChild) {
          taskList.removeChild(taskList.firstChild);
      }
  });

  // Load tasks when DOM content is loaded
  loadTasks(); 
});

