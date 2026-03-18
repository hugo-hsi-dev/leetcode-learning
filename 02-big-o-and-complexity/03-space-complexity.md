# 2.3 — Space Complexity

## Prerequisites
- [2.1 — What is Big O?](01-what-is-big-o.md)
- [2.2 — Analyzing Loops](02-analyzing-loops.md)

## Learning Objectives
- Understand what counts as "extra space" in space complexity analysis
- Analyze the space complexity of solutions you write
- Understand the time-space tradeoff
- Know when to optimize for space vs. time

---

## What Space Complexity Measures

Space complexity measures **how much additional memory your algorithm uses** as the input grows.

The keyword is **additional**. The input itself doesn't count (usually). We're measuring the **extra** space your algorithm needs.

---

## What Counts as Extra Space

### Counts:
- **New arrays or lists** you create
- **Objects, Maps, Sets** you create
- **Strings** you build (strings are arrays of characters under the hood)
- **The recursion call stack** (each recursive call adds a frame — more on this in Section 4)
- **Any new data structure** you allocate

### Doesn't count:
- The input itself (unless the problem specifically says to measure total space)
- A fixed number of variables (counters, pointers, temp variables)
- The output (debatable — some problems count it, some don't; when in doubt, mention it)

---

## Common Space Complexities

### O(1) — Constant Space

You only use a fixed number of variables, no matter how large the input is.

**TypeScript:**
```typescript
function findMax(nums: number[]): number {
    let max = nums[0];        // one variable
    for (const num of nums) {
        if (num > max) {
            max = num;         // just updating one variable
        }
    }
    return max;
}
// Space: O(1) — only one extra variable (max), regardless of array size
```

**Python:**
```python
def find_max(nums: list[int]) -> int:
    max_val = nums[0]
    for num in nums:
        if num > max_val:
            max_val = num
    return max_val
# Space: O(1)
```

Using 1 variable, 5 variables, or 50 variables — it's all O(1), because the number doesn't depend on n.

### O(n) — Linear Space

You create a data structure that could grow proportionally to the input size.

**TypeScript:**
```typescript
function removeDuplicates(nums: number[]): number[] {
    const seen = new Set<number>();   // could hold up to n elements
    const result: number[] = [];      // could hold up to n elements
    
    for (const num of nums) {
        if (!seen.has(num)) {
            seen.add(num);
            result.push(num);
        }
    }
    return result;
}
// Space: O(n) — the Set and result array each hold up to n elements
```

**Python:**
```python
def remove_duplicates(nums: list[int]) -> list[int]:
    seen: set[int] = set()
    result: list[int] = []
    
    for num in nums:
        if num not in seen:
            seen.add(num)
            result.append(num)
    return result
# Space: O(n)
```

### O(n²) — Quadratic Space

You create a 2D structure (matrix/grid) proportional to n × n.

**TypeScript:**
```typescript
function createMatrix(n: number): number[][] {
    const matrix: number[][] = [];
    for (let i = 0; i < n; i++) {
        matrix.push(new Array(n).fill(0));  // n rows, each with n columns
    }
    return matrix;
}
// Space: O(n²) — an n × n grid
```

**Python:**
```python
def create_matrix(n: int) -> list[list[int]]:
    return [[0] * n for _ in range(n)]
# Space: O(n²)
```

---

## The Time-Space Tradeoff

Here's a fundamental principle in computer science:

> **You can often make a solution faster by using more memory, or use less memory by accepting a slower solution.**

This tradeoff appears constantly in interviews.

### Example: Checking for Duplicates

**Approach 1: No extra space → O(n²) time, O(1) space**

```typescript
function hasDuplicatesSlow(nums: number[]): boolean {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] === nums[j]) return true;
        }
    }
    return false;
}
```

```python
def has_duplicates_slow(nums: list[int]) -> bool:
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] == nums[j]:
                return True
    return False
```

We compare every pair. No extra memory needed, but it's slow.

**Approach 2: Use a Set → O(n) time, O(n) space**

```typescript
function hasDuplicatesFast(nums: number[]): boolean {
    const seen = new Set<number>();
    for (const num of nums) {
        if (seen.has(num)) return true;
        seen.add(num);
    }
    return false;
}
```

```python
def has_duplicates_fast(nums: list[int]) -> bool:
    seen: set[int] = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False
```

We use a Set to remember what we've seen. Much faster, but uses extra memory.

**The tradeoff:** We "spent" O(n) space to "buy" an improvement from O(n²) to O(n) time. This is almost always worth it, and interviewers expect you to make this trade.

### When is O(1) space preferred?

- When the problem explicitly asks for "in-place" modification
- When memory is constrained (rare in interviews, common in embedded systems)
- When the O(1) space solution isn't significantly slower

In interviews, **time complexity usually matters more than space complexity**. An O(n) time, O(n) space solution is almost always preferred over an O(n²) time, O(1) space solution.

---

## In-Place Algorithms

An "in-place" algorithm modifies the input directly instead of creating new data structures. These use O(1) extra space.

**Example: Reverse an array in-place**

**TypeScript:**
```typescript
function reverseInPlace(nums: number[]): void {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        // Swap elements
        const temp = nums[left];
        nums[left] = nums[right];
        nums[right] = temp;
        left++;
        right--;
    }
    // No return needed — we modified the input array
}
// Time: O(n), Space: O(1) — only uses two pointers and a temp variable
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

**vs. Creating a new reversed array:**

```typescript
function reverseNew(nums: number[]): number[] {
    return [...nums].reverse();  // creates a copy
}
// Time: O(n), Space: O(n) — the copy is new memory
```

```python
def reverse_new(nums: list[int]) -> list[int]:
    return nums[::-1]  # creates a new list
# Time: O(n), Space: O(n)
```

Both are O(n) time, but in-place uses O(1) space.

---

## Recursion and Space

Every recursive call adds a "frame" to the call stack. This counts as space.

**TypeScript:**
```typescript
function factorial(n: number): number {
    if (n <= 1) return 1;        // base case
    return n * factorial(n - 1);  // recursive case
}
// factorial(5) → factorial(4) → factorial(3) → factorial(2) → factorial(1)
// 5 frames on the call stack at maximum depth
// Space: O(n) — the call stack grows proportionally to n
```

**Python:**
```python
def factorial(n: int) -> int:
    if n <= 1:
        return 1
    return n * factorial(n - 1)
# Space: O(n) — same call stack reasoning
```

This is a preview — we'll cover recursion in depth in Section 4. Just know that recursion uses space even if you don't create any data structures.

---

## How to State Space Complexity in Interviews

When asked "what's the space complexity?", give a clear, concise answer:

**Good:**
> "This uses O(n) extra space because I'm creating a hash map that could store up to n entries."

> "This is O(1) space — I only use a fixed number of variables, regardless of input size."

> "The time is O(n) and the space is O(n). If we need O(1) space, I could sort the array first, but that would change the time to O(n log n)."

**Bad:**
> "I think the space is... some amount." (Too vague)

> "O(1) because I only have one loop." (Confusing time with space)

---

## Key Takeaways

1. **Space complexity measures extra memory** your algorithm allocates beyond the input.
2. **Fixed number of variables** → O(1). **Data structure that grows with n** → O(n).
3. **Time-space tradeoff:** You can usually make things faster by using more memory. In interviews, this is usually the right call.
4. **In-place algorithms** modify the input directly and use O(1) extra space.
5. **Recursion uses space** — the call stack counts. n recursive calls = O(n) space.
6. **State both time and space** in interviews: "This is O(n) time and O(n) space because..."

---

Next: [2.4 — Common Complexities Cheatsheet](04-common-complexities-cheatsheet.md)
