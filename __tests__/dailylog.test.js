import { updateCalendar, selectDate,
    showLogEntryModal, deleteAllEntries, prevMonth, nextMonth, today } 
    from '../code-to-unit-test/dailylog-unit.js';

import { fireEvent } from '@testing-library/dom';

describe('Daily Log Unit Testing', () => { 
    beforeEach(async () => { 
        document.body.innerHTML = 
        `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Calendar</title>
                <link rel="stylesheet" href="assets/styles/dailylog.css">
                <link rel="stylesheet" href="assets/styles/updated_homepage_CSS.css">
            </head>
            <body>
                <div class="content">
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
                    <div class="container">
                        <div class="left-side">
                            <h1>Daily Log</h1>
                            <hr>
                            <!-- Calendar Stuff -->
                            <div class="calendar">
                                <div class="header">
                                    <span class="nav" id="prev-month">&lt;</span>
                                    <span class="month" id="month"></span>
                                    <span class="year" id="year"></span>
                                    <span class="nav" id="next-month">&gt;</span>
                                </div>
                                <span class="days">
                                    <p class="day">Sun</p>
                                    <p class="day">Mon</p>
                                    <p class="day">Tue</p>
                                    <p class="day">Wed</p>
                                    <p class="day">Thu</p>
                                    <p class="day">Fri</p>
                                    <p class="day">Sat</p>
                                </span>
                                <div class="dates" id="dates"></div>
                            </div>

                            <div class="entries-container" id="entries-container"></div>

                            <div class="buttons">
                                <button id="delete-all">Delete All Entries</button>
                                <button id="today">Today</button>
                            </div>

                        </div>
                        <div class="right-side">
                            <!-- Log Entry Stuff -->
                            <div class="modal" id="log-entry-modal">
                                <div class="modal-content">
                                    <h2 id="modal-date"></h2>
                                    <span class="close" onclick="document.getElementById('log-entry-modal').style.display='none'">&times;</span>
                                    <textarea id="progress" rows="3" placeholder="What progress did you make today?"></textarea>
                                    <textarea id="challenges" rows="3" placeholder="What challenges did you face?"></textarea>
                                    <textarea id="learnings" rows="3" placeholder="New things learnt..."></textarea>
                                    <textarea id="future-plan" rows="3" placeholder="What's your plan for tomorrow?"></textarea>
                                    <div class="buttons">
                                        <button id="save-entry">Save Entry</button>
                                        <button id="delete-entry">Delete Entry</button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
            </html>`;
    });


    test('add log entry', () => { 
        // Buttons 
        let saveLog = document.getElementById('save-entry');
        // Save log 
        let log = {'2024-06-06':{'progress':'hi','challenges':'hi','learnings':'hi','futurePlan':'hi'}};
        let logs = showLogEntryModal('2024-06-06',{'progress':'hi','challenges':'hi','learnings':'hi','futurePlan':'hi'},{});
        fireEvent.click(saveLog);
        // logs should contain one entry 
        expect(JSON.stringify(logs)).toBe(JSON.stringify(log));
    });
    


    test('update log entry', () => { 
        // Buttons  
        let saveLog = document.getElementById('save-entry');
        // Add log for June 6 and save it 
        let logs = showLogEntryModal('2024-06-06',{'progress':'hi','challenges':'hi','learnings':'hi','futurePlan':'hi'},{});
        fireEvent.click(saveLog);
        // Update log and save 
        logs =  showLogEntryModal('2024-06-06',{'progress':'hi','challenges':'hi','learnings':'hello','futurePlan':'hi'},logs);
        fireEvent.click(saveLog)
        // Check if log is updated 
        let logV2 = {'2024-06-06':{'progress':'hi','challenges':'hi','learnings':'hello','futurePlan':'hi'}};
        expect(JSON.stringify(logs)).toBe(JSON.stringify(logV2));
    });

    test('delete log entry', () => { 
        // Buttons 
        let saveLog = document.getElementById('save-entry');
        let deleteLog = document.getElementById('delete-entry');
        // Add log 
        let log = {'2024-06-06':{'progress':'hi','challenges':'hi','learnings':'hi','futurePlan':'hi'}};
        let logs = showLogEntryModal('2024-06-06',{'progress':'hi','challenges':'hi','learnings':'hi','futurePlan':'hi'},{});
        fireEvent.click(saveLog);
        // Delete log 
        logs = showLogEntryModal('2024-06-06',{'progress':'hi','challenges':'hi','learnings':'hi','futurePlan':'hi'},logs);
        fireEvent.click(deleteLog);
        // logs should be empty 
        expect(JSON.stringify(logs)).toBe(JSON.stringify({}));
    });

    test('saving multiple entries', () => { 
        // Buttons 
        let saveLog = document.getElementById('save-entry');
        // Log 1
        let logs = showLogEntryModal('2024-06-06',{'progress':'hi','challenges':'hi','learnings':'hi','futurePlan':'hi'},{});
        fireEvent.click(saveLog);
        // Log 2
        logs = showLogEntryModal('2024-06-05',{'progress':'hey','challenges':'hello','learnings':'hi','futurePlan':'hi'},logs);
        fireEvent.click(saveLog);
        // Log 3
        logs = showLogEntryModal('2024-06-04',{'progress':'hi','challenges':'hey','learnings':'hello','futurePlan':'hi'},logs);
        fireEvent.click(saveLog);
        // Log Dict 
        let log = {'2024-06-06':{'progress':'hi','challenges':'hi','learnings':'hi','futurePlan':'hi'},
        '2024-06-05':{'progress':'hey','challenges':'hello','learnings':'hi','futurePlan':'hi'},
        '2024-06-04':{'progress':'hi','challenges':'hey','learnings':'hello','futurePlan':'hi'}};
        expect(JSON.stringify(logs)).toBe(JSON.stringify(log));
    });

    test('deleting all entries', () =>{ 
        let saveLog = document.getElementById('save-entry');
        let deleteAll = document.getElementById('delete-all');
        // Log 1
        let logs = showLogEntryModal('2024-06-06',{'progress':'hi','challenges':'hi','learnings':'hi','futurePlan':'hi'},{});
        fireEvent.click(saveLog);
        // Log 2
        logs = showLogEntryModal('2024-06-05',{'progress':'hey','challenges':'hello','learnings':'hi','futurePlan':'hi'},logs);
        fireEvent.click(saveLog);
        // Log 3
        logs = showLogEntryModal('2024-06-04',{'progress':'hi','challenges':'hey','learnings':'hello','futurePlan':'hi'},logs);
        fireEvent.click(saveLog);
        // Delete all
        logs = deleteAllEntries(logs);
        expect(JSON.stringify(logs)).toBe(JSON.stringify({}));
    });




















   /* test('creating entry', () => { 
        let day = new Date(); 
        let dayStr =  `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
        // How to add to today's log??


    }); 

    test('reload after adding', async () => { 

    });

    
    test('deleting entry', async () => { 
        let today = '2024-06-06';

    }); 

    test('reload after deleting', async () => { 
        await page.reload(); 
        let currentLogs = await page.$$('.log-entry');
        expect(currentLogs.length).toBe(0);
    });*/


});