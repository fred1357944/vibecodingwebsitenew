import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid, Environment, PerspectiveCamera } from '@react-three/drei'
import { useAppStore } from '../../store/useAppStore'

/**
 * Scene component that renders the loaded model
 */
function Scene({ modelScene }) {
  const sceneRef = useRef()

  useEffect(() => {
    if (modelScene && sceneRef.current) {
      // Clear previous model
      sceneRef.current.clear()

      // Add new model
      sceneRef.current.add(modelScene.clone())

      // Center and scale the model
      const box = new THREE.Box3().setFromObject(sceneRef.current)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())

      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 5 / maxDim

      sceneRef.current.position.set(-center.x, -center.y, -center.z)
      sceneRef.current.scale.multiplyScalar(scale)
    }
  }, [modelScene])

  return <group ref={sceneRef} />
}

/**
 * ModelViewer - 3D model viewer component
 * Supports both glTF/GLB and Rhino .3dm files
 */
function ModelViewer({ modelScene, className = '' }) {
  const { viewerSettings } = useAppStore()

  if (!modelScene) {
    return (
      <div className={`w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
        <p className="text-gray-500">選擇或上傳 3D 模型以開始</p>
      </div>
    )
  }

  return (
    <div className={`w-full h-96 bg-gray-100 rounded-lg overflow-hidden ${className}`}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[10, 10, 10]} />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} />

        {/* Model */}
        <Scene modelScene={modelScene} />

        {/* Environment */}
        {viewerSettings.showGrid && <Grid args={[20, 20]} />}
        {viewerSettings.showAxes && (
          <>
            <axesHelper args={[5]} />
          </>
        )}

        <Environment preset="studio" />

        {/* Controls */}
        <OrbitControls
          makeDefault
          minDistance={1}
          maxDistance={100}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  )
}

export default ModelViewer
