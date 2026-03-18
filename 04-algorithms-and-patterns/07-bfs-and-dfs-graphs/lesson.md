# 4.7 — BFS & DFS on Graphs

## Prerequisites
- [3.9 — Graphs](../../03-data-structures/09-graphs/lesson.md)
- [4.6 — BFS & DFS on Trees](../06-bfs-and-dfs-trees/lesson.md)

## Section Outline (Detailed)

### 1. Graph Traversal Overview
- Visiting every node exactly once
- Key difference from trees: Graphs can have cycles
- Must track `visited` set to avoid infinite loops

### 2. DFS on Graphs
- Recursive or iterative (with stack)
- Good for: connected components, path finding, cycle detection
- Template: `visited` set + recursive call to neighbors

### 3. BFS on Graphs
- Iterative with queue
- Good for: shortest path (unweighted), level traversal
- Template: queue + visited set + process neighbors

### 4. The `visited` Set
- **Critical**: Without it, infinite loops in cyclic graphs
- Add to visited before/when adding to queue/stack
- For some problems: track currently visiting (gray) vs. completed (black)

### 5. Key Pattern: Connected Components
- Start DFS/BFS from each unvisited node
- Mark all reachable nodes as visited
- Count number of times you start = number of components

### 6. Key Pattern: Shortest Path (Unweighted)
- BFS from source
- Distance = number of edges
- Track distance in queue or separate array

### 7. Key Pattern: Cycle Detection
- **Undirected**: DFS with parent tracking, or Union-Find
- **Directed**: DFS with color marking (white/gray/black), or check for back edges

### 8. Key Pattern: Topological Sort
- For DAGs only
- DFS-based: Post-order, reverse result
- BFS-based (Kahn's): Start with in-degree 0 nodes

### 9. Worked Examples
- LeetCode 200: Number of Islands (grid as graph, BFS or DFS)
- LeetCode 133: Clone Graph (DFS or BFS)
- LeetCode 207: Course Schedule (cycle detection / topological sort)
- LeetCode 994: Rotting Oranges (BFS levels)
- LeetCode 733: Flood Fill (DFS)

### 10. Grids as Implicit Graphs
- Each cell is a node
- Neighbors are adjacent cells (up/down/left/right)
- Use bounds checking: `if (0 <= nr < rows && 0 <= nc < cols)`

### 11. Practice Problems
- LeetCode 200: Number of Islands
- LeetCode 133: Clone Graph
- LeetCode 733: Flood Fill
- LeetCode 994: Rotting Oranges
- LeetCode 207: Course Schedule
- LeetCode 210: Course Schedule II
- LeetCode 79: Word Search (DFS + backtracking)

---

## Code Examples

**DFS Template (Graph):**
```typescript
function dfs(graph: Map<number, number[]>, node: number, visited: Set<number>): void {
    visited.add(node);
    // Process node
    
    for (const neighbor of graph.get(node) || []) {
        if (!visited.has(neighbor)) {
            dfs(graph, neighbor, visited);
        }
    }
}
```

**BFS Template (Graph):**
```python
from collections import deque

def bfs(graph: dict, start: int):
    visited = set([start])
    queue = deque([start])
    
    while queue:
        node = queue.popleft()
        # Process node
        
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
```

---

## Next
[Intervals](../08-intervals/lesson.md) — Merge, insert, and schedule overlapping ranges.