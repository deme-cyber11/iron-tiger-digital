# Rank & Rent Site Template Blueprint

A reusable template system for generating lead generation websites. Built from the Orlando Concrete Driveway site.

## Quick Start

```bash
# 1. Copy config.json and customize for your new site
cp config.json my-new-site-config.json

# 2. Edit the config with your business details
# (see Configuration section below)

# 3. Generate the site
node generate-site.js my-new-site-config.json ./output/my-new-site

# 4. Deploy to GitHub Pages
```

## Directory Structure

```
template-blueprint/
├── config.json              # Master configuration (edit for each new site)
├── generate-site.js         # Site generator script
├── template.html            # Main site template (692 placeholders)
├── 404-template.html        # Error page template
├── sitemap-template.xml     # XML sitemap template
├── robots-template.txt      # Robots.txt template
├── manifest-template.json   # PWA manifest template
├── CNAME-template           # GitHub Pages domain file
└── README.md                # This file
```

## Configuration Guide

Edit `config.json` for each new site. Here's what to change:

### Business Info
```json
{
  "business": {
    "name": "Tampa Roofing Experts",          // Full business name
    "shortName": "TRE",                        // 3-4 letter abbreviation
    "tagline": "Licensed & Insured",           // Main tagline
    "foundedYear": "2015",                     // Year established
    "warrantyYears": "10",                     // Warranty offered
    "priceRange": "$$"                         // $, $$, $$$, or $$$$
  }
}
```

### Contact Info
```json
{
  "contact": {
    "phone": "(813) 555-1234",                 // Display format
    "phoneRaw": "8135551234",                  // Numbers only (for tel: links)
    "email": "contact@tamparoofing.com",       // Contact email
    "domain": "tamparoofing.com",              // Domain without https
    "domainFull": "https://tamparoofing.com"   // Full URL with https
  }
}
```

### Location Info
```json
{
  "location": {
    "primaryCity": "Tampa",                    // Main city name
    "region": "Tampa Bay Area",                // Regional name
    "state": "Florida",                        // Full state name
    "stateCode": "FL",                         // 2-letter state code
    "latitude": "27.9506",                     // GPS latitude
    "longitude": "-82.4572",                   // GPS longitude
    "streetAddress": "123 Main Street",        // Business address
    "postalCode": "33602",                     // ZIP code
    "areaCode": "813",                         // Phone area code
    "serviceRadius": "30 miles",               // Service area radius
    "geoRegion": "US-FL"                       // ISO geo region
  }
}
```

### Service Type
```json
{
  "service": {
    "primary": "roofing",                      // e.g., "roofing", "plumbing"
    "primaryPlural": "roofing services",
    "primaryCapitalized": "Roofing",
    "primaryPluralCapitalized": "Roofing Services",
    "secondary": "roof",                       // Related noun
    "secondaryCapitalized": "Roof",
    "tertiary": "roof",                        // Another related term
    "tertiaryPlural": "roofs",
    "tertiaryCapitalized": "Roof",
    "tertiaryPluralCapitalized": "Roofs",
    "industry": "home improvement",
    "category": "Contractor"
  }
}
```

### Service Areas (12 locations)
```json
{
  "serviceAreas": [
    {
      "id": "downtown-tampa",                  // URL-friendly ID
      "name": "Downtown Tampa",                // Full display name
      "shortName": "Downtown",                 // Short name
      "description": "Urban core with...",     // Area description
      "neighborhoods": ["Ybor City", "..."]    // Neighborhood list
    }
    // ... 11 more areas
  ]
}
```

### Pricing (for blog cost guides)
```json
{
  "pricing": {
    "perSqFtLow": "5",                        // Low end $/sq ft
    "perSqFtHigh": "15",                      // High end $/sq ft
    "typicalSqFt": "2000",                    // Typical project size
    "typicalLow": "10000",                    // Low total estimate
    "typicalHigh": "30000"                    // High total estimate
  }
}
```

### SEO & Tracking
```json
{
  "seo": {
    "gaId": "G-XXXXXXXXXX",                   // Google Analytics ID
    "gscVerification": "YOUR_CODE",           // Search Console code
    "ogImage": "/images/og-image.jpg"         // Social share image
  }
}
```

