// ✅ CORRECT import path for Three.js r150+
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

/**
 * Load glTF/GLB files
 * @param {File|string} source - File object or URL
 * @returns {Promise<{success: boolean, scene: THREE.Group, animations: Array}>}
 */
export async function loadGLTF(source) {
  const loader = new GLTFLoader()

  try {
    let url
    if (source instanceof File) {
      url = URL.createObjectURL(source)
    } else {
      url = source
    }

    const gltf = await new Promise((resolve, reject) => {
      loader.load(
        url,
        resolve,
        undefined,
        reject
      )
    })

    // Clean up object URL if created
    if (source instanceof File) {
      URL.revokeObjectURL(url)
    }

    return {
      success: true,
      scene: gltf.scene,
      animations: gltf.animations,
      cameras: gltf.cameras,
      asset: gltf.asset
    }
  } catch (error) {
    console.error('GLTF loading error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Load with progress tracking
 */
export async function loadGLTFWithProgress(source, onProgress) {
  const loader = new GLTFLoader()

  const url = source instanceof File ? URL.createObjectURL(source) : source

  try {
    const gltf = await new Promise((resolve, reject) => {
      loader.load(
        url,
        resolve,
        (xhr) => {
          const percent = (xhr.loaded / xhr.total) * 100
          onProgress?.(percent)
        },
        reject
      )
    })

    if (source instanceof File) {
      URL.revokeObjectURL(url)
    }

    return {
      success: true,
      scene: gltf.scene,
      animations: gltf.animations
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}
