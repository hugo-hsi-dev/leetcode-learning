import { describe, it, expect } from 'vitest';

/**
 * Problem: Find Index of Minimum
 *
 * Return the index of the smallest element in the array.
 * If there are multiple minimums, return the first occurrence.
 *
 * Examples:
 * - [3, 1, 4, 1, 5] → 1 (minimum is 1, first occurrence at index 1)
 * - [5, 4, 3, 2, 1] → 4
 * - [10] → 0
 */
export function findMinIndex(nums: number[]): number {
  // TODO: Implement this function

  // Write your code here

  return 0;
}

describe('findMinIndex', () => {
  it('finds first minimum occurrence', () => {
    expect(findMinIndex([3, 1, 4, 1, 5])).toBe(1);
  });

  it('finds minimum at end', () => {
    expect(findMinIndex([5, 4, 3, 2, 1])).toBe(4);
  });

  it('handles single element', () => {
    expect(findMinIndex([10])).toBe(0);
  });

  it('handles duplicates', () => {
    expect(findMinIndex([5, 2, 1, 1, 5])).toBe(2);
  });
});