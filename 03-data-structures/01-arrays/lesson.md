# 3.1 — Arrays

## Prerequisites
- [Section 1: Computational Thinking](../../01-computational-thinking/01-reading-problem-statements.md) (all lessons)
- [Section 2: Big O and Complexity](../../02-big-o-and-complexity/01-what-is-big-o.md) (all lessons)

## Learning Objectives
- Understand how arrays work in memory (conceptual)
- Know the time complexity of common array operations in JS/Python
- Master single-pass iteration patterns
- Use in-place modification and two-pointer techniques (intro)
- Solve basic array problems without extra data structures

---

## What Is an Array?

An array is a **contiguous block of memory** storing elements of the same type, accessible by index.

```
Index:    0    1    2    3    4
Value:   [5]  [2]  [9]  [1]  [7]
          ↑
        arr[0] gives O(1) access
```

**Key properties:**
- **O(1) access by index** — given position 0, 1, 2, ..., we can jump directly to that memory address
- **O(1) insertion at end** — adding to the end is fast (assuming space)
- **O(n) insertion at beginning/middle** — all elements after must shift
- **O(n) search** — finding a value requires scanning, unless we know the index

In JavaScript and Python, arrays are "dynamic" — they can grow and shrink. Under the hood, when you run out of space, the runtime allocates a larger array and copies elements over. This is amortized O(1) for appends, but we still treat it as O(n) for insertions at other positions.

---

## Array Operations and Their Complexities

### JavaScript (TypeScript)

| Operation | Code | Time | Space |
|-----------|------|------|-------|
| Access by index | `arr[i]` | O(1) | O(1) |
| Set by index | `arr[i] = x` | O(1) | O(1) |
| Get length | `arr.length` | O(1) | O(1) |
| Append to end | `arr.push(x)` | O(1)* | O(1) |
| Remove from end | `arr.pop()` | O(1) | O(1) |
| Insert at beginning | `arr.unshift(x)` | O(n) | O(1) |
| Remove from beginning | `arr.shift()` | O(n) | O(1) |
| Search for value | `arr.indexOf(x)` or `arr.includes(x)` | O(n) | O(1) |
| Slice (copy portion) | `arr.slice(start, end)` | O(n) | O(n) |

*Amortized O(1) — occasionally O(n) when resize happens, but average is O(1).

### Python

| Operation | Code | Time | Space |
|-----------|------|------|-------|
| Access by index | `arr[i]` | O(1) | O(1) |
| Set by index | `arr[i] = x` | O(1) | O(1) |
| Get length | `len(arr)` | O(1) | O(1) |
| Append to end | `arr.append(x)` | O(1)* | O(1) |
| Remove from end | `arr.pop()` | O(1) | O(1) |
| Insert at position | `arr.insert(i, x)` | O(n) | O(1) |
| Remove from beginning | `arr.pop(0)` | O(n) | O(1) |
| Search for value | `x in arr` or `arr.index(x)` | O(n) | O(1) |
| Slice | `arr[start:end]` | O(n) | O(n) |

---

## Common Patterns

### Pattern 1: Single Pass Accumulation

The most fundamental pattern: iterate once, track something.

**Problem:** Find the sum of all elements.

**TypeScript:**
```typescript
function sumArray(nums: number[]): number {
    let total = 0;
    for (const num of nums) {
        total += num;
    }
    return total;
}
// Time: O(n), Space: O(1)
```

**Python:**
```python
def sum_array(nums: list[int]) -> int:
    total = 0
    for num in nums:
        total += num
    return total
# Time: O(n), Space: O(1)
```

> **Python note:** `sum(nums)` is a built-in that does exactly this. But in interviews, you'd explain "I'm iterating once and accumulating" — the built-in is the same complexity.

**Problem:** Find the maximum element.

**TypeScript:**
```typescript
function findMax(nums: number[]): number {
    if (nums.length === 0) throw new Error("Empty array");
    
    let maxVal = nums[0];  // Start with first element
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > maxVal) {
            maxVal = nums[i];
        }
    }
    return maxVal;
}
// Time: O(n), Space: O(1)
```

**Python:**
```python
def find_max(nums: list[int]) -> int:
    if not nums:
        raise ValueError("Empty array")
    
    max_val = nums[0]
    for i in range(1, len(nums)):
        if nums[i] > max_val:
            max_val = nums[i]
    return max_val
# Time: O(n), Space: O(1)
```

> **Python note:** `max(nums)` is built-in. Same complexity.

---

### Pattern 2: In-Place Modification

When you can modify the input array instead of creating a new one, you save space.

**Problem:** Double every element in the array, in-place.

**TypeScript:**
```typescript
function doubleInPlace(nums: number[]): void {
    for (let i = 0; i < nums.length; i++) {
        nums[i] *= 2;
    }
}
// Time: O(n), Space: O(1) -- we modify the input array directly
```

**Python:**
```python
def double_in_place(nums: list[int]) -> None:
    for i in range(len(nums)):
        nums[i] *= 2
# Time: O(n), Space: O(1)
```

