const { expect } = require('chai');
const filterByCondition = require('../src/utils/filterByConditon.js');

describe('filterByCondition function', () => {

  it('should filter even numbers from the array', () => {
    // Define a condition function to filter even numbers
    const isEven = (number) => number % 2 === 0;

    // Original array
    const originalArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    // Call filterByCondition and assert the filtered array
    const result = filterByCondition(originalArray, isEven);
    expect(result).to.deep.equal([2, 4, 6, 8]);
  });

  it('should filter strings starting with "A" from the array', () => {
    // Define a condition function to filter strings starting with 'A'
    const startsWithA = (str) => str.charAt(0).toUpperCase() === 'A';

    // Original array
    const originalArray = ['Apple', 'Banana', 'Orange', 'Avocado'];

    // Call filterByCondition and assert the filtered array
    const result = filterByCondition(originalArray, startsWithA);
    expect(result).to.deep.equal(['Apple', 'Avocado']);
  });

  it('should filter truthy values from the array', () => {
    // Define a condition function to filter truthy values
    const isTruthy = (value) => Boolean(value);

    // Original array with mixed values
    const originalArray = [0, '', null, undefined, false, 'Hello', 42];

    // Call filterByCondition and assert the filtered array
    const result = filterByCondition(originalArray, isTruthy);
    expect(result).to.deep.equal(['Hello', 42]);
  });

});
