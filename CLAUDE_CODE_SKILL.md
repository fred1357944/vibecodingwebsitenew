# Claude Code Skill: React + Vite + Three.js 專案開發

## 專案概述

**專案類型**：React 3D 檔案檢視器
**技術棧**：Vite + React 18 + Tailwind CSS + React Three Fiber + Rhino3dm
**開發時間**：2025-10-26
**遇到問題數**：6 個主要問題

---

## 📋 完整問題清單與解決方案

### 問題 1: Vite 專案初始化失敗

**症狀**：
```bash
npm create vite@latest . -- --template react
# → Operation cancelled (目錄不為空)
```

**原因**：
- 目錄已存在 `.git` 資料夾
- Vite 不允許在非空目錄初始化

**解決方案**：
```bash
# 方案 A: 手動建立檔案
# 建立 package.json, vite.config.js, index.html 等

# 方案 B: 使用空目錄
npm create vite@latest my-app -- --template react
```

**學到的教訓**：
- ✅ 先初始化 Git，再建立專案檔案
- ✅ 或使用子目錄，完成後移動檔案

---

### 問題 2: Tailwind CSS v4 不穩定

**症狀**：
```
[postcss] It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin
```

**錯誤配置**：
```javascript
// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {},  // v4 專用插件
  },
}
```

```css
/* index.css - v4 語法 */
@import "tailwindcss/theme" layer(theme);
@import "tailwindcss/preflight" layer(base);
@import "tailwindcss/utilities" layer(utilities);
```

**原因**：
- Tailwind CSS v4 還在 alpha/beta
- 配置方式與 v3 完全不同
- 工具鏈支援不足

**解決方案**：
```bash
# 降級到穩定的 v3
npm uninstall tailwindcss @tailwindcss/postcss --legacy-peer-deps
npm install -D tailwindcss@^3.4.0 postcss autoprefixer --legacy-peer-deps
```

```javascript
// postcss.config.js (v3)
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

```css
/* index.css (v3) */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```javascript
// tailwind.config.js (v3)
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**學到的教訓**：
- ❌ 不要使用 alpha/beta 版本於生產環境
- ✅ 選擇穩定的 LTS 版本
- ✅ 檢查官方文檔的「穩定性」標示

---

### 問題 3: GLTFLoader 導入路徑錯誤

**症狀**：
```
Module not found: Can't resolve 'three/examples/jsm/loaders/GLTFLoader'
```

**錯誤代碼**：
```javascript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
```

**原因**：
- Three.js r150+ 改變了 examples 路徑
- 舊路徑：`three/examples/jsm/`
- 新路徑：`three/addons/`

**解決方案**：
```javascript
// ✅ 正確 (Three.js r150+)
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
```

**其他常見 Loader**：
```javascript
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js'
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
```

**學到的教訓**：
- ✅ 查閱當前 Three.js 版本的官方文檔
- ✅ 注意版本升級的 Breaking Changes
- ✅ 記得加 `.js` 副檔名

---

### 問題 4: React Three Fiber 版本不相容

**症狀**：
```
Uncaught TypeError: Cannot read properties of undefined (reading 'S')
at createReconciler
```

**錯誤配置**：
```json
{
  "react": "^18.3.1",
  "@react-three/fiber": "^9.4.0",   // ❌ 需要 React 19
  "@react-three/drei": "^10.7.6",   // ❌ 需要 React 19
  "three": "^0.180.0"
}
```

**原因**：
- React Three Fiber v9+ 需要 React 19
- React 19 還在 RC 階段
- 使用 `--legacy-peer-deps` 繞過了版本檢查

**解決方案**：
```bash
# 降級到 React 18 相容版本
npm uninstall @react-three/fiber @react-three/drei three --legacy-peer-deps
npm install three@~0.169.0 @react-three/fiber@~8.17.0 @react-three/drei@~9.114.0 --legacy-peer-deps
```

**正確配置**：
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "@react-three/fiber": "~8.17.0",  // ✅ 支援 React 18
  "@react-three/drei": "~9.114.0",  // ✅ 支援 React 18
  "three": "^0.169.0"
}
```

**學到的教訓**：
- ❌ 不要盲目使用 `--legacy-peer-deps`
- ✅ 檢查 `peerDependencies`：`npm info @react-three/fiber peerDependencies`
- ✅ 使用 `~` 而非 `^` 鎖定版本

