# React Three.js Troubleshooting Checklist

## 🚨 When Page is Blank

Run these checks in order:

### 1. Check Browser Console (F12)
```
✅ No errors → Go to step 2
❌ "Cannot read properties of undefined (reading 'S')" → Version mismatch (see below)
❌ "Module not found: three/examples/jsm" → Import path issue (see below)
❌ Other errors → Read error message carefully
```

### 2. Verify Installed Versions
```bash
npm list react @react-three/fiber @react-three/drei three
```

Expected output for React 18:
```
├── react@18.3.1
├── @react-three/fiber@8.17.x
├── @react-three/drei@9.114.x
└── three@0.169.0
```

**If you see:**
- `@react-three/fiber@9.x.x` with `react@18.x.x` → **CRITICAL: Downgrade R3F to ~8.17.0**

### 3. Hard Refresh Browser
```
Windows: Ctrl + Shift + R
Mac: Cmd + Shift + R
Linux: Ctrl + Shift + R
```

### 4. Clear Vite Cache
```bash
rm -rf node_modules/.vite
npm run dev
```

### 5. Check Import Paths
```bash
# Search for old Three.js paths
grep -r "three/examples/jsm" src/
```

If found, update to:
```javascript
// OLD ❌
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// NEW ✅
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
```

## 🔧 Fix Version Mismatch

### React 18 + R3F v9 Conflict

**Symptom:**
```
Uncaught TypeError: Cannot read properties of undefined (reading 'S')
at createReconciler
```

**Fix:**
```bash
# 1. Remove conflicting packages
npm uninstall @react-three/fiber @react-three/drei three

# 2. Install React 18 compatible versions
npm install three@~0.169.0 @react-three/fiber@~8.17.0 @react-three/drei@~9.114.0 --legacy-peer-deps

# 3. Clear cache and restart
rm -rf node_modules/.vite
npm run dev

# 4. Hard refresh browser (Cmd+Shift+R)
```

## 🎨 Fix Tailwind CSS Issues

### Tailwind v4 PostCSS Error

**Symptom:**
```
[postcss] It looks like you're trying to use tailwindcss directly as a PostCSS plugin
```

**Fix:**
```bash
# 1. Remove Tailwind v4
npm uninstall tailwindcss @tailwindcss/postcss

# 2. Install Tailwind v3
npm install -D tailwindcss@^3.4.0 postcss autoprefixer

# 3. Initialize config
npx tailwindcss init -p

# 4. Verify postcss.config.js
```

**postcss.config.js should be:**
```javascript
export default {
  plugins: {
    tailwindcss: {},      // NOT '@tailwindcss/postcss'
    autoprefixer: {}
  }
}
```

## 📦 Nuclear Option (Last Resort)

If nothing works:

```bash
# 1. Delete everything
rm -rf node_modules package-lock.json .vite

# 2. Clean install with correct versions
npm install

# 3. Verify versions
npm list react @react-three/fiber three

# 4. Clear browser cache completely
# Chrome: Settings → Privacy → Clear browsing data → Cached images and files

# 5. Restart dev server
npm run dev

# 6. Hard refresh browser
```

## 🕐 Time Estimates

| Issue | Diagnostic Time | Fix Time |
|-------|----------------|----------|
| Version mismatch | 2 min | 15 min |
| Import path | 1 min | 5 min |
| Tailwind config | 2 min | 10 min |
| Browser cache | 1 min | 2 min |

## 📋 Prevention Checklist

Before starting a new project:

- [ ] Use `~` for @react-three packages in package.json
- [ ] Check peer dependencies before installation
- [ ] Commit package-lock.json to git
- [ ] Use Tailwind v3, not v4
- [ ] Use Three.js addons/ path, not examples/jsm/
- [ ] Test immediately after installation
- [ ] Document working versions in README

## 🔍 Diagnostic Script

Save this as `diagnose.sh`:

```bash
#!/bin/bash
echo "=== React Three.js Diagnostic ==="
echo ""
echo "Installed Versions:"
npm list react @react-three/fiber @react-three/drei three 2>/dev/null | grep -E "(react|fiber|drei|three)"
echo ""
echo "Checking for old import paths:"
grep -r "three/examples/jsm" src/ 2>/dev/null && echo "⚠️  Found old paths!" || echo "✅ No old paths found"
echo ""
echo "Checking Tailwind config:"
cat postcss.config.js 2>/dev/null | grep -q "@tailwindcss/postcss" && echo "⚠️  Using Tailwind v4 config!" || echo "✅ Tailwind config OK"
echo ""
echo "Vite cache status:"
[ -d "node_modules/.vite" ] && echo "📦 Vite cache exists (try clearing)" || echo "✅ No Vite cache"
```

Run with: `bash diagnose.sh`
