#!/bin/bash

# React Three.js Diagnostic Script
# Quickly identify version conflicts and common issues

echo "╔════════════════════════════════════════╗"
echo "║  React Three.js Diagnostic Tool       ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Check installed versions
echo "📦 Installed Versions:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if command -v npm &> /dev/null; then
    versions=$(npm list react @react-three/fiber @react-three/drei three 2>/dev/null | grep -E "(react@|fiber@|drei@|three@)")

    if [ -z "$versions" ]; then
        echo -e "${RED}⚠️  No packages found. Run 'npm install' first.${NC}"
    else
        echo "$versions"

        # Check for version conflicts
        if echo "$versions" | grep -q "react@18" && echo "$versions" | grep -q "fiber@9"; then
            echo -e "\n${RED}❌ CRITICAL: React 18 with R3F v9 detected!${NC}"
            echo -e "${YELLOW}Fix: npm install @react-three/fiber@~8.17.0 --legacy-peer-deps${NC}"
        elif echo "$versions" | grep -q "react@18" && echo "$versions" | grep -q "fiber@8"; then
            echo -e "\n${GREEN}✅ Version compatibility: OK${NC}"
        fi
    fi
else
    echo -e "${RED}npm not found${NC}"
fi

echo ""

# 2. Check for old Three.js import paths
echo "🔍 Checking Import Paths:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ -d "src" ]; then
    old_paths=$(grep -r "three/examples/jsm" src/ 2>/dev/null)
    if [ -z "$old_paths" ]; then
        echo -e "${GREEN}✅ No old import paths found${NC}"
    else
        echo -e "${RED}⚠️  Found old Three.js paths:${NC}"
        echo "$old_paths"
        echo -e "\n${YELLOW}Fix: Replace 'three/examples/jsm' with 'three/addons'${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  src/ directory not found${NC}"
fi

echo ""

# 3. Check Tailwind config
echo "🎨 Tailwind CSS Configuration:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ -f "postcss.config.js" ]; then
    if grep -q "@tailwindcss/postcss" postcss.config.js 2>/dev/null; then
        echo -e "${RED}⚠️  Using Tailwind v4 config!${NC}"
        echo -e "${YELLOW}Fix: Use 'tailwindcss' instead of '@tailwindcss/postcss'${NC}"
    else
        echo -e "${GREEN}✅ PostCSS config OK${NC}"
    fi

    # Check installed Tailwind version
    tw_version=$(npm list tailwindcss 2>/dev/null | grep "tailwindcss@")
    if echo "$tw_version" | grep -q "@4"; then
        echo -e "${YELLOW}⚠️  Tailwind v4 detected (experimental)${NC}"
        echo -e "${YELLOW}Recommended: Downgrade to v3.4.x${NC}"
    elif echo "$tw_version" | grep -q "@3"; then
        echo -e "${GREEN}✅ Tailwind v3 (stable)${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  postcss.config.js not found${NC}"
fi

echo ""

# 4. Check Vite cache
echo "🗂️  Cache Status:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ -d "node_modules/.vite" ]; then
    cache_size=$(du -sh node_modules/.vite 2>/dev/null | cut -f1)
    echo -e "${YELLOW}📦 Vite cache exists: $cache_size${NC}"
    echo -e "${YELLOW}Tip: Clear with 'rm -rf node_modules/.vite'${NC}"
else
    echo -e "${GREEN}✅ No Vite cache${NC}"
fi

echo ""

# 5. Check for package-lock.json
echo "🔒 Dependency Lock:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ -f "package-lock.json" ]; then
    echo -e "${GREEN}✅ package-lock.json exists${NC}"
else
    echo -e "${YELLOW}⚠️  No package-lock.json (run 'npm install')${NC}"
fi

echo ""

# 6. Summary and recommendations
echo "╔════════════════════════════════════════╗"
echo "║  Quick Fix Commands                   ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "If page is blank:"
echo "  1. Hard refresh browser (Cmd+Shift+R)"
echo "  2. rm -rf node_modules/.vite && npm run dev"
echo ""
echo "If version mismatch:"
echo "  npm install @react-three/fiber@~8.17.0 @react-three/drei@~9.114.0 --legacy-peer-deps"
echo ""
echo "If Tailwind error:"
echo "  npm install -D tailwindcss@^3.4.0"
echo ""
echo "Nuclear option:"
echo "  rm -rf node_modules package-lock.json .vite && npm install"
echo ""
