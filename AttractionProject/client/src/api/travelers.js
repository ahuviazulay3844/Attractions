import { api } from './client'

export const travelersApi = {
  getAll: () => api.get('/travel/getAllDto'),
  getById: (id) => api.get(`/travel/getDto/${id}`),
  add: (traveler) => api.post('/travel/addDto', traveler),
  update: (traveler) => api.put('/travel/updateDto', traveler),
  remove: (id) => api.del(`/travel/delete/${id}`),
}
