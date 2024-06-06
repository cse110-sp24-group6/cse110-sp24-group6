/* Tests to make sure that the progress bar should be empty
 *   when there are no visible tasks
 */


/* Tests functionality of add task button:
 * - Task is added to DOM
 * - Task is the task-list array
 * - Progress bar is updated correctly
 * - Input fields are cleared
 */
export function verifyAddTask() {
    
    // Should stay true at the end if all things pass
    let truth = true;

    // Get length of current task list
    const taskListItemsBefore = document.querySelectorAll('#task-list li');
    const taskListLengthBefore = taskListItemsBefore.length;

    // Note this is dangerous if more buttons are added, give the button a class or ID
    const submitBtn = document.querySelectorAll('button')[0];

    // Fill in the entries to test
    let taskField = document.getElementById('task-input');
    let taskDate = document.getElementById('due-date');
    let taskDesc = document.getElementById('task-description');
    let taskTags = document.getElementById('task-tags');
    let taskStickers = document.getElementById('task-stickers');
    let taskSubtasks = document.getElementById('task-subtasks');

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

    return truth;
}