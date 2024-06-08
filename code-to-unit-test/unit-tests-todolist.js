// document.addEventListener('DOMContentLoaded', function () {

    /* Tests to make sure that the progress bar should be empty
    *   when there are no visible tasks
    */


    /* Tests functionality of add task button:
    * - Task is added to DOM
    * - Task is the task-list array
    * - Progress bar is updated correctly
    * - Input fields are cleared
    */

    // const { updateProgress, addTask, createTaskElement } = require('../source/assets/scripts/todolist');

    
    export function verifyAddTask() {
        // document.querySelectorAll('button')[0].addEventListener('click', () => {
        //     updateProgress();
        //     addTask();
        //     createTaskElement();
        // })
        // Should stay true at the end if all things pass
        let truth = true;
        let check = false;

        // Get length of current task list
        const taskListItemsBefore = document.querySelectorAll('#task-list li');
        const taskListLengthBefore = taskListItemsBefore.length;
        console.log(taskListItemsBefore);
        console.log('this is list length' + taskListLengthBefore)

        // Note this is dangerous if more buttons are added, give the button a class or ID
        const submitBtn = document.querySelectorAll('button')[0];
        console.log('this is submitBtn: ' + submitBtn);
        
        // Fill in the entries to test
        let taskField = document.getElementById('task-input');
        let taskDate = document.getElementById('due-date');
        let taskDesc = document.getElementById('task-description');
        let taskTags = document.getElementById('task-tags');
        let taskStickers = document.getElementById('task-stickers');
        let taskSubtasks = document.getElementById('task-subtasks');

        console.log(taskField);
        taskField.value = "Project 1";
        taskDate.value = "06/04/2024";
        taskDesc.value = "Testing the project field";
        taskTags.value = "ProjectTag1";
        taskStickers.value = "ProjectSticker";
        taskSubtasks.value = "2";

        submitBtn.click();

        // Check that the items have been added to task list, false if not added
        const taskListItemsAfter = document.querySelectorAll('#task-list li');
        const taskListLengthAfter = taskListItemsAfter.length;
        
        if (taskListLengthBefore == taskListLengthAfter) {
            truth = false;
        }

        // Check that input fields are now empty
        taskField = document.getElementById('task-input');
        taskDate = document.getElementById('due-date');
        taskDesc = document.getElementById('task-description');
        taskTags = document.getElementById('task-tags');
        taskStickers = document.getElementById('task-stickers');
        taskSubtasks = document.getElementById('task-subtasks');

        if (taskField.value != '') {
            truth = false;
        }
        if (taskDate.value != '') {
            truth = false;
        }
        if (taskDesc.value != '') {
            truth = false;
        }
        if (taskTags.value != '') {
            truth = false;
        }
        if (taskStickers.value != '') {
            truth = false;
        }
        if (taskSubtasks.value != '') {
            truth = false;
        }

        // Check that the progress text has appeared in the progress bar
        const progressText = document.getElementById('progress-text');
        if (progressText.value != 'Progress: 0.00% (0/0)') {
            truth = false;
        }

        // Check that the celebration otter is not visible, but the regular otter and fish are visible
        const happyOtter = document.getElementById('celebration');
        const workingOtter = document.getElementById('otter');
        const fish = document.getElementById('fish');

        if (happyOtter.hidden == false) {
            truth = false;
        }
        if (workingOtter.hidden == true) {
            truth = false;
        }
        if (fish.hidden == true) {
            truth = false;
        }

        return check;
    }

// })

export function getTasksFromStorage() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

export function saveTasksToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// const taskList = document.getElementById('task-list');
// const taskInput = document.getElementById('task-input');
// const dueDate = document.getElementById('due-date');
// const taskDescription = document.getElementById('task-description');
// const taskTags = document.getElementById('task-tags');
const taskForm = document.getElementById('task-form');
const deleteAllBtn = document.getElementById('delete-all');
// const otter = document.getElementById('otter');
// const fish = document.getElementById('fish');
// const celebration = document.getElementById('celebration');
// const progressBar = document.getElementById('progress-bar');
// const progressText = document.getElementById('progress-text');

let tasks = getTasksFromStorage();

export function updateProgress() {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const otter = document.getElementById('otter');
    const fish = document.getElementById('fish');
    const celebration = document.getElementById('celebration');

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

export function loadTasks() {
  tasks = []; // Clear existing tasks array

  taskList.innerHTML = ''; // Clear existing tasks from the task list

  tasks = getTasksFromStorage(); // Load tasks from localStorage

  tasks.forEach(task => {
      const taskElement = createTaskElement(task.description, task.dueDate, task.taskDescription, task.tag, task.completed);
      taskList.appendChild(taskElement);
  });
  updateProgress();
  
}


export function addTask(event) {
    const taskList = document.getElementById('task-list');
    const taskInput = document.getElementById('task-input');
    const dueDate = document.getElementById('due-date');
    const taskDescription = document.getElementById('task-description');
    const taskTags = document.getElementById('task-tags');

    // event.preventDefault();
    console.log(taskInput);
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

    updateProgress();

    taskInput.value = '';
    dueDate.value = '';
    taskDescription.value = '';
    taskTags.value = '';
}

export function deleteTask(event) {
    const taskElement = event.target.parentNode;
    const taskIndex = Array.from(taskList.children).indexOf(taskElement);

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        saveTasksToStorage(tasks);

        updateProgress();
        taskList.removeChild(taskElement);
    }
}

export function createTaskElement(description, dueDate, taskDescription, tag, completed = false) {
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

// taskForm.addEventListener('submit', addTask);

// deleteAllBtn.addEventListener('click', () => {
//     tasks = [];
//     saveTasksToStorage(tasks);

//     updateProgress();

//     while (taskList.firstChild) {
//         taskList.removeChild(taskList.firstChild);
//     }
// });

// loadTasks(); 