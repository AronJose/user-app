import config from '../../config/index';
import { api } from '../../Helper/axios';

export async function uploadFile(payload) {
    return api()
        .post(config.routes.fileUpload, payload.file, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => res.data)
}

export async function createProductionHouse(payload) {
    return api()
        .post(config.routes.production, payload)
        .then((res) =>res.data)
}

export async function getProductionHouses(payload) {
    return api()
        .get(config.routes.production, payload)
        .then((res) => res.data)
}

// export async function productionHouses(payload) {
//     return api()
//         .get(config.routes.production, payload)
//         .then((res) => res.data)
// }

export async function updateProductionHouse(payload) {
    console.log(payload, "payload");
    return api()
        .put(`${config.routes.production}/${payload.id}`, payload.data)
        .then((res) => res.data)
}