import * as THREE from 'three'

// Rhino3dm utilities
// Helper functions for working with Rhino files

/**
 * Load rhino3dm library
 * @returns {Promise<any>} rhino3dm instance
 */
export async function loadRhino3dm() {
  const rhino3dm = await import('rhino3dm')
  return rhino3dm.default()
}

/**
 * Convert Rhino mesh data to Three.js mesh
 * @param {Object} rhinoMesh - Rhino mesh object
 * @returns {THREE.Mesh|null}
 */
function rhinoMeshToThreeMesh(rhinoMesh) {
  if (!rhinoMesh) return null

  const vertices = rhinoMesh.vertices().toFloatArray()
  const faces = rhinoMesh.faces().toIntArray()
  const normals = rhinoMesh.normals().toFloatArray()

  // Create BufferGeometry
  const geometry = new THREE.BufferGeometry()

  // Convert faces to Three.js indices
  const indices = []
  for (let i = 0; i < faces.length; i += 4) {
    // Rhino faces: [A, B, C, D] where D == C means triangle
    const a = faces[i]
    const b = faces[i + 1]
    const c = faces[i + 2]
    const d = faces[i + 3]

    // Add first triangle
    indices.push(a, b, c)

    // Add second triangle if quad
    if (c !== d) {
      indices.push(a, c, d)
    }
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
  geometry.setIndex(indices)

  // Create material
  const material = new THREE.MeshStandardMaterial({
    color: 0xcccccc,
    side: THREE.DoubleSide,
  })

  return new THREE.Mesh(geometry, material)
}

/**
 * Parse .3dm file and convert to Three.js scene
 * @param {ArrayBuffer} fileBuffer - The .3dm file buffer
 * @returns {Promise<Object>} Parsed scene data (compatible with glTF loader)
 */
export async function parse3dmFile(fileBuffer) {
  try {
    const rhino = await loadRhino3dm()
    const doc = rhino.File3dm.fromByteArray(new Uint8Array(fileBuffer))

    // Create a group to hold all meshes
    const scene = new THREE.Group()
    let meshCount = 0

    // Extract all objects from the file
    for (let i = 0; i < doc.objects().count; i++) {
      const obj = doc.objects().get(i)
      const geometry = obj.geometry()

      // Convert to mesh if not already
      const rhinoMesh = geometry.getMesh(rhino.MeshType.Any)

      if (rhinoMesh) {
        const threeMesh = rhinoMeshToThreeMesh(rhinoMesh)
        if (threeMesh) {
          scene.add(threeMesh)
          meshCount++
        }
      }
    }

    doc.delete() // Clean up rhino3dm document

    return {
      success: true,
      scene,
      meshCount,
      objectCount: doc.objects().count,
    }
  } catch (error) {
    console.error('Error parsing 3dm file:', error)
    return {
      success: false,
      error: error.message,
    }
  }
}

/**
 * Check if file is a valid Rhino file
 * @param {File} file - File to check
 * @returns {boolean}
 */
export function isRhinoFile(file) {
  const validExtensions = ['.3dm', '.gh']
  return validExtensions.some(ext => file.name.toLowerCase().endsWith(ext))
}
