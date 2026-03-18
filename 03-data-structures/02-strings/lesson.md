# 3.2 — Strings

## Prerequisites
- [Section 1: Computational Thinking](../../01-computational-thinking/01-reading-problem-statements.md) (all lessons)
- [Section 2: Big O and Complexity](../../02-big-o-and-complexity/01-what-is-big-o.md) (all lessons)
- [3.1 — Arrays](../01-arrays/lesson.md)

## Learning Objectives
- Understand strings as arrays of characters
- Know the time complexity of string operations in JS/Python
- Handle string immutability and efficient string building
- Work with character codes and ASCII basics
- Apply array techniques to string problems

---

## What Is a String?

A string is a sequence of characters. Under the hood, it's an array of character codes.

```
"hello" → ['h', 'e', 'l', 'l', 'o']
           [104, 101, 108, 108, 111]  ← ASCII codes
```

**Key property: Strings are immutable in most languages, including JavaScript and Python.**

This means:
- You can't modify a character in-place: `s[0] = 'x'` is illegal
- Every "modification" creates a new string
- Building a string character-by-character in a loop is O(n²)

---

## String Operations and Their Complexities

### JavaScript (TypeScript)

| Operation | Code | Time | Notes |
|-----------|------|------|-------|
| Access by index | `s[i]` | O(1) | |
| Get length | `s.length` | O(1) | |
| Concatenate two strings | `s1 + s2` | O(n + m) | Creates new string |
| Concatenate in loop | `result += char` | O(n²) **dangerous** | Each concat copies entire string |
| Check substring | `s.includes(sub)` | O(n × m) | Naive search |
| Find index | `s.indexOf(sub)` | O(n × m) | |
| Slice | `s.slice(start, end)` | O(n) | |
| Split to array | `s.split(delim)` | O(n) | |
| Join array to string | `arr.join('')` | O(n) | Best way to build strings |
| Uppercase | `s.toUpperCase()` | O(n) | |
| Lowercase | `s.toLowerCase()` | O(n) | |

### Python

| Operation | Code | Time | Notes |
|-----------|------|------|-------|
| Access by index | `s[i]` | O(1) | |
| Get length | `len(s)` | O(1) | |
| Concatenate two strings | `s1 + s2` | O(n + m) | |
| Concatenate in loop | `result += char` | O(n²) **dangerous** | CPython optimizes some cases, but don't rely on it |
| Check substring | `sub in s` | O(n × m) | |
| Find index | `s.find(sub)` | O(n × m) | |
| Slice | `s[start:end]` | O(n) | |
| Split | `s.split(delim)` | O(n) | |
| Join | `''.join(arr)` | O(n) | **Best way to build strings** |
| Uppercase | `s.upper()` | O(n) | |
| Lowercase | `s.lower()` | O(n) | |

---

## The String Building Trap

**Problem:** Build a string by repeating a character n times.

### Wrong Approach (O(n²)):

**TypeScript:**
```typescript
function buildString(n: number): string {
    let result = "";
    for (let i = 0; i < n; i++) {
        result += "x";  // Each concat copies the entire string!
    }
    return result;
}
// Time: O(n²) — 1 + 2 + 3 + ... + n = n(n+1)/2
```

**Python:**
```python
def build_string(n: int) -> str:
    result = ""
    for i in range(n):
        result += "x"  # Each concat copies the entire string!
    return result
# Time: O(n²)
```

### Right Approach (O(n)):

**TypeScript:**
```typescript
function buildString(n: number): string {
    const chars: string[] = [];
    for (let i = 0; i < n; i++) {
        chars.push("x");
    }
    return chars.join("");
}
// Time: O(n) — push is O(1), join is O(n)
```

**Python:**
```python
def build_string(n: int) -> str:
    return "x" * n  # Python optimizes string repetition
# Or: ''.join(['x' for _ in range(n)])
# Time: O(n)
```

