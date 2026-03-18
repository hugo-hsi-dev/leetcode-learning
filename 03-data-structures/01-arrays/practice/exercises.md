# Arrays — Practice Exercises

## Warm-up Exercises

These exercises reinforce the patterns from the lesson. Do these first before the LeetCode problems.

---

### Warm-up 1: Sum of Positive Numbers

Given an array of integers, return the sum of all positive numbers (greater than 0).

**Examples:**
- `[1, -2, 3, -4, 5]` → `9` (1 + 3 + 5)
- `[-1, -2, -3]` → `0`
- `[10, 20, 30]` → `60`

**Write both TypeScript and Python solutions.**

<details>
<summary>Solution</summary>

**TypeScript:**
```typescript
function sumPositive(nums: number[]): number {
    let total = 0;
    for (const num of nums) {
        if (num > 0) {
            total += num;
        }
    }
    return total;
}
// Time: O(n), Space: O(1)
```

**Python:**
```python
def sum_positive(nums: list[int]) -> int:
    total = 0
    for num in nums:
        if num > 0:
            total += num
    return total
# Time: O(n), Space: O(1)
```

Key pattern: single-pass accumulation with a condition.

</details>

---

### Warm-up 2: Count Even Numbers

Return the count of even numbers in an array.

**Examples:**
- `[1, 2, 3, 4, 5, 6]` → `3` (2, 4, 6)
- `[1, 3, 5]` → `0`
- `[2, 4, 6, 8]` → `4`

<details>
<summary>Solution</summary>

**TypeScript:**
```typescript
function countEven(nums: number[]): number {
    let count = 0;
    for (const num of nums) {
        if (num % 2 === 0) {
            count++;
        }
    }
    return count;
}
// Time: O(n), Space: O(1)
```

**Python:**
```python
def count_even(nums: list[int]) -> int:
    count = 0
    for num in nums:
        if num % 2 == 0:
            count += 1
    return count
# Time: O(n), Space: O(1)
```

Note: `num % 2 === 0` in TypeScript, `num % 2 == 0` in Python. The modulo operator works the same way.

</details>

---

### Warm-up 3: Find Index of Minimum

Return the index of the smallest element in the array. If there are multiple minimums, return the first occurrence.

**Examples:**
- `[3, 1, 4, 1, 5]` → `1` (minimum is 1, first occurrence at index 1)
- `[5, 4, 3, 2, 1]` → `4`
- `[10]` → `0`

<details>
<summary>Solution</summary>

**TypeScript:**
```typescript
function findMinIndex(nums: number[]): number {
    let minIndex = 0;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] < nums[minIndex]) {
            minIndex = i;
        }
    }
    return minIndex;
}
// Time: O(n), Space: O(1)
```

**Python:**
```python
def find_min_index(nums: list[int]) -> int:
    min_index = 0
    for i in range(1, len(nums)):
        if nums[i] < nums[min_index]:
            min_index = i
    return min_index
# Time: O(n), Space: O(1)
```

Key pattern: track an index, compare values at those indices.

</details>

---

### Warm-up 4: Reverse In-Place

Reverse an array in-place. Do not create a new array.

**Examples:**
- `[1, 2, 3, 4]` → (modified to) `[4, 3, 2, 1]`
- `['a', 'b', 'c']` → `['c', 'b', 'a']`
- `[1]` → `[1]` (unchanged)

<details>
<summary>Solution</summary>

**TypeScript:**
```typescript
function reverseInPlace(nums: number[]): void {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        const temp = nums[left];
        nums[left] = nums[right];
        nums[right] = temp;
        left++;
        right--;
    }
}
// Time: O(n), Space: O(1)
```

**Python:**
```python
def reverse_in_place(nums: list[int]) -> None:
    left, right = 0, len(nums) - 1
    
    while left < right:
        nums[left], nums[right] = nums[right], nums[left]
        left += 1
        right -= 1
# Time: O(n), Space: O(1)
```

