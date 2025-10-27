# 專案文件索引

## 📚 文件清單

### 🎯 快速開始
- **README.md** - 專案概述和使用說明
- **QUICKSTART.md** - 5 分鐘快速開始指南

### 🛠️ Claude Code Skill（重要）
- **CLAUDE_CODE_SKILL.md** ⭐ - **完整的問題與解決方案教學**
  - 6 個主要問題的詳細分析
  - 最佳實踐檢查清單
  - 版本相容性表
  - Linus 式原則
  - 診斷流程

- **PROBLEMS_SUMMARY.md** ⭐ - **問題快速參考**
  - 問題按嚴重程度排序
  - 核心教訓總結
  - 快速修復指令
  - 給未來的自己

### 🐛 Bug 修復紀錄
- **BUGFIX.md** - GLTFLoader 路徑錯誤
- **BUGFIX-v2.md** - Tailwind CSS v4 降級到 v3
- **BUGFIX-v3.md** - React Three Fiber 版本相容性

### 🔧 技術文件
- **ARCHITECTURE.md** - 完整技術架構說明
- **TROUBLESHOOT.md** - 故障排除指南
- **TEST.md** - 測試指南

### 🔗 其他
- **debug.html** - 瀏覽器診斷頁面
- **.vscode/settings.json** - VS Code 設定
- **.vscode/extensions.json** - 推薦的 VS Code 擴充套件

---

## 🎓 學習路徑

### 第一次使用這個專案

1. **README.md** - 了解專案是什麼
2. **QUICKSTART.md** - 快速啟動開發伺服器
3. **TEST.md** - 驗證一切正常

### 遇到問題時

1. **TROUBLESHOOT.md** - 查看常見問題
2. **PROBLEMS_SUMMARY.md** - 查看快速參考
3. **CLAUDE_CODE_SKILL.md** - 深入理解問題

### 開始新專案時

1. **CLAUDE_CODE_SKILL.md** - 閱讀完整教學
2. **PROBLEMS_SUMMARY.md** - 記住核心教訓
3. 使用「下次開發速查表」

---

## 📖 核心文件對比

| 文件 | 用途 | 閱讀時間 | 適用場景 |
|------|------|---------|---------|
| **CLAUDE_CODE_SKILL.md** | 完整教學 | 30 分鐘 | 深入學習 |
| **PROBLEMS_SUMMARY.md** | 快速參考 | 5 分鐘 | 遇到問題 |
| **QUICKSTART.md** | 快速啟動 | 2 分鐘 | 開始開發 |
| **TROUBLESHOOT.md** | 故障排除 | 10 分鐘 | 除錯 |

---

## 🎯 最常用的 3 個文件

### 1. CLAUDE_CODE_SKILL.md
**什麼時候讀**：
- 開始類似的新專案前
- 遇到版本相容性問題
- 想理解為什麼這樣設計

**核心內容**：
- 6 個主要問題的完整分析
- 版本相容性表
- 最佳實踐檢查清單

### 2. PROBLEMS_SUMMARY.md
**什麼時候讀**：
- 快速複習問題
- 需要快速修復指令
- 時間緊迫時

**核心內容**：
- 問題嚴重程度排序
- 快速修復指令
- 核心教訓

### 3. QUICKSTART.md
**什麼時候讀**：
- 第一次啟動專案
- 忘記如何啟動
- 需要測試步驟

**核心內容**：
- 安裝步驟
- 測試方法
- 支援的格式

---

## 💡 使用建議

### 場景 1: 開始新的 React + Three.js 專案

```
1. 讀 CLAUDE_CODE_SKILL.md 的「下次開發速查表」
2. 複製版本配置
3. 按照步驟執行
4. 遇到問題查 PROBLEMS_SUMMARY.md
```

### 場景 2: 專案出現空白頁

```
1. 打開 TROUBLESHOOT.md
2. 按照「解決方案」步驟執行
3. 如果沒解決，查看 PROBLEMS_SUMMARY.md
4. 檢查是否是已知問題
```

### 場景 3: 安裝新套件遇到版本衝突

```
1. 查看 CLAUDE_CODE_SKILL.md 的「版本相容性表」
2. 使用推薦的版本組合
3. 檢查 peerDependencies
4. 記錄在 CLAUDE.md 中
```

---

## 🔍 快速搜尋

### 常見關鍵字

| 關鍵字 | 查看文件 | 章節 |
|--------|---------|------|
| 空白頁面 | TROUBLESHOOT.md | 問題：網頁顯示空白 |
| 版本不相容 | CLAUDE_CODE_SKILL.md | 問題 4 |
| GLTFLoader | CLAUDE_CODE_SKILL.md | 問題 3 |
| Tailwind | CLAUDE_CODE_SKILL.md | 問題 2 |
| 快取 | TROUBLESHOOT.md | 方案 1 |
| Three.js | CLAUDE_CODE_SKILL.md | 版本相容性表 |

---

## 📝 文件維護

### 何時更新

- ✅ 遇到新問題時 → 更新 CLAUDE_CODE_SKILL.md
- ✅ 發現新的解決方案 → 更新 TROUBLESHOOT.md
- ✅ 版本升級後 → 更新版本相容性表
- ✅ 最佳實踐改變 → 更新 PROBLEMS_SUMMARY.md

### 更新原則

1. **保持簡潔** - 只記錄重要問題
2. **提供脈絡** - 說明為什麼而不只是如何
3. **實際測試** - 確保解決方案有效
4. **標註日期** - 記錄何時遇到問題

---

## 🎯 下一步

### 如果你是第一次看到這個專案

```bash
# 1. 閱讀 README.md (2 分鐘)
cat README.md

# 2. 快速啟動 (5 分鐘)
cat QUICKSTART.md
npm install
npm run dev

# 3. 深入學習 (30 分鐘)
cat CLAUDE_CODE_SKILL.md
```

### 如果你遇到問題

```bash
# 1. 查看快速參考 (2 分鐘)
cat PROBLEMS_SUMMARY.md

# 2. 故障排除 (5 分鐘)
cat TROUBLESHOOT.md

# 3. 深入分析 (10 分鐘)
cat CLAUDE_CODE_SKILL.md
```

---

## 📊 文件統計

| 類型 | 數量 | 總字數 |
|------|------|--------|
| 教學文件 | 2 | ~8,000 |
| 技術文件 | 3 | ~6,000 |
| Bug 紀錄 | 3 | ~4,000 |
| 快速指南 | 2 | ~3,000 |

**總計**：11 個文件，約 21,000 字

---

**建議閱讀順序**：
1. INDEX.md（本檔案）← 你在這裡
2. QUICKSTART.md
3. CLAUDE_CODE_SKILL.md ⭐
4. PROBLEMS_SUMMARY.md ⭐

**最重要的兩個檔案**：
- ⭐ CLAUDE_CODE_SKILL.md
- ⭐ PROBLEMS_SUMMARY.md
