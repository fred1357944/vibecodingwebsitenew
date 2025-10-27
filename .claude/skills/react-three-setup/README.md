# React Three.js Setup Skill

A Claude Code Skill that provides expert knowledge for setting up React + Three.js + Tailwind CSS projects with proper version compatibility.

## 📦 What This Skill Does

This skill automatically:
- Prevents React Three Fiber version conflicts
- Fixes GLTFLoader import path errors
- Avoids Tailwind v4 compatibility issues
- Provides instant troubleshooting for blank pages
- Saves ~60 minutes of debugging time

## 🎯 When It Activates

Claude will automatically use this skill when:
- Setting up new React + Three.js projects
- Debugging blank pages in React Three Fiber apps
- Installing @react-three/fiber or @react-three/drei
- Working with GLTFLoader or 3D model loading
- Configuring Tailwind CSS with Vite

## 📁 Installation

### Project-Specific (Recommended)

Already installed in `.claude/skills/react-three-setup/`

This skill is available to anyone working on this project.

### Global Installation

To use across all projects:

```bash
# Copy to global skills directory
cp -r .claude/skills/react-three-setup ~/.claude/skills/

# Or symlink for easier updates
ln -s "$(pwd)/.claude/skills/react-three-setup" ~/.claude/skills/react-three-setup
```

## 📚 Contents

```
react-three-setup/
├── SKILL.md                          # Main skill definition with YAML frontmatter
├── version-compatibility.json        # Version matrix and known issues
├── troubleshooting-checklist.md      # Step-by-step debugging guide
├── diagnose.sh                       # Automated diagnostic script
├── templates/
│   ├── package.json                  # Working package.json template
│   ├── ModelViewer.jsx               # Basic 3D viewer component
│   └── gltf-loader.js                # Correct GLTFLoader implementation
└── README.md                         # This file
```

## 🚀 Quick Test

Run the diagnostic script to verify your project:

```bash
bash .claude/skills/react-three-setup/diagnose.sh
```

## 🔑 Key Knowledge

**Critical Version Rules:**
- React 18 → Use `@react-three/fiber@~8.17.0`
- React 19 → Use `@react-three/fiber@^9.0.0`
- Always use Tailwind v3.4.x (v4 is unstable)
- Three.js r150+ changed paths to `addons/`

**Common Errors Fixed:**
1. "Cannot read properties of undefined (reading 'S')" → Version mismatch
2. "Module not found: three/examples/jsm" → Import path error
3. "[postcss] tailwindcss directly as plugin" → Tailwind v4 config issue
4. Blank page with no errors → Browser cache

## 📖 Usage Examples

### In Conversation with Claude:

```
User: Help me set up a React Three.js project

Claude: [Automatically uses this skill]
        I'll set up React 18 with Three.js using stable versions...
        - @react-three/fiber@~8.17.0
        - @react-three/drei@~9.114.0
        - tailwindcss@^3.4.18
```

### For Debugging:

```
User: My React Three Fiber page is blank

Claude: [Automatically uses this skill]
        Let me check for common issues:
        1. Checking versions...
        2. Found React 18 with R3F v9 - this is the issue
        3. Fixing version mismatch...
```

## 🛠️ Manual Skill Invocation

You can also manually invoke the skill:

```
User: /react-three-setup

Or:

User: Use the react-three-setup skill to help me debug
```

## 📊 Impact Metrics

**From previous debugging session:**
- Total debugging time without skill: 72 minutes
- Expected time with skill: ~15 minutes
- Time saved: **57 minutes** (79% reduction)

**Problems prevented:**
- React Three Fiber version conflicts
- GLTFLoader import errors
- Tailwind CSS v4 configuration issues
- Browser cache confusion

## 🔄 Updates

When updating this skill:

```bash
# Project-specific
git add .claude/skills/react-three-setup/
git commit -m "Update react-three-setup skill"

# Global (if symlinked, updates automatically)
# If copied, re-copy:
cp -r .claude/skills/react-three-setup ~/.claude/skills/
```

## 📝 Version History

- **v1.0.0** (2025-10-27)
  - Initial release
  - Based on 72 minutes of debugging experience
  - Covers React 18 stack (stable)
  - Includes Tailwind v3 fixes
  - GLTFLoader path corrections

## 🤝 Contributing

Found a new issue? Update the skill:

1. Document in `version-compatibility.json` under `knownIssues`
2. Add fix to `troubleshooting-checklist.md`
3. Update `SKILL.md` if it's a common pattern
4. Test with `diagnose.sh`

## 📄 License

MIT License - Free to use and modify

---

**Created from real production debugging experience**
**Documented by: Linus-style analysis of 6 major issues**
**Time investment: 72 minutes of debugging → Infinite time saved**
