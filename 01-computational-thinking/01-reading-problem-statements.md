# 1.1 — Reading Problem Statements

## Prerequisites
None — this is the starting point.

## Learning Objectives
- Understand the anatomy of a LeetCode problem
- Extract inputs, outputs, and constraints from a problem statement
- Identify implicit requirements that aren't stated directly
- Rewrite a problem in your own words before attempting to solve it

---

## The Anatomy of a LeetCode Problem

Every LeetCode problem has the same structure. Once you know the pattern, reading them becomes much easier.

### 1. Title and Description
A short paragraph explaining what you need to do. Often written in a formal, slightly awkward style. Don't let the wording intimidate you — it's saying something simple in a complicated way.

### 2. Examples
Usually 2-3 examples showing input → output pairs. **These are your best friend.** They show you concretely what the problem is asking.

### 3. Constraints
A section that tells you the size and range of the input. This is critical for two reasons:
- It tells you what edge cases to consider (can the input be empty? can numbers be negative?)
- It hints at what time complexity your solution needs (more on this in Section 2)

### 4. Follow-up (optional)
Sometimes a harder version of the problem is suggested. Ignore this initially.

---

## How to Read a Problem — Step by Step

### Step 1: Read it once, quickly
Get a general sense of what's being asked. Don't try to solve it yet.

### Step 2: Identify the inputs
What are you given? What types are they? Write them down explicitly.

Ask yourself:
- Is the input an array? A string? A number? Multiple inputs?
- What are the types of elements inside (numbers, strings, objects)?

### Step 3: Identify the output
What do you need to return? A single number? A boolean? A new array?

This seems obvious, but many mistakes happen because people return the wrong thing (e.g., returning the values instead of the indices, or a count instead of the elements).

### Step 4: Read the constraints
This is where you find the boundaries:
- `1 <= nums.length <= 10^4` → the array can have up to 10,000 elements
- `−10^9 <= nums[i] <= 10^9` → numbers can be negative and very large
- `The answer is guaranteed to exist` → you don't need to handle the "no answer" case

**Practical rule of thumb for constraints and time complexity:**
| Max n | You can afford | Typical approach |
|-------|---------------|-----------------|
| 10 | O(n!) or O(2^n) | Brute force / backtracking |
| 100 | O(n³) | Triple nested loops |
| 1,000 | O(n²) | Nested loops |
| 10,000 | O(n²) carefully | Nested loops (tight) |
| 100,000 | O(n log n) | Sorting + something |
| 1,000,000 | O(n) | Single pass, hash map |
| 10,000,000+ | O(n) or O(log n) | Math trick or binary search |

(You'll learn what all of this means in Section 2. For now, just know the constraints section matters.)

### Step 5: Rewrite in your own words
Before writing any code, restate the problem in plain English. If you can't explain it simply, you don't understand it yet.

### Step 6: Study the examples carefully
Trace through each example:
- Do you understand why the expected output follows from the input?
- Can you come up with the answer yourself before looking at the explanation?
- Are there any edge cases the examples don't cover?

---

## Worked Example: Two Sum

Here's LeetCode #1, the most famous problem:

> **Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to `target`.**
>
> You may assume that each input would have exactly one solution, and you may not use the same element twice.
>
> **Example 1:**
> Input: nums = [2,7,11,15], target = 9
> Output: [0,1]
> Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
>
> **Example 2:**
> Input: nums = [3,2,4], target = 6
> Output: [1,2]
>
> **Constraints:**
> - 2 <= nums.length <= 10^4
> - -10^9 <= nums[i] <= 10^9
> - Only one valid answer exists.

Let's apply our steps:

**Inputs:** An array of integers (`nums`) and a single integer (`target`).

**Output:** An array of two indices (not the values — the *positions*).

**Constraints tell us:**
- The array always has at least 2 elements (so we don't need to worry about empty arrays or single elements)
- Numbers can be negative (so we can't assume all positive)
- There's always exactly one answer (so we don't need to handle "no solution found")
- The array can be up to 10,000 elements (so O(n²) might be tight, O(n) would be better)

**In our own words:** "Find two different positions in the array where the values at those positions add up to the target. Return those positions."

**Studying the examples:**
- Example 1: `[2,7,11,15]` with target 9. Position 0 has value 2, position 1 has value 7. 2 + 7 = 9. Return `[0,1]`.
- Example 2: `[3,2,4]` with target 6. Position 1 has value 2, position 2 has value 4. 2 + 4 = 6. Return `[1,2]`. Note: 3 + 3 = 6 too, but we can't use the same element twice.

---

## Worked Example: Valid Palindrome

> **A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.**
>
> Given a string `s`, return `true` if it is a palindrome, or `false` otherwise.
>
> **Example 1:**
> Input: s = "A man, a plan, a canal: Panama"
> Output: true
> Explanation: "amanaplanacanalpanama" is a palindrome.
>
> **Example 2:**
> Input: s = "race a car"
> Output: false
>
> **Constraints:**
> - 1 <= s.length <= 2 * 10^5
> - s consists only of printable ASCII characters.

**Inputs:** A string.

**Output:** A boolean (true/false).

**Constraints tell us:**
- The string is never empty (length >= 1)
- Only ASCII characters (no need to worry about Unicode)
- Up to 200,000 characters (need an efficient solution, O(n) preferred)

**In our own words:** "Clean up the string by lowercasing everything and removing non-letter, non-number characters. Then check if it reads the same forwards and backwards."

**What's implicit (not stated directly):**
- An empty string (after cleaning) should probably be considered a palindrome
- Single characters are palindromes
- Numbers count as alphanumeric (not just letters)

---

## Common Traps When Reading Problems

### Trap 1: Confusing values with indices
"Return the two numbers" vs "Return the indices of the two numbers" — these are completely different outputs.

### Trap 2: Assuming positive numbers
Unless the constraints say `nums[i] >= 0`, the numbers can be negative. This changes many solutions.

### Trap 3: Ignoring the "sorted" hint
If the problem says the array is sorted, that's a massive hint. Sorted input usually means binary search or two-pointer approaches work.

### Trap 4: Missing "unique" vs "duplicate" information
Can the array contain duplicates? This affects whether you need to handle them.

### Trap 5: Not reading the return type carefully
Should you return a new array? Modify the array in place? Return a count? Read the function signature, not just the description.

---

## Key Takeaways

1. **Don't rush.** Spend 2-3 minutes reading before thinking about solutions.
2. **Rewrite the problem** in your own words every single time.
3. **The constraints section is not optional** — it tells you what approach to use and what edge cases matter.
4. **Study the examples** — make sure you can manually produce the expected output from the input before writing code.
5. **Check the return type** — returning the wrong thing is an easy, avoidable mistake.

---

Next: [1.2 — Pseudocode & Stepwise Refinement](02-pseudocode-and-stepwise-refinement.md)
