import { describe, it, expect } from 'vitest';

/**
 * Problem: Running Maximum
 *
 * Return an array where each element is the maximum of all elements up to that position.
 *
 * Examples:
 * - [3, 1, 4, 1, 5, 9, 2] → [3, 3, 4, 4, 5, 9, 9]
 * - [1, 2, 3, 4, 5] → [1, 2, 3, 4, 5]
 * - [5, 4, 3, 2, 1] → [5, 5, 5, 5, 5]
 */
export function runningMax(nums: number[]): number[] {
  // TODO: Implement this function

  // Write your code here

  return [];
}

describe('runningMax', () => {
  it('computes running maximum correctly', () => {
    expect(runningMax([3, 1, 4, 1, 5, 9, 2])).toEqual([3, 3, 4, 4, 5, 9, 9]);
  });

  it('handles increasing array', () => {
    expect(runningMax([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it('handles decreasing array', () => {
    expect(runningMax([5, 4, 3, 2, 1])).toEqual([5, 5, 5, 5, 5]);
  });

  it('handles empty array', () => {
    expect(runningMax([])).toEqual([]);
  });
});