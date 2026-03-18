# 4.8 — Intervals

## Prerequisites
- [3.1 — Arrays](../../03-data-structures/01-arrays/lesson.md)
- [4.2 — Sorting](../02-sorting/lesson.md)

## Section Outline (Detailed)

### 1. What Are Interval Problems?
- An interval is a pair `[start, end]` representing a range
- Common in scheduling, calendar, and range-merging problems
- Very high frequency in interviews — often asked at Medium level
- Core insight: Sort by start time, then process in order

### 2. Interval Representation
- Array of pairs: `[[1,3], [2,6], [8,10], [15,18]]`
- Each interval: `[start, end]` where `start <= end`
- Intervals may be open or closed — on LeetCode, typically closed `[start, end]`
- Important: Clarify if intervals are inclusive or exclusive of endpoints

### 3. Key Concept: Overlap Detection
- Two intervals `[a, b]` and `[c, d]` overlap if `a <= d && c <= b`
- Equivalently, they do NOT overlap if `b < c || d < a`
- Overlap allows merging: merged interval is `[min(a, c), max(b, d)]`

### 4. Key Pattern: Merge Intervals
- **LeetCode 56: Merge Intervals**
- Sort intervals by start time
- Initialize result with the first interval
- For each subsequent interval:
  - If it overlaps with the last result interval, merge them
  - Otherwise, add it as a new interval
- Time: O(n log n) for sort + O(n) scan = O(n log n)

### 5. Key Pattern: Insert Interval
- **LeetCode 57: Insert Interval**
- Three phases: add intervals before the new one, merge overlapping, add intervals after
- No sorting needed (input is already sorted)
- Time: O(n)

### 6. Key Pattern: Interval Scheduling (Maximum Non-overlapping)
- **LeetCode 435: Non-overlapping Intervals** (how many to remove?)
- **LeetCode 452: Minimum Number of Arrows to Burst Balloons**
- Sort by end time (greedy choice: always pick the interval that ends earliest)
- Count overlaps — each overlap means one interval must be removed
- This is the greedy "activity selection" problem in disguise

### 7. Key Pattern: Meeting Rooms
- **LeetCode 252: Meeting Rooms** (can one person attend all?)
  - Sort by start, check if any overlap
- **LeetCode 253: Meeting Rooms II** (how many rooms needed?)
  - Use a min-heap of end times, or sweep line with events
  - Alternative: Separate start/end arrays, sort both, use two pointers

### 8. Key Pattern: Sweep Line
- Convert intervals into events: `+1` at start, `-1` at end
- Sort events by time
- Sweep through, tracking active count
- Maximum active count = answer for "how many overlap at once"
- Useful for Meeting Rooms II and similar problems

### 9. Worked Examples
- LeetCode 56: Merge Intervals (Essential — sort + merge)
- LeetCode 57: Insert Interval (Three-phase approach)
- LeetCode 435: Non-overlapping Intervals (Greedy by end time)
- LeetCode 253: Meeting Rooms II (Sweep line or heap)

### 10. Common Mistakes
- Sorting by start when you should sort by end (or vice versa)
- Off-by-one with inclusive vs. exclusive endpoints
- Not handling the edge case of a single interval
- Forgetting that the input may not be sorted
- Mutating the input array when you shouldn't

### 11. Practice Problems
- LeetCode 56: Merge Intervals (Medium)
- LeetCode 57: Insert Interval (Medium)
- LeetCode 252: Meeting Rooms (Easy — LeetCode Premium)
- LeetCode 253: Meeting Rooms II (Medium — LeetCode Premium)
- LeetCode 435: Non-overlapping Intervals (Medium)
- LeetCode 452: Minimum Number of Arrows to Burst Balloons (Medium)
- LeetCode 986: Interval List Intersections (Medium)

---

## Code Examples

**Merge Intervals:**
```typescript
function merge(intervals: number[][]): number[][] {
    intervals.sort((a, b) => a[0] - b[0]);
    const result: number[][] = [intervals[0]];

    for (let i = 1; i < intervals.length; i++) {
        const last = result[result.length - 1];
        const curr = intervals[i];

        if (curr[0] <= last[1]) {
            // Overlapping — merge by extending end
            last[1] = Math.max(last[1], curr[1]);
        } else {
            result.push(curr);
        }
    }

    return result;
}
```

**Merge Intervals (Python):**
```python
def merge(intervals: list[list[int]]) -> list[list[int]]:
    intervals.sort(key=lambda x: x[0])
    result = [intervals[0]]

    for start, end in intervals[1:]:
        last = result[-1]

        if start <= last[1]:
            # Overlapping — merge by extending end
            last[1] = max(last[1], end)
        else:
            result.append([start, end])

    return result
```

**Non-overlapping Intervals (Greedy):**
```typescript
function eraseOverlapIntervals(intervals: number[][]): number {
    // Sort by end time — greedy: keep the interval that ends earliest
    intervals.sort((a, b) => a[1] - b[1]);
    let count = 0;
    let prevEnd = -Infinity;

    for (const [start, end] of intervals) {
        if (start >= prevEnd) {
            // No overlap — keep this interval
            prevEnd = end;
        } else {
            // Overlap — remove this interval
            count++;
        }
    }

    return count;
}
```

---

## Next
[Backtracking](../09-backtracking/lesson.md) — Exhaustive search with pruning.
