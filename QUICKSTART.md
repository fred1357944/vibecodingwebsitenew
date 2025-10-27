# 快速開始指南

## 1️⃣ 安裝依賴

```bash
npm install
```

## 2️⃣ 啟動開發伺服器

```bash
npm run dev
```

伺服器將在 **http://localhost:3000** 啟動

## 3️⃣ 測試功能

### 上傳 glTF/GLB 檔案
1. 找一個 .glb 或 .gltf 測試檔案
2. 拖放到「上傳模型」區域
3. 模型會立即在右側顯示

### 上傳 Rhino 檔案
1. 準備一個 .3dm 檔案
2. 拖放上傳
3. 系統會自動解析並顯示

### 3D 控制
- **旋轉**: 左鍵拖動
- **平移**: 右鍵拖動
- **縮放**: 滾輪

### 檢視器設定
- 左側面板可以切換網格/座標軸顯示
- 可自訂背景顏色

## 📦 支援的格式

| 格式 | 說明 | 載入器 |
|------|------|--------|
| `.glb` | glTF 二進制格式 | gltf-loader.js |
| `.gltf` | glTF JSON 格式 | gltf-loader.js |
| `.3dm` | Rhino 3D 模型 | rhino.js (rhino3dm) |
| `.gh` | Grasshopper 定義 | rhino.js (計劃支援) |

## 🧪 取得測試檔案

### glTF 範例
- [Khronos glTF Sample Models](https://github.com/KhronosGroup/glTF-Sample-Models)
- 下載任何 .glb 檔案測試

### Rhino 範例
- 使用你自己的 Rhino 檔案
- 或從 Rhino 匯出 .3dm 檔案

## 🚀 建置生產版本

```bash
npm run build
```

產物會在 `dist/` 目錄

## 📝 專案結構

```
src/
├── components/3d/       # 3D 相關元件
│   ├── ModelViewer.jsx  # 主檢視器
│   └── ModelControls.jsx
├── features/upload/     # 上傳功能
│   └── UploadArea.jsx
├── lib/                 # 核心工具
│   ├── model-loader.js  # 統一載入器
│   ├── gltf-loader.js   # glTF 載入器
│   └── rhino.js         # Rhino 載入器
└── store/              # 狀態管理
    └── useAppStore.js
```

## ❓ 常見問題

### Q: 上傳後沒反應？
A: 檢查瀏覽器控制台是否有錯誤訊息

### Q: 模型太大或太小？
A: 系統會自動縮放，但可能需要調整相機位置（用滾輪縮放）

### Q: 支援哪些瀏覽器？
A: Chrome、Firefox、Edge（需支援 WebGL）

## 🔧 開發模式

### 檔案監控
Vite 會自動監控檔案變更並熱重載

### 調試
打開瀏覽器開發者工具查看 Console

### 效能監控
React Three Fiber 提供內建的效能監控工具
