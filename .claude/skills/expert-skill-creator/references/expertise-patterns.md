# Expertise Transfer Patterns

Patterns for encoding expert knowledge into skills that make Claude think like a practitioner.

## The Philosophy Pattern

Lead with *why* before *what*. Experts don't just know procedures—they understand the principles behind them.

**Structure:**
```markdown
## [Domain] Philosophy

Before [doing the thing], understand [the underlying principle].

[Principle 1]: [Why it matters and how it shapes decisions]
[Principle 2]: [Why it matters and how it shapes decisions]

This philosophy means [concrete implication for the work].
```

**Example (Frontend Design):**
```markdown
## Design Philosophy

Before implementation, establish a bold aesthetic direction.

1. **Purpose drives form**: Every design choice should trace back to user need
2. **Commit to a vision**: Bold maximalism and refined minimalism both work—the enemy is timid middle ground
3. **Differentiation matters**: What element makes this design unforgettable?

This philosophy means rejecting "safe" choices that produce forgettable work.
```

**Example (Code Architecture):**
```markdown
## Architecture Philosophy

Before choosing patterns, understand the forces at play.

1. **Change is the constant**: Optimize for modification, not initial elegance
2. **Boundaries define systems**: The best code lives at well-defined interfaces
3. **Complexity concentrates**: Push it to the edges, keep the core simple

This philosophy means resisting premature abstraction and trusting concrete implementations.
```

## The Taste Pattern

Show don't tell. Experts communicate taste through curated examples of good vs. bad.

**Structure:**
```markdown
## [Domain] Taste

**Avoid:**
- [Bad example 1] — [Why experts avoid it]
- [Bad example 2] — [The amateur tell it reveals]
- [Bad example 3] — [The underlying anti-pattern]

**Prefer:**
- [Good example 1] — [Why experts choose it]
- [Good example 2] — [The signal it sends]
- [Good example 3] — [The underlying pattern]
```

**Example (Typography):**
```markdown
## Typography Taste

**Avoid:**
- Arial, Helvetica — Overused system defaults that signal "didn't think about it"
- Inter, Roboto — The AI-generated-content tell; everyone's default
- "Safe" pairings — Boring combinations that disappear

**Prefer:**
- Space Grotesk, Outfit — Distinctive but readable; shows intentional choice
- Fraunces, Newsreader — Characterful serifs for editorial feel
- Unexpected pairings — Display + body that creates tension and interest
```

**Example (API Design):**
```markdown
## API Taste

**Avoid:**
- `/getUsers`, `/createUser` — Verbs in REST URLs; HTTP already has verbs
- Nested resources 4+ levels deep — `users/1/posts/2/comments/3/likes` is a maze
- Inconsistent pluralization — `/user/1/posts` vs `/users/1/post` breaks trust

**Prefer:**
- Resource-first design — `/users`, `/users/1/posts`; let HTTP verbs do the work
- Flat where possible — `/comments?post_id=2` beats deep nesting
- Consistent conventions — Pick a style and enforce it everywhere
```

## The Anti-pattern Pattern

Define expertise partly by what it excludes. Experts often know what *not* to do before they know what to do.

**Structure:**
```markdown
## What Experts Never Do

### [Anti-pattern Name]

**The Pattern:** [What amateurs commonly do]

**Why It Fails:** [The underlying reason this approach is wrong]

**What Experts Do Instead:** [The alternative approach]

**The Tell:** [How you recognize someone making this mistake]
```

**Example (Error Handling):**
```markdown
## What Experts Never Do

### The Pokemon Handler

**The Pattern:** Wrapping everything in try/catch and swallowing exceptions.
```python
try:
    result = do_complex_thing()
except Exception as e:
    pass  # or: print("error occurred")
```

**Why It Fails:** Hides bugs, makes debugging impossible, corrupts state silently.

**What Experts Do Instead:** Let errors propagate until they reach a layer that can handle them meaningfully. Only catch specific exceptions you know how to recover from.

**The Tell:** `except Exception` or empty catch blocks. Code that never seems to fail but produces wrong results.
```

**Example (Premature Abstraction):**
```markdown
## What Experts Never Do

### The Crystal Ball Abstraction

**The Pattern:** Creating interfaces, factories, and strategy patterns "for flexibility" before any need exists.

**Why It Fails:** Abstractions have carrying cost. Wrong abstractions are worse than no abstraction. You can't predict future requirements.

**What Experts Do Instead:** Write concrete code first. Wait for duplication. Let the right abstraction emerge from actual patterns, not imagined ones.

**The Tell:** Interfaces with single implementations. Factory classes that construct one type. "We might need to..." as justification.
```

## The Heuristic Pattern

Capture the shortcuts experts use. These are the compressed wisdom that takes years to develop.

**Structure:**
```markdown
## Expert Heuristics

### [Heuristic Name]

**The Rule:** [Simple, memorable formulation]

**When to Apply:** [Situations where this heuristic helps]

**The Reasoning:** [Why this shortcut works]

**Exceptions:** [When to ignore this heuristic]
```

**Example (Code Review):**
```markdown
## Expert Heuristics

### The Three Strikes Rule

**The Rule:** Don't abstract until you've written the same code three times.

**When to Apply:** You notice similar code and think "I should extract this."

**The Reasoning:** Two instances might be coincidence. Three reveals a true pattern. By the third time, you understand the real abstraction, not an imagined one.

**Exceptions:** Obvious domain concepts (User, Order) can be abstracted immediately. Security-critical code should be consolidated even with two instances.
```

**Example (Design):**
```markdown
## Expert Heuristics

### The Squint Test

**The Rule:** Squint at your design until it blurs. What you see should still communicate hierarchy and purpose.

**When to Apply:** After completing a design, before declaring it done.

**The Reasoning:** If structure depends on reading text or seeing fine details, you're relying on attention that users won't give.

**Exceptions:** Dense information interfaces (dashboards, code editors) where users have already committed attention.
```

## The Voice Pattern

Write like a practitioner, not documentation. The voice should signal insider knowledge.

**Characteristics:**
- Direct and opinionated, not hedged
- Uses domain terminology naturally
- References shared expert knowledge
- Confident enough to say what's wrong

**Generic documentation voice (avoid):**
> "Consider using appropriate design patterns when structuring your application. Various patterns may be suitable depending on your specific requirements and constraints."

**Practitioner voice (prefer):**
> "Skip the design patterns unless you feel the pain. A switch statement that handles three cases doesn't need a Strategy pattern. When you're copy-pasting the switch for the fourth time, then you've earned the abstraction."

**Generic documentation voice (avoid):**
> "Error messages should be clear and helpful to users. Consider including relevant information that assists in understanding the issue."

**Practitioner voice (prefer):**
> "'Something went wrong' is not an error message, it's an abdication. Show what happened, what the system expected, and what the user can try next. 'Invalid email: expected format user@domain.com' beats 'Validation failed' every time."

## Combining Patterns

Expert skills typically combine multiple patterns:

1. **Open with Philosophy** — Establish the mindset
2. **Show Taste** — Good vs. bad examples
3. **Define Anti-patterns** — What to avoid
4. **Provide Heuristics** — Shortcuts for common decisions
5. **Maintain Voice** — Practitioner throughout

The exact balance depends on the domain. Technical domains may weight heuristics heavily. Creative domains may weight taste and philosophy more.
