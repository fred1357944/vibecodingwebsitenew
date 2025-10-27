# Bug 修復紀錄

## 修復日期
2025-10-26

## 問題描述
開發伺服器無法正常啟動，出現以下錯誤：
1. GLTFLoader 導入路徑錯誤
2. Tailwind CSS v4 配置不相容

## 修復內容

### 1. GLTFLoader 導入路徑修正

**檔案**: `src/lib/gltf-loader.js:1`

**修改前**:
```javascript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
```

**修改後**:
```javascript
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
```

**原因**: Three.js r150+ 版本改變了 examples 的導入路徑結構

---

### 2. Tailwind CSS v4 配置更新

**檔案**: `src/styles/index.css`

**修改前**:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**修改後**:
```css
@import "tailwindcss";
```

**原因**: Tailwind CSS v4 採用全新的 CSS 導入語法

---

## 測試結果

✅ **開發伺服器啟動成功**
```bash
VITE v6.4.1  ready in 257 ms
➜  Local:   http://localhost:3000/
```

✅ **無編譯錯誤**
✅ **無 PostCSS 錯誤**
✅ **無 Three.js 導入錯誤**

## 相關依賴版本

| 套件 | 版本 |
|------|------|
| three | ^0.180.0 |
| tailwindcss | ^4.1.16 |
| @tailwindcss/postcss | ^4.1.16 |
| vite | ^6.0.3 |

## 後續注意事項

### Three.js 版本相容性
- Three.js r150+ 使用新的 `addons/` 路徑
- 未來新增的 loader 也需使用相同路徑格式
- 例如：`DRACOLoader`, `KTX2Loader` 等

### Tailwind CSS v4 語法
- 不再使用 `@tailwind` 指令
- 統一使用 `@import "tailwindcss"`
- PostCSS 需要 `@tailwindcss/postcss` 插件

## 驗證步驟

1. **啟動開發伺服器**:
   ```bash
   npm run dev
   ```

2. **訪問應用**:
   打開 http://localhost:3000

3. **測試功能**:
   - 上傳 .glb 檔案
   - 上傳 .3dm 檔案
   - 3D 檢視器旋轉、縮放
   - Tailwind CSS 樣式正常顯示

## Linus 式總結

### ✅ 問題根源
**資料結構錯誤**：導入路徑是程式碼的「資料結構」，用錯了就全盤皆錯。

### ✅ 修復原則
1. **直接解決核心問題**：改路徑，不是 workaround
2. **遵循官方規範**：Three.js 和 Tailwind 都有明確的遷移指南
3. **簡化配置**：Tailwind v4 從 3 行變 1 行

### ❌ 沒做的事
- 沒有降級依賴（避免向後退）
- 沒有用 patch-package（治標不治本）
- 沒有添加額外配置（保持簡潔）

---

**修復完成，系統正常運行。**
