import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'production'
  ? '/api/contacts'
  : `http://localhost:${process.env.PORT || 3001}/api/contacts`;

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then(response => response.data);
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(() => id);
}

const update = (newPerson, id) => {
  const request = axios.put(`${baseUrl}/${id}`, newPerson);
  return request.then(response => response.data);
}

const actions = {
  getAll,
  create,
  remove,
  update 
}

export default actions;

