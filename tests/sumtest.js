// tests/sumtest.js or sumtest.js in the root
const sum = require('../sum'); 

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
