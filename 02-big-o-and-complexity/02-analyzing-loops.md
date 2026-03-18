# 2.2 — Analyzing Loops

## Prerequisites
- [2.1 — What is Big O?](01-what-is-big-o.md)

## Learning Objectives
- Determine time complexity by looking at loop structures
- Analyze single loops, nested loops, sequential loops, and halving loops
- Recognize O(log n) patterns
- Analyze code containing function calls

---

## The Basic Rule

**Count how many times the innermost operation runs as a function of n.**

That's it. Everything below is just pattern-matching this rule to different loop structures.

---

## Pattern 1: Single Loop — O(n)

A loop that runs from 0 to n (or n to 0, or over every element) is O(n).

**TypeScript:**
```typescript
function sumArray(nums: number[]): number {
    let total = 0;
    for (let i = 0; i < nums.length; i++) {  // runs n times
        total += nums[i];                      // O(1) work per iteration
    }
    return total;
}
// Total: n × O(1) = O(n)
```

**Python:**
```python
def sum_array(nums: list[int]) -> int:
    total = 0
    for num in nums:    # runs n times
        total += num    # O(1) work per iteration
    return total
# Total: n × O(1) = O(n)
```

**The `for...of` / `for...in` loops are also O(n):**
```typescript
for (const num of nums) { }     // O(n) — iterates every element
for (const key in obj) { }      // O(n) — iterates every key
```
```python
for num in nums:        # O(n)
for key in obj:         # O(n)
```

---

## Pattern 2: Nested Loops — O(n²)

A loop inside a loop, where both loop over n, gives n × n = n² operations.

**TypeScript:**
```typescript
function allPairs(nums: number[]): void {
    for (let i = 0; i < nums.length; i++) {         // runs n times
        for (let j = 0; j < nums.length; j++) {     // runs n times for EACH i
            console.log(nums[i], nums[j]);            // O(1) work
        }
    }
}
// Total: n × n × O(1) = O(n²)
```

**Python:**
```python
def all_pairs(nums: list[int]) -> None:
    for i in range(len(nums)):           # runs n times
        for j in range(len(nums)):       # runs n times for EACH i
            print(nums[i], nums[j])      # O(1) work
# Total: n × n × O(1) = O(n²)
```

### Common variation: inner loop starts at i + 1

```typescript
for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
        // ...
    }
}
```

This runs: (n-1) + (n-2) + ... + 1 + 0 = n(n-1)/2 times.

That's n²/2 - n/2. Dropping constants and lower-order terms: **still O(n²)**.

Even though it's roughly half the work of the full nested loop, the growth rate is the same.

### Triple nested loops = O(n³)

```typescript
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        for (let k = 0; k < n; k++) {
            // O(1) work
        }
    }
}
// Total: O(n³)
```

Each additional nesting level multiplies by another n.

---

## Pattern 3: Sequential Loops — O(n)

Loops that run **one after another** (not nested) are added, not multiplied.

**TypeScript:**
```typescript
function processArray(nums: number[]): void {
    // Loop 1: O(n)
    for (let i = 0; i < nums.length; i++) {
        console.log(nums[i]);
    }
    
    // Loop 2: O(n)
    for (let j = 0; j < nums.length; j++) {
        console.log(nums[j] * 2);
    }
}
// Total: O(n) + O(n) = O(2n) = O(n)
```

**Python:**
```python
def process_array(nums: list[int]) -> None:
    # Loop 1: O(n)
    for num in nums:
        print(num)
    
    # Loop 2: O(n)
    for num in nums:
        print(num * 2)
# Total: O(n) + O(n) = O(2n) = O(n)
```

Even 10 sequential O(n) loops is still O(n). Constants don't matter.

**But:** An O(n) loop followed by an O(n²) loop is O(n²) (the dominant term wins).

---

## Pattern 4: Halving Loops — O(log n)

A loop that **halves** the remaining work each iteration is O(log n).

**TypeScript:**
```typescript
function halvingLoop(n: number): void {
    let i = n;
    while (i > 0) {
        console.log(i);
        i = Math.floor(i / 2);   // halves each time
    }
}
// n=16: i goes 16, 8, 4, 2, 1, 0 → 5 iterations
// n=32: i goes 32, 16, 8, 4, 2, 1, 0 → 6 iterations
// n=64: 7 iterations
// Pattern: log₂(n) iterations → O(log n)
```

**Python:**
```python
def halving_loop(n: int) -> None:
    i = n
    while i > 0:
        print(i)
        i //= 2    # integer division by 2
# Same analysis: O(log n)
```

> **Why log₂?** If you start with n and halve repeatedly, you can halve log₂(n) times before reaching 1. log₂(1,000,000) ≈ 20. That's why O(log n) is so fast — a million elements only takes ~20 steps.
>
> In Big O, we write O(log n) without specifying the base, because log bases differ by only a constant factor (and we drop constants).

### Doubling loops are also O(log n):

```typescript
let i = 1;
while (i < n) {
    i *= 2;   // doubles each time
}
// Also O(log n) — doubling to reach n takes log₂(n) steps
```

---

## Pattern 5: Loop Inside a Halving Loop — O(n log n)

This pattern often appears in sorting algorithms (merge sort, quicksort):

```typescript
function nLogNExample(nums: number[]): void {
    let size = nums.length;
    while (size > 0) {                          // runs log(n) times
        for (let i = 0; i < nums.length; i++) { // runs n times each
            // O(1) work
        }
        size = Math.floor(size / 2);
    }
}
// Total: log(n) × n = O(n log n)
```

