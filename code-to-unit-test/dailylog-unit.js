
// Function takes in a Date object and converts it to string compatible with other functions
export function dateToString(date) { 
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function resetBackground() { 
    // Resets background of all dates to original styling
    let dateDivs = document.querySelectorAll('.date'); 
    for (let i = 0; i < dateDivs.length; i++) { 
        let dateDiv = dateDivs[`${i}`]; 
        dateDiv.setAttribute('style',' background-color: #d1a689;');
    } 
    // Resets background of today's date to its intended styling 
    let today = document.querySelector('.date.today'); 
    if (today) { 
        today.setAttribute('style', 'background-color: #468c7a; color: #F4EDE3; border-radius: 50%;font-weight: bold;');
    }
    
}

//Actual Calendar
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
// const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let currentDate = new Date();

// Automatically select today's log 
//selectDate(dateToString(currentDate));


export function updateCalendar() {
    let logs = {}; 
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
            // Reset the background so that any date clicked on before is back to its original styling 
            resetBackground(); 
            selectDate(dateStr); 
            // Set the background and border radius of the date that has just been clicked 
            dateDiv.setAttribute('style','background-color: #674832; border-radius: 10%;');
        });
        datesContainer.appendChild(dateDiv);
    }
    
}


export function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
}

export function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
}

// Selects today's log and goes to corresponding month/year view 
export function today() { 
    currentDate = new Date();
    updateCalendar(); 
    selectDate(dateToString(currentDate));
}
// Initialize the calendar
// updateCalendar();




// Adds log based on day selected
export function selectDate(dateStr) {
    let logs = {}; 
    const logEntry = logs[`${dateStr}`] || null;
    showLogEntryModal(dateStr, logEntry);
}


export function showLogEntryModal(dateStr, logEntry, logs) {
    //let logs = {}; 
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
    };

    deleteButton.onclick = function() {
        delete logs[`${dateStr}`];
        updateCalendar();
        progressTextarea.value = '';
        challengesTextarea.value = '';
        learningsTextarea.value = '';
        futurePlanTextarea.value = '';
    };
    return logs; 
}

export function deleteAllEntries(logs) {
    logs = {};
    updateCalendar();
    return logs;
}

