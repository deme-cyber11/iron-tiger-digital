---
name: clone-website
description: Clone any website into production-ready Next.js 16 code using Firecrawl MCP. Use when users ask to clone, replicate, or recreate a website, landing page, or web component. Triggers on requests like "clone this website", "recreate this page", "copy this design", or "build something like [URL]".
---

# Clone Website Skill

Transform any website into production-ready Next.js 16 code through systematic scraping and analysis.

## Prerequisites

- Firecrawl MCP server configured and running
- Next.js 16 project initialized
- Tailwind CSS v4 installed
- Shadcn UI components available

## Workflow Overview

This skill operates in THREE mandatory phases. Never skip phases or combine them.

---

## Phase 1: Scrape

### 1.1 Identify Target
- Get the exact URL from the user
- Determine scope: full page, specific section, or component only
- Note any section filters (hero only, pricing + footer, etc.)

### 1.2 Execute Scrape
Use Firecrawl MCP to retrieve content:

```
firecrawl_scrape({
  url: "target-url",
  formats: ["markdown", "html"],
  onlyMainContent: true
})
```

### 1.3 Extract Key Elements
From the scraped content, identify:
- Typography (fonts, sizes, weights)
- Color palette (primary, secondary, accent colors)
- Layout structure (grid, flexbox patterns)
- Component hierarchy
- Image assets and their locations
- Interactive elements

---

## Phase 2: Analysis

**CRITICAL: STOP after analysis. Present findings to user before ANY code generation.**

### 2.1 Structure Analysis
Document the page structure:
- Header/navigation pattern
- Hero section layout
- Content sections and their order
- Footer structure
- Responsive breakpoints observed

### 2.2 Design Token Extraction
Create a design system summary:
```
Colors:
- Primary: #xxx
- Secondary: #xxx
- Background: #xxx
- Text: #xxx

Typography:
- Headings: [Font Family], [weights]
- Body: [Font Family], [weights]
- Sizes: [scale]

Spacing:
- Section padding: [values]
- Component gaps: [values]
```

### 2.3 Component Inventory
List all unique components needed:
- [ ] Navbar
- [ ] Hero
- [ ] Feature cards
- [ ] Testimonials
- [ ] Pricing tables
- [ ] CTA sections
- [ ] Footer

### 2.4 Present to User
Show the analysis and ask:
> "I've analyzed [URL]. Here's what I found: [summary]. Ready to proceed with code generation?"

**Wait for user confirmation before Phase 3.**

---

## Phase 3: Code Generation

### 3.1 Generation Sequence
Generate files in this exact order:
1. CSS variables / Tailwind config
2. Layout component
3. Individual components (top to bottom)
4. Main page assembly
5. Image assets to public directory

### 3.2 Technology Stack
All generated code must use:
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Components**: Shadcn UI where applicable
- **Icons**: Lucide React
- **Fonts**: Geist Sans (default) or detected fonts

### 3.3 Code Standards

#### File Structure
```
app/
├── globals.css          # CSS variables, base styles
├── layout.tsx           # Root layout with fonts
├── page.tsx             # Main page
└── components/
    ├── navbar.tsx
    ├── hero.tsx
    ├── features.tsx
    └── footer.tsx
public/
└── images/
    └── [downloaded assets]
```

#### Styling Approach
- Mobile-first responsive design
- Use Tailwind arbitrary values for precision: `w-[347px]`
- Extract colors to CSS variables
- Use `cn()` utility for conditional classes
- Minimal comments (only for non-obvious patterns)

### 3.4 Image Handling

Three-step fallback strategy:
1. **Attempt direct download** from source URL
2. **Use Unsplash alternative** with matching dimensions
3. **Save to** `public/images/` with kebab-case naming

---

## Partial Cloning

Users may request specific sections only:

### Hero Only
- Scrape full page but extract hero HTML/styles only
- Generate single component file

### Multiple Sections
- Extract specified sections
- Generate component files for each
- Provide assembly instructions

### Component Extraction
- Identify the specific component
- Extract styles and structure
- Generate reusable component

---

## Quality Checklist

Before delivering code:

- [ ] All colors extracted to CSS variables
- [ ] Typography matches source
- [ ] Responsive breakpoints implemented
- [ ] Images downloaded or alternatives provided
- [ ] Components are properly typed (TypeScript)
- [ ] No hardcoded values that should be variables
- [ ] Accessibility basics (alt text, semantic HTML)
- [ ] Code compiles without errors
