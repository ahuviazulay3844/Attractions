import { api } from './client'

export const attractionsApi = {
  getAll: () => api.get('/Attraction/getAllDto'),
  getById: (id) => api.get(`/Attraction/getDto/${id}`),
  add: (attraction) => api.post('/Attraction/addDto', attraction),
  update: (attraction) => api.put('/Attraction/updateDto', attraction),
  remove: (id) => api.del(`/Attraction/delete/${id}`),
}
