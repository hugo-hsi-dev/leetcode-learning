# Strings — Practice Exercises

## Warm-up Exercises

### Warm-up 1: Is Uppercase

Given a string, return true if all characters are uppercase letters (A-Z).

**Examples:**
- `"HELLO"` → `true`
- `"Hello"` → `false`
- `"HELLO123"` → `false`

<details>
<summary>Hint</summary>

Check each character. A character is uppercase if `'A' <= c <= 'Z'` (or use regex/built-in methods).

</details>

---

### Warm-up 2: Reverse String

Reverse a string in-place (modify the input if possible, or return a new string).

**Examples:**
- `"hello"` → `"olleh"`
- `"racecar"` → `"racecar"` (palindrome)

<details>
<summary>Hint</summary>

Convert to array, use two pointers from ends, swap. Or use built-in reverse.

</details>

---

### Warm-up 3: Count Vowels

Return the number of vowels (a, e, i, o, u) in a string. Case-insensitive.

**Examples:**
- `"Hello World"` → `3` (e, o, o)
- `"xyz"` → `0`

---

### Warm-up 4: Remove Vowels

Given a string, return a new string with all vowels removed.

**Examples:**
- `"hello world"` → `"hll wrld"`
- `"AEIOU"` → `""`

---

### Warm-up 5: String Compression

Given a string, perform basic compression: count consecutive repeated characters. If the compressed string is not smaller, return the original.

**Examples:**
- `"aabcccccaaa"` → `"a2b1c5a3"` (original length 10, compressed length 8)
- `"abc"` → `"abc"` (compressed would be `"a1b1c1"` which is longer)

<details>
<summary>Solution approach</summary>

Use a pointer to scan through the string, count consecutive same characters, append character + count to result array, then join.

</details>

---

## LeetCode Easy Problems

### LeetCode 125: Valid Palindrome [Easy]

**Problem:** Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring case.

**Link:** https://leetcode.com/problems/valid-palindrome/

**Examples:**
- `"A man, a plan, a canal: Panama"` → `true`
- `"race a car"` → `false`
- `" "` → `true` (empty or whitespace only)

<details>
<summary>Hint 1</summary>

Use two pointers from ends. Skip non-alphanumeric characters. Compare remaining characters case-insensitively.

</details>

<details>
<summary>Hint 2</summary>

A helper function `isAlphaNumeric(c)` checks if `c` is a letter or digit. In Python: `c.isalnum()`.

</details>

---

### LeetCode 242: Valid Anagram [Easy]

**Problem:** Given two strings s and t, return true if t is an anagram of s.

**Link:** https://leetcode.com/problems/valid-anagram/

**Examples:**
- `s = "anagram", t = "nagaram"` → `true`
- `s = "rat", t = "car"` → `false`

---

### LeetCode 14: Longest Common Prefix [Easy]

**Problem:** Given an array of strings, find the longest common prefix string.

**Link:** https://leetcode.com/problems/longest-common-prefix/

**Examples:**
- `["flower","flow","flight"]` → `"fl"`
- `["dog","racecar","car"]` → `""`

---

### LeetCode 20: Valid Parentheses [Easy]

**Note:** This requires stacks, covered in Section 3.4. Save for later.

---

### LeetCode 28: Find the Index of the First Occurrence [Easy]

**Problem:** Given two strings `haystack` and `needle`, return the index of the first occurrence of `needle` in `haystack`, or -1 if not found.

**Link:** https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/

**Examples:**
- `haystack = "sadbutsad", needle = "sad"` → `0`
- `haystack = "leetcode", needle = "leeto"` → `-1`

---

### LeetCode 58: Length of Last Word [Easy]

**Problem:** Given a string `s` consisting of words and spaces, return the length of the last word.

**Link:** https://leetcode.com/problems/length-of-last-word/

**Examples:**
- `"Hello World"` → `5`
- `"   fly me   to   the moon  "` → `4`

---

## Stretch Problem (Medium)

### LeetCode 3: Longest Substring Without Repeating Characters [Medium]

**Problem:** Given a string, find the length of the longest substring without repeating characters.

**Link:** https://leetcode.com/problems/longest-substring-without-repeating-characters/

**Examples:**
- `"abcabcbb"` → `3` (`"abc"`)
- `"bbbbb"` → `1` (`"b"`)
- `"pwwkew"` → `3` (`"wke"`)

<details>
<summary>Hint</summary>

Sliding window with a Set to track characters in current window. Expand right, shrink left when duplicate found.

</details>

---

## What's Next

Once you can solve string problems using the two-pointer and character-counting patterns, move on to:

→ [Hash Maps & Sets](../../03-hash-maps-and-sets/lesson.md) — the most versatile data structure for interviews