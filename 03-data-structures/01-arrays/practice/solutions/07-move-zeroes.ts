/**
 * LeetCode 283: Move Zeroes
 * 
 * Problem: Move all zeros to the end of the array while maintaining
 * the order of non-zero elements. Do this in-place.
 * 
 * Approach: Two-pointer technique similar to remove element.
 * - write: position for next non-zero
 * - read: scans through array
 * 
 * Time: O(n) - single pass
 * Space: O(1) - in-place modification
 */

function moveZeroes(nums: number[]): void {
    let write = 0;  // Position for next non-zero
    
    // First pass: move all non-zeros to the front
    for (let read = 0; read < nums.length; read++) {
        if (nums[read] !== 0) {
            nums[write] = nums[read];
            write++;
        }
    }
    
    // Second pass: fill remaining positions with zeros
    for (let i = write; i < nums.length; i++) {
        nums[i] = 0;
    }
}

// Alternative: single pass with swapping
function moveZeroesSwap(nums: number[]): void {
    let write = 0;  // Position for next non-zero
    
    for (let read = 0; read < nums.length; read++) {
        if (nums[read] !== 0) {
            // Swap nums[read] and nums[write]
            const temp = nums[write];
            nums[write] = nums[read];
            nums[read] = temp;
            write++;
        }
    }
}

// Test cases
const arr1 = [0, 1, 0, 3, 12];
moveZeroes(arr1);
console.log(arr1);  // [1, 3, 12, 0, 0]

const arr2 = [0, 0, 0, 1];
moveZeroes(arr2);
console.log(arr2);  // [1, 0, 0, 0]

const arr3 = [1, 2, 3];
moveZeroes(arr3);
console.log(arr3);  // [1, 2, 3] (no zeros, unchanged)

/**
 * Visual trace for [0, 1, 0, 3, 12]:
 * 
 * First pass (moving non-zeros):
 * read=0: nums[0]=0, skip
 * read=1: nums[1]=1, write to nums[0], nums=[1, 1, 0, 3, 12], write=1
 * read=2: nums[2]=0, skip
 * read=3: nums[3]=3, write to nums[1], nums=[1, 3, 0, 3, 12], write=2
 * read=4: nums[4]=12, write to nums[2], nums=[1, 3, 12, 3, 12], write=3
 * 
 * Second pass (filling zeros):
 * i=3: nums[3]=0, nums=[1, 3, 12, 0, 12]
 * i=4: nums[4]=0, nums=[1, 3, 12, 0, 0]
 * 
 * Final: [1, 3, 12, 0, 0]
 */