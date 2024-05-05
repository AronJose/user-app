import * as service from './service'
import { toast } from 'react-toastify';

export const productionHouse = {
      
    state: {
        productionHouses: [],
        productionHouseImage: [],
        productionHouseList:[],
        getproductionHouse:[]
    },
    
    reducers: {

        // --------Profile Image Upload--------------------
        onProductionHouseImage: (state, profileImage) => {
            return {
                ...state,
                productionHouseImage: profileImage
            }
        },
        displayFileUploadError: (state, error) => {
            return toast(' 🚀' + error.data.error.errors[0].message, {
                position: "top-right",
                theme: 'light'
            });
        },

        // -----------Create Production House ---------------------
        oncreateProductionHouse: (state, createHouse) => {
            return {
                ...state,
                productionHouses: createHouse
            }
        },
        displaycreateProductionHouse: (state, error) => {
            return toast(' 🚀' + error.data.error.errors[0].message, {
                position: "top-right",
                theme: 'light'
            });
        },
        // ------------List of production House --------------------
        onGetListProductionHouse: (state, productionList) => {
            return {
                ...state,
                productionHouseList: productionList 
            }
        },
        displayProductionHouseListError: (state, error) => {
            return toast(' 🚀' + error.data.error.errors[0].message, {
                position: "top-right",
                theme: 'light'
            });
        },


        onGetByIdProductionHouse:(state,getproductionHouse)=>{
            return {
                ...state,
                getproductionHouse: getproductionHouse 
            }
        }
    },


    effects: () => ({

        // --------Profile Image Upload--------------------
        async uploadFile(payload) {
            try {
                let files = await service.uploadFile(payload);
                this.onProductionHouseImage(files);
                return files;
            } catch (error) {
                this.displayFileUploadError(error.response);
            }
        },

        // --------Create Production House-------------------
        async createProductionHouse(payload) {
            try {
                let res = await service.createProductionHouse(payload);
                this.oncreateProductionHouse(res);
                return res;
            } catch (error) {
                this.displaycreateProductionHouse(error.response);
            }
        },

        // -------------List of Production House ---------------
        async getProductionHouses(payload) {
            try {
                let productions = await service.getProductionHouses(payload);
                this.onGetListProductionHouse(productions);
                return productions;
            } catch (error) {
                this.displayProductionHouseListError(error.response);
            }
        },

        //------------Production House ---------------------------
        // async getByIdProductionHouses(payload) {
        //     try {
        //         let productions = await service.productionHouses(payload);
        //         this.onGetByIdProductionHouse(productions);
        //         return productions;
        //     } catch (error) {
        //         this.displayProductionHouseListError(error.response);
        //     }
        // }, 

        // -----------Edit Production House -------------------------
        async updateProductionHouse(payload) {
            try {
                console.log("hi model ");
                let res = await service.updateProductionHouse(payload);
                console.log(payload,"payload modal")
                return res;
            } catch (e) {
                this.displaycreateProductionHouse(e.response);
            }
        },
    })
  }  
