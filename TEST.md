# 測試指南

## ✅ 快速驗證

### 1. 檢查開發伺服器
```bash
npm run dev
```

應該顯示：
```
✓ VITE v6.4.1  ready in xxx ms
➜  Local:   http://localhost:3000/
```

### 2. 訪問頁面
打開瀏覽器訪問：http://localhost:3000

### 3. 視覺檢查

你應該看到：

#### Header（頁首）
- ✅ 白色背景
- ✅ 陰影效果
- ✅ 標題「Vibecoding 3D Viewer」
- ✅ 副標題說明支援格式

#### 左側欄位
- ✅ 「上傳模型」區塊（白色卡片）
- ✅ 拖放上傳區域（虛線框）
- ✅ 上傳圖示
- ✅ 「檢視器設定」區塊
  - 網格顯示 checkbox
  - 座標軸顯示 checkbox
  - 背景顏色選擇器

#### 右側欄位
- ✅ 「3D 預覽」區塊
- ✅ 灰色預覽區域
- ✅ 提示文字「選擇或上傳 3D 模型以開始」

### 4. 樣式檢查

打開瀏覽器開發者工具（F12）：

#### Console 標籤
- ❌ 不應該有紅色錯誤
- ✅ 可能有 warnings（忽略）

#### Network 標籤
重新整理頁面，檢查：
- ✅ `index.css` 載入成功（200 狀態碼）
- ✅ `main.jsx` 載入成功
- ✅ 所有資源綠色/灰色（無紅色）

#### Elements 標籤
找到 `<div id="root">`：
- ✅ 內部應該有完整的 HTML 結構
- ✅ 不應該是空的

### 5. Tailwind CSS 驗證

在 Console 輸入：
```javascript
getComputedStyle(document.querySelector('header')).backgroundColor
```

應該返回：
```
"rgb(255, 255, 255)"  // 白色
```

或者檢查 class 是否生效：
```javascript
document.querySelector('.bg-white')
```

應該返回一個元素（非 null）

---

## 🧪 功能測試

### 測試 1: Checkbox 互動
1. 點擊「顯示網格」checkbox
2. 應該可以勾選/取消勾選
3. 點擊「顯示座標軸」checkbox
4. 應該可以勾選/取消勾選

### 測試 2: 顏色選擇器
1. 點擊背景顏色選擇器
2. 應該出現顏色選擇器面板
3. 選擇不同顏色
4. 選擇器應該更新

### 測試 3: 上傳區域懸停
1. 將滑鼠移到上傳區域
2. 邊框顏色應該從灰色變深
3. 背景應該有微妙變化

---

## 🐛 常見問題

### Q: 頁面還是空白
**A**: 檢查步驟
1. 打開 Console，看是否有錯誤
2. 確認 `npm run dev` 沒有錯誤
3. 嘗試硬重整（Ctrl+Shift+R 或 Cmd+Shift+R）
4. 清除瀏覽器快取

### Q: 樣式不正確（沒有顏色/排版）
**A**: Tailwind CSS 沒有載入
1. 檢查 Network 標籤，確認 CSS 檔案載入
2. 檢查 Console 是否有 CSS 錯誤
3. 重啟開發伺服器

### Q: 看到「Failed to fetch dynamically imported module」
**A**: Vite 快取問題
```bash
# 停止伺服器
# 刪除快取
rm -rf node_modules/.vite
# 重新啟動
npm run dev
```

### Q: 端口 3000 被佔用
**A**: Vite 會自動換端口
```
Port 3000 is in use, trying another one...
➜  Local:   http://localhost:3001/
```
使用新的端口即可

---

## ✨ 成功標準

**所有這些都應該是 ✅**:

- [ ] 開發伺服器啟動無錯誤
- [ ] 頁面顯示完整 UI
- [ ] Tailwind CSS 樣式正確
- [ ] Console 無紅色錯誤
- [ ] 所有元件正常顯示
- [ ] 互動元件（checkbox, color picker）正常運作

**如果全部通過，系統運行正常！** 🎉

---

## 📸 預期截圖

頁面應該看起來像這樣：

```
┌─────────────────────────────────────────────────┐
│  Vibecoding 3D Viewer                           │ ← Header (白色+陰影)
│  Rhino Grasshopper 3D 檔案查看器 - 支援...     │
├──────────────┬──────────────────────────────────┤
│ 上傳模型     │ 3D 預覽                          │
│ ┌──────────┐ │ ┌──────────────────────────────┐ │
│ │ [拖放]   │ │ │                              │ │
│ │ 上傳     │ │ │   選擇或上傳 3D 模型以開始   │ │
│ │ 區域     │ │ │                              │ │
│ └──────────┘ │ └──────────────────────────────┘ │
│              │                                  │
│ 檢視器設定   │                                  │
│ □ 顯示網格   │                                  │
│ □ 顯示座標軸 │                                  │
│ 背景顏色 ■   │                                  │
└──────────────┴──────────────────────────────────┘
```

---

**需要協助？** 檢查 Console 錯誤訊息並提供給開發者。
