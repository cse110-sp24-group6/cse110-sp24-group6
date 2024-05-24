// Get elements from the HTML document
const taskList = document.getElementById('task-list'); // the list of tasks
const taskInput = document.getElementById('task-input'); // the input field for new tasks
const taskForm = document.getElementById('task-form'); // the form that submits new tasks
const deleteAllBtn = document.getElementById('delete-all'); // the button to delete all tasks
const otter = document.getElementById('otter'); // an element that will be displayed or hidden
const fish = document.getElementById('fish'); // another element that will be displayed or hidden
const celebration = document.getElementById('celebration'); // a third element that will be displayed or hidden
const progressBar = document.getElementById('progress-bar'); // a progress bar element
const progressText = document.getElementById('progress-text'); // a text element to display the progress

// Initialize an empty array to store tasks
let tasks = [];

// Function to update the progress bar and text
function updateProgress() {
  // Calculate the number of completed tasks
  const completedTasks = tasks.filter(task => task.completed).length;
  
  // Calculate the progress percentage
  const progress = (completedTasks / tasks.length) * 100;
  
  // Update the progress text and bar
  progressText.textContent = `Progress: ${progress.toFixed(2)}% (${completedTasks}/${tasks.length})`;
  progressBar.style.width = `${progress}%`;
}

// Function to add a new task
function addTask(event) {
  event.preventDefault();
  
  // Get the text from the input field
  const taskDescription = taskInput.value.trim();
  
  // Create a new task element
  const taskElement = createTaskElement(taskDescription);
  
  // Add the task element to the list of tasks
  taskList.appendChild(taskElement);
  
  // Add the task to the tasks array
  tasks.push({ description: taskDescription, completed: false });
  
  // Update the progress bar and text
  updateProgress();
  
  // Reset the input field
  taskInput.value = '';
  
  // Hide the otter, fish, and celebration elements
  otter.style.display = 'none';
  fish.style.display = 'none';
  celebration.style.display = 'none';
}

// Function to delete a task
function deleteTask(event) {
  // Get the parent element of the delete button (the task element)
  const taskElement = event.target.parentNode;
  
  // Find the index of the task in the tasks array
  const taskIndex = tasks.findIndex(task => task.description === taskElement.textContent);
  
  if (taskIndex !== -1) {
    // Remove the task from the tasks array
    tasks.splice(taskIndex, 1);
    
    // Update the progress bar and text
    updateProgress();
    
    // Remove the task element from the list of tasks
    taskList.removeChild(taskElement);
  }
}

// Function to create a new task element
function createTaskElement(description) {
  // Create a new list item (LI) element
  const li = document.createElement('li');
  
  // Create a checkbox input element
  const checkbox = document.createElement('input');
  
  // Create a delete button element
  const deleteButton = document.createElement('button');
  
  // Set the type of the checkbox to "checkbox"
  checkbox.type = 'checkbox';
  
  // Set the text content of the delete button to "Delete"
  deleteButton.textContent = 'Delete';
  
  // Add an event listener to the checkbox to update its status when clicked
checkbox.addEventListener('change', () => {
    const taskDescription = li.textContent;
    const taskIndex = tasks.findIndex(task => task.description === taskDescription);
    if (taskIndex !== -1) {
      const task = tasks[taskIndex]; // Ensure taskIndex is within bounds
      if (typeof task !== 'undefined') {
         task.completed = checkbox.checked;
         updateProgress();
      } else {
         // Handle invalid task index
         console.error('Invalid task index. Task not found.');
      }
    }
});
  
  // Add an event listener to the delete button to delete the task when clicked
  deleteButton.addEventListener('click', () => {
    deleteTask(event);
  });
  
  // Set the text content of the list item to the description of the task
  li.textContent = description;
  
  // Append the checkbox and delete button to the list item
  li.appendChild(checkbox);
  li.appendChild(deleteButton);
  
  return li;
}

// Add an event listener to the form to submit new tasks when it is submitted
taskForm.addEventListener('submit', addTask);

// Add an event listener to the delete all button to clear all tasks when it is clicked
deleteAllBtn.addEventListener('click', () => {
  // Clear all tasks by resetting the length of the tasks array to zero
  tasks.length = 0;
  
  // Update the progress bar and text after clearing all tasks
  updateProgress();
  
  // Remove all child elements from the list of tasks (to clear any remaining elements)
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
}
