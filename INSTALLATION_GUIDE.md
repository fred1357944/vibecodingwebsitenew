# Claude Code Plugin 安裝指南

## ⚠️ 重要：Claude Code 沒有中央 Marketplace！

**常見誤解：**
❌ 在某個 marketplace 列表中搜索 "react-three-toolkit"
❌ 像 VS Code Extensions 那樣瀏覽安裝

**正確理解：**
✅ 直接通過 **Git URL** 安裝
✅ 類似 `npm install` 從 GitHub 安裝

---

## 🚨 當前問題：Repo 是 Private

你的 repo 目前返回 404，說明它是 **private**。

Claude Code Plugin **必須從 public repo 安裝**（除非你配置了 Git 認證）。

---

## 🔧 解決方案：設置 Repo 為 Public

### 步驟 1：前往 GitHub Settings

```
1. 打開 https://github.com/fred1357944/vibecodingwebsitenew
2. 點擊右上角 "Settings" 標籤
3. 滾動到最底部 "Danger Zone"
4. 點擊 "Change visibility"
5. 選擇 "Change to public"
6. 輸入 repo 名稱確認：vibecodingwebsitenew
7. 點擊 "I understand, change repository visibility"
```

### 步驟 2：驗證 Repo 可訪問

在瀏覽器中訪問：
```
https://github.com/fred1357944/vibecodingwebsitenew
```

應該看到：
- ✅ 項目文件列表
- ✅ README.md 內容
- ✅ 沒有 404 錯誤

---

## 📦 安裝 Plugin（Repo Public 後）

### ⚠️ 重要：必須先添加 Marketplace！

Claude Code 使用 marketplace 系統管理 plugins。

### 步驟 1：添加 Marketplace

在 Claude Code 對話中運行：

```bash
/plugin marketplace add fred1357944/vibecodingwebsitenew
```

或使用命令行：

```bash
claude plugin marketplace add fred1357944/vibecodingwebsitenew
```

### 步驟 2：安裝 Plugin

添加 marketplace 後，安裝 plugin：

```bash
/plugin install react-three-toolkit@vibecoding-marketplace
```

或使用命令行：

```bash
claude plugin install react-three-toolkit@vibecoding-marketplace
```

### 方法 2：本地測試（開發用）

```bash
cd /Users/laihongyi/Downloads/vibecodingwebsitenew
claude plugin marketplace add ./
claude plugin install react-three-toolkit@vibecoding-marketplace
```

---

## ✅ 驗證安裝

### 步驟 1：查看 Marketplaces

```bash
claude plugin marketplace list
```

應該看到：

```
vibecoding-marketplace (fred1357944/vibecodingwebsitenew)
  Plugins:
  - react-three-toolkit (1.0.0)
```

### 步驟 2：查看已安裝的 Plugins

```bash
claude plugin list
```

應該看到：

```
react-three-toolkit (1.0.0) [@vibecoding-marketplace]
  Skills:
  - react-three-setup
```

### 測試 Skill 是否啟動

在 Claude Code 對話中輸入：

```
幫我設置一個 React Three.js 項目
```

Claude 應該會自動使用 `react-three-setup` skill，並使用正確的版本：
- React 18.3.1
- @react-three/fiber ~8.17.0
- Tailwind CSS ^3.4.18

---

## 🔍 故障排除

### 問題 1：找不到 Marketplace

**症狀：**
```bash
claude plugin install react-three-toolkit@vibecoding-marketplace
Error: Plugin not found in any configured marketplace
```

**原因：**
- 忘記先添加 marketplace
- 或者 repo 是 private

**解決：**
```bash
# 1. 檢查已配置的 marketplaces
claude plugin marketplace list

# 2. 如果沒有，先添加
claude plugin marketplace add fred1357944/vibecodingwebsitenew

# 3. 驗證 repo 可訪問（如果是 private 會失敗）
curl -I https://github.com/fred1357944/vibecodingwebsitenew

# 應該返回 200，不是 404
```

### 問題 2：Plugin 安裝了但 Skill 沒啟動

**症狀：**
Claude 沒有使用 react-three-setup skill

**原因：**
- Skill 路徑錯誤
- SKILL.md 格式錯誤

**檢查：**
```bash
# 1. 驗證 plugin.json 中的路徑
cat .claude-plugin/plugin.json | grep "path"

# 應該顯示：
# "path": "skills/react-three-setup"

# 2. 驗證 Skill 文件存在
ls -la .claude/skills/react-three-setup/SKILL.md

# 3. 驗證 YAML frontmatter
head -15 .claude/skills/react-three-setup/SKILL.md
```

### 問題 3：Permission denied

**症狀：**
```bash
claude plugin install git@github.com:...
Permission denied (publickey)
```

**解決：**
使用 HTTPS URL 而不是 SSH：
```bash
claude plugin install https://github.com/fred1357944/vibecodingwebsitenew
```

---

## 📤 分享給團隊

### 團隊成員安裝

設置 repo 為 public 後，團隊成員執行兩個步驟：

```bash
# 步驟 1：添加 marketplace
claude plugin marketplace add fred1357944/vibecodingwebsitenew

# 步驟 2：安裝 plugin
claude plugin install react-three-toolkit@vibecoding-marketplace
```

或者使用 Claude Code 對話：

```
/plugin marketplace add fred1357944/vibecodingwebsitenew
/plugin install react-three-toolkit@vibecoding-marketplace
```

### 企業內部（Private Repo）

如果必須保持 private，需要配置 Git 認證：

```bash
# 1. 設置 Personal Access Token
gh auth login

# 2. 安裝
claude plugin install https://github.com/fred1357944/vibecodingwebsitenew
```

---

## 🎯 正確的安裝流程

```
1. 設置 Repo 為 Public
   ↓
2. 驗證 Repo 可訪問（瀏覽器打開）
   ↓
3. 添加 Marketplace
   claude plugin marketplace add fred1357944/vibecodingwebsitenew
   ↓
4. 驗證 Marketplace
   claude plugin marketplace list
   ↓
5. 安裝 Plugin
   claude plugin install react-three-toolkit@vibecoding-marketplace
   ↓
6. 驗證安裝
   claude plugin list
   ↓
7. 測試 Skill
   在對話中提到 "React Three.js"
   ↓
8. 確認自動啟動
   Claude 應該使用正確的版本
```

---

## 📚 更多資訊

- **Plugin 文檔：** `.claude-plugin/plugin.json`
- **Skill 文檔：** `.claude/skills/react-three-setup/README.md`
- **完整流程：** `WORKFLOW.md`
- **發布指南：** `.claude/skills/react-three-setup/PUBLISHING.md`

---

## ⚡ 快速檢查清單

安裝前：
- [ ] Repo 已設置為 public
- [ ] 可以在瀏覽器訪問 https://github.com/fred1357944/vibecodingwebsitenew
- [ ] plugin.json 中的 URL 正確（已修復 ✅）

安裝後：
- [ ] `claude plugin list` 顯示 react-three-toolkit
- [ ] 對話中提到 React Three.js 時 Skill 自動啟動
- [ ] 使用正確的版本（React 18 + R3F v8）

---

**最新狀態：**
- ✅ plugin.json URLs 已更新為 fred1357944
- ✅ 已推送到 GitHub (commit 6d9da3e)
- ⚠️  等待：設置 repo 為 public

**下一步：**
1. 前往 GitHub Settings 設置 repo 為 public
2. 運行安裝命令測試
3. 享受自動版本管理！ 🚀
