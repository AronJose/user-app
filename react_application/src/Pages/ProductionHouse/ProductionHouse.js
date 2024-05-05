import React, { useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import ModalProductionHouse from './ModalProductionHouse';

function ProductionHouse({ productionHouseInfo, setShowModal, showModal, edit, setEdit }) {

    const [productionHouse, setproductionHouse] = useState({})
    const [deleteModal, setDeleteModal] = useState(false);
    const handleClick = (productionData) => {
        if (productionData) {
            setproductionHouse(productionData)
        }
        setShowModal(true);
    }

    const handleDeleteModal = async (id) => {
        setDeleteModal(true)
        if (id) {

        }
    }
    return (
        <>
            {
                productionHouseInfo && productionHouseInfo.map((productions) => (
                    <div className="border-2 border-gray-300 rounded-lg px-8 h-20 grid grid-cols-5 ">
                        <div className="col-span-3 flex items-center ">
                            <img className="w-12 h-12 rounded-full" src={`http://localhost:8080/${productions.production_house_image}`} />
                            <div className="m-2 ">
                                <p className="font-semibold text-base text-gray-600 font-inter flex justify-start ">{productions.production_house_name}</p>
                                <p className="text-sm text-gray-500">{productions.createdAt}</p>
                            </div>
                        </div>
                        <div className="col-span-2 flex justify-end items-center">
                            <i className="fas fa-edit text-gray-500 mr-2" onClick={() => handleClick(productions)} ></i>
                            <i className="fas fa-trash-alt text-gray-500" onClick={()=>handleDeleteModal(productions.id)}></i>
                        </div>
                    </div>
                ))}
            {
                showModal && (
                    <ModalProductionHouse edit={edit} setEdit={setEdit} setShowModal={setShowModal} productionHouse={productionHouse} />
                )
            }
            {
                deleteModal && (
                    <ModalProductionHouse setDeleteModal={setDeleteModal} deleteModal={deleteModal}/>
                ) 
            }

        </>
    )
}

export default ProductionHouse
