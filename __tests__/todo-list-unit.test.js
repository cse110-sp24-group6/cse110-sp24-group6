// todo-list-unit.test.js
// import { jest } from '@jest/globals'
// import { verifyAddTask } from '../code-to-unit-test/unit-tests-todolist';
import { addTask } from '../code-to-unit-test/unit-tests-todolist';

// const domEnvironment = new 

// Add Task Button test
/* Tests functionality of add task button:
 * - Task is added to DOM
 * - Task is the task-list array
 * - Progress bar is updated correctly
 * - Input fields are cleared
 */

// jest.mock('../source/assets/scripts/todolist', () => {
//     document: {
//         querySelectorAll: jest.fn().mockImplementation((selector) => {
//             switch(selector) {
//                 case '#task-list li':
//                     return document.createElement('ul');
//                 case 'button':
//                     return document;
//                 default:
//                     return 'did not mock';
//             }
//         })
//     }
// })
// jest.mock('', () => {
//     document: {
//         getElementById: jest.fn().mockImplementation((selector) => {
//             switch(selector) {
//                 case 'task-list':

//             }
//         })
//     }
// })

// const addTask = require('../source/assets/scripts/todolist');
describe('To-do list functions', () => {
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
    // document.querySelector = jest.fn();
    test('that the add task button works', () => {
        //   document.querySelector.jest.fn().mockImplmentation((selector) => {
        //     if ( selector === '#task-list li') {
        //       return 
        //   }})
        // Should stay true at the end if all things pass
        let truth = true;
    
        // Get length of current task list
        const taskListItemsBefore = document.querySelectorAll('#task-list li');
        const taskListLengthBefore = taskListItemsBefore.length;
    
        // Note this is dangerous if more buttons are added, give the button a class or ID
        // const submitBtn = document.querySelectorAll('button')[0];
        // console.log('this is submitBtn: ' + submitBtn);
        
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
    
        // Check that the items have been added to task list, false if not added
        const taskListItemsAfter = document.querySelectorAll('#task-list li');
        const taskListLengthAfter = taskListItemsAfter.length;
        console.log("This is task list length after: " + taskListLengthAfter);
        
        if (taskListLengthBefore == taskListLengthAfter) {
            truth = false;
        }

        console.log("This is truth after checking the list length are not equal: " + truth);

    
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
    
        console.log("This is truth after checking that the input fields are empty: " + truth);

        // Check that the progress text has appeared in the progress bar
        const progressText = document.getElementById('progress-text');
        if (progressText.textContent != 'Progress: 0.00% (0/1)') {
            truth = false;
        }

        console.log("This is progressText value: " + progressText.textContent);
        console.log("This is truth after checking the progress bar text: " + truth);

    
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

        console.log("happyOtter.hidden: "+ happyOtter.style.display);
        console.log("workingOtter.hidden: "+ workingOtter.style.display);
        console.log("fish.hidden: "+ fish.style.display);
        console.log("This is truth after checking the display of the images: " + truth);

      
        // expect(verifyAddTask()).toBe(true);
        expect(truth).toBe(true);
    });
})
