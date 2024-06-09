
function sum(a, b) {
    return a + b;
}
function difference(a, b) {
    return a - b;
}
function product(a, b) {
    return a * b;
}
function quotient(a, b) {
    if (b === 0) {
        throw new Error('Division by zero');
    }
    return a / b;
}
module.exports = {
    sum,
    difference,
    product,
    quotient
  };