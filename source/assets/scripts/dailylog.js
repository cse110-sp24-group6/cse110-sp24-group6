document.addEventListener('DOMContentLoaded', function () {
    
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

    function saveLogsToStorage(logs) { 
        return localStorage.setItem('logs',JSON.stringify(logs));
    }

    //Actual Calendar
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    // const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let currentDate = new Date();
    let logs = getLogsFromStorage();
    // let logs = {}


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

            dateDiv.addEventListener("click", function() { selectDate(dateStr); });
            datesContainer.appendChild(dateDiv);
        }
    }


    function prevMonth() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar();
    }
    function nextMonth() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar();
    }
    // Initialize the calendar
    updateCalendar();

    
    /* CSS DISPLAY IS BUGGY, js code works fine */
    // Function to show/hide month dropdown and position it under the month text
    function toggleMonthDropdown() {
        const monthText = document.getElementById('month');
        const monthDropdown = document.getElementById('month-dropdown');

        // Position month dropdown under the month text
        const rect = monthText.getBoundingClientRect();
        monthDropdown.style.left = rect.left + 'px';
        monthDropdown.style.top = rect.bottom;
    }

    // Function to show/hide year dropdown and position it under the year text
    function toggleYearDropdown() {
        const yearText = document.getElementById('year');
        const yearDropdown = document.getElementById('yearDropdown');

        // Position year dropdown under the year text
        const rect = yearText.getBoundingClientRect();
        yearDropdown.style.left = rect.left + 'px';
        yearDropdown.style.top = rect.bottom;
    }
    
    // Function to populate month and year select options
    // function populateDropdowns() {
    //     const monthSelect = document.getElementById('monthSelect');
    //     const yearSelect = document.getElementById('yearSelect');
        
    //     // Populate months
    //     monthNames.forEach((month, index) => {
    //         const option = document.createElement('option');
    //         option.value = index;
    //         option.textContent = month;
    //         monthSelect.appendChild(option);
    //     });

    //     // Populate years from 2000 to current year
    //     const currentYear = new Date().getFullYear();
    //     for (let year = currentYear; year >= 2000; year--) {
    //         const option = document.createElement('option');
    //         option.value = year;
    //         option.textContent = year;
    //         yearSelect.appendChild(option);
    //     }

    //     // Set initial selected values
    //     monthSelect.value = currentDate.getMonth();
    //     yearSelect.value = currentDate.getFullYear();
    // }

    // Function to update calendar based on dropdown selection
    function updateCalendarFromDropdowns() {
        const monthSelect = document.getElementById('monthSelect');
        const yearSelect = document.getElementById('yearSelect');

        const selectedMonth = parseInt(monthSelect.value);
        const selectedYear = parseInt(yearSelect.value);

        currentDate = new Date(selectedYear, selectedMonth);
        updateCalendar();
        toggleMonthDropdown();
        toggleYearDropdown();
    }

    // Initialize calendar and dropdowns
    // populateDropdowns();

    document.getElementById('month').addEventListener('click', toggleMonthDropdown);
    document.getElementById('year').addEventListener('click', toggleYearDropdown);
    // document.getElementById('monthSelect').addEventListener('change', updateCalendarFromDropdowns);
    // document.getElementById('yearSelect').addEventListener('change', updateCalendarFromDropdowns);
    

    // Attach event listeners
    document.getElementById('prev-month').addEventListener('click', prevMonth);
    document.getElementById('next-month').addEventListener('click', nextMonth);



    // Adds log based on day selected
    function selectDate(dateStr) {
        const logEntry = logs[`${dateStr}`] || null;
        showLogEntryModal(dateStr, logEntry);
    }

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

        deleteButton.onclick = function() {
            delete logs[`${dateStr}`];
            updateCalendar();
            saveLogsToStorage(logs); 
        };
    }

    function deleteAllEntries() {
        logs = {};
        saveLogsToStorage(logs);
        updateCalendar();
    }
    
      // Event listener for the delete all button
      document.getElementById('delete-all').addEventListener('click', deleteAllEntries);
});