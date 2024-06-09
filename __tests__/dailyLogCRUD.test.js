// const puppeteer = require('puppeteer');
import puppeteer from "puppeteer";
describe('Basic user flow for Website', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({ headless: false });
        page = await browser.newPage();
        await page.goto('https://cse110-sp24-group6.github.io/cse110-sp24-group6/source/dailylog.html');
    });

    afterAll(async () => {
        await browser.close();
    });

    const logData = {
        progress: "Completed unit testing",
        challenges: "Faced issues with async operations",
        learnings: "Learned about async/await",
        futurePlan: "Implement E2E tests"
    };

    async function fillLogEntry(data) {
        await page.type('#progress', data.progress);
        await page.type('#challenges', data.challenges);
        await page.type('#learnings', data.learnings);
        await page.type('#future-plan', data.futurePlan);
    }

    it('Add a NEW log', async () => {
        console.log('Adding a log...');
        
        // Select a date (today's date for simplicity)
        await page.click('.date.today'); // Click today's date

        // Fill out the log entry
        await fillLogEntry(logData);
        // await new Promise(resolve => setTimeout(resolve, 5000)); 
        // Save the entry
        await page.click('#save-entry');
        // Verify the log is saved in localStorage
        const logs = await page.evaluate(() => localStorage.getItem('logs'));
        const parsedLogs = JSON.parse(logs);
        const todayStr = new Date().toISOString().split('T')[0];
        // await new Promise(resolve => setTimeout(resolve, 5000));
        console.log(todayStr);
        expect(parsedLogs[todayStr].progress).toBe(logData.progress);
        expect(parsedLogs[todayStr].challenges).toBe(logData.challenges);
        expect(parsedLogs[todayStr].learnings).toBe(logData.learnings);
        expect(parsedLogs[todayStr].futurePlan).toBe(logData.futurePlan);
    }, 20000);

    it('Refreshing page', async () => {
        console.log('Refreshing page to check local storage...');
        
        // Select a date (today's date for simplicity)
        await page.click('.date.today'); // Click today's date

        // Refreshing page here
        await page.reload();
        // Verify the log is saved in localStorage
        const logs = await page.evaluate(() => localStorage.getItem('logs'));
        const parsedLogs = JSON.parse(logs);
        const todayStr = new Date().toISOString().split('T')[0];
        // await new Promise(resolve => setTimeout(resolve, 5000));
        console.log(todayStr);
        expect(parsedLogs[todayStr].progress).toBe(logData.progress);
        expect(parsedLogs[todayStr].challenges).toBe(logData.challenges);
        expect(parsedLogs[todayStr].learnings).toBe(logData.learnings);
        expect(parsedLogs[todayStr].futurePlan).toBe(logData.futurePlan);
    }, 20000);

    it('Editing today log', async () => {
        console.log('Editing a log...');
        
        // Select a date (today's date for simplicity)
        await page.click('.date.today'); // Click today's date
        // Fill out the log entry
        await page.type('#progress', " and end to end testing");
        // Save the entry
        await page.click('#save-entry');
        // Verify the log is saved in localStorage
        const logs = await page.evaluate(() => localStorage.getItem('logs'));
        const parsedLogs = JSON.parse(logs);
        const todayStr = new Date().toISOString().split('T')[0];
        expect(parsedLogs[todayStr].progress).toBe("Completed unit testing and end to end testing");
        expect(parsedLogs[todayStr].challenges).toBe(logData.challenges);
        expect(parsedLogs[todayStr].learnings).toBe(logData.learnings);
        expect(parsedLogs[todayStr].futurePlan).toBe(logData.futurePlan);
    }, 20000);

    it('Delete one', async () => {
        console.log('Delete log...');

        // Select the same date (today's date for simplicity)
        await page.click('.date.today'); // Click today's date

        // Delete the entry
        await page.waitForSelector('button[id="delete-entry"]'); 
        await page.click('button[id="delete-entry"]');

        // Verify the log is removed from localStorage
        const logs = await page.evaluate(() => localStorage.getItem('logs'));
        const parsedLogs = JSON.parse(logs);
        const todayStr = new Date().toISOString().split('T')[0];

        expect(parsedLogs[todayStr]).toBeUndefined();
    }, 20000);

    // checking if deletion of log works
    it('Refresh and check after deletion', async () => {
        console.log('Refreshing...');

        // Reload the page
        await page.reload();

        // Verify the log is still deleted in localStorage
        const logs = await page.evaluate(() => localStorage.getItem('logs'));
        const parsedLogs = JSON.parse(logs);
        const todayStr = new Date().toISOString().split('T')[0];

        expect(parsedLogs[todayStr]).toBeUndefined();
    }, 20000);
});
