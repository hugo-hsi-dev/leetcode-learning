# 4.3 — Binary Search

## Prerequisites
- [4.2 — Sorting](../02-sorting/lesson.md)
- All of Section 2 (Big O)

## Section Outline (Detailed)

### 1. What Is Binary Search?
- Search algorithm for sorted arrays
- Repeatedly divide search space in half
- O(log n) time, O(1) space
- Fundamental algorithm appearing in many interview problems

### 2. The Classic Template
```
left = 0, right = length - 1
while left <= right:
    mid = left + (right - left) // 2
    if arr[mid] == target: return mid
    elif arr[mid] < target: left = mid + 1
    else: right = mid - 1
return -1  # Not found
```

### 3. Key Details
- `mid = left + (right - left) // 2` avoids overflow (not an issue in JS/Python, but good habit)
- Loop condition: `left <= right` (not `<`)
- Update: `left = mid + 1` and `right = mid - 1` (not `mid`)
- Why O(log n): Each iteration halves the search space

### 4. Variations
- **Find exact match**: Classic binary search
- **Find first occurrence**: When array has duplicates, find leftmost
- **Find last occurrence**: Find rightmost
- **Find insertion position**: Where would element go?
- **Find closest element**: Closest less-than or greater-than

### 5. Binary Search on Answer Space
- Not searching for a value in array— searching for a value in a range
- Example: "What's the minimum x such that some condition holds?"
- **LeetCode 410: Split Array Largest Sum**
- **LeetCode 875: Koko Eating Bananas**
- Pattern: `condition(x)` → binary search for smallest x where condition is true

### 6. When to Use Binary Search
- Array is sorted (or can be transformed into sorted)
- You need O(log n) time (large input size)
- Searching for a specific value or boundary
- Optimizing a value (answer space search)

### 7. Worked Examples
- LeetCode 704: Binary Search (classic)
- LeetCode 35: Search Insert Position
- LeetCode 278: First Bad Version
- LeetCode 153: Find Minimum in Rotated Sorted Array
- LeetCode 33: Search in Rotated Sorted Array
- LeetCode 410: Split Array Largest Sum (answer space)

### 8. Common Mistakes
- `mid = (left + right) // 2` — overflow in some languages
- Loop condition `left < right` vs `left <= right`
- Updating `left = mid` instead of `left = mid + 1` (infinite loop)
- Forgetting to handle "not found" case
- Off-by-one in insertion position

### 9. Practice Problems
- LeetCode 704: Binary Search
- LeetCode 35: Search Insert Position
- LeetCode 278: First Bad Version
- LeetCode 69: Sqrt(x)
- LeetCode 153: Find Minimum in Rotated Sorted Array
- LeetCode 33: Search in Rotated Sorted Array

---

## Code Examples

**Classic Binary Search:**
```typescript
function binarySearch(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;  // Not found
}
```

**Find First Occurrence (with duplicates):**
```python
def find_first(nums: list[int], target: int) -> int:
    left, right = 0, len(nums) - 1
    result = -1
    
    while left <= right:
        mid = (left + right) // 2
        
        if nums[mid] == target:
            result = mid
            right = mid - 1  # Continue searching left
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return result
```

---

## Next
[Two Pointers](../04-two-pointers/lesson.md) — Efficient iteration for sorted arrays and pair problems.