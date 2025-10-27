import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, Grid } from '@react-three/drei'
import { Suspense } from 'react'

/**
 * Basic React Three Fiber Model Viewer
 * Compatible with React 18 + R3F v8.17.0
 */
function Scene({ children }) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />

      {/* Environment */}
      <Environment preset="sunset" />

      {/* Grid */}
      <Grid infiniteGrid cellSize={1} cellThickness={0.5} sectionSize={5} />

      {/* Model */}
      <Suspense fallback={null}>
        {children}
      </Suspense>
    </>
  )
}

export default function ModelViewer({ modelScene }) {
  return (
    <div className="w-full h-screen">
      <Canvas shadows>
        {/* Camera */}
        <PerspectiveCamera makeDefault position={[10, 10, 10]} />

        {/* Scene */}
        <Scene>
          {modelScene && <primitive object={modelScene} />}
        </Scene>

        {/* Controls */}
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={5}
          maxDistance={100}
        />
      </Canvas>
    </div>
  )
}
