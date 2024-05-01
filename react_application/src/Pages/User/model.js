import * as service from './service'
import { toast } from 'react-toastify';

export const user = {
    state: {
        users: [],
        userDetails: [],
        Postuser: [],
        fileUpload: []
    },
    reducers: {
        //----------------------------------User List ------------------------------------------------
        onFetchUserSuccess: (state, data) => {
            return {
                ...state,
                users: data
            }
        },
        displayUserError: (state, error) => {
            return toast(' 🚀' + error.data.error.errors[0].message, {
                position: "top-right",
                theme: 'light'
            });
        },
        //---------------------------------User Details-----------------------------------------------
        onFetchUserDetailsSuccess: (state, userData) => {
            return {
                ...state,
                userDetails: userData
            };
        },
        displayUserDetailsError: (state, error) => {
            return toast(' 🚀' + error.data.error.errors[0].message, {
                position: "top-right",
                theme: 'light'
            });
        },
        //----------------------------------Add USer--------------------------------------------------
        onPostUserSuccess: (state, Postusers) => {
            return {
                ...state,
                Postuser: Postusers
            };
        },
        displayError: (state, error) => {
            return toast(' 🚀' + error.data.error.errors[0].message, {
                position: "top-right",
                theme: 'light'
            });
        },
        //----------------------------------- File Upload-----------------------------------------------
        onfileUploadSuccess: (state, fileImage) => {
            return {
                ...state,
                fileUpload: fileImage 
            }
        },
        displayFileUploadError: (state, error) => {
            return toast(' 🚀' + error.data.error.errors[0].message, {
                position: "top-right",
                theme: 'light'
            });
        },
    },
    effects: () => ({
        //----------------------------------------------User List---------------------------------------
        async getUsers(payload) {
            try {
                let res = await service.getUsers(payload);
                this.onFetchUserSuccess(res);
                return res;
            } catch (error) {
                this.displayUserError(error.response);
            }  
        },
        //----------------------------------------------User Details------------------------------------
        async getUserDetails(payload) {
            try {  
                let D_User = await service.getUserDetails(payload);
                this.onFetchUserDetailsSuccess(D_User);
                return D_User;
            } catch (e) {
                this.displayUserDetailsError(e.response);
            }
        },     
        //------------------------------------------------Add USer---------------------------------------
        async postUser(payload) {
            try {
                let createUSer = await service.postUser(payload);
                this.onPostUserSuccess(createUSer);
                return createUSer;
            } catch (e) {
                this.displayError(e.response);
            }
        },
        //------------------------------------------------delete ----------------------------------------
        async deleteUser(payload) {
            try {
                let userDelete = await service.deleteUser(payload);
                return userDelete
            } catch (error) {
                this.displayError(error.response);
            }
        },
        //----------------------------------------------Edit User----------------------------------------
        async putUser(payload) {
            try {
                let userEdit = await service.putUser(payload);
                return userEdit;
            } catch (error) {
                this.displayError(error.response);
            }
        },
        //-------------------------------------------Image Upload----------------------------------------
        async uploadFile(payload) {
            try {
                let files = await service.uploadFile(payload);
                this.onfileUploadSuccess(files);
                return files;  
            } catch (error) {
                this.displayFileUploadError(error.response);
            }
           
        },
       
    }),
};