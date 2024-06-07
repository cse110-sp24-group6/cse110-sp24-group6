// TODO: remember to change all the urls to the github page
import puppeteer from 'puppeteer';
let browser;
let page;
describe("Basic Navigation Bar Interactions", () => {
    beforeAll(async () => {
      browser = await puppeteer.launch({headless: false, slowMo: 25});
      page = await browser.newPage();
      await page.goto("http://127.0.0.1:5500/source/homepage.html");
    });
    it('Testing if daily log icon sends you to daily log page', async () => {
      await page.waitForSelector('#daily-log-button', { visible: true });
      const dailyLogIcon = await page.$('#daily-log-button');
      await dailyLogIcon.click();
      await page.waitForNavigation();
      //await page.waitForSelector('#daily-log-button', { visible: true });
      const url = page.url();
      expect(url).toBe('http://127.0.0.1:5500/source/dailylog.html');
    });

    it('Testing if homepage icon sends you to the homepage', async () => {
      await page.waitForSelector('#home-page-button', { visible: true });
      const homepageIcon = await page.$('#home-page-button');
      await homepageIcon.click();
      await page.waitForNavigation();
      //await page.waitForSelector('#daily-log-button', { visible: true });
      const url = page.url();
      expect(url).toBe('http://127.0.0.1:5500/source/homepage.html');
    });
    // this test fails, but I think its because there are some bugs on this page
    it('Testing if to-do list icon sends you to the to-do list page', async () => {
      await page.waitForSelector('#to-do-list-button', { visible: true });
      const toDoIcon = await page.$('#to-do-list-button');
      await toDoIcon.click();
      await page.waitForNavigation();
      //await page.waitForSelector('#daily-log-button', { visible: true });
      const url = page.url();
      expect(url).toBe('http://127.0.0.1:5500/source/todolist.html');
    });
});

describe("Projects CRUD functionality", () => {
    it('Test if pressing add button opens editing overlay', async () => {
      await page.waitForSelector('#home-page-button', { visible: true });
      const homepageIcon = await page.$('#home-page-button');
      await homepageIcon.click();
      await page.waitForNavigation();
      console.log("Pressing project add button...");
      let addButton = await page.$eval(('#add-button'), el => el.click());
      const editOverlayExists = await page.$('.edit-form') !== null;
      expect(editOverlayExists).toBe(true);
    });

    it('Input items into edit form, click save, and check if a new project was added', async () => {
      // add Project Name
      const projectNameInput = await page.$('#input-project-name');
      await projectNameInput.click();
      await page.keyboard.type('DevTools Project');

      // add Project Description
      const projectDescription = await page.$('#input-project-description');
      await projectDescription.click();
      await page.keyboard.type('CSE 110 Spring 2024 Project');

      // add Github Link
      const gitHubLink = await page.$('#input-github-link');
      await gitHubLink.click();
      await page.keyboard.type('https://github.com/cse110-sp24-group6/cse110-sp24-group6');

      // Set "This project is" to complete
      await page.select('#completed-select-box', 'completed');


      // press save
      const saveButton = await page.$('#save-button');
      await saveButton.click();

      console.log("Checking for 1 project card...");
      let numProjects = await page.$$eval('.project-card', (projItems) => {
        return projItems.length;
      });

      expect(numProjects).toBe(1);
      
      // Checking if new project created has correct attributes
      console.log("Checking if Project Name, Project Description, Github link, and completeness status are as inputed...");
      const projectEl = await page.$('.project-card');

      // Project Title
      const projTitle = await projectEl.$eval('.project-title', element => element.textContent);
      expect(projTitle).toBe("DevTools Project");

      // Project Description
      const projDescription = await projectEl.$eval('.project-description', element => element.textContent);
      expect(projDescription).toBe("CSE 110 Spring 2024 Project");

      // Github Link
      const projGithubLink = await projectEl.$eval('a.github-link', element => element.href);
      expect(projGithubLink).toBe("https://github.com/cse110-sp24-group6/cse110-sp24-group6");

      // Check if right completeness status icon showed up
      const projStatusIcon = await projectEl.$eval('.status-icon', element => element.src);
      expect(projStatusIcon).toBe("http://127.0.0.1:5500/source/assets/icons/homepage/completed_project/brown.svg");
    }, 20000);

    it("Edit values on project card, and check if values are changed", async () => {
      // Clicking Edit Button
      console.log("Clicking edit button on project 1");
      const projectEl = await page.$('.project-card');
      await projectEl.$eval(('.edit-icon'), el => el.click());
      await page.$('.edit-form')

      // Editing Project Name
      const projTitleInput = await page.$('#input-project-name');
      const currProjTitle = await page.$eval('#input-project-name', element => element.value);
      await projTitleInput.click();
      // remove current text
      for(let k = 0; k < currProjTitle.length; k++){
        await page.keyboard.press('Backspace');
      }
      await page.keyboard.type('Lorem ipsum dolor sit amet, adhuc liber quando eu eos, sed ut case urbanitas.');

      // Editing Project Description
      const projDescInput = await page.$('#input-project-description');
      const currProjDesc = await page.$eval('#input-project-description', element => element.value);
      await projDescInput.click();
      // remove current text
      for(let k = 0; k < currProjDesc.length; k++){
        await page.keyboard.press('Backspace');
      }
      await page.keyboard.type('Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
      // Editing Github Link
      const gitHubLink = await page.$('#input-github-link');
      const currLink = await page.$eval('#input-github-link', element => element.value);
      console.log(currLink);
      
      //remove current text
      // for(let k = 0; k < currLink.length; k++){
      //   await page.keyboard.press('Backspace');
      // }
      await page.evaluate( () => gitHubLink.value = "");
      await gitHubLink.click();
      await page.keyboard.type('https://github.com/elaine-ch/CSE110-SP24-Lab6-Template');
      // Editing This Project is...
      await page.select('#completed-select-box', 'current');

      // press save
      const saveButton = await page.$('#save-button');
      await saveButton.click();

      // Checking if Project Title was updated
      const projTitle = await projectEl.$eval('.project-title', element => element.textContent);
      expect(projTitle).toBe("Lorem ipsum dolor sit amet, adhuc liber quando eu eos, sed ut case urbanitas.");

      // Checking if Project Description was updated
      const projDescription = await projectEl.$eval('.project-description', element => element.textContent);
      expect(projDescription).toBe("Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.");

      // Checking if Github link was updated
      const projGithubLink = await projectEl.$eval('a.github-link', element => element.href);
      expect(projGithubLink).toBe("https://github.com/elaine-ch/CSE110-SP24-Lab6-Template");

      // Check if right completeness status icon showed up
       const projStatusIcon = await projectEl.$eval('.status-icon', element => element.src);
       expect(projStatusIcon).toBe("http://127.0.0.1:5500/source/assets/icons/homepage/current_project/brown.svg");

    }, 20000);

    it("Refresh page, and check if project cards remain the same", async () => {
      await page.reload();
      console.log("Checking if the amount of project cards remain the same...");
      let numProjects = await page.$$eval('.project-card', (projItems) => {
        return projItems.length;
      });

      expect(numProjects).toBe(1);
    });

    it("Press delete button on project, and check if that project was deleted", async () => {
      const projectEl = await page.$('.project-card');
      console.log("Deleting 1 project...");
      await projectEl.$eval(('#delete-button'), el => el.click());
      // Checking if the number of project cards went back down to 0
      let numProjects = await page.$$eval('.project-card', (projItems) => {
        return projItems.length;
      });
      expect(numProjects).toBe(0);
      await browser.close();
    });
    
  });