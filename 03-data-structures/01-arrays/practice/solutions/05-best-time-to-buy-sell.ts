/**
 * LeetCode 121: Best Time to Buy and Sell Stock
 * 
 * Problem: Given prices where prices[i] is the stock price on day i,
 * find the maximum profit from buying on one day and selling on a later day.
 * If no profit is possible, return 0.
 * 
 * Approach: Track the minimum price seen so far.
 * For each day, calculate potential profit (price - min_so_far) and
 * update max profit if it's higher.
 * 
 * Key insight: The best buy day must come before the sell day.
 * So for each potential sell day, we want to know the minimum price before it.
 * 
 * Time: O(n) - single pass
 * Space: O(1) - only two variables
 */

function maxProfit(prices: number[]): number {
    let minPrice = Infinity;  // Minimum price seen so far
    let maxProfit = 0;        // Maximum profit achievable
    
    for (const price of prices) {
        // Update the minimum price (potential buy day)
        minPrice = Math.min(minPrice, price);
        
        // Calculate profit if we sold today (having bought at min price)
        const potentialProfit = price - minPrice;
        
        // Update max profit if this is better
        maxProfit = Math.max(maxProfit, potentialProfit);
    }
    
    return maxProfit;
}

// Test cases
console.log(maxProfit([7, 1, 5, 3, 6, 4]));  // 5 (buy at 1, sell at 6)
console.log(maxProfit([7, 6, 4, 3, 1]));     // 0 (no profitable transaction)
console.log(maxProfit([1, 2, 3, 4, 5]));     // 4 (buy at 1, sell at 5)
console.log(maxProfit([2, 4, 1]));           // 2 (buy at 2, sell at 4)

/**
 * Visual trace for [7, 1, 5, 3, 6, 4]:
 * 
 * price | minPrice | potentialProfit | maxProfit
 * ------|----------|-----------------|----------
 * 7     | 7        | 0               | 0
 * 1     | 1        | 0               | 0
 * 5     | 1        | 4               | 4
 * 3     | 1        | 2               | 4
 * 6     | 1        | 5               | 5 <- new max!
 * 4     | 1        | 3               | 5
 * 
 * Final answer: 5 (buy at day 1 with price 1, sell at day 4 with price 6)
 */