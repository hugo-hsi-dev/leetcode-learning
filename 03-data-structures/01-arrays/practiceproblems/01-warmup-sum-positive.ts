import { describe, it, expect } from "vitest";

/**
 * Problem: Sum of Positive Numbers
 *
 * Return the sum of all positive numbers (greater than 0).
 *
 * Examples:
 * - [1, -2, 3, -4, 5] → 9 (1 + 3 + 5)
 * - [-1, -2, -3] → 0
 * - [10, 20, 30] → 60
 */
export function sumPositive(nums: number[]): number {
  let sum = 0;

  // TODO: Implement this function
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      sum += nums[i];
    }
  }
  // Write your code here

  return sum;
}

describe("sumPositive", () => {
  it("sums positive numbers correctly", () => {
    expect(sumPositive([1, -2, 3, -4, 5])).toBe(9);
  });

  it("returns 0 for all negative numbers", () => {
    expect(sumPositive([-1, -2, -3])).toBe(0);
  });

  it("sums all positive numbers", () => {
    expect(sumPositive([10, 20, 30])).toBe(60);
  });

  it("handles empty array", () => {
    expect(sumPositive([])).toBe(0);
  });
});