Key pattern: two pointers moving toward each other.

</details>

---

### Warm-up 5: Running Maximum

Return an array where each element is the maximum of all elements up to that position.

**Examples:**
- `[3, 1, 4, 1, 5, 9, 2]` → `[3, 3, 4, 4, 5, 9, 9]`
- `[1, 2, 3, 4, 5]` → `[1, 2, 3, 4, 5]`
- `[5, 4, 3, 2, 1]` → `[5, 5, 5, 5, 5]`

<details>
<summary>Solution</summary>

**TypeScript:**
```typescript
function runningMax(nums: number[]): number[] {
    const result: number[] = [];
    let currentMax = nums[0];
    
    for (const num of nums) {
        currentMax = Math.max(currentMax, num);
        result.push(currentMax);
    }
    
    return result;
}
// Time: O(n), Space: O(n)
```

**Python:**
```python
def running_max(nums: list[int]) -> list[int]:
    result = []
    current_max = float('-inf')
    
    for num in nums:
        current_max = max(current_max, num)
        result.append(current_max)
    
    return result
# Time: O(n), Space: O(n)
```

Note: In Python, `float('-inf')` represents negative infinity, useful as an initial "no number can be smaller" value.

</details>

---

## LeetCode Easy Problems

These are real LeetCode problems. Try to solve them before looking at the hints or solutions.

---

### LeetCode 1: Two Sum [Easy]

**Problem:** Given an array of integers `nums` and an integer `target`, return indices of the two numbers that add up to `target`.

**Link:** https://leetcode.com/problems/two-sum/

**Examples:**
- `nums = [2, 7, 11, 15], target = 9` → `[0, 1]`
- `nums = [3, 2, 4], target = 6` → `[1, 2]`
- `nums = [3, 3], target = 6` → `[0, 1]`

**Constraints:**
- Exactly one solution exists
- You may not use the same element twice

<details>
<summary>Hint 1: Brute force approach</summary>

Try every pair of indices. For each i, check every j > i to see if nums[i] + nums[j] === target. This is O(n²) time.

</details>

<details>
<summary>Hint 2: Optimized approach</summary>

Use a hash map to store numbers you've seen and their indices. For each number, check if `target - num` is already in the map. This is O(n) time, O(n) space.

</details>

**Solutions:** [TypeScript](solutions/01-two-sum.ts) | [Python](solutions/01-two-sum.py)

---

### LeetCode 26: Remove Duplicates from Sorted Array [Easy]

**Problem:** Given a sorted array, remove the duplicates in-place such that each element appears only once. Return the new length.

**Link:** https://leetcode.com/problems/remove-duplicates-from-sorted-array/

**Examples:**
- `nums = [1, 1, 2]` → modify to `[1, 2, _]`, return `2`
- `nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]` → modify to `[0, 1, 2, 3, 4, _, _, _, _, _]`, return `5`

**Key insight:** The array is sorted, so duplicates are adjacent.

<details>
<summary>Hint 1: Two-pointer approach</summary>

Use one pointer (`write`) to track where to place the next unique element, and another pointer (`read`) to scan through the array. Only move `write` when you find a new unique value.

</details>

**Solutions:** [TypeScript](solutions/02-remove-duplicates-sorted.ts) | [Python](solutions/02-remove-duplicates-sorted.py)

---

### LeetCode 27: Remove Element [Easy]

**Problem:** Given an array `nums` and a value `val`, remove all instances of `val` in-place. Return the new length.

**Link:** https://leetcode.com/problems/remove-element/

**Examples:**
- `nums = [3, 2, 2, 3], val = 3` → modify to `[2, 2, _, _]`, return `2`
- `nums = [0, 1, 2, 2, 3, 0, 4, 2], val = 2` → modify to `[0, 1, 3, 0, 4, _, _, _]`, return `5`

<details>
<summary>Hint</summary>

