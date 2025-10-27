import { useState, useRef } from 'react'
import { loadModel, isValidModelFile, getSupportedExtensions } from '../../lib/model-loader'
import { useAppStore } from '../../store/useAppStore'

/**
 * UploadArea - Drag & drop file upload component
 * Supports .3dm, .gh, .glb, .gltf files
 */
function UploadArea({ onModelLoad }) {
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)
  const { setIsUploading } = useAppStore()

  const handleFile = async (file) => {
    if (!file) return

    // Validate file format
    if (!isValidModelFile(file)) {
      setError(`不支援的檔案格式。支援格式：${getSupportedExtensions().join(', ')}`)
      return
    }

    setError(null)
    setIsLoading(true)
    setIsUploading(true)

    try {
      // Load the model
      const result = await loadModel(file)

      if (result.success) {
        // Pass the scene to parent component
        if (onModelLoad) {
          onModelLoad(result)
        }
      } else {
        setError(result.error || '載入模型失敗')
      }
    } catch (err) {
      setError(err.message || '發生未知錯誤')
      console.error('Upload error:', err)
    } finally {
      setIsLoading(false)
      setIsUploading(false)
    }
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleFileInput = (e) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      <div
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
          transition-all duration-200
          ${isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }
          ${isLoading ? 'opacity-50 pointer-events-none' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={getSupportedExtensions().join(',')}
          onChange={handleFileInput}
          className="hidden"
        />

        <div className="space-y-3">
          {isLoading ? (
            <>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
              <p className="text-lg font-medium text-gray-700">載入中...</p>
            </>
          ) : (
            <>
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div>
                <p className="text-lg font-medium text-gray-700">
                  拖曳檔案至此或點擊上傳
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  支援格式：{getSupportedExtensions().join(', ')}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  )
}

export default UploadArea