---

### 問題 5: 瀏覽器快取導致空白頁面

**症狀**：
- 伺服器正常運行
- HTML、CSS、JS 都正確編譯
- 但瀏覽器顯示空白

**原因**：
- 瀏覽器快取了舊版本的 JavaScript
- 修改代碼後未清除快取

**解決方案**：

**方案 A: 硬重整**
```
Windows/Linux: Ctrl + Shift + R
Mac: Cmd + Shift + R
```

**方案 B: 清除快取**
1. Chrome/Edge: 開發者工具 → 右鍵重整 → 清除快取並強制重新整理
2. Firefox: 開發者工具 → 右鍵重整 → 清除快取

**方案 C: 無痕模式**
```
Chrome/Edge: Ctrl + Shift + N
Firefox: Ctrl + Shift + P
```

**方案 D: 清除 Vite 快取**
```bash
rm -rf node_modules/.vite
npm run dev
```

**學到的教訓**：
- ✅ 修改代碼後，總是硬重整
- ✅ 使用無痕模式測試
- ✅ 定期清除 Vite 快取

---

### 問題 6: 版本符號誤用

**問題**：使用 `^` 導致意外升級

**版本符號對比**：
```json
{
  "package": "^1.2.3",  // ❌ 允許 1.x.x (可能破壞相容性)
  "package": "~1.2.3",  // ✅ 只允許 1.2.x (安全)
  "package": "1.2.3"    // ✅ 完全鎖定
}
```

**實際案例**：
```json
{
  // ❌ 危險：可能升級到 9.5.0, 9.6.0...
  "@react-three/fiber": "^9.4.0"

  // ✅ 安全：只升級到 8.17.x
  "@react-three/fiber": "~8.17.0"
}
```

**學到的教訓**：
- ✅ 使用 `~` 鎖定次版本
- ✅ 提交 `package-lock.json` 到版本控制
- ✅ 定期審查依賴更新

---

## 🛠️ 最佳實踐檢查清單

### 專案初始化

- [ ] 先初始化 Git：`git init`
- [ ] 建立 `.gitignore`
- [ ] 安裝依賴時檢查相容性
- [ ] 使用穩定版本，避免 alpha/beta

### 依賴管理

- [ ] 檢查 `peerDependencies`：`npm info <package> peerDependencies`
- [ ] 使用 `~` 鎖定版本
- [ ] 提交 `package-lock.json`
- [ ] 記錄為什麼選擇特定版本

### Tailwind CSS

- [ ] 使用穩定的 v3（除非 v4 正式發布）
- [ ] 配置 `content` 路徑
- [ ] 測試 CSS 是否正確載入

### Three.js / React Three Fiber

- [ ] 使用 `three/addons/` 路徑（r150+）
- [ ] React 18 → 使用 R3F v8.x
- [ ] React 19 → 使用 R3F v9.x
- [ ] 測試 Console 無錯誤

### 開發流程

- [ ] 修改後硬重整瀏覽器
- [ ] 檢查 Console 錯誤
- [ ] 檢查 Network 載入狀態
- [ ] 定期清除 Vite 快取

---

## 🔍 診斷流程

### 步驟 1: 檢查伺服器

```bash
# 開發伺服器是否正常？
npm run dev

# 應該看到：
✓ VITE v6.x.x ready in xxx ms
➜ Local: http://localhost:3000/
```

### 步驟 2: 檢查 HTML

```bash
curl http://localhost:3000 | grep "root"

# 應該看到：
<div id="root"></div>
```

### 步驟 3: 檢查 Console

打開瀏覽器開發者工具 (F12) → Console 標籤

**正常**：無紅色錯誤
**異常**：記錄錯誤訊息

### 步驟 4: 檢查 Network

開發者工具 → Network 標籤 → 重新整理

**檢查**：
- `index.html` → 200
- `main.jsx` → 200
- `index.css` → 200

**異常**：404、500 → 檢查檔案路徑

### 步驟 5: 清除快取

```bash
# 清除 Vite 快取
rm -rf node_modules/.vite

# 清除 npm 快取
npm cache clean --force

# 重新安裝
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 版本相容性表

### React 18 技術棧（推薦）

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "@react-three/fiber": "~8.17.0",
  "@react-three/drei": "~9.114.0",
  "three": "^0.169.0",
  "tailwindcss": "^3.4.18",
  "vite": "^6.0.3"
}
```

