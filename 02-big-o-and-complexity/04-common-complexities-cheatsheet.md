# 2.4 — Common Complexities Cheatsheet

## Prerequisites
- [2.1 — What is Big O?](01-what-is-big-o.md)
- [2.2 — Analyzing Loops](02-analyzing-loops.md)
- [2.3 — Space Complexity](03-space-complexity.md)

## Learning Objectives
- Have a quick reference for common operations and their Big O
- Know which complexities are acceptable for given input sizes
- Understand why certain data structure choices matter

---

## Complexity Reference Table

| Complexity | Name | What it feels like | When you see it |
|-----------|------|-------------------|-----------------|
| O(1) | Constant | Instant | Hash map lookup, array access by index |
| O(log n) | Logarithmic | Very fast | Binary search, balanced tree operations |
| O(n) | Linear | Reasonable | Single loop, linear search |
| O(n log n) | Linearithmic | Acceptable | Efficient sorting (merge sort, quicksort, heap sort) |
| O(n²) | Quadratic | Slow for large n | Nested loops over same array |
| O(n³) | Cubic | Very slow | Triple nested loops |
| O(2ⁿ) | Exponential | Unusable for n > ~25 | Recursive brute force (check all subsets) |
| O(n!) | Factorial | Unusable for n > ~12 | Generate all permutations |

---

## Input Size vs. Acceptable Complexity

This table tells you what complexity your solution needs to pass.

| Max input size | Acceptable complexities | Typical approaches |
|----------------|------------------------|-------------------|
| n ≤ 10 | O(n!), O(2ⁿ), O(n³) | Brute force, backtracking is fine |
| n ≤ 20 | O(2ⁿ), O(n² × 2ⁿ) | Bitwise tricks, meet-in-the-middle |
| n ≤ 100 | O(n³), O(n⁴) | Triple nested loops sometimes OK |
| n ≤ 1,000 | O(n²) | Nested loops, DP |
| n ≤ 10,000 | O(n²) carefully | Nested loops might be tight |
| n ≤ 100,000 | O(n log n), O(n) | Sorting + something, hash maps |
| n ≤ 1,000,000 | O(n), O(n log n) | Single pass, careful algorithms |
| n ≤ 10,000,000+ | O(log n), O(n) | Binary search, math tricks, prefix sums |

**Note:** These are rules of thumb. LeetCode problems typically allow 1-2 seconds. A modern computer does ~10⁸ simple operations per second. Adjust based on constant factors (hash maps have higher constants than arrays).

---

## Data Structure Operation Complexities

### Arrays / Lists

| Operation | Complexity | Notes |
|-----------|------------|-------|
| Access by index | O(1) | `arr[5]` |
| Search for value | O(n) | Must scan |
| Insert at end | O(1) | `arr.push(x)` / `arr.append(x)` |
| Insert at beginning | O(n) | Must shift all elements |
| Insert in middle | O(n) | Must shift elements |
| Delete from end | O(1) | `arr.pop()` |
| Delete from beginning | O(n) | `arr.shift()` / `arr.pop(0)` |
| Delete from middle | O(n) | Must shift elements |

### Objects / Dictionaries / Hash Maps

| Operation | Average | Worst Case | Notes |
|-----------|---------|------------|-------|
| Lookup by key | O(1) | O(n) | Worst case if many hash collisions |
| Insert key-value | O(1) | O(n) | |
| Delete by key | O(1) | O(n) | |
| Has key? | O(1) | O(n) | `key in obj` / `map.has(key)` |
| Iterate all keys/values | O(n) | O(n) | |

**JavaScript:** `Map` and `Set` are hash maps. Plain objects `{}` are also hash maps but keys are strings/symbols only.

**Python:** `dict` and `set` are hash maps. `key in dict` is O(1) average.

### Sets

Same as hash maps — lookup, insert, delete are O(1) average.

| Operation | Complexity |
|-----------|------------|
| Add element | O(1) |
| Remove element | O(1) |
| Contains element | O(1) |
| Iterate all elements | O(n) |

### Strings (which are arrays of characters)

