import * as service from './service'
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';


export const Auth = {


    state: {
        user: [],
        login: [],
        Google: [],
        fb: [],
        instagram: []
    },
    reducers: {
        onAddUserSuccess: (state, user) => {
            return {
                ...state,
                user: user
            };
        },
        displayError: (state, error) => {
            return toast(' 🚀' + error.data.error.errors[0].message, {
                position: "top-right",
                theme: 'light'
            });
        },
        onLoginSuccess: (state, login) => {
            return {
                ...state,
                login: login
            };
        },
        displayLoginError: (state, error) => {
            return toast(' 🚀' + error.data.userdetails.message, {
                position: "top-right",
                theme: 'light'
            });
        },


        onloginGoogleSuccess: (state, Google) => {
            return {
                ...state,
                Google: Google
            };
        },

        onfbLoginSuccess: (state, fb) => {
            return {
                ...state,
                fb: fb
            }
        },
        onInstaLoginSuccess: (state, instagram) => {
            return {
                ...state,
                instagram: instagram
            }
        }
    },
    effects: () => ({
        async addUser(payload) {
            try {
                let createUser = await service.addUser(payload);
                this.onAddUserSuccess(createUser);
                return createUser;
            }
            catch (e) {
                console.log("inside catch of add user", e.response)
                this.displayError(e.response)
            }
        },
        async loginUser(payload) {
            try {
                let login = await service.loginUser(payload);
                this.onLoginSuccess(login);
                return login;
            } catch (e) {
                this.displayLoginError(e.response)
            }
        },
        async loginGoogle(payload) {
            let Googlelogin = await service.loginGoogle(payload);
            this.onloginGoogleSuccess(Googlelogin);
            setAuthTokenCookies(Googlelogin.token)
            return Googlelogin;
        },
        async fbLogin(payload) {
            let facebookLogin = await service.fbLogin(payload);
            this.onfbLoginSuccess(facebookLogin);
            setAuthTokenCookies(facebookLogin.token)
            return facebookLogin;
        },
        async InstaLogin(payload) {
            let instagramLogin = await service.InstaLogin(payload);
            this.onInstaLoginSuccess(instagramLogin);
            setAuthTokenCookies(instagramLogin.token)
            return instagramLogin;
        }
    })
}

const setAuthTokenCookies = (token) => {
    Cookies.set('authToken', token);
}