You don't need to memorize this pattern — just know that **O(n log n) appears when you process all n elements at each "level" of a halving/doubling structure.**

---

## Analyzing Code with Function Calls

When your loop calls a function, you need to know the complexity of that function.

**TypeScript:**
```typescript
function contains(arr: number[], target: number): boolean {
    for (const num of arr) {       // O(n)
        if (num === target) return true;
    }
    return false;
}

function findCommon(arr1: number[], arr2: number[]): number[] {
    const result: number[] = [];
    for (const num of arr1) {            // O(n) — loops through arr1
        if (contains(arr2, num)) {       // O(m) — contains loops through arr2
            result.push(num);
        }
    }
    return result;
}
// Total: O(n × m), or O(n²) if both arrays are the same size
```

**Python:**
```python
def contains(arr: list[int], target: int) -> bool:
    for num in arr:       # O(n)
        if num == target:
            return True
    return False

def find_common(arr1: list[int], arr2: list[int]) -> list[int]:
    result = []
    for num in arr1:                  # O(n)
        if contains(arr2, num):       # O(m) each call
            result.append(num)
    return result
# Total: O(n × m)
```

> **Python shortcut:** `if num in arr2` does the same thing as `contains(arr2, num)` — but it's still O(m)! The `in` operator on a list does a linear scan. To get O(1) lookup, use a `set`.

**Key insight:** If a function called inside a loop is O(n), the total isn't O(n) — it's O(n × n) = O(n²). You must look at what the function **does**, not just that it's "one line."

---

## Built-in Method Complexities (JS/Python)

Watch out for built-in methods that aren't O(1):

| Operation | JS | Python | Complexity |
|-----------|-----|--------|-----------|
| Array access by index | `arr[i]` | `arr[i]` | O(1) |
| Array push/pop (end) | `arr.push()` / `arr.pop()` | `arr.append()` / `arr.pop()` | O(1) |
| Array unshift/shift (beginning) | `arr.unshift()` / `arr.shift()` | `arr.insert(0, x)` / `arr.pop(0)` | **O(n)** |
| Array includes/indexOf | `arr.includes(x)` | `x in arr` (list) | **O(n)** |
| Array slice | `arr.slice()` | `arr[:]` | **O(n)** |
| Array sort | `arr.sort()` | `arr.sort()` | **O(n log n)** |
| Object/dict access | `obj[key]` | `d[key]` | O(1) |
| Map/Set has/in | `map.has(key)` | `key in set` | O(1) |
| String concatenation | `str + str` | `str + str` | **O(n)** |

The dangerous ones are `shift`/`unshift` (O(n) because every element must be moved) and `includes`/`indexOf` (O(n) because it's a linear search).

If you use `arr.includes(x)` inside a loop over `arr`, you've accidentally written O(n²).

---

## Practice: Analyze These Snippets

Try to determine the time complexity of each before checking the answer.

### Snippet 1
```typescript
function snippet1(n: number): number {
    let sum = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < 100; j++) {
            sum += i + j;
        }
    }
    return sum;
}
```

<details>
<summary>Answer</summary>

**O(n).** The inner loop always runs exactly 100 times — it doesn't depend on n. So it's n × 100 = O(100n) = O(n). The constant 100 is dropped.

</details>

### Snippet 2
```typescript
function snippet2(n: number): number {
    let count = 0;
    for (let i = 1; i < n; i *= 2) {
        for (let j = 0; j < n; j++) {
            count++;
        }
    }
    return count;
}
```

<details>
<summary>Answer</summary>

**O(n log n).** The outer loop doubles i each time → runs log(n) times. The inner loop runs n times for each outer iteration. Total: n × log(n) = O(n log n).

</details>

### Snippet 3
```typescript
function snippet3(arr: number[]): number {
    let max = arr[0];
    let min = arr[0];
    for (const num of arr) {
        if (num > max) max = num;
        if (num < min) min = num;
    }
    return max - min;
}
```

<details>
<summary>Answer</summary>

**O(n).** Single loop over the array, O(1) work per iteration.

</details>

### Snippet 4
```typescript
function snippet4(arr: string[]): string[] {
    const result: string[] = [];
    for (const str of arr) {
        if (!result.includes(str)) {
            result.push(str);
        }
    }
    return result;
}
```

<details>
<summary>Answer</summary>

**O(n²).** The outer loop runs n times. `result.includes(str)` is O(n) in the worst case (when result has up to n elements). So: n × n = O(n²).

This is a common trap! Using `includes` inside a loop creates hidden quadratic behavior. A Set would make this O(n).

</details>

### Snippet 5
```python
def snippet5(n: int) -> int:
    count = 0
    i = n
    while i > 1:
        j = 0
        while j < i:
            count += 1
            j += 1
        i //= 2
    return count
```

<details>
<summary>Answer</summary>

**O(n).** This is tricky! The outer loop runs log(n) times (halving). But the inner loop runs i times, and i changes: n + n/2 + n/4 + n/8 + ... = 2n (geometric series). So total work is O(2n) = O(n).

</details>

---

## Key Takeaways

1. **Single loop over n** → O(n)
2. **Nested loops, both over n** → O(n²)
3. **Sequential loops** → add them (dominant term wins)
4. **Halving/doubling loop** → O(log n)
5. **Look inside function calls** — a "one-liner" can be O(n) internally
6. **Watch out for built-in methods** that are secretly O(n) — especially `includes`, `indexOf`, `shift`, and string concatenation

---

Next: [2.3 — Space Complexity](03-space-complexity.md)
