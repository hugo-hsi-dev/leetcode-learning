# 4.12 — Bit Manipulation

## Prerequisites
- [3.1 — Arrays](../../03-data-structures/01-arrays/lesson.md)
- All of Section 2 (Big O)

## Section Outline (Detailed)

### 1. Why Bit Manipulation?
- Some problems are impossible without it, trivial with it
- Extremely fast — operates at the hardware level
- Common in interviews: typically one "trick" you either know or don't
- Usually appears as Easy or Medium problems

### 2. Binary Number Basics
- Every number is stored as bits (0s and 1s)
- `5` in binary = `101`, `7` = `111`, `12` = `1100`
- JS: `Number` uses 64-bit floats, bitwise ops treat as 32-bit signed integers
- Python: Integers have arbitrary precision, but bitwise ops work the same
- Convert to binary: JS `(5).toString(2)` → `"101"`, Python `bin(5)` → `"0b101"`

### 3. Bitwise Operators
| Operator | Symbol | Description | Example |
|----------|--------|-------------|---------|
| AND | `&` | Both bits must be 1 | `5 & 3` = `1` (101 & 011 = 001) |
| OR | `\|` | Either bit can be 1 | `5 \| 3` = `7` (101 \| 011 = 111) |
| XOR | `^` | Bits must differ | `5 ^ 3` = `6` (101 ^ 011 = 110) |
| NOT | `~` | Flip all bits | `~5` = `-6` (inverts all 32 bits) |
| Left Shift | `<<` | Shift bits left (multiply by 2) | `5 << 1` = `10` |
| Right Shift | `>>` | Shift bits right (divide by 2) | `5 >> 1` = `2` |

### 4. Key XOR Properties
- `a ^ a = 0` — any number XOR itself is 0
- `a ^ 0 = a` — any number XOR 0 is itself
- XOR is commutative and associative: order doesn't matter
- This is the foundation for the "Single Number" trick

### 5. Key Pattern: Find the Single Number
- **LeetCode 136: Single Number**
- Every element appears twice except one — find it
- XOR all elements together: duplicates cancel out, leaving the single number
- Time: O(n), Space: O(1) — no hash map needed

### 6. Key Pattern: Check if Power of Two
- **LeetCode 231: Power of Two**
- A power of 2 in binary has exactly one `1` bit: `1, 10, 100, 1000...`
- Trick: `n & (n - 1)` removes the lowest set bit
- If `n > 0 && (n & (n - 1)) === 0`, it's a power of 2

### 7. Key Pattern: Count Set Bits (Hamming Weight)
- **LeetCode 191: Number of 1 Bits**
- Method 1: Check each bit with `n & 1`, then shift right
- Method 2: `n & (n - 1)` removes lowest set bit — repeat until 0
- Method 2 is faster: only loops once per set bit

### 8. Key Pattern: Counting Bits for All Numbers
- **LeetCode 338: Counting Bits**
- Build up using DP: `bits[i] = bits[i >> 1] + (i & 1)`
- Or use: `bits[i] = bits[i & (i - 1)] + 1`

### 9. Common Bit Tricks
- Check if bit `k` is set: `(n >> k) & 1`
- Set bit `k`: `n | (1 << k)`
- Clear bit `k`: `n & ~(1 << k)`
- Toggle bit `k`: `n ^ (1 << k)`
- Check if even/odd: `n & 1` (0 = even, 1 = odd)
- Multiply by 2: `n << 1`
- Divide by 2: `n >> 1`

### 10. Worked Examples
- LeetCode 136: Single Number (XOR all elements)
- LeetCode 191: Number of 1 Bits (count set bits)
- LeetCode 338: Counting Bits (DP with bit manipulation)
- LeetCode 231: Power of Two (n & (n-1) trick)

### 11. Common Mistakes
- Forgetting JS bitwise ops work on 32-bit signed integers (not 64-bit)
- Not handling negative numbers (right shift preserves sign in JS/Python)
- Using `==` instead of `===` when comparing bit results in JS
- Operator precedence: `&` and `|` have lower precedence than `==` in many languages — use parentheses

### 12. Practice Problems
- LeetCode 136: Single Number (Easy)
- LeetCode 191: Number of 1 Bits (Easy)
- LeetCode 231: Power of Two (Easy)
- LeetCode 338: Counting Bits (Easy)
- LeetCode 268: Missing Number (Easy — can solve with XOR)
- LeetCode 371: Sum of Two Integers (Medium — add without `+` operator)
- LeetCode 190: Reverse Bits (Easy)

---

## Code Examples

**Single Number (XOR):**
```typescript
function singleNumber(nums: number[]): number {
    let result = 0;
    for (const num of nums) {
        result ^= num;  // Duplicates cancel out
    }
    return result;
}
```

**Single Number (Python):**
```python
def singleNumber(nums: list[int]) -> int:
    result = 0
    for num in nums:
        result ^= num
    return result
```

**Number of 1 Bits:**
```typescript
function hammingWeight(n: number): number {
    let count = 0;
    while (n !== 0) {
        n &= (n - 1);  // Remove lowest set bit
        count++;
    }
    return count;
}
```

---

## Next
[Union-Find](../13-union-find/lesson.md) — Efficiently track connected components.
