import * as service from './service'
import { toast } from 'react-toastify';

export const MyProfile = {

    state: {
        profile: [],
        fileUpload: []
    },
    
    reducers: {
        onMyProfileSuccess: (state, Data) => {
            return {
                ...state,
                profile: Data
            };
        },
        displayProfileError: (state, error) => {
            console.error('Profile Error:', error);
            return toast(' 🚀' + error.data.error.errors[0].message, {
                position: "top-right",
                theme: 'light'
            });
        },

        onProfileImageUploadSuccess: (state, profileImage) => {
            return {
                ...state,
                fileUpload: profileImage
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
        async profile(payload) {
            try {
                let res = await service.profile(payload);
                this.onMyProfileSuccess(res);
                return res;
            } catch (e) {
                this.displayProfileError(e.response);
            }
        },

        async updateProfile(payload) {
            try {
                console.log("hi model profile");
                let res = await service.putProfile(payload);
                return res;
            } catch (e) {
                this.displayProfileError(e.response);
            }
        },

        async uploadFile(payload) {
            try {
                let files = await service.uploadFile(payload);
                this.onProfileImageUploadSuccess(files);
                return files;
            } catch (error) {
                this.displayFileUploadError(error.response);
            }

        },
    })
}