Similar to warm-up 4 — use two pointers. One reads, one writes. When you see `val`, skip it. Otherwise, copy to the write position.

</details>

**Solutions:** [TypeScript](solutions/03-remove-element.ts) | [Python](solutions/03-remove-element.py)

---

### LeetCode 53: Maximum Subarray [Easy]

**Problem:** Find the contiguous subarray with the largest sum.

**Link:** https://leetcode.com/problems/maximum-subarray/

**Examples:**
- `nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]` → `6` (subarray `[4, -1, 2, 1]`)
- `nums = [1]` → `1`
- `nums = [5, 4, -1, 7, 8]` → `23` (the entire array)

<details>
<summary>Hint 1: Brute force</summary>

Calculate the sum of every subarray. O(n²) time. Can you do better?

</details>

<details>
<summary>Hint 2: Kadane's Algorithm</summary>

Keep a running sum. If at any point the running sum becomes negative, reset it to 0 — a negative sum will never help you. Track the maximum sum seen. O(n) time.

</details>

**Solutions:** [TypeScript](solutions/04-maximum-subarray.ts) | [Python](solutions/04-maximum-subarray.py)

---

### LeetCode 121: Best Time to Buy and Sell Stock [Easy]

**Problem:** Given an array where `prices[i]` is the stock price on day `i`, find the maximum profit from buying on one day and selling on a later day. If no profit is possible, return 0.

**Link:** https://leetcode.com/problems/best-time-to-buy-and-sell-stock/

**Examples:**
- `prices = [7, 1, 5, 3, 6, 4]` → `5` (buy at 1, sell at 6)
- `prices = [7, 6, 4, 3, 1]` → `0` (no profitable transaction)

<details>
<summary>Hint 1: Brute force</summary>

Try every pair (buy day, sell day) where buy day < sell day. O(n²). Too slow.

</details>

<details>
<summary>Hint 2: Single pass</summary>

Track the minimum price seen so far. For each day, calculate the profit if you sold today (price - min_so_far). Track the maximum profit. O(n).

</details>

**Solutions:** [TypeScript](solutions/05-best-time-to-buy-sell.ts) | [Python](solutions/05-best-time-to-buy-sell.py)

---

## Stretch Problems (Medium)

These are harder. Try them after you're comfortable with the Easy problems.

---

### LeetCode 238: Product of Array Except Self [Medium]

**Problem:** Given an array, return an array where each element `output[i]` equals the product of all elements except `nums[i]`. Do this without division and in O(n) time.

**Link:** https://leetcode.com/problems/product-of-array-except-self/

**Example:**
- `nums = [1, 2, 3, 4]` → `[24, 12, 8, 6]` (2×3×4, 1×3×4, 1×2×4, 1×2×3)

<details>
<summary>Hint 1: What would you need?</summary>

For each position i, you need the product of all elements to the left of i, and the product of all elements to the right of i.

</details>

<details>
<summary>Hint 2: Two passes</summary>

First pass: compute running product from the left. Second pass: compute running product from the right. Multiply them.

</details>

**Solutions:** [TypeScript](solutions/06-product-except-self.ts) | [Python](solutions/06-product-except-self.py)

---

### LeetCode 283: Move Zeroes (Closer to Medium than Easy)

**Problem:** Move all zeros to the end of the array while maintaining the order of non-zero elements. Do this in-place.

**Link:** https://leetcode.com/problems/move-zeroes/

**Example:**
- `nums = [0, 1, 0, 3, 12]` → `[1, 3, 12, 0, 0]`

This is actually covered in the lesson, but try to implement it from scratch.

**Solutions:** [TypeScript](solutions/07-move-zeroes.ts) | [Python](solutions/07-move-zeroes.py)

---

## What's Next

Once you can solve the Easy problems consistently (ideally in under 15 minutes each), move on to:

→ [Strings](../../02-strings/lesson.md) — arrays of characters with special handling