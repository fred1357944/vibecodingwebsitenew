import { useState } from 'react'
import ModelViewer from './components/3d/ModelViewer'
import ModelControls from './components/3d/ModelControls'
import UploadArea from './features/upload/UploadArea'
import { getFormatDisplayName } from './lib/model-loader'

function App() {
  const [currentModel, setCurrentModel] = useState(null)
  const [modelInfo, setModelInfo] = useState(null)

  const handleModelLoad = (result) => {
    if (result.success) {
      setCurrentModel(result.scene)
      setModelInfo({
        fileName: result.fileName,
        fileSize: (result.fileSize / 1024).toFixed(2) + ' KB',
        format: getFormatDisplayName(result.format),
        meshCount: result.meshCount || result.objectCount || 'N/A',
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Vibecoding 3D Viewer
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Rhino Grasshopper 3D 檔案查看器 - 支援 .3dm, .gh, .glb, .gltf
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Upload & Controls */}
          <div className="space-y-6">
            {/* Upload Area */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                上傳模型
              </h2>
              <UploadArea onModelLoad={handleModelLoad} />
            </div>

            {/* Model Info */}
            {modelInfo && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  模型資訊
                </h3>
                <dl className="space-y-2 text-sm">
                  <div>
                    <dt className="text-gray-500">檔案名稱</dt>
                    <dd className="text-gray-900 font-medium break-all">
                      {modelInfo.fileName}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">檔案大小</dt>
                    <dd className="text-gray-900 font-medium">
                      {modelInfo.fileSize}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">格式</dt>
                    <dd className="text-gray-900 font-medium">
                      {modelInfo.format}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">網格數量</dt>
                    <dd className="text-gray-900 font-medium">
                      {modelInfo.meshCount}
                    </dd>
                  </div>
                </dl>
              </div>
            )}

            {/* Viewer Controls */}
            <ModelControls />
          </div>

          {/* Right Column - 3D Viewer */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                3D 預覽
              </h2>
              <ModelViewer modelScene={currentModel} />

              {!currentModel && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    上傳檔案以開始 3D 預覽
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
