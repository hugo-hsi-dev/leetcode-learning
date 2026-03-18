# 1.2 — Pseudocode & Stepwise Refinement

## Prerequisites
- [1.1 — Reading Problem Statements](01-reading-problem-statements.md)

## Learning Objectives
- Write pseudocode that captures your logic without getting bogged down in syntax
- Use stepwise refinement to go from vague idea → precise algorithm
- Know why pseudocode matters for interviews (hint: interviewers want to see your thinking)

---

## Why Pseudocode?

When you see a problem, the temptation is to immediately start typing code. Resist this.

The single biggest difference between people who struggle with LeetCode and people who don't: **the ones who succeed think before they type.**

Pseudocode is "thinking on paper." It lets you:
1. Focus on **logic** without worrying about syntax errors, semicolons, or type annotations
2. Catch flawed logic **before** you've written 40 lines of code
3. Communicate your approach to an interviewer **before** committing to it
4. Change your approach easily — rewriting pseudocode costs nothing, rewriting code is painful

---

## What Pseudocode Looks Like

Pseudocode is not a programming language. There are no rules. The only requirement is that **you (and a reader) can follow the logic.**

Here's a simple example — finding the maximum value in an array:

```
FUNCTION findMax(array):
    SET max to the first element
    FOR each element in the array:
        IF element is greater than max:
            SET max to element
    RETURN max
```

That's it. No semicolons, no type annotations, no curly braces. Just logic.

### Style guidelines (not rules):
- Use UPPERCASE for keywords: `IF`, `FOR`, `WHILE`, `RETURN`, `SET`
- Use indentation to show nesting
- Use plain English for operations: "add element to result" rather than `result.push(element)`
- Name things descriptively: `currentSum` not `cs`

---

## Stepwise Refinement

Stepwise refinement means starting with a **vague, high-level description** and gradually adding detail until it's precise enough to code.

### Example: "Find the most frequent element in an array"

**Pass 1 — The vague idea:**
```
Count how many times each element appears.
Return the one that appears most.
```

**Pass 2 — More specific:**
```
Create something to track counts for each element.
Go through the array, counting each element.
Go through the counts, find the highest one.
Return that element.
```

**Pass 3 — Pseudocode:**
```
FUNCTION mostFrequent(array):
    CREATE an empty count tracker (key: element, value: count)
    
    FOR each element in array:
        IF element is in the tracker:
            INCREMENT its count
        ELSE:
            SET its count to 1
    
    SET maxCount to 0
    SET maxElement to null
    
    FOR each (element, count) in the tracker:
        IF count > maxCount:
            SET maxCount to count
            SET maxElement to element
    
    RETURN maxElement
```

**Pass 4 — Actual code (TypeScript):**
```typescript
function mostFrequent(arr: number[]): number {
    const counts = new Map<number, number>();
    
    for (const num of arr) {
        counts.set(num, (counts.get(num) ?? 0) + 1);
    }
    
    let maxCount = 0;
    let maxElement = arr[0];
    
    for (const [num, count] of counts) {
        if (count > maxCount) {
            maxCount = count;
            maxElement = num;
        }
    }
    
    return maxElement;
}
```

**Pass 4 — Actual code (Python):**
```python
def most_frequent(arr: list[int]) -> int:
    counts: dict[int, int] = {}
    
    for num in arr:
        counts[num] = counts.get(num, 0) + 1
    
    max_count = 0
    max_element = arr[0]
    
    for num, count in counts.items():
        if count > max_count:
            max_count = count
            max_element = num
    
    return max_element
```

Notice how each pass gets more specific. By the time you're writing code, you're just **translating**, not **thinking**. The thinking was done in the pseudocode stage.

---

## The "Explain It to a 5-Year-Old" Test

If you can't explain your approach in one or two simple sentences, you don't understand it well enough yet.

Before writing pseudocode, try completing this sentence:

> "I'm going to **[action]** by **[method]**."

Examples:
- "I'm going to **find the two numbers that add to the target** by **checking every pair**." (Brute force)
- "I'm going to **find the two numbers that add to the target** by **storing numbers I've seen and looking for their complement**." (Hash map approach)
- "I'm going to **check if the string is a palindrome** by **comparing characters from both ends moving inward**."

If your sentence is longer than two lines, break the problem into sub-problems and explain each one.

---

## Pseudocode in Interviews

In a real interview, pseudocode serves a critical purpose: **it lets the interviewer course-correct you before you waste time coding the wrong approach.**

The process looks like:
1. You read the problem and ask clarifying questions
2. You say: "Here's my approach..." and explain at a high level
3. You write pseudocode on the whiteboard/editor
4. The interviewer says "looks good" or "have you considered X?"
5. **Then** you write real code

If you skip pseudocode and dive into code, two bad things happen:
- The interviewer can't follow your thinking, so they can't help you
- If your approach is wrong, you've wasted 10-15 minutes writing code you'll throw away

---

## Common Pseudocode Anti-Patterns

### Anti-pattern 1: Writing actual code and calling it pseudocode
```
// This is just JavaScript, not pseudocode
for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
}
```

This defeats the purpose. You're still thinking in syntax, not logic.

### Anti-pattern 2: Being too vague
```
Find the answer and return it.
```

This doesn't capture any logic. It's a wish, not a plan.

### Anti-pattern 3: Over-engineering pseudocode
```
DECLARE VARIABLE i OF TYPE INTEGER INITIALIZED TO ZERO
WHILE i IS LESS THAN THE LENGTH OF THE ARRAY DO
    DECLARE CONSTANT current ASSIGNED THE VALUE AT INDEX i OF array
    ...
```

This is more verbose than actual code. Keep it simple.

### The sweet spot:
```
FOR each element in the array:
    IF element equals target:
        RETURN its index
RETURN -1 (not found)
```

Clear, readable, captures the logic, leaves out the syntax.

---

## Worked Example: Check if Array Has Duplicates

**Problem:** Given an array of integers, return `true` if any value appears more than once.

**Step 1 — In our own words:** "Are there any repeated numbers in this array?"

**Step 2 — High-level idea:** "Keep track of numbers I've seen. If I see one I've already seen, there's a duplicate."

**Step 3 — Pseudocode:**
```
FUNCTION hasDuplicates(array):
    CREATE an empty set of "seen" numbers
    
    FOR each number in array:
        IF number is already in "seen":
            RETURN true
        ADD number to "seen"
    
    RETURN false (went through everything, no duplicates)
```

**Step 4 — TypeScript:**
```typescript
function hasDuplicates(nums: number[]): boolean {
    const seen = new Set<number>();
    
    for (const num of nums) {
        if (seen.has(num)) return true;
        seen.add(num);
    }
    
    return false;
}
```

**Step 4 — Python:**
```python
def has_duplicates(nums: list[int]) -> bool:
    seen: set[int] = set()
    
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    
    return False
```

---

## Key Takeaways

1. **Always pseudocode before coding.** It takes 2 minutes and saves 10.
2. **Use stepwise refinement:** vague idea → specific plan → pseudocode → code.
3. **In interviews, pseudocode is a communication tool.** It shows the interviewer your thinking.
4. **Keep pseudocode simple.** If it's longer than the actual code, you're doing it wrong.
5. **The "explain it to a 5-year-old" test** is a great check — if you can't summarize your approach simply, refine your thinking.

---

Next: [1.3 — Tracing Through Examples](03-tracing-through-examples.md)
