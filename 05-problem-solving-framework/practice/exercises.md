# Problem-Solving Framework — Practice Exercises

These exercises are different: they practice the *process* of problem-solving, not just coding.

---

## Exercise 1: Clarify the Problem [Warm-up]

Read this problem statement and list your clarifying questions. Don't solve it yet.

> **Given an array of integers nums and an integer target, return the number of pairs (i, j) such that i < j and nums[i] + nums[j] < target.**

Write at least 5 questions you would ask the interviewer.

<details>
<summary>Suggested Questions</summary>

1. Can the array contain negative numbers?
2. Can numbers in the array be larger than target?
3. What's the size of the array? (affects complexity requirements)
4. Can elements be repeated?
5. What should I return if no valid pairs exist? (0 or error?)
6. Should the pairs themselves count, or just the number of pairs?
7. Are there overflow concerns? (sum might exceed integer max)

</details>

---

## Exercise 2: Brute Force First [Warm-up]

For this problem, write a brute force solution and state its time/space complexity. Don't optimize yet.

> **Given a string, find the length of the longest substring without repeating characters.**

Write:
1. A brute force approach (in pseudocode or English)
2. The time complexity
3. The space complexity
4. Where the bottleneck is (what makes it slow?)

<details>
<summary>Solution</summary>

**Brute Force Approach:**
- For each starting position i (0 to n-1)
  - For each ending position j (i to n-1)
    - Check if substring s[i:j+1] has all unique characters
    - If yes, track the maximum length

**Time Complexity:** O(n³)
- O(n²) substrings to check
- O(n) to check each substring for uniqueness

**Space Complexity:** O(n) for the set to check uniqueness (or O(1) if using boolean array for ASCII)

**Bottleneck:** Checking all possible substrings is O(n²), and checking each one is O(n). Can we do better?
- Insight: We don't need to restart from scratch each time. Use a sliding window.

</details>

---

## Exercise 3: Pattern Recognition [Easy]

For each problem, identify the likely pattern before solving:

1. **"Find the median of two sorted arrays"**
   2. **"Find all anagrams of string p in string s"**
   3. **"Check if a linked list has a cycle"**
   4. **"Find the shortest path from node A to node B in an unweighted graph"**
   5. **"Find the maximum sum of non-adjacent elements"**

<details>
<summary>Answers</summary>

1. **Median of two sorted arrays** → Binary search (specifically, find partition point)
2. **All anagrams in string** → Sliding window with frequency count
3. **Linked list cycle** → Fast/slow pointers (Tortoise and Hare)
4. **Shortest path in unweighted graph** → BFS
5. **Maximum sum of non-adjacent** → Dynamic Programming (like House Robber)

</details>

---

## Exercise 4: Optimize Step-By-Step [Easy]

Take this brute force solution and optimize it step by step.

**Problem:** Find if any two numbers in array sum to target.

**Brute Force (O(n²)):**
```typescript
function hasTwoSum(nums: number[], target: number): boolean {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return true;
            }
        }
    }
    return false;
}
```

Questions:
1. What's the bottleneck?
2. What data structure could help?
3. Write the optimized solution.
4. What's the new time/space complexity?

<details>
<summary>Solution</summary>

1. **Bottleneck:** Nested loop checking every pair. The inner loop is O(n) for each O(n) outer iteration.

2. **Data structure:** Hash set. For each number, check if `target - num` exists in the set. This gives O(1) lookup instead of O(n) search.

3. **Optimized Solution (O(n)):**
```typescript
function hasTwoSum(nums: number[], target: number): boolean {
    const seen = new Set<number>();
    for (const num of nums) {
        if (seen.has(target - num)) {
            return true;
        }
        seen.add(num);
    }
    return false;
}
```

4. **Complexity:** O(n) time, O(n) space. We "traded" O(n) space for O(1) lookups.

</details>

---

## Exercise 5: Trace Your Solution [Medium]

Take this solution and trace through it with the given input. Find the bug.

