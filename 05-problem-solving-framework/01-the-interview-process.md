# 5.1 — The Interview Problem-Solving Process

## Prerequisites
- All of Sections 1-4

## Section Outline (Detailed)

### 1. The 6-Step Process
1. **Clarify** — Understand the problem completely
2. **Examples** — Work through examples by hand
3. **Brute Force** — Start with the simplest solution
4. **Optimize** — Find a better approach
5. **Code** — Implement the solution
6. **Test** — Verify correctness

### 2. Step 1: Clarify (2-3 minutes)
- Restate the problem in your own words
- Ask about inputs: What type? Size constraints? Empty input?
- Ask about outputs: What to return? What if no solution?
- Ask about edge cases: Duplicates? Negative numbers? Empty?
- Clarify any ambiguity in the problem statement

**Good questions:**
- "Can the input be empty?"
- "What should I return if there's no valid answer?"
- "Are there duplicate values?"
- "What's the range of input values?"

### 3. Step 2: Examples (2-3 minutes)
- Work through at least 2-3 examples by hand
- Include a normal case and an edge case
- Use the examples to understand the pattern
- Trace through what the algorithm would do

**Example types:**
- Normal case: Typical input
- Edge case: Empty, single element, smallest possible
- Boundary case: Maximum values, duplicates, all same

### 4. Step 3: Brute Force (3-5 minutes)
- Describe the simplest solution first
- State the time and space complexity
- Don't code yet— just describe
- This establishes a baseline and shows you can solve it

**Say out loud:**
- "The brute force approach would be..."
- "This gives us O(n²) time complexity..."
- "Can we do better?"

### 5. Step 4: Optimize (5-10 minutes)
- Identify the bottleneck in brute force
- Apply patterns: "Can we use a hash map?" "Is this a two-pointer problem?"
- Consider time-space tradeoffs
- If stuck, mention what you're thinking and ask for hints

**Optimization strategies:**
- Brute force O(n²) → Hash map for O(n)
- Brute force O(n) search → Binary search for O(log n)
- Brute force check all → Greedy or DP if applicable
- Multiple passes → Single pass with extra space

### 6. Step 5: Code (10-15 minutes)
- Write clean, well-named code
- Talk through what you're doing
- Handle edge cases (but don't over-engineer)
- Use meaningful variable names
- Add comments for complex logic

### 7. Step 6: Test (3-5 minutes)
- Trace through code with examples from Step 2
- Check edge cases explicitly
- Look for off-by-one errors
- Verify the logic for loop conditions

**Testing checklist:**
- Does it handle empty input?
- Does it handle single element?
- Does it handle the expected edge cases?
- Are all branches of conditionals reached?

### 8. Time Management
- Total time: ~35-40 minutes per problem
- Clarify: 2-3 min
- Examples: 2-3 min
- Brute force: 3-5 min
- Optimize: 5-10 min
- Code: 10-15 min
- Test: 3-5 min

### 9. What If You Get Stuck?
- Don't go silent— talk through what you're thinking
- "I'm considering X, but it seems like it won't work because..."
- "I think this might be a two-pointer problem, but I'm not sure how to..."
- Ask: "Can I get a hint on how to handle X?"
- Start coding the brute force if stuck on optimization

### 10. Interviewer Communication
- Think out loud — they want to see your process
- It's okay to say "let me think about this"
- It's okay to ask "would X approach work?"
- Don't pretend to know — ask questions if unclear
- Be honest: "I haven't seen this exact problem before, but..."

### 11. Common Pitfalls
- Jumping to code too fast
- Not asking clarifying questions
- Going silent when stuck
- Not testing after coding
- Over-engineering the solution
- Panic when the first approach doesn't work

---

## Key Takeaways
1. Follow the 6-step process: Clarify → Examples → Brute Force → Optimize → Code → Test
2. Communicate your thinking throughout
3. Start with brute force, then optimize
4. Test your code before saying "done"
5. Ask clarifying questions — it shows thoughtfulness