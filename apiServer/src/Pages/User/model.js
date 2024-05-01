import * as service from './service'

export const user = {
    state: {
        users: [],
    },
    reducers: {
        onFetchUserSuccess: (state, data) => {
            return {
                ...state,
                users: data
            };
        },
    },
    effects: () => ({
        async getUsers(payload) {
            let res = await service.getUsers(payload);
            this.onFetchUserSuccess(res);
            return res;
        },
    }),
};