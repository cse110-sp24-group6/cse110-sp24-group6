document.addEventListener('DOMContentLoaded', function () {
    const entryDate = document.getElementById('entry-date');
    const progress = document.getElementById('progress');
    const challenges = document.getElementById('challenges');
    const learnings = document.getElementById('learnings');
    const futurePlan = document.getElementById('future-plan');
    const saveEntryButton = document.getElementById('save-entry');
    const deleteAllButton = document.getElementById('delete-all');
    const entriesContainer = document.getElementById('entries-container');

    let editIndex = null;

    function loadEntries() {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        entriesContainer.innerHTML = '';
        entries.forEach((entry, index) => {
            const entryDiv = document.createElement('div');
            entryDiv.classList.add('entry');
            entryDiv.innerHTML = `
                <p><strong>Date:</strong> ${entry.date}</p>
                <p><strong>Progress:</strong> ${entry.progress}</p>
                <p><strong>Challenges:</strong> ${entry.challenges}</p>
                <p><strong>Learnings:</strong> ${entry.learnings}</p>
                <p><strong>Future Plan:</strong> ${entry.futurePlan}</p>
                <button class="delete-entry" data-index="${index}">Delete</button>
                <button class="edit-entry" data-index="${index}">Edit</button>
            `;
            entriesContainer.appendChild(entryDiv);
        });
    }

    function saveEntry() {
        const newEntry = {
            date: entryDate.value,
            progress: progress.value,
            challenges: challenges.value,
            learnings: learnings.value,
            futurePlan: futurePlan.value,
        };

        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        
        if (editIndex !== null) {
            entries[editIndex] = newEntry;
            editIndex = null;
            saveEntryButton.textContent = 'Save Entry';
        } else {
            entries.push(newEntry);
        }

        localStorage.setItem('entries', JSON.stringify(entries));
        clearForm();
        loadEntries();
    }

    function deleteEntry(index) {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.splice(index, 1);
        localStorage.setItem('entries', JSON.stringify(entries));
        loadEntries();
    }

    function deleteAllEntries() {
        localStorage.removeItem('entries');
        loadEntries();
    }

    function editEntry(index) {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        const entry = entries[index];
        entryDate.value = entry.date;
        progress.value = entry.progress;
        challenges.value = entry.challenges;
        learnings.value = entry.learnings;
        futurePlan.value = entry.futurePlan;
        editIndex = index;
        saveEntryButton.textContent = 'Update Entry';
    }

    function clearForm() {
        entryDate.value = '';
        progress.value = '';
        challenges.value = '';
        learnings.value = '';
        futurePlan.value = '';
    }

    saveEntryButton.addEventListener('click', saveEntry);
    deleteAllButton.addEventListener('click', deleteAllEntries);

    entriesContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-entry')) {
            const index = event.target.getAttribute('data-index');
            deleteEntry(index);
        }

        if (event.target.classList.contains('edit-entry')) {
            const index = event.target.getAttribute('data-index');
            editEntry(index);
        }
    });

    loadEntries();
});
