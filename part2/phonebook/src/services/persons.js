import axios from 'axios'

//For development use the below
const baseUrl = 'http://localhost:3001/persons'
//For build use the below
// const baseUrl = '/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deleteObject = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, updatedObject) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedObject)
    return request.then(response => response.data)
}

export default {
    getAll,
    create,
    deleteObject,
    update
}