# 4.6 — BFS & DFS on Trees

## Prerequisites
- [3.7 — Trees](../../03-data-structures/07-trees/lesson.md)
- [3.5 — Queues](../../03-data-structures/05-queues/lesson.md)
- [4.1 — Recursion](../01-recursion/lesson.md)

## Section Outline (Detailed)

### 1. Tree Traversal Overview
- DFS (Depth-First Search): Go deep before going wide
- BFS (Breadth-First Search): Go level by level
- Both visit every node exactly once — O(n) time, O(h) or O(n) space

### 2. DFS Traversals
- **Pre-order (NLR)**: Node, Left, Right
- **In-order (LNR)**: Left, Node, Right
- **Post-order (LRN)**: Left, Right, Node

**When to use each:**
- Pre-order: Copy tree, serialize, get path from root
- In-order: Get sorted values from BST
- Post-order: Delete tree, calculate height/size bottom-up

### 3. BFS Traversal (Level Order)
- Use a queue
- Process all nodes at current level before next level
- Good for: shortest path, level-by-level processing

### 4. DFS Template (Recursive)
```typescript
function dfs(node: TreeNode | null): void {
    if (!node) return;
    // Pre-order: process node here
    dfs(node.left);
    // In-order: process node here
    dfs(node.right);
    // Post-order: process node here
}
```

### 5. BFS Template (Iterative with Queue)
```typescript
function bfs(root: TreeNode | null): number[][] {
    if (!root) return [];
    
    const result: number[][] = [];
    const queue: TreeNode[] = [root];
    
    while (queue.length > 0) {
        const level: number[] = [];
        const levelSize = queue.length;
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;
            level.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.push(level);
    }
    
    return result;
}
```

### 6. Key Pattern: Max Depth
- DFS: `max(depth(left), depth(right)) + 1`
- BFS: Count levels

### 7. Key Pattern: Path Finding
- DFS to explore all paths
- Track current path as you recurse
- Backtrack after exploring

### 8. Key Pattern: Level-Based Problems
- BFS when you need to process level by level
- Right side view: last node in each BFS level
- Zigzag level order: alternate direction

### 9. Worked Examples
- LeetCode 104: Maximum Depth (DFS and BFS)
- LeetCode 102: Level Order Traversal (BFS)
- LeetCode 94: Binary Tree Inorder Traversal
- LeetCode 144: Binary Tree Preorder Traversal
- LeetCode 145: Binary Tree Postorder Traversal
- LeetCode 199: Binary Tree Right Side View (BFS)
- LeetCode 257: Binary Tree Paths (DFS)

### 10. Practice Problems
- LeetCode 104: Maximum Depth of Binary Tree
- LeetCode 102: Binary Tree Level Order Traversal
- LeetCode 94, 144, 145: Inorder, Preorder, Postorder Traversal
- LeetCode 199: Binary Tree Right Side View
- LeetCode 637: Average of Levels in Binary Tree
- LeetCode 257: Binary Tree Paths
- LeetCode 112: Path Sum (DFS)

---

## Next
[BFS & DFS on Graphs](../07-bfs-and-dfs-graphs/lesson.md) — Extending traversal to graphs with cycles.