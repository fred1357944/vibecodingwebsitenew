import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

/**
 * Load glTF/glb file
 * @param {string|File} source - URL string or File object
 * @returns {Promise<Object>} Loaded glTF scene
 */
export async function loadGLTF(source) {
  const loader = new GLTFLoader()

  try {
    let url

    // Handle File object
    if (source instanceof File) {
      url = URL.createObjectURL(source)
    } else {
      url = source
    }

    // Load the model
    const gltf = await new Promise((resolve, reject) => {
      loader.load(
        url,
        (gltf) => resolve(gltf),
        undefined,
        (error) => reject(error)
      )
    })

    // Clean up blob URL if created
    if (source instanceof File) {
      URL.revokeObjectURL(url)
    }

    return {
      success: true,
      scene: gltf.scene,
      animations: gltf.animations,
      cameras: gltf.cameras,
      asset: gltf.asset,
    }
  } catch (error) {
    console.error('Error loading glTF:', error)
    return {
      success: false,
      error: error.message,
    }
  }
}

/**
 * Check if file is a valid glTF file
 * @param {File} file - File to check
 * @returns {boolean}
 */
export function isGLTFFile(file) {
  const validExtensions = ['.glb', '.gltf']
  return validExtensions.some(ext => file.name.toLowerCase().endsWith(ext))
}
