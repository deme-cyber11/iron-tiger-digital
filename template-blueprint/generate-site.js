#!/usr/bin/env node
/**
 * Rank & Rent Site Generator
 *
 * Generates a complete lead generation website from the template
 * using configuration from config.json
 *
 * Usage:
 *   node generate-site.js [config-file] [output-directory]
 *
 * Example:
 *   node generate-site.js ./sites/tampa-roofing/config.json ./output/tampa-roofing
 */

const fs = require('fs');
const path = require('path');

// Default paths
const DEFAULT_CONFIG = './config.json';
const DEFAULT_OUTPUT = './output';
const TEMPLATE_DIR = __dirname;

// Get command line arguments
const configPath = process.argv[2] || DEFAULT_CONFIG;
const outputDir = process.argv[3] || DEFAULT_OUTPUT;

console.log('🏗️  Rank & Rent Site Generator');
console.log('================================\n');

// Load configuration
let config;
try {
    const configFile = path.resolve(configPath);
    console.log(`📋 Loading config from: ${configFile}`);
    config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
    console.log(`✅ Config loaded: ${config.business.name}\n`);
} catch (error) {
    console.error(`❌ Error loading config: ${error.message}`);
    process.exit(1);
}

// Create output directory
const outputPath = path.resolve(outputDir);
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
    console.log(`📁 Created output directory: ${outputPath}`);
}

// Build replacement map from config
function buildReplacementMap(config) {
    const currentDate = new Date().toISOString().split('T')[0];
    const currentYear = new Date().getFullYear();

    return {
        // Business
        '{{BUSINESS_NAME}}': config.business.name,
        '{{BUSINESS_SHORT_NAME}}': config.business.shortName,
        '{{BUSINESS_TAGLINE}}': config.business.tagline,
        '{{FOUNDED_YEAR}}': config.business.foundedYear,
        '{{WARRANTY_YEARS}}': config.business.warrantyYears,
        '{{PRICE_RANGE}}': config.business.priceRange,

        // Contact
        '{{PHONE}}': config.contact.phone,
        '{{PHONE_RAW}}': config.contact.phoneRaw,
        '{{EMAIL}}': config.contact.email,
        '{{DOMAIN}}': config.contact.domain,
        '{{DOMAIN_FULL}}': config.contact.domainFull,

        // Location
        '{{PRIMARY_CITY}}': config.location.primaryCity,
        '{{REGION}}': config.location.region,
        '{{STATE}}': config.location.state,
        '{{STATE_CODE}}': config.location.stateCode,
        '{{LATITUDE}}': config.location.latitude,
        '{{LONGITUDE}}': config.location.longitude,
        '{{STREET_ADDRESS}}': config.location.streetAddress,
        '{{POSTAL_CODE}}': config.location.postalCode,
        '{{AREA_CODE}}': config.location.areaCode,
        '{{SERVICE_RADIUS}}': config.location.serviceRadius,
        '{{GEO_REGION}}': config.location.geoRegion,

        // Services
        '{{SERVICE_PRIMARY}}': config.service.primary,
        '{{SERVICE_PRIMARY_PLURAL}}': config.service.primaryPlural,
        '{{SERVICE_PRIMARY_CAP}}': config.service.primaryCapitalized,
        '{{SERVICE_PRIMARY_PLURAL_CAP}}': config.service.primaryPluralCapitalized,
        '{{SERVICE_SECONDARY}}': config.service.secondary,
        '{{SERVICE_SECONDARY_CAP}}': config.service.secondaryCapitalized,
        '{{SERVICE_TERTIARY}}': config.service.tertiary,
        '{{SERVICE_TERTIARY_PLURAL}}': config.service.tertiaryPlural,
        '{{SERVICE_TERTIARY_CAP}}': config.service.tertiaryCapitalized,
        '{{SERVICE_TERTIARY_PLURAL_CAP}}': config.service.tertiaryPluralCapitalized,
        '{{SERVICE_INDUSTRY}}': config.service.industry,
        '{{SERVICE_CATEGORY}}': config.service.category,

        // Pricing
        '{{PRICE_PER_SQFT_LOW}}': config.pricing.perSqFtLow,
        '{{PRICE_PER_SQFT_HIGH}}': config.pricing.perSqFtHigh,
        '{{TYPICAL_SQFT}}': config.pricing.typicalSqFt,
        '{{TYPICAL_PRICE_LOW}}': config.pricing.typicalLow,
        '{{TYPICAL_PRICE_HIGH}}': config.pricing.typicalHigh,

        // SEO
        '{{GA_ID}}': config.seo.gaId,
        '{{GSC_VERIFICATION}}': config.seo.gscVerification,
        '{{OG_IMAGE}}': config.seo.ogImage,

        // Design colors
        '{{COLOR_PRIMARY}}': config.design.colorPrimary,
        '{{COLOR_SECONDARY}}': config.design.colorSecondary,
        '{{COLOR_ACCENT}}': config.design.colorAccent,
        '{{COLOR_BACKGROUND}}': config.design.colorBackground,
        '{{COLOR_SURFACE}}': config.design.colorSurface,
        '{{COLOR_TEXT}}': config.design.colorText,
        '{{COLOR_TEXT_MUTED}}': config.design.colorTextMuted,
        '{{COLOR_TEXT_LIGHT}}': config.design.colorTextLight,
        '{{COLOR_BORDER}}': config.design.colorBorder,

        // Dynamic
        '{{CURRENT_DATE}}': currentDate,
        '{{CURRENT_YEAR}}': currentYear.toString(),
        '{{YEAR}}': currentYear.toString(),
    };
}

