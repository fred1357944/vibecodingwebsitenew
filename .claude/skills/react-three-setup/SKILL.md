---
name: react-three-setup
description: Expert knowledge for setting up React + Three.js + Tailwind CSS projects with proper version compatibility. Automatically prevents common version conflicts, GLTFLoader import errors, and Tailwind v4 issues. Use when initializing or debugging React Three Fiber projects.
version: 1.0.0
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Grep
  - Glob
---

# React Three.js Setup Expert

## 🎯 When to Use This Skill

Activate this skill when:
- Setting up new React + Three.js projects
- Debugging blank pages in React Three Fiber apps
- Encountering version compatibility errors
- Installing @react-three/fiber or @react-three/drei
- Working with GLTFLoader or 3D model loading
- Setting up Tailwind CSS with Vite

## 🚨 Critical Version Rules

### React 18 Stack (Recommended - Stable)

**ALWAYS use these exact versions for React 18:**

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "@react-three/fiber": "~8.17.0",
    "@react-three/drei": "~9.114.0",
    "three": "^0.169.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.18"
  }
}
```

**Why these versions:**
- React Three Fiber v9+ requires React 19
- Tailwind v4 is still beta and has PostCSS incompatibilities
- Three.js r150+ changed GLTFLoader path

### React 19 Stack (Future - Not Yet Recommended)

```json
{
  "react": "^19.0.0",
  "@react-three/fiber": "^9.0.0",
  "@react-three/drei": "^10.0.0"
}
```

**DO NOT mix React 18 with R3F v9+**

## 🛡️ Installation Checklist

Before installing any package:

1. **Check peer dependencies:**
   ```bash
   npm info @react-three/fiber peerDependencies
   ```

2. **Use ~ for patch version lock:**
   ```json
   "@react-three/fiber": "~8.17.0"  // ✅ Only allows 8.17.x
   "@react-three/fiber": "^8.17.0"  // ❌ Allows 8.x.x (dangerous)
   ```

3. **Install in correct order:**
   ```bash
   # 1. Base packages
   npm install react@18 react-dom@18

   # 2. Three.js ecosystem (use --legacy-peer-deps ONLY if necessary)
   npm install three@~0.169.0 @react-three/fiber@~8.17.0 @react-three/drei@~9.114.0

   # 3. Tailwind v3 (NOT v4)
   npm install -D tailwindcss@^3.4.0 postcss autoprefixer
   ```

## 🐛 Common Errors and Fixes

### Error 1: "Cannot read properties of undefined (reading 'S')"

**Cause:** React Three Fiber v9 installed with React 18

**Fix:**
```bash
npm uninstall @react-three/fiber @react-three/drei three
npm install three@~0.169.0 @react-three/fiber@~8.17.0 @react-three/drei@~9.114.0 --legacy-peer-deps
```

### Error 2: GLTFLoader Import Error

**Old (❌):**
```javascript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
```

**New (✅):**
```javascript
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
```

### Error 3: Tailwind PostCSS Error

**Symptom:** "[postcss] It looks like you're trying to use tailwindcss directly"

**Fix:** Downgrade to Tailwind v3:
```bash
npm uninstall tailwindcss @tailwindcss/postcss
npm install -D tailwindcss@^3.4.0 postcss autoprefixer
```

**postcss.config.js (v3):**
```javascript
export default {
  plugins: {
    tailwindcss: {},      // NOT '@tailwindcss/postcss'
    autoprefixer: {}
  }
}
```

### Error 4: Blank Page with No Console Errors

**Cause:** Browser cache

**Fix:**
```bash
# 1. Hard refresh
# Windows: Ctrl + Shift + R
# Mac: Cmd + Shift + R

# 2. Clear Vite cache
rm -rf node_modules/.vite

# 3. Restart dev server
npm run dev
```

## 📋 Quick Start Template

```bash
# 1. Initialize Vite
npm create vite@latest . -- --template react

# 2. Install Three.js (React 18)
npm install three@~0.169.0 @react-three/fiber@~8.17.0 @react-three/drei@~9.114.0

# 3. Install Tailwind v3
npm install -D tailwindcss@^3.4.0 postcss autoprefixer
npx tailwindcss init -p

# 4. Test
npm run dev
```

## 🔍 Diagnostic Commands

When debugging:

```bash
# Check installed versions
npm list react @react-three/fiber three

# Check peer dependency conflicts
npm ls

# Verify imports in code
grep -r "from 'three/" src/

# Clear all caches
rm -rf node_modules/.vite node_modules/.cache
```

## 🎓 Best Practices

1. **Always lock versions with ~**
   - Use `~` for React Three packages
   - Prevents accidental major version upgrades

2. **Commit package-lock.json**
   - Ensures team uses same versions
   - Prevents "works on my machine" issues

3. **Check documentation for Breaking Changes**
   - React Three Fiber migration guides
   - Three.js changelog for path changes

4. **Test before upgrading**
   - Don't chase latest versions
   - Wait 6 months for ecosystem stability

## 📚 Reference Files

See also:
- `version-compatibility.json` - Version compatibility matrix
- `troubleshooting-checklist.md` - Step-by-step debugging
- `templates/` - Working project templates

## 🚀 Automatic Actions

When this skill is active, Claude will:

1. **Automatically check versions** before installation
2. **Warn about incompatible combinations**
3. **Suggest correct import paths** for Three.js loaders
4. **Recommend Tailwind v3** over v4
5. **Remind to hard refresh** when debugging blank pages

## 💡 Key Insights

**Root Cause of 90% Issues:**
- Version mismatches (React 18 vs React Three Fiber v9)
- Using `^` instead of `~` for version ranges
- Not reading peer dependency warnings
- Chasing latest versions without checking compatibility

**Time Saved:**
- Without this knowledge: ~72 minutes debugging
- With this skill: ~15 minutes setup

**Philosophy:**
> Stability > New Features > Latest Version
