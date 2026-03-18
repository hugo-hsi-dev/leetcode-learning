/**
 * LeetCode 26: Remove Duplicates from Sorted Array
 * 
 * Problem: Given a sorted array, remove duplicates in-place so each element
 * appears only once. Return the new length.
 * 
 * Approach: Two-pointer technique. One pointer (write) tracks where to place
 * the next unique element, another pointer (read) scans through the array.
 * 
 * Key insight: In a sorted array, duplicates are adjacent.
 * 
 * Time: O(n) - single pass
 * Space: O(1) - in-place modification
 */

function removeDuplicates(nums: number[]): number {
    // Edge case: empty array
    if (nums.length === 0) return 0;
    
    let write = 1; // Position for next unique element (first is always unique)
    
    for (let read = 1; read < nums.length; read++) {
        // If current element differs from previous, it's unique
        if (nums[read] !== nums[read - 1]) {
            nums[write] = nums[read];
            write++;
        }
        // If same as previous, skip (it's a duplicate)
    }
    
    return write; // New length
}

// Test cases
const arr1 = [1, 1, 2];
console.log(removeDuplicates(arr1)); // 2, array is now [1, 2, _]
console.log(arr1);                    // [1, 2, 2]

const arr2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
console.log(removeDuplicates(arr2)); // 5
console.log(arr2);                    // [0, 1, 2, 3, 4, ...]

/**
 * Visual trace for [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]:
 * 
 * read=0: write=0, nums[read]=0 (skip comparison for first element)
 * read=1: nums[1]=0, nums[0]=0, same -> skip
 * read=2: nums[2]=1, nums[1]=0, different -> write=1, nums[1]=1, write=2
 * read=3: nums[3]=1, nums[2]=1, same -> skip
 * read=4: nums[4]=1, nums[3]=1, same -> skip
 * read=5: nums[5]=2, nums[4]=1, different -> write=2, nums[2]=2, write=3
 * read=6: nums[6]=2, nums[5]=2, same -> skip
 * read=7: nums[7]=3, nums[6]=2, different -> write=3, nums[3]=3, write=4
 * read=8: nums[8]=3, nums[7]=3, same -> skip
 * read=9: nums[9]=4, nums[8]=3, different -> write=4, nums[4]=4, write=5
 * 
 * Final: write=5, first 5 elements are [0, 1, 2, 3, 4]
 */