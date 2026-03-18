# 2.1 — What is Big O?

## Prerequisites
- [Section 1: Computational Thinking](../01-computational-thinking/01-reading-problem-statements.md) (all lessons)

## Learning Objectives
- Understand what Big O notation measures and why it matters
- Recognize common growth rates: O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ)
- Know why we ignore constants and lower-order terms
- Be able to compare two solutions by their Big O

---

## The Core Idea

Big O notation answers one question: **As the input gets bigger, how much more work does your algorithm have to do?**

It doesn't measure exact speed (that depends on your computer). It measures **how the work scales**.

### An analogy

Imagine you're looking up a name in a phone book.

**Approach A: Page by page**
Start at page 1, check every name, one by one, until you find it. If the phone book has 1,000 pages, you might check up to 1,000 pages. If it has 1,000,000 pages, you might check up to 1,000,000 pages. **The work grows proportionally with the size.** This is **O(n)**.

**Approach B: Open to the middle**
Open to the middle. If the name you want comes before the middle, discard the second half. Repeat. Each step eliminates half the remaining pages. A 1,000-page phone book takes about 10 steps. A 1,000,000-page book takes about 20 steps. **Doubling the input only adds one step.** This is **O(log n)**.

**Approach C: Your friend memorized the phone book**
You ask, they answer instantly. Doesn't matter if there are 100 or 100,000,000 entries. **The work is always the same.** This is **O(1)**.

---

## What "n" Represents

`n` is the **size of the input**. What that means depends on the problem:

- For an array problem: `n` = number of elements in the array
- For a string problem: `n` = length of the string
- For a graph problem: `n` might be the number of nodes, `m` the number of edges
- For a matrix problem: `n` = number of rows, `m` = number of columns

When someone says "this algorithm is O(n²)", they mean: if the input has `n` elements, the algorithm does roughly `n²` operations.

---

## The Common Growth Rates

Here are the Big O complexities you'll encounter, from fastest to slowest:

| Big O | Name | Example | Feel |
|-------|------|---------|------|
| O(1) | Constant | Look up a value by key in a hash map | Instant, regardless of size |
| O(log n) | Logarithmic | Binary search in a sorted array | Very fast, even for huge inputs |
| O(n) | Linear | Loop through every element once | Reasonable for most problems |
| O(n log n) | Linearithmic | Sorting an array (merge sort, etc.) | Standard "good enough" for sorting |
| O(n²) | Quadratic | Nested loop checking all pairs | Slow for large inputs |
| O(2ⁿ) | Exponential | Checking all subsets | Only works for very small inputs |
| O(n!) | Factorial | Checking all permutations | Basically unusable for n > 12 |

### How they compare with real numbers

| n | O(1) | O(log n) | O(n) | O(n log n) | O(n²) | O(2ⁿ) |
|---|------|----------|------|------------|-------|--------|
| 10 | 1 | 3 | 10 | 33 | 100 | 1,024 |
| 100 | 1 | 7 | 100 | 664 | 10,000 | 1.3 × 10³⁰ |
| 1,000 | 1 | 10 | 1,000 | 9,966 | 1,000,000 | too big |
| 10,000 | 1 | 13 | 10,000 | 132,877 | 100,000,000 | too big |
| 100,000 | 1 | 17 | 100,000 | 1,660,964 | 10,000,000,000 | too big |

Look at the O(n²) column: at n = 100,000, that's 10 billion operations. Most computers can do about 100 million to 1 billion simple operations per second, so that would take 10-100 seconds. Way too slow for a LeetCode submission (which typically has a 1-2 second time limit).

This is why Big O matters: it tells you whether your approach is **fundamentally fast enough** before you write a single line of code.

---

## Why We Ignore Constants

Big O notation ignores constant factors. This means:
- O(2n) is just O(n)
- O(n/2) is just O(n)
- O(3n² + 5n + 100) is just O(n²)

Why? Because as n gets very large, the constants don't change the fundamental growth rate.

Consider: Is 2n faster than n²?
- At n = 3: 2n = 6, n² = 9. They're similar.
- At n = 100: 2n = 200, n² = 10,000. n² is 50x worse.
- At n = 10,000: 2n = 20,000, n² = 100,000,000. n² is 5,000x worse.

The constant factor of 2 in "2n" is irrelevant compared to the difference between n and n². That's why we drop constants — they don't affect the big picture.

**Rule: Keep only the highest-order term, drop everything else.**
- O(n² + n) → O(n²) (the n term is negligible when n is large)
- O(n + 1000) → O(n) (the constant 1000 is negligible)
- O(2ⁿ + n³) → O(2ⁿ) (exponential dominates polynomial)

---

## Best Case, Worst Case, Average Case

Big O typically describes **worst-case** behavior.

Example: Linear search (looking for a value in an unsorted array)
- **Best case:** The value is the first element → O(1)
- **Worst case:** The value is the last element (or not present) → O(n)
- **Average case:** On average, you'll check half the elements → O(n/2) = O(n)

In interviews, when someone asks "what's the time complexity?", they almost always mean worst case. If they want average case, they'll ask specifically.

---

## A Mental Model

Think of Big O as answering: **"If I double the size of my input, what happens to the running time?"**

| Complexity | Double the input → running time... |
|-----------|--------------------------------------|
| O(1) | Stays the same |
| O(log n) | Increases by a small constant |
| O(n) | Doubles |
| O(n log n) | Slightly more than doubles |
| O(n²) | Quadruples (4x) |
| O(2ⁿ) | Squares (gets astronomically worse) |

This mental model is incredibly useful for quick comparisons.

---

## Big O in Interviews

When you present a solution in an interview, you'll almost always be asked:

> "What's the time complexity of your solution?"

And often:

> "Can you do better?"

If your solution is O(n²) and the optimal is O(n), the interviewer is probing whether you know a better approach. Big O gives you the vocabulary for this conversation.

You don't need to prove Big O formally. You need to:
1. State it correctly (e.g., "This is O(n) time and O(n) space")
2. Explain why (e.g., "I loop through the array once, and I use a hash map that could store up to n entries")
3. Know if a better complexity is possible for this problem type

---

## Key Takeaways

1. **Big O measures how work scales with input size**, not exact speed.
2. **Common complexities** (in order): O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ).
3. **Ignore constants and lower-order terms** — focus on the dominant term.
4. **Worst case is the default** unless stated otherwise.
5. **The "double the input" mental model** is the quickest way to reason about Big O.
6. **Every interview solution needs a Big O analysis** — practice stating it.

---

Next: [2.2 — Analyzing Loops](02-analyzing-loops.md)
