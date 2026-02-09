#!/bin/bash
#
# Rank & Rent Site Generator (Bash version)
#
# Simple sed-based replacement script for generating sites
# For more complex operations, use generate-site.js with Node.js
#
# Usage:
#   ./generate-site.sh <output-directory>
#
# Edit the variables below before running

# ===========================================
# EDIT THESE VALUES FOR YOUR NEW SITE
# ===========================================

# Business Info
BUSINESS_NAME="Orlando Concrete Driveway Experts"
BUSINESS_SHORT_NAME="OCD Experts"

# Contact
PHONE="(407) 900-1517"
PHONE_RAW="4079001517"
EMAIL="contact@orlandoconcretedriveway.com"
DOMAIN="orlandoconcretedriveway.com"
DOMAIN_FULL="https://orlandoconcretedriveway.com"

# Location
PRIMARY_CITY="Orlando"
REGION="Central Florida"
STATE="Florida"
STATE_CODE="FL"
LATITUDE="28.5383"
LONGITUDE="-81.3792"
POSTAL_CODE="32801"
AREA_CODE="407"
GEO_REGION="US-FL"

# Service Type
SERVICE_PRIMARY="concrete driveway"
SERVICE_PRIMARY_CAP="Concrete Driveway"
SERVICE_PRIMARY_PLURAL="concrete driveways"
SERVICE_PRIMARY_PLURAL_CAP="Concrete Driveways"
SERVICE_SECONDARY="concrete"
SERVICE_SECONDARY_CAP="Concrete"
SERVICE_TERTIARY="driveway"
SERVICE_TERTIARY_CAP="Driveway"
SERVICE_TERTIARY_PLURAL="driveways"
SERVICE_TERTIARY_PLURAL_CAP="Driveways"
SERVICE_INDUSTRY="home improvement"

# Colors (optional - change for different brand)
COLOR_PRIMARY="#2D3436"
COLOR_SECONDARY="#C4704A"
COLOR_BACKGROUND="#F5F3EF"
COLOR_TEXT_LIGHT="#F5F3EF"

# ===========================================
# END OF CONFIGURATION
# ===========================================

# Output directory (passed as argument or default)
OUTPUT_DIR="${1:-./output}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
CURRENT_DATE=$(date +%Y-%m-%d)

echo "🏗️  Rank & Rent Site Generator (Bash)"
echo "================================"
echo ""
echo "📋 Generating: $BUSINESS_NAME"
echo "📁 Output: $OUTPUT_DIR"
echo ""

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Function to process a template file
process_template() {
    local src="$1"
    local dest="$2"

    if [ ! -f "$src" ]; then
        echo "⚠️  Template not found: $src"
        return
    fi

    sed \
        -e "s|{{BUSINESS_NAME}}|$BUSINESS_NAME|g" \
        -e "s|{{BUSINESS_SHORT_NAME}}|$BUSINESS_SHORT_NAME|g" \
        -e "s|{{PHONE}}|$PHONE|g" \
        -e "s|{{PHONE_RAW}}|$PHONE_RAW|g" \
        -e "s|{{EMAIL}}|$EMAIL|g" \
        -e "s|{{DOMAIN}}|$DOMAIN|g" \
        -e "s|{{DOMAIN_FULL}}|$DOMAIN_FULL|g" \
        -e "s|{{PRIMARY_CITY}}|$PRIMARY_CITY|g" \
        -e "s|{{REGION}}|$REGION|g" \
        -e "s|{{STATE}}|$STATE|g" \
        -e "s|{{STATE_CODE}}|$STATE_CODE|g" \
        -e "s|{{LATITUDE}}|$LATITUDE|g" \
        -e "s|{{LONGITUDE}}|$LONGITUDE|g" \
        -e "s|{{POSTAL_CODE}}|$POSTAL_CODE|g" \
        -e "s|{{AREA_CODE}}|$AREA_CODE|g" \
        -e "s|{{GEO_REGION}}|$GEO_REGION|g" \
        -e "s|{{SERVICE_PRIMARY}}|$SERVICE_PRIMARY|g" \
        -e "s|{{SERVICE_PRIMARY_CAP}}|$SERVICE_PRIMARY_CAP|g" \
        -e "s|{{SERVICE_PRIMARY_PLURAL}}|$SERVICE_PRIMARY_PLURAL|g" \
        -e "s|{{SERVICE_PRIMARY_PLURAL_CAP}}|$SERVICE_PRIMARY_PLURAL_CAP|g" \
        -e "s|{{SERVICE_SECONDARY}}|$SERVICE_SECONDARY|g" \
        -e "s|{{SERVICE_SECONDARY_CAP}}|$SERVICE_SECONDARY_CAP|g" \
        -e "s|{{SERVICE_TERTIARY}}|$SERVICE_TERTIARY|g" \
        -e "s|{{SERVICE_TERTIARY_CAP}}|$SERVICE_TERTIARY_CAP|g" \
        -e "s|{{SERVICE_TERTIARY_PLURAL}}|$SERVICE_TERTIARY_PLURAL|g" \
        -e "s|{{SERVICE_TERTIARY_PLURAL_CAP}}|$SERVICE_TERTIARY_PLURAL_CAP|g" \
        -e "s|{{SERVICE_INDUSTRY}}|$SERVICE_INDUSTRY|g" \
        -e "s|{{COLOR_PRIMARY}}|$COLOR_PRIMARY|g" \
        -e "s|{{COLOR_SECONDARY}}|$COLOR_SECONDARY|g" \
        -e "s|{{COLOR_BACKGROUND}}|$COLOR_BACKGROUND|g" \
        -e "s|{{COLOR_TEXT_LIGHT}}|$COLOR_TEXT_LIGHT|g" \
        -e "s|{{CURRENT_DATE}}|$CURRENT_DATE|g" \
        "$src" > "$dest"

    echo "✅ Generated: $(basename "$dest")"
}

# Process templates
process_template "$SCRIPT_DIR/template.html" "$OUTPUT_DIR/index.html"
process_template "$SCRIPT_DIR/404-template.html" "$OUTPUT_DIR/404.html"
process_template "$SCRIPT_DIR/robots-template.txt" "$OUTPUT_DIR/robots.txt"
process_template "$SCRIPT_DIR/manifest-template.json" "$OUTPUT_DIR/manifest.json"
process_template "$SCRIPT_DIR/CNAME-template" "$OUTPUT_DIR/CNAME"

# Sitemap needs special handling for service areas
# For now, just do basic replacement
process_template "$SCRIPT_DIR/sitemap-template.xml" "$OUTPUT_DIR/sitemap.xml"

echo ""
echo "================================"
echo "🎉 Site generation complete!"
echo ""
echo "Next steps:"
echo "1. Add favicon files"
echo "2. Add images"
echo "3. Update GA/GSC verification codes"
echo "4. Push to GitHub"
