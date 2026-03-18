# Section 1 — Practice Exercises

These exercises test the skills from lessons 1.1 through 1.4. No code required — these are all about thinking, reading, and planning.

---

## Exercise 1: Read and Restate [Warm-up]

Read the following problem statement and answer the questions below it.

> **Given an array of integers `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.**
>
> **Example 1:** Input: nums = [1,2,3,1] → Output: true
> **Example 2:** Input: nums = [1,2,3,4] → Output: false
> **Example 3:** Input: nums = [1,1,1,3,3,4,3,2,4,2] → Output: true
>
> **Constraints:**
> - 1 <= nums.length <= 10^5
> - -10^9 <= nums[i] <= 10^9

**Questions:**
1. What is the input type?
2. What is the output type?
3. Restate the problem in one sentence, in your own words.
4. Can the array be empty? (Look at the constraints.)
5. Can the numbers be negative?
6. What edge cases should you consider? List at least 3.

<details>
<summary>Answers</summary>

1. An array of integers.
2. A boolean (true/false).
3. "Check if the array has any duplicate numbers."
4. No — the minimum length is 1.
5. Yes — nums[i] can be as low as -10^9.
6. Edge cases: (a) array with one element (always false), (b) array with two identical elements [5,5] (true), (c) array where all elements are the same [3,3,3,3] (true), (d) array with all unique elements (false), (e) array with negative numbers [-1, -1] (true), (f) very large array (10^5 elements — solution must be efficient).

</details>

---

## Exercise 2: Write Pseudocode [Warm-up]

**Problem:** Given an array of integers, return the sum of all even numbers.

Example: `[1, 2, 3, 4, 5, 6]` → `12` (because 2 + 4 + 6 = 12)

**Task:**
1. Restate the problem in your own words
2. Describe your approach in one sentence
3. Write pseudocode (do NOT write actual code)
4. List edge cases

<details>
<summary>Sample Answer</summary>

1. "Go through the array and add up every number that's divisible by 2."

2. "I'll loop through the array, check if each number is even, and add it to a running total."

3. Pseudocode:
```
FUNCTION sumOfEvens(array):
    SET total to 0
    FOR each number in array:
        IF number is even (divisible by 2 with no remainder):
            ADD number to total
    RETURN total
```

4. Edge cases:
   - Empty array → return 0
   - No even numbers → return 0
   - All even numbers → return sum of all
   - Negative even numbers (-4, -2) → should still be included
   - Zero → 0 is even, should be included

</details>

---

## Exercise 3: Trace Through Code [Warm-up]

Trace through this code with the given input. Fill in the table.

**TypeScript:**
```typescript
function mystery(nums: number[]): number {
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 0) {
            count++;
        }
    }
    return count;
}
```

**Python equivalent:**
```python
def mystery(nums: list[int]) -> int:
    count = 0
    for i in range(len(nums)):
        if nums[i] > 0:
            count += 1
    return count
