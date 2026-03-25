import { describe, it, expect } from 'vitest';

/**
 * Problem: Reverse In-Place
 *
 * Reverse an array in-place. Do not create a new array.
 *
 * Examples:
 * - [1, 2, 3, 4] → [4, 3, 2, 1] (modifies the array directly)
 * - ['a', 'b', 'c'] → ['c', 'b', 'a']
 * - [1] → [1] (unchanged)
 */
export function reverseInPlace(nums: number[]): void {
  // TODO: Implement this function
  // Modify the array in-place, return nothing
}

describe('reverseInPlace', () => {
  it('reverses even-length array', () => {
    const arr = [1, 2, 3, 4];
    reverseInPlace(arr);
    expect(arr).toEqual([4, 3, 2, 1]);
  });

  it('reverses odd-length array', () => {
    const arr = [1, 2, 3, 4, 5];
    reverseInPlace(arr);
    expect(arr).toEqual([5, 4, 3, 2, 1]);
  });

  it('handles single element', () => {
    const arr = [1];
    reverseInPlace(arr);
    expect(arr).toEqual([1]);
  });

  it('handles empty array', () => {
    const arr: number[] = [];
    reverseInPlace(arr);
    expect(arr).toEqual([]);
  });
});