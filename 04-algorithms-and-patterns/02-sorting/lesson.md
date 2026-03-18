# 4.2 — Sorting

## Prerequisites
- [4.1 — Recursion](../01-recursion/lesson.md)
- All of Section 2 (Big O)

## Section Outline (Detailed)

### 1. Why Sorting Matters
- Sorted data enables binary search (O(log n) vs O(n))
- Sorted data enables two-pointer techniques
- Many problems can be solved by "sort first, then process"
- Sorting is O(n log n), which is acceptable for many constraints

### 2. Built-in Sorting
- JavaScript: `arr.sort((a, b) => a - b)` — defaults to lexicographic!
- Python: `arr.sort()` or `sorted(arr)` — Timsort, O(n log n), stable
- Always provide comparator for numbers in JS!

### 3. Common Sorting Algorithms (Conceptual)
Don't implement from scratch in interviews, but understand:
- **Merge Sort**: O(n log n), stable, divide-and-conquer, requires O(n) space
- **Quick Sort**: O(n log n) average, O(n²) worst, in-place
- **Heap Sort**: O(n log n), in-place, not stable
- **Insertion Sort**: O(n²), good for small/nearly sorted arrays

### 4. Merge Sort (Know Conceptually)
- Divide: Split array in half
- Conquer: Recursively sort each half
- Merge: Combine two sorted halves
- Why it matters: Introduces divide-and-conquer pattern, used in merge k sorted lists

### 5. Sorting for Problem-Solving
- **Collision problems**: Sort + scan (meeting rooms, merge intervals)
- **Two-sum on sorted array**: Sort → two pointers
- **Finding patterns**: Sort → adjacent elements have relationship
- **Custom ordering**: Sort by custom comparator

### 6. Key Pattern: Sort Then Solve
Many problems become easier after sorting:
- Anagrams: sort, compare
- Merge intervals: sort by start, then merge
- Two-sum variants: sort, then two pointers

### 7. Custom Comparators
- JavaScript: `arr.sort((a, b) => a - b)` for numbers, `a.key.localeCompare(b.key)` for strings
- Python: `arr.sort(key=lambda x: x[0])`, `arr.sort(key=lambda x: (-x[1], x[0]))` for multi-key

### 8. Stability
- Stable sort: preserves relative order of equal elements
- Unstable: may reorder equal elements
- When it matters: sorting by secondary key after primary key

### 9. Worked Examples
- Sort array of numbers
- Sort array of objects by property
- LeetCode 56: Merge Intervals (sort first)
- LeetCode 937: Reorder Data in Log Files (custom comparator)

### 10. Practice Problems
- Warm-up: Sort array ascending, descending
- Warm-up: Sort objects by property, then by second property
- LeetCode 56: Merge Intervals
- LeetCode 912: Sort an Array (implement merge sort for practice)
- LeetCode 937: Reorder Data in Log Files

---

## Code Examples

**JavaScript Sorting:**
```typescript
// Numbers (always provide comparator!)
arr.sort((a, b) => a - b);  // Ascending
arr.sort((a, b) => b - a);  // Descending

// Objects
arr.sort((a, b) => a.age - b.age);  // By age ascending
arr.sort((a, b) => a.name.localeCompare(b.name));  // By name
```

**Python Sorting:**
```python
# Numbers
arr.sort()  # In-place, ascending
arr.sort(reverse=True)  # Descending

# Objects/tuples
arr.sort(key=lambda x: x[0])  # Sort by first element
arr.sort(key=lambda x: (x[1], x[0]))  # Sort by second, then first
arr.sort(key=lambda x: (-x[1], x[0]))  # Sort by second desc, first asc
```

**Merge Intervals:**
```python
def merge(intervals: list[list[int]]) -> list[list[int]]:
    if not intervals:
        return []
    
    intervals.sort(key=lambda x: x[0])  # Sort by start
    merged = [intervals[0]]
    
    for interval in intervals[1:]:
        if interval[0] <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], interval[1])
        else:
            merged.append(interval)
    
    return merged
```

---

## Next
[Binary Search](../03-binary-search/lesson.md) — O(log n) search on sorted data.