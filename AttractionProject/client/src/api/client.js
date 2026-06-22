// Base URL is proxied by Vite to the Spring Boot server (http://localhost:8585)
const BASE_URL = '/api'

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || `שגיאת שרת (${res.status})`)
  }

  // DELETE / empty bodies
  if (res.status === 204) return null
  const contentType = res.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) return null
  const body = await res.text()
  return body ? JSON.parse(body) : null
}

export const api = {
  get: (path) => request(path),
  post: (path, data) => request(path, { method: 'POST', body: JSON.stringify(data) }),
  put: (path, data) => request(path, { method: 'PUT', body: JSON.stringify(data) }),
  del: (path) => request(path, { method: 'DELETE' }),
  // multipart upload (file + json part) for images
  upload: async (path, formData) => {
    const res = await fetch(`${BASE_URL}${path}`, { method: 'POST', body: formData })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new Error(text || `שגיאת העלאה (${res.status})`)
    }
    const body = await res.text()
    return body ? JSON.parse(body) : null
  },
}
