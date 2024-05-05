import React, { useRef, useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import pluse from '../../Assets/plus.png'
import ProductionHouse from '../ProductionHouse/ProductionHouse';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
import AddPrdoductionHouse from '../ProductionHouse/ModalProductionHouse';

function EditProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fileRef = useRef(null);
    const location = useLocation();
    const { profileInfo } = location.state || {};
    const [showModal, setShowModal] = useState(false);
    const [productionHouseInfo, setProductionHouseInfo] = useState(null);
    const [edit, setEdit] = useState(false)



    const initialValues = {
        name: profileInfo ? `${profileInfo.first_name} ${profileInfo.last_name}` : '',
        descriptions: profileInfo ? profileInfo.descriptions : '',
        phone_number: profileInfo ? profileInfo.phone_number : '',
        address: profileInfo ? profileInfo.address : '',
        state: profileInfo ? profileInfo.state : '',
        zip_code: profileInfo ? profileInfo.zip_code : '',
        city: profileInfo ? profileInfo.city : '',
        country: profileInfo ? profileInfo.country : '',
        image_url: profileInfo && profileInfo.image_url ? profileInfo.image_url : null
    };

    const validationSchema = Yup.object({
        name: Yup.string(),
        descriptions: Yup.string(),
        phone_number: Yup.string(),
        address: Yup.string(),
        state: Yup.string(),
        zip_code: Yup.string(),
        file: Yup.mixed(),
        city: Yup.mixed(),
        country: Yup.mixed(),
    });


    const handleProfileLogin = async (MyProfileFunction, navigatePath) => {
        const MyProfile = await MyProfileFunction();
        if (MyProfile) {
            navigate(navigatePath);
        }
    };
    // -----------edit profile -------------------------------------------
    const updateMyProfil = async (value) => {
        const updated = await dispatch.MyProfile.updateProfile(value);
        handleProfileLogin(() => updated, '/Profile')
    }
    // --------------Profile Image Upload ---------------------------------
    const upload = async (selectedFile) => {
        const formData = new FormData();
        formData.append("file", selectedFile);
        return await dispatch.MyProfile.uploadFile({ file: formData });
    };
    // -----------------production House List ------------------------------
    const productionHouseList = async (productions) => {
        const productionHouseInfo = await dispatch.productionHouse.getProductionHouses(productions);
        setProductionHouseInfo(productionHouseInfo.data);
    };
    // -------------- onClick to Show Modal Function  ----------------------
    const handlecreation = () => {
        setEdit(true)
        setShowModal(true);
    }

    // --------------Delete function ----------------------------------------

    useEffect(() => {
        productionHouseList()
    }, [])

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={updateMyProfil} >
                {(formik) => (
                    <div>
                        <div className="mx-40 my-4 text-gray-500 text-sm flex space-x-2 font-inter">
                            <p className="text-green-500 font-semibold ">Home</p>
                            <p></p>
                            <p>Aron Jose</p>
                        </div>
                        <Form>
                            <div className="flex justify-center">
                                <div className="border-2 shadow-lg w-fit h-fit">
                                    <h1 className="font-black text-black flex justify-start text-lg py-2 px-4 font-inter">Edit Profile</h1>
                                    {/* grid Start */}
                                    <div className="grid grid-cols-2">

                                        <div className=" my-4 mx-4 space-y-4">
                                            <div className="flex flex-col space-y-2 mx-4 font-inter">
                                                <div className="flex font-semibold ">
                                                    <p>Name</p>
                                                </div>
                                                <Field
                                                    type="text"
                                                    name="name"
                                                    value={initialValues.name}
                                                    placeholder="Enter your name"
                                                    className={`${formik.errors.name ? 'input-error' : ''} border rounded  p-2 border-gray-300 w-[300px] h-[40px]`} />
                                                <ErrorMessage name="name" component="div" className="text-red-600" />
                                            </div>
                                            <div className="flex flex-col space-y-2 mx-4 font-inter">
                                                <div className="flex font-semibold ">
                                                    <p>Descriptions</p>
                                                </div>
                                                <Field
                                                    type="text"
                                                    name="descriptions"
                                                    placeholder="Enter your descriptions"
                                                    as="textarea"
                                                    className={`${formik.errors.descriptions ? 'input-error' : ''} border rounded  p-2 border-gray-300 w-[300px] h-[100px]`} />
                                                <ErrorMessage name="descriptions" component="div" className="text-red-600" />
                                            </div>
                                            <div className="flex flex-col space-y-2 mx-4 font-inter">
                                                <div className="flex font-semibold ">
                                                    <p>Phone Number</p>
                                                </div>
                                                <Field
                                                    type="text"
                                                    name="phone_number"
                                                    placeholder="Enter your Phone Number"
                                                    className={`${formik.errors.phone_number ? 'input-error' : ''} border rounded p-2 border-gray-300 w-[300px] h-[40px]`} />
                                                <ErrorMessage name="phone_number" component="div" className="text-red-600" />
                                            </div>
                                            <div className="flex flex-col space-y-2 mx-4 font-inter">
                                                <div className="flex font-semibold ">
                                                    <p>Address</p>
                                                </div>
                                                <Field
                                                    type="text"
                                                    name="address"
                                                    placeholder="Enter your Address"
                                                    as="textarea"
                                                    className={`${formik.errors.address ? 'input-error' : ''} border rounded p-2 border-gray-300 w-[300px] h-[100px]`} />
                                                <ErrorMessage name="address" component="div" className="text-red-600" />
                                            </div>
                                            <div className="flex flex-col space-y-2 mx-4 font-inter">
                                                <div className="flex font-semibold ">
                                                    <p>State</p>
                                                </div>
                                                <Field
                                                    type="text"
                                                    name="state"
                                                    placeholder="Enter your State"
                                                    className={`${formik.errors.state ? 'input-error' : ''} border rounded p-2 border-gray-300 w-[300px] h-[40px]`} />
                                                <ErrorMessage name="state" component="div" className="text-red-600" />
                                            </div>
                                            <div className="flex flex-col space-y-2 mx-4 font-inter">
                                                <div className="flex font-semibold ">
                                                    <p>Zip Code</p>
                                                </div>
                                                <Field
                                                    type="text"
                                                    name="zip_code"
                                                    placeholder="Enter your Zip Code"
                                                    className={`${formik.errors.zip_code ? 'input-error' : ''} border rounded p-2 border-gray-300 w-[300px] h-[40px]`} />
                                                <ErrorMessage name="zip_code" component="div" className="text-red-600" />
                                            </div>
                                            <div className="flex items-center space-x-2 px-2 mx-12 w-56 h-8 font-medium border-2 rounded-lg text-green-600 border-green-600 " >
                                                <img className="w-4 h-4" src={pluse} />

                                                <p onClick={handlecreation}>Add Production House</p>

                                            </div>
                                        </div>

                                        <div className=" my-12 mx-4 space-y-8">

                                            <div className="flex flex-col font-inter">

                                                <div className="flex font-semibold py-4">
                                                    <p>Profile Image Upload</p>
                                                </div>
                                                <div className="flex items-start justify-center w-[350px] mt-2 h-56">
                                                    <div>
                                                        <img className="w-24 h-24 rounded-full border-2" src={`http://localhost:8080/${profileInfo.image_url}`} alt="Profile" />
                                                    </div>

                                                    <input
                                                        type="file"
                                                        hidden
                                                        name="image_url"
                                                        ref={fileRef}
                                                        onChange={async (e) => {
                                                            const selectedFile = e.target.files[0];
                                                            const result = await upload(selectedFile);
                                                            formik.setFieldValue('image_url', result.filepath);
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
                                            </div>
                                            <div className="flex flex-col space-y-2 mx-4 font-inter">
                                                <div className="flex font-semibold ">
                                                    <p>City</p>
                                                </div>
                                                <Field
                                                    type="text"
                                                    name="city"
                                                    placeholder="Enter your city"
                                                    className={`${formik.errors.city ? 'input-error' : ''} border rounded p-2 border-gray-300 w-[300px] h-[40px]`} />
                                                <ErrorMessage name="city" component="div" className="text-red-600" />
                                            </div>
                                            <div className="flex flex-col space-y-2 mx-4 font-inter">
                                                <div className="flex font-semibold ">
                                                    <p>Country</p>
                                                </div>
                                                <Field
                                                    type="text"
                                                    name="country"
                                                    placeholder="Enter your country"
                                                    className={`${formik.errors.country ? 'input-error' : ''} border rounded p-2 border-gray-300 w-[300px] h-[40px]`} />
                                                <ErrorMessage name="country" component="div" className="text-red-600" />
                                            </div>
                                        </div>

                                    </div>
                                    {/* grid end */}

                                    <div className="w-[950px] mx-16">
                                        {
                                                <ProductionHouse edit={edit} setEdit={setEdit} productionHouseInfo={productionHouseInfo} setShowModal={setShowModal} showModal={showModal} />
                                        }
                                    </div>
                                    <div className="flex justify-end w-[950px] mx-4 my-4">
                                        <button className="bg-green-600 w-16 h-8 rounded-lg text-white " type="submit">Save</button>
                                    </div>


                                </div>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    );
}
export default EditProfile;
