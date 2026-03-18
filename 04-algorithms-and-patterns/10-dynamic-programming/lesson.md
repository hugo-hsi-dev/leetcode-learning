# 4.10 — Dynamic Programming

## Prerequisites
- [4.1 — Recursion](../01-recursion/lesson.md)
- [4.9 — Backtracking](../09-backtracking/lesson.md)
- All of Section 2 (Big O)

## Section Outline (Detailed)

### 1. What Is Dynamic Programming?
- Optimization technique for problems with overlapping subproblems
- Break complex problem into simpler subproblems
- Store results to avoid redundant computation
- "Memoization" (top-down) or "Tabulation" (bottom-up)

### 2. Two Key Properties
- **Overlapping Subproblems**: Same subproblem is solved multiple times
- **Optimal Substructure**: Optimal solution can be built from optimal solutions of subproblems

### 3. When to Use DP
- Counting problems ("how many ways...")
- Optimization problems ("minimum/maximum...")
- "Is it possible..." questions with constraints
- When greedy doesn't work

### 4. The DP Process
1. Identify state (what defines a subproblem?)
2. Define recurrence relation (how do subproblems relate?)
3. Identify base cases
4. Decide: top-down (memo) or bottom-up (tabulation)
5. Implement

### 5. Top-Down (Memoization)
- Start from original problem
- Recurse with caching
- Natural extension of recursion
- Easier to understand for most people

### 6. Bottom-Up (Tabulation)
- Start from base cases
- Fill table from smallest to largest subproblem
- No recursion overhead
- Often more space-efficient

### 7. Classic Problems
- **Climbing Stairs**: `dp[n] = dp[n-1] + dp[n-2]`
- **Fibonacci**: Classic example
- **Coin Change**: `dp[amount] = min(dp[amount - coin]) + 1`
- **Longest Common Subsequence**: `dp[i][j]` based on match/mismatch
- **Knapsack**: `dp[i][w]` = max value with first i items and weight limit w
- **House Robber**: Can't rob adjacent houses

### 8. Pattern: Linear DP
- State: `dp[i]` = solution for first i elements
- Transition: `dp[i]` based on `dp[i-1]`, `dp[i-2]`, etc.
- Examples: Climbing stairs, house robber

### 9. Pattern: Grid/2D DP
- State: `dp[i][j]` = solution at position (i, j)
- Transition: Based on `dp[i-1][j]`, `dp[i][j-1]`, or both
- Examples: Unique paths, LCS, edit distance

### 10. Pattern: Knapsack-style
- State: `dp[i][w]` = best solution using first i items with capacity w
- For each item: include or exclude
- Examples: 0/1 knapsack, unbounded knapsack

### 11. Worked Examples
- LeetCode 70: Climbing Stairs
- LeetCode 198: House Robber
- LeetCode 322: Coin Change
- LeetCode 1143: Longest Common Subsequence
- LeetCode 62: Unique Paths
- LeetCode 139: Word Break

### 12. Common Mistakes
- Not identifying base cases correctly
- Wrong recurrence relation
- Index confusion (0-indexed vs 1-indexed)
- Not handling edge cases (empty input)
- Using global state incorrectly

### 13. Practice Problems
- LeetCode 70: Climbing Stairs
- LeetCode 198: House Robber
- LeetCode 213: House Robber II
- LeetCode 322: Coin Change
- LeetCode 62, 63: Unique Paths I & II
- LeetCode 1143: Longest Common Subsequence
- LeetCode 139: Word Break
- LeetCode 300: Longest Increasing Subsequence

---

## Code Examples

**Climbing Stairs (Top-Down):**
```typescript
function climbStairs(n: number, memo: Map<number, number> = new Map()): number {
    if (n <= 2) return n;
    if (memo.has(n)) return memo.get(n)!;
    
    const result = climbStairs(n - 1, memo) + climbStairs(n - 2, memo);
    memo.set(n, result);
    return result;
}
```

**Climbing Stairs (Bottom-Up):**
```python
def climbStairs(n: int) -> int:
    if n <= 2:
        return n
    
    dp = [0] * (n + 1)
    dp[1] = 1
    dp[2] = 2
    
    for i in range(3, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    
    return dp[n]
```

**Coin Change:**
```typescript
function coinChange(coins: number[], amount: number): number {
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    
    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (i - coin >= 0) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
}
```

---

## Next
[Greedy Algorithms](../11-greedy/lesson.md) — When local optimal leads to global optimal.