# 3.9 — Graphs

## Prerequisites
- [3.5 — Queues](../05-queues/lesson.md)
- [3.7 — Trees](../07-trees/lesson.md)
- [4.1 — Recursion](../../04-algorithms-and-patterns/01-recursion/lesson.md)
- [4.2 — Sorting](../../04-algorithms-and-patterns/02-sorting/lesson.md)

## Section Outline (Detailed)

### 1. What Is a Graph?
- Definition: A collection of nodes (vertices) connected by edges
- Terminology: vertex, edge, directed/undirected, weighted/unweighted, connected component, degree
- Types: Directed (one-way edges) vs. Undirected (two-way edges)
- Why graphs matter: Social networks, maps/navigation, dependencies, web pages

### 2. Graph Representation
- **Adjacency List**: Dictionary where keys are vertices, values are lists of neighbors
- **Adjacency Matrix**: 2D matrix where matrix[i][j] = 1 if edge exists, 0 otherwise
- When to use each:
  - Adjacency list: Sparse graphs, memory efficient O(V + E)
  - Adjacency matrix: Dense graphs, O(V²) space but O(1) edge lookup
- LeetCode almost always uses adjacency list or edge list as input

### 3. Key Operations
- Add vertex, add edge
- Check if edge exists
- Get all neighbors
- Find all reachable nodes from a source

### 4. Graph Input Formats (LeetCode)
- Edge list: `[[1,2], [2,3], [3,4]]` — pairs of connected vertices
- Adjacency list: `{1: [2,3], 2: [1,3], 3: [1,2]}` — vertex to neighbors
- Matrix: `[[0,1,0],[1,0,1],[0,1,0]]` — 2D grid representation

### 5. Key Pattern: BFS on Graphs
- Use when finding shortest path in unweighted graph
- Use when exploring level by level
- Must use a `visited` set to avoid revisiting
- Template: Queue + visited set + process neighbors

### 6. Key Pattern: DFS on Graphs
- Use when exploring all paths, connected components, cycle detection
- Can be recursive or iterative (with stack)
- Must use `visited` set
- Template: visited set + recursively/process neighbors

### 7. Key Pattern: Connected Components
- For undirected graphs: number of disconnected clusters
- Use DFS/BFS: Start from each unvisited node, mark entire component as visited
- Count number of times you start a new DFS/BFS = number of components

### 8. Key Pattern: Cycle Detection
- Undirected: During DFS, if you reach an already visited node that's not your parent, there's a cycle
- Directed: Use colors (white/gray/black) or recursion stack tracking

### 9. Key Pattern: Topological Sort
- For directed acyclic graphs (DAGs): order vertices so all edges point forward
- **LeetCode 207: Course Schedule** — detect cycle or find topological order
- Kahn's algorithm (BFS): Start with nodes of in-degree 0
- DFS-based: Check for back edges

### 10. Worked Examples
Write full solutions for:
- LeetCode 200: Number of Islands (Essential — grid as graph)
- LeetCode 133: Clone Graph (DFS/BFS on adjacency list)
- LeetCode 207: Course Schedule (Cycle detection / Topological sort)
- LeetCode 733: Flood Fill (DFS/BFS on grid)

### 11. Grids as Graphs
- Treat each cell as a vertex
- Edges connect adjacent cells (up, down, left, right)
- For diagonals: 8 directions instead of 4
- **LeetCode 200: Number of Islands** — Classic example

### 12. Common Mistakes
- Forgetting `visited` set — infinite loops!
- Not handling disconnected graphs
- Confusing directed vs. undirected traversal
- Not checking bounds in grid-based graphs
- Off-by-one in vertex numbering (0-indexed vs. 1-indexed)

### 13. Practice Problems
- LeetCode 200: Number of Islands
- LeetCode 133: Clone Graph
- LeetCode 733: Flood Fill
- LeetCode 207: Course Schedule
- LeetCode 994: Rotting Oranges (BFS levels)
- LeetCode 79: Word Search (DFS backtracking on grid)
- LeetCode 323: Number of Connected Components (LeetCode Premium — but concept is important)

---

## Code Examples to Include

**Adjacency List from Edge List:**
```typescript
function buildGraph(edges: number[][]): Map<number, number[]> {
    const graph = new Map<number, number[]>();
    
    for (const [u, v] of edges) {
        if (!graph.has(u)) graph.set(u, []);
        if (!graph.has(v)) graph.set(v, []);
        graph.get(u)!.push(v);
        graph.get(v)!.push(u);  // For undirected; omit for directed
    }
    
    return graph;
}
```

**BFS Template (Graph):**
```typescript
function bfs(graph: Map<number, number[]>, start: number): number[] {
    const visited = new Set<number>();
    const result: number[] = [];
    const queue: number[] = [start];
    let front = 0;  // Use index instead of shift() which is O(n)
    visited.add(start);
    
    while (front < queue.length) {
        const node = queue[front++];
        result.push(node);
        
        for (const neighbor of graph.get(node) || []) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    
    return result;
}
```

**DFS Template (Graph):**
```python
def dfs(graph: dict, node: int, visited: set):
    visited.add(node)
    for neighbor in graph.get(node, []):
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
```

**Number of Islands (Grid BFS):**
```python
def numIslands(grid: list[list[str]]) -> int:
    if not grid:
        return 0
    
    rows, cols = len(grid), len(grid[0])
    count = 0
    
    def bfs(r, c):
        from collections import deque
        queue = deque([(r, c)])
        grid[r][c] = '0'  # Mark visited
        while queue:
            row, col = queue.popleft()  # O(1) vs pop(0) which is O(n)
            for dr, dc in [(1,0), (-1,0), (0,1), (0,-1)]:
                nr, nc = row + dr, col + dc
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == '1':
                    queue.append((nr, nc))
                    grid[nr][nc] = '0'
    
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                bfs(r, c)
                count += 1
    
    return count
```

---

## Next
[Tries / Prefix Trees](../10-tries/lesson.md) — Efficient string prefix lookups and word dictionaries.