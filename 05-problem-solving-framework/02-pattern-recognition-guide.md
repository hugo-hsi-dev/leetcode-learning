# 5.2 — Pattern Recognition Guide

## Prerequisites
- All of Sections 1-4

## Section Outline (Detailed)

### 1. Why Pattern Recognition Matters
- Most interview problems follow known patterns
- Recognizing the pattern → know which technique to apply
- Pattern recognition speeds up your solving process
- After ~100 problems, you'll start seeing patterns automatically

### 2. The Pattern Decision Tree

**Step 1: Look at input type**
- Array? → Two pointers, sliding window, hash map, binary search
- String? → Same as array, plus trie for prefix problems
- Linked list? → Two pointers (fast/slow), dummy head
- Tree? → DFS (recursive), BFS (queue), recursion
- Graph? → BFS/DFS, topological sort, union-find
- Matrix/Grid? → Treat as graph, BFS/DFS
- Intervals? → Sort + sweep, merge, or greedy by end time

**Step 2: Look at what's being asked**
- Find a pair? → Hash map or two pointers (if sorted)
- Find subarray/substring? → Sliding window
- Find shortest path? → BFS (unweighted), Dijkstra (weighted)
- Find all combinations? → Backtracking
- Optimize (min/max)? → DP, greedy, or binary search on answer
- Count something? → DP or combinatorics
- Check existence? → Hash set, BFS/DFS, or early termination
- Merge/schedule ranges? → Sort intervals + sweep or greedy
- Group connected things? → Union-Find or BFS/DFS
- Find unique / find missing? → XOR (bit manipulation) or hash set
- Prefix matching? → Trie

### 3. Array Patterns
| Problem Keyword | Pattern |
|----------------|---------|
| Find pair | Hash map (O(n)) or two pointers (O(n log n) sort + O(n)) |
| Find subarray | Sliding window or prefix sum |
| Max/min subarray | Kadane's algorithm or DP |
| Find k-th something | Heap or quickselect |
| Sort first | Two pointers often works after sorting |
| In-place | Two pointers, careful indexing |

### 4. String Patterns
| Problem Keyword | Pattern |
|----------------|---------|
| Palindrome | Two pointers from ends |
| Anagram | Character count (hash map or array) |
| Substring search | Sliding window, KMP (advanced) |
| Longest substring with constraint | Sliding window with hash set/map |
| Parse/validate | Stack |

### 5. Tree Patterns
| Problem Keyword | Pattern |
|----------------|---------|
| Traversal | DFS (recursive) or BFS (queue) |
| Path finding | DFS with path tracking |
| Level-by-level | BFS |
| Depth/height | DFS with recursion |
| Validate BST | DFS with min/max bounds |
| Lowest ancestor | DFS with recursion |

### 6. Graph Patterns
| Problem Keyword | Pattern |
|----------------|---------|
| Connected components | DFS or BFS |
| Shortest path (unweighted) | BFS |
| Cycle detection | DFS with visited states |
| Topological sort | DFS post-order or Kahn's (BFS) |
| Islands/count regions | DFS/BFS on grid |

### 7. Interval Patterns
| Problem Keyword | Pattern |
|----------------|---------|
| Merge overlapping | Sort by start + linear merge |
| Insert interval | Three-phase: before, merge, after |
| Schedule / non-overlapping | Greedy: sort by end time |
| How many rooms/resources | Sweep line or min-heap of end times |
| Intersection of intervals | Two pointers on sorted interval lists |

### 8. Trie / Prefix Patterns
| Problem Keyword | Pattern |
|----------------|---------|
| Prefix search | Trie with startsWith |
| Autocomplete | Trie + DFS from prefix node |
| Word search in grid | Trie + grid DFS (prune branches) |
| Wildcard matching | Trie with recursive DFS at '.' nodes |

### 9. Bit Manipulation Patterns
| Problem Keyword | Pattern |
|----------------|---------|
| Find single/unique element | XOR all elements |
| Power of two | `n & (n - 1) === 0` |
| Count bits | `n & (n - 1)` removes lowest set bit |
| Missing number | XOR or math (expected sum - actual sum) |

### 10. Union-Find Patterns
| Problem Keyword | Pattern |
|----------------|---------|
| Connected components | Union edges, count roots |
| Is X connected to Y | Find(x) === Find(y) |
| Redundant edge / cycle | Union returns "already connected" |
| Group by shared property | Union elements that share a key |

### 11. Optimization Patterns
| Problem Keyword | Pattern |
|----------------|---------|
| Minimize/Maximize | DP, greedy, or binary search on answer |
| With constraints | Usually DP |
| Without "memory" | Usually greedy |
| Find in sorted array | Binary search |
| Find k-th | Heap or quickselect |

### 12. Keyword Triggers
- "Two numbers add to target" → Hash map or two pointers
- "Longest/shortest subarray with condition" → Sliding window
- "All permutations/combinations/subsets" → Backtracking
- "Minimum/maximum from sequence" → DP
- "Can we reach/Is it possible" → BFS/DFS
- "Sort the array" → After sorting, two pointers often work
- "In O(n log n) time or better" → Sort first, or use special data structure
- "In O(n) time" → Hash map or single pass
- "Merge intervals/overlapping ranges" → Sort by start + merge
- "How many rooms/minimum resources" → Sweep line or heap
- "Words with prefix/autocomplete" → Trie
- "Every element appears twice except one" → XOR
- "Are these nodes connected" → Union-Find or BFS/DFS
- "Group accounts/equivalent items" → Union-Find

### 13. When Patterns Don't Fit
- If no pattern clearly applies, start with brute force
- Think about what makes brute force slow
- Look for what you can cache (memoization)
- Consider if sorting changes anything
- Try working through small examples to find a pattern

### 14. Pattern Combination
- Many problems combine multiple patterns
- Example: "Number of Islands" = BFS/DFS on grid representation
- Example: "Word Ladder" = BFS on graph (each word is a node)
- Example: "Merge Intervals" = Sort + linear scan

### 15. Building Pattern Recognition
- Solve problems by pattern, not randomly
- When you solve a problem, identify which pattern it used
- Keep a "pattern journal" — problem → pattern used
- After 50-100 problems, patterns become automatic

---

## Common Pattern Combinations

1. **Sort + Two Pointers**: Many pair-finding problems
2. **Hash Map + Sliding Window**: Distinct elements in window
3. **DFS + Backtracking**: Path finding, permutations
4. **BFS + Queue**: Level-order, shortest path
5. **Binary Search + Custom Condition**: Optimization problems
6. **DP + Memoization**: Overlapping subproblems
7. **Heap + K elements**: Top-K problems
8. **Sort + Greedy**: Interval scheduling, non-overlapping
9. **Trie + DFS**: Word search in grid, autocomplete
10. **Union-Find + Edge Processing**: Cycle detection, components