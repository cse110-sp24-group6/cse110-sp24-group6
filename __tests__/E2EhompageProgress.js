import puppeteer from 'puppeteer';

describe('Homepage Task Progress Tests', () => {
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


  test('adds a new task and updates progress', async () => {
    await page.type('#task-input', 'Test Task');
    await page.type('#due-date', '12/31/2024');
    await page.type('#task-description', 'This is a test task description.');
    await page.select('#task-tags', 'Project');
    await page.click('#submit');

    // Navigate to the homepage
    await page.goto('http://127.0.0.1:5501/source/homepage.html');
    await page.waitForSelector('iframe');

    const frameHandle = await page.$('iframe');
    const frame = await frameHandle.contentFrame();

    const taskProgress = await frame.evaluate(() => {
      return JSON.parse(localStorage.getItem('taskProgress')) || { completedTasks: 0, totalTasks: 0 };
    });

    expect(taskProgress.completedTasks).toBe(0); // 0 completed
    expect(taskProgress.totalTasks).toBe(1); // 1 total task
  });

 

    test('checks off a task and updates progress', async () => {
    await page.goto('http://127.0.0.1:5501/source/todolist.html'); // Go back to the to-do list page
    await page.waitForSelector('li input[type="checkbox"]'); 
    await page.click('li input[type="checkbox"]');

    // Navigate to the homepage
    await page.goto('http://127.0.0.1:5501/source/homepage.html');
    await page.waitForSelector('iframe');

    const frameHandle = await page.$('iframe');
    const frame = await frameHandle.contentFrame();

    const taskProgress = await frame.evaluate(() => {
      return JSON.parse(localStorage.getItem('taskProgress')) || { completedTasks: 0, totalTasks: 0 };
    });

    expect(taskProgress.completedTasks).toBe(1); // 1 completed
    expect(taskProgress.totalTasks).toBe(1); // 1 total task
  });

  test('deletes a task and updates progress', async () => {
    await page.goto('http://127.0.0.1:5501/source/todolist.html'); // Go back to the to-do list page
    await page.waitForSelector('.delete-button'); 
    await page.click('.delete-button');

    // Navigate to the homepage
    await page.goto('http://127.0.0.1:5501/source/homepage.html');
    await page.waitForSelector('iframe');

    const frameHandle = await page.$('iframe');
    const frame = await frameHandle.contentFrame();

    const taskProgress = await frame.evaluate(() => {
      return JSON.parse(localStorage.getItem('taskProgress')) || { completedTasks: 0, totalTasks: 0 };
    });

    expect(taskProgress.completedTasks).toBe(0); // 0 completed
    expect(taskProgress.totalTasks).toBe(0); // 0 total tasks
  });

  test('deletes all tasks and updates progress', async () => {
    await page.goto('http://127.0.0.1:5501/source/todolist.html'); // Go back to the to-do list page

    // Delete all tasks if any exist
    let taskExists = await page.$('.task-item') !== null;
    while (taskExists) {
      await page.click('.task-item .delete-button');
      await page.waitForTimeout(100); // Small delay to ensure the task is deleted
      taskExists = await page.$('.task-item') !== null;
    }

    // Navigate to the homepage
    await page.goto('http://127.0.0.1:5501/source/homepage.html');
    await page.waitForSelector('iframe');

    const frameHandle = await page.$('iframe');
    const frame = await frameHandle.contentFrame();

    const taskProgress = await frame.evaluate(() => {
      return JSON.parse(localStorage.getItem('taskProgress')) || { completedTasks: 0, totalTasks: 0 };
    });

    expect(taskProgress.completedTasks).toBe(0); // 0 completed
    expect(taskProgress.totalTasks).toBe(0); // 0 total tasks
  });
});
