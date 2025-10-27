# 架構文件

## 專案概述

Vibecoding 3D Viewer 是一個基於 Web 的 3D 模型查看器，專為 Rhino Grasshopper 教學設計。支援多種 3D 檔案格式，提供即時預覽和互動功能。

## 技術決策

### 為什麼同時支援 glTF 和 Rhino 格式？

**Linus 式分析**：這不是過度設計，而是真實需求。

1. **glTF (.glb/.gltf)**
   - Web 標準格式
   - 瀏覽器原生支援
   - 檔案小、載入快
   - 適合已經轉換好的模型

2. **Rhino (.3dm/.gh)**
   - 教學平台的核心格式
   - 學生直接從 Rhino 匯出
   - 無需額外轉換步驟

### 統一載入器設計

```javascript
// model-loader.js - 單一入口
loadModel(file)
  → detectFormat()
  → route to specific loader
  → return unified result
```

**好處**：
- 元件不需要關心格式
- 新增格式只需實作新 loader
- 錯誤處理集中管理

## 資料流

```
用戶上傳檔案
    ↓
UploadArea.jsx
    ↓
loadModel(file)  [model-loader.js]
    ↓
    ├─ .glb/.gltf → GLTFLoader (Three.js)
    └─ .3dm → rhino3dm.js → Three.js Mesh
    ↓
{ success, scene, format, ... }
    ↓
App.jsx (state)
    ↓
ModelViewer.jsx
    ↓
Three.js Canvas 渲染
```

## 核心元件

### 1. ModelViewer.jsx
**職責**：3D 場景渲染

- 使用 React Three Fiber
- OrbitControls（旋轉、縮放）
- 自動居中和縮放模型
- 燈光和環境設定

**輸入**：`modelScene` (Three.js Group/Scene)

**狀態管理**：從 Zustand 讀取檢視器設定

### 2. UploadArea.jsx
**職責**：檔案上傳 UI

- 拖放支援
- 檔案格式驗證
- 載入進度顯示
- 錯誤處理

**輸出**：`onModelLoad(result)` callback

### 3. ModelControls.jsx
**職責**：檢視器控制面板

- 切換網格/座標軸
- 背景顏色選擇
- 連接到 Zustand store

## 狀態管理

### Zustand Store

```javascript
useAppStore {
  // 當前選中的模型
  selectedModel: null,

  // UI 狀態
  isUploading: false,

  // 檢視器設定
  viewerSettings: {
    showGrid: true,
    showAxes: true,
    backgroundColor: '#f5f5f5'
  }
}
```

**為什麼選 Zustand？**
- 零樣板代碼
- 不需要 Provider
- 適合簡單狀態

### TanStack Query
目前預留，用於未來的後端整合：
- 模型列表獲取
- 上傳到伺服器
- 快取管理

## 檔案載入器

### gltf-loader.js
```javascript
loadGLTF(file) → { success, scene, animations, ... }
```

- 使用 Three.js GLTFLoader
- 處理 File 對象和 URL
- 自動清理 blob URL

### rhino.js
```javascript
parse3dmFile(buffer) → { success, scene, meshCount, ... }
```

- 動態載入 rhino3dm.js（避免增加初始包大小）
- 將 Rhino mesh 轉換為 Three.js BufferGeometry
- 處理三角形和四邊形面

**關鍵轉換**：
```javascript
// Rhino faces: [A, B, C, D]
// D === C → triangle
// D !== C → quad (split into 2 triangles)
```

### model-loader.js
統一介面，負責：
1. 格式檢測
2. 路由到對應 loader
3. 統一結果格式
4. 錯誤處理

## 效能考量

### 1. 動態載入
```javascript
// rhino3dm 只在需要時載入
const rhino3dm = await import('rhino3dm')
```

### 2. 模型自動縮放
避免過大或過小的模型：
```javascript
const box = new THREE.Box3().setFromObject(scene)
const size = box.getSize(new THREE.Vector3())
const scale = 5 / Math.max(size.x, size.y, size.z)
```

### 3. 記憶體管理
```javascript
doc.delete() // 清理 rhino3dm document
URL.revokeObjectURL(url) // 清理 blob URL
```

## 可擴展性

### 新增檔案格式
1. 在 `lib/` 建立新 loader（例如 `obj-loader.js`）
2. 實作 `load()` 和 `isValidFile()` 函數
3. 在 `model-loader.js` 註冊新格式
4. 更新 `SUPPORTED_FORMATS`

### 新增功能
- **模型列表**：建立 `features/gallery/`
- **後端上傳**：整合 `lib/api.js` + TanStack Query
- **使用者系統**：新增 `features/auth/`
- **分享功能**：URL 參數 + 後端 API

## 安全考量

### 檔案驗證
```javascript
// 1. 副檔名檢查
isValidModelFile(file)

// 2. 檔案大小限制（可新增）
if (file.size > MAX_SIZE) throw Error()

// 3. MIME type 檢查（可新增）
if (!VALID_TYPES.includes(file.type)) throw Error()
```

### XSS 防護
- 不直接執行使用者上傳的程式碼
- 3D 模型在沙盒環境（Canvas）渲染

## 開發建議

### 除錯
```javascript
// 在 ModelViewer 中加入
console.log('Scene:', modelScene)
console.log('Children:', modelScene.children)
```

### 效能監控
```jsx
import { Perf } from 'r3f-perf'

<Canvas>
  <Perf position="top-left" />
</Canvas>
```

### 測試
1. **單元測試**：loader 函數（jest）
2. **整合測試**：上傳流程（Playwright）
3. **視覺測試**：3D 渲染（手動）

## 後續優化

### Phase 1: 基礎功能（已完成）
- ✅ 多格式支援
- ✅ 拖放上傳
- ✅ 3D 預覽

### Phase 2: 增強功能
- [ ] 本地儲存（IndexedDB）
- [ ] 模型列表管理
- [ ] 截圖功能
- [ ] 測量工具

### Phase 3: 協作功能
- [ ] 後端 API
- [ ] 使用者系統
- [ ] 分享連結
- [ ] 評論功能

### Phase 4: 進階功能
- [ ] 動畫支援
- [ ] VR/AR 模式
- [ ] 批次上傳
- [ ] 自動轉檔

## 常見問題

### Q: 為什麼不用 Next.js？
A: 純客戶端應用，不需要 SSR。Vite 更快更簡單。

### Q: 為什麼不用 Redux？
A: 狀態簡單，Zustand 夠用。遵循「最簡方案」原則。

### Q: 大檔案怎麼辦？
A: 可新增：
1. 檔案分片上傳
2. Web Worker 載入
3. LOD (Level of Detail)

### Q: 效能瓶頸在哪？
A:
1. .3dm 解析（CPU 密集）→ Web Worker
2. 大模型渲染（GPU）→ LOD / Instancing
3. 網路傳輸 → CDN / 壓縮
