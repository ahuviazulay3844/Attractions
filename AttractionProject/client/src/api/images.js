import { api } from './client'

export const imagesApi = {
  getAll: () => api.get('/imageAttr/getAll'),
  remove: (id) => api.del(`/imageAttr/delete/${id}`),
  // upload expects two parts: "file" (binary) and "product" (JSON dto)
  upload: (file, attractionId) => {
    const formData = new FormData()
    formData.append('file', file)
    const product = new Blob(
      [JSON.stringify({ Attraction: attractionId ? { id: Number(attractionId) } : null })],
      { type: 'application/json' },
    )
    formData.append('product', product)
    return api.upload('/imageAttr/addDto', formData)
  },
}
