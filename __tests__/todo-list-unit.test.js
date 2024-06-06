// todo-list-unit.test.js
import { verifyAddTask } from '../code-to-unit-test/unit-tests-todolist';

// Add Task Button test
/* Tests functionality of add task button:
 * - Task is added to DOM
 * - Task is the task-list array
 * - Progress bar is updated correctly
 * - Input fields are cleared
 */
test('that the add task button works', () => {
    expect(verifyAddTask()).toBe(true);
  });