# 3.3 — Hash Maps & Sets

## Prerequisites
- [Section 1: Computational Thinking](../../01-computational-thinking/01-reading-problem-statements.md) (all lessons)
- [Section 2: Big O and Complexity](../../02-big-o-and-complexity/01-what-is-big-o.md) (all lessons)
- [3.1 — Arrays](../01-arrays/lesson.md)
- [3.2 — Strings](../02-strings/lesson.md)

## Learning Objectives
- Understand what hashing is conceptually (no implementation required)
- Know when to use a Map vs. a Set
- Master the frequency counter pattern
- Apply hash maps to solve Two Sum and related problems
- Understand time-space tradeoffs: O(n) space for O(1) lookups

---

## What Is a Hash Map?

A hash map (also called dictionary, hash table, or object) is a data structure that stores **key-value pairs** with **O(1) average-time lookup, insertion, and deletion**.

```
Hash Map:
{
  "apple" → 5,
  "banana" → 3,
  "cherry" → 12
}

Lookup "banana" → 3 (instant)
Lookup "grape" → undefined/not found
```

**How it works (conceptual):**
1. A **hash function** converts a key (any value) into a number
2. That number is used as an index into an array
3. The value is stored at that index

**Collision:** When two keys hash to the same index, they're stored in a "bucket" (usually a linked list). This is why it's O(1) *average* — collisions make it O(n) worst case, but good hash functions make collisions rare.

**You won't need to implement a hash map.** Just know:
- Key → Value mapping
- O(1) average for lookup, insert, delete
- Keys must be hashable (primitives, or in Python, immutable types)

---

## Hash Map Operations

### JavaScript/TypeScript (`Map` and Object)

| Operation | Code | Time |
|-----------|------|------|
| Create | `const map = new Map<K, V>();` | - |
| Set value | `map.set(key, value);` | O(1) |
| Get value | `map.get(key);` | O(1) |
| Has key? | `map.has(key);` | O(1) |
| Delete | `map.delete(key);` | O(1) |
| Size | `map.size;` | O(1) |
| Iterate | `for (const [k, v] of map) { }` | O(n) |

**Plain Object (works like a hash map for string keys):**

```typescript
const obj: Record<string, number> = {};
obj["apple"] = 5;
obj["banana"] = 3;

const hasApple = "apple" in obj;  // true
const value = obj["apple"];       // 5
delete obj["apple"];
const keys = Object.keys(obj);    // ["banana"]
```

**Use `Map` when:**
- You need keys that aren't strings
- You need to preserve insertion order
- You need `.size` or frequent additions/deletions

**Use plain object (`{}`) when:**
- Keys are always strings
- You're doing simple lookups

### Python (`dict`)

| Operation | Code | Time |
|-----------|------|------|
| Create | `d = {}` or `d = dict()` | - |
| Set value | `d[key] = value` | O(1) |
| Get value | `d[key]` (raises error) or `d.get(key, default)` | O(1) |
| Has key? | `key in d` | O(1) |
| Delete | `del d[key]` or `d.pop(key)` | O(1) |
| Size | `len(d)` | O(1) |
| Iterate | `for k, v in d.items():` | O(n) |

```python
d: dict[str, int] = {}
d["apple"] = 5
d["banana"] = 3

has_apple = "apple" in d      # True
value = d.get("apple", 0)     # 5 (0 is default if not found)
value = d["apple"]            # 5 (raises KeyError if not found!)
del d["apple"]
keys = list(d.keys())         # ["banana"]
```

---

## What Is a Set?

A set is a hash map that only stores keys (no values). It's for **membership checking** — "have I seen this before?"

### JavaScript/TypeScript (`Set`)

```typescript
const seen = new Set<number>();
seen.add(1);
seen.add(2);
seen.add(1);  // Duplicate ignored

seen.has(1);  // true
seen.has(3);  // false
seen.size;    // 2
seen.delete(1);
seen.has(1);  // false
```

### Python (`set`)

```python
seen: set[int] = set()
seen.add(1)
seen.add(2)
seen.add(1)  # Duplicate ignored

1 in seen     # True
3 in seen     # False
len(seen)     # 2
seen.remove(1)
1 in seen     # False
```

**Time:** All operations are O(1) average.

---

## When to Use Hash Map vs. Set

| Use a Set when | Use a Map when |
|----------------|----------------|
| You only need to know "have I seen this?" | You need to associate data with each key |
| Duplicates should be eliminated | You need to count occurrences (key → count) |
| Membership checking only | Key to index, key to value, etc. |

**Examples:**
- **Set:** "Find duplicates in an array" — add to set, check if already seen
- **Map:** "Two Sum" — store value → index mapping
- **Map:** "Count character frequencies" — character → count
- **Set:** "Longest substring without repeating" — store characters in current window

---

## Pattern 1: Frequency Counter

The most common hash map pattern: count occurrences of each element.

**Problem:** Given two strings, check if they're anagrams.

**TypeScript:**
```typescript
function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) return false;
    
    const count: Map<string, number> = new Map();
    
    // Count characters in s
    for (const c of s) {
        count.set(c, (count.get(c) ?? 0) + 1);
    }
    
    // Decrement for characters in t
    for (const c of t) {
        if (!count.has(c)) return false;
        const newCount = count.get(c)! - 1;
        if (newCount === 0) {
            count.delete(c);
        } else {
            count.set(c, newCount);
        }
    }
    
    return count.size === 0;
}
// Time: O(n), Space: O(k) where k is unique characters
```

