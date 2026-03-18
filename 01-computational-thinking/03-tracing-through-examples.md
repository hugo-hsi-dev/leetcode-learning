# 1.3 — Tracing Through Examples

## Prerequisites
- [1.1 — Reading Problem Statements](01-reading-problem-statements.md)
- [1.2 — Pseudocode & Stepwise Refinement](02-pseudocode-and-stepwise-refinement.md)

## Learning Objectives
- Trace through code step-by-step using a state table
- Use tracing to verify your solution works before running it
- Use tracing to find bugs when something goes wrong
- Build the habit of tracing examples by hand

---

## What Is Tracing?

Tracing (also called "dry running") means **stepping through your code manually**, line by line, keeping track of every variable's value as it changes.

It's what a debugger does, but you do it with pen and paper (or a markdown table).

This is the single most reliable way to:
1. **Verify your solution** before submitting
2. **Find bugs** when your solution gives the wrong answer
3. **Understand someone else's code** when you're studying solutions

---

## The State Table Method

A state table tracks the value of every relevant variable at each step.

### Simple example: Sum of an array

**TypeScript:**
```typescript
function sum(nums: number[]): number {
    let total = 0;
    for (let i = 0; i < nums.length; i++) {
        total += nums[i];
    }
    return total;
}
```

**Python:**
```python
def sum_array(nums: list[int]) -> int:
    total = 0
    for i in range(len(nums)):
        total += nums[i]
    return total
```

**Input:** `nums = [3, 1, 4, 1, 5]`

**Trace:**

| Step | i | nums[i] | total (before) | total (after) |
|------|---|---------|----------------|---------------|
| init | — | — | 0 | 0 |
| 1 | 0 | 3 | 0 | 3 |
| 2 | 1 | 1 | 3 | 4 |
| 3 | 2 | 4 | 4 | 8 |
| 4 | 3 | 1 | 8 | 9 |
| 5 | 4 | 5 | 9 | 14 |

**Return:** 14

That's a trace. You're being the computer. You walk through every iteration and write down what happens.

---

## Tracing with Nested Loops

Nested loops are where tracing becomes essential, because it's very easy to lose track of which iteration you're in.

### Example: Find all pairs that sum to a target

**TypeScript:**
```typescript
function findPairs(nums: number[], target: number): number[][] {
    const result: number[][] = [];
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                result.push([nums[i], nums[j]]);
            }
        }
    }
    return result;
}
```

**Python:**
```python
def find_pairs(nums: list[int], target: int) -> list[list[int]]:
    result = []
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                result.append([nums[i], nums[j]])
    return result
```

**Input:** `nums = [2, 4, 3, 5, 1]`, `target = 6`

**Trace:**

| i | j | nums[i] | nums[j] | sum | = target? | result |
|---|---|---------|---------|-----|-----------|--------|
| 0 | 1 | 2 | 4 | 6 | YES | [[2,4]] |
| 0 | 2 | 2 | 3 | 5 | no | [[2,4]] |
| 0 | 3 | 2 | 5 | 7 | no | [[2,4]] |
| 0 | 4 | 2 | 1 | 3 | no | [[2,4]] |
| 1 | 2 | 4 | 3 | 7 | no | [[2,4]] |
| 1 | 3 | 4 | 5 | 9 | no | [[2,4]] |
| 1 | 4 | 4 | 1 | 5 | no | [[2,4]] |
| 2 | 3 | 3 | 5 | 8 | no | [[2,4]] |
| 2 | 4 | 3 | 1 | 4 | no | [[2,4]] |
| 3 | 4 | 5 | 1 | 6 | YES | [[2,4],[5,1]] |

**Return:** `[[2, 4], [5, 1]]`

