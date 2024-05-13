import { sum } from '../code-to-unit-test/unit-tests';
import { difference } from '../code-to-unit-test/unit-tests';
import { product } from '../code-to-unit-test/unit-tests';
import { quotient } from '../code-to-unit-test/unit-tests';

// ADDITION TEST
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
// SUBTRACTION TEST
test('subtracts 3 - 1 to equal 2', () => {
  expect(difference(3, 1)).toBe(2);
});
// MULTIPLICATION TEST
test('multiplies 2 * 3 to equal 6', () => {
  expect(product(2, 3)).toBe(6);
});
// DIVISION TEST
test('divides 6 / 2 to equal 3', () => {
  expect(quotient(6, 2)).toBe(3);
});

test('throws error when dividing by zero', () => {
  expect(() => quotient(6, 0)).toThrow('Division by zero');
});