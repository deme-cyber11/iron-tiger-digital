# Iron Tiger Digital

Digital marketing agency website with Stripe checkout integration.

## Live Site

**URL:** https://irontigerdigital.com

## Infrastructure

### Domain & Hosting
- **Domain:** irontigerdigital.com (Cloudflare)
- **Hosting:** GitHub Pages
- **Repository:** deme-cyber11/iron-tiger-digital
- **DNS:** Cloudflare (4 A records + CNAME for www)
- **SSL:** HTTPS enforced

### Email
- **Address:** contact@irontigerdigital.com
- **Forwards to:** demetrco@umich.edu
- **Provider:** MXroute
- **Records:** MX, SPF, DKIM configured in Cloudflare

## Project Structure

```
iron-tiger-digital/
├── index.html              # Main landing page
├── checkout.html           # Stripe checkout page
├── terms.html              # Terms of service
├── success.html            # Payment success page
├── api/
│   └── create-checkout-session.js  # Stripe API endpoint
├── favicon.svg             # Site favicon
├── logo.svg                # Company logo
├── og-image.png            # Open Graph image
├── stripe-icon.png         # Stripe branding
├── stripe-logo.png         # Stripe branding
├── CNAME                   # GitHub Pages custom domain
├── package.json            # Node dependencies
├── .claude/                # Claude skills library
│   └── skills/             # All available skills
└── template-blueprint/     # Site generation templates
```

## API Keys Location

Credentials stored in: `rank-rent-system/.env`
- Cloudflare API
- GitHub token
- MXroute credentials

## Deployment

Site auto-deploys via GitHub Pages when pushing to main branch:

```bash
git add .
git commit -m "Update site"
git push origin main
```

## Development Notes

- All emojis replaced with solid SVG icons
- Tailwind CSS via CDN
- Stripe integration for payments
