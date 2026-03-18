# 4.11 — Greedy Algorithms

## Prerequisites
- All of Section 2 (Big O)
- Basic understanding of DP (for comparison)

## Section Outline (Detailed)

### 1. What Is Greedy?
- Make the locally optimal choice at each step
- Hope that local optimal leads to global optimal
- Simple and fast, but doesn't always work
- Key: Can you prove that greedy is optimal?

### 2. When Does Greedy Work?
- **Greedy choice property**: Local optimal choice leads to global optimal
- **Optimal substructure**: Optimal solution contains optimal solutions to subproblems
- Not all problems have these properties!

### 3. Greedy vs. DP
- **Greedy**: Make a choice, never reconsider
- **DP**: Consider all choices, pick optimal
- Greedy is faster but only works for specific problems
- If greedy doesn't work, you need DP

### 4. Common Greedy Problems
- **Activity Selection**: Choose maximum non-overlapping activities
- **Jump Game**: Can you reach the end?
- **Best Time to Buy/Sell Stock II**: Buy at local minima, sell at local maxima
- **Gas Station**: Where to start to complete circuit?
- **Candy Distribution**: Minimum candies with constraints

### 5. Worked Example: Jump Game
- Keep track of maximum reachable index
- At each step, update: `maxReach = max(maxReach, i + nums[i])`
- If `maxReach < i`, can't reach current position
- If `maxReach >= n-1`, can reach end

### 6. Worked Example: Activity Selection
- Sort activities by end time
- Always pick the activity that ends earliest
- This leaves maximum time for remaining activities

### 7. Worked Example: Gas Station
- Key insight: If total gas < total cost, impossible
- If total gas >= total cost, must be possible
- Start from station where running total is minimum (or use one-pass greedy)

### 8. Proving Greedy Is Correct
- Exchange argument: Show any optimal solution can be transformed into greedy solution without making it worse
- Stay-ahead argument: Show greedy is always "ahead" of any optimal solution

### 9. How to Tell If Greedy Might Work
- You can sort the input and process in order
- Local choices seem independent
- No need to consider previous choices when making current choice

### 10. How to Tell If Greedy Won't Work
- You need to consider multiple possibilities
- Choices affect future options in complex ways
- Classic counterexample: Knapsack (need DP)
- Test greedy on edge cases

### 11. Worked Examples
- LeetCode 55: Jump Game
- LeetCode 45: Jump Game II
- LeetCode 122: Best Time to Buy and Sell Stock II
- LeetCode 134: Gas Station
- LeetCode 435: Non-overlapping Intervals
- LeetCode 452: Minimum Arrows to Burst Balloons

### 12. Practice Problems
- LeetCode 55: Jump Game
- LeetCode 45: Jump Game II
- LeetCode 122: Best Time to Buy and Sell Stock II
- LeetCode 134: Gas Station
- LeetCode 435: Non-overlapping Intervals
- LeetCode 452: Minimum Arrows to Burst Balloons
- LeetCode 406: Queue Reconstruction by Height

---

## Code Examples

**Jump Game:**
```typescript
function canJump(nums: number[]): boolean {
    let maxReach = 0;
    
    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) return false;  // Can't reach this position
        maxReach = Math.max(maxReach, i + nums[i]);
    }
    
    return true;
}
```

**Jump Game II:**
```python
def jump(nums: list[int]) -> int:
    jumps = 0
    current_end = 0
    furthest = 0
    
    for i in range(len(nums) - 1):
        furthest = max(furthest, i + nums[i])
        
        if i == current_end:
            jumps += 1
            current_end = furthest
    
    return jumps
```

**Best Time to Buy/Sell Stock II (Greedy):**
```typescript
function maxProfit(prices: number[]): number {
    let profit = 0;
    
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) {
            profit += prices[i] - prices[i - 1];
        }
    }
    
    return profit;
}
```

---

## Next
[Bit Manipulation](../12-bit-manipulation/lesson.md) — Bitwise operations for efficient solutions.