// TODO: remember to change all the urls to the github page if we are using that for deployment
import puppeteer from 'puppeteer';
let browser; 
let page;

// Helper Functions
/**
	* Verifies whether the text content of a selector matches a given string
  * 
  * @param {Object} project - parent project/element of the selector
  * @param {String} selector - identifier of the selector(class, id)
  * @param {String} expected - we are testing whether the selector's text matches this string
  * 
*/

async function checkElementTextContent(project, selector, expected){
  let text = await project.$eval(selector, element => element.textContent);
  expect(text).toBe(expected);
}

/**
	* Adds text to an input element, replaces previous text
  * 
  * @param {String} inputArea - class/id of element to add text to
  * @param {String} text - text to input
  * 
*/
async function addTextInputToElement(inputArea, text){
  let inputEl = await page.$(inputArea);
  await inputEl.click({ clickCount: 3});
  await page.keyboard.type(text);
}

// link to website: https://cse110-sp24-group6.github.io/cse110-sp24-group6/source/homepage.html

// Navigation Bar Tests
describe("Basic Navigation Bar Interactions", () => {
    beforeAll(async () => {
      browser = await puppeteer.launch({headless: false});
      page = await browser.newPage();
      await page.goto("http://127.0.0.1:5500/source/homepage.html");
    });
    it('Testing if daily log icon sends you to daily log page', async () => {
      await page.waitForSelector('#daily-log-button', { visible: true });
      const dailyLogIcon = await page.$('#daily-log-button');
      await dailyLogIcon.click();
      await page.waitForNavigation();
      const url = page.url();
      expect(url).toBe('http://127.0.0.1:5500/source/dailylog.html');
    });

    it('Testing if homepage icon sends you to the homepage', async () => {
      await page.waitForSelector('#home-page-button', { visible: true });
      const homepageIcon = await page.$('#home-page-button');
      await homepageIcon.click();
      await page.waitForNavigation();
      const url = page.url();
      expect(url).toBe('http://127.0.0.1:5500/source/homepage.html');
    });
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

// Projects Tests
describe("Projects CRUD functionality", () => {
    it('Checking if a new project can be created through the add button and editing form', async () => {
      for(let i = 0; i < 10; i++){
        console.log(`Adding project ${i+1}/10`);

        // Pressing add button
        console.log('Testing if pressing add button opens editing overlay');
        await page.waitForSelector('#home-page-button', { visible: true });
        const homepageIcon = await page.$('#home-page-button');
        await homepageIcon.click();
        await page.waitForNavigation();
        await page.$eval(('#add-button'), el => el.click());
        const editOverlayExists = await page.$('.edit-form') !== null;
        expect(editOverlayExists).toBe(true);

        // add Project Name, Description, and Github Link
        await addTextInputToElement('#input-project-name', 'DevTools Project');
        await addTextInputToElement('#input-project-description', 'CSE 110 Spring 2024 Project');
        await addTextInputToElement('#input-github-link', 'https://github.com/cse110-sp24-group6/cse110-sp24-group6');

        // Set "This project is" to complete
        await page.select('#completed-select-box', 'completed');

        // pressing save
        const saveButton = await page.$('#save-button');
        await saveButton.click();

        console.log(`Checking that ${i+1} project card exists`);
        let numProjects = await page.$$eval('.project-card', (projItems) => {
          return projItems.length;
        });

        expect(numProjects).toBe(i+1);
      }
    }, 20000);
    it("Checking if project cards are created with the correct inputed values", async () => {
        let projectCards = await page.$$('.project-card');
        for(let i = 0; i < 10; i++){
          // Checking if each new project created has correct attributes
          console.log(`Checking project ${i+1}/10`);
          const projectEl = projectCards[`${i}`];

          // Checking Project Title and Description
          await checkElementTextContent(projectEl, '.project-title', "DevTools Project");
          await checkElementTextContent(projectEl, '.project-description', "CSE 110 Spring 2024 Project");

          // Checking Github Link
          const projGithubLink = await projectEl.$eval('a.github-link', element => element.href);
          expect(projGithubLink).toBe("https://github.com/cse110-sp24-group6/cse110-sp24-group6");

          // Checking Completeness status icon
          const projStatusIcon = await projectEl.$eval('.status-icon', element => element.src);
          expect(projStatusIcon).toBe("http://127.0.0.1:5500/source/assets/icons/homepage/completed_project/brown.svg");
        }
    }, 20000);
    it("Checking if projects were added to local storage", async() => {
      const projectItems = await page.evaluate(()=>{
        return localStorage.getItem('projects');
      });
      let parsedProj = JSON.parse(projectItems);
      for(let i = 0; i < 10; i++){
        expect(parsedProj[`${i}`].title).toBe("DevTools Project");
        expect(parsedProj[`${i}`].description).toBe("CSE 110 Spring 2024 Project");
        expect(parsedProj[`${i}`].githubURL).toBe("https://github.com/cse110-sp24-group6/cse110-sp24-group6");
        expect(parsedProj[`${i}`].completed).toBe(true);
      }
    });

    it("Checking if the values on the project cards changed after editing", async () => {
      let projectCards = await page.$$('.project-card');
      for(let i = 0; i < 10; i++){
        console.log(`Editing project ${i+1}/10`);
        const projectEl = projectCards[`${i}`];

        // Clicking Edit Button
        await projectEl.$eval(('.edit-icon'), el => el.click());
        await page.$('.edit-form');

        // Editing Project Name, Description, and Github Link
        await addTextInputToElement('#input-project-name', 'Lorem ipsum dolor sit amet, adhuc liber quando eu eos, sed ut case urbanitas.');
        await addTextInputToElement('#input-project-description', 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
        await addTextInputToElement('#input-github-link', 'https://github.com/elaine-ch/CSE110-SP24-Lab6-Template');
       
        // Editing project completeness status
        await page.select('#completed-select-box', 'current');

        // press save
        const saveButton = await page.$('#save-button');
        await saveButton.click();
        // Checking if Project Title was updated
        await checkElementTextContent(projectEl, ".project-title", "Lorem ipsum dolor sit amet, adhuc liber quando eu eos, sed ut case urbanitas.");
        //Checking if Project Description was updated
        await checkElementTextContent(projectEl, ".project-description", "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.");

        // Checking if Github link was updated
        const projGithubLink = await projectEl.$eval('a.github-link', element => element.href);
        expect(projGithubLink).toBe("https://github.com/elaine-ch/CSE110-SP24-Lab6-Template");

        // Check if right completeness status icon showed up
        const projStatusIcon = await projectEl.$eval('.status-icon', element => element.src);
        expect(projStatusIcon).toBe("http://127.0.0.1:5500/source/assets/icons/homepage/current_project/brown.svg");
      }
    }, 20000);

    it("Check if local storage was updated after editing", async () => {
      const projectItems = await page.evaluate(()=>{
        return localStorage.getItem('projects');
      });
      let parsedProj = JSON.parse(projectItems);
      for(let i = 0; i < 10; i++){
        expect(parsedProj[`${i}`].title).toBe("Lorem ipsum dolor sit amet, adhuc liber quando eu eos, sed ut case urbanitas.");
        expect(parsedProj[`${i}`].description).toBe("Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.");
        expect(parsedProj[`${i}`].githubURL).toBe("https://github.com/elaine-ch/CSE110-SP24-Lab6-Template");
        expect(parsedProj[`${i}`].completed).toBe(false);
      }
    });

    it("Refresh page, and check if the number of project cards remains the same", async () => {
      await page.reload();

      console.log("Checking if there are still 10 projects...");
      let numProjects = await page.$$eval('.project-card', (projItems) => {
        return projItems.length;
      });
      expect(numProjects).toBe(10);

    });
    it("Check if the values on the project cards remain the same after page refresh", async () => {
      let projectCards = await page.$$('.project-card');
      for(let i = 0; i < 10; i++){
        const projectEl = projectCards[`${i}`];
        // Checking if Project Title was updated
        await checkElementTextContent(projectEl, ".project-title", "Lorem ipsum dolor sit amet, adhuc liber quando eu eos, sed ut case urbanitas.");
        //Checking if Project Description was updated
        await checkElementTextContent(projectEl, ".project-description", "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.");

        // Checking if Github link was updated
        const projGithubLink = await projectEl.$eval('a.github-link', element => element.href);
        expect(projGithubLink).toBe("https://github.com/elaine-ch/CSE110-SP24-Lab6-Template");

        // Check if right completeness status icon showed up
        const projStatusIcon = await projectEl.$eval('.status-icon', element => element.src);
        expect(projStatusIcon).toBe("http://127.0.0.1:5500/source/assets/icons/homepage/current_project/brown.svg");
      }
    })

    it("Press delete button on each project, and check if that project was deleted", async () => {
      let projectCards = await page.$$('.project-card');
      for(let i = 0; i < 10; i++){
        console.log(`Deleting project ${i}/10..`);
        const projectEl = projectCards[`${i}`];
        await projectEl.$eval(('#delete-button'), el => el.click());
        // Checking if the number of project cards went back down to 0
        let numProjects = await page.$$eval('.project-card', (projItems) => {
          return projItems.length;
        });
        expect(numProjects).toBe(10-i-1);
      }
   });
    it("Check if projects were removed from local storage after delete", async () => {
      const projectItems = await page.evaluate(()=>{
        return localStorage.getItem('projects');
      });
      expect(projectItems).toBe("[]");
    })
  });
  afterAll(async () => {
    await browser.close();
  });