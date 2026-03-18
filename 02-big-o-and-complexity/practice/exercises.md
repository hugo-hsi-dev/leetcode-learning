# Section 2 — Practice Exercises

These exercises test your ability to analyze time and space complexity. No coding required — all analysis.

---

## Exercise 1: Basic Loop Analysis [Warm-up]

For each code snippet, determine the **time complexity**.

### Snippet A
```typescript
function snippetA(n: number): number {
    let sum = 0;
    for (let i = 0; i < n; i++) {
        sum += i;
    }
    return sum;
}
```

### Snippet B
```typescript
function snippetB(n: number): number {
    let sum = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            sum += i * j;
        }
    }
    return sum;
}
```

### Snippet C
```typescript
function snippetC(n: number): number {
    let sum = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            for (let k = 0; k < n; k++) {
                sum += i * j * k;
            }
        }
    }
    return sum;
}
```

### Snippet D
```typescript
function snippetD(n: number): number {
    let sum = 0;
    for (let i = 1; i < n; i *= 2) {
        sum += i;
    }
    return sum;
}
```

<details>
<summary>Answers</summary>

**A:** O(n) — single loop, runs n times.

**B:** O(n²) — nested loops, both over n. n × n = n².

**C:** O(n³) — triple nested loops. n × n × n = n³.

**D:** O(log n) — the loop variable doubles each time: 1, 2, 4, 8, 16, ... This reaches n in log₂(n) steps.

</details>

---

## Exercise 2: Sequential vs. Nested [Warm-up]

Determine the time complexity for each.

### Snippet A: Sequential loops
```typescript
function sequential(n: number): number {
    let sum = 0;
    for (let i = 0; i < n; i++) {
        sum += i;
    }
    for (let j = 0; j < n; j++) {
        sum += j * 2;
    }
    return sum;
}
```

### Snippet B: Nested loops
```typescript
function nested(n: number): number {
    let sum = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            sum += i + j;
        }
    }
    return sum;
}
```

### Snippet C: Combination
```typescript
function combo(n: number): number {
    // Loop 1
    for (let i = 0; i < n; i++) {
        console.log(i);
    }
    // Loop 2
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            console.log(i, j);
        }
    }
}
```

<details>
<summary>Answers</summary>

**A:** O(n). Two sequential O(n) loops. O(n) + O(n) = O(2n) = O(n).

**B:** O(n²). One nested loop structure. n × n = n².

**C:** O(n²). Loop 1 is O(n), Loop 2 is O(n²). O(n) + O(n²) = O(n²) — the dominant term wins.

</details>

---

## Exercise 3: Halving and Doubling [Easy]

### Snippet A
```typescript
function halvingSum(n: number): number {
    let sum = 0;
    let i = n;
    while (i > 0) {
        sum += i;
        i = Math.floor(i / 2);
    }
    return sum;
}
```

### Snippet B
```typescript
function doublingLoop(n: number): void {
    let i = 1;
    while (i < n) {
        console.log(i);
        i *= 3;
    }
}
```

### Snippet C
```typescript
function logNLoop(n: number): void {
    for (let i = 0; i < n; i++) {
        let j = n;
        while (j > 0) {
            console.log(i, j);
            j = Math.floor(j / 2);
        }
    }
}
```

<details>
<summary>Answers</summary>

**A:** O(log n). The while loop halves i each iteration. The number of iterations is roughly log₂(n).

**B:** O(log n). i triples each time: 1, 3, 9, 27, 81, ... This reaches n in log₃(n) steps. Different base, still O(log n).

**C:** O(n log n). The outer for loop runs n times. Inside, the while loop runs log(n) times (halving). Total: n × log(n).

</details>

---

## Exercise 4: Hidden Complexity [Easy]

Analyze these carefully — there are hidden costs.

### Snippet A
```typescript
function findDuplicates(arr: number[]): boolean {
    for (let i = 0; i < arr.length; i++) {
        if (arr.indexOf(arr[i], i + 1) !== -1) {
            return true;
        }
    }
    return false;
}
```

### Snippet B
```typescript
function buildResult(n: number): string {
    let result = "";
    for (let i = 0; i < n; i++) {
        result += "x";
    }
    return result;
}
```

### Snippet C
```typescript
function containsValue(arr: number[], target: number): boolean {
    return arr.includes(target);
}

function checkAll(arrays: number[][], target: number): boolean {
    for (const arr of arrays) {
        if (containsValue(arr, target)) {
            return true;
        }
    }
    return false;
}
// Assume 'arrays' has m arrays, each of length n
```

<details>
<summary>Answers</summary>

**A:** O(n²). The outer loop runs n times. Inside, `indexOf` searches linearly from position i+1, which is O(n) in the worst case. So it's n × n = O(n²).

**B:** O(n²). String concatenation creates a new string each time: "x" + "" = "x" (length 1), then "x" + "x" = "xx" (length 2), etc. The total work is 1 + 2 + 3 + ... + n = n(n+1)/2 ≈ O(n²). To fix: use an array and `.join("")`.

**C:** O(m × n). `containsValue` is O(n) for each array (linear search). The outer loop calls it m times. Total: m × O(n) = O(m × n). If m = n, that's O(n²).

</details>

---

## Exercise 5: Space Complexity [Easy]

For each snippet, determine the **space complexity**.

### Snippet A
```typescript
function sumArray(nums: number[]): number {
    let sum = 0;
    for (const num of nums) {
        sum += num;
    }
    return sum;
}
```

### Snippet B
```typescript
function copyArray(nums: number[]): number[] {
    const copy: number[] = [];
    for (const num of nums) {
        copy.push(num);
    }
    return copy;
}
```

### Snippet C
```typescript
function createPairs(n: number): number[][] {
    const pairs: number[][] = [];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            pairs.push([i, j]);
        }
    }
    return pairs;
}
```

