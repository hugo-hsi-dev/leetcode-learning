import { describe, it, expect } from 'vitest';

/**
 * LeetCode 1: Two Sum
 *
 * Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.
 *
 * You may assume that each input would have exactly one solution, and you may not use the same element twice.
 *
 * Examples:
 * - nums = [2, 7, 11, 15], target = 9 → [0, 1] (because nums[0] + nums[1] = 2 + 7 = 9)
 * - nums = [3, 2, 4], target = 6 → [1, 2] (because nums[1] + nums[2] = 2 + 4 = 6)
 * - nums = [3, 3], target = 6 → [0, 1] (because nums[0] + nums[1] = 3 + 3 = 6)
 */
export function twoSum(nums: number[], target: number): number[] {
  // TODO: Implement this function
  // Return the indices of the two numbers that add up to target

  // Write your code here

  return [];
}

describe('twoSum', () => {
  it('finds two sum indices', () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
  });

  it('finds two sum with non-adjacent elements', () => {
    expect(twoSum([3, 2, 4], 6)).toEqual([1, 2]);
  });

  it('handles duplicate elements', () => {
    expect(twoSum([3, 3], 6)).toEqual([0, 1]);
  });

  it('handles larger array', () => {
    expect(twoSum([1, 5, 3, 7, 2], 9)).toEqual([1, 3]);
  });
});