**Python:**
```python
from collections import Counter

def is_anagram(s: str, t: str) -> bool:
    return Counter(s) == Counter(t)

# Or manually:
def is_anagram_manual(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False
    
    count: dict[str, int] = {}
    
    for c in s:
        count[c] = count.get(c, 0) + 1
    
    for c in t:
        if c not in count:
            return False
        count[c] -= 1
        if count[c] == 0:
            del count[c]
    
    return len(count) == 0
# Time: O(n), Space: O(k)
```

**Why hash map?** Because we need O(1) lookup for each character. Using an array would require sorting (O(n log n)).

---

## Pattern 2: Lookup Table (Two Sum)

Store values you've seen for instant lookup.

**Problem:** Two Sum (LeetCode #1)

Given an array and target, find two indices where the values sum to target.

**Brute force:** Check every pair. O(n²).

**Hash map approach:** For each element, check if `target - element` exists in map. O(n).

**TypeScript:**
```typescript
function twoSum(nums: number[], target: number): number[] {
    const seen: Map<number, number> = new Map();  // value → index
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (seen.has(complement)) {
            return [seen.get(complement)!, i];
        }
        
        seen.set(nums[i], i);
    }
    
    return [];  // No solution (shouldn't happen per problem)
}
// Time: O(n), Space: O(n)
```

**Python:**
```python
def two_sum(nums: list[int], target: int) -> list[int]:
    seen: dict[int, int] = {}  # value → index
    
    for i, num in enumerate(nums):
        complement = target - num
        
        if complement in seen:
            return [seen[complement], i]
        
        seen[num] = i
    
    return []
# Time: O(n), Space: O(n)
```

**Key insight:** We "trade" space for time. Instead of searching through the array every time (O(n)), we use a hash map for O(1) lookup. We "pay" O(n) space to "buy" O(n) → O(1) lookups.

---

## Pattern 3: Detection (Duplicates, Cycle, etc.)

Use a set to detect if you've seen something before.

**Problem:** Contains Duplicate (LeetCode #217)

**TypeScript:**
```typescript
function containsDuplicate(nums: number[]): boolean {
    const seen = new Set<number>();
    
    for (const num of nums) {
        if (seen.has(num)) return true;
        seen.add(num);
    }
    
    return false;
}
// Time: O(n), Space: O(n)
```

**Python:**
```python
def contains_duplicate(nums: list[int]) -> bool:
    seen: set[int] = set()
    
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    
    return False
# Time: O(n), Space: O(n)
```

**Alternative with O(1) space:** Sort the array first, then check adjacent elements. O(n log n) time, O(1) space (if sorting in-place).

---

## Pattern 4: Grouping

Use a hash map to group related items.

**Problem:** Group Anagrams (LeetCode #49) — group strings that are anagrams of each other.

**TypeScript:**
```typescript
function groupAnagrams(strs: string[]): string[][] {
    const groups: Map<string, string[]> = new Map();
    
    for (const s of strs) {
        // Sort the string to create a key
        const key = s.split('').sort().join('');
        
        if (!groups.has(key)) {
            groups.set(key, []);
        }
        groups.get(key)!.push(s);
    }
    
    return Array.from(groups.values());
}
// Time: O(n × k log k) where k is max string length, Space: O(n × k)
```

**Python:**
```python
from collections import defaultdict

def group_anagrams(strs: list[str]) -> list[list[str]]:
    groups: dict[str, list[str]] = defaultdict(list)
    
    for s in strs:
        # Sort the string to create a key
        key = ''.join(sorted(s))
        groups[key].append(s)
    
    return list(groups.values())
# Time: O(n × k log k), Space: O(n × k)
```

**Key insight:** Anagrams have the same sorted characters. `eat → aet`, `tea → aet`, etc. Use sorted string as key.

---

## Worked Example: Top K Frequent Elements (LeetCode #347)

**Problem:** Given an array and integer k, return the k most frequent elements.

**Approach:**
1. Count frequencies with hash map
2. Sort by frequency, or use bucket sort

**TypeScript:**
```typescript
function topKFrequent(nums: number[], k: number): number[] {
    // Step 1: Count frequencies
    const count: Map<number, number> = new Map();
    for (const num of nums) {
        count.set(num, (count.get(num) ?? 0) + 1);
    }
    
    // Step 2: Sort by frequency (descending) and take top k
    const sorted = Array.from(count.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, k)
        .map(([num, _]) => num);
    
    return sorted;
}
// Time: O(n log n) for sorting, Space: O(n)
```

**Python:**
```python
from collections import Counter

def top_k_frequent(nums: list[int], k: int) -> list[int]:
    # Step 1: Count frequencies (Counter does this)
    count = Counter(nums)
    
    # Step 2: most_common(k) returns top k
    return [num for num, _ in count.most_common(k)]
# Time: O(n log k), Space: O(n)
```

---

## Key Takeaways

1. **Hash maps give O(1) average lookup** — this is the most important concept. Use when you need to find things quickly.
2. **Trade space for time** — hash maps use O(n) space to enable O(1) lookups. Usually worth it.
3. **Use sets for membership**, **use maps for key-value associations**.
4. **Frequency counter pattern** — count occurrences, then use counts to answer questions.
5. **Lookup table pattern** — store seen values, check for complement/target.
6. **Python's `Counter` and `defaultdict`** are extremely useful — learn them.

---

## What's Next

Next: [Stacks](../04-stacks/lesson.md) — LIFO data structure for parsing and undo operations.

---

**Practice:** [Hash Maps & Sets Exercises](practice/exercises.md)