```

**Input:** `nums = [-1, 3, 0, 5, -2, 8]`

Fill in this table:

| Step | i | nums[i] | nums[i] > 0? | count |
|------|---|---------|---------------|-------|
| init | — | — | — | ? |
| 1 | 0 | ? | ? | ? |
| 2 | 1 | ? | ? | ? |
| 3 | 2 | ? | ? | ? |
| 4 | 3 | ? | ? | ? |
| 5 | 4 | ? | ? | ? |
| 6 | 5 | ? | ? | ? |

**Return value:** ?
**What does this function do?** (Describe in plain English)

<details>
<summary>Answer</summary>

| Step | i | nums[i] | nums[i] > 0? | count |
|------|---|---------|---------------|-------|
| init | — | — | — | 0 |
| 1 | 0 | -1 | no | 0 |
| 2 | 1 | 3 | yes | 1 |
| 3 | 2 | 0 | no | 1 |
| 4 | 3 | 5 | yes | 2 |
| 5 | 4 | -2 | no | 2 |
| 6 | 5 | 8 | yes | 3 |

**Return value:** 3

**What it does:** Counts how many positive numbers (greater than zero) are in the array. Note: zero is NOT counted as positive.

</details>

---

## Exercise 4: Find the Bug [Easy]

This code is supposed to find the index of the minimum element in an array. It has a bug. Trace through it with the given input to find the bug, then explain the fix.

**TypeScript:**
```typescript
function findMinIndex(nums: number[]): number {
    let minIndex = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] < nums[minIndex]) {
            minIndex = i;
        }
    }
    return minIndex;
}
```

**Input:** `nums = [3, 1, 4, 1, 5]`

**Questions:**
1. Trace through the code. Does it return the correct answer?
2. Now try with `nums = []` (empty array). What happens?
3. Now try with `nums = [5]`. What happens?
4. Is there actually a bug? Or is the code correct and I tricked you?

<details>
<summary>Answer</summary>

1. Trace with `[3, 1, 4, 1, 5]`:
   - i=0: nums[0]=3 < nums[0]=3? No. minIndex=0
   - i=1: nums[1]=1 < nums[0]=3? Yes. minIndex=1
   - i=2: nums[2]=4 < nums[1]=1? No. minIndex=1
   - i=3: nums[3]=1 < nums[1]=1? No. minIndex=1
   - i=4: nums[4]=5 < nums[1]=1? No. minIndex=1
   - Returns 1. Correct!

2. With `[]`: The loop doesn't execute. Returns 0. But `nums[0]` doesn't exist — returning index 0 for an empty array is misleading. This is an edge case bug — we should handle empty arrays (return -1 or throw).

3. With `[5]`: Loop runs once (i=0), condition is false (5 < 5 is false). Returns 0. Correct.

4. The code works for normal cases, but has an edge case issue with empty arrays. Whether this is a "bug" depends on whether the problem guarantees non-empty input (check the constraints!). This exercise demonstrates that tracing with edge cases is just as important as tracing with normal inputs.

</details>

---

## Exercise 5: Edge Case Identification [Easy]

For each of the following problem descriptions, list at least 5 edge cases you would test.

### Problem A: Reverse a String
"Given a string, return the string reversed."

### Problem B: Find the Second Largest Element
"Given an array of integers, return the second largest element."

### Problem C: Check if Two Strings Are Anagrams
"Given two strings, return true if they are anagrams of each other (contain the same characters in any order)."

<details>
<summary>Answers</summary>

### Problem A: Reverse a String
1. Empty string `""` → `""`
2. Single character `"a"` → `"a"`
3. Palindrome `"racecar"` → `"racecar"` (same after reversing)
4. String with spaces `"hello world"` → `"dlrow olleh"`
5. String with special characters `"a!b@c"` → `"c@b!a"`
6. Very long string (performance)

### Problem B: Second Largest Element
1. Array with 2 elements `[3, 5]` → `3`
2. Array with all identical elements `[4, 4, 4]` → what should we return? (clarify with interviewer: is 4 the "second largest" or is there no second largest?)
3. Array with duplicates of the largest `[3, 5, 5]` → `3` or `5`? (depends on interpretation)
4. Array with 1 element `[7]` → no second largest exists (return what?)
5. Empty array `[]` → no elements at all
6. Negative numbers `[-5, -3, -1]` → `-3`
7. Already sorted ascending `[1, 2, 3, 4, 5]` → `4`
8. Already sorted descending `[5, 4, 3, 2, 1]` → `4`

### Problem C: Anagrams
1. Empty strings `"", ""` → `true`
2. One empty, one not `"", "a"` → `false`
3. Single characters `"a", "a"` → `true`
4. Single characters `"a", "b"` → `false`
5. Different lengths `"abc", "ab"` → `false` (quick check: if lengths differ, can't be anagrams)
6. Same characters different counts `"aab", "abb"` → `false`
7. Case sensitivity: `"Listen", "Silent"` → depends on problem (clarify!)
8. Strings with spaces: `"a b", "ab "` → depends on problem

</details>

---

## Exercise 6: Full Problem Breakdown [Easy]

Apply the complete process from all four lessons to this problem:

> **Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.**
>
> **Example 1:** Input: nums = [1,1,1,2,2,3], k = 2 → Output: [1,2]
> **Example 2:** Input: nums = [1], k = 1 → Output: [1]
>
> **Constraints:**
> - 1 <= nums.length <= 10^5
> - -10^4 <= nums[i] <= 10^4
> - k is in the range [1, the number of unique elements in the array]
> - The answer is guaranteed to be unique

**Tasks (do all of these, in order):**
1. **Read:** Identify inputs, outputs, and what the constraints tell you
2. **Restate:** Rewrite the problem in your own words
3. **Pseudocode:** Write your approach in pseudocode (don't worry if it's not optimal)
4. **Edge cases:** List the edge cases
5. **Trace:** Trace through your pseudocode with Example 1

<details>
<summary>Sample Answer</summary>

**1. Read:**
- Inputs: array of integers `nums`, integer `k`
- Output: array of the k most frequent integers
- Constraints: array is never empty, k is always valid (won't be 0 or larger than unique count), answer is unique (no ambiguity)

**2. Restate:** "Count how many times each number appears, then return the k numbers that appear most often."

**3. Pseudocode:**
```
FUNCTION topKFrequent(nums, k):
    CREATE a count tracker (element → frequency)
    
    FOR each number in nums:
        INCREMENT its count in the tracker
    
    SORT the tracker entries by frequency (highest first)
    
    TAKE the first k elements from the sorted entries
    
    RETURN those k elements (just the numbers, not the counts)
```

**4. Edge cases:**
- k equals the number of unique elements (return everything)
- k equals 1 (just find the single most frequent)
- Array with one element, k = 1
- All elements are the same, k = 1
- All elements have the same frequency

**5. Trace with Example 1:** nums = [1,1,1,2,2,3], k = 2

Count tracker after loop: {1: 3, 2: 2, 3: 1}
After sorting by frequency: [(1, 3), (2, 2), (3, 1)]
Take first k=2: [(1, 3), (2, 2)]
Return just the numbers: [1, 2] ✓

</details>

---

## What's Next?

If you completed all 6 exercises comfortably, move on to:
→ [Section 2: Big O Notation & Complexity Analysis](../../02-big-o-and-complexity/01-what-is-big-o.md)

If exercises 4-6 felt hard, re-read lessons 1.3 and 1.4, then try them again. The skills in this section are the foundation for everything that follows.
