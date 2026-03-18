# Hash Maps & Sets — Practice Exercises

## Warm-up Exercises

### Warm-up 1: Count Character Frequencies

Given a string, return an object/map with the count of each character.

**Examples:**
- `"hello"` → `{h: 1, e: 1, l: 2, o: 1}`
- `"aabbcc"` → `{a: 2, b: 2, c: 2}`

<details>
<summary>Hint</summary>

Iterate through the string, use a map where `char → count`. Increment count for each character.

</details>

---

### Warm-up 2: Find Missing Number

Given an array containing n distinct numbers in the range [0, n], find the missing number.

**Examples:**
- `[3, 0, 1]` → `2` (array length is 3, range is [0, 3], missing 2)
- `[0, 1]` → `2`
- `[9, 6, 4, 2, 3, 5, 7, 0, 1]` → `8`

<details>
<summary>Hint 1</summary>

One approach: put all numbers in a set, then check 0 to n for which is missing.

</details>

<details>
<summary>Hint 2</summary>

Better approach: sum of 0 to n minus sum of array equals missing number. O(1) space.

</details>

---

### Warm-up 3: Check Array Inclusion

Given two arrays, return true if all elements of the second array exist in the first.

**Examples:**
- `[1, 2, 3, 4], [2, 3]` → `true`
- `[1, 2, 3, 4], [2, 5]` → `false`
- `[1, 2, 2, 3], [2, 2, 3]` → `true`
- `[1, 2, 3], [2, 2]` → `false` (need two 2s, only have one)

<details>
<summary>Hint</summary>

Count frequencies in both arrays, then check if arr1 has enough of each element for arr2.

</details>

---

## LeetCode Easy Problems

### LeetCode 1: Two Sum [Easy]

**Problem:** Given an array of integers `nums` and an integer `target`, return indices of the two numbers that add up to `target`.

**Link:** https://leetcode.com/problems/two-sum/

This is the canonical hash map problem. See the lesson for the solution approach.

**Solutions:** [TypeScript](../../01-arrays/practice/solutions/01-two-sum.ts) | [Python](../../01-arrays/practice/solutions/01-two-sum.py)

---

### LeetCode 217: Contains Duplicate [Easy]

**Problem:** Given an integer array, return true if any value appears at least twice.

**Link:** https://leetcode.com/problems/contains-duplicate/

**Examples:**
- `[1, 2, 3, 1]` → `true`
- `[1, 2, 3, 4]` → `false`

<details>
<summary>Hint</summary>

Use a set. Add each number. If you try to add a number that's already in the set, return true.

</details>

---

### LeetCode 242: Valid Anagram [Easy]

**Problem:** Given two strings s and t, return true if t is an anagram of s.

**Link:** https://leetcode.com/problems/valid-anagram/

Already covered in thelesson. Practice implementing both the sorted approach and the hash map approach.

---

### LeetCode 383: Ransom Note [Easy]

**Problem:** Given two strings ransomNote and magazine, return true if ransomNote can be constructed from magazine (each character from magazine can only be used once).

**Link:** https://leetcode.com/problems/ransom-note/

**Examples:**
- `ransomNote = "a", magazine = "b"` → `false`
- `ransomNote = "aa", magazine = "ab"` → `false`
- `ransomNote = "aa", magazine = "aab"` → `true`

<details>
<summary>Hint</summary>

Count characters in magazine with a frequency map. Then go through ransomNote, decrementing counts. If any count goes negative, return false.

</details>

---

### LeetCode 387: First Unique Character [Easy]

**Problem:** Given a string, find the first non-repeating character and return its index. Return -1 if none exists.

**Link:** https://leetcode.com/problems/first-unique-character-in-a-string/

**Examples:**
- `"leetcode"` → `0` ('l' is first unique)
- `"loveleetcode"` → `2` ('v' is first unique)
- `"aabb"` → `-1`

<details>
<summary>Hint</summary>

Two passes: first pass counts frequencies, second pass finds first character with count 1.

</details>

---

## LeetCode Medium Problems

### LeetCode 49: Group Anagrams [Medium]

**Problem:** Given an array of strings, group the anagrams together.

**Link:** https://leetcode.com/problems/group-anagrams/

**Examples:**
- `["eat","tea","tan","ate","nat","bat"]` → `[["bat"],["nat","tan"],["ate","eat","tea"]]`

<details>
<summary>Hint</summary>

Use a map where key = sorted string, value = list of original strings. Anagrams have the same sorted representation.

</details>

---

### LeetCode 347: Top K Frequent Elements [Medium]

**Problem:** Given an integer array and integer k, return the k most frequent elements.

**Link:** https://leetcode.com/problems/top-k-frequent-elements/

**Examples:**
- `nums = [1,1,1,2,2,3], k = 2` → `[1, 2]`
- `nums = [1], k = 1` → `[1]`

<details>
<summary>Hint 1</summary>

Count frequencies with a hash map. Then either sort by frequency, or use bucket sort (frequency → list of elements).

</details>

---

### LeetCode 128: Longest Consecutive Sequence [Medium]

**Problem:** Given an unsorted array of integers, find the length of the longest consecutive elements sequence. Your algorithm must run in O(n) time.

**Link:** https://leetcode.com/problems/longest-consecutive-sequence/

**Examples:**
- `[100, 4, 200, 1, 3, 2]` → `4` (sequence is `1, 2, 3, 4`)
- `[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]` → `9`

<details>
<summary>Hint 1</summary>

Put all numbers in a set for O(1) lookup.

</details>

<details>
<summary>Hint 2</summary>

For each number, check if it's the start of a sequence (i.e., `num - 1` is NOT in the set). If it is, count how long the sequence is by checking `num + 1`, `num + 2`, etc.

</details>

---

## What's Next

Once you're comfortable with hash maps and sets, move on to:

→ [Stacks](../../04-stacks/lesson.md) — LIFO data structure for matching, parsing, and expression evaluation.