### Snippet D
```typescript
function fibonacci(n: number): number {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
```

<details>
<summary>Answers</summary>

**A:** O(1) space. Only one variable (`sum`) is used, regardless of input size.

**B:** O(n) space. The `copy` array can hold up to n elements.

**C:** O(n²) space. We're creating n² pairs (i, j), each stored as a small array.

**D:** O(n) space due to the call stack. At maximum depth, we have n recursive calls waiting — the call stack grows to n frames. This is tricky: we're not creating any data structures explicitly, but recursion uses memory!

</details>

---

## Exercise 6: Best vs. Worst Case [Medium]

For each, what's the **best case** and **worst case** time complexity?

### Snippet A: Linear search
```typescript
function linearSearch(arr: number[], target: number): number {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
    }
    return -1;
}
```

### Snippet B: Find minimum
```typescript
function findMin(arr: number[]): number {
    let min = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
        }
    }
    return min;
}
```

### Snippet C: Check if sorted
```typescript
function isSorted(arr: number[]): boolean {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false;
        }
    }
    return true;
}
```

<details>
<summary>Answers</summary>

**A:** Linear search
- Best case: O(1) — target is at index 0
- Worst case: O(n) — target is at the last index, or not present

**B:** Find minimum
- Best case: O(n) — must check every element even if the first is smallest
- Worst case: O(n) — same, must check every element
- There's no early exit; we always visit all elements

**C:** Check if sorted
- Best case: O(1) — first pair is out of order (e.g., [5, 1, 2, 3])
- Worst case: O(n) — array is sorted or the problem is at the last position

</details>

---

## Exercise 7: Match Complexity to Approach [Medium]

You're given `n` numbers. Match each approach to its time complexity.

Approaches:
1. Check every pair to find if any two sum to target
2. Sort, then use binary search for each element's complement
3. Use a hash map to store seen elements, check complement
4. Sort once, then use two pointers from both ends

Complexities (unsorted):
- A: O(n)
- B: O(n log n)
- C: O(n²)
- D: O(n log n) for sorting + O(n) for search = O(n log n) overall

Which complexity goes with which approach?

<details>
<summary>Answers</summary>

1. **Check every pair** → **C: O(n²)**
   - Two nested loops, checking all n(n-1)/2 pairs
   
2. **Sort + binary search** → **D: O(n log n)**
   - Sort: O(n log n). Then for each of n elements, binary search: O(log n). Total: O(n log n) + n × O(log n) = O(n log n)
   
3. **Hash map approach** → **A: O(n)**
   - Single pass, hash map lookup is O(1) average
   
4. **Sort + two pointers** → **B: O(n log n)**
   - Sort: O(n log n). Two pointers: O(n). Total: O(n log n)

Note: Approaches 2 and 4 have the same overall complexity, but two-pointers after sorting is often cleaner than binary search for each element.

</details>

---

## Exercise 8: Full Analysis [Medium]

Analyze this function completely.

```typescript
function analyzeMe(nums: number[]): number[] {
    const result: number[] = [];
    const seen = new Map<number, number>();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = 100 - nums[i];
        if (seen.has(complement)) {
            result.push(seen.get(complement)!);
            result.push(i);
        }
        seen.set(nums[i], i);
    }
    
    return result;
}
```

Questions:
1. What does this function do? (Describe in plain English)
2. What is the time complexity? Explain your reasoning.
3. What is the space complexity? Explain your reasoning.
4. Could we do better? Why or why not?

<details>
<summary>Answers</summary>

1. **What it does:** Finds pairs of indices where the values sum to 100. For each such pair found, it adds both indices to the result array. It returns all such pairs in a flattened array.

2. **Time complexity: O(n)**
   - Single for loop: O(n)
   - Map operations (`has`, `get`, `set`): O(1) average
   - `result.push`: O(1) amortized
   - Total: O(n)

3. **Space complexity: O(n)**
   - `result` could hold up to n elements in the worst case (if every pair sums to 100)
   - `seen` map could hold up to n entries
   - Total: O(n)

4. **Can we do better?**
   - Time: O(n) is optimal. We must at least look at every element once. Can't do better than O(n) for an unsorted array where we're searching for pairs.
   - Space: O(n) is required for the hash map approach. We could theoretically sort and use two pointers for O(1) extra space, but that changes time to O(n log n). This is a time-space tradeoff.

</details>

---

## Exercise 9: Input Size Estimation [Easy]

For each maximum input size from the constraints, what's the worst acceptable complexity?

| Max n | Acceptable complexities |
|-------|------------------------|
| n ≤ 20 | ? |
| n ≤ 100 | ? |
| n ≤ 1,000 | ? |
| n ≤ 10,000 | ? |
| n ≤ 100,000 | ? |
| n ≤ 10⁶ | ? |

<details>
<summary>Answers</summary>

| Max n | Acceptable complexities |
|-------|------------------------|
| n ≤ 20 | O(2ⁿ), O(n³), O(n⁴) — brute force is fine |
| n ≤ 100 | O(n³), O(n⁴) — triple nested loops OK |
| n ≤ 1,000 | O(n²) — nested loops work |
| n ≤ 10,000 | O(n²) carefully, or O(n log n) |
| n ≤ 100,000 | O(n log n), O(n) — need efficient algorithm |
| n ≤ 10⁶ | O(n), O(n log n) — very efficient required |

</details>

---

## What's Next?

If you can analyze complexity accurately, move on to:
→ [Section 3: Data Structures — Arrays](../../03-data-structures/01-arrays/lesson.md)

If Exercises 4-8 felt difficult, re-read lessons 2.2 and 2.3. The ability to analyze complexity is foundational for every section that follows.