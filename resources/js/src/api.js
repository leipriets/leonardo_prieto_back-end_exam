const axios = window.axios;
axios.defaults.headers.common["Authorization"] = "Bearer " +sessionStorage.getItem('authenticated');
axios.defaults.headers.common["Accept"] = "application/json";

const BASE_API_URL = 'http://127.0.0.1:8000/api'

export default {
    login: (post) => axios.post(`${BASE_API_URL}/login`, post),
    getAllUsers: () => axios.get(`${BASE_API_URL}/users`),
    getUserbyId: (id) => axios.get(`${BASE_API_URL}/users/${id}/edit`),
    addUser: (post) => axios.post(`${BASE_API_URL}/users`, post),
    updateUser: (post, id) =>  axios.put(`${BASE_API_URL}/users/${id}`, post),
    deleteUser: (id) => axios.delete(`${BASE_API_URL}/users/${id}`),
    getAccessLeveList: () => axios.get(`${BASE_API_URL}/access-levels`),
    deletedUsers: () => axios.get(`${BASE_API_URL}/users/trashed`),
    patchUser: (id) =>  axios.patch(`${BASE_API_URL}/users/${id}/restore`),
    forceDelete: (id) =>  axios.delete(`${BASE_API_URL}/users/${id}/forcedelete`),
}