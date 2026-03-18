# 4.4 — Two Pointers

## Prerequisites
- [3.1 — Arrays](../../03-data-structures/01-arrays/lesson.md)
- [3.2 — Strings](../../03-data-structures/02-strings/lesson.md)
- [4.2 — Sorting](../02-sorting/lesson.md)

## Section Outline (Detailed)

### 1. What Is the Two-Pointer Technique?
- Use two pointers to traverse data structure
- Reduce nested loops O(n²) to single pass O(n)
- Works on sorted arrays, strings, and linked lists
- Most versatile pattern for array/string problems

### 2. Types of Two Pointers
- **Opposite ends**: Start from both ends, move toward center
- **Same direction**: Both start at beginning, move at different speeds
- **Fast-slow**: Special case where one moves twice as fast

### 3. Pattern: Opposite Ends
- Start: `left = 0`, `right = n - 1`
- Move pointers based on some condition
- Stop: `left >= right`

**Use cases:**
- Two-sum on sorted array
- Reverse array/string
- Check palindrome
- Container with most water

### 4. Pattern: Same Direction (Slow-Fast)
- Both pointers start at beginning
- One pointer leads, one follows
- Distance between them represents something

**Use cases:**
- Remove duplicates
- Remove element
- Move zeroes

### 5. Pattern: Fast-Slow (Cycle Detection)
- Fast moves 2 steps, slow moves 1 step
- If cycle, they will meet
- Use to find middle of linked list

**Use cases:**
- Detect cycle in linked list
- Find middle element

### 6. When to Use Two Pointers
- Array is sorted (or strings)
- Problem involves pairs (two-sum, etc.)
- Need to find a subarray/substring
- Need to reverse or compare from ends
- Linked list cycle/middle detection

### 7. Worked Examples
- LeetCode 167: Two Sum II (sorted array, opposite ends)
- LeetCode 11: Container With Most Water (opposite ends)
- LeetCode 125: Valid Palindrome (opposite ends)
- LeetCode 283: Move Zeroes (same direction)
- LeetCode 26: Remove Duplicates from Sorted Array (same direction)
- LeetCode 141: Linked List Cycle (fast-slow)

### 8. Common Mistakes
- Moving wrong pointer first
- Off-by-one in conditions (`<` vs `<=`)
- Not handling edge cases (empty, single element)
- In linked lists: not checking `fast && fast.next` before moving

### 9. Practice Problems
- LeetCode 167: Two Sum II
- LeetCode 11: Container With Most Water
- LeetCode 15: 3Sum (extend to three pointers)
- LeetCode 125: Valid Palindrome
- LeetCode 283: Move Zeroes
- LeetCode 26: Remove Duplicates from Sorted Array
- LeetCode 27: Remove Element
- LeetCode 141: Linked List Cycle
- LeetCode 876: Middle of Linked List

---

## Code Examples

**Two Sum II (Sorted Array):**
```typescript
function twoSum(nums: number[], target: number): number[] {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        const sum = nums[left] + nums[right];
        
        if (sum === target) {
            return [left + 1, right + 1];  // 1-indexed
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    
    return [-1, -1];  // Not found
}
```

**Move Zeroes (Same Direction):**
```python
def moveZeroes(nums: list[int]) -> None:
    slow = 0  # Position for next non-zero
    
    for fast in range(len(nums)):
        if nums[fast] != 0:
            nums[slow], nums[fast] = nums[fast], nums[slow]
            slow += 1
```

**Container With Most Water:**
```typescript
function maxArea(height: number[]): number {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;
    
    while (left < right) {
        const width = right - left;
        const h = Math.min(height[left], height[right]);
        maxWater = Math.max(maxWater, width * h);
        
        // Move the shorter line
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxWater;
}
```

---

## Next
[Sliding Window](../05-sliding-window/lesson.md) — Subarray/substring problems with dynamic window size.