By tracing, you can see:
- How `j` always starts at `i + 1` (so we don't check the same pair twice)
- That every possible pair gets checked
- Exactly when items get added to `result`

---

## Tracing to Find Bugs

Tracing isn't just for verification — it's a debugging tool.

### Example: A buggy "reverse array" function

**TypeScript (with a bug):**
```typescript
function reverseArray(nums: number[]): number[] {
    for (let i = 0; i < nums.length; i++) {
        const temp = nums[i];
        nums[i] = nums[nums.length - 1 - i];
        nums[nums.length - 1 - i] = temp;
    }
    return nums;
}
```

**Input:** `nums = [1, 2, 3, 4]`

**Trace:**

| Step | i | nums[i] | nums[length-1-i] | Action | Array after |
|------|---|---------|-------------------|--------|-------------|
| init | — | — | — | — | [1, 2, 3, 4] |
| 1 | 0 | 1 | 4 | swap [0] and [3] | [4, 2, 3, 1] |
| 2 | 1 | 2 | 3 | swap [1] and [2] | [4, 3, 2, 1] |
| 3 | 2 | 2 | 3 | swap [2] and [1] | [4, 2, 3, 1] |
| 4 | 3 | 1 | 4 | swap [3] and [0] | [1, 2, 3, 4] |

**Return:** `[1, 2, 3, 4]` — the original array! It reversed, then un-reversed.

**The bug:** The loop goes through the entire array, so it swaps everything twice. It should only go halfway: `i < nums.length / 2`.

Without tracing, this bug is confusing. With tracing, it's obvious at step 3 — you can see the array going *back* to its original state.

**Fixed version:**
```typescript
function reverseArray(nums: number[]): number[] {
    for (let i = 0; i < Math.floor(nums.length / 2); i++) {
        const temp = nums[i];
        nums[i] = nums[nums.length - 1 - i];
        nums[nums.length - 1 - i] = temp;
    }
    return nums;
}
```

```python
def reverse_array(nums: list[int]) -> list[int]:
    for i in range(len(nums) // 2):
        nums[i], nums[len(nums) - 1 - i] = nums[len(nums) - 1 - i], nums[i]
    return nums
```

> **Python note:** Python can swap two values in one line: `a, b = b, a`. No temp variable needed. This is a common Python idiom you'll see everywhere.

---

## Tracing with Diagrams

For some problems, a table isn't enough. Drawing a picture helps.

### Example: Two pointers moving inward

Checking if a string is a palindrome:

```
Input: "racecar"

Step 1:  r a c e c a r
         ^           ^     'r' == 'r' ✓
         L           R

Step 2:  r a c e c a r
           ^       ^       'a' == 'a' ✓
           L       R

Step 3:  r a c e c a r
             ^   ^         'c' == 'c' ✓
             L   R

Step 4:  r a c e c a r
               ^           L meets R → done, it's a palindrome
              L,R
```

This is much clearer than a table for pointer-based problems. Use whatever representation makes the state changes visible.

---

## When to Trace

### Always trace when:
- You've written a solution but aren't sure it's correct
- Your solution gives the wrong answer and you don't know why
- You're studying someone else's solution and can't follow it
- The problem involves tricky index manipulation

### You can skip tracing when:
- The logic is dead simple (e.g., return `arr.length`)
- You've solved this exact pattern many times before

### How much to trace:
- For simple problems: trace one normal case and one edge case
- For complex problems: trace the given examples, then trace an edge case (empty input, single element, etc.)
- You don't need to trace every step of a 100-iteration loop — trace enough to see the pattern (first 3-4 iterations, then jump to the end)

---

## Key Takeaways

1. **Tracing = being the computer.** Step through code line by line, writing down variable values.
2. **Use a state table** for loops and variable tracking. Columns = variables, rows = steps.
3. **Use diagrams** for pointer-based or spatial problems.
4. **Tracing finds bugs** that staring at code won't — especially off-by-one errors and double-swap bugs.
5. **Trace before running** as a habit. It builds deep understanding of how code executes and makes you a better debugger.
6. **In interviews, trace your solution** with the given examples before saying "I'm done." It shows thoroughness and catches silly mistakes.

---

Next: [1.4 — Edge Cases & Boundary Thinking](04-edge-cases-and-boundary-thinking.md)
