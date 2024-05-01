import config from '../../config/index';
import { api } from '../../Helper/axios';


export async function addUser(payload) {
    return api()
        .post(config.routes.users, payload)
        .then((res) => res.data)
}

export async function loginUser(payload) {
    return api()
        .post(config.routes.login, payload)
        .then((res) => res.data)

}

export async function loginGoogle(payload) {
    console.log("inside service ", payload)
    return api()
        .post(config.routes.google, payload)
        .then((res) => res.data
        )
}


export async function fbLogin(payload) {
    return api()
        .post(config.routes.fb, payload)
    .then((res)=>res.data)
}

export async function InstaLogin(payload) {
    return api()
        .post(config.routes.instagram, payload)
        .then((res) => res.data) 
}