| Operation | Complexity | Notes |
|-----------|------------|-------|
| Access by index | O(1) | `str[5]` |
| Get length | O(1) | `str.length` / `len(str)` |
| Concatenate | O(n + m) | Creates new string of length n+m |
| Build from pieces | O(n²) if iterative | Use array + join in JS, `"".join()` in Python |
| Search substring | O(n × m) | `str.includes(sub)` naive; Python's `in` uses efficient algorithm |

**Best practice for building strings:**

```typescript
// Bad: O(n²)
let result = "";
for (const word of words) {
    result += word;  // each concat copies the entire string
}

// Good: O(n)
const result = words.join("");
```

```python
# Bad: O(n²)
result = ""
for word in words:
    result += word

# Good: O(n)
result = "".join(words)
```

---

## Sorting Complexities

| Algorithm | Time (average) | Time (worst) | Space | Stable? |
|-----------|---------------|--------------|-------|---------|
| Merge Sort | O(n log n) | O(n log n) | O(n) | Yes |
| Quick Sort | O(n log n) | O(n²) | O(log n) | No |
| Heap Sort | O(n log n) | O(n log n) | O(1) | No |
| Insertion Sort | O(n²) | O(n²) | O(1) | Yes |
| Built-in `sort()` | O(n log n) | O(n log n) | Varies | Varies |

**JavaScript `Array.prototype.sort()`:** Typical Timsort or quicksort variant, O(n log n) time, O(n) space.

**Python `list.sort()`:** Timsort, O(n log n) time, O(n) space, stable.

**Key insight:** If you sort an array as a preprocessing step, you add O(n log n) time. That's often acceptable, and opens up binary search, two-pointer techniques, etc.

---

## Common Problem Patterns and Their Complexities

| Problem Type | Brute Force | Optimized | Key Technique |
|--------------|-------------|-----------|----------------|
| Find pair with sum | O(n²) | O(n) | Hash map |
| Find element in array | O(n) | O(log n) | Binary search (if sorted) |
| Find duplicates | O(n²) | O(n) | Hash set |
| Two sum | O(n²) | O(n) | Hash map |
| Merge sorted arrays | O(n log n) | O(n) | Two pointers |
| Find k-th largest | O(n log n) | O(n) (avg) | Quickselect or heap |
| Check palindrome | O(n) | O(n) | Two pointers from ends |
| Longest substring without repeating | O(n³) or O(n²) | O(n) | Sliding window + set |
| Find cycle in linked list | O(n) space | O(1) space | Floyd's algorithm (fast/slow) |

---

## Quick Complexities for Common Code Patterns

### Array iteration patterns

```typescript
for (let i = 0; i < n; i++) { }                    // O(n)

for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) { }
}                                                   // O(n²)

for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) { }
}                                                   // O(n²) — still n², just n²/2

for (let i = 0; i < n; i++) { }                    // O(n)
for (let j = 0; j < n; j++) { }                    // O(n)
// Total: O(n) + O(n) = O(n), not O(n²)
```

### Halving patterns

```typescript
while (n > 0) {
    n = Math.floor(n / 2);
}                                                   // O(log n)

let i = 1;
while (i < n) {
    i *= 2;
}                                                   // O(log n)
```

### String building

```typescript
// Building a string character by character in a loop
let s = "";
for (let i = 0; i < n; i++) {
    s += char;
}                                                   // O(n²)

// Using array and join
const arr: string[] = [];
for (let i = 0; i < n; i++) {
    arr.push(char);
}
const s = arr.join("");                              // O(n)
```

---

## A Mental Checklist for Every Problem

When you've written a solution, ask yourself:

1. **What's n?** (array length? string length? both?)
2. **What's the time complexity?** Did I loop? Did I call something O(n) inside a loop?
3. **What's the space complexity?** Did I create any new arrays/objects? How big can they get?
4. **Is this good enough?** Check n vs. complexity — will it pass within O(n log n)? O(n)? Need O(n)?
5. **Can I do better?** Usually yes — the follow-up question.

---

Next: [Practice Exercises](practice/exercises.md)