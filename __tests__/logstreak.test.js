import puppeteer from 'puppeteer';
import {
  findStreak,
  getStreakFromStorage,
  dateToString,
  getCirclesFromStorage,
  weekFillIn
} from '../code-to-unit-test/logstreak-test.js'; 

let browser, logPage, homePage;

// Mock data and utility functions
const today = new Date();
const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
const fourDaysAgo = new Date(Date.now() - 4 * 24 * 60 * 60 * 1000);
const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

const todayCircle = today.getDay();  
const yesCircle = yesterday.getDay();
const twoCircle = twoDaysAgo.getDay();

const uncheckedImgSrc = "../source/assets/HTML_homepage_pics/unchecked.png";
const mockCircles = {
  '0': uncheckedImgSrc,
  '1': uncheckedImgSrc,
  '2': uncheckedImgSrc,
  '3': uncheckedImgSrc,
  '4': uncheckedImgSrc,
  '5': uncheckedImgSrc,
  '6': uncheckedImgSrc
};

let mockLogs = {};

//Actual Tests
describe('Daily Log Streak', () => {
  beforeAll(async () => {
    try {
      browser = await puppeteer.launch();
      homePage = await browser.newPage();
      await homePage.goto('http://127.0.0.1:5501/source/homepage.html');
      logPage = await browser.newPage();
      await logPage.goto('http://127.0.0.1:5501/source/dailylog.html');
    } catch {
    }
  });

  afterAll(async () => {
    if(browser){
      await browser.close();
    }
  });

  beforeEach(() => {
    mockLogs = {};
    mockLogs[dateToString(today)] = { progress: 'Progress' };
    mockLogs[dateToString(yesterday)] = { progress: 'Progress' };
    mockLogs[dateToString(twoDaysAgo)] = { progress: 'Progress' };
  });

  test('increases streak count when log is added within the cluster', async () => {
    mockLogs[dateToString(threeDaysAgo)] = { progress: 'Progress' };
    localStorage.setItem('logs', JSON.stringify(mockLogs));
    localStorage.setItem('streak', findStreak());
    localStorage.setItem('circles', weekFillIn());
    
    //update streak & circles
    expect(getStreakFromStorage()).toBe(4);
  });

  test('decreases and reallocates streak when a log within the cluster is deleted', async () => {
    delete mockLogs[`${dateToString(yesterday)}`];
    localStorage.setItem('logs', JSON.stringify(mockLogs));
    localStorage.setItem('streak', findStreak());

    expect(findStreak()).toBe(1);
  });

  test('streak remains unchanged when log not within streak cluster is added', async () => {
    mockLogs[dateToString(fourDaysAgo)] = { progress: 'Progress' };
    localStorage.setItem('logs', JSON.stringify(mockLogs));
    localStorage.setItem('streak', findStreak());

    expect(getStreakFromStorage()).toBe(3);
  });

  test('streak remains unchanged when log not within streak cluster is deleted', async () => {
    mockLogs[dateToString(fourDaysAgo)] = { progress: 'Progress' };
    delete mockLogs[`${dateToString(fourDaysAgo)}`];
    localStorage.setItem('logs', JSON.stringify(mockLogs));
    localStorage.setItem('streak', findStreak());

    expect(findStreak()).toBe(3);
  });

  test('streak remains unchanged when log on future date is added', async () => {
    mockLogs[dateToString(tomorrow)] = { progress: 'Progress' };
    localStorage.setItem('logs', JSON.stringify(mockLogs));
    localStorage.setItem('streak', findStreak());

    expect(findStreak()).toBe(3);
  });

  test('streak remains unchanged when log on future date is deleted', async () => {
    mockLogs[dateToString(tomorrow)] = { progress: 'Progress' };
    delete mockLogs[`${dateToString(tomorrow)}`];
    localStorage.setItem('logs', JSON.stringify(mockLogs));
    localStorage.setItem('streak', findStreak());

    expect(findStreak()).toBe(3);
  });

  test('streak only decreases by 1 when todays log is deleted', async () => {
    delete mockLogs[`${dateToString(today)}`];
    localStorage.setItem('logs', JSON.stringify(mockLogs));
    localStorage.setItem('streak', findStreak());

    expect(findStreak()).toBe(2);
  });

  test('streak checkboxes marked as done when log added', async () => {
    localStorage.setItem('logs', JSON.stringify(mockLogs));
    localStorage.setItem('streak', findStreak());

    // Get the current day of the week
    mockCircles[`${todayCircle}`] = '../source/assets/HTML_homepage_pics/checked_in.png';
    mockCircles[`${yesCircle}`] = '../source/assets/HTML_homepage_pics/checked_in.png';
    mockCircles[`${twoCircle}`] = '../source/assets/HTML_homepage_pics/checked_in.png';
    localStorage.setItem('circles', JSON.stringify(mockCircles));

    let circles = getCirclesFromStorage();
    for (let i = 0; i < 7; i++) {
      expect(circles[`${i}`]).toBe(mockCircles[`${i}`]);
    }
    });

  test('streak checkboxes unmarked when log is deleted', async () => {
    delete mockLogs[`${dateToString(yesterday)}`];
    localStorage.setItem('logs', JSON.stringify(mockLogs));
    localStorage.setItem('streak', findStreak());

    mockCircles[`${yesCircle}`] = "../source/assets/HTML_homepage_pics/checked_in.png";
    localStorage.setItem('circles', JSON.stringify(mockCircles));

    let circles = getCirclesFromStorage();
    for (let i = 0; i < 7; i++) {
      expect(circles[`${i}`]).toBe(mockCircles[`${i}`]);
    }
  });

});
