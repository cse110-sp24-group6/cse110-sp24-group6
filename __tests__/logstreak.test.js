import puppeteer from 'puppeteer';
import {
  findStreak,
  getStreakFromStorage,
  dateToString,
  getCirclesFromStorage,
  weekFillIn
} from '../code-to-unit-test/logstreak-test.js'; 

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

const checkedImgSrc = "../source/assets/HTML_homepage_pics/checked_in.png";
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

const mockLogs = {
  [dateToString(today)]: { progress: 'Progress' },
  [dateToString(yesterday)]: { progress: 'Progress' },
  [dateToString(twoDaysAgo)]: { progress: 'Progress' }
};

//Actual Tests
describe('Daily Log Streak', () => {
  let browser, logPage, homePage;
  beforeAll(async () => {
    browser = await puppeteer.launch();
    logPage = await browser.newPage();
    homePage = await browser.newPage();
    await logPage.goto('http://127.0.0.1:5501/source/dailylog.html');
    await homePage.goto('http://127.0.0.1:5501/source/homepage.html');
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });


  test('increases streak count when log is added within the cluster', async () => {
    mockLogs[dateToString(threeDaysAgo)] = { progress: 'Progress' };
    localStorage.setItem('logs', JSON.stringify(mockLogs));
    localStorage.setItem('streak', findStreak());
    localStorage.setItem('circles', weekFillIn());
    
    //update streak & circles
    expect(getStreakFromStorage()).toBe(4);
    delete mockLogs[dateToString(threeDaysAgo)]
  });

  test('decreases and reallocates streak when a log within the cluster is deleted', async () => {
    delete mockLogs[dateToString(yesterday)];
    localStorage.setItem('logs', JSON.stringify(mockLogs));
    localStorage.setItem('streak', findStreak());

    expect(getStreakFromStorage()).toBe(1);
    mockLogs[dateToString(yesterday)] = { progress: 'Progress' };
  });

  test('streak remains unchanged when log not within streak cluster is added', async () => {
    mockLogs[dateToString(fourDaysAgo)] = { progress: 'Progress' };
    localStorage.setItem('logs', JSON.stringify(mockLogs));
    localStorage.setItem('streak', findStreak());

    expect(getStreakFromStorage()).toBe(3);
    delete mockLogs[dateToString(fourDaysAgo)];
  });

  test('streak remains unchanged when log not within streak cluster is deleted', async () => {
    mockLogs[dateToString(fourDaysAgo)] = { progress: 'Progress' };
    delete mockLogs[dateToString(fourDaysAgo)];
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
    delete mockLogs[dateToString(fourDaysAgo)];
    localStorage.setItem('logs', JSON.stringify(mockLogs));
    localStorage.setItem('streak', findStreak());
    expect(findStreak()).toBe(3);
  });

  test('streak only decreases by 1 when todays log is deleted', async () => {
    delete mockLogs[dateToString(today)];
    localStorage.setItem('logs', JSON.stringify(mockLogs));
    localStorage.setItem('streak', findStreak());
    expect(findStreak()).toBe(2);

    mockLogs[dateToString(today)] = { progress: 'Progress' };
  });

  test('streak checkboxes marked as done when log added', async () => {
    localStorage.setItem('logs', JSON.stringify(mockLogs));
    localStorage.setItem('streak', findStreak());

    // Get the current day of the week
    mockCircles[todayCircle] = checkedImgSrc;
    mockCircles[yesCircle] = checkedImgSrc;
    mockCircles[twoCircle] = checkedImgSrc;
    localStorage.setItem('circles', JSON.stringify(mockCircles));

    let circles = getCirclesFromStorage();
    for (let i = 0; i < 7; i++) {
      expect(circles[i].src).toBe(mockCircles[i].src);
    }
    });

  test('streak checkboxes unmarked when log is deleted', async () => {
    delete mockLogs[dateToString(yesterday)];
    localStorage.setItem('logs', JSON.stringify(mockLogs));
    localStorage.setItem('streak', findStreak());

    mockCircles[yesCircle] = uncheckedImgSrc;
    localStorage.setItem('circles', JSON.stringify(mockCircles));

    let circles = getCirclesFromStorage();
    for (let i = 0; i < 7; i++) {
      expect(circles[i].src).toBe(mockCircles[i].src);
    }

  });

  test('streak checkboxes are the same when page is refreshed', async () => {
    const circleIds = [
      'sunday-circle',
      'monday-circle',
      'tuesday-circle',
      'wednesday-circle',
      'thursday-circle',
      'friday-circle',
      'saturday-circle'
    ];
  
    const srcValues = {};
    circleIds.forEach(id => {
      const imgElement = document.getElementById(id);
      if (imgElement) {
        srcValues[id] = imgElement.src;
      }
    });

    const refreshedValues = JSON.parse(localStorage.getItem('circles'));
    circleIds.forEach(id => {
      const imgElement = document.getElementById(id);
      if (imgElement) {
        expect(imgElement.src).toBe(refreshedValues[id]);
      }
    });
  });
});