### Design Colors (optional customization)
```json
{
  "design": {
    "colorPrimary": "#2D3436",                // Dark/header color
    "colorSecondary": "#C4704A",              // Accent/CTA color
    "colorAccent": "#636E72",                 // Secondary accent
    "colorBackground": "#F5F3EF",             // Page background
    "colorSurface": "#E8E4DD",                // Card/section bg
    "colorText": "#1A1A1A",                   // Body text
    "colorTextMuted": "#6B6B6B",              // Secondary text
    "colorTextLight": "#F5F3EF",              // Light text on dark
    "colorBorder": "#D1CBC2"                  // Border color
  }
}
```

## Workflow for New Sites

### 1. Initial Setup
1. Buy domain (Porkbun/Namecheap ~$10/yr)
2. Create new GitHub repo
3. Copy template-blueprint folder

### 2. Configuration
1. Copy and edit `config.json`
2. Update all business, contact, location details
3. Customize 12 service areas with local neighborhoods

### 3. Generation
```bash
node generate-site.js config.json ./output
```

### 4. Assets
- Create favicon.svg with brand colors
- Generate PNG favicons (16x16, 32x32, 180x180)
- Create og-image.jpg (1200x630px)
- Add project photos to images/ folder

### 5. Deployment
1. Push to GitHub
2. Enable GitHub Pages (main branch)
3. Add custom domain in repo settings
4. Configure DNS in Cloudflare:
   - A record: 185.199.108.153 (and .109, .110, .111)
   - CNAME: www -> yourdomain.com

### 6. Email Setup
1. Add MX records for MXroute
2. Add SPF and DKIM records
3. Create contact@ alias

### 7. Verification
1. Add Google Analytics property
2. Verify in Search Console
3. Submit sitemap.xml

## Placeholder Reference

| Placeholder | Description |
|------------|-------------|
| `{{BUSINESS_NAME}}` | Full business name |
| `{{PHONE}}` | Formatted phone number |
| `{{PHONE_RAW}}` | Phone digits only |
| `{{EMAIL}}` | Contact email |
| `{{DOMAIN}}` | Domain without https |
| `{{DOMAIN_FULL}}` | Full https URL |
| `{{PRIMARY_CITY}}` | Main city |
| `{{REGION}}` | Regional area name |
| `{{STATE}}` | Full state name |
| `{{STATE_CODE}}` | 2-letter state |
| `{{SERVICE_PRIMARY}}` | Main service (lowercase) |
| `{{SERVICE_PRIMARY_CAP}}` | Main service (capitalized) |
| `{{SERVICE_SECONDARY}}` | Related service term |
| `{{CURRENT_DATE}}` | Generated date (YYYY-MM-DD) |
| `{{CURRENT_YEAR}}` | Current year |

## Content Customization

After generation, you may want to customize:

1. **Hero image** - Update Unsplash URL in template
2. **Blog posts** - Adjust pricing, local references
3. **FAQ answers** - Update with local specifics
4. **Testimonials** - Add real reviews when available
5. **Service descriptions** - Tailor to specific niche

## Niche Ideas for Sites #2-20

| Niche | City Ideas |
|-------|-----------|
| Roofing | Tampa, Jacksonville, Miami |
| HVAC | Phoenix, Las Vegas, Houston |
| Plumbing | Atlanta, Dallas, Denver |
| Landscaping | Austin, San Diego, Portland |
| Fencing | Nashville, Charlotte, Columbus |
| Pressure Washing | Orlando, Sarasota, Fort Myers |
| Pool Service | Scottsdale, Palm Beach, Tucson |
| Garage Doors | Minneapolis, Kansas City, Indianapolis |

## Monthly Costs (per site)

| Item | Cost |
|------|------|
| Domain | ~$1/mo ($10-12/yr) |
| Hosting | $0 (GitHub Pages) |
| Email | ~$1/mo (MXroute shared) |
| **Total** | **~$2/mo per site** |

## Notes

- Template has 692 placeholder instances
- Single-page app architecture (all content in index.html)
- 10 JSON-LD schemas for SEO
- Mobile-responsive design
- PWA-ready with manifest.json

---

Built with the Rank & Rent framework. Original site: orlandoconcretedriveway.com
