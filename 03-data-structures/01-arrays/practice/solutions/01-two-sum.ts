/**
 * LeetCode 1: Two Sum
 * 
 * Problem: Given an array of integers nums and an integer target,
 * return indices of the two numbers that add up to target.
 * 
 * Approach: Use a hash map to store numbers we've seen and their indices.
 * For each number, check if (target - num) exists in the map.
 * 
 * Time: O(n) - single pass through the array
 * Space: O(n) - in worst case, we store all elements in the map
 */

function twoSum(nums: number[], target: number): number[] {
    const seen = new Map<number, number>(); // value -> index
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (seen.has(complement)) {
            // Found the pair! complement is at index seen.get(complement)
            return [seen.get(complement)!, i];
        }
        
        // Store current number and its index for future lookups
        seen.set(nums[i], i);
    }
    
    // According to problem, exactly one solution exists
    // This line should never be reached
    return [];
}

// Test cases
console.log(twoSum([2, 7, 11, 15], 9));    // [0, 1]
console.log(twoSum([3, 2, 4], 6));          // [1, 2]
console.log(twoSum([3, 3], 6));             // [0, 1]

/**
 * Brute Force Alternative (O(n²)):
 * 
 * function twoSumBrute(nums: number[], target: number): number[] {
 *     for (let i = 0; i < nums.length; i++) {
 *         for (let j = i + 1; j < nums.length; j++) {
 *             if (nums[i] + nums[j] === target) {
 *                 return [i, j];
 *             }
 *         }
 *     }
 *     return [];
 * }
 * 
 * This works but is O(n²). The hash map approach is preferred for O(n).
 */