// Replace all placeholders in content
function replacePlaceholders(content, replacements) {
    let result = content;
    for (const [placeholder, value] of Object.entries(replacements)) {
        // Use global replace
        result = result.split(placeholder).join(value);
    }
    return result;
}

// Generate service area entries for sitemap
function generateServiceAreaSitemapEntries(config, domainFull, currentDate) {
    return config.serviceAreas.map(area => `  <url>
    <loc>${domainFull}/#location-${area.id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n');
}

// Process a template file
function processTemplate(templateFile, outputFile, replacements, config) {
    try {
        let content = fs.readFileSync(templateFile, 'utf8');

        // Handle special sitemap service area loop
        if (templateFile.includes('sitemap')) {
            const areaEntries = generateServiceAreaSitemapEntries(
                config,
                config.contact.domainFull,
                new Date().toISOString().split('T')[0]
            );
            content = content.replace(/\{\{#EACH_SERVICE_AREA\}\}[\s\S]*?\{\{\/EACH_SERVICE_AREA\}\}/g, areaEntries);
        }

        content = replacePlaceholders(content, replacements);
        fs.writeFileSync(outputFile, content);
        console.log(`✅ Generated: ${path.basename(outputFile)}`);
    } catch (error) {
        console.error(`❌ Error processing ${templateFile}: ${error.message}`);
    }
}

// Main generation process
function generateSite() {
    const replacements = buildReplacementMap(config);

    console.log('📄 Generating files...\n');

    // Template files to process
    const templates = [
        { src: 'template.html', dest: 'index.html' },
        { src: '404-template.html', dest: '404.html' },
        { src: 'sitemap-template.xml', dest: 'sitemap.xml' },
        { src: 'robots-template.txt', dest: 'robots.txt' },
        { src: 'manifest-template.json', dest: 'manifest.json' },
        { src: 'CNAME-template', dest: 'CNAME' },
    ];

    for (const template of templates) {
        const srcPath = path.join(TEMPLATE_DIR, template.src);
        const destPath = path.join(outputPath, template.dest);

        if (fs.existsSync(srcPath)) {
            processTemplate(srcPath, destPath, replacements, config);
        } else {
            console.warn(`⚠️  Template not found: ${template.src}`);
        }
    }

    console.log('\n================================');
    console.log('🎉 Site generation complete!');
    console.log(`📁 Output: ${outputPath}`);
    console.log('\nNext steps:');
    console.log('1. Add favicon files (favicon.svg, favicon-32x32.png, etc.)');
    console.log('2. Add og-image.jpg to /images folder');
    console.log('3. Update GA_ID and GSC_VERIFICATION in config');
    console.log('4. Review and customize content as needed');
    console.log('5. Push to GitHub and configure domain');
}

// Run
generateSite();
