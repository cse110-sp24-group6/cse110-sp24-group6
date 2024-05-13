// sum.js
export function sum(a, b) {
    return a + b;
}
export function difference(a, b) {
    return a - b;
}
export function product(a, b) {
    return a * b;
}
export function quotient(a, b) {
    if (b === 0) {
        throw new Error('Division by zero');
    }
    return a / b;
}
