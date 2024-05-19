document.addEventListener("DOMContentLoaded", () => {
    const entriesContainer = document.getElementById("entries-container");
    const saveEntryButton = document.getElementById("save-entry");

    saveEntryButton.addEventListener("click", saveEntry);

    function saveEntry() {
        const date = document.getElementById("entry-date").value;
        const content = document.getElementById("entry-content").value;

        if (!date || !content) {
            alert("Please fill in both date and content.");
            return;
        }

        const entry = {
            date,
            content
        };

        let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
        entries.push(entry);
        localStorage.setItem("journalEntries", JSON.stringify(entries));

        document.getElementById("entry-date").value = '';
        document.getElementById("entry-content").value = '';

        displayEntries();
    }

    function deleteEntry(index) {
        let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
        entries.splice(index, 1);
        localStorage.setItem("journalEntries", JSON.stringify(entries));
        displayEntries();
    }

    function displayEntries() {
        entriesContainer.innerHTML = '';
        let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];

        entries.forEach((entry, index) => {
            const entryElement = document.createElement("div");
            entryElement.className = "entry";

            const entryHeader = document.createElement("h2");
            entryHeader.textContent = `---${entry.date}---`;
            entryElement.appendChild(entryHeader);

            const entryContent = document.createElement("div");
            entryContent.className = "entry-content";
            entryContent.textContent = entry.content;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.onclick = () => deleteEntry(index);
            entryContent.appendChild(deleteButton);

            entryElement.appendChild(entryContent);
            entriesContainer.appendChild(entryElement);
        });
    }

    displayEntries();
});
