# 3.4 — Stacks

## Prerequisites
- [3.1 — Arrays](../01-arrays/lesson.md)
- [3.3 — Hash Maps & Sets](../03-hash-maps-and-sets/lesson.md)

## Section Outline (Detailed)

### 1. What Is a Stack?
- Definition: Last-In-First-Out (LIFO) data structure
- Real-world analogies: Stack of plates, browser history, undo functionality
- Why stacks matter for interviews: parsing, matching, expression evaluation

### 2. Operations and Complexity
| Operation | Description | Time |
|-----------|-------------|------|
| Push | Add to top | O(1) |
| Pop | Remove from top | O(1) |
| Peek/Top | View top element | O(1) |
| isEmpty | Check if empty | O(1) |

### 3. Implementation in JS/TS
- Use array: `push()` and `pop()` are O(1) at the end
- TypeScript interface: `class Stack<T> { push, pop, peek, isEmpty, size }`

### 4. Implementation in Python
- Use `list`: `append()` and `pop()` are O(1) at the end
- Or `collections.deque` for more efficient operations
- Python list methods: `append()`, `pop()`, `[-1]` for peek

### 5. Key Pattern: Matching Pairs
- **Valid Parentheses (LeetCode 20)**: The quintessential stack problem
- Push opening brackets, pop when closing bracket matches
- If mismatched or stack not empty at end, invalid
- Time: O(n), Space: O(n)

### 6. Key Pattern: Monotonic Stack (Introduction)
- Keep stack in increasing or decreasing order
- Used for "next greater/lesser element" problems
- **Next Greater Element (LeetCode 496)**: For each element, find next greater
- Walk through: push elements, pop while top < current, those popped have current as "next greater"

### 7. Key Pattern: Stack for Expression Evaluation
- **Basic Calculator**: Evaluate expressions like "3 + 2 * 2"
- **RPN Calculator (LeetCode 150)**: Evaluate Reverse Polish Notation
- Push operands, when operator, pop two operands, compute, push result

### 8. Worked Examples
Write full solutions for:
- LeetCode 20: Valid Parentheses (Easy)
- LeetCode 1047: Remove All Adjacent Duplicates In String (Easy)
- LeetCode 739: Daily Temperatures (Medium) - monotonic stack

### 9. Common Mistakes
- Popping from empty stack (check `isEmpty`)
- Forgetting to check if stack is empty at the end
- Confusing stack with queue (LIFO vs FIFO)
- Using shift/unshift on arrays (O(n) — wrong end!)

### 10. Practice Problems
- Warm-up: Reverse a string using a stack
- Warm-up: Check if parentheses are balanced
- LeetCode 20: Valid Parentheses
- LeetCode 1047: Remove All Adjacent Duplicates In String
- LeetCode 155: Min Stack (design problem)
- LeetCode 496: Next Greater Element I
- LeetCode 739: Daily Temperatures

---

## Code Examples to Include

**TypeScript Stack class:**
```typescript
class Stack<T> {
    private items: T[] = [];
    
    push(item: T): void {
        this.items.push(item);
    }
    
    pop(): T | undefined {
        return this.items.pop();
    }
    
    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }
    
    isEmpty(): boolean {
        return this.items.length === 0;
    }
    
    size(): number {
        return this.items.length;
    }
}
```

**Python (using list):**
```python
stack = []
stack.append(1)    # push
stack.append(2)
top = stack.pop()  # pop -> 2
top = stack[-1]    # peek -> 1
len(stack) == 0    # isEmpty
```

**Valid Parentheses Solution:**
```typescript
function isValid(s: string): boolean {
    const stack: string[] = [];
    const map: Record<string, string> = { ')': '(', '}': '{', ']': '[' };
    
    for (const c of s) {
        if (c in map) {
            // Closing bracket
            if (stack.pop() !== map[c]) return false;
        } else {
            // Opening bracket
            stack.push(c);
        }
    }
    
    return stack.length === 0;
}
```

---

## Next
[Queues](../05-queues/lesson.md) — FIFO data structure, essential for BFS.