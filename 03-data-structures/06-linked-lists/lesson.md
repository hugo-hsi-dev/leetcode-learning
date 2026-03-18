# 3.6 — Linked Lists

## Prerequisites
- [3.1 — Arrays](../01-arrays/lesson.md)
- [3.4 — Stacks](../04-stacks/lesson.md)

## Section Outline (Detailed)

### 1. What Is a Linked List?
- Definition: A chain of nodes, each containing data and a pointer to the next node
- Comparison to arrays: No random access, but O(1) insert/delete at known position
- Single linked list vs. doubly linked list
- Why linked lists matter: Foundation for trees, graphs, hash map chaining

### 2. Node Structure
- TypeScript: `class ListNode { val: number; next: ListNode | null; }`
- Python: `class ListNode: def __init__(self, val=0, next=None): ...`
- Visualization: `1 -> 2 -> 3 -> null`
- Null terminator marks end

### 3. Operations and Complexity
| Operation | Array | Linked List |
|-----------|-------|-------------|
| Access by index | O(1) | O(n) |
| Insert at beginning | O(n) | O(1) |
| Insert at end | O(1)* | O(n) |
| Insert at position | O(n) | O(1)** |
| Delete at position | O(n) | O(1)** |

*Amortized. **If you have a pointer to the position.

### 4. Key Pattern: Traversal
- Start at head, follow `next` until `null`
- While loop: `while (curr !== null) { curr = curr.next; }`
- For loop: `for (let curr = head; curr !== null; curr = curr.next) { }`

### 5. Key Pattern: Two Pointers
- **Fast-slow pointers**: Fast moves 2 steps, slow moves 1 step
- Used for: cycle detection, finding middle
- **Find middle:** Slow ends at middle
- **Detect cycle:** If fast and slow meet, there's a cycle

### 6. Key Pattern: Dummy Head
- Create a fake head node to simplify edge cases
- Useful when you might need to modify the head
- At end, return `dummy.next`

### 7. Key Pattern: Reversal
- Reverse a linked list in-place
- Three pointers: `prev`, `curr`, `next`
- **LeetCode 206: Reverse Linked List**

### 8. Key Pattern: Merging
- **Merge Two Sorted Lists (LeetCode 21)**
- Use two pointers, compare, link smaller
- Dummy head pattern is essential here

### 9. Worked Examples
Write full solutions for:
- LeetCode 206: Reverse Linked List (Essential)
- LeetCode 21: Merge Two Sorted Lists (Essential)
- LeetCode 141: Linked List Cycle (Fast-slow pointers)
- LeetCode 876: Middle of Linked List (Fast-slow pointers)
- LeetCode 19: Remove Nth Node From End (Two passes)

### 10. Common Mistakes
- Losing the head pointer (use dummy head or save reference)
- Not handling `null` / `None` properly
- Forgetting to handle empty list (head is null)
- Not updating `next` pointers correctly in reversal
- Off-by-one in "n-th from end" problems

### 11. Practice Problems
- Warm-up: Create linked list from array
- Warm-up: Print linked list values
- LeetCode 206: Reverse Linked List
- LeetCode 21: Merge Two Sorted Lists
- LeetCode 141: Linked List Cycle
- LeetCode 876: Middle of Linked List
- LeetCode 237: Delete Node in a Linked List
- LeetCode 19: Remove Nth Node From End of List
- LeetCode 143: Reorder List (Medium)

---

## Code Examples to Include

**TypeScript Node Definition:**
```typescript
class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}
```

**Python Node Definition:**
```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
```

**Reverse Linked List:**
```typescript
function reverseList(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null;
    let curr: ListNode | null = head;
    
    while (curr !== null) {
        const next = curr.next;  // Save next
        curr.next = prev;        // Reverse link
        prev = curr;             // Move prev forward
        curr = next;             // Move curr forward
    }
    
    return prev;  // New head
}
```

**Fast-Slow Cycle Detection:**
```python
def has_cycle(head: ListNode) -> bool:
    if not head or not head.next:
        return False
    
    slow, fast = head, head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    
    return False
```

---

## Next
[Trees](../07-trees/lesson.md) — Binary trees, BSTs, and recursive traversal.