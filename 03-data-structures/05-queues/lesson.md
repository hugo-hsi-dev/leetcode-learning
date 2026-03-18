# 3.5 — Queues

## Prerequisites
- [3.4 — Stacks](../04-stacks/lesson.md)

## Section Outline (Detailed)

### 1. What Is a Queue?
- Definition: First-In-First-Out (FIFO) data structure
- Real-world analogies: Line at a store, printer job queue, message queue
- Why queues matter: BFS uses queues, task scheduling, buffering

### 2. Operations and Complexity
| Operation | Description | Time |
|-----------|-------------|------|
| Enqueue | Add to back | O(1) |
| Dequeue | Remove from front | O(1)* |
| Front/Peek | View front element | O(1) |
| isEmpty | Check if empty | O(1) |

*Note: O(1) only if implemented correctly. JS `shift()` is O(n)!

### 3. Implementation Challenges in JS/TS
- **Wrong:** Array with `push()` and `shift()` — `shift()` is O(n)!
- **Right:** Use index pointers, or use a deque library
- **Also Wrong:** Use `unshift()` and `pop()` — also O(n), just reversed
- **Best for interviews:** Explain the issue, use array anyway, or implement with linked list

### 4. Implementation in Python
- `collections.deque`: O(1) for both `append()` (enqueue) and `popleft()` (dequeue)
- Regular `list` with `pop(0)` is O(n) — avoid for queues!
- `queue.Queue` is for thread-safe operations, not interview use

### 5. Key Pattern: BFS Preview
- Queues are the engine of Breadth-First Search
- Process elements level by level
- Will be covered in detail in Section 4.6 and 4.7

### 6. Key Pattern: Level Order Traversal
- Process nodes level by level in a tree
- Queue stores nodes at current level, then next level
- **LeetCode 102: Binary Tree Level Order Traversal**

### 7. Key Pattern: Sliding Window with Queue (Introduction)
- Maintain a window of elements
- Use queue to track elements entering/leaving window
- Preview of sliding window pattern in Section 4.5

### 8. Worked Examples
Write full solutions for:
- Implement a queue using two stacks (design problem)
- LeetCode 933: Number of Recent Calls (Easy)
- Level order traversal preview (for trees section)

### 9. Common Mistakes
- Using `shift()` in JS without knowing it's O(n)
- Not checking `isEmpty()` before dequeuing
- Confusing enqueue/dequeue with push/pop

### 10. Practice Problems
- Warm-up: Implement a queue with `push` and `shift` (explain complexity issue)
- LeetCode 232: Implement Queue using Stacks
- LeetCode 933: Number of Recent Calls
- Preview: Level order traversal (will be revisited in Trees section)

---

## Code Examples to Include

**TypeScript Queue (simple, with complexity note):**
```typescript
// WARNING: shift() is O(n), so this is not truly O(1)
class Queue<T> {
    private items: T[] = [];
    
    enqueue(item: T): void {
        this.items.push(item);
    }
    
    dequeue(): T | undefined {
        return this.items.shift();  // O(n)!
    }
    
    peek(): T | undefined {
        return this.items[0];
    }
    
    isEmpty(): boolean {
        return this.items.length === 0;
    }
    
    size(): number {
        return this.items.length;
    }
}
```

**Python (using deque):**
```python
from collections import deque

queue = deque()
queue.append(1)      # enqueue O(1)
queue.append(2)
front = queue.popleft()  # dequeue O(1) -> 1
front = queue[0]      # peek -> 2
len(queue) == 0      # isEmpty
```

---

## Next
[Linked Lists](../06-linked-lists/lesson.md) — Pointer manipulation, the foundation for many interview problems.