# Expert Skill Quality Checklist

Use this checklist during Step 6 (Self-Critique) and before Step 9 (Finalize). A skill should pass all sections before shipping.

## The 4 Core Truths

### 1. Expertise Transfer, Not Instructions

| Check | Question |
|-------|----------|
| [ ] | Does the skill make Claude *think* like an expert, or just follow steps? |
| [ ] | Are there principles/philosophy sections that shape judgment? |
| [ ] | Does following this skill produce expert-level output, not just correct output? |
| [ ] | Would a domain expert read this and think "this person gets it"? |

**Red flags:**
- Heavy "Step 1, Step 2, Step 3" structure
- Procedures without reasoning
- No opinions or strong recommendations
- Could apply to any skill in any domain

### 2. Flow, Not Friction

| Check | Question |
|-------|----------|
| [ ] | Does the skill help produce output directly, or create intermediate steps? |
| [ ] | Can Claude work fluidly with this guidance, or is it fighting the structure? |
| [ ] | Is the skill removing friction from Claude's process? |
| [ ] | Does it feel like onboarding an expert employee, not handing them a manual? |

**Red flags:**
- Elaborate workflows that slow down execution
- Requirements to produce artifacts before the actual output
- Rigid structures that don't fit real-world variation
- Process for process's sake

### 3. Voice Matches Domain

| Check | Question |
|-------|----------|
| [ ] | Does the skill read like a practitioner wrote it? |
| [ ] | Is domain terminology used naturally, not explained pedantically? |
| [ ] | Does the voice have confidence and opinions? |
| [ ] | Would copying phrases from this skill into expert communication feel natural? |

**Red flags:**
- Generic documentation tone ("consider using...", "various options...")
- Over-explaining basic domain concepts
- Hedged language that avoids commitment ("may", "might", "could")
- Reads like a Wikipedia article, not a mentor

### 4. Focused Beats Comprehensive

| Check | Question |
|-------|----------|
| [ ] | Does every section earn its place? |
| [ ] | Is anything included "just in case" that could be cut? |
| [ ] | Would removing 20% make this worse, or just shorter? |
| [ ] | Is the skill ruthlessly constrained to what matters? |

**Red flags:**
- Sections that exist to "cover all bases"
- Content that duplicates what Claude already knows
- Verbose explanations where concise examples would work
- Comprehensive coverage over focused expertise

---

## Content Quality

### Philosophy & Principles

| Check | Question |
|-------|----------|
| [ ] | Is there a clear philosophy section that shapes all other decisions? |
| [ ] | Are principles actionable (guide real decisions) not platitudes (could apply to anything)? |
| [ ] | Do principles have teeth—they exclude some approaches as wrong? |

**Test:** Take a principle and ask "what would this tell me NOT to do?" If nothing, it's too vague.

### Opinions & Taste

| Check | Question |
|-------|----------|
| [ ] | Are strong opinions present and backed by reasoning? |
| [ ] | Are there clear "prefer X over Y" recommendations? |
| [ ] | Is taste communicated through concrete examples, not abstract statements? |
| [ ] | Would following the opinions lead to output an expert would respect? |

**Test:** Can you find at least 3 "don't do X" or "avoid Y" statements with clear reasoning?

### Anti-patterns

| Check | Question |
|-------|----------|
| [ ] | Are common mistakes identified explicitly? |
| [ ] | Is the *why* behind anti-patterns explained? |
| [ ] | Do anti-patterns address things Claude specifically gets wrong without guidance? |
| [ ] | Are there concrete examples of what bad looks like? |

**Test:** Would someone who only read the anti-patterns section already improve significantly?

### Examples

| Check | Question |
|-------|----------|
| [ ] | Are examples real and specific, not generic placeholders? |
| [ ] | Do examples show bad vs. good to calibrate taste? |
| [ ] | Are examples short enough to absorb quickly? |
| [ ] | Do examples demonstrate the expertise being transferred? |

**Test:** Could you hand someone just the examples and they'd understand what good looks like?

---

## Structure Quality

### Progressive Disclosure

| Check | Question |
|-------|----------|
| [ ] | Is SKILL.md < 500 lines (ideally < 300)? |
| [ ] | Is detailed reference material in separate files? |
| [ ] | Does SKILL.md clearly indicate when to read reference files? |
| [ ] | Can Claude work effectively reading only SKILL.md for simple cases? |

### Organization

| Check | Question |
|-------|----------|
| [ ] | Does philosophy/principles come before procedures? |
| [ ] | Are anti-patterns near the top (experts care about what to avoid)? |
| [ ] | Are procedures minimal and only where precision truly required? |
| [ ] | Is there a clear flow from mindset → judgment → execution? |

### Scannability

| Check | Question |
|-------|----------|
| [ ] | Can someone scan headings and understand the skill's structure? |
| [ ] | Are sections digestible (not walls of text)? |
| [ ] | Are the most important things visually prominent? |
| [ ] | Could Claude find what it needs quickly? |

---

## Validation Tests

### The Expert Test

Would a domain expert read this skill and:
1. Nod along in recognition?
2. Trust it as reflecting real expertise?
3. Feel it captures what they'd want to tell a junior?

If the answer is "they'd think it's generic textbook content," the skill needs more expertise.

### The Improvement Test

Have Claude do the task without the skill, then with the skill:
1. Is the output noticeably better with the skill?
2. Does the output feel like it came from someone who understands the domain?
3. Are the specific problems identified in Step 2 (Explore) now addressed?

If the delta isn't obvious, the skill isn't transferring enough expertise.

### The Cut Test

Try removing each section and asking "does this make the skill worse?"
1. If removing a section doesn't hurt, remove it
2. If you're not sure, it probably can go
3. Every section should feel necessary

If you can cut 30% without losing value, the skill is too comprehensive and not focused enough.

### The Voice Test

Read the skill aloud. Does it sound like:
1. A mentor sharing hard-won knowledge? **GOOD**
2. A documentation page explaining procedures? **BAD**
3. A textbook covering all bases? **BAD**
4. An expert colleague giving direct advice? **GOOD**

---

## Final Checklist

Before declaring the skill done:

- [ ] Passes all 4 Core Truths checks
- [ ] Philosophy/principles are actionable and opinionated
- [ ] Anti-patterns are identified with clear reasoning
- [ ] Examples show taste through good vs. bad comparisons
- [ ] Voice sounds like a practitioner
- [ ] Structure puts mindset before procedures
- [ ] Every section earns its place (passes the Cut Test)
- [ ] Expert Test: domain expert would respect this
- [ ] Improvement Test: Claude's output is measurably better
