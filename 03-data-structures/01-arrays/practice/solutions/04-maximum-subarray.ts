/**
 * LeetCode 53: Maximum Subarray
 * 
 * Problem: Find the contiguous subarray with the largest sum.
 * 
 * Approach: Kadane's Algorithm.
 * - Keep a running sum of the current subarray
 * - If the running sum becomes negative, reset it to 0 (start fresh)
 * - Track the maximum sum seen so far
 * 
 * Key insight: A negative sum will never help maximize the total.
 * If the sum up to position i is negative, discard it and start fresh.
 * 
 * Time: O(n) - single pass
 * Space: O(1) - only two variables
 */

function maxSubArray(nums: number[]): number {
    let maxSum = nums[0];    // Track the best sum found
    let currentSum = 0;      // Running sum of current subarray
    
    for (const num of nums) {
        currentSum += num;
        maxSum = Math.max(maxSum, currentSum);
        
        // If current sum is negative, reset (start fresh from next element)
        if (currentSum < 0) {
            currentSum = 0;
        }
    }
    
    return maxSum;
}

// Alternative: cleaner version that handles all-negative arrays
function maxSubArrayClean(nums: number[]): number {
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        // Either extend the previous subarray or start fresh
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}

// Test cases
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));  // 6 ([4, -1, 2, 1])
console.log(maxSubArray([1]));                               // 1
console.log(maxSubArray([5, 4, -1, 7, 8]));                  // 23 (entire array)
console.log(maxSubArray([-1, -2, -3]));                      // -1 (single element, all negative)

/**
 * Visual trace for [-2, 1, -3, 4, -1, 2, 1, -5, 4]:
 * 
 * num    | currentSum | maxSum | Note
 * -------|------------|--------|------
 * -2     | -2         | -2     | negative, reset to 0 after
 * 1      | 1          | 1      |
 * -3     | -2         | 1      | negative, reset
 * 4      | 4          | 4      |
 * -1     | 3          | 4      |
 * 2      | 5          | 5      | new max!
 * 1      | 6          | 6      | new max!
 * -5     | 1          | 6      |
 * 4      | 5          | 6      |
 * 
 * Final answer: 6 (from subarray [4, -1, 2, 1])
 */