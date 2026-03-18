# 3.10 — Tries (Prefix Trees)

## Prerequisites
- [3.3 — Hash Maps & Sets](../03-hash-maps-and-sets/lesson.md)
- [3.7 — Trees](../07-trees/lesson.md)
- [4.1 — Recursion](../../04-algorithms-and-patterns/01-recursion/lesson.md)

## Section Outline (Detailed)

### 1. What Is a Trie?
- Definition: A tree-like data structure for storing strings, where each node represents a character
- Also called "prefix tree" because shared prefixes share the same path
- Why tries matter: Autocomplete, spell check, IP routing, word games
- Trie vs. hash map for string lookups: Tries excel at prefix queries

### 2. Trie Node Structure
- Each node has a map of children (character → child node)
- Each node has a boolean `isEndOfWord` flag
- Root node is empty (represents the empty prefix)
- TypeScript: `class TrieNode { children: Map<string, TrieNode>; isEnd: boolean; }`
- Python: `class TrieNode: def __init__(self): self.children = {}; self.is_end = False`

### 3. Operations and Complexity
| Operation | Description | Time |
|-----------|-------------|------|
| Insert | Add a word | O(m) where m = word length |
| Search | Check if word exists | O(m) |
| StartsWith | Check if any word has prefix | O(m) |
| Delete | Remove a word | O(m) |

- Space: O(total characters across all words) in worst case
- In practice, shared prefixes reduce space significantly

### 4. Key Operation: Insert
- Start at root
- For each character in the word, create child node if it doesn't exist
- Move to the child node
- After last character, mark `isEndOfWord = true`

### 5. Key Operation: Search
- Start at root
- For each character, follow the child pointer
- If any character is missing, word doesn't exist
- After last character, check `isEndOfWord` — a prefix match isn't enough

### 6. Key Operation: Prefix Search (startsWith)
- Same as Search, but don't check `isEndOfWord`
- Just verify the full prefix path exists

### 7. Key Pattern: Implement Trie
- **LeetCode 208: Implement Trie**
- Core interview problem — know how to build from scratch
- Insert, search, and startsWith are the three required methods

### 8. Key Pattern: Word Search with Trie
- **LeetCode 212: Word Search II**
- Build a trie from the word list
- DFS on the grid, following trie paths
- Much faster than searching for each word individually
- Prune branches after finding all words on that path

### 9. Key Pattern: Autocomplete / Prefix Matching
- Given a prefix, find all words that start with it
- DFS from the prefix node to collect all `isEndOfWord` nodes
- Practical application: search bars, IDE autocomplete

### 10. Trie vs. Hash Map
| | Trie | Hash Map |
|---|------|----------|
| Exact lookup | O(m) | O(m) average |
| Prefix queries | O(m + results) | O(n) scan all keys |
| Sorted iteration | Natural (DFS) | Must sort keys |
| Space | Can be large | Usually smaller |
| When to use | Prefix-heavy problems | Exact-match problems |

### 11. Worked Examples
- LeetCode 208: Implement Trie (Essential — the core problem)
- LeetCode 211: Design Add and Search Words (wildcard search with '.')
- LeetCode 212: Word Search II (Trie + grid DFS)
- LeetCode 14: Longest Common Prefix (can solve with trie, though simpler solutions exist)

### 12. Common Mistakes
- Forgetting to check `isEndOfWord` in search (matching prefix instead of full word)
- Using arrays of size 26 when input might include characters beyond lowercase a-z
- Not cleaning up trie nodes on delete (leaving dead branches)
- Confusing search (exact match) with startsWith (prefix match)

### 13. Practice Problems
- LeetCode 208: Implement Trie (Medium)
- LeetCode 211: Design Add and Search Words Data Structure (Medium)
- LeetCode 212: Word Search II (Hard — save for later)
- LeetCode 14: Longest Common Prefix (Easy — trie approach is optional)
- LeetCode 648: Replace Words (Medium)
- LeetCode 720: Longest Word in Dictionary (Medium)

---

## Code Examples

**Trie Implementation:**
```typescript
class TrieNode {
    children: Map<string, TrieNode> = new Map();
    isEnd: boolean = false;
}

class Trie {
    root: TrieNode = new TrieNode();

    insert(word: string): void {
        let node = this.root;
        for (const char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char)!;
        }
        node.isEnd = true;
    }

    search(word: string): boolean {
        const node = this._findNode(word);
        return node !== null && node.isEnd;
    }

    startsWith(prefix: string): boolean {
        return this._findNode(prefix) !== null;
    }

    private _findNode(prefix: string): TrieNode | null {
        let node = this.root;
        for (const char of prefix) {
            if (!node.children.has(char)) return null;
            node = node.children.get(char)!;
        }
        return node;
    }
}
```

**Trie Implementation (Python):**
```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def search(self, word: str) -> bool:
        node = self._find_node(word)
        return node is not None and node.is_end

    def starts_with(self, prefix: str) -> bool:
        return self._find_node(prefix) is not None

    def _find_node(self, prefix: str):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return None
            node = node.children[char]
        return node
```

---

## Next
[Section 4: Binary Search](../../04-algorithms-and-patterns/03-binary-search/lesson.md) — Continuing with core algorithm patterns.
