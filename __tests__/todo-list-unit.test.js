// todo-list-unit.test.js

/* IMPORTS */
import { fireEvent } from '@testing-library/dom';
import { addTask, deleteTask, createTaskElement, taskFormSubmitAndDeleteAll } from '../code-to-unit-test/unit-tests-todolist';

describe('To-do list functions', () => {

    // Simulating the DOM environment in JSDOM
    beforeEach(() => {
        document.body.innerHTML = `<head>
            <title>To-Do List</title>
            <link rel="stylesheet" href="assets/styles/todolist.css">
            </head>
            <body>
            <div class="nav-bar-left-container">
                <nav class="nav-bar">
                    <img class="databaes-icon" src="assets/HTML_homepage_pics/databaes_logo.png" alt="databaes logo"/>
                    <a id="home-page-button" class="page-icons" href="./homepage.html">
                        <img class="home-icon" src="assets/HTML_homepage_pics/homepage_nav.png" alt="Homepage button"/>
                    </a>
                    <a id="daily-log-button" class="page-icons" href="./dailylog.html">
                        <img class="daily-log-icon" src="assets/icons/homepage/daily_log/daily_log_green.png" alt="Daily Log Button"/>
                    </a>
                    <a id="to-do-list-button" class="page-icons" href="./todolist.html">
                        <img class="to-do-list-icon" src="assets/HTML_homepage_pics/to-do_list_nav.png" alt="To-Do List button"/>
                    </a>
                </nav>
            </div>
            <h1>To-Do List</h1>
            
            <div id="progress-container">
                <div id="progress-text"></div>
                <div id="progress-bar"></div>
                <img src="assets/icons/otter.png" id="otter" alt="Otter">
                <img src="assets/icons/fish.png" id="fish" alt="Fish">
                <img src="assets/icons/celebration.png" id="celebration" alt="Celebrating Otter">
            </div>
            
            <h2>Add a Task</h2>
            <form id="task-form">
                <input type="text" id="task-input" placeholder="Enter task">
                <input type="date" id="due-date">
                <input type="text" id="task-description" placeholder="Enter task description">
                <select id="task-tags">
                <option value="Project">Project</option>
                <option value="Learning">Learning</option>
                <option value="Misc">Misc</option>
                <option value="Fun">Fun</option>
                <option value="Debugging">Debugging</option>
                </select>
                <button type="submit">Add Task</button>
            </form>
            
            <ul id="task-list"></ul>
            
            <button id="delete-all">Delete All Tasks</button>

            <div id="edit-modal" class="modal">
                <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Edit Task</h2>
                <form id="edit-task-form">
                    <input type="text" id="edit-task-input" placeholder="Enter task">
                    <input type="date" id="edit-due-date">
                    <input type="text" id="edit-task-description" placeholder="Enter task description">
                    <select id="edit-task-tags">
                    <option value="Project">Project</option>
                    <option value="Learning">Learning</option>
                    <option value="Misc">Misc</option>
                    <option value="Fun">Fun</option>
                    <option value="Debugging">Debugging</option>
                    </select>
                    <button type="submit">Update Task</button>
                </form>
                </div>
            </div>`;
    })

    // Add Task test
    /* Tests functionality of add task button:
    * - Task is added to DOM
    * - Task is the task-list array
    * - Progress bar is updated correctly
    * - Input fields are cleared
    */
    test('that the add task button works', () => {
        // Should stay true at the end if all things pass
        let truth = true;
    
        // Get length of current task list
        const taskListItemsBefore = document.querySelectorAll('#task-list li');
        const taskListLengthBefore = taskListItemsBefore.length;
        
        // Fill in the entries to test
        let taskField = document.getElementById('task-input');
        let taskDate = document.getElementById('due-date');
        let taskDesc = document.getElementById('task-description');
        let taskTags = document.getElementById('task-tags');

        taskField.value = "Project 1";
        taskDate.value = "06/04/2024";
        taskDesc.value = "Testing the project field";
        taskTags.value = "Learning";
    
        // THE FUNCTION BEING TESTED
        addTask();
    
        // Check that the items have been added to task list and DOM, false if not added
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
    
        // Check that the progress text has appeared in the progress bar
        const progressText = document.getElementById('progress-text');
        if (progressText.textContent != 'Progress: 0.00% (0/1)') {
            truth = false;
        }
    
        // Check that the celebration otter is not visible, but the regular otter and fish are visible
        const happyOtter = document.getElementById('celebration');
        const workingOtter = document.getElementById('otter');
        const fish = document.getElementById('fish');
    
        if (happyOtter.style.display != 'none') {
            truth = false;
        }
        if (workingOtter.style.display == 'none') {
            truth = false;
        }
        if (fish.style.display == 'none') {
            truth = false;
        }

        // expect(verifyAddTask()).toBe(true);
        expect(truth).toBe(true);
    });

    // Delete Task function test
    /* Tests functionality of delete task button:
    * - Task is removed from DOM
    * - Task is removed from array list
    * - Progress bar is updated correctly
    */
    test('that the deleteTask function works', () => {

        // Add task to be deleted
        // Create `li` (item) and add it to the task list to be deleted
        let listItem = document.createElement('li');
        listItem.innerHTML = `<b>Task:</b> Project 1 <br> <b>Due Date:</b> 2024-06-20 <br> <b>Description:</b> First proj <br> <b>Tag:</b> Learning <br> <input type=\"checkbox\"><button>Delete</button><button>Edit</button>`

        const taskList = document.getElementById('task-list');
        taskList.appendChild(listItem);

        // Get length of list to check
        const taskListItems = document.querySelectorAll('#task-list li');
        const taskListLength = taskListItems.length;

        // Get the button that is referenced upon entranec to the deleteTask function
        const deleteButton = document.querySelectorAll('li button')[0];

        // Call the function to delete (mimicking createTaskElement by "clicking" the button)
        deleteButton.addEventListener('click', (e) => {
            deleteTask(e);
        })

        fireEvent.click(deleteButton);

        // Task is removed from DOM and array
        const taskListItemsAfter = document.querySelectorAll('#task-list li');
        const taskListLengthAfter = taskListItemsAfter.length;

        // Check progress is updated correctly
        const progressText = document.getElementById('progress-text');

        expect(taskListLength).toBe(1);
        expect(taskListLengthAfter).toBe(0);
        expect(progressText.textContent).toBe('Progress: 0.00% (0/0)')
    })

    // createTaskElement function test
    /* Tests functionality of createTaskElement function:
    * Note: For the purpose of this test, only one item is added
    * - Task element created with correct description
    * - Task created contains checkbox and a delete button
    * - Task's completed status in the tasks array is updated
    * - Progress bar is when checkbox is checked/unchecked
    * - Delete button (which is tested above) should update progress if clicked (here, specifically checking images and progress bar color)
    */
   test('that the create task element function works', () => {
        let listDescBtnAndChkBox = false;
        // let progressBarImages = false;
        // let progTextChecker = false;

        // Create the item
        const newListItem = createTaskElement('Project 1', '06/01/2024', 'Trial run: Testing', 'Fun', false);

        const dummyItem = document.createElement('li');
        dummyItem.innerHTML = `<b>Task:</b> Project 1 <br>\n        <b>Due Date:</b> 06/01/2024 <br>\n        <b>Description:</b> Trial run: Testing <br>\n        <b>Tag:</b> Fun <br>\n    <input type=\"checkbox\"><button>Delete</button>`;

        // Check item has correct description and task description
        if (newListItem.innerHTML === dummyItem.innerHTML) {
            listDescBtnAndChkBox = true;
        }

        expect(listDescBtnAndChkBox).toBe(true);

        // !!! Below requires some sort of local storage or local storage mock

        // // Add item to task list
        // const taskList = document.getElementById('task-list');
        // taskList.appendChild(newListItem);

        // // Click the checkbox so that it is checked off
        // const checkBox = document.querySelector('li input');

        // fireEvent.click(checkBox);

        // // Check that the celebration otter is  visible, and the regular otter and fish are not
        // const happyOtter = document.getElementById('celebration');
        // const workingOtter = document.getElementById('otter');
        // const fish = document.getElementById('fish');
        // console.log((happyOtter.style.display != 'none'));
        // console.log((workingOtter.style.display == 'none'));
        // console.log((fish.style.display == 'none'));

    
        // if ((happyOtter.style.display != 'none') && (workingOtter.style.display == 'none') 
        //     && (fish.style.display == 'none')) {

        //     progressBarImages = true;
        // }

        // // Check that the progress bar text is 100%
        // const progressText = document.getElementById('progress-text');
        // if (progressText.textContent == "Progress: 100.00% (1/1)") {
        //     progTextChecker = true;
        // }



        // UNSURE HOW TO CHECK COLOR (can get background-color, issue is no where in the HTML or JS does it show that the background changes color (it's always green))
        // // Do these if have time??
        // expect(progressBarImages).toBe(true);
        // expect(progTextChecker).toBe(true);

   })

   // Basically a mini version of add task (just checking if addTask gets called)
   test('that addTask is called on form submission', () => {
        let truth = true;
        const taskForm = document.getElementById('task-form');

        // Fill in the entries to test
        let taskField = document.getElementById('task-input');
        let taskDate = document.getElementById('due-date');
        let taskDesc = document.getElementById('task-description');
        let taskTags = document.getElementById('task-tags');

        taskField.value = "Project 1";
        taskDate.value = "06/04/2024";
        taskDesc.value = "Testing the project field";
        taskTags.value = "Learning";

        // Make sure the entries are actually there
        if (taskField.value != "Project 1") {
            truth = false;
        }

        // Activating the event listener
        taskFormSubmitAndDeleteAll();
        fireEvent.submit(taskForm);
    
        // Check that input fields are now empty
        taskField = document.getElementById('task-input');
        taskDate = document.getElementById('due-date');
        taskDesc = document.getElementById('task-description');
        taskTags = document.getElementById('task-tags');
    
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

        expect(truth).toBe(true);
   })

   // (This does not check local storage): Check if Ul list items are removed
   test('that all tasks are deleted', () => {
        const taskList = document.getElementById('task-list');
        let taskListItems = document.querySelectorAll('#task-list li');
        const deleteAllBtn = document.getElementById('delete-all');
        const childOne = document.createElement('li');
        const childTwo = document.createElement('li');
        const childThree = document.createElement('li');

        taskList.appendChild(childOne);
        taskList.appendChild(childTwo);
        taskList.appendChild(childThree);

        // Check that taskList has items in it
        taskListItems = document.querySelectorAll('#task-list li');
        expect(taskListItems.length).toBe(3);

        // Click the delete all
        taskFormSubmitAndDeleteAll();
        fireEvent.click(deleteAllBtn);

        taskListItems = document.querySelectorAll('#task-list li');
        expect(taskListItems.length).toBe(0);
   })
})
