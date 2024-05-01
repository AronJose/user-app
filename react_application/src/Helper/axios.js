import axios from "axios";
import config from "../../src/config/index";
import  Cookies  from 'js-cookie';

const tokenVerify = Cookies.get('authToken');
const customHeader = () => ({
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, /",
    Authorization: tokenVerify
});

export function api() {
    let opts = {
        baseURL: config.api.trim(),
        headers: customHeader(),
    };
    return axios.create(opts);
}