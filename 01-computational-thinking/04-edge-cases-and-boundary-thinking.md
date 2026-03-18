# 1.4 — Edge Cases & Boundary Thinking

## Prerequisites
- [1.1 — Reading Problem Statements](01-reading-problem-statements.md)
- [1.2 — Pseudocode & Stepwise Refinement](02-pseudocode-and-stepwise-refinement.md)
- [1.3 — Tracing Through Examples](03-tracing-through-examples.md)

## Learning Objectives
- Identify common edge cases systematically (not by guessing)
- Understand off-by-one errors and how to prevent them
- Build a personal edge case checklist to use on every problem
- Know which edge cases to bring up in interviews

---

## What Is an Edge Case?

An edge case is an input that is **at the boundary** of what's expected — the smallest, largest, weirdest, or most degenerate input your solution might receive.

Most solutions work fine on "normal" inputs. They break on edge cases. That's where bugs live.

**Example:** A function that finds the maximum element in an array works perfectly for `[3, 1, 4, 1, 5]`. But what about:
- `[5]` — a single element?
- `[-3, -1, -4]` — all negative numbers?
- `[7, 7, 7, 7]` — all the same number?
- `[]` — an empty array?

If your code handles all of these correctly, it's robust. If it breaks on any of them, you have a bug.

---

## The Edge Case Checklist

For every problem, run through this checklist. Not every item applies to every problem, but scanning the list takes 30 seconds and prevents common mistakes.

### For arrays:
- [ ] Empty array `[]`
- [ ] Single element `[x]`
- [ ] Two elements `[x, y]`
- [ ] All identical elements `[5, 5, 5, 5]`
- [ ] Already sorted (ascending) `[1, 2, 3, 4]`
- [ ] Reverse sorted (descending) `[4, 3, 2, 1]`
- [ ] Contains negative numbers `[-3, 1, -4]`
- [ ] Contains zeros `[0, 0, 5, 0]`
- [ ] Contains duplicates `[1, 3, 3, 2]`
- [ ] Very large array (does your solution scale?)

### For strings:
- [ ] Empty string `""`
- [ ] Single character `"a"`
- [ ] All same character `"aaaa"`
- [ ] All spaces `"    "`
- [ ] Uppercase/lowercase mix `"AbCdE"`
- [ ] Special characters / non-alphanumeric `"hello, world!"`
- [ ] Palindrome `"racecar"`
- [ ] Already sorted `"abcde"`

### For numbers:
- [ ] Zero `0`
- [ ] Negative numbers `-5`
- [ ] Very large numbers (near integer max)
- [ ] Very small numbers (near integer min)
- [ ] Floating point precision (0.1 + 0.2 !== 0.3 in JS)

### For linked lists / trees:
- [ ] Null / empty (no nodes)
- [ ] Single node
- [ ] Two nodes
- [ ] All nodes in a straight line (degenerate tree = basically a linked list)

### General:
- [ ] The answer doesn't exist (if the problem says "return -1 if not found")
- [ ] The answer is at the very beginning of the input
- [ ] The answer is at the very end of the input
- [ ] Multiple valid answers (does the problem want all of them or just one?)

---

## Off-by-One Errors

Off-by-one errors (OBOEs) are the most common bug in programming, period. They happen when you're one step too far or one step too short — wrong loop boundary, wrong index, wrong comparison.

### Common off-by-one scenarios:

**1. Loop boundary — `<` vs `<=`**

```typescript
// Visit elements at index 0 through 4 of a 5-element array
for (let i = 0; i < arr.length; i++) { }  // Correct: 0,1,2,3,4
for (let i = 0; i <= arr.length; i++) { }  // Bug: 0,1,2,3,4,5 → index 5 doesn't exist!
```

```python
# Python's range() already handles this — range(5) gives 0,1,2,3,4
for i in range(len(arr)):  # Correct
for i in range(len(arr) + 1):  # Bug: one too many
```

