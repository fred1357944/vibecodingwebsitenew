import { loadGLTF, isGLTFFile } from './gltf-loader'
import { parse3dmFile, isRhinoFile } from './rhino'

/**
 * Supported file formats
 */
export const SUPPORTED_FORMATS = {
  GLTF: ['.glb', '.gltf'],
  RHINO: ['.3dm', '.gh'],
}

/**
 * Get all supported extensions as array
 */
export function getSupportedExtensions() {
  return [...SUPPORTED_FORMATS.GLTF, ...SUPPORTED_FORMATS.RHINO]
}

/**
 * Get file extension
 * @param {File} file
 * @returns {string}
 */
function getFileExtension(file) {
  return file.name.substring(file.name.lastIndexOf('.')).toLowerCase()
}

/**
 * Detect file format type
 * @param {File} file
 * @returns {'gltf'|'rhino'|'unknown'}
 */
export function detectFileFormat(file) {
  if (isGLTFFile(file)) return 'gltf'
  if (isRhinoFile(file)) return 'rhino'
  return 'unknown'
}

/**
 * Validate if file format is supported
 * @param {File} file
 * @returns {boolean}
 */
export function isValidModelFile(file) {
  const ext = getFileExtension(file)
  return getSupportedExtensions().includes(ext)
}

/**
 * Universal model loader - routes to appropriate loader based on file type
 * @param {File} file - The model file to load
 * @returns {Promise<Object>} Standardized result object
 */
export async function loadModel(file) {
  const format = detectFileFormat(file)

  if (format === 'unknown') {
    return {
      success: false,
      error: `Unsupported file format. Supported: ${getSupportedExtensions().join(', ')}`,
      format: 'unknown',
    }
  }

  try {
    let result

    switch (format) {
      case 'gltf':
        result = await loadGLTF(file)
        break

      case 'rhino':
        const buffer = await file.arrayBuffer()
        result = await parse3dmFile(buffer)
        break

      default:
        return {
          success: false,
          error: 'Unknown format',
          format,
        }
    }

    return {
      ...result,
      format,
      fileName: file.name,
      fileSize: file.size,
    }
  } catch (error) {
    console.error('Error loading model:', error)
    return {
      success: false,
      error: error.message,
      format,
      fileName: file.name,
    }
  }
}

/**
 * Get human-readable format name
 * @param {string} format
 * @returns {string}
 */
export function getFormatDisplayName(format) {
  const names = {
    gltf: 'glTF/GLB',
    rhino: 'Rhino 3D',
    unknown: 'Unknown',
  }
  return names[format] || 'Unknown'
}
