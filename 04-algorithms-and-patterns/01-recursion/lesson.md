# 4.1 — Recursion

## Prerequisites
- All of Section 1 (Computational Thinking)
- All of Section 2 (Big O and Complexity)

## Section Outline (Detailed)

### 1. What Is Recursion?
- Definition: A function that calls itself
- Two components: Base case (stop condition) + Recursive case (call itself)
- Mental model: "Assume the recursive call works, trust it"
- Why recursion matters: Trees, graphs, divide & conquer, backtracking

### 2. The Anatomy of a Recursive Function
```
function recursive(input):
    if (base case):
        return known answer
    else:
        break input into smaller pieces
        recursive call(s) on smaller pieces
        combine results
        return combined result
```

### 3. The Call Stack
- Each recursive call adds a frame to the call stack
- Stack unwinds when base case is reached
- Maximum recursion depth = stack size
- Stack overflow: too deep recursion
- Space complexity = O(depth) for recursion

### 4. Key Pattern: Linear Recursion
- One recursive call per invocation
- Examples: Factorial, summation, Fibonacci
- **Factorial**: `n! = n * (n-1)!`, base: `0! = 1`

### 5. Key Pattern: Tree Recursion
- Multiple recursive calls per invocation
- Examples: Fibonacci (naive), tree traversal
- **Fibonacci**: `fib(n) = fib(n-1) + fib(n-2)`
- Warning: Naive tree recursion can be exponential! Use memoization.

### 6. Key Pattern: Divide and Conquer
- Split problem into independent subproblems
- Solve each recursively
- Combine results
- Examples: Merge sort, quick sort, binary search

### 7. Recursion vs. Iteration
- Every recursion can be written iteratively
- Recursion is often clearer for tree/graph problems
- Iteration is more memory-efficient (no call stack)
- Convert with explicit stack

### 8. Memoization
- Cache results of expensive recursive calls
- Transform exponential → polynomial time
- **Fibonacci with memo**: O(2ⁿ) → O(n)
- Python: `@lru_cache` decorator
- JavaScript: Map or object for cache

### 9. Worked Examples
Write full solutions for:
- Factorial (simple)
- Fibonacci (naive, then memoized)
- Power function (x^n) — handle negative exponents
- Sum of array (recursive)
- Reverse string (recursive)
- LeetCode 509: Fibonacci Number

### 10. Common Mistakes
- Missing base case → infinite recursion → stack overflow
- Wrong base case → wrong answer
- Not progressing toward base case → infinite loop
- Redundant calculations → exponential time
- Confusing the return value

### 11. Practice Problems
- Warm-up: Write factorial recursively
- Warm-up: Write sum of array recursively
- LeetCode 509: Fibonacci Number
- LeetCode 206: Reverse Linked List (recursive)
- LeetCode 70: Climbing Stairs (same as Fibonacci)
- LeetCode 50: Pow(x, n)

---

## Code Examples to Include

**Factorial:**
```typescript
function factorial(n: number): number {
    if (n === 0) return 1;  // Base case
    return n * factorial(n - 1);  // Recursive case
}
```

**Fibonacci (Naive):**
```python
def fib(n: int) -> int:
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)  # O(2^n)!
```

**Fibonacci (Memoized):**
```python
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n: int) -> int:
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)  # O(n)
```

**Power Function:**
```typescript
function myPow(x: number, n: number): number {
    if (n === 0) return 1;
    if (n < 0) return 1 / myPow(x, -n);
    
    const half = myPow(x, Math.floor(n / 2));
    if (n % 2 === 0) {
        return half * half;
    } else {
        return half * half * x;
    }
}
// O(log n) due to dividing problem size by 2
```

---

## Next
[Sorting](../02-sorting/lesson.md) — Why sorting matters and merge sort conceptual understanding.