### React 19 技術棧（未來）

```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "@react-three/fiber": "^9.0.0",
  "@react-three/drei": "^10.0.0",
  "three": "^0.170.0"
}
```

---

## 🚨 常見陷阱

### 陷阱 1: 使用 --legacy-peer-deps 繞過所有警告

**錯誤做法**：
```bash
npm install --legacy-peer-deps  # 盲目使用
```

**正確做法**：
```bash
# 先檢查為什麼有警告
npm install  # 看錯誤訊息

# 理解問題後，選擇相容版本
npm install package@compatible-version
```

### 陷阱 2: 追求最新版本

**錯誤思維**：
- "v10 比 v9 新，一定更好"
- "剛發布的 v4.0.0，試試看"

**正確思維**：
- "v9 穩定且符合需求"
- "等 v4 穩定 6 個月再考慮"

### 陷阱 3: 忽略 Console 錯誤

**錯誤做法**：
```
看到頁面空白 → 繼續開發其他功能
```

**正確做法**：
```
看到頁面空白 → 立即打開 Console → 解決錯誤
```

### 陷阱 4: 不提交 package-lock.json

**後果**：
- 不同開發者安裝不同版本
- CI/CD 環境版本不一致
- 難以重現 bug

**解決**：
```bash
git add package-lock.json
git commit -m "Lock dependency versions"
```

---

## 💡 Linus 式原則

### 1. 穩定性 > 新功能 > 最新版本

```
不要：使用最新的 alpha/beta 版本
應該：使用穩定的 LTS 版本
```

### 2. 理解 > 繞過

```
不要：用 --legacy-peer-deps 繞過警告
應該：理解為什麼有警告，解決根本問題
```

### 3. 簡單 > 複雜

```
不要：Tailwind v4 的複雜配置
應該：Tailwind v3 的簡單配置
```

### 4. 測試 > 假設

```
不要：假設代碼能運行
應該：打開 Console 確認無錯誤
```

---

## 📖 參考資源

### 官方文檔

- **Vite**: https://vitejs.dev/
- **React**: https://react.dev/
- **Tailwind CSS**: https://tailwindcss.com/
- **Three.js**: https://threejs.org/
- **React Three Fiber**: https://docs.pmnd.rs/react-three-fiber/

### 版本檢查工具

```bash
# 檢查套件的 peer dependencies
npm info <package-name> peerDependencies

# 檢查已安裝版本
npm list <package-name>

# 檢查可用版本
npm view <package-name> versions
```

### 除錯工具

```bash
# Vite 詳細輸出
npm run dev -- --debug

# 清除所有快取
rm -rf node_modules/.vite node_modules/.cache

# 檢查端口佔用
lsof -i :3000  # Mac/Linux
netstat -ano | findstr :3000  # Windows
```

---

## ✅ 成功標準

### 開發環境

- [ ] `npm run dev` 無錯誤啟動
- [ ] 瀏覽器 Console 無紅色錯誤
- [ ] 頁面正確顯示 UI
- [ ] Tailwind CSS 樣式正確
- [ ] 3D 檢視器正常（如適用）

### 生產環境

- [ ] `npm run build` 成功建置
- [ ] 打包大小合理
- [ ] 無 console 警告
- [ ] 所有功能正常運作

---

## 🎯 下次開發速查表

### 快速啟動新專案

```bash
# 1. 初始化
git init
npm create vite@latest . -- --template react

# 2. 安裝 Tailwind (v3)
npm install -D tailwindcss@^3.4.0 postcss autoprefixer
npx tailwindcss init -p

# 3. 安裝 Three.js (React 18)
npm install three@~0.169.0 @react-three/fiber@~8.17.0 @react-three/drei@~9.114.0

# 4. 配置 Tailwind
# 編輯 tailwind.config.js, src/index.css

# 5. 測試
npm run dev
# 打開 http://localhost:3000
# 檢查 Console
```

### 遇到問題時

```bash
# 1. 檢查 Console 錯誤
# 2. 硬重整 (Ctrl+Shift+R)
# 3. 清除快取
rm -rf node_modules/.vite
# 4. 重啟伺服器
npm run dev
```

---

**最後更新**：2025-10-26
**適用範圍**：React 18 + Vite 6 + Tailwind 3 + Three.js r169 + React Three Fiber v8
