import config from '../../config/index';
import { api } from '../../Helper/axios';


//-----------------------------------------------user List---------------------------------------------
export async function getUsers(payload) {
    return api()
        .get(`${config.routes.users}?page=${payload}`)
        .then((res) => res.data)
}

//-----------------------------------------------User Details-----------------------------------------
export async function getUserDetails(payload) {
    return api()
        .get(`${config.routes.users}/${payload}`)
        .then((res) => res.data)
}

//----------------------------------------------- Add User---------------------------------------------
export async function postUser(payload) {
    return api()
        .post(config.routes.users, payload)
        .then((res) => res.data)  
}
//----------------------------------------------- Edit User-------------------------------------------
export async function putUser(payload) {
    return api()
        .put(`${config.routes.users}/${payload.id}`,payload)
        .then((res) => res.data)
}

//--------------------------------------------- Delete User ------------------------------------------
export async function deleteUser(payload) {
    console.log(payload,"payload in delete")
    return api()
        .delete(`${config.routes.users}/${payload}`)
        .then((res) => res.data)
}

//-------------------------------------------- Image Upload--------------------------------------------
export async function uploadFile(payload) {
    return api()
        .post(config.routes.fileUpload, payload.file, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }})
        .then((res) => res.data) 
}

