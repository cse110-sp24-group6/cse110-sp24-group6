// Calculates task progress percentage
export function calculateProgress(completedTasks, totalTasks) {
    if (totalTasks === 0) return 0;
    return (completedTasks / totalTasks) * 100;
}

// Finds the streak of consecutive days with logs
export function findStreak(logs, today = new Date()) {
    let streak = 0;
    let day = today;

    while (logs[day.toISOString().split('T')[0]]) {
        streak++;
        day.setDate(day.getDate() - 1);
    }
    return streak;
}
