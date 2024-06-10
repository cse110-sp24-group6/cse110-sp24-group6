document.addEventListener('DOMContentLoaded', function () {
    // FUNCTIONS PERTAINING TO CALENDAR
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    let currentDate = new Date();
    let logs = getLogsFromStorage();
    
    // Automatically select today's log 
    selectDate(dateToString(currentDate));

    /**
     * Makes the calendar
     * @returns Functionality of calendar view
     */
    function updateCalendar() {
        const monthText = document.getElementById('month');
        const yearText = document.getElementById('year');
        const datesContainer = document.getElementById('dates');

        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        monthText.textContent = monthNames[`${month}`];
        yearText.textContent = year;

        // Clear previous dates
        datesContainer.innerHTML = '';

        // Get the first day of the month and number of days in the month
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Add padding for the first day
        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.classList.add('date');
            datesContainer.appendChild(emptyDiv);
        }

        // Add the days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateDiv = document.createElement('div');
            dateDiv.classList.add('date');
            dateDiv.textContent = day;

            // Highlight today's date
            const today = new Date();
            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dateDiv.classList.add('today');
            }

            // Highlight dates with logs
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            if (logs[`${dateStr}`]) {
                dateDiv.classList.add('log-entry');
            }

            dateDiv.addEventListener("click", function() { 
                // Reset background of all dates
                resetBackground(); 
                selectDate(dateStr); 
                // Set the background and border radius of the date that has just been clicked 
                dateDiv.setAttribute('style','background-color: #674832; border-radius: 10%;');
            });
            datesContainer.appendChild(dateDiv);
        }
        
    }

    /**
     * Generates the previous month and updates calendar to display that month
     */
    function prevMonth() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar();
    }

    /**
     * Generates the next month and updates calendar to display that month
     */
    function nextMonth() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar();
    }

    /**
     * Opens the corresponding log for the current date 
     */
    function today() { 
        currentDate = new Date();
        updateCalendar(); 
        selectDate(dateToString(currentDate));
    }

    /**
     * Resets the background of all date div's to original styling
     * Resets background for today's date to intended styling 
     */
    function resetBackground() { 
        let dateDivs = document.querySelectorAll('.date'); 
        for (let i = 0; i < dateDivs.length; i++) { 
            let dateDiv = dateDivs[i]; 
            dateDiv.setAttribute('style',' background-color: #d1a689;');
        } 
        let today = document.querySelector('.date.today'); 
        if (today) { 
            today.setAttribute('style', 'background-color: #468c7a; color: #F4EDE3; border-radius: 50%;font-weight: bold;');
        }

    }

    // Initialize the calendar
    updateCalendar();

    // Attach event listeners to prev/next buttons
    document.getElementById('prev-month').addEventListener('click', prevMonth);
    document.getElementById('next-month').addEventListener('click', nextMonth);
    document.getElementById('today').addEventListener('click', today);


    // FUNCTIONS REGARDING LOGS

    /**
     * Retrieves log entries stored in local storage
     * @returns all log entries 
     */
    function getLogsFromStorage() { 
        let logs = localStorage.getItem('logs');
        let returnLog;
        if (logs) {
            returnLog = JSON.parse(logs);
            return returnLog;
        }
        else {
            returnLog = {};
            return returnLog;
        }
    }


    /**
     * Sends log entries to localStorage 
     * @param {*} logs - an array of all the logs
     * @returns updated log entries
     */
    function saveLogsToStorage(logs) { 
        return localStorage.setItem('logs',JSON.stringify(logs));
    }

    /**
     * Converts a date from its current type to a string to be compatible with other functions
     * @param {*} date - day generated from date method
     * @returns date as a string in the format "year-month-day"
     */
    function dateToString(date) { 
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }

    /**
     * Adds log based on day selected
     * @param {*} dateStr - day you want to select
     */
    function selectDate(dateStr) {
        const logEntry = logs[`${dateStr}`] || null;
        showLogEntryModal(dateStr, logEntry);
    }

    /**
     * Displays the form to make/edit an entry log
     * @param {*} dateStr day of log
     * @param {*} logEntry contents of the log if log exists
     */
    function showLogEntryModal(dateStr, logEntry) {
        //const modal = document.getElementById('log-entry-modal');
        const modalDate = document.getElementById('modal-date');
        const progressTextarea = document.getElementById('progress');
        const challengesTextarea = document.getElementById('challenges');
        const learningsTextarea = document.getElementById('learnings');
        const futurePlanTextarea = document.getElementById('future-plan');
        const saveButton = document.getElementById('save-entry');
        const deleteButton = document.getElementById('delete-entry');


        const [year, month, day] = dateStr.split('-').map(Number);
        const correctDate = new Date(Date.UTC(year, month-1, day+1)); // Use Date.UTC to avoid timezone issues

        // Display the selected date
        modalDate.textContent = correctDate.toDateString();

        if (logEntry) {
            progressTextarea.value = logEntry.progress || '';
            challengesTextarea.value = logEntry.challenges || '';
            learningsTextarea.value = logEntry.learnings || '';
            futurePlanTextarea.value = logEntry.futurePlan || '';
        } else {
            progressTextarea.value = '';
            challengesTextarea.value = '';
            learningsTextarea.value = '';
            futurePlanTextarea.value = '';
        }

        // saves the entry when save button is pressed
        saveButton.onclick = function() {
            const logInput = {
                progress: progressTextarea.value.trim(),
                challenges: challengesTextarea.value.trim(),
                learnings: learningsTextarea.value.trim(),
                futurePlan: futurePlanTextarea.value.trim()
            };

            if (logInput.progress || logInput.challenges || logInput.learnings || logInput.futurePlan) {
                logs[`${dateStr}`] = logInput;
            } else {
                delete logs[`${dateStr}`];
            }
            updateCalendar();
            saveLogsToStorage(logs); 
        };

        // Deletes the entry
        deleteButton.onclick = function() {
            delete logs[`${dateStr}`];
            updateCalendar();
            saveLogsToStorage(logs); 
            progressTextarea.value = '';
            challengesTextarea.value = '';
            learningsTextarea.value = '';
            futurePlanTextarea.value = '';
        };
    }

    /**
     * Deletes every single inputted entry
     */
    function deleteAllEntries() {
        logs = {};
        saveLogsToStorage(logs);
        today();
    }
    
      // Event listener for the delete all button
      document.getElementById('delete-all').addEventListener('click', deleteAllEntries);
});
