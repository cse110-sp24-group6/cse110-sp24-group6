import puppeteer from 'puppeteer';

describe('Delete All Tasks E2E Test', () => {
  let browser;
  let page;

  beforeAll(async () => {
    try {
      browser = await puppeteer.launch();
      page = await browser.newPage();
      await page.goto('http://127.0.0.1:5501/source/todolist.html');
    } catch (error) {
      console.error('Failed to initialize browser:', error);
    }
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });

  test('adds a new task', async () => {
    await page.type('#task-input', 'Test Task');
    await page.type('#due-date', '12/31/2024'); 
    await page.type('#task-description', 'This is a test task description.');
    await page.select('#task-tags', 'Project');
    await page.click('#submit');

    const taskList = await page.$$('#task-list li');
    expect(taskList.length).toBe(1);

    const testTask = await page.$eval('#task-list li', el => el.textContent);
    expect(testTask).toContain('Test Task');
    expect(testTask).toContain('2024-12-31');
    expect(testTask).toContain('This is a test task description.');
    expect(testTask).toContain('Project');
  });

  test('edits a task when the "Edit" button is clicked', async () => {
    await page.click('.edit-button');

    // Wait for the modal to appear
    await page.waitForSelector('#edit-modal', { visible: true });

    // Focus on the input field inside the modal and type the new task
    await page.focus('#edit-task-input');
    await page.keyboard.type('Edited Task');

    // Submit the form
    await page.click('#update');

    // Wait for the modal to close
    await page.waitForSelector('#edit-modal', { hidden: true });

    // Verify the task has been updated
    const editedTask = await page.$eval('#task-list li', el => el.textContent);
    expect(editedTask).toContain('Edited Task');
  });

  test('checks off a task when the checkbox is clicked', async () => {
    // Add a new task
    await page.type('#task-input', 'Check Task');
    await page.type('#due-date', '12/31/2024'); 
    await page.type('#task-description', 'This is a check task description.');
    await page.select('#task-tags', 'Project');
    await page.click('#submit');

    // Find the checkbox element and click it
    await page.click('li input[type="checkbox"]');

    // Check if the task is marked as completed
    const isChecked = await page.$eval('li input[type="checkbox"]', checkbox => checkbox.checked);
    expect(isChecked).toBe(true);
  });

  test('deletes a task when the "Delete" button is clicked', async () => {
    await page.click('.delete-button');

    // Verify the task has been deleted
    const tasks = await page.$$('#task-list li');
    expect(tasks.length).toBe(1);
  });

  test('deletes all tasks when the "Delete All" button is clicked', async () => {
    await page.type('#task-input', 'Test Task 1');
    await page.click('#submit');
    await page.type('#task-input', 'Test Task 2');
    await page.click('#submit');

    await page.click('#delete-all');

    const tasks = await page.$$('#task-list li');
    expect(tasks.length).toBe(0);
  });

});

