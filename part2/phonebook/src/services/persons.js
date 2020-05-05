import axios from 'axios';
const baseUrl = "http://localhost:3001/persons/";

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (person) => {
  return axios.post(baseUrl, person)
}

const remove = (person) => {
  return axios.delete(`${baseUrl}${person.id}`, person)
}

const update = (id, updatedPerson) => {
  const request = axios.put(`${baseUrl}${id}`, updatedPerson)
  return request.then(response => response.data)
}

export default { getAll, create, remove, update }