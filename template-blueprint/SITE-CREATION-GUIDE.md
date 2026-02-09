# Rank & Rent Site Creation Guide
## Complete Step-by-Step Playbook for Sites #2-20

---

## Table of Contents
1. [Overview](#overview)
2. [Pre-Launch Checklist](#pre-launch-checklist)
3. [Step 1: Domain & Repo Setup](#step-1-domain--repo-setup)
4. [Step 2: Configure Your Site](#step-2-configure-your-site)
5. [Step 3: Generate the Site](#step-3-generate-the-site)
6. [Step 4: Customize Content](#step-4-customize-content)
7. [Step 5: Create Assets](#step-5-create-assets)
8. [Step 6: Deploy to GitHub Pages](#step-6-deploy-to-github-pages)
9. [Step 7: DNS Configuration](#step-7-dns-configuration)
10. [Step 8: Email Setup](#step-8-email-setup)
11. [Step 9: Analytics & Search Console](#step-9-analytics--search-console)
12. [Step 10: Final Verification](#step-10-final-verification)
13. [Configuration Reference](#configuration-reference)
14. [Niche & City Ideas](#niche--city-ideas)
15. [Cost Breakdown](#cost-breakdown)
16. [Troubleshooting](#troubleshooting)

---

## Overview

This guide walks you through creating a new rank & rent lead generation site using the template system built from orlandoconcretedriveway.com.

**What you'll create:**
- Full responsive website with 30+ pages
- 6 service pages
- 12 location pages
- 5 SEO-optimized blog posts
- Legal pages (Privacy, Terms, Sitemap)
- 10 JSON-LD schemas for rich snippets
- PWA-ready with manifest.json

**Time to complete:** 2-4 hours per site

---

## Pre-Launch Checklist

Before starting, gather this information:

### Business Details
- [ ] Business name (e.g., "Tampa Roofing Experts")
- [ ] Short name/abbreviation (e.g., "TRE")
- [ ] Tagline
- [ ] Founded year (can be fictional)
- [ ] Warranty offered (e.g., "10-year")

### Contact Info
- [ ] Phone number (Google Voice recommended)
- [ ] Email address
- [ ] Domain name

### Location Info
- [ ] Primary city
- [ ] Region name (e.g., "Tampa Bay Area")
- [ ] State
- [ ] GPS coordinates (Google Maps)
- [ ] ZIP code for main area
- [ ] 12 service area cities/neighborhoods

### Service Info
- [ ] Primary service type (e.g., "roofing")
- [ ] Related terms (e.g., "roof", "roofs")
- [ ] Local pricing data for blog posts

---

## Step 1: Domain & Repo Setup

### 1.1 Buy Domain (~$10-12/year)

**Recommended registrars:**
- Porkbun (cheapest)
- Namecheap
- Cloudflare Registrar

**Domain naming tips:**
- Include city + service: `tamparoofingpros.com`
- Keep it short and memorable
- Avoid hyphens if possible
- .com preferred, .co acceptable

### 1.2 Create GitHub Repository

```bash
# Option A: Create on GitHub.com
# Go to github.com/new
# Name: tampa-roofing-site (or similar)
# Make it public (required for free GitHub Pages)
# Don't initialize with README

# Option B: Create locally and push
mkdir tampa-roofing-site
cd tampa-roofing-site
git init
git remote add origin https://github.com/YOUR_USERNAME/tampa-roofing-site.git
```

### 1.3 Transfer Domain DNS to Cloudflare (Recommended)

1. Create free Cloudflare account
2. Add your domain
3. Update nameservers at your registrar to Cloudflare's
4. Wait for propagation (up to 24 hours)

**Why Cloudflare?**
- Free SSL certificates
- Free CDN
- Easy DNS management
- DDoS protection

---

## Step 2: Configure Your Site

### 2.1 Copy the Config Template

```bash
cd template-blueprint
cp config.json my-site-config.json
```

### 2.2 Edit Configuration

Open `my-site-config.json` and update ALL fields:

```json
{
  "business": {
    "name": "Tampa Roofing Experts",
    "shortName": "TRE",
    "tagline": "Licensed & Insured",
    "foundedYear": "2018",
    "warrantyYears": "15",
    "priceRange": "$$"
  },
  "contact": {
    "phone": "(813) 900-1234",
    "phoneRaw": "8139001234",
    "email": "contact@tamparoofingexperts.com",
    "domain": "tamparoofingexperts.com",
    "domainFull": "https://tamparoofingexperts.com"
  },
  "location": {
    "primaryCity": "Tampa",
    "region": "Tampa Bay Area",
    "state": "Florida",
    "stateCode": "FL",
    "latitude": "27.9506",
    "longitude": "-82.4572",
    "streetAddress": "123 Main Street",
    "postalCode": "33602",
    "areaCode": "813",
    "serviceRadius": "30 miles",
    "geoRegion": "US-FL"
  }
}
```

### 2.3 Update Service Type

This is critical - changes the entire site's focus:

```json
{
  "service": {
    "primary": "roofing",
    "primaryPlural": "roofing services",
    "primaryCapitalized": "Roofing",
    "primaryPluralCapitalized": "Roofing Services",
    "secondary": "roof",
    "secondaryCapitalized": "Roof",
    "tertiary": "roof",
    "tertiaryPlural": "roofs",
    "tertiaryCapitalized": "Roof",
    "tertiaryPluralCapitalized": "Roofs",
    "industry": "home improvement",
    "category": "Contractor"
  }
}
```

**Common service mappings:**

| Niche | primary | secondary | tertiary |
|-------|---------|-----------|----------|
| Roofing | roofing | roof | roof |
| HVAC | HVAC | heating and cooling | AC |
| Plumbing | plumbing | plumbing | pipe |
| Fencing | fencing | fence | fence |
| Landscaping | landscaping | landscape | yard |
| Pressure Washing | pressure washing | pressure wash | surface |
| Pool Service | pool service | pool | pool |
| Garage Doors | garage door | garage door | door |

### 2.4 Update Service Areas (12 locations)

Research your target city and identify 12 surrounding areas:

```json
{
  "serviceAreas": [
    {
      "id": "downtown-tampa",
      "name": "Downtown Tampa",
      "shortName": "Downtown",
      "description": "Urban core with historic and modern buildings",
      "neighborhoods": ["Channel District", "Ybor City", "Tampa Heights"]
    },
    {
      "id": "south-tampa",
      "name": "South Tampa",
      "shortName": "South Tampa",
      "description": "Affluent residential area with established homes",
      "neighborhoods": ["Hyde Park", "Palma Ceia", "Beach Park"]
    }
    // ... 10 more areas
  ]
}
```

**Tips for choosing service areas:**
- Include the main city
- Add 8-10 surrounding suburbs
- Include affluent neighborhoods (higher ticket jobs)
- Check Google for "[city] neighborhoods" lists

### 2.5 Update Pricing (for blog posts)

Research local pricing and update:

```json
{
  "pricing": {
    "perSqFtLow": "5",
    "perSqFtHigh": "15",
    "typicalSqFt": "2000",
    "typicalLow": "10000",
    "typicalHigh": "30000"
  }
}
```

---

## Step 3: Generate the Site

### Option A: Using Node.js

```bash
node generate-site.js my-site-config.json ./output/my-site
```

### Option B: Using Bash Script

Edit the variables at the top of `generate-site.sh`, then:

```bash
./generate-site.sh ./output/my-site
```

### Output Structure

```
output/my-site/
├── index.html      # Main site (all pages)
├── 404.html        # Error page
├── sitemap.xml     # XML sitemap
├── robots.txt      # Robots file
├── manifest.json   # PWA manifest
└── CNAME           # Domain file
```

---

## Step 4: Customize Content

After generation, review and customize these sections:

### 4.1 Hero Image

Find a relevant Unsplash image and update the URL in index.html:

```html
<!-- Around line 299 -->
background: url('https://images.unsplash.com/photo-XXXXXXX?auto=format&fit=crop&w=2000&q=80');
```

**Good Unsplash search terms:**
- Roofing: "roof construction", "roofing worker"
- HVAC: "air conditioning", "HVAC technician"
- Plumbing: "plumber working", "pipe repair"

### 4.2 Blog Post Content

Review each blog post and update:
- Local pricing figures
- Climate-specific references
- Local regulations/permits
- Neighborhood mentions

### 4.3 FAQ Answers

Update FAQ schema with accurate local information:
- Permit requirements
- Typical project costs
- Timeline estimates
- Service area boundaries

### 4.4 Testimonials (Later)

Initially use placeholder testimonials. Replace with real reviews as you get them.

---

## Step 5: Create Assets

### 5.1 Favicon

Create a simple SVG favicon with your brand colors:

```svg
<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <circle cx="16" cy="16" r="15" fill="#2D3436" stroke="#C4704A" stroke-width="1"/>
  <!-- Add icon relevant to your service -->
</svg>
```

**Or use a favicon generator:**
- realfavicongenerator.net
- favicon.io

**Required files:**
- favicon.svg
- favicon-16x16.png
- favicon-32x32.png
- apple-touch-icon.png (180x180)

### 5.2 Open Graph Image

Create a 1200x630px image for social sharing:

**Include:**
- Business name
- Tagline
- Phone number
- Simple graphic

**Tools:**
- Canva (free)
- Figma (free)

Save as `images/og-image.jpg`

### 5.3 Project Photos (Optional)

For the gallery section, either:
- Use Unsplash images initially
- Replace with real project photos later

---

## Step 6: Deploy to GitHub Pages

### 6.1 Push to GitHub

```bash
cd output/my-site
git init
git add .
git commit -m "Initial site deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 6.2 Enable GitHub Pages

1. Go to your repo on GitHub
2. Settings → Pages
3. Source: Deploy from branch
4. Branch: main, / (root)
5. Save

### 6.3 Add Custom Domain

1. Still in Settings → Pages
2. Custom domain: yourdomain.com
3. Check "Enforce HTTPS"
4. Save

---

## Step 7: DNS Configuration

### 7.1 Cloudflare DNS Records

Add these records in Cloudflare:

**A Records (for apex domain):**
| Type | Name | Content |
|------|------|---------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

**CNAME Record (for www):**
| Type | Name | Content |
|------|------|---------|
| CNAME | www | yourdomain.com |

### 7.2 Verify SSL

- Wait 10-30 minutes after DNS setup
- GitHub will automatically provision SSL
- Check Settings → Pages for green checkmark

---

## Step 8: Email Setup

### 8.1 MXroute Configuration

If using MXroute for email:

**MX Records:**
| Type | Name | Content | Priority |
|------|------|---------|----------|
| MX | @ | arrow.mxrouting.net | 10 |
| MX | @ | arrow-smtp.mxrouting.net | 20 |

**SPF Record:**
| Type | Name | Content |
|------|------|---------|
| TXT | @ | v=spf1 include:mxroute.com ~all |

**DKIM Record:**
Get this from MXroute dashboard after adding domain.

### 8.2 Create Email Alias

In MXroute:
1. Add domain
2. Create alias: contact@yourdomain.com
3. Forward to your main email

---

## Step 9: Analytics & Search Console

### 9.1 Google Analytics 4

1. Go to analytics.google.com
2. Create new property
3. Get Measurement ID (G-XXXXXXXXXX)
4. Update in index.html (lines 9 and 14)

### 9.2 Google Search Console

1. Go to search.google.com/search-console
2. Add property (URL prefix method)
3. Verify via HTML tag
4. Get verification code
5. Update in index.html (line 43)

### 9.3 Submit Sitemap

In Search Console:
1. Go to Sitemaps
2. Enter: sitemap.xml
3. Submit

---

## Step 10: Final Verification

### 10.1 Technical Checklist

- [ ] Site loads at https://yourdomain.com
- [ ] Site loads at https://www.yourdomain.com
- [ ] SSL certificate active (green padlock)
- [ ] All pages navigate correctly
- [ ] Phone number links work (tel:)
- [ ] Email links work (mailto:)
- [ ] Contact form displays correctly
- [ ] Mobile responsive design works
- [ ] 404 page displays for bad URLs

### 10.2 SEO Checklist

- [ ] Meta title shows correctly
- [ ] Meta description shows correctly
- [ ] robots.txt accessible at /robots.txt
- [ ] sitemap.xml accessible at /sitemap.xml
- [ ] Schema markup validates (search.google.com/test/rich-results)
- [ ] Open Graph tags work (use Facebook debugger)

### 10.3 Speed Test

Test at:
- PageSpeed Insights (pagespeed.web.dev)
- GTmetrix (gtmetrix.com)

Target: 90+ mobile score

---

## Configuration Reference

### All Placeholders

| Placeholder | Example Value |
|-------------|---------------|
| `{{BUSINESS_NAME}}` | Tampa Roofing Experts |
| `{{BUSINESS_SHORT_NAME}}` | TRE |
| `{{PHONE}}` | (813) 900-1234 |
| `{{PHONE_RAW}}` | 8139001234 |
| `{{EMAIL}}` | contact@tamparoofing.com |
| `{{DOMAIN}}` | tamparoofing.com |
| `{{DOMAIN_FULL}}` | https://tamparoofing.com |
| `{{PRIMARY_CITY}}` | Tampa |
| `{{REGION}}` | Tampa Bay Area |
| `{{STATE}}` | Florida |
| `{{STATE_CODE}}` | FL |
| `{{LATITUDE}}` | 27.9506 |
| `{{LONGITUDE}}` | -82.4572 |
| `{{POSTAL_CODE}}` | 33602 |
| `{{AREA_CODE}}` | 813 |
| `{{GEO_REGION}}` | US-FL |
| `{{SERVICE_PRIMARY}}` | roofing |
| `{{SERVICE_PRIMARY_CAP}}` | Roofing |
| `{{SERVICE_SECONDARY}}` | roof |
| `{{SERVICE_TERTIARY}}` | roof |
| `{{CURRENT_DATE}}` | 2026-01-21 |
| `{{CURRENT_YEAR}}` | 2026 |

### Color Customization

Default palette (works for most niches):

```json
{
  "colorPrimary": "#2D3436",      // Dark charcoal (header, footer)
  "colorSecondary": "#C4704A",    // Rust/copper (CTAs, accents)
  "colorAccent": "#636E72",       // Gray (secondary elements)
  "colorBackground": "#F5F3EF",   // Warm beige (page background)
  "colorSurface": "#E8E4DD",      // Light beige (cards)
  "colorText": "#1A1A1A",         // Near black (body text)
  "colorTextMuted": "#6B6B6B",    // Gray (secondary text)
  "colorTextLight": "#F5F3EF",    // Off-white (text on dark)
  "colorBorder": "#D1CBC2"        // Light gray (borders)
}
```

**Alternative palettes:**

Blue (HVAC, Plumbing):
```json
"colorPrimary": "#1E3A5F"
"colorSecondary": "#3498DB"
```

Green (Landscaping, Tree Service):
```json
"colorPrimary": "#2D5016"
"colorSecondary": "#4CAF50"
```

---

## Niche & City Ideas

### High-Value Niches

| Niche | Avg Lead Value | Competition |
|-------|----------------|-------------|
| Roofing | $8,000-15,000 | Medium |
| HVAC | $5,000-12,000 | Medium |
| Concrete | $4,000-8,000 | Low-Medium |
| Pool Service | $3,000-10,000 | Medium |
| Fencing | $3,000-8,000 | Low |
| Garage Doors | $1,500-4,000 | Low |
| Pressure Washing | $200-500 | Low |

### Target Cities by Region

**Florida:**
- Tampa, Jacksonville, Miami, Orlando
- Fort Myers, Sarasota, Naples
- Gainesville, Tallahassee

**Texas:**
- Houston, Dallas, Austin, San Antonio
- Fort Worth, Plano, Arlington

**Arizona:**
- Phoenix, Scottsdale, Tucson, Mesa
- Chandler, Gilbert, Glendale

**Georgia:**
- Atlanta, Savannah, Augusta
- Marietta, Alpharetta

### City Selection Criteria

✅ Good targets:
- Population 200k-2M
- Growing metro areas
- High homeownership rates
- Limited existing competition
- Moderate-high income levels

❌ Avoid:
- Oversaturated markets (NYC, LA, Chicago)
- Very small towns (<50k)
- Areas with strict licensing requirements
- Declining population areas

---

## Cost Breakdown

### Per-Site Costs

| Item | One-Time | Monthly | Annual |
|------|----------|---------|--------|
| Domain | $10-12 | - | $10-12 |
| Hosting (GitHub) | $0 | $0 | $0 |
| Email (MXroute) | - | ~$1 | $12 |
| **Total** | **$10-12** | **~$1** | **~$24** |

### Shared Tools (across all sites)

| Tool | Monthly | Purpose |
|------|---------|---------|
| Mangools | $50 | SEO research |
| Claude Pro | $20 | Content & dev |
| Google Voice | $0 | Phone numbers |
| **Total** | **$70** | |

### Projected ROI

At $200-500/month rent per site:
- 1 site rented = Covers all tool costs
- 5 sites rented = $1,000-2,500/month
- 10 sites rented = $2,000-5,000/month
- 20 sites rented = $4,000-10,000/month

---

## Troubleshooting

### Site Not Loading

1. Check GitHub Pages settings
2. Verify DNS records are correct
3. Wait for DNS propagation (up to 48 hours)
4. Clear browser cache
5. Try incognito/private window

### SSL Certificate Issues

1. Make sure CNAME file contains exact domain
2. Remove and re-add custom domain in GitHub
3. Wait 24 hours for certificate provisioning

### Email Not Working

1. Verify MX records are correct
2. Check SPF record syntax
3. Verify DKIM is properly configured
4. Test with mail-tester.com

### Search Console Verification Failed

1. Make sure verification meta tag is in <head>
2. Clear cache and redeploy
3. Try alternative verification methods (DNS TXT record)

### Low PageSpeed Score

1. Optimize images (compress, resize)
2. Minimize external font usage
3. Enable Cloudflare caching
4. Check for large unused CSS/JS

---

## Quick Reference Card

```
NEW SITE CHECKLIST:
□ Buy domain
□ Create GitHub repo
□ Copy & edit config.json
□ Generate site
□ Add favicons & images
□ Push to GitHub
□ Enable GitHub Pages
□ Configure DNS in Cloudflare
□ Setup email (MXroute)
□ Add GA4 tracking
□ Verify Search Console
□ Submit sitemap
□ Test everything
□ Start ranking!
```

---

*Template system built from orlandoconcretedriveway.com*
*Last updated: January 2026*
