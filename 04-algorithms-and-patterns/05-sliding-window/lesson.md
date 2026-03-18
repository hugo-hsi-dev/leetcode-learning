# 4.5 — Sliding Window

## Prerequisites
- [4.4 — Two Pointers](../04-two-pointers/lesson.md)
- [3.3 — Hash Maps & Sets](../../03-data-structures/03-hash-maps-and-sets/lesson.md)

## Section Outline (Detailed)

### 1. What Is Sliding Window?
- Maintain a "window" (contiguous subarray/substring) that satisfies a condition
- Slide the window by expanding right and occasionally contracting left
- Optimization of brute force O(n²) or O(n³) into O(n)
- Use when: max/min/longest/shortest subarray with condition

### 2. Types of Sliding Window
- **Fixed-size window**: Window size k is known
- **Variable-size window**: Find window that satisfies condition (shrink when invalid)
- **Dynamic window with constraint**: Window must satisfy a constraint (e.g., at most k distinct)

### 3. Template: Fixed-Size Window
```
left = 0
for right in range(n):
    add element at right to window
    if right - left + 1 > k:  # Window exceeds size
        remove element at left from window
        left += 1
    # At this point, window is exactly size k
    # Update answer if window is valid
```

### 4. Template: Variable-Size Window (Shrink When Invalid)
```
left = 0
for right in range(n):
    add element at right to window/state
    while window is invalid:
        remove element at left from window/state
        left += 1
    # At this point, window is valid
    # Update answer
```

### 5. Common Use Cases
- **Longest substring without repeating characters**: Use set to track chars, shrink when duplicate
- **Longest subarray with sum ≤ k**: Use prefix sum or two pointers
- **Minimum size subarray sum**: Shrink from left while valid
- **Substring with at most k distinct characters**: Track distinct count, shrink when > k
- **Fixed-size average/sum**: Classic fixed window

### 6. Data Structures for Window State
- **Sum/average**: Single variable tracking sum
- **Char frequency**: Hash map (char → count) or array if ASCII
- **Distinct elements**: Set or hash map with count
- **Product**: Track product (careful with zeros)

### 7. Worked Examples
- LeetCode 3: Longest Substring Without Repeating Characters
- LeetCode 209: Minimum Size Subarray Sum
- LeetCode 76: Minimum Window Substring (Hard)
- LeetCode 424: Longest Repeating Character Replacement
- LeetCode 567: Permutation in String
- LeetCode 438: Find All Anagrams in a String

### 8. Key Insight for Variable Windows
- Expand right until window is invalid (or end)
- When invalid, shrink left until valid again
- Track best answer when window is valid
- Use while loop for shrinking: `while invalid: shrink`

### 9. Common Mistakes
- Forgetting to remove elements when shrinking
- Using if instead of while for shrinking
- Not tracking window state correctly (e.g., distinct count)
- Off-by-one in window size calculation

### 10. Practice Problems
- LeetCode 209: Minimum Size Subarray Sum
- LeetCode 3: Longest Substring Without Repeating Characters
- LeetCode 567: Permutation in String
- LeetCode 438: Find All Anagrams in a String
- LeetCode 424: Longest Repeating Character Replacement
- LeetCode 904: Fruit Into Baskets

---

## Code Examples

**Longest Substring Without Repeating:**
```typescript
function lengthOfLongestSubstring(s: string): number {
    const chars = new Set<string>();
    let left = 0;
    let maxLen = 0;
    
    for (let right = 0; right < s.length; right++) {
        while (chars.has(s[right])) {
            chars.delete(s[left]);
            left++;
        }
        chars.add(s[right]);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
}
```

**Minimum Size Subarray Sum:**
```python
def minSubArrayLen(target: int, nums: list[int]) -> int:
    left = 0
    window_sum = 0
    min_len = float('inf')
    
    for right in range(len(nums)):
        window_sum += nums[right]
        
        while window_sum >= target:
            min_len = min(min_len, right - left + 1)
            window_sum -= nums[left]
            left += 1
    
    return min_len if min_len != float('inf') else 0
```

---

## Next
[BFS & DFS on Trees](../06-bfs-and-dfs-trees/lesson.md) — Tree traversal patterns.