# Vibecoding 3D Viewer

Rhino Grasshopper 教學平台 - 3D 檔案上傳與預覽系統

## 技術棧

- **Frontend Framework**: React 18 + Vite
- **UI Framework**: Tailwind CSS
- **3D Rendering**: Three.js + React Three Fiber
- **State Management**: Zustand + TanStack Query
- **3D File Support**: rhino3dm (支援 .3dm 格式)

## 專案結構

```
src/
├── components/       # 通用元件
│   ├── ui/          # 基礎 UI 元件
│   ├── layout/      # 佈局元件
│   └── 3d/          # 3D 相關元件
├── features/        # 功能模組
│   ├── upload/      # 上傳功能
│   └── gallery/     # 模型畫廊
├── hooks/           # Custom hooks
├── lib/             # 工具庫
├── store/           # Zustand stores
└── styles/          # 全域樣式
```

## 開始使用

### 安裝依賴

```bash
npm install
```

### 開發模式

```bash
npm run dev
```

伺服器將在 http://localhost:3000 啟動

### 建置生產版本

```bash
npm run build
```

### 預覽生產版本

```bash
npm run preview
```

## 環境變數

複製 `.env.example` 為 `.env` 並設定必要的環境變數：

```bash
cp .env.example .env
```

## 核心功能

✅ **多格式支援**
- `.glb` / `.gltf` - glTF 格式（Web 標準 3D 格式）
- `.3dm` - Rhino 3D 模型檔案
- `.gh` - Grasshopper 定義檔案

✅ **3D 檢視功能**
- 拖放上傳檔案
- 即時 3D 預覽
- 軌道控制（旋轉、縮放、平移）
- 網格與座標軸顯示
- 背景顏色自訂

✅ **統一載入架構**
- 自動檢測檔案格式
- 統一的載入介面
- 錯誤處理與驗證

## 技術架構

### 檔案載入流程

```
上傳檔案
    ↓
model-loader.js (統一入口)
    ↓
檢測格式
    ├─ .glb/.gltf → gltf-loader.js → Three.js 直接載入
    └─ .3dm/.gh   → rhino.js → rhino3dm 解析 → Three.js Mesh
    ↓
ModelViewer 渲染
```

### 狀態管理策略

- **Zustand**: 簡單的全域狀態（使用者資訊、UI 狀態、檢視器設定）
- **TanStack Query**: API 相關狀態（資料獲取、快取、重試）- 預留後端整合

### 元件結構

- `ModelViewer` - 3D 場景渲染（支援所有格式）
- `ModelControls` - 檢視器控制面板
- `UploadArea` - 拖放上傳元件
- `model-loader.js` - 統一模型載入器

## 使用方式

1. 啟動開發伺服器：`npm run dev`
2. 打開 http://localhost:3000
3. 拖放或點擊上傳 .glb、.gltf、.3dm 檔案
4. 使用滑鼠拖動旋轉、滾輪縮放

## 後續開發計劃

- [ ] 模型列表與管理（本地儲存）
- [ ] 後端 API 整合（上傳至伺服器）
- [ ] 使用者認證系統
- [ ] 模型分享功能
- [ ] 截圖與匯出
- [ ] 多模型比較檢視
