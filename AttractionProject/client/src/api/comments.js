import { api } from './client'

// The Comments entity holds nested attraction + traveler objects,
// so we send/read them through the non-DTO endpoints.
export const commentsApi = {
  getAll: () => api.get('/Comments/getAll'),
  getByAttraction: (id) => api.get(`/Comments/byAttraction/${id}`),
  getById: (id) => api.get(`/Comments/get/${id}`),
  add: (comment) => api.post('/Comments/add', comment),
  update: (comment) => api.put('/Comments/update', comment),
  remove: (id) => api.del(`/Comments/delete/${id}`),
}
