import client from './client';

// get
export const getList = () => {
  return client.get('/actors');
};

// detail
export const getDetail = (id) => {
  return client.get(`/actors/${id}`);
};

// create
export const createActor = (params) => {
  return client.post('/actors', params);
};

// update
export const updateActor = (id, params) => {
  return client.put(`/actors/${id}`, params);
};

// delete
export const deleteActor = (id) => {
  return client.delete(`/actors/${id}`);
};