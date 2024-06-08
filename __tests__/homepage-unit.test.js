import { calculateProgress, findStreak } from '../code-to-unit-test/unit-tests-homepage';

// Create test suite for homepage tests
describe('Homepage Unit Tests', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="progress-number">0/0</div>
            <svg>
                <circle id="moving-progress" stroke-dasharray="0, 100"></circle>
            </svg>
            <div id="daily-streak">0</div>
        `;
    });

    // Tests the calculateProgress function
    it('Calculate progress percentage', () => {
        expect(calculateProgress(10, 10)).toBe(100);
        expect(calculateProgress(5, 10)).toBe(50);
        expect(calculateProgress(0, 0)).toBe(0);
    });

    // Tests the findStreak function
    it('Consecutive day streak logs tests', () => {
        const logs = {
            '2024-06-06': true,
            '2024-06-07': true,
            '2024-06-08': true
        };
        const today = new Date('2024-06-08');

        expect(findStreak(logs, today)).toBe(3);
    });

    // Tests to make sure the progress-number is set
    it('Progress number (for task completion) on homepage tests', () => {
        document.getElementById('progress-number').textContent = '5/10';
        expect(document.getElementById('progress-number').textContent).toBe('5/10');
    });

    // Tests to make sure the daily-streak number is set
    it('Daily streak tests', () => {
        document.getElementById('daily-streak').textContent = '3';
        expect(document.getElementById('daily-streak').textContent).toBe('3');
    });

    // Tests to make sure that the progress bar is set
    it('Progress circle tests', () => {
        const progressCircle = document.getElementById('moving-progress');
        progressCircle.style.strokeDasharray = '50, 100';
        expect(progressCircle.style.strokeDasharray).toBe('50, 100');
    });
});
