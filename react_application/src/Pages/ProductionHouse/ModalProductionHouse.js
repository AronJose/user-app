import React, { useRef, useState } from 'react'
import Modal from 'react-modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';


function AddPrdoductionHouse({ setShowModal, edit, setEdit, productionHouse, deleteModal, setDeleteModal }) {
    const fileRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [imageUpload, setImageUpload] = useState(null);

    // ----------------- Modal Open Close Functions -------------------------------------------------

    const openModal = () => {
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false)
        setEdit(false)
    };
    console.log(productionHouse, "production House")
    // --------------------------- Production profile image Upload ----------------------------------------
    const upload = async (selectedFile) => {
        const formData = new FormData();
        formData.append("file", selectedFile);
        const image = await dispatch.productionHouse.uploadFile({ file: formData });
        const reader = new FileReader();

        reader.onloadend = () => {
            setImageUpload(reader.result);
        };

        reader.readAsDataURL(selectedFile);
        return image

    }
    // ----------------------------------------------------------------------------------------------------
    const initialValues = {
        production_house_name: !edit && productionHouse && productionHouse.production_house_name ? productionHouse.production_house_name : '',
        production_house_image: !edit && productionHouse && productionHouse.production_house_image ? productionHouse.production_house_image : ''
    };
    const validationSchema = Yup.object({
        production_house_name: Yup.string(),
        production_house_image: Yup.string()
    });

    // ---------------------------------------- Add & Edit function ----------------------------------------
    const ProductionHouse = async (values) => {
        if (edit) {
            const addProductionHouse = await dispatch.productionHouse.createProductionHouse(values)
            navigate('/profile')
        }
        else {
            let payload = {
                data: values,
                id: productionHouse.id
            }
            const editProductionHouse = await dispatch.productionHouse.updateProductionHouse(payload)
            navigate('/profile')
        }
    }

    return (
        <div>
            <Modal
                isOpen={openModal}
                onRequestClose={closeModal}
                className="border-2 w-[485px] bg-white mx-auto my-20 shadow-lg shadow-cyan-500/50 h-fit"
                contentLabel="Add and Edit Modal">
                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={ProductionHouse}>
                    {(formik) => (
                        <Form>
                            <div className=" font-inter flex items-end justify-between ">
                                <h1 className="px-4 font-bold text-gray-800 font-inter">{edit ? "create Production House" : "Update Production House"}</h1>
                                <div>
                                    <button onClick={closeModal}>
                                        <svg
                                            className="h-8 w-6 text-gray-900 hover:bg-red-400"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <line x1="18" y1="6" x2="6" y2="18" />
                                            <line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col my-4 mx-8 font-inter space-y-2 text-sm font-semibold">
                                <div className="flex">
                                    <p>Production House Name</p>
                                </div>
                                <Field
                                    type="text"
                                    name="production_house_name"
                                    placeholder="Enter your Product House Name"
                                    className={`${formik.errors.production_house_name ? 'input-error' : ''} border rounded p-2 border-gray-300 w-[300px] h-[40px]`} />
                                <ErrorMessage name="production_house_name" component="div" className="text-red-600" />
                            </div>

                            <div className="flex flex-col font-inter text-sm font-semibold">
                                <div className="flex mx-8 ">
                                    <p>Profile Image Upload</p>
                                </div>
                                <div className="flex items-start justify-center w-[350px] mt-2 mx-4 h-fit py-2">
                                    <div>

                                        <img className="w-24 h-24 rounded-full border-2" src={imageUpload} alt="Profile" />
                                    </div>
                                    <input
                                        type="file"
                                        hidden
                                        name="production_house_image"
                                        ref={fileRef}
                                        onChange={async (e) => {
                                            const selectedFile = e.target.files[0];
                                            const result = await upload(selectedFile);
                                            formik.setFieldValue('production_house_image', result.filepath);
                                        }} />
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            console.log("Before click");
                                            fileRef.current && fileRef.current.click();
                                            console.log("After click");
                                        }}
                                        className="mx-4 my-4 border-2 text-green-600 border-green-600 w-20 h-8 rounded-lg font-semibold">
                                        Upload
                                    </button>
                                </div>
                                <div className="flex justify-end gap-2 m-2">
                                    <button className="border-3 w-20 rounded-lg text-gray-600 font-bold h-8 " onClick={closeModal}>Cancell</button>
                                    <button className="border-3 w-20 rounded-lg bg-green-500 text-white font-bold h-8">{edit ? "create " : "Update "}</button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal>

            <Modal
                className="border-2 w-[485px] bg-white mx-auto my-20 shadow-lg shadow-cyan-500/50 h-[250px]"
                isOpen={deleteModal}
                contentLabel="Delete Modal">
                <div>
                    <span className="">Are you sure you want to delete this user?</span>
                    <div className='flex justify-center items-center'>
                        <button onClick={() => setDeleteModal(false)} className="btn btn-primary">Close</button>
                        <button  className="btn btn-danger">Okay</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default AddPrdoductionHouse
