import config from '../../config/index';
import { api } from '../../Helper/axios';

export async function putProfile(payload) {
    return api()
        .put(config.routes.profile, payload)
        .then((res) => res.data)
}

export async function profile(payload) {
    return api()
        .get(config.routes.profile, payload)
        .then((res) => res.data)
}

export async function uploadFile(payload) {
    return api()
        .post(config.routes.fileUpload, payload.file, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => res.data)
}