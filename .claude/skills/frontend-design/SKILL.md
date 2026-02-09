---
name: frontend-design
description: Guide for creating distinctive, production-grade frontend interfaces that prioritize authentic design over generic aesthetics. Use when building web components, pages, applications, and interfaces—including websites, landing pages, dashboards, React components, and HTML/CSS layouts—with creative, polished code and UI design that avoids generic AI aesthetics.
---

# Frontend Design

Create distinctive, production-grade frontend interfaces that prioritize authentic design over generic AI aesthetics.

## Design Philosophy

Before implementation, establish a **bold aesthetic direction** by considering:

1. **Purpose and audience**: What problem does this interface solve? Who uses it?
2. **Tone selection**: Choose between extremes like brutalist, luxury, retro-futuristic, playful, or editorial
3. **Technical constraints**: Framework and performance requirements
4. **Differentiation**: What memorable element makes this design unforgettable?

**Key principle**: Bold maximalism and refined minimalism both work—the key is intentionality, not intensity.

## Critical Design Elements

### Typography

Choose fonts that are beautiful, unique, and interesting—NOT generic defaults:

**Avoid**:
- Arial, Helvetica (overused system fonts)
- Inter, Roboto (overused web defaults)
- Open Sans, Lato (generic choices)

**Prefer**:
- Characterful serifs: Playfair Display, Fraunces, Newsreader
- Distinctive sans-serifs: Space Grotesk, Outfit, Plus Jakarta Sans
- Unique display fonts: Clash Display, Cabinet Grotesk, Satoshi
- Variable fonts for dynamic typography

### Color & Theme

Commit to cohesive palettes using CSS variables:

```css
:root {
  /* Primary palette */
  --color-primary: #...;
  --color-secondary: #...;
  --color-accent: #...;

  /* Semantic colors */
  --color-background: #...;
  --color-surface: #...;
  --color-text: #...;
  --color-text-muted: #...;
}
```

**Guidelines**:
- Use dominant colors with sharp accents
- Avoid cliched color schemes (especially purple gradients)
- Consider unexpected color combinations
- Ensure sufficient contrast for accessibility

### Motion & Animation

Prioritize high-impact animations:

**Essential animations**:
- Staggered page load reveals
- Scroll-triggered effects
- Micro-interactions on hover/focus
- Smooth transitions between states

**Techniques**:
```css
/* Staggered reveal */
.item {
  opacity: 0;
  transform: translateY(20px);
  animation: reveal 0.5s ease forwards;
  animation-delay: calc(var(--index) * 0.1s);
}

@keyframes reveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Spatial Composition

Break away from predictable layouts:

- **Asymmetry**: Intentionally unbalanced layouts
- **Overlap**: Elements that break grid boundaries
- **Diagonal flow**: Non-horizontal visual rhythms
- **Grid-breaking elements**: Occasional rule-breakers for interest
- **Generous whitespace**: Let designs breathe

### Visual Details

Build atmosphere through:

- **Gradients**: Subtle or bold, but intentional
- **Textures**: Grain, noise, patterns for depth
- **Shadows**: Layered, colored, or dramatic
- **Borders**: Creative use beyond simple lines
- **Background effects**: Blurs, shapes, imagery

## What to Avoid

### Generic AI Aesthetics

Do NOT produce designs that look like every other AI-generated interface:

**Avoid**:
- Purple/blue gradient backgrounds
- Generic rounded cards in a grid
- Stock-looking hero sections
- Predictable layouts with no personality
- "Safe" design choices that don't commit to a vision
- Cookie-cutter component patterns

**Instead**:
- Make bold aesthetic choices
- Commit to a specific visual direction
- Vary approaches across projects
- Let the content and context drive design decisions

## Implementation Approach

Match code complexity to the aesthetic vision:

**For maximalist designs**:
- Elaborate animations and effects
- Complex layout systems
- Multiple interactive states
- Rich visual layers

**For minimalist designs**:
- Precision in spacing and typography
- Subtle, refined interactions
- Perfect alignment and proportion
- Restraint with masterful execution

## Framework Considerations

### React/Next.js
- Use CSS-in-JS or Tailwind thoughtfully
- Implement motion with Framer Motion
- Consider server components for performance

### Plain HTML/CSS
- Leverage modern CSS (Grid, Flexbox, Container Queries)
- Use CSS custom properties extensively
- Progressive enhancement approach

### Tailwind CSS
- Extend the default theme significantly
- Create custom utilities for unique effects
- Don't let the framework limit creativity

## Quality Checklist

Before delivering any frontend code:

- [ ] Typography is distinctive and intentional
- [ ] Color palette is cohesive and unique
- [ ] Layout breaks from generic patterns
- [ ] Animations enhance the experience
- [ ] Design commits to a clear aesthetic direction
- [ ] No generic AI-aesthetic patterns
- [ ] Responsive behavior considered
- [ ] Accessibility basics covered (contrast, focus states)