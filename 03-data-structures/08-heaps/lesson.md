# 3.8 — Heaps & Priority Queues

## Prerequisites
- [3.1 — Arrays](../01-arrays/lesson.md)
- [3.7 — Trees](../07-trees/lesson.md) (helpful, but not strictly required)

## Section Outline (Detailed)

### 1. What Is a Heap?
- Definition: A complete binary tree where parent is always greater (max-heap) or smaller (min-heap) than children
- Min-heap: Parent ≤ children (root is minimum)
- Max-heap: Parent ≥ children (root is maximum)
- Heap property: Valid heap satisfies the ordering at every node
- Why heaps matter: Priority queues, top-K problems, scheduling, median finding

### 2. Heap as an Array
- Heaps are stored as arrays, not pointer-based trees!
- For node at index i:
  - Left child: `2*i + 1`
  - Right child: `2*i + 2`
  - Parent: `Math.floor((i-1) / 2)`
- This enables O(log n) bubble-up (heapify-up) and bubble-down (heapify-down)

### 3. Operations and Complexity
| Operation | Time |
|-----------|------|
| Get min/max (peek) | O(1) |
| Insert (push) | O(log n) |
| Extract min/max (pop) | O(log n) |
| Build heap from array | O(n) |
| Heapify | O(log n) |

### 4. JavaScript/TypeScript Implementation Note
- JS has no built-in heap in the standard library!
- For interviews: Explain the heap concept, use an array, describe operations
- Or: Use a third-party library (not recommended for interviews)
- Or: Use sorting as alternative for top-K when n is small

### 5. Python Implementation
- `heapq` module provides min-heap operations
- List as heap: `heapq.heapify(list)` makes it a valid heap
- `heapq.heappush(heap, item)` — insert
- `heapq.heappop(heap)` — remove and return smallest
- `heapq.nlargest(k, iterable)` — get k largest elements
- For max-heap: Negate values before pushing, negate before returning

### 6. Key Pattern: Top K Elements
- **LeetCode 215: Kth Largest Element in Array**
- **LeetCode 347: Top K Frequent Elements**
- Approach 1 (Min-heap): Keep heap of size k. If heap > k, pop smallest. Result is heap contents.
- Approach 2 (Max-heap): Push all, pop k times.
- Approach 3 (Quickselect): O(n) average, covered in sorting section.

### 7. Key Pattern: Merge K Sorted Lists/Arrays
- **LeetCode 23: Merge k Sorted Lists**
- Use min-heap to always get smallest element from k lists
- Push first element from each list into heap
- Pop smallest, push next from that list

### 8. Key Pattern: Median from Data Stream
- **LeetCode 295: Find Median from Data Stream**
- Use two heaps: max-heap for lower half, min-heap for upper half
- Keep them balanced (size differs by at most 1)
- Median is max of lower or average of two middles

### 9. Implementation: MinHeap Class (Conceptual)
- Provide a conceptual implementation
- `push(value)`: Add to end, bubble up
- `pop()`: Swap root with last, remove last, bubble down
- `peek()`: Return root

### 10. Worked Examples
Write full solutions for:
- LeetCode 215: Kth Largest Element (show both heap and quickselect)
- LeetCode 23: Merge k Sorted Lists
- LeetCode 347: Top K Frequent Elements
- Custom MinHeap implementation (for understanding)

### 11. Practice Problems
- Warm-up: Implement push and pop for min-heap
- LeetCode 215: Kth Largest Element in an Array
- LeetCode 347: Top K Frequent Elements
- LeetCode 23: Merge k Sorted Lists
- LeetCode 1046: Last Stone Weight
- LeetCode 703: Kth Largest Element in a Stream

---

## Code Examples to Include

**Python Heap:**
```python
import heapq

# Min-heap (default)
heap = []
heapq.heappush(heap, 3)
heapq.heappush(heap, 1)
heapq.heappush(heap, 2)
heapq.heappop(heap)  # Returns 1 (smallest)

# Max-heap (negate values)
max_heap = []
heapq.heappush(max_heap, -3)
heapq.heappush(max_heap, -1)
heapq.heappush(max_heap, -2)
-heapq.heappop(max_heap)  # Returns 3 (largest)

# Top K using heap
nums = [1, 1, 1, 2, 2, 3]
count = Counter(nums)
heap = [(-freq, num) for num, freq in count.items()]
heapq.heapify(heap)
# Then heappop k times
```

**Kth Largest (MinHeap approach):**
```python
import heapq

def findKthLargest(nums: list[int], k: int) -> int:
    # Min-heap of size k
    heap = []
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)  # Remove smallest
    return heap[0]  # k-th largest
```

---

## Next
[Graphs](../09-graphs/lesson.md) — Nodes and edges, BFS/DFS, connected components.