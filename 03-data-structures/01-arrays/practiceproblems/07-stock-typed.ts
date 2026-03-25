import { describe, it, expect } from 'vitest';

/**
 * LeetCode 121: Best Time to Buy and Sell Stock
 *
 * You are given an array prices where prices[i] is the price of a given stock on the i-th day.
 *
 * You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
 *
 * Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.
 *
 * Examples:
 * - prices = [7, 1, 5, 3, 6, 4] → 5 (buy at 1, sell at 6 → profit 5)
 * - prices = [7, 6, 4, 3, 1] → 0 (no profitable transaction possible)
 * - prices = [2, 4, 1] → 2 (buy at 2, sell at 4 → profit 2)
 */
export function maxProfit(prices: number[]): number {
  // TODO: Implement this function
  // Return the maximum profit possible

  // Write your code here

  return 0;
}

describe('maxProfit', () => {
  it('calculates maximum profit', () => {
    expect(maxProfit([7, 1, 5, 3, 6, 4])).toBe(5);
  });

  it('returns 0 when no profit possible', () => {
    expect(maxProfit([7, 6, 4, 3, 1])).toBe(0);
  });

  it('handles simple profitable case', () => {
    expect(maxProfit([2, 4, 1])).toBe(2);
  });

  it('handles buy after sell scenario', () => {
    expect(maxProfit([3, 2, 6, 5, 0, 3])).toBe(4);
  });

  it('handles single day', () => {
    expect(maxProfit([5])).toBe(0);
  });
});