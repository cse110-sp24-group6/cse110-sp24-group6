// Functions copied over from '../source/assets/scripts/todolist.js'

export function getTasksFromStorage() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

export function saveTasksToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

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

export function addTask(event) {
    const taskList = document.getElementById('task-list');
    const taskInput = document.getElementById('task-input');
    const dueDate = document.getElementById('due-date');
    const taskDescription = document.getElementById('task-description');
    const taskTags = document.getElementById('task-tags');

    // event.preventDefault();
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
    const taskList = document.getElementById('task-list');

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
    const taskList = document.getElementById('task-list');

    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    const deleteButton = document.createElement('button');

    checkbox.type = 'checkbox';
    checkbox.checked = completed;

    deleteButton.textContent = 'Delete';

    checkbox.addEventListener('change', () => {
        const taskIndex = Array.from(taskList.children).indexOf(li);
        if (taskIndex !== -1) {
            // tasks[`${taskIndex}`].completed = checkbox.checked;
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

export function taskFormSubmitAndDeleteAll() {
    const taskForm = document.getElementById('task-form');
    const deleteAllBtn = document.getElementById('delete-all');
    const taskList = document.getElementById('task-list');


    taskForm.addEventListener('submit', addTask);

    deleteAllBtn.addEventListener('click', () => {
        tasks = [];
        saveTasksToStorage(tasks);

        updateProgress();

        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
    });
}