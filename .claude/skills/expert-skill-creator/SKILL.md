---
name: expert-skill-creator
description: Create skills that transfer expertise and taste, not instruction manuals. Use when building high-quality skills that make Claude think like a domain expert rather than follow procedural steps. Triggers on "create expert skill", "build skill with expertise transfer", "make Claude think like an expert", or when existing skills feel generic and procedural.
---

# Expert Skill Creator

Transform domain expertise into skills that make Claude *think* like a practitioner—not follow checklists.

## The 4 Core Truths

| Truth | What It Means |
|-------|---------------|
| **Expertise Transfer, Not Instructions** | Make Claude *think* like an expert, not follow steps |
| **Flow, Not Friction** | Produce output, not intermediate documents |
| **Voice Matches Domain** | Sounds like a practitioner, not documentation |
| **Focused Beats Comprehensive** | Constrain ruthlessly. Every section earns its place |

## Why Most Skills Fail

Generic skills read like instruction manuals:
- "Step 1: Do X. Step 2: Do Y."
- Procedures without judgment
- No opinion, no taste, no expertise
- Claude follows but doesn't *understand*

Expert skills transfer how practitioners think:
- Decision frameworks, not checklists
- Strong opinions backed by experience
- What to avoid and why (anti-patterns)
- The "taste" that separates good from great

**Test**: Would a domain expert read your skill and think "this person gets it"? Or would they think "this is textbook generic"?

## The 10-Step Process

```
1. UNDERSTAND    → What skill? What problem does Claude fail at?
       ↓
2. EXPLORE       → Prompt Claude without guidance. Where does it fail?
       ↓
3. RESEARCH      → Go deep on the domain. Talk to experts. Read the best sources.
       ↓
4. SYNTHESIZE    → Extract principles, heuristics, taste from research
       ↓
5. DRAFT         → Write initial skill embodying the expertise
       ↓
6. SELF-CRITIQUE → Review against quality criteria (see checklist)
       ↓
7. ITERATE       → Fix gaps, get feedback from domain experts
       ↓
8. TEST          → Use skill on real scenarios. Does Claude think like an expert now?
       ↓
9. FINALIZE      → Codify into optimal structure
```

### Step 1: UNDERSTAND

Ask the hard questions:
- What specific problem does Claude struggle with?
- What would an expert do that Claude doesn't?
- What's the gap between "technically correct" and "actually good"?

Bad: "Create a writing skill"
Good: "Claude writes technically correct but bland copy. Experts write with voice, rhythm, and hooks that grab attention."

### Step 2: EXPLORE

Prompt Claude on the target task *without* any skill guidance. Document:
- Where does it take the safe/generic path?
- What expertise does it lack?
- What bad patterns does it fall into?
- What would an expert do differently?

This reveals exactly what your skill needs to address.

### Step 3: RESEARCH

Go deep. Surface-level research produces surface-level skills.

**Sources that transfer expertise:**
- Practitioner blogs and post-mortems
- Expert interviews and talks
- Books by domain masters (not textbooks)
- Forum discussions where experts debate nuance
- Your own domain experience

**Questions to answer:**
- What separates mediocre from excellent in this domain?
- What non-obvious mistakes do beginners make?
- What heuristics do experts use that they rarely articulate?
- What does "taste" look like in this domain?

### Step 4: SYNTHESIZE

Extract the signal from research:

1. **Principles** - The "why" behind expert decisions
2. **Heuristics** - Quick rules that capture expert judgment
3. **Anti-patterns** - What experts avoid and why
4. **Taste markers** - The subtle choices that signal expertise

Transform these into patterns Claude can absorb and apply.

### Step 5: DRAFT

Write the skill embodying synthesized expertise. Follow these patterns:

**Lead with philosophy, not procedure**
```markdown
## Design Philosophy

Before touching code, understand *why* certain choices signal expertise...
```

**Use strong opinions**
```markdown
**Avoid**: Purple gradients, generic hero sections, safe choices

**Prefer**: Bold commitments, unexpected combinations, distinctive character
```

**Show taste through examples**
```markdown
Bad: "Add error handling"
Good: "Fail fast at boundaries, trust internal code. Don't catch errors you can't handle meaningfully."
```

**Include anti-patterns**
```markdown
## What Experts Never Do

- Never X because [expert reasoning]
- Avoid Y—it signals [amateur tell]
```

### Step 6: SELF-CRITIQUE

Review against the quality checklist in `references/quality-checklist.md`.

Key questions:
- Does this read like an expert or a textbook?
- Are opinions strong enough? Backed by reasoning?
- Would following this produce output an expert would respect?
- Is every section earning its place?

### Step 7: ITERATE

Get feedback from domain experts (or simulate their perspective):
- What's missing that an expert would know?
- What's included that doesn't add value?
- Where does it oversimplify?
- Where does it overcomplicate?

### Step 8: TEST

Use the skill on real scenarios:
1. Give Claude a task in the domain
2. Compare output to what an expert would produce
3. Note where expertise doesn't transfer
4. Refine the skill to close gaps

**Success criteria**: Claude's output should make a domain expert say "this is good work" not just "this is technically correct."

### Step 9: FINALIZE

Structure for maximum impact:
- Lead with principles and philosophy
- Put anti-patterns near the top (experts care about what to avoid)
- Procedures only where true precision is needed
- References for deep-dives, not required reading

## Expertise Transfer Patterns

See `references/expertise-patterns.md` for detailed patterns:
- **The Philosophy Pattern**: Lead with why before what
- **The Taste Pattern**: Show don't tell through curated examples
- **The Anti-pattern Pattern**: Define expertise by what it excludes
- **The Heuristic Pattern**: Capture expert shortcuts
- **The Voice Pattern**: Write like a practitioner, not documentation

## Quality Checklist

Before finalizing any expert skill, review against `references/quality-checklist.md`.

Quick check:
- [ ] Would an expert think "this person gets it"?
- [ ] Strong opinions present? Backed by reasoning?
- [ ] Anti-patterns identified? Explained why?
- [ ] Voice sounds like a practitioner?
- [ ] Every section earns its place?
- [ ] Procedures only where precision required?
- [ ] Test with Claude produces expert-level output?

## Skill Structure

```
skill-name/
├── SKILL.md                    # Core expertise transfer
│   ├── Philosophy/Principles   # The "why" - lead with this
│   ├── Anti-patterns           # What experts avoid
│   ├── Heuristics/Taste        # Expert shortcuts and judgment
│   └── Procedures (minimal)    # Only where precision required
└── references/                 # Deep-dives for specific needs
    ├── advanced-patterns.md
    └── domain-specifics.md
```

## Examples of Expertise Transfer

**Generic instruction (bad):**
> "Use appropriate fonts for your design."

**Expertise transfer (good):**
> "Typography is the fastest signal of amateur vs. expert. Avoid: Arial, Helvetica (overused system fonts), Inter, Roboto (AI defaults). Prefer: Space Grotesk, Outfit, Fraunces—fonts with character that most designers don't reach for."

**Generic instruction (bad):**
> "Handle errors appropriately in your code."

**Expertise transfer (good):**
> "Don't catch errors you can't handle meaningfully—it hides bugs. Trust internal code; only validate at system boundaries. The amateur wraps everything in try/catch. The expert lets errors propagate to where they can be handled with context."

**Generic instruction (bad):**
> "Write engaging copy for your audience."

**Expertise transfer (good):**
> "Kill the setup. Amateur copy warms up: 'In today's fast-paced world...' Expert copy lands in the tension: 'Your checkout flow is bleeding $47,000 per month.' First sentence should make them feel something."