**Rule:** In JavaScript, always use array + `join("")` for building strings. In Python, use `''.join()` or string multiplication.

---

## Common String Patterns

### Pattern 1: Two Pointers from Ends

Same as arrays — useful for palindromes, reversing.

**Problem:** Check if a string is a palindrome.

**TypeScript:**
```typescript
function isPalindrome(s: string): boolean {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        if (s[left] !== s[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}
// Time: O(n), Space: O(1)
```

**Python:**
```python
def is_palindrome(s: str) -> bool:
    left, right = 0, len(s) - 1
    
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True
# Time: O(n), Space: O(1)
```

**Variant: Case-insensitive, ignore non-alphanumeric.** (LeetCode 125)

```typescript
function isPalindromeClean(s: string): boolean {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        // Skip non-alphanumeric from left
        while (left < right && !isAlphaNumeric(s[left])) {
            left++;
        }
        // Skip non-alphanumeric from right
        while (left < right && !isAlphaNumeric(s[right])) {
            right--;
        }
        // Compare (case-insensitive)
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

function isAlphaNumeric(c: string): boolean {
    return /^[a-zA-Z0-9]$/.test(c);
}
```

---

### Pattern 2: Character Frequency Counting

Count how many times each character appears. Use an array (for ASCII) or a hash map (for Unicode).

**Problem:** Check if two strings are anagrams (same characters, different order).

**TypeScript:**
```typescript
function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) return false;
    
    const count: number[] = new Array(26).fill(0);  // For lowercase a-z
    
    for (const c of s) {
        count[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
    }
    
    for (const c of t) {
        const idx = c.charCodeAt(0) - 'a'.charCodeAt(0);
        count[idx]--;
        if (count[idx] < 0) return false;
    }
    
    return true;
}
// Time: O(n), Space: O(1) — fixed 26-element array
```

**Python:**
```python
def is_anagram(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False
    
    from collections import Counter
    return Counter(s) == Counter(t)

# Or manual counting:
def is_anagram_manual(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False
    
    count = [0] * 26  # For lowercase a-z
    
    for c in s:
        count[ord(c) - ord('a')] += 1
    
    for c in t:
        idx = ord(c) - ord('a')
        count[idx] -= 1
        if count[idx] < 0:
            return False
    
    return True
# Time: O(n), Space: O(1)
```

> **Python note:** `collections.Counter` is a built-in that counts elements. `Counter("hello")` returns `{'h': 1, 'e': 1, 'l': 2, 'o': 1}`. Very useful for string problems.

---

### Pattern 3: String to Array and Back

When you need to modify characters, convert to array first.

**Problem:** Replace all spaces with '%20' (URL encoding).

**TypeScript:**
```typescript
function urlEncode(s: string): string {
    const chars: string[] = [];
    
    for (const c of s) {
        if (c === ' ') {
            chars.push('%', '2', '0');
        } else {
            chars.push(c);
        }
    }
    
    return chars.join("");
}
// Time: O(n), Space: O(n)
```

**Python:**
```python
def url_encode(s: str) -> str:
    return s.replace(' ', '%20')  # Built-in works

# Or manually:
def url_encode_manual(s: str) -> str:
    result = []
    for c in s:
        if c == ' ':
            result.append('%20')
        else:
            result.append(c)
    return ''.join(result)
# Time: O(n), Space: O(n)
```

---

### Pattern 4: Sliding Window on Strings

Use when looking for substrings with specific properties. We'll cover sliding window in detail in Section 4.

**_PREVIEW: Find the longest substring without repeating characters.**

**TypeScript:**
```typescript
function lengthOfLongestSubstring(s: string): number {
    const chars = new Set<string>();
    let left = 0;
    let maxLength = 0;
    
    for (let right = 0; right < s.length; right++) {
        // Remove characters from left until no duplicate
        while (chars.has(s[right])) {
            chars.delete(s[left]);
            left++;
        }
        chars.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}
// Time: O(n), Space: O(min(n, m)) where m is charset size
```

