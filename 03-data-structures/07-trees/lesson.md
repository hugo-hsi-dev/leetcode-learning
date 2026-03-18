# 3.7 — Trees

## Prerequisites
- [3.6 — Linked Lists](../06-linked-lists/lesson.md)
- [4.1 — Recursion](../../04-algorithms-and-patterns/01-recursion/lesson.md)
- [4.2 — Sorting](../../04-algorithms-and-patterns/02-sorting/lesson.md)

## Section Outline (Detailed)

### 1. What Is a Tree?
- Definition: Hierarchical data structure with nodes connected by edges
- Terminology: root, parent, child, leaf, depth, height, subtree
- Binary tree: Each node has at most 2 children (left, right)
- Why trees matter: File systems, DOM, databases, expression parsing

### 2. Tree Node Structure
- TypeScript: `class TreeNode { val: number; left: TreeNode | null; right: TreeNode | null; }`
- Python: `class TreeNode: def __init__(self, val=0, left=None, right=None): ...`
- Visualization: tree diagrams

### 3. Binary Tree vs. Binary Search Tree
- Binary Tree: No ordering constraint, just structure
- Binary Search Tree (BST): For every node, left subtree < node < right subtree
- BST enables O(log n) search (if balanced)
- BST property: In-order traversal gives sorted sequence

### 4. Tree Traversals
- **In-order (LNR)**: Left subtree, Node, Right subtree
- **Pre-order (NLR)**: Node, Left subtree, Right subtree  
- **Post-order (LRN)**: Left subtree, Right subtree, Node
- **Level-order (BFS)**: Top to bottom, left to right (uses queue!)
- When to use each:
  - In-order: When you need sorted order (BST)
  - Pre-order: When you need to process node before children (copying, serialization)
  - Post-order: When you need to process children before node (deletion, bottom-up calculation)
  - Level-order: When level matters (right view, max depth BFS)

### 5. Key Pattern: Recursive DFS
- Most tree problems are solved recursively
- Base case: `if (node === null) return ...`
- Recursive case: Process left subtree, right subtree, combine
- Template: `return solve(root.left) + solve(root.right)`

### 6. Key Pattern: Finding Maximum Depth
- **LeetCode 104: Maximum Depth of Binary Tree**
- Recursive: `max(depth(left), depth(right)) + 1`
- Base case: null node has depth 0

### 7. Key Pattern: Checking BST Validity
- **LeetCode 98: Validate Binary Search Tree**
- Not just: `left < root < right`
- Must satisfy: `max(left subtree) < root < min(right subtree)`
- Use min/max bounds that tighten as you recurse down

### 8. Key Pattern: Lowest Common Ancestor
- **LeetCode 236: Lowest Common Ancestor of Binary Tree**
- If root is p or q, return root
- Recurse left and right
- If both found in different subtrees, root is LCA
- If only one found, return that one

### 9. Worked Examples
Write full solutions for:
- LeetCode 104: Max Depth (Essential recursive tree problem)
- LeetCode 226: Invert Binary Tree (Essential recursive manipulation)
- LeetCode 100: Same Tree (Essential comparison)
- LeetCode 98: Validate BST
- LeetCode 102: Level Order Traversal (BFS)
- LeetCode 236: Lowest Common Ancestor

### 10. Common Mistakes
- Forgetting base case (null handling)
- Confusing tree type (binary tree vs. BST)
- Not handling empty tree (root is null)
- Off-by-one in depth calculations
- Not considering BST properties (assuming valid BST when it might not be)
- Confusing inorder/preorder/postorder

### 11. Practice Problems
- LeetCode 104: Maximum Depth of Binary Tree
- LeetCode 226: Invert Binary Tree
- LeetCode 100: Same Tree
- LeetCode 101: Symmetric Tree
- LeetCode 102: Binary Tree Level Order Traversal
- LeetCode 98: Validate Binary Search Tree
- LeetCode 236: Lowest Common Ancestor
- LeetCode 124: Binary Tree Maximum Path Sum (Hard - save for later)

---

## Code Examples to Include

**TypeScript Node Definition:**
```typescript
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);
    }
}
```

**Max Depth (Recursive):**
```typescript
function maxDepth(root: TreeNode | null): number {
    if (root === null) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
```

**Level Order (BFS with Queue):**
```typescript
function levelOrder(root: TreeNode | null): number[][] {
    if (root === null) return [];
    
    const result: number[][] = [];
    const queue: TreeNode[] = [root];
    
    let front = 0;  // Use index instead of shift() which is O(n)
    while (front < queue.length) {
        const level: number[] = [];
        const levelSize = queue.length - front;
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue[front++];
            level.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.push(level);
    }
    
    return result;
}
```

**Validate BST:**
```python
def isValidBST(root: TreeNode) -> bool:
    def validate(node, low, high):
        if not node:
            return True
        if node.val <= low or node.val >= high:
            return False
        return validate(node.left, low, node.val) and validate(node.right, node.val, high)
    
    return validate(root, float('-inf'), float('inf'))
```

---

## Next
[Heaps & Priority Queues](../08-heaps/lesson.md) — Top K problems, scheduling, min/max tracking.