> **Python note:** Python's `range(n)` goes from 0 to n-1, which avoids many OBOEs. But you still need to think carefully about `range(start, stop)` — `stop` is exclusive.

**2. Array indexing — last element**

```typescript
const last = arr[arr.length - 1];  // Correct
const last = arr[arr.length];       // Bug: undefined (one past the end)
```

```python
last = arr[-1]  # Python lets you use negative indices — arr[-1] is the last element
last = arr[len(arr)]  # Bug: IndexError
```

**3. Substring / slice boundaries**

```typescript
// Get characters from index 1 to 3 (inclusive)
str.slice(1, 4);  // Correct: slice end is exclusive, so 4 means "up to but not including 4"
str.slice(1, 3);  // Bug: only gets indices 1 and 2
```

```python
s[1:4]  # Same as JS slice — end is exclusive
s[1:3]  # Same bug — only indices 1 and 2
```

**4. Counting vs. indexing confusion**

"The 3rd element" is at index 2. "There are 5 elements" means indices 0 through 4. Mixing up "count" and "index" is a constant source of bugs.

**5. Loop that should stop one step earlier**

The reverse-array bug from lesson 1.3 is a classic OBOE — the loop should stop at the halfway point, not go through the entire array.

### How to prevent OBOEs:

1. **Trace the first and last iteration** of every loop. Do the indices make sense?
2. **Check boundary values:** When `i = 0`, does the logic work? When `i = arr.length - 1`?
3. **Use concrete small examples:** If your array is `[a, b, c]` (length 3), check that your indices access exactly `a`, `b`, `c` and nothing else.
4. **When in doubt, trace it.** Don't try to reason about boundaries in your head — write it out.

---

## Worked Example: Edge Case Analysis

**Problem:** Given a sorted array, remove duplicates in-place and return the new length.

**Normal case:** `[1, 1, 2, 3, 3]` → `[1, 2, 3, _, _]`, return 3. Fine.

**Edge case analysis:**

| Edge case | Input | Expected output | Why it matters |
|-----------|-------|----------------|----------------|
| Empty array | `[]` | 0 | Does your code crash when there's nothing to iterate? |
| Single element | `[1]` | 1 | No duplicates possible — does your code handle this? |
| No duplicates | `[1, 2, 3]` | 3 | The array is already clean — does your code return it unchanged? |
| All same | `[5, 5, 5, 5]` | 1 | Every element is a duplicate — maximum removal |
| Two elements, same | `[3, 3]` | 1 | Minimal duplicate case |
| Two elements, different | `[1, 2]` | 2 | Minimal no-duplicate case |

A solution that handles all six of these correctly will almost certainly be correct for all inputs. This is how you build confidence without running the code.

---

## Edge Cases in Interviews

In an interview, bringing up edge cases **before** the interviewer asks shows maturity. Here's how to do it:

After reading the problem, say something like:

> "A few edge cases I want to consider: what if the array is empty? What about a single element? And I see from the constraints that numbers can be negative, so I need to handle that too."

Then, after writing your solution, trace through at least one edge case:

> "Let me check this with an empty array... my loop doesn't execute, and I return 0. That looks correct."

This is a strong signal to interviewers. It shows you think defensively, which is exactly what production code requires.

---

## Key Takeaways

1. **Edge cases are where bugs live.** Normal inputs rarely break your code — weird inputs do.
2. **Use the checklist systematically.** Don't try to think of edge cases from scratch every time.
3. **Off-by-one errors are the #1 bug type.** Always check loop boundaries and array indices.
4. **Trace the boundaries:** first iteration, last iteration, empty input, single element.
5. **In interviews, bring up edge cases proactively.** It demonstrates experience and thoroughness.
6. **Test edge cases last** — get the normal case working first, then verify the edges.

---

Next: [Practice Exercises](practice/exercises.md)