**Python:**
```python
def length_of_longest_substring(s: str) -> int:
    chars = set()
    left = 0
    max_length = 0
    
    for right in range(len(s)):
        # Remove characters from left until no duplicate
        while s[right] in chars:
            chars.remove(s[left])
            left += 1
        chars.add(s[right])
        max_length = max(max_length, right - left + 1)
    
    return max_length
# Time: O(n), Space: O(min(n, m))
```

---

## Character Codes (ASCII Basics)

Sometimes you need to convert between characters and their numeric codes.

**JavaScript:**
```typescript
const code = 'a'.charCodeAt(0);  // 97
const char = String.fromCharCode(97);  // 'a'

// Check if character is lowercase letter:
const isLower = (c: string) => c >= 'a' && c <= 'z';  // or use regex

// Check if character is digit:
const isDigit = (c: string) => c >= '0' && c <= '9';
```

**Python:**
```python
code = ord('a')      # 97
char = chr(97)       # 'a'

# Check if character is lowercase letter:
is_lower = 'a' <= c <= 'z'

# Check if character is digit:
is_digit = '0' <= c <= '9'  # or: c.isdigit()
```

**Common ASCII codes:**
- '0' = 48, '9' = 57
- 'A' = 65, 'Z' = 90
- 'a' = 97, 'z' = 122

To convert between cases: `chr(ord('A') + 32)` = 'a' (add 32 for lowercase).

---

## Worked Example: Valid Anagram (LeetCode 242)

**Problem:** Given two strings s and t, return true if t is an anagram of s.

**Approach 1: Sort and compare.**

**TypeScript:**
```typescript
function isAnagramSort(s: string, t: string): boolean {
    return s.split('').sort().join('') === t.split('').sort().join('');
}
// Time: O(n log n) for sorting
// Space: O(n) for the split arrays
```

**Python:**
```python
def is_anagram_sort(s: str, t: str) -> bool:
    return sorted(s) == sorted(t)
# Time: O(n log n), Space: O(n)
```

**Approach 2: Character counting.** (Better — O(n))

See the full implementation earlier in this lesson.

---

## Common String Gotchas

### 1. `split()` and `join()` are inverses

**TypeScript:**
```typescript
const words = "hello world".split(" ");  // ["hello", "world"]
const back = words.join(" ");             // "hello world"

// For splitting into characters:
const chars = "hello".split("");  // ["h", "e", "l", "l", "o"]
```

**Python:**
```python
words = "hello world".split(" ")  # ["hello", "world"]
back = " ".join(words)             # "hello world"

# For splitting into characters:
chars = list("hello")  # ["h", "e", "l", "l", "o"]
```

### 2. String comparison is character-by-character

```typescript
"apple" < "banana"  // true (lexicographic)
"apple" < "Apple"   // false (uppercase comes before lowercase in ASCII)
```

```python
"apple" < "banana"  # True
"apple" < "Apple"   # False
```

### 3. Empty string edge cases

Always consider:
- Empty string `""`
- Single character `"a"`
- String with only whitespace `"   "`

---

## Key Takeaways

1. **Strings are immutable** — building with `+=` in a loop is O(n²). Use array + join.
2. **String operations are O(n)** — slicing, converting case, etc., all require copying.
3. **Two pointers from ends** works for strings just like arrays.
4. **Character counting** is a fundamental technique — use `Counter` in Python or a 26-element array for lowercase letters.
5. **Convert to array** when you need to modify characters in-place (conceptually).
6. **`charCodeAt`/`ord`** convert between characters and ASCII codes.

---

## What's Next

Next up: [Hash Maps & Sets](../03-hash-maps-and-sets/lesson.md) — the most important data structure for interview problems.

Upcoming in Section 4: [Sliding Window](../../04-algorithms-and-patterns/05-sliding-window/lesson.md) — a powerful technique for substring problems.

---

**Practice:** [String Exercises](practice/exercises.md)