# 4.13 — Union-Find (Disjoint Set)

## Prerequisites
- [3.9 — Graphs](../../03-data-structures/09-graphs/lesson.md)
- [4.7 — BFS & DFS on Graphs](../07-bfs-and-dfs-graphs/lesson.md)

## Section Outline (Detailed)

### 1. What Is Union-Find?
- A data structure for tracking which elements belong to the same group (component)
- Two operations: **Union** (merge two groups) and **Find** (which group does an element belong to?)
- Also called "Disjoint Set Union" (DSU)
- Alternative to BFS/DFS for connectivity problems — sometimes simpler, sometimes faster

### 2. When to Use Union-Find vs. BFS/DFS
- **Union-Find**: When you're adding edges/connections incrementally and need to query connectivity
- **BFS/DFS**: When you have the full graph and want to explore it
- Union-Find is better for: "Are X and Y connected?", counting components, detecting cycles in undirected graphs
- BFS/DFS is better for: shortest path, traversal order, path reconstruction

### 3. The Data Structure
- `parent[]` array: `parent[i]` points to i's parent (or itself if it's a root)
- `rank[]` (or `size[]`) array: Used for balancing
- Initially: every element is its own parent (each is its own component)

### 4. Operation: Find
- Follow parent pointers until you reach the root (where `parent[i] === i`)
- The root identifies the component
- **Path compression**: During find, point every visited node directly to the root
- This makes future finds nearly O(1)

### 5. Operation: Union
- Find the roots of both elements
- If they have the same root, they're already connected — do nothing
- If different roots, make one root point to the other
- **Union by rank**: Attach the shorter tree under the taller tree
- This keeps trees balanced

### 6. Complexity
| Operation | Without Optimization | With Path Compression + Union by Rank |
|-----------|---------------------|--------------------------------------|
| Find | O(n) worst case | O(α(n)) ≈ O(1) amortized |
| Union | O(n) worst case | O(α(n)) ≈ O(1) amortized |

- α(n) is the inverse Ackermann function — effectively constant for any practical input
- For interviews: just say "nearly O(1) per operation"

### 7. Key Pattern: Number of Connected Components
- Initialize Union-Find with n elements (n components)
- For each edge, union the two endpoints
- Count remaining unique roots = number of components
- **LeetCode 323: Number of Connected Components** (Premium)
- Can also solve Number of Islands (LC 200) this way

### 8. Key Pattern: Redundant Connection (Cycle Detection)
- **LeetCode 684: Redundant Connection**
- Process edges one by one
- If union returns "already connected" (same root), that edge creates a cycle
- This is the redundant edge

### 9. Key Pattern: Accounts Merge
- **LeetCode 721: Accounts Merge**
- Each email belongs to an account
- If two accounts share an email, they're the same person
- Union accounts that share emails, then group by component

### 10. Implementation Template
- `find(x)`: Return root of x's component (with path compression)
- `union(x, y)`: Merge x's and y's components (with union by rank)
- `connected(x, y)`: Return `find(x) === find(y)`
- `count`: Track number of components (decrement on successful union)

### 11. Worked Examples
- LeetCode 684: Redundant Connection (cycle detection)
- LeetCode 200: Number of Islands (Union-Find approach as alternative to DFS/BFS)
- LeetCode 547: Number of Provinces (connected components)
- LeetCode 721: Accounts Merge (grouping by shared property)

### 12. Common Mistakes
- Forgetting path compression — makes Find O(n) instead of O(1)
- Not checking if already connected before union (double-counting)
- Using Union-Find when BFS/DFS would be simpler and more readable
- Index mapping issues when elements aren't 0-indexed integers

### 13. Practice Problems
- LeetCode 547: Number of Provinces (Medium)
- LeetCode 684: Redundant Connection (Medium)
- LeetCode 200: Number of Islands (Medium — try Union-Find after DFS/BFS)
- LeetCode 721: Accounts Merge (Medium)
- LeetCode 128: Longest Consecutive Sequence (Medium — Union-Find is one approach)
- LeetCode 323: Number of Connected Components (Medium — Premium)

---

## Code Examples

**Union-Find Implementation:**
```typescript
class UnionFind {
    parent: number[];
    rank: number[];
    count: number;  // Number of components

    constructor(n: number) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank = new Array(n).fill(0);
        this.count = n;
    }

    find(x: number): number {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);  // Path compression
        }
        return this.parent[x];
    }

    union(x: number, y: number): boolean {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX === rootY) return false;  // Already connected

        // Union by rank
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
        }

        this.count--;
        return true;
    }

    connected(x: number, y: number): boolean {
        return this.find(x) === this.find(y);
    }
}
```

**Union-Find (Python):**
```python
class UnionFind:
    def __init__(self, n: int):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.count = n  # Number of components

    def find(self, x: int) -> int:
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # Path compression
        return self.parent[x]

    def union(self, x: int, y: int) -> bool:
        root_x = self.find(x)
        root_y = self.find(y)

        if root_x == root_y:
            return False  # Already connected

        # Union by rank
        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        elif self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        else:
            self.parent[root_y] = root_x
            self.rank[root_x] += 1

        self.count -= 1
        return True

    def connected(self, x: int, y: int) -> bool:
        return self.find(x) == self.find(y)
```

**Redundant Connection:**
```typescript
function findRedundantConnection(edges: number[][]): number[] {
    const n = edges.length;
    const uf = new UnionFind(n + 1);  // 1-indexed vertices

    for (const [u, v] of edges) {
        if (!uf.union(u, v)) {
            return [u, v];  // This edge creates a cycle
        }
    }

    return [];  // Should never reach here
}
```

---

## Next
[Section 5: Problem-Solving Framework](../../05-problem-solving-framework/01-the-interview-process.md) — Putting it all together.
