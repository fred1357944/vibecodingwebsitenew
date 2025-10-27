import { useAppStore } from '../../store/useAppStore'

/**
 * ModelControls - Control panel for 3D viewer settings
 */
function ModelControls() {
  const { viewerSettings, updateViewerSettings } = useAppStore()

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-3">
      <h3 className="font-medium text-gray-900">檢視器設定</h3>

      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={viewerSettings.showGrid}
          onChange={(e) => updateViewerSettings({ showGrid: e.target.checked })}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-700">顯示網格</span>
      </label>

      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={viewerSettings.showAxes}
          onChange={(e) => updateViewerSettings({ showAxes: e.target.checked })}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-700">顯示座標軸</span>
      </label>

      <div>
        <label className="block text-sm text-gray-700 mb-1">背景顏色</label>
        <input
          type="color"
          value={viewerSettings.backgroundColor}
          onChange={(e) => updateViewerSettings({ backgroundColor: e.target.value })}
          className="w-full h-8 rounded cursor-pointer"
        />
      </div>
    </div>
  )
}

export default ModelControls
