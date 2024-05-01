import axios from 'axios';

export async function getUsers(payload) {

    let response = await axios.get(`https://reqres.in/api/users/?page=${payload}`)
    return response.data.data;
}