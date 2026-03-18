# 4.9 — Backtracking

## Prerequisites
- [4.1 — Recursion](../01-recursion/lesson.md)
- [3.7 — Trees](../../03-data-structures/07-trees/lesson.md)

## Section Outline (Detailed)

### 1. What Is Backtracking?
- Systematic enumeration of all possible solutions
- Build solution incrementally, abandon when path is invalid
- "Choose, explore, unchoose" pattern
- It's DFS on an implicit decision tree

### 2. The Backtracking Template
```
function backtrack(path, choices):
    if done:
        add path to results
        return
    
    for choice in choices:
        if choice is valid:
            make choice (add to path)
            backtrack(path, remaining)
            undo choice (remove from path)
```

### 3. Key Components
- **Path**: Current partial solution
- **Choices**: What can we add next?
- **Constraints**: Is this choice valid?
- **Goal**: Have we reached a complete solution?

### 4. The Decision Tree
- Each recursive call is a node in the decision tree
- Each branch is a choice
- Pruning: Don't explore branches that can't lead to valid solution

### 5. Classic Problems
- **Permutations**: All arrangements of elements
- **Combinations**: All ways to choose k elements
- **Subsets**: All possible subsets
- **N-Queens**: Place queens without attacking
- **Word Search**: Find word in grid
- **Combination Sum**: All combinations that sum to target

### 6. Pattern: Permutations
- Choose each element to start, recursively permute the rest
- Track which elements have been used

### 7. Pattern: Combinations/Subsets
- For each position, choose to include or exclude
- Recurse with remaining choices

### 8. Pattern: N-Queens and Constraint Problems
- Place one queen per row
- Check column conflicts and diagonal conflicts
- Backtrack when conflict found

### 9. Optimization: Pruning
- Don't explore paths that can't possibly work
- Sort candidates and skip duplicates
- Use early termination conditions

### 10. Worked Examples
- LeetCode 46: Permutations
- LeetCode 77: Combinations
- LeetCode 78: Subsets
- LeetCode 39: Combination Sum
- LeetCode 79: Word Search
- LeetCode 17: Letter Combinations of a Phone Number

### 11. Practice Problems
- LeetCode 46: Permutations
- LeetCode 47: Permutations II (with duplicates)
- LeetCode 77: Combinations
- LeetCode 78: Subsets
- LeetCode 90: Subsets II (with duplicates)
- LeetCode 39: Combination Sum
- LeetCode 40: Combination Sum II
- LeetCode 79: Word Search
- LeetCode 51: N-Queens (Hard)
- LeetCode 17: Letter Combinations of a Phone Number

---

## Code Examples

**Permutations:**
```typescript
function permute(nums: number[]): number[][] {
    const result: number[][] = [];
    
    function backtrack(path: number[], used: boolean[]) {
        if (path.length === nums.length) {
            result.push([...path]);
            return;
        }
        
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            
            used[i] = true;
            path.push(nums[i]);
            backtrack(path, used);
            path.pop();
            used[i] = false;
        }
    }
    
    backtrack([], Array(nums.length).fill(false));
    return result;
}
```

**Subsets:**
```python
def subsets(nums: list[int]) -> list[list[int]]:
    result = []
    
    def backtrack(start: int, path: list[int]):
        result.append(path[:])  # Add current subset
        
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()
    
    backtrack(0, [])
    return result
```

---

## Next
[Dynamic Programming](../10-dynamic-programming/lesson.md) — Breaking problems into overlapping subproblems.