> **Note:** In Python, `for x in nums:` would give you copies of values, not references. To modify in-place, you need the index.

**Problem:** Move all zeros to the end, preserving order of non-zeros. In-place.

**TypeScript:**
```typescript
function moveZeroes(nums: number[]): void {
    let writeIndex = 0;  // Position for the next non-zero
    
    // Move all non-zeros to the front
    for (let readIndex = 0; readIndex < nums.length; readIndex++) {
        if (nums[readIndex] !== 0) {
            nums[writeIndex] = nums[readIndex];
            writeIndex++;
        }
    }
    
    // Fill the rest with zeros
    for (let i = writeIndex; i < nums.length; i++) {
        nums[i] = 0;
    }
}
// Time: O(n), Space: O(1)
```

**Python:**
```python
def move_zeroes(nums: list[int]) -> None:
    write_index = 0
    
    # Move all non-zeros to the front
    for read_index in range(len(nums)):
        if nums[read_index] != 0:
            nums[write_index] = nums[read_index]
            write_index += 1
    
    # Fill the rest with zeros
    for i in range(write_index, len(nums)):
        nums[i] = 0
# Time: O(n), Space: O(1)
```

This is a classic "two-pointer" pattern. One pointer reads, one pointer writes. We'll see this pattern more in Section 4.

---

### Pattern 3: Count and Track

Track counts or indices while iterating.

**Problem:** Find the index of the first occurrence of a target value.

**TypeScript:**
```typescript
function findIndex(nums: number[], target: number): number {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === target) {
            return i;
        }
    }
    return -1;  // Not found
}
// Time: O(n), Space: O(1)
```

**Python:**
```python
def find_index(nums: list[int], target: int) -> int:
    for i in range(len(nums)):
        if nums[i] == target:
            return i
    return -1  # Not found
# Time: O(n), Space: O(1)
```

> **Python note:** `nums.index(target)` does this but raises `ValueError` if not found.

**Problem:** Count how many times a value appears.

**TypeScript:**
```typescript
function countOccurrences(nums: number[], target: number): number {
    let count = 0;
    for (const num of nums) {
        if (num === target) {
            count++;
        }
    }
    return count;
}
// Time: O(n), Space: O(1)
```

**Python:**
```python
def count_occurrences(nums: list[int], target: int) -> int:
    count = 0
    for num in nums:
        if num == target:
            count += 1
    return count
# Time: O(n), Space: O(1)
```

> **Python note:** `nums.count(target)` is built-in.

---

### Pattern 4: Two Pointers from Opposite Ends

Useful for problems involving pairs, comparing from both ends, or reversing.

**Problem:** Reverse an array in-place.

**TypeScript:**
```typescript
function reverseArray(nums: number[]): void {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        // Swap
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
def reverse_array(nums: list[int]) -> None:
    left, right = 0, len(nums) - 1
    
    while left < right:
        nums[left], nums[right] = nums[right], nums[left]
        left += 1
        right -= 1
# Time: O(n), Space: O(1)
```

> **Python note:** `nums.reverse()` does this in-place. `reversed(nums)` returns an iterator. `nums[::-1]` creates a new reversed list.

**Problem:** Check if an array is a palindrome (reads same forwards and backwards).

**TypeScript:**
```typescript
function isPalindrome(nums: number[]): boolean {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        if (nums[left] !== nums[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}
// Time: O(n), Space: O(1)
```

**Python:**
```python
def is_palindrome(nums: list[int]) -> bool:
    left, right = 0, len(nums) - 1
    
    while left < right:
        if nums[left] != nums[right]:
            return False
        left += 1
        right -= 1
    return True
# Time: O(n), Space: O(1)
```

---

### Pattern 5: Running Calculations (Running Sum, Running Max, etc.)

Keep track of a "running" value while iterating.

**Problem:** Running sum — return an array where each element is the sum of all previous elements.

**TypeScript:**
```typescript
function runningSum(nums: number[]): number[] {
    const result: number[] = [];
    let runningTotal = 0;
    
    for (const num of nums) {
        runningTotal += num;
        result.push(runningTotal);
    }
    
    return result;
}
// Time: O(n), Space: O(n) for the result array
```

**Input:** `[1, 2, 3, 4]`
**Output:** `[1, 3, 6, 10]` (1, 1+2, 1+2+3, 1+2+3+4)

**Python:**
```python
def running_sum(nums: list[int]) -> list[int]:
    result = []
    running_total = 0
    
    for num in nums:
        running_total += num
        result.append(running_total)
    
    return result
# Time: O(n), Space: O(n)
```

**In-place version:**

**TypeScript:**
```typescript
function runningSumInPlace(nums: number[]): void {
    for (let i = 1; i < nums.length; i++) {
        nums[i] += nums[i - 1];
    }
}
// Modifies input: [1, 2, 3, 4] → [1, 3, 6, 10]
// Time: O(n), Space: O(1)
```

**Python:**
```python
def running_sum_in_place(nums: list[int]) -> None:
    for i in range(1, len(nums)):
        nums[i] += nums[i - 1]
# Time: O(n), Space: O(1)
```

---

## Worked Example: Maximum Subarray Sum

**Problem:** Given an array of integers, find the contiguous subarray with the largest sum.

This is LeetCode #53. There's an O(n) solution called Kadane's Algorithm, but let's start with a simpler approach to build intuition.

### Approach 1: Brute Force (O(n²))

Try every possible subarray.

**TypeScript:**
```typescript
function maxSubarraySumBrute(nums: number[]): number {
    let maxSum = nums[0];
    
    for (let start = 0; start < nums.length; start++) {
        let currentSum = 0;
        for (let end = start; end < nums.length; end++) {
            currentSum += nums[end];
            maxSum = Math.max(maxSum, currentSum);
        }
    }
    
    return maxSum;
}
// Time: O(n²), Space: O(1)
```

**Python:**
```python
def max_subarray_sum_brute(nums: list[int]) -> int:
    max_sum = nums[0]
    
    for start in range(len(nums)):
        current_sum = 0
        for end in range(start, len(nums)):
            current_sum += nums[end]
            max_sum = max(max_sum, current_sum)
    
    return max_sum
# Time: O(n²), Space: O(1)
```

This works, but it's slow for large arrays. Can we do better?

### Approach 2: Kadane's Algorithm (O(n))

The key insight: if a subarray sum becomes negative, it's never useful to keep extending it. Reset to 0 and start fresh.

**TypeScript:**
```typescript
function maxSubarraySum(nums: number[]): number {
    let maxSum = nums[0];
    let currentSum = 0;
    
    for (const num of nums) {
        currentSum += num;
        maxSum = Math.max(maxSum, currentSum);
        
        // If current sum becomes negative, reset
        if (currentSum < 0) {
            currentSum = 0;
        }
    }
    
    return maxSum;
}
// Time: O(n), Space: O(1)
```

**Python:**
```python
def max_subarray_sum(nums: list[int]) -> int:
    max_sum = nums[0]
    current_sum = 0
    
    for num in nums:
        current_sum += num
        max_sum = max(max_sum, current_sum)
        
        # If current sum becomes negative, reset
        if current_sum < 0:
            current_sum = 0
    
    return max_sum
# Time: O(n), Space: O(1)
```

**Example trace:** `nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]`

| num | current_sum | max_sum | Note |
|-----|-------------|---------|------|
| -2 | -2 | -2 | negative, reset to 0 after |
| 1 | 1 | 1 | |
| -3 | -2 | 1 | negative, reset |
| 4 | 4 | 4 | |
| -1 | 3 | 4 | |
| 2 | 5 | 5 | new max! |
| 1 | 6 | 6 | new max! |
| -5 | 1 | 6 | |
| 4 | 5 | 6 | |

**Answer:** 6, from subarray `[4, -1, 2, 1]`

---

## Common Mistakes

### 1. Off-by-one in loop boundaries

```typescript
// Bug: accessing out of bounds
for (let i = 0; i <= nums.length; i++) { }  // i goes to nums.length

// Correct:
for (let i = 0; i < nums.length; i++) { }   // i goes to nums.length - 1
```

### 2. Using `shift`/`unshift` inside loops (O(n²) accidentally)

```typescript
// Bad: O(n²) — each shift is O(n)
for (let i = 0; i < nums.length; i++) {
    nums.shift();  // Don't do this in a loop!
}

// Good: O(n) — process from front with index
let i = 0;
while (i < nums.length) {
    // process nums[i]
    i++;
}
```

### 3. Modifying array while iterating (in Python, this is error-prone)

```python
# Bad: modifying while iterating can skip elements
for i in range(len(nums)):
    if nums[i] == 0:
        nums.pop(i)  # Indices shift after pop!

# Good: iterate backwards, or build new list
for i in range(len(nums) - 1, -1, -1):
    if nums[i] == 0:
        nums.pop(i)
```

### 4. Creating unnecessary copies

```typescript
// Unnecessary copy — O(n) space
const copy = [...nums].reverse();
// Then use copy once and throw it away

// Better: reverse in-place if you can modify input, or accept the copy cost if you need to preserve original
```

---

## Key Takeaways

1. **Arrays give O(1) index access but O(n) search** — know which operations are cheap.
2. **In-place modification saves space** — be comfortable modifying the input when allowed.
3. **Two pointers from opposite ends** is a fundamental pattern for reversing, palindrome-checking, and pair-finding.
4. **Running calculations** (running sum, running max) are common and efficient.
5. **Avoid `shift`/`unshift` in loops** — they're O(n) each, leading to O(n²) total.
6. **Single-pass iteration is the goal** — most array problems can be solved in O(n) time.

---

## What's Next

Arrays are the foundation. From here, we'll build to more complex patterns (sliding window, two-pointer variations) in Section 4.

Next up: [Strings](../02-strings/lesson.md) — arrays of characters with some special handling.

---

**Practice:** [Array Exercises](practice/exercises.md)