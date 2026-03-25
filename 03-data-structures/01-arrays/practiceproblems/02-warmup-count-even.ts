import { describe, it, expect } from "vitest";

/**
 * Problem: Count Even Numbers
 *
 * Return the count of even numbers in an array.
 *
 * Examples:
 * - [1, 2, 3, 4, 5, 6] → 3 (2, 4, 6)
 * - [1, 3, 5] → 0
 * - [2, 4, 6, 8] → 4
 */
export function countEven(nums: number[]): number {
  let count = 0;

  // TODO: Implement this function
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 === 0) {
      count++;
    }
  }
  // Write your code here

  return count;
}

describe("countEven", () => {
  it("counts even numbers correctly", () => {
    expect(countEven([1, 2, 3, 4, 5, 6])).toBe(3);
  });

  it("returns 0 for all odd numbers", () => {
    expect(countEven([1, 3, 5])).toBe(0);
  });

  it("counts all even numbers", () => {
    expect(countEven([2, 4, 6, 8])).toBe(4);
  });

  it("handles empty array", () => {
    expect(countEven([])).toBe(0);
  });
});
