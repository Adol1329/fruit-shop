// Build-time friendly mapping of images in src/assets/images to URLs
// Supports dynamic filename lookups like getImageUrl('Fresh Apples.jpeg')

const modules = import.meta.glob('../assets/images/*', { eager: true, as: 'url' })

const imageMap = {}
for (const path in modules) {
  const parts = path.split('/')
  const name = parts[parts.length - 1]
  imageMap[name] = modules[path]
}

export const getImageUrl = (filename) => {
  if (!filename) return null
  return imageMap[filename] || null
}
