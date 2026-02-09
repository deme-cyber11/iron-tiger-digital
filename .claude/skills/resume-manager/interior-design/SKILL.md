---
name: interior-design
description: Transform room photos into redesigned spaces using Pinterest inspiration images. Use when a user provides a photo of their room AND Pinterest/inspiration images, and wants to (1) visualize what their room could look like redesigned, (2) get a shopping list with real product links to manifest the design, or (3) receive interior design recommendations based on their style preferences. Creates visual mockups as React artifacts and searches the live web for purchasable products.
---

# Interior Design Visualization

Transform a user's room photo into a redesigned space using their Pinterest inspiration, then find real products to purchase.

## Workflow Overview

1. **Analyze** - Study the room photo and Pinterest inspirations
2. **Design** - Create a visual mockup of the redesigned room
3. **Source** - Search the web for real products and compile a shopping list

## Step 1: Analyze Inputs

### Room Photo Analysis

Extract from the user's room photo:
- **Dimensions**: Approximate room size, ceiling height, window/door placement
- **Fixed elements**: Built-ins, architectural features, flooring type, wall color
- **Lighting**: Natural light sources, existing fixtures, light quality
- **Current furniture**: What stays vs. what can be replaced

### Pinterest/Inspiration Analysis

Extract from inspiration images:
- **Style category**: See `references/design-styles.md` for vocabulary
- **Color palette**: Dominant, secondary, and accent colors (extract hex codes)
- **Key pieces**: Statement furniture, lighting, textiles, decor
- **Textures/materials**: Wood tones, metals, fabrics, stone
- **Mood**: Cozy, minimal, luxe, eclectic, industrial, etc.

Synthesize a **Design Brief**:
```
Style: [e.g., "Warm Minimalist with Mid-Century influences"]
Palette: [e.g., "#F5F0E8 (cream), #8B7355 (warm brown), #2C2C2C (charcoal), #B87333 (copper accent)"]
Key Elements: [e.g., "low-profile sofa, sculptural lighting, natural wood, textured throws"]
Must-Keep: [items from current room that work with the new design]
```

## Step 2: Create Visual Mockup

Generate a React artifact that visualizes the redesigned room. The mockup should:

### Visual Approach

Create a **stylized room visualization** using:
- SVG shapes and CSS for architectural elements (walls, windows, floors)
- Positioned furniture representations with realistic proportions
- Color palette applied to walls, furniture, textiles
- Lighting effects (gradients, shadows) to convey mood
- Labels identifying key pieces

### Artifact Structure

```jsx
// Room visualization with:
// - Background representing walls/floor with extracted colors
// - Furniture silhouettes positioned spatially
// - Texture overlays (wood grain patterns, fabric textures via CSS)
// - Lighting mood via gradients and shadows
// - Annotations showing product names/categories
```

**Design quality expectations**: Apply principles from the frontend-design skill—avoid generic aesthetics, use distinctive typography for labels, create atmosphere through gradients and layering. The visualization should feel like a professional mood board, not a basic diagram.

### Include in the Artifact

1. **Room layout view** - Top-down or perspective view showing furniture placement
2. **Color palette display** - Swatches with hex codes
3. **Key pieces list** - Visual callouts for main furniture/decor items
4. **Style notes** - Brief description of the design direction

## Step 3: Source Products

Search the live web for real, purchasable products matching each key piece.

### Search Strategy

For each item in the design, search using:
```
[style descriptor] + [item type] + [material/color] + [optional: price range]
```

**Example searches**:
- "warm minimalist low profile sofa cream boucle"
- "mid century modern walnut coffee table"  
- "sculptural brass arc floor lamp"
- "terracotta ceramic planter large"

See `references/product-search.md` for retailer priorities and search tips.

### Product Requirements

For each product found, capture:
- **Product name**
- **Retailer** (with direct link)
- **Price**
- **Why it fits**: One line connecting it to the design brief

### Output Format

Present the shopping list organized by category:

**Furniture**
| Item | Product | Retailer | Price | Link |
|------|---------|----------|-------|------|
| Sofa | [Name] | [Store] | $X,XXX | [URL] |

**Lighting**
...

**Textiles & Decor**
...

**Paint/Finishes** (if walls need updating)
...

Include a **Total Estimated Budget** at the end.

## Quality Standards

- **Realistic**: Only suggest products that actually exist and are currently available
- **Cohesive**: Every item should connect back to the Pinterest inspiration style
- **Practical**: Consider the room's actual dimensions and fixed elements
- **Varied price points**: When possible, offer good/better/best options
- **Direct links**: Every product must have a working URL to purchase

## Edge Cases

**No Pinterest images provided**: Ask the user to share 2-3 inspiration images, or offer to search Pinterest for styles matching their description.

**Room photo is unclear**: Ask for additional angles or describe what's hard to see.

**Budget constraints**: If mentioned, filter product searches by price and note budget-friendly alternatives.

**Specific retailer preferences**: Prioritize their preferred stores in searches.
