// code-to-unit-test/unit-tests-homepage.js

/**
 * Function to calculate task progress percentage.
 * @param {number} completedTasks - Number of completed tasks.
 * @param {number} totalTasks - Total number of tasks.
 * @returns {number} - Progress percentage.
 */
export function calculateProgress(completedTasks, totalTasks) {
    if (totalTasks === 0) return 0;
    return (completedTasks / totalTasks) * 100;
}

/**
 * Function to find the streak of consecutive days with logs.
 * @param {Object} logs - Object containing logs with date keys.
 * @param {Date} today - Today's date.
 * @returns {number} - Number of consecutive days with logs.
 */
export function findStreak(logs, today = new Date()) {
    let streak = 0;
    let day = today;

    while (logs[day.toISOString().split('T')[0]]) {
        streak++;
        day.setDate(day.getDate() - 1);
    }

    return streak;
}