**Problem:** Find the first unique (non-repeating) character in a string.

**Solution:**
```typescript
function firstUniqueChar(s: string): number {
    const count: Map<string, number> = new Map();
    
    for (const c of s) {
        count.set(c, (count.get(c) || 0) + 1);
    }
    
    for (const c of s) {
        if (count.get(c) === 1) {
            return s.indexOf(c);
        }
    }
    
    return -1;
}
```

**Input:** `"leetcode"`

Trace through the code step by step:
1. What is `count` after the first loop?
2. What does the second loop check?
3. What does it return?
4. Is there a bug? If so, what is it?

<details>
<summary>Solution</summary>

1. After first loop: `count = {'l': 1, 'e': 2, 't': 1, 'c': 1, 'o': 1, 'd': 1}`

2. Second loop checks each character's count. Returns when count is 1.

3. It returns `0` (index of 'l').

4. No bug in this case! But there's a subtle issue: `s.indexOf(c)` inside the loop is O(n), making the overall solution O(n²) instead of O(n). Better to use the index from the loop:

```typescript
for (let i = 0; i < s.length; i++) {
    if (count.get(s[i]) === 1) {
        return i;
    }
}
```

This makes it truly O(n).

</details>

---

## Exercise 6: Full Problem Workflow [Medium]

Apply the complete 6-step process to this problem:

> **Given an array of intervals where intervals[i] = [start, end], merge all overlapping intervals, and return the merged intervals.**

**Step 1: Clarify**
- Write 3 clarifying questions

**Step 2: Examples**
- Write 2 examples (one normal, one edge case)

**Step 3: Brute Force**
- Describe the brute force approach
- State time/space complexity

**Step 4: Optimize**
- What pattern applies?
- Describe the optimized approach
- State new complexity

**Step 5: Code**
- Write the solution (in your preferred language)

**Step 6: Test**
- Trace through with your examples

<details>
<summary>Sample Answer</summary>

**Step 1: Clarify**
- Are intervals sorted by start time?
- Can start > end for any interval?
- Are intervals inclusive (e.g., [1,2] and [2,3] overlap)?

**Step 2: Examples**
- Normal: `[[1,3], [2,6], [8,10], [15,18]]` → `[[1,6], [8,10], [15,18]]`
- Edge: `[[1,4], [4,5]]` → `[[1,5]]` (touching intervals merge)
- Edge: `[]` → `[]`
- Edge: `[[1,2]]` → `[[1,2]]`

**Step 3: Brute Force**
- Compare every interval with every other interval
- If they overlap, merge them
- Repeat until no more merges
- Time: O(n²) or worse, Space: O(n)

**Step 4: Optimize**
- Pattern: Sort + Greedy (sweep line)
- Sort intervals by start time
- Iterate through, merge overlapping consecutive intervals
- Time: O(n log n) for sorting, Space: O(n) for result

**Step 5: Code (Python):**
```python
def merge(intervals: list[list[int]]) -> list[list[int]]:
    if not intervals:
        return []
    
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    
    for interval in intervals[1:]:
        if interval[0] <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], interval[1])
        else:
            merged.append(interval)
    
    return merged
```

**Step 6: Test**
- Input: `[[1,3], [2,6], [8,10], [15,18]]`
- After sort: same (already sorted)
- Process [1,3]: merged = [[1,3]]
- Process [2,6]: 2 <= 3, overlap! Merge to [1, max(3,6)] = [1,6]. merged = [[1,6]]
- Process [8,10]: 8 > 6, no overlap. merged = [[1,6], [8,10]]
- Process [15,18]: 15 > 10, no overlap. merged = [[1,6], [8,10], [15,18]]
- Output: `[[1,6], [8,10], [15,18]]` ✓

</details>

---

## What's Next

If you can apply the 6-step process comfortably, you're ready for mock interviews and timed practice. Consider:

- Doing problems on a timer (25-30 minutes)
- Practicing with a friend for mock interviews
- Working through the Blind